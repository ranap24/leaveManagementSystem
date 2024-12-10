import { Link } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa'; // Importing a user icon from react-icons
import classes from './css/Header.module.css';

function MainNavigation({ isLoggedIn, isInRole }) {
  let userName = '';

  if (isLoggedIn) {
    const Token = localStorage.getItem('Token');
    if (Token) {
      const tokenArray = Token.split('.');
      const tokenPayload = JSON.parse(atob(tokenArray[1]));
      userName = tokenPayload.name;
    }
  }

  return (
    <div className={classes.navContainer}>
      <nav className={classes.nav}>
        <div className={classes.navLeft}>
          
          <div className={classes.logo}>
            <div className={classes.iconPlaceholder}></div> 
            <span className={classes.title}>LeaveManagement System</span>
          </div>

          <Link to="/Home" className={classes.navLink}>Home</Link>
         {isLoggedIn && isInRole === "USER" &&
         <>
         <Link to = "/applyLeave" className={classes.navLink}>Apply Leave</Link>
         <Link to = "/leaveList" className={classes.navLink}>View Leaves</Link>
         </> 
          
          }
           {isLoggedIn && isInRole === "ADMIN" &&
         <>
         <Link to = "/register" className={classes.navLink}>Add User</Link>
         <Link to = "/listUsers" className={classes.navLink}>View Users</Link>
         </> 
          
          }
        </div>

        <div className={classes.navRight}>
          {!isLoggedIn && (
            <Link to="/login" className={classes.navLink}>Login</Link>
          )}

          {isLoggedIn && (
            <div className={classes.profileCard}>
            <div className={classes.profileInfo}>
              <span className={classes.greeting}>Hello, {userName}</span>
              <FaUserCircle className={classes.userIcon} />
            </div>
          
            <div className={classes.dropdownContent}>
              <Link to="/logout" className={classes.navLink} >Logout</Link>
            </div>
          </div>
          
          )}
        </div>
      </nav>
    </div>
  );
}

export default MainNavigation;
