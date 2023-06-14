import { type } from "os";
import React, { forwardRef } from "react";
import { twMerge } from 'tailwind-merge';

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className, disabled, type = 'button', ...props }, ref) => {
        return (
            <button
                type={type}
                className={twMerge(
                    `
                    w-full
                    rounded-full
                    bg-green-500
                    border
                    border-transparent
                    px-4
                    py-2
                    text-black
                    font-semibold
                    hover:opacity-75
                    transition-opacity
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                `,
                    className
                )}
                disabled={disabled}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        );
    }
)

Button.displayName = "Button";
