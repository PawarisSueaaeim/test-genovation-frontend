"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IDoctor } from "../addDoctorComponent/AddDoctorComponent";
import PaperPrimary from "@/common/paper/PaperPrimary";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import ButtonPrimary from "@/common/button/ButtonPrimary";
import { BLUE_PRIMARY, RED_ERROR, WHITE_PRIMARY } from "@/constant/COLORS";
import { getErrorMessage } from "@/lib/utils";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

interface IBooking {
    doctor_id: string;
    doctor: string;
    special: string;
    id: number;
    date: string;
    start: string;
    end: string;
}
export default function HomepageComponent() {
    const { data: session }: any = useSession();
    const [listDoctor, setListDoctor] = useState<IDoctor[]>([]);
    const [timeSelected, setTimeSelected] = useState<string>("");
    const [bookingDatas, setBookingDatas] = useState<IBooking[]>([]);

    const getListDoctors = async () => {
        try {
            const response = await axios.get(`${baseUrl}/getAllDoctors`, {
                headers: {
                    Authorization: `Bearer ${session?.token}`,
                },
            });
            if (response.status === 200) {
                setListDoctor(response.data);
            }
        } catch (error: unknown) {
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด GetAllDoctors",
                text: getErrorMessage(error),
                confirmButtonText: "OK",
            });
            return {
                error: getErrorMessage(error),
            };
        }
    };

    const getBookDatas = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}/getBooking/${session?.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${session?.token}`,
                    },
                }
            );
            if (response.status === 200) {
                setBookingDatas(response.data);
            }
        } catch (error: unknown) {
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด GetBooking",
                text: getErrorMessage(error),
                confirmButtonText: "OK",
            });
            return {
                error: getErrorMessage(error),
            };
        }
    };

    const handleBook = async (id: string | undefined) => {
        if (timeSelected === "") {
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: "กรุณาเลือกเวลา",
                showConfirmButton: true,
                confirmButtonText: "ตกลง",
            }).then(() => {
                return;
            });
        } else {
            try {
                const data = {
                    timeSelected: timeSelected,
                    doctorId: id,
                };
                const response = await axios.patch(
                    `${baseUrl}/book/${session?.id}`,
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${session?.token}`,
                        },
                    }
                );
                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "สำเร็จ",
                        text: response.data,
                        showConfirmButton: true,
                        confirmButtonText: "ตกลง",
                    }).then(() => {
                        getBookDatas();
                    });
                }
            } catch (error: unknown) {
                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด Booking",
                    text: getErrorMessage(error),
                    confirmButtonText: "OK",
                });
                return {
                    error: getErrorMessage(error),
                };
            } finally {
                getListDoctors();
            }
        }
    };

    const handleCancel = async (id: number, timeSlot: IBooking) => {
        try {
            const response = await axios.post(
                `${baseUrl}/deleteBooking/${session?.id}/${id}/${timeSlot.doctor_id}`, timeSlot,
                {
                    headers: {
                        Authorization: `Bearer ${session?.token}`,
                    },
                }
            );
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "ยกเลิกสำเร็จ",
                    text: response.data,
                    timer: 1500,
                    showConfirmButton: false,
                }).then(() => {
                    getBookDatas();
                    getListDoctors();
                });
            }
        } catch (error: unknown) {
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด Cancel booking",
                text: getErrorMessage(error),
                confirmButtonText: "OK",
            });
            return {
                error: getErrorMessage(error),
            };
        }
    };

    useEffect(() => {
        if (session?.token) {
            getBookDatas();
            getListDoctors();
        }
    }, [session?.token]);

    return (
        <div className="flex flex-col gap-4">
            <div className="text-xl font-normal">นัดหมาย</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {bookingDatas.map((item, index) => {
                    return (
                        <PaperPrimary
                            key={index}
                            className="flex flex-col gap-2 p-4"
                        >
                            <div className="flex">
                                {item.doctor}: {item.special}
                            </div>
                            <div className="flex">วันที่: {item.date}</div>
                            <div className="flex">
                                เวลา: {item.start} - {item.end}
                            </div>
                            <ButtonPrimary
                                text="ยกเลิก"
                                bgColor={RED_ERROR}
                                textColor={WHITE_PRIMARY}
                                onClick={() => handleCancel(item.id, item)}
                            />
                        </PaperPrimary>
                    );
                })}
            </div>
            <div className="text-xl font-normal">รายการแพทย์</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {listDoctor.map((item, index) => {
                    return (
                        <PaperPrimary
                            key={index}
                            className="flex flex-col gap-2 p-4"
                        >
                            <div className="flex text-xl gap-2">
                                <span className="font-bold">ความชำนาญ:</span>
                                <span className="font-light">
                                    {item.special}
                                </span>
                            </div>
                            <div className="flex text-sm gap-2">
                                <span className="font-bold">ชื่อ:</span>
                                <span className="font-light">{item.name}</span>
                            </div>
                            <PaperPrimary>
                                <Select
                                    value={timeSelected}
                                    onValueChange={(value) =>
                                        setTimeSelected(value)
                                    }
                                >
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
                                                    <span>
                                                        วันที่: {item.date}
                                                    </span>
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
        </div>
    );
}
