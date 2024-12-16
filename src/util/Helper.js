export const Past15Days = (dateString) => {
    const toDate = new Date(dateString);
    const today = new Date();
    const timeDifference = today - toDate;
    const daysDifference = timeDifference / (1000 * 3600 * 24); 
    return daysDifference >= 15 ; 
  };