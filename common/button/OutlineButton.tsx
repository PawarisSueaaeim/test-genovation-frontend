import { MouseEventHandler, ReactNode, useState } from 'react';
import { BLACK_PRIMARY, BLUE_PRIMARY, WHITE_PRIMARY } from '@/constant/COLORS';

type HoverableButtonProps = {
    className?: string
    text: string
    color: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    reactIcon?: ReactNode;
}

export default function OutlineButton({
    className,
    text,
    color,
    onClick,
    disabled,
    reactIcon,
}: HoverableButtonProps) {

    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`${disabled ? '' : 'clickable cursor-pointer'} flex justify-center items-center gap-x-1.5 rounded-lg px-4 py-1 select-none break-all transition-colors duration-150 ${className}`}
            style={{
                border: '1px solid',
                borderColor: disabled ? BLUE_PRIMARY : color,
                backgroundColor: disabled ? BLUE_PRIMARY : isHovered ? color : WHITE_PRIMARY,
                color: disabled ? BLACK_PRIMARY : isHovered ? WHITE_PRIMARY : color,
            }}
            disabled={disabled}
        >
            {reactIcon}
            {text}
        </button>
    )
}
