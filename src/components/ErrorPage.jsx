import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import classes from './css/ErrorPage.module.css'; 

function ErrorPage() {
  const error = useRouteError();

  let errorMessage = 'Oops! Something went wrong.';
  let errorDetails = '';

  if (error) {
    if (error.status === 404) {
      errorMessage = "Page Not Found";
    }
    if (error.stack) {
      errorDetails = error.stack;
    }
  }

  return (
    <div className={classes.errorPageContainer}>
      <h1 className={classes.errorTitle}>Something went wrong</h1>
      <p className={classes.errorMessage}>{errorMessage}</p>

      {errorDetails && (
        <details className={classes.errorDetails}>
          <summary>Click for more details</summary>
          <pre>{errorDetails}</pre>
        </details>
      )}

      <div className={classes.errorActions}>
        <p>Try going back or return to the home page.</p>
        <Link to="/" className={classes.homeLink}>Go to Home</Link>
        <button onClick={() => window.history.back()} className={classes.goBackButton}>Go Back</button>
      </div>
    </div>
  );
}

export default ErrorPage;
