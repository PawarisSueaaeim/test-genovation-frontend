import React from "react";

type Props = {
    className?: string;
    children: React.ReactNode;
};

export default function PaperPrimary({ children, className }: Props) {
    return (
        <div
            className={`${className} grid grid-cols-1 md:grid-cols-2 shadow-xl rounded-xl`}
        >
            {children}
        </div>
    );
}
