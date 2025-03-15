"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";

type Props = {};

export interface IMenuHeader {
    menu: string;
    link: string;
}

const menuData: IMenuHeader[] = [{ menu: "การจัดการ", link: "/management" }];

export default function Header({}: Props) {
    const [onOpen, setOnOpen] = useState(false);
    const [path, setPath] = useState("");
    const { data: session }: any = useSession();

    useEffect(() => {
        if (typeof window !== "undefined") {
            setPath(window.location.pathname);
        }
    },[]);

    return (
        <div
            className={`${
                path?.includes("login") ? "hidden" : ""
            } relative shadow-2xl p-4 w-full`}
        >
            <div className="flex justify-between items-center pr-4">
                <div className="text-2xl">
                    {session ? <span>{session.user.username}</span> : "Logo"}
                </div>
                <div className="flex items-center gap-2">
                    {session ? (
                        <span
                            onClick={() => signOut()}
                            className="md:hidden active:scale-95 flex gap-1 items-center"
                        >
                            <span className="text-xs text-blue-500">
                                Logout
                            </span>
                        </span>
                    ) : (
                        <span
                            onClick={() => signIn()}
                            className="md:hidden active:scale-95 flex gap-1 items-center"
                        >
                            <span className="text-xs text-blue-500">Login</span>
                        </span>
                    )}
                    <IoIosMenu
                        className="md:hidden h-8 w-8"
                        onClick={() => setOnOpen(true)}
                    />
                </div>
                <div className="hidden md:flex flex-nowrap items-center">
                    {menuData.map((item, index) => {
                        return (
                            <Link
                                href={item.link}
                                key={index}
                                className="hover:bg-WHITE_PRIMARY rounded duration-200 p-4 respond"
                            >
                                {item.menu}
                            </Link>
                        );
                    })}
                    {session ? (
                        <span
                            onClick={() => signOut()}
                            className="flex flex-col items-end justify-center hover:bg-WHITE_PRIMARY rounded duration-200 p-4 active:scale-95 gap-2"
                        >
                            <span>{session.user.username}</span>
                            <span className="text-blue-500 hover:underline text-xs">
                                ออกจากระบบ
                            </span>
                        </span>
                    ) : (
                        <span
                            onClick={() => signIn()}
                            className="flex items-center hover:bg-WHITE_PRIMARY rounded duration-200 p-4 active:scale-95"
                        >
                            เข้าสู่ระบบ
                        </span>
                    )}
                </div>
            </div>
            <div
                className={`fixed top-0 bg-gray-100 ${
                    onOpen
                        ? "right-0 duration-300"
                        : "right-[-200px] duration-300"
                } h-screen p-2 z-[100]`}
            >
                <FaLongArrowAltRight onClick={() => setOnOpen(false)} />
                <div className="flex flex-col font-normal gap-4 mt-2">
                    {menuData.map((item, index) => {
                        return (
                            <Link
                                href={item.link}
                                className="py-2 px-8 respond"
                                key={index}
                            >
                                {item.menu}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
