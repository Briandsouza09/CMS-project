export const isAuthenticated = () => {
    const profile = localStorage.getItem('profile');
    return !!profile;
  };
  
  export const getUserRole = () => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    return profile?.user?.role;
  };
  
  export const getAuthToken = () => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    return profile?.token;
  };