import { clsx, type ClassValue } from "clsx";
import { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type AsyncFunc = (e: ChangeEvent<HTMLInputElement>, ...rest: any) => Promise<void>;

/**
 * Debounces a function, so that it is only called after a certain amount of time
 * has passed since the last time it was called.
 *
 * @param {Function} func - the function to debounce
 * @param {number} delay - the amount of time to wait before calling the function
 * @returns {Function} - the debounced function
 */
export const debounce = (func: AsyncFunc, delay: number) => {
    let timer: number;
    return async (e: ChangeEvent<HTMLInputElement>, ...rest: any) => {
        // if (timer) {
        //   window.clearTimeout(timer);
        // }
        window.clearTimeout(timer);
        timer = window.setTimeout(async () => {
            await func(e, ...rest);
        }, delay);
    };
};

export const capitalize = (src: string) => {
    let name = "";
    src.split(" ").forEach((val) => {
        name += val.at(0)?.toUpperCase();
    });

    return name;
};
