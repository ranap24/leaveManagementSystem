import DataTable from "react-data-table-component";
import { getEmployeesWithManager } from "../../http/auth";
import { useLoaderData, Link } from "react-router-dom";
import classes from "../css/listLeave.module.css";
import { useState, useEffect } from "react";
import DeleteUserButton from "./DeleteUser";

const columns = [
  {
    name: "EmployeeID",
    selector: (row) => row.id,
  },
  {
    name: "EmployeeName",
    selector: (row) => row.name,
    sortable: true,
    className: classes["manager-column"],
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
    className: classes["fromDate-column"],
    wrap: true,
  },
  {
    name: "Date-of-Birth",
    selector: (row) => row.birthDate,
    sortable: true,
    className: classes["toDate-column"],
    wrap: true,
  },
  {
    name: "Phone",
    selector: (row) => row.phoneNumber,
    sortable: true,
  },
  {
    name: "Started-From",
    selector: (row) => row.startedFrom,
    sortable: true,
  },
  {
    name: "Designation",
    selector: (row) => row.designation,
    sortable: true,
    className: classes["status-column"],
  },
  {
    name: "Manager",
    selector: (row) => row.managerName,
  },
  {
    name: "Actions",
    cell: (row) => (
      <div className={classes["actions-buttons"]}>
        <button>
          <Link to={`/editUser/${row.id}`}>Edit</Link>
        </button>
        <DeleteUserButton empId={row.id} />
      </div>
    ),
  },
];

function ManageUsers({isLoggedIn,isInRole}) {
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
  }, [searchElement, loaderData.data, loaderData.isSuccess]);

  const handleSearch = (event) => {
    setSearchElement(event.target.value);
  };

  if(isLoggedIn && isInRole === "ADMIN")
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
          filteredData && filteredData.length > 0 ? (
            <DataTable
              columns={columns}
              data={filteredData}
              className={classes["react-data-table"]}
            />
          ) : (
            <p className={classes["no-results"]}>
              There are no Leave Requests matching your search criteria.
            </p>
          )
        ) : (
          <p className={classes["error-message"]}>{loaderData.message}</p>
        )}
      </div>
    );
  }

  if(isLoggedIn && isInRole === "USER")
  {
     return (
          <h4 className={classes.noAccess}>
            You don&apos;t have access to this Page
          </h4>
        );
  }

  return <Navigate to="/login" replace />;

  
}

export async function loader() {
  try {
    const response = await getEmployeesWithManager();
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
}

export default ManageUsers;
