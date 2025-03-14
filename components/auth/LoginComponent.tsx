"use client";
import ButtonPrimary from "@/common/button/ButtonPrimary";
import InputPrimary from "@/common/input/InputPrimary";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import Swal from "sweetalert2";

type Props = {};

export default function LoginComponent({}: Props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        const response = await signIn("credentials", {
            username: username,
            password: password,
            redirect: false,
        });
        if (response?.status == 200) {
            Swal.fire({
                icon: "success",
                title: "เข้าสู่ระบบสำเร็จ",
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                window.location.href = "/";
            })
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <span className="text-2xl font-bold">เข้าสู่ระบบ</span>
            <div className="flex flex-col gap-2">
                <InputPrimary
                    label="Username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <InputPrimary
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <ButtonPrimary
                    text="เข้าสู่ระบบ"
                    onClick={() => handleSubmit()}
                    bgColor="#000"
                    textColor="#fff"
                />
            </div>
        </div>
    );
}
