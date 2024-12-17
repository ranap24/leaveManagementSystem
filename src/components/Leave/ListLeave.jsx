import DataTable from "react-data-table-component";
import { getAllLeaves } from "../../http/leave";
import { useLoaderData, Link,Navigate} from "react-router-dom";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import DeleteLeave from "./DeleteLeave";
import classes from "../css/listLeave.module.css";
import { approved, rejected, pending } from "../../util/StaticDetails";
import { Past15Days } from "../../util/Helper";

const columns = [
  {
    name: "ManagerName",
    selector: (row) => row.managerName,
    sortable: true,
    className: classes["manager-column"],
    visible: true,
  },
  {
    name: "FromDate",
    selector: (row) => row.from_Date,
    sortable: true,
    className: classes["fromDate-column"],
    visible: true,
  },
  {
    name: "ToDate",
    selector: (row) => row.to_Date,
    sortable: true,
    className: classes["toDate-column"],
    visible: true,
  },
  {
    name: "TotalDays",
    selector: (row) => row.totalDays,
    sortable: true,
    visible: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    className: classes["status-column"],
    cell: (row) => {
      let badgeClass = classes["status-badge"];
      let statusText = row.status;

      if (statusText.toLowerCase() === approved) {
        badgeClass = `${badgeClass} ${classes["approved-badge"]}`;
      } else if (statusText.toLowerCase() === rejected) {
        badgeClass = `${badgeClass} ${classes["rejected-badge"]}`;
      } else if (statusText.toLowerCase() === pending) {
        badgeClass = `${badgeClass} ${classes["pending-badge"]}`;
      }

      return <span className={badgeClass}>{statusText}</span>;
    },
  },

  {
    name: "Reason",
    selector: (row) => row.reason,
    visible: true,
  },
  {
    name: "Actions",
    cell: (row) => {
      const hideButtons =
        Past15Days(row.to_Date) &&
        (row.status === approved || row.status === rejected);
      return (
        <div className={classes["actions-buttons"]}>
          {!hideButtons && (
            <>
              <button>
                <Link to={`/editLeave/${row.leaveApplicationId}`}>Edit</Link>
              </button>
              <DeleteLeave leaveId={row.leaveApplicationId} />
            </>
          )}
          {hideButtons && (
            <span className={classes["no-actions"]}>Past leave</span>
          )}
        </div>
      );
    },
  },
];

function ListLeave({isLoggedIn}) {
  const [searchElement, setSearchElement] = useState("");
  const loaderData = useLoaderData();
  const [filteredData, setFilteredData] = useState(loaderData.data);

  useEffect(() => {
    if (loaderData.isSuccess) {
      const searchList = loaderData.data.filter((employee) => {
        return columns.some((column) => {
          if (column.visible) {
            const value = column.selector(employee);
            return String(value)
              .toLowerCase()
              .includes(searchElement.toLowerCase());
          }
          return false;
        });
      });
      setFilteredData(searchList);
    }
  }, [searchElement, loaderData.data, loaderData.isSuccess]);

  const handleSearch = (event) => {
    setSearchElement(event.target.value);
  };

  let approvedLeaves;
  let rejectedLeaves;
  let pendingLeaves;

  if (loaderData.isSuccess) {
    approvedLeaves = filteredData.filter(
      (leave) => leave.status.toLowerCase() === approved
    );
    rejectedLeaves = filteredData.filter(
      (leave) => leave.status.toLowerCase() === rejected
    );
    pendingLeaves = filteredData.filter(
      (leave) => leave.status.toLowerCase() === pending
    );
  }

  if(isLoggedIn)
  {
    return (
      <div className={classes["table-container"]}>
        <input
          type="text"
          placeholder="Search..."
          value={searchElement}
          onChange={handleSearch}
          className={classes["search-input"]}
        />
  
        {loaderData.isSuccess ? (
          <>
            {approvedLeaves && approvedLeaves.length > 0 && (
              <div className={classes["approved-section"]}>
                <h2>Approved Leave Requests</h2>
                <DataTable
                  columns={columns}
                  data={approvedLeaves}
                  className={classes["react-data-table"]}
                />
              </div>
            )}
  
            {pendingLeaves && pendingLeaves.length > 0 && (
              <div className={classes["pending-section"]}>
                <h2>Pending Leave Requests</h2>
                <DataTable
                  columns={columns}
                  data={pendingLeaves}
                  className={classes["react-data-table"]}
                />
              </div>
            )}
  
            {rejectedLeaves && rejectedLeaves.length > 0 && (
              <div className={classes["rejected-section"]}>
                <h2>Rejected Leave Requests</h2>
                <DataTable
                  columns={columns}
                  data={rejectedLeaves}
                  className={classes["react-data-table"]}
                />
              </div>
            )}
  
            {approvedLeaves.length === 0 &&
              pendingLeaves.length === 0 &&
              rejectedLeaves.length === 0 && (
                <p className={classes["no-results"]}>
                  No leave requests available.
                </p>
              )}
          </>
        ) : (
          <p className={classes["error-message"]}>{loaderData.message}</p>
        )}
      </div>
    );
  }
  else 
  {
    return <Navigate to="/login" replace />;
  }
  
}


export async function loader() {
  const Token = localStorage.getItem("Token");
  if (Token) {
    const tokenArray = Token.split(".");
    const tokenPayload = JSON.parse(atob(tokenArray[1]));
    const employeeIdName = {
      empId: Number(tokenPayload.sub),
      empName: tokenPayload.name,
    };
    const result = await getAllLeaves(employeeIdName.empId);

    const response = await result.json();

    if (response.isSuccess) {
      const leaveList = response.data;

      const modifiedLeaveList = leaveList.map((leave) => {
        const formattedStartDate = format(
          new Date(leave.from_Date),
          "MMMM dd, yyyy"
        );
        const formattedEndDate = format(
          new Date(leave.to_Date),
          "MMMM dd, yyyy"
        );

        return {
          ...leave,
          empName: employeeIdName.empName,
          to_Date: formattedEndDate,
          from_Date: formattedStartDate,
        };
      });
      return { ...response, data: modifiedLeaveList };
    } else {
      return response;
    }
  } else {
    throw new Error("No Token, Unauthorized");
  }
}

export default ListLeave;
