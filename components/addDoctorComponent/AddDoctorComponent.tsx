"use client";
import React, { useState } from "react";
import ButtonPrimary from "@/common/button/ButtonPrimary";
import { BLACK_PRIMARY, WHITE_PRIMARY } from "@/constant/COLORS";
import PaperPrimary from "@/common/paper/PaperPrimary";
import Swal from "sweetalert2";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import DoctorForm from "../ui/doctorForm";

type Props = {};

export interface ITimeSlot {
    id: number;
    date: string;
    start: string;
    end: string;
}

export interface IDoctor {
    _id?: string;
    name: string;
    special: string;
    timeSlot: ITimeSlot[];
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function AddDoctorComponent({}: Props) {
    const { data: session }: any = useSession();
    const navigate: AppRouterInstance = useRouter();
    const [name, setName] = useState<string>("");
    const [special, setSpecial] = useState<string>("");
    const [countTimeSlot, setCountTimeSlot] = useState<ITimeSlot[]>([]);

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

    const handleAdd = (date: Date | undefined, startTime: string, endTime: string) => {
        if (!date || !startTime || !endTime) {
            Swal.fire({
                icon: "info",
                title: "กรุณากรอกข้อมูลให้ครบถ้วน",
                showConfirmButton: true,
                confirmButtonText: "ตกลง",
            });
            return;
        }

        const formattedDate = date
            ? `${date.toISOString().substring(0, 10)}`
            : "";

        const newData = {
            id: Date.now(),
            date: formattedDate,
            start: startTime,
            end: endTime,
        };

        // ตรวจสอบว่ามีข้อมูลซ้ำหรือไม่
        const isDuplicate = countTimeSlot.some(
            (item) =>
                item.date === newData.date &&
                item.start === newData.start &&
                item.end === newData.end
        );

        if (isDuplicate) {
            Swal.fire({
                icon: "warning",
                title: "ข้อมูลซ้ำกัน",
                text: "คุณได้เพิ่มช่วงเวลานี้ไปแล้ว",
                showConfirmButton: true,
                confirmButtonText: "ตกลง",
            });
            return;
        }

        setCountTimeSlot((prev) => [...prev, newData]);
    };

    const handleDeleteTimeSlot = (id: number) => {
        setCountTimeSlot((prev) => prev.filter((item) => item.id !== id));
    };

    const handleSubmit = async () => {
        if (!checkToken()) return;

        try {
            const data: IDoctor = {
                name,
                special,
                timeSlot: countTimeSlot,
            };
            const response = await axios.post(`${baseUrl}/createDoctor`, data, {
                headers: {
                    Authorization: `Bearer ${session?.token}`,
                },
            });
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "เพิ่มแพทย์สำเร็จ",
                    text: response.data.name,
                    timer: 2000,
                    showConfirmButton: false,
                }).then(() => {
                    navigate.push("/management");
                });
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

    return (
        <PaperPrimary className="p-10">
            <DoctorForm
                name={name}
                onNameChanged={setName}
                special={special}
                onSpecialChanged={setSpecial}
                timeSlot={countTimeSlot}
                handleDeleteTimeSlot={handleDeleteTimeSlot}
                handleAdd={handleAdd}
            />
            <ButtonPrimary
                text="เพิ่ม"
                textColor={WHITE_PRIMARY}
                bgColor={BLACK_PRIMARY}
                onClick={() => handleSubmit()}
                disabled={
                    name == "" || special == "" || countTimeSlot.length == 0
                }
            />
        </PaperPrimary>
    );
}
