import React from "react";
import { CircleX } from "lucide-react";
import { twMerge } from "tailwind-merge";

export default function Modal({ setOpen, open, children, className }) {
  return (
    open && (
      <div className="absolute inset-0 z-40 flex items-center justify-center">
        <div
          className="absolute bottom-0 left-0 z-20 min-w-full min-h-full bg-black/20 -top-5"
          onClick={() => {
            setOpen(false);
          }}
        ></div>

        <div
          className={twMerge(
            "relative z-30 w-[90%] md:w-[70%] lg:w-[60%] 2xl:w-[40%] bg-white rounded-2xl p-6 md:py-8 space-y-4",
            className
          )}
        >
          <CircleX
            className="absolute top-0 right-0 m-5 transition-all duration-200 cursor-pointer hover:text-gray-500"
            onClick={() => {
              setOpen(false);
            }}
          />

          {children}
        </div>
      </div>
    )
  );
}
