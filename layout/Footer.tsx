import Image from "next/image";
import React from "react";

type Props = {};

export default function Footer({}: Props) {
    return (
        <div className="relative h-[150px] w-full">
            <div className="flex justify-center font-light text-[14px]">© Pawaris Rabeab | v0.0.1</div>
        </div>
    );
}
