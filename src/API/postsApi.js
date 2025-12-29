
// פונקציה שמבצעת את בקשת ה-GET ל-API
export const getPosts = async () => {
    try {
      const response = await fetch('http://localhost:3001/posts');
      const data = await response.json();
      return data; // מחזירה את הנתונים
    } catch (error) {
      console.error('Error fetching posts:', error);
      return []; // במקרה של שגיאה, מחזירים מערך ריק
    }
  };
  
  
  






