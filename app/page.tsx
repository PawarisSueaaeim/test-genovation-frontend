"use client";

import ButtonPrimary from "@/common/button/ButtonPrimary";
import TitlePage from "@/common/title/TitlePage";
import TablePrimary from "@/components/table/TablePrimary";
import { BLACK_PRIMARY, WHITE_PRIMARY } from "@/constant/COLORS";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
	const { data: session } = useSession();

	return <div className="min-h-screen flex flex-col items-center justify-center">
		แสดงรายชื่อหมอ
		และ Slot time ที่นัดหมายได้
	</div>
}
