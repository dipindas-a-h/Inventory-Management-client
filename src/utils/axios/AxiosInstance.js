import axios from 'axios';

// Create an instance of Axios with custom configuration
const instance = axios.create({
  baseURL: 'https://inv-mgnt-server.onrender.com', // Base URL for all requests
  // baseURL: 'localhost:3000', // Base URL for all requests
 
//   timeout: 10000, // Timeout in milliseconds
  headers: {
    'Content-Type': 'application/json', // Default Content-Type header
    'Authorization': 'Bearer yourAccessTokenHere' // Example Authorization header
    // Add any other default headers you need
  },
  // You can add more custom configurations here as needed
});

// You can also add interceptors to the instance for global request/response handling
instance.interceptors.request.use(
  (config) => {
    // Modify the request config before it is sent
    console.log('Request sent:', config);
    return config;
  },
  (error) => {
    // Handle request error
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // Modify the response data before it is resolved
    console.log('Response received:', response);
    return response;
  },
  (error) => {
    // Handle response error
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export default instance;

// Now you can import this instance in other modules and use it to make requests
