import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaWpforms } from "react-icons/fa";
import classes from "./css/Header.module.css";
import LogoutButton from "./Employee/Logout";

function MainNavigation({ isLoggedIn, isInRole, handleLogout }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
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

  const showDropdown = () => setDropdownVisible(true);
  const hideDropdown = () => setDropdownVisible(false);

  return (
    <div className={classes.navContainer}>
      <nav className={classes.nav}>
        <div className={classes.navLeft}>
          <div className={classes.logo} >
            <div className={classes.iconPlaceholder} onClick={toggleSidebar}>
              <FaWpforms />
            </div>
            <span className={classes.title}>LMS</span>
          </div>
           &nbsp;
          {!isSidebarOpen && (
            <>
              <Link to="/" className={classes.navLink}>
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
                    <Link to = "/managerLeaves" className={classes.navLink}>Approve/Reject</Link>
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
                  <Link to = "/managerLeaves" className={classes.navLink}>Approve/Reject</Link>
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
            <div 
              className={classes.profileCard} 
              onMouseEnter={showDropdown} 
              onMouseLeave={hideDropdown} 
            >
              <div className={classes.profileInfo}>
                <span className={classes.greeting}>Hello, {userName}</span>
                <FaUserCircle className={classes.userIcon} />
              </div>
              <div 
                className={`${classes.dropdownContent} ${isDropdownVisible ? classes.visible : ''}`}
              >
                <LogoutButton handleLogout={handleLogout}/>
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
          <Link to="/" className={classes.sidebarLink} onClick={closeSidebar}>
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
              <Link to = "/managerLeaves" className={classes.navLink}>Approve/Reject</Link>
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
              <Link to = "/managerLeaves" className={classes.navLink}>Approve/Reject</Link>
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
