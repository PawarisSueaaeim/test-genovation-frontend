"use client";
import { IAuth } from "@/layout/Header";
import axios from "axios";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

type Props = {};

const baseUrl = process.env.NEXT_PUBLIC_API_URL
export default function HomepageComponent({}: Props) {
    const { data: session }: any  = useSession();

    useEffect(() => {
        const getListDoctors = async () => {
			try {
                console.log(session);
				const response = await axios.get(`${baseUrl}/getAllDoctors`, {
					headers: {
                        Authorization: `Bearer ${session?.token}`,
                    }
				})
                console.log(response);
			} catch (error: any) {
				console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด',
                    text: error?.response?.data,
                    showConfirmButton: true,
                    confirmButtonText: 'ตกลง',
                })
			}
		}
        if (session) {
            getListDoctors();
        }
        return;
	},[session]);

    return <div>
        {session?.token}
    </div>;
}
