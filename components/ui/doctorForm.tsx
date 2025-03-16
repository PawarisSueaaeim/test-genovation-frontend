"use client";
import InputPrimary from "@/common/input/InputPrimary";
import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./select";
import PaperPrimary from "@/common/paper/PaperPrimary";
import ButtonPrimary from "@/common/button/ButtonPrimary";
import { DatePicker } from "@/common/date/DatePicker";
import { BLACK_PRIMARY, RED_ERROR, WHITE_PRIMARY } from "@/constant/COLORS";
import { ITimeSlot } from "../addDoctorComponent/AddDoctorComponent";
import axios from "axios";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

interface Props {
    name: string;
    special: string;
    timeSlot: ITimeSlot[];
    onNameChanged: (value: string) => void;
    onSpecialChanged: (value: string) => void;
    handleDeleteTimeSlot: (id: number) => void;
    handleAdd: (date: Date | undefined, startTime: string, endTime: string) => void;
}

interface ISpecial {
    special: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function DoctorForm({
    name,
    special,
    timeSlot,
    onNameChanged,
    onSpecialChanged,
    handleDeleteTimeSlot,
    handleAdd,
}: Props) {
    const { data: session }: any = useSession();
    const [specialList, setSpecialList] = useState<ISpecial[]>([]);
    const [date, setDate] = useState<Date>();
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");

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

    useEffect(() => {
        const getSpecialty = async () => {
            if (!checkToken()) return;

            try {
                const response = await axios.get(`${baseUrl}/getSpecials`, {
                    headers: {
                        Authorization: `Bearer ${session?.token}`,
                    },
                });
                if (response.status === 200) {
                    setSpecialList(response.data);
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
        getSpecialty();
    }, [session?.token]);

    return (
        <div className="flex flex-col gap-4">
            <InputPrimary
                label="ชื่อ"
                type="text"
                value={name}
                placeholder="กรุณากรอกชื่อ"
                onChange={(value) => onNameChanged(value)}
            />
            <Select
                value={special}
                onValueChange={(value) => onSpecialChanged(value)}
            >
                <SelectTrigger className="w-40">
                    <SelectValue placeholder="ความชำนาญ" />
                </SelectTrigger>
                <SelectContent>
                    {specialList.map((item, index) => {
                        return (
                            <SelectItem key={index} value={item.special}>
                                {item.special}
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
            <label>เพิ่มเวลานัดหมาย</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {timeSlot.map((item, index) => {
                    return (
                        <PaperPrimary
                            key={index}
                            className="flex flex-col justify-between gap-2 p-4"
                        >
                            <div>
                                <div>วันที่: {item.date}</div>
                                <div>
                                    เวลาทำงาน: {item.start} to {item.end}
                                </div>
                            </div>
                            <ButtonPrimary
                                text="ลบ"
                                textColor={WHITE_PRIMARY}
                                bgColor={RED_ERROR}
                                onClick={() => handleDeleteTimeSlot(item.id)}
                            />
                        </PaperPrimary>
                    );
                })}
                <PaperPrimary className="flex flex-col gap-2 p-4">
                    <DatePicker onChange={(date: Date) => setDate(date)} />
                    <InputPrimary
                        type="time"
                        label="เวลาเริ่มทำงาน"
                        placeholder="กรุณาเลือกเวลา"
                        value={startTime}
                        onChange={(value) => setStartTime(value)}
                    />
                    <InputPrimary
                        type="time"
                        label="เวลาสิ้นสุด"
                        placeholder="กรุณาเลือกเวลา"
                        minTime={startTime}
                        value={endTime}
                        onChange={(value) => setEndTime(value)}
                    />
                    <ButtonPrimary
                        text="เพิ่ม"
                        textColor={WHITE_PRIMARY}
                        bgColor={BLACK_PRIMARY}
                        onClick={() => handleAdd(date, startTime, endTime)}
                    />
                </PaperPrimary>
            </div>
        </div>
    );
}
