 import { useNavigate } from 'react-router-dom';
import classes from  './css/HomePage.module.css';
 
 function HomePage({ isLoggedIn, isInRole })
  {
    const navigate = useNavigate()
        if (isLoggedIn) {
        
          return (
            <>
            {isInRole === "USER" &&
            <div className={classes["dashboard-section"]}>
            <div className={classes["dashboard-card"]}>
              <h3>Leave Balance</h3>
              <p>10 Days</p>
            </div>
            <div className={classes["dashboard-card"]}>
              <h3>Upcoming Leave</h3>
              <p>December 15 - December 17</p>
            </div>
            <div className={classes["dashboard-card"]}>
              <h3>Leave History</h3>
              <p>November 20 - November 22</p>
            </div>
          </div>}
            <div className={classes["homepage-container"]}>
              <h1 className={classes["homepage-heading"]}>Welcome to Your Leave Management System</h1>
              <p>Here you can track and manage your leave requests.</p>
            </div>
            </>
            
          );
        }
      
        return (
          <div>
            <h1>Welcome to Our Leave Management System</h1>
            <p>
              Simplify your leave requests and approval process. Manage your leave balance, submit leave requests, and more!
            </p>
            
            <div>
              <h2>Why Choose Our Leave Management System?</h2>
              <ul>
                <li>Easy leave request submission</li>
                <li>Real-time leave balance tracking</li>
                <li>Instant notifications on leave approvals</li>
                <li>Centralized management for HR and admins</li>
              </ul>
            </div>
            
            <div>
              <h2>Get Started Today!</h2>
              <button onClick={() => navigate("/login")}>Login</button>
            </div>
      
            <div>
              <h2>What Our Users Say</h2>
              <blockquote>
                "This LMS has made managing leave requests so much easier and faster!" - Happy Employee
              </blockquote>
            </div>
      
            <footer>
              <ul>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/faq">FAQ</a></li>
              </ul>
            </footer>
          </div>
        );
     }
      
       

export default HomePage;