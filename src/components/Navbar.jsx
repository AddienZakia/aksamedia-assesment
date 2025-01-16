import { CircleUserRound, ChevronDown } from "lucide-react";
import { Moon, Computer, Sun } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useAuthStore } from "../store/useStore";

export default function Navbar() {
  const { user } = useAuthStore();
  const [userOpen, setUserOpen] = useState(false);
  const [darkOpen, setDarkOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between py-8">
      {/* Background trigger */}
      <div
        className={twMerge(
          "absolute top-0 left-0 z-10 min-w-full min-h-screen bg-transparent hidden",
          (userOpen || darkOpen) && "block"
        )}
        onClick={() => {
          setUserOpen(false);
          setDarkOpen(false);
        }}
      ></div>

      <a href="/admin">
        <h1 className="text-xl font-semibold text-darkBlue-main">Admin</h1>
      </a>

      <div className="flex items-center justify-center space-x-4">
        {/* Dark mode toggle */}
        <div
          className="relative flex items-center justify-center space-x-3 cursor-pointer"
          onClick={() => setDarkOpen((pre) => !pre)}
        >
          <Moon size={28} className="text-darkBlue-main" />
          <div
            className={twMerge(
              "absolute right-0 z-10 py-3 px-4 space-y-1 bg-white cursor-auto rounded-xl transition-all duration-200",
              darkOpen ? "top-8 opacity-100" : "-top-96 opacity-0"
            )}
          >
            <h1 className="flex px-3 py-2 pr-8 space-x-2 font-medium rounded-md cursor-pointer hover:bg-lightBlue">
              <Moon />
              <span>Dark</span>
            </h1>
            <h1 className="flex px-3 py-2 pr-8 space-x-2 font-medium rounded-md cursor-pointer hover:bg-lightBlue">
              <Sun />
              <span>Light</span>
            </h1>
            <h1 className="flex px-3 py-2 pr-8 space-x-2 font-medium rounded-md cursor-pointer hover:bg-lightBlue">
              <Computer />
              <span>System</span>
            </h1>
          </div>
        </div>

        {/* Profile toggle */}
        <div
          className="relative flex items-center justify-center space-x-2 cursor-pointer"
          onClick={() => setUserOpen((pre) => !pre)}
        >
          <p className="font-medium text-black">{user.name}</p>
          <CircleUserRound size={28} className="text-darkBlue-main" />
          <ChevronDown
            className={twMerge(
              "transition-all duration-200",
              userOpen && "rotate-180"
            )}
          />
          <div
            className={twMerge(
              "absolute right-0 z-10 p-6 space-y-3 bg-white cursor-auto rounded-xl transition-all duration-200",
              userOpen ? "top-8 opacity-100" : "-top-96 opacity-0"
            )}
          >
            <div>
              <h1 className="text-xl font-semibold">{user.name}</h1>
              <p className="text-gray-500">{user.email}</p>
            </div>

            <button className="w-full py-2 font-semibold text-white transition-opacity duration-200 bg-red-500 rounded-md hover:bg-red-700">
              Log out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
