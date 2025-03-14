import React from "react";

type Props = {
    text: string;
    onClick?: () => void;
    bgColor?: string;
    textColor?: string;
    className?: string;
    disabled?: boolean;
};

export default function ButtonPrimary({
    text,
    onClick,
    bgColor,
    textColor,
    className,
    disabled
}: Props) {
    return (
        <button
            className={`${className} flex justify-center items-center rounded-md hover:cursor-pointer duration-75 active:scale-95 p-2 text-[12px] md:text-[16px] w-full`}
            disabled={disabled}
            onClick={onClick}
            style={{
                backgroundColor: disabled ? "#666" : bgColor || undefined,
                color: textColor,
            }}
        >
            {text}
        </button>
    );
}
