"use client";
import { IAuth } from "@/layout/Header";
import axios from "axios";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IDoctor } from "../addDoctorComponent/AddDoctorComponent";

type Props = {};

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export default function HomepageComponent({}: Props) {
    const { data: session }: any = useSession();
    const [listDoctors, setListDoctors] = useState<IDoctor[]>([]);

    const checkToken = () => {
        if (!session?.token) {
            Swal.fire({
                icon: "error",
                title: "กรุณาเข้าสู่ระบบ",
                text: "Session หมดอายุ กรุณาเข้าสู่ระบบใหม่",
                showConfirmButton: true,
                confirmButtonText: "ตกลง",
            }).then(() => {
                window.location.href = "/login";
            });
            return false;
        }
        return true;
    };

    const getListDoctors = async () => {
        // if (!checkToken()) return;

        try {
            const response = await axios.get(`${baseUrl}/getAllDoctors`, {
                headers: {
                    Authorization: `Bearer ${session?.token}`,
                },
            });
            if (response.status === 200) {
                setListDoctors(response.data);
            }
        } catch (error: any) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: error?.response?.data,
                showConfirmButton: true,
                confirmButtonText: "ตกลง",
            });
        }
    };

    useEffect(() => {
        getListDoctors();
    }, [session?.token]);

    return <div>
        {listDoctors.map((item, index) => {
            return (
                <div>{item.name}</div>
            )
        })}
    </div>;
}
