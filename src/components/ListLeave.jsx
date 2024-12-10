import DataTable from "react-data-table-component";
import { getAllLeaves } from "../Http/leave";
import { useLoaderData, Link } from "react-router-dom";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import DeleteLeave from "./DeleteLeave";

const columns = [
  {
    name: "EmployeeID",
    selector: (row) => row.empId,
    omit: true,
  },
  {
    name: "EmployeeName",
    selector: (row) => row.empName,
    omit: true,
  },
  {
    name: "Phone",
    selector: (row) => row.empPhone,
    omit: true,
  },
  {
    name: "ManagerId",
    selector: (row) => row.managerId,
    omit: true,
  },
  {
    name: "ManagerName",
    selector: (row) => row.managerName,
    sortable: true,
  },
  {
    name: "FromDate",
    selector: (row) => row.from_Date,
    sortable: true,
  },
  {
    name: "ToDate",
    selector: (row) => row.to_Date,
    sortable: true,
  },
  {
    name: "TotalDays",
    selector: (row) => row.totalDays,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
  },
  {
    name: "Reason",
    selector: (row) => row.reason,
  },
  {
    name: "Actions",
    cell: (row) => (
      <div className="buttons">
        <button>
          <Link to={`/editLeave/${row.leaveApplicationId}`}>Edit</Link>
        </button>
        <DeleteLeave leaveId={row.leaveApplicationId} />
      </div>
    ),
  },
];

function ListLeave() {
  const [searchElement, setSearchElement] = useState("");
  const loaderData = useLoaderData();
  const [filteredData, setFilteredData] = useState(loaderData.data);

  useEffect(() => {
    if (loaderData.isSuccess) {
      const searchList = loaderData.data.filter((leave) => {
        return Object.values(leave).some((value) =>
          String(value).toLowerCase().includes(searchElement.toLowerCase())
        );
      });
      setFilteredData(searchList);
    }
  }, [searchElement, loaderData.data]);

  // Search input handler
  const handleSearch = (event) => {
    setSearchElement(event.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        value={searchElement}
        onChange={handleSearch}
      />
      {loaderData.isSuccess ? filteredData && filteredData.length > 0 ? (
        <DataTable columns={columns} data={filteredData} />
      ) : (
        <p>There are no Leave Requests matching your search criteria.</p>
      ): <p>{loaderData.message}</p>}
    </>
  );
}

export async function loader({ request, params }) {
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
          "MMMM dd, yyyy, HH:mm"
        );
        const formattedEndDate = format(
          new Date(leave.to_Date),
          "MMMM dd, yyyy, HH:mm"
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
