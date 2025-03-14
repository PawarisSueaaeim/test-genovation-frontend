import Link from "next/link";
import React from "react";
import PaperPrimary from "../../common/paper/PaperPrimary";
import LoginComponent from "@/components/auth/LoginComponent";

type Props = {};

export default function Login({}: Props) {
    return (
        <div className="min-h-screen flex items-center justify-center">
			<PaperPrimary className="p-8">
				<div className="flex flex-col gap-4">
					<LoginComponent/>
					<hr className="w-full"/>
					<div className="flex justify-center items-center gap-2">
						<span className="text-xs">ยังไม่มีบัญชีผู้ใช้ ?:</span>
						<Link href="/register" className="text-blue-500 hover:underline">ลงทะเบียน</Link>
					</div>
				</div>
			</PaperPrimary>
        </div>
    );
}
