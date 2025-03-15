"use client";
import InputPrimary from "@/common/input/InputPrimary";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { DatePicker } from "@/common/date/DatePicker";
import ButtonPrimary from "@/common/button/ButtonPrimary";
import { BLACK_PRIMARY, WHITE_PRIMARY } from "@/constant/COLORS";
import { DatePickerRange } from "@/common/date/DatePickerRange";
import { DateRange } from "react-day-picker";

type Props = {};

interface ITimeSlot {
    date: string;
    start: Date;
    end: Date;
}

interface IInputs {
    name: string;
    special: string;
    timeSlot: ITimeSlot[];
}

export default function AddDoctorComponent({}: Props) {
    const { data: session } = useSession();
    const [name, setName] = useState<string>("");
    const [special, setSpecial] = useState<string>("");
    const [date, setDate] = useState<DateRange | undefined>();
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");

    const handleSubmit = () => {
        console.log(name);
        console.log(special);
        console.log({
            date: date,
            start: startTime,
            end: endTime,
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <InputPrimary
                label="ชื่อ"
                type="text"
                value={name}
                placeholder="กรุณากรอกชื่อ"
                onChange={(value) => setName(value)}
            />
            <Select>
                <SelectTrigger className="w-40">
                    <SelectValue placeholder="ความชำนาญ" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="001">กระดูก</SelectItem>
                    <SelectItem value="002">สมอง</SelectItem>
                    <SelectItem value="003">ตา</SelectItem>
                    <SelectItem value="004">หัวใจ</SelectItem>
                    <SelectItem value="005">ทางเดินอาหาร</SelectItem>
                </SelectContent>
            </Select>
            <label>เลือกวัน</label>
            <DatePickerRange onChange={(date) => setDate(date)} />
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
                value={endTime}
                onChange={(value) => setEndTime(value)}
            />
            <ButtonPrimary
                text="เพิ่มหมอ"
                textColor={WHITE_PRIMARY}
                bgColor={BLACK_PRIMARY}
                onClick={() => handleSubmit()}
            />
        </div>
    );
}
