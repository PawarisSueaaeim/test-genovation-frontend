"use client";
import React, { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { register } from "@/api/auth";
import InputPrimary from "@/common/input/InputPrimary";
import ButtonPrimary from "@/common/button/ButtonPrimary";

type Props = {};

export default function RegisterComponent({}: Props) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [invalidPassword, setInvalidPassword] = useState<string[]>([]);
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [disabled, setDisabled] = useState<boolean>(true);

    const validatePassword = useCallback((password: string): string[] => {
        const error = [];

        if (password.length < 8) {
            error.push("01");
        }
        if (!/[A-Z]/.test(password)) {
            error.push("02");
        }
        if (!/\d/.test(password)) {
            error.push("03");
        }
        if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
            error.push("04");
        }

        return error;
    }, []);

    const handleSubmit = async () => {
        const response = await register({
            username: username,
            password: password,
        });
		if (response) {
			if (response.status == 200) {
				Swal.fire({
					icon: "success",
					title: "ลงทะเบียนสำเร็จ",
					text: response.data,
					showConfirmButton: false,
					timer: 1500,
				}).then(() => {
					window.location.href = "/login";
				});
			}
		}
    };

    useEffect(() => {
        if (
            username !== "" &&
            password !== "" &&
            confirmPassword !== "" &&
            password === confirmPassword &&
            invalidPassword.length === 0
        ) {
            setDisabled(false);
        }
    }, [username, password, invalidPassword, confirmPassword]);

    useEffect(() => {
        setInvalidPassword(validatePassword(password));
    }, [password]);

    return (
        <div className="flex flex-col justify-center items-center w-full gap-4">
            <span className="text-2xl font-bold">ลงทะเบียน</span>
            <div className="flex flex-col gap-2">
                <InputPrimary
                    label="Username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(event) => setUsername(event)}
                    textHelper={username == "" ? "**กรุณากรอกชื่อผู้ใช้" : ""}
                />
                <InputPrimary
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event)}
                    textHelper={password == "" ? "**กรุณากรอกรหัสผ่าน" : ""}
                />
                <InputPrimary
                    type="password"
                    placeholder="Comfirm password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event)}
                    textHelper={
                        password !== confirmPassword
                            ? "**รหัสผ่านไม่ตรงกัน"
                            : ""
                    }
                />
                <hr />
                <ul className="text-gray-600 text-xs lg:text-sm">
                    <li className="flex items-center gap-2">
                        <div
                            className={`${
                                invalidPassword.includes("01")
                                    ? "bg-red-500 duration-300"
                                    : "bg-green-500"
                            } duration-300 w-2 h-2 rounded-full`}
                        />
                        รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร
                    </li>
                    <li className="flex items-center gap-2">
                        <div
                            className={`${
                                invalidPassword.includes("02")
                                    ? "bg-red-500 duration-300"
                                    : "bg-green-500"
                            } duration-300 w-2 h-2 rounded-full`}
                        />
                        รหัสผ่านต้องมีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว
                    </li>
                    <li className="flex items-center gap-2">
                        <div
                            className={`${
                                invalidPassword.includes("03")
                                    ? "bg-red-500 duration-300"
                                    : "bg-green-500"
                            } duration-300 w-2 h-2 rounded-full`}
                        />
                        รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว
                    </li>
                    <li className="flex items-center gap-2">
                        <div
                            className={`${
                                invalidPassword.includes("04")
                                    ? "bg-red-500 duration-300"
                                    : "bg-green-500"
                            } duration-300 w-2 h-2 rounded-full`}
                        />
                        รหัสผ่านต้องมีตัวอักษรพิเศษอย่างน้อย 1 ตัว
                    </li>
                </ul>
                <ButtonPrimary
                    text="ลงทะเบียน"
                    onClick={() => handleSubmit()}
                    bgColor="#000"
                    textColor="#fff"
                    disabled={disabled}
                />
            </div>
        </div>
    );
}
