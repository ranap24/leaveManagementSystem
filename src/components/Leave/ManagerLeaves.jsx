import DataTable from "react-data-table-component";
import { getAllManagerLeaves } from "../../Http/leave";
import { useLoaderData } from "react-router-dom";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import classes from "../css/listLeave.module.css";
import UpdateStatus from "./UpdateLeaveStatus";
import { pending,approved, rejected } from "../../util/StaticDetails";
import { Past15Days } from "../../util/Helper";

const columns = [
  {
    name: "EmployeeID",
    selector: (row) => row.empId,
    visible : true

  },
  {
    name : "EmployeeName",
    selector : (row) => row.employee.name,
    visible : true
  },
  {
    name: "FromDate",
    selector: (row) => row.from_Date,
    sortable: true,
    className: classes["fromDate-column"],
    wrap : true,
    visible : true

  },
  {
    name: "ToDate",
    selector: (row) => row.to_Date,
    sortable: true,
    className: classes["toDate-column"],
    wrap : true,
    visible : true

  },
  {
    name: "TotalDays",
    selector: (row) => row.totalDays,
    sortable: true,
    wrap : true,
    visible : true

  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    className: classes["status-column"],
    wrap : true,
    visible : true

  },
  {
    name: "Reason",
    selector: (row) => row.reason,
    visible : true
  },
  {
    name: "Actions",
    cell: (row) => {
      const hideButtons = Past15Days(row.to_Date) && (row.status === approved || row.status === rejected);
      const isPending = row.status === pending;
             const isApproved = row.status === approved;
             const isRejected = row.status === rejected;
      return (
        <div className={classes["actions-buttons"]}>
          {!hideButtons && (
               <div className={classes["actions-buttons"]}>
                 {isPending && (
                   <>
                     <UpdateStatus
                       leaveApplicationId={row.leaveApplicationId}
                       managerId={row.managerId}
                       status={approved}
                     >
                       Approve
                     </UpdateStatus>
                     <UpdateStatus
                       leaveApplicationId={row.leaveApplicationId}
                       managerId={row.managerId}
                       status={rejected}
                     >
                       Reject
                     </UpdateStatus>
                   </>
                 )}
                 {isRejected && (
                   <UpdateStatus
                     leaveApplicationId={row.leaveApplicationId}
                     managerId={row.managerId}
                     status={approved}
                   >
                     Approve
                   </UpdateStatus>
                 )}
                 {isApproved && (
                   <UpdateStatus
                     leaveApplicationId={row.leaveApplicationId}
                     managerId={row.managerId}
                     status={rejected}
                   >
                     Reject
                   </UpdateStatus>
                 )}
               </div>
             
          )}

          {hideButtons && (
            <span className={classes["no-actions"]}>Past leave</span>
          )}
        </div>
      );
    },
  },
];

function ManagerLeaves() {
  const [searchElement, setSearchElement] = useState("");
  const loaderData = useLoaderData();
  const [filteredData, setFilteredData] = useState(loaderData.data);

  useEffect(() => {
    if (loaderData.isSuccess) {
      const searchList = loaderData.data.filter((employee) => {
        return columns.some((column) => {
          if (column.visible) {
            const value = column.selector(employee);
            return String(value).toLowerCase().includes(searchElement.toLowerCase());
          }
          return false;
        });
      });
      setFilteredData(searchList);
    }
  }, [searchElement, loaderData.data]);

  const handleSearch = (event) => {
    setSearchElement(event.target.value);
  };

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
        filteredData && filteredData.length > 0 ? (
          <DataTable
            columns={columns} 
            data={filteredData}
            className={classes["react-data-table"]}
          />
        ) : (
          <p className={classes["no-results"]}>
            There are no Employees matching your search criteria.
          </p>
        )
      ) : (
        <p className={classes["error-message"]}>{loaderData.message}</p>
      )}
    </div>
  );
}

export async function loader({ request, params }) {
  const Token = localStorage.getItem("Token");
  if (Token) {
    const tokenArray = Token.split(".");
    const tokenPayload = JSON.parse(atob(tokenArray[1]));
    const employeeId = Number(tokenPayload.sub)
    const result = await getAllManagerLeaves(employeeId);

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
          to_Date: formattedEndDate,
          from_Date: formattedStartDate,
        };
      });
      return { ...response, data: modifiedLeaveList };
    } else {
      return response;
    }
  } else {
    throw new Error("Error Occured - Not Found Token");
  }
}

export default ManagerLeaves;
