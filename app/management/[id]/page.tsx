//@ts-ignore
import { PageProps } from "@/.next/types/app/page";
import TitlePage from "@/common/title/TitlePage";
import EditDoctorComponent from "@/components/managements/EditDoctorComponent";
import React from "react";

export default async function EditDoctor({ params }: PageProps) {
    const { id } = await params;

    return <div className="min-h-screen flex flex-col">
        <TitlePage text="แก้ไข"/>
        <EditDoctorComponent id={id}/>
    </div>;
}
