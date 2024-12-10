import DataTable from 'react-data-table-component';

const columns = [
    {
        name: "EmployeeID",
        selector: (row) => row.empId,
        omit: true,
      },
      {
        name: "EmployeeName",
        selector: (row) => row.name,
        omit: true,
      },
      {
        name: "Designation",
        selector: (row) => row.designation,
        omit: true,
      },
      {
        name: "ManagerId",
        selector: (row) => row.birthDate,
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
function ManageUsers()
{
    return (
        <DataTable columns = {columns} />
    );
}

export default ManageUsers;