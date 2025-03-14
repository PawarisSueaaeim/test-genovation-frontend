'use client'
import React, { useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";

type Props = {
    label?: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    required?: boolean;
    disabled?: boolean;
    textHelper?: string;
};

export default function InputPrimary({
    label,
    type,
    placeholder,
    value,
    onChange,
    className,
    required,
    disabled,
    textHelper
}: Props) {
    const [isShowPassword, setIsShowPassword] = useState(false);

    return (
        <div className="flex flex-col w-full">
            <label className="text-xs lg:text-sm">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <div
                className={`${className} flex border items-center border-gray-300 rounded-lg justify-between px-2`}
            >
                <input
                    type={type == "password" && isShowPassword ? "text" : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="text-xs border-none rounded-lg p-2 focus-within:outline-none"
                    disabled={disabled}
                    required={required}
                />
                {type == "password" &&
                    (isShowPassword ? (
                        <GoEyeClosed onClick={() => setIsShowPassword(false)} />
                    ) : (
                        <GoEye onClick={() => setIsShowPassword(true)} />
                    ))}
            </div>
            <span className="text-red-500 text-xs">{textHelper}</span>
        </div>
    );
}
