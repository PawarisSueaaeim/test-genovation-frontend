import ButtonPrimary from "@/common/button/ButtonPrimary";
import TitlePage from "@/common/title/TitlePage";
import HomepageComponent from "@/components/homepage/HomepageComponent";
import TablePrimary from "@/components/table/TablePrimary";
import { BLACK_PRIMARY, WHITE_PRIMARY } from "@/constant/COLORS";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
	return <div className="min-h-screen flex flex-col">
		<TitlePage text="การนัดหมายแพทย์"/>
		<HomepageComponent/>
	</div>
}
