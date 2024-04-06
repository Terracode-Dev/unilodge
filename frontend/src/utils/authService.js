const TOKEN_KEY = 'unilodge_secret';

export const login = (token) => {
    localStorage.setItem(TOKEN_KEY,token);
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
    const token = getToken();
    return token !== null && token !== undefined;
}

export const getUserIdFromToken = (token) => {
    if (!token) {
      console.error('Token is empty or undefined');
      return null;
    }
  
    try {
      // Split the token into its three parts (header, payload, signature)
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        console.error('Invalid token format');
        return null;
      }
  
      // Decode the base64-encoded payload (second part of the token)
      const decodedPayload = atob(tokenParts[1]);
  
      // Parse the decoded payload to get user ID and other data
      const payloadObject = JSON.parse(decodedPayload);
      const { userid } = payloadObject;
  
      return userid;
    } catch (error) {
      console.error('Error decoding JWT token:', error.message);
      return null;
    }
  };
