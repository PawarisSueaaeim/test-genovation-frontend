"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AddDoctorComponent, {
    ITimeSlot,
} from "../addDoctorComponent/AddDoctorComponent";
import PaperPrimary from "@/common/paper/PaperPrimary";
import DoctorForm from "../ui/doctorForm";
import ButtonPrimary from "@/common/button/ButtonPrimary";
import { BLACK_PRIMARY, WHITE_PRIMARY } from "@/constant/COLORS";

type Props = {
    id: string;
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function EditDoctorComponent({ id }: Props) {
    const { data: session }: any = useSession();
    const [name, setName] = useState<string>("");
    const [special, setSpecial] = useState<string>("");
    const [timeSlot, setTimeSlot] = useState<ITimeSlot[]>([]);
    const navigate = useRouter();

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
		if (!date) return;
        const newTimeSlot = {
            id: timeSlot.length + 1,
            date: date.toISOString().split('T')[0],
            start: startTime,
            end: endTime,
        };
        setTimeSlot([...timeSlot, newTimeSlot]);
    };

    const getDoctor = async () => {
        if (!checkToken()) return;

        try {
            const response = await axios.get(`${baseUrl}/getDoctor/${id}`, {
                headers: {
                    Authorization: `Bearer ${session?.token}`,
                },
            });
            if (response.status === 200) {
                setName(response.data.name);
				setSpecial(response.data.special);
				setTimeSlot(response.data.timeSlot);
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

	const handleDeleteTimeSlot = (id: number) => {
        setTimeSlot((prev) => prev.filter((item) => item.id !== id));
    };

	const handleSubmit = () => {
		console.log(name);
		console.log(special);
		console.log(timeSlot);
	};

    useEffect(() => {
        getDoctor();
    }, [session?.token]);

    return (
        <PaperPrimary className="p-10">
            <DoctorForm
				name={name}
				onNameChanged={setName}
				special={special}
				onSpecialChanged={setSpecial}
				timeSlot={timeSlot}
				handleDeleteTimeSlot={handleDeleteTimeSlot}
				handleAdd={handleAdd}
			/>
			<ButtonPrimary
                text="บันทึก"
                textColor={WHITE_PRIMARY}
                bgColor={BLACK_PRIMARY}
                onClick={() => handleSubmit()}
                disabled={
                    name == "" || special == "" || timeSlot.length == 0
                }
            />
        </PaperPrimary>
    );
}
