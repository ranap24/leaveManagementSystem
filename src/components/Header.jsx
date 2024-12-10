import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaWpforms } from "react-icons/fa";
import classes from "./css/Header.module.css";

function MainNavigation({ isLoggedIn, isInRole }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  let userName = "";

  if (isLoggedIn) {
    const Token = localStorage.getItem("Token");
    if (Token) {
      const tokenArray = Token.split(".");
      const tokenPayload = JSON.parse(atob(tokenArray[1]));
      userName = tokenPayload.name;
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className={classes.navContainer}>
      <nav className={classes.nav}>
        <div className={classes.navLeft}>
          <div className={classes.logo} onClick={toggleSidebar}>
            <div className={classes.iconPlaceholder}>
              <FaWpforms />
            </div>
            <span className={classes.title}>LeaveManagement System</span>
          </div>

          {!isSidebarOpen && (
            <>
              <Link to="/Home" className={classes.navLink}>
                Home
              </Link>
              {isLoggedIn && isInRole === "USER" && (
                <>
                  <Link to="/applyLeave" className={classes.navLink}>
                    Apply Leave
                  </Link>
                  <Link to="/leaveList" className={classes.navLink}>
                    View Leaves
                  </Link>
                </>
              )}
              {isLoggedIn && isInRole === "ADMIN" && (
                <>
                  <Link to="/register" className={classes.navLink}>
                    Add User
                  </Link>
                  <Link to="/listUsers" className={classes.navLink}>
                    View Users
                  </Link>
                </>
              )}
            </>
          )}
        </div>

   { !isSidebarOpen &&    <div className={classes.navRight}>
          {!isLoggedIn && (
            <Link to="/login" className={classes.navLink}>
              Login
            </Link>
          )}

          {isLoggedIn && (
            <div className={classes.profileCard}>
              <div className={classes.profileInfo}>
                <span className={classes.greeting}>Hello, {userName}</span>
                <FaUserCircle className={classes.userIcon} />
              </div>
              <div className={classes.dropdownContent}>
                <Link to="/logout" className={classes.navLink}>
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>}
      </nav>

      {isSidebarOpen && (
        <div className={classes.sidebar}>
          <button
            className={classes.closeButton}
            onClick={() => setSidebarOpen(false)}
          >
            &times;
          </button>
          <Link to="/Home" className={classes.sidebarLink} onClick={closeSidebar}>
            Home
          </Link>
          {isLoggedIn && isInRole === "USER" && (
            <>
              <Link to="/applyLeave" className={classes.sidebarLink} onClick={closeSidebar}>
                Apply Leave
              </Link>
              <Link to="/leaveList" className={classes.sidebarLink} onClick={closeSidebar}>
                View Leaves
              </Link>
            </>
          )}
          {isLoggedIn && isInRole === "ADMIN" && (
            <>
              <Link to="/register" className={classes.sidebarLink} onClick={closeSidebar}>
                Add User
              </Link>
              <Link to="/listUsers" className={classes.sidebarLink} onClick={closeSidebar}>
                View Users
              </Link>
            </>
          )}
          {!isLoggedIn && (
            <Link to="/login" className={classes.sidebarLink} onClick={closeSidebar}>
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default MainNavigation;
