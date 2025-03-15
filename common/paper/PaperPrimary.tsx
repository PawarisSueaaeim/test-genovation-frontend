import React from "react";

type Props = {
    className?: string;
    children: React.ReactNode;
};

export default function PaperPrimary({ children, className }: Props) {
    return (
        <div
            className={`${className} shadow-xl rounded-xl`}
        >
            {children}
        </div>
    );
}
