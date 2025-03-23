// lib/auth.js
export const isTokenValid = (token) => {
    // In a real app, you would validate the token against your backend
    // or decode a JWT and check its expiration date
    return !!token; // Just check if token exists for this demo
  };
  
  export const checkAuth = () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      return isTokenValid(token);
    }
    return false;
  };
  
  export const getUserInfo = () => {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('userEmail');
      return email ? { email } : null;
    }
    return null;
  };