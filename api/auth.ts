import { getErrorMessage } from "@/lib/utils";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = process.env.NEXT_PUBLIC_API_URL

export const register = async (data: object) => {
    try {
        const response = await axios.post(`${baseUrl}/register`, data);
        Swal.fire({
            icon: 'success',
            title: response.data,
            timer: 1500,
        })
    } catch (error: unknown) {
        Swal.fire({
            icon: 'error',
            title: "เกิดข้อผิดพลาด Register",
            text: getErrorMessage(error),
            confirmButtonText: 'OK'
        })
        return {
            error: getErrorMessage(error)
        };
    }
};