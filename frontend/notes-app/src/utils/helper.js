import axios from "axios"
export const validateEmail = (email) =>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

export const getInitials = (name)=>{
    if (!name) {
        return ""
    }

    const words = name.split(" ")

    let initials = ""

    for (let index = 0; index < Math.min(words.length, 2); index++) {
        initials += words[index][0];
    }

    return initials.toLocaleUpperCase()
}

const axiosInstance = axios.create({
  baseURL: 'https://note-app-api-murex.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.accesstoken = `accesstoken_${token}`; 
  }

  
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    return Promise.reject(error);
  }
);

export default axiosInstance;
