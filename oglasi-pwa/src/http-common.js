
import axios from "axios";


const axiosOglasi = axios.create({
    baseURL: "https://jasenka85-001-site1.etempurl.com/api/v1",
    headers: {
        'Content-type': 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('Bearer')
      }
    
    });
    
    axiosOglasi.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          localStorage.setItem('Bearer','');
          window.location.href = '/';
        }
      });
    
export default axiosOglasi;