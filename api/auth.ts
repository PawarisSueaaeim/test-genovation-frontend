import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = process.env.NEXT_PUBLIC_API_URL

export const register = async (data: object) => {
    try {
        const response = await axios.post(`${baseUrl}/register`, data);
        return response;
    } catch (error: any) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: error.message,
            text: error.response.data,
            confirmButtonText: 'OK'
        })
    }
};