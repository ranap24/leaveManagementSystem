import { useNavigate } from "react-router-dom";
import classes from "./css/HomePage.module.css";

function HomePage({ isLoggedIn, isInRole }) {
  const navigate = useNavigate();
  if (isLoggedIn) {
    return (
      <>
        <div className={classes["homepage-container"]}>
          <h1 className={classes["homepage-heading"]}>
            Welcome to Your Leave Management System
          </h1>
          <p>Here you can track and manage your leave requests.</p>
        </div>
        {isInRole === "USER" && (
          <div className={classes["dashboard-section"]}>
            <button className={classes["dashboard-card"]}>
              <h3>Upcoming Leave</h3>
              <p>December 15 - December 17</p>
            </button>
            <button className={classes["dashboard-card"]}>
              <h3>Leave History</h3>
              <p>November 20 - November 22</p>
            </button>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className={classes["homepage-container"]}>
        <h1 className={classes["homepage-heading"]}>
          Welcome to Your Leave Management System
        </h1>
        <p>Simplify your leave requests and approval process.</p>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
      
    </>
  );
}

export default HomePage;
