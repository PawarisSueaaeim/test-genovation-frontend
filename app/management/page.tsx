"use client";
import ButtonPrimary from "@/common/button/ButtonPrimary";
import TitlePage from "@/common/title/TitlePage";
import { IDoctor } from "@/components/addDoctorComponent/AddDoctorComponent";
import TablePrimary from "@/components/table/TablePrimary";
import { BLACK_PRIMARY, WHITE_PRIMARY } from "@/constant/COLORS";
import axios from "axios";
import { useSession } from "next-auth/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

type Props = {};

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Management({}: Props) {
    const { data: session }: any = useSession();
    const nagivate: AppRouterInstance = useRouter();
    const [doctorList, setDoctorList] = useState<IDoctor[]>([]);

    const checkToken = () => {
        if (!session?.token) {
            Swal.fire({
                icon: "error",
                title: "กรุณาเข้าสู่ระบบ",
                text: "Session หมดอายุ กรุณาเข้าสู่ระบบใหม่",
                showConfirmButton: true,
                confirmButtonText: "ตกลง",
            }).then(() => {
                nagivate.push("/login");
            });
            return false;
        }
        return true;
    };

    const getAllDoctors = async () => {
        if (!checkToken()) return;

        try {
            const response = await axios.get(`${baseUrl}/getAllDoctors`, {
                headers: {
                    Authorization: `Bearer ${session?.token}`,
                },
            });
            if (response.status === 200) {
                setDoctorList(response.data);
            }
        } catch (error: any) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: error.response.data,
                showConfirmButton: true,
                confirmButtonText: "ตกลง",
            });
        }
    };

    const handleOnClickAction1 = (id: string) => {
        console.log("onClickEditAdmin", id);
    };

    const handleOnClickDeleteAdmin = (id: string) => {
        Swal.fire({
            icon: "warning",
            title: "แจ้งเตือน",
            text: "คุณต้องการลบข้อมูลนี้หรือไม่",
            showCancelButton: true,
            confirmButtonText: "ตกลง",
            cancelButtonText: "ยกเลิก",
        }).then( async (result) => {
            try {
                if (result.isConfirmed) {
                    const response = await axios.delete(`${baseUrl}/deleteDoctor/${id}`, {
                        headers: {
                            Authorization: `Bearer ${session?.token}`,
                        },
                    });
                    if (response.status === 200) {
                        Swal.fire({
                            icon: "success",
                            title: "ลบข้อมูลสำเร็จ",
                        }).then(() => {
                            getAllDoctors();
                        });
                    }
                }
            } catch (error: any) {
                console.log(error)
                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    text: error.response.data,
                    showConfirmButton: true,
                    confirmButtonText: "ตกลง",
                })
            }
        })
    };

    useEffect(() => {
        getAllDoctors();
    }, [session?.token]);

    return (
        <div className="flex flex-col gap-4 min-h-screen w-full py-10">
            <TitlePage text="การจัดการ" />
            <TablePrimary
                tableBodyDatas={doctorList}
                tableHeaderDatas={[
                    { tHeadTiltle: "ID", cssTextAlign: "center", key: "_id" },
                    { tHeadTiltle: "ชื่อ", cssTextAlign: "left", key: "name" },
                    {
                        tHeadTiltle: "spacial",
                        cssTextAlign: "left",
                        key: "special",
                    },
                    { tHeadTiltle: "Action", cssTextAlign: "center" },
                ]}
                rowsPerPage={25}
                keyValue="_id"
                hasSwitchBtn={false}
                hasCheckBox={false}
                hasAction1={true}
                actionText1="แก้ไข"
                onClickAction1={(id: string) => handleOnClickAction1(id)}
                hasAction2={true}
                actionText2="ลบ"
                onClickAction2={(id: string) => handleOnClickDeleteAdmin(id)}
            />
            <Link href="/addDoctor">
                <ButtonPrimary
                    text="เพิ่มหมอ"
                    bgColor={BLACK_PRIMARY}
                    textColor={WHITE_PRIMARY}
                />
            </Link>
        </div>
    );
}
