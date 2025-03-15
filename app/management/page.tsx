'use client'
import ButtonPrimary from '@/common/button/ButtonPrimary';
import TitlePage from '@/common/title/TitlePage';
import TablePrimary from '@/components/table/TablePrimary';
import { BLACK_PRIMARY, WHITE_PRIMARY } from '@/constant/COLORS';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'

type Props = {}

export default function Management({}: Props) {
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

	return (
		<div className="flex flex-col gap-4 min-h-screen w-full py-10">
            <TitlePage text='การจัดการ'/>
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
            <Link
                href='/addDoctor'
            >
                <ButtonPrimary
                    text='เพิ่มหมอ'
                    bgColor={BLACK_PRIMARY}
                    textColor={WHITE_PRIMARY}
                />
            </Link>
		</div>
	)
}