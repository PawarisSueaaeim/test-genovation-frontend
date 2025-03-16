"use client";
import { IAuth } from "@/layout/Header";
import axios from "axios";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IDoctor } from "../addDoctorComponent/AddDoctorComponent";
import PaperPrimary from "@/common/paper/PaperPrimary";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import ButtonPrimary from "@/common/button/ButtonPrimary";
import { BLUE_PRIMARY, WHITE_PRIMARY } from "@/constant/COLORS";

type Props = {};

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export default function HomepageComponent({}: Props) {
    const { data: session }: any = useSession();
    const [listDoctor, setListDoctor] = useState<IDoctor[]>([]);
    const [timeSelected, setTimeSelected] = useState<string>("");

    // const checkToken = () => {
    //     if (!session?.token) {
    //         window.location.href = "/login";
    //     }
    //     return true;
    // };

    const getListDoctors = async () => {
        // if (!checkToken()) return;

        try {
            console.log(session);
            const response = await axios.get(`${baseUrl}/getAllDoctors`, {
                headers: {
                    Authorization: `Bearer ${session?.token}`,
                },
            });
            if (response.status === 200) {
                setListDoctor(response.data);
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

    const handleBook = (id: string | undefined) => {
        console.log("id คนไข้: ", session?.id)
        console.log("id หมอ: ",id);
        console.log("id เวลา: ",Number(timeSelected))
    };

    useEffect(() => {
        if (session?.token) getListDoctors();
    }, [session?.token]);

    return (
        <div>
            {listDoctor.map((item, index) => {
                return (
                    <PaperPrimary
                        key={index}
                        className="flex flex-col gap-2 p-4"
                    >
                        <div className="flex text-xl gap-2">
                            <span className="font-bold">ความชำนาญ:</span>
                            <span className="font-light">{item.special}</span>
                        </div>
                        <div className="flex text-sm gap-2">
                            <span className="font-bold">ชื่อ:</span>
                            <span className="font-light">{item.name}</span>
                        </div>
                        <PaperPrimary>
                            <Select value={timeSelected} onValueChange={(value) => setTimeSelected(value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="เลือกช่วงเวลานัดหมาย" />
                                </SelectTrigger>
                                <SelectContent>
                                    {item.timeSlot.map((item, index) => {
                                        return (
                                            <SelectItem
                                                key={index}
                                                value={item.id.toString()}
                                            >
                                                <span>วันที่: {item.date}</span>
                                                <span>
                                                    เวลา: {item.start} -{" "}
                                                    {item.end}
                                                </span>
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                        </PaperPrimary>
                        <ButtonPrimary
                            text="นัดหมาย"
                            bgColor={BLUE_PRIMARY}
                            textColor={WHITE_PRIMARY}
                            onClick={() => handleBook(item._id)}
                        />
                    </PaperPrimary>
                );
            })}
        </div>
    );
}
