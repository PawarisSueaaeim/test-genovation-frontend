import TitlePage from "@/common/title/TitlePage";
import EditDoctorComponent from "@/components/managements/EditDoctorComponent";
import React from "react";

type Props = {
    params: {
        id: string;
    };
};

export default async function EditDoctor({ params }: Props) {
    const { id } = await params;


    return <div className="min-h-screen flex flex-col">
        <TitlePage text="แก้ไข"/>
        <EditDoctorComponent id={id}/>
    </div>;
}
