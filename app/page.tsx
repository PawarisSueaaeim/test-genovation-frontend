"use client";
import TablePrimary from "@/components/table/TablePrimary";
import { useSession } from "next-auth/react";

export default function Home() {
    const { data: session } = useSession();

	const doctorListDatas = [
        {
			id: 1,
            name: "ปวริศ ระเบียบ",
            special: "กระดูก",
            timeSlot: [
				{date: "2025-04-01", start: "08:00", end: "16:00"},
				{date: "2025-04-02", start: "08:00", end: "16:00"},
				{date: "2025-04-03", start: "08:00", end: "16:00"},
			],
        },
    ];

    const handleOnClickAction1 = (id: string) => {
        console.log("onClickEditAdmin", id);
    };

    const handleOnClickDeleteAdmin = (id: string) => {
        console.log("onClickDeleteAdmin", id);
    };

	const handleOnClickCheckBox = (id: string, value: boolean) => {
		console.log("onClickCheckBox", id, value);
	}

	return (
		<div className="min-h-screen w-full">
			<TablePrimary
                tableBodyDatas={doctorListDatas}
                tableHeaderDatas={[
                    { tHeadTiltle: "ID", cssTextAlign: "left", key: "id" },
                    { tHeadTiltle: "ชื่อ", cssTextAlign: "left", key: "name" },
                    { tHeadTiltle: "spacial", cssTextAlign: "left", key: "special" },
                    { tHeadTiltle: "Action", cssTextAlign: "center" },
                ]}
                rowsPerPage={25}
                keyValue="id"

                hasSwitchBtn={false}
				hasCheckBox={false}

				hasAction1={true}
                actionText1="แก้ไข"
                onClickAction1={(id: string) => handleOnClickAction1(id)}

				hasAction2={true}
				actionText2="ลบ"
                onClickAction2={(id: string) => handleOnClickDeleteAdmin(id)}
            />
		</div>
	)
}
