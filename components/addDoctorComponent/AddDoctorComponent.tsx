"use client";
import InputPrimary from "@/common/input/InputPrimary";
import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import ButtonPrimary from "@/common/button/ButtonPrimary";
import { BLACK_PRIMARY, RED_ERROR, WHITE_PRIMARY } from "@/constant/COLORS";
import PaperPrimary from "@/common/paper/PaperPrimary";
import Swal from "sweetalert2";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { DatePicker } from "@/common/date/DatePicker";

type Props = {};

type ITimeSlot = {
    id: number;
    date: string;
    start: string;
    end: string;
};

export interface IDoctor {
    name: string;
    special: string;
    timeSlot: ITimeSlot[];
}

interface ISpecial {
    special: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function AddDoctorComponent({}: Props) {
    const { data: session }: any = useSession();
    const navigate: AppRouterInstance = useRouter();
    const [name, setName] = useState<string>("");
    const [special, setSpecial] = useState<string>("");
    const [date, setDate] = useState<Date | undefined>();
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [countTimeSlot, setCountTimeSlot] = useState<ITimeSlot[]>([]);
    const [specialList, setSpecialList] = useState<ISpecial[]>([]);


    const checkToken = () => {
        if (!session?.token) {
            Swal.fire({
                icon: "error",
                title: "กรุณาเข้าสู่ระบบ",
                text: "Session หมดอายุ กรุณาเข้าสู่ระบบใหม่",
                showConfirmButton: true,
                confirmButtonText: "ตกลง"
            }).then(() => {
                navigate.push('/login');
            });
            return false;
        }
        return true;
    };

    const handleSelectChange = (value: string) => {
        setSpecial(value);
    };

    const handleAdd = () => {
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
                    Authorization: `Bearer ${session.token}`,
                },
            })
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "เพิ่มแพทย์สำเร็จ",
                    text: response.data.name,
                    timer: 2000,
                    showConfirmButton: false,
                }).then(() => {
                    navigate.push('/management');
                })
            }
        } catch (error: any) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: error?.response?.data,
                showConfirmButton: true,
                confirmButtonText: "ตกลง",
            })
        }
    };

    useEffect(() => {
        const getSpecialty = async () => {
            if (!checkToken()) return;

            try {
                const response = await axios.get(`${baseUrl}/getSpecials`, {
                    headers: {
                        Authorization: `Bearer ${session?.token}`,
                    },
                })
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
                    confirmButtonText: "ตกลง"
                })
            }
        };
        getSpecialty();
    },[session?.token])

    return (
        <div className="flex flex-col gap-4">
            <InputPrimary
                label="ชื่อ"
                type="text"
                value={name}
                placeholder="กรุณากรอกชื่อ"
                onChange={(value) => setName(value)}
            />
            <Select value={special} onValueChange={handleSelectChange}>
                <SelectTrigger className="w-40">
                    <SelectValue placeholder="ความชำนาญ" />
                </SelectTrigger>
                <SelectContent>
                    {specialList.map((item, index) => {
                        return (
                            <SelectItem key={index} value={item.special}>{item.special}</SelectItem>
                        )
                    })}
                </SelectContent>
            </Select>
            <label>เพิ่มเวลานัดหมาย</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {countTimeSlot.map((item, index) => {
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
                        onClick={() => handleAdd()}
                    />
                </PaperPrimary>
            </div>
            <ButtonPrimary
                text="เพิ่มหมอ"
                textColor={WHITE_PRIMARY}
                bgColor={BLACK_PRIMARY}
                onClick={() => handleSubmit()}
                disabled={name == "" || special == "" || countTimeSlot.length == 0}
            />
        </div>
    );
}
