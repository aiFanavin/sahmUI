"use client";
import img from "../../public/images/logoipsum-293.svg";
import React, {useState, createContext} from "react";
import localFont from "next/font/local";
import {NavItemIProps} from "./sideBarItem";
import NavItem from "./sideBarItem";
import Image from "next/image";
import {ArrowLeft, LogOut} from "lucide-react";
import Link from "next/link";

import federatedLogout from "@/utils/federatedLogout";

type NavItemsIProps = Array<NavItemIProps>;

interface SideNavContextProps {
    open: boolean;
}

//getting the state of the open for using into other files
export const SideNavContext = createContext<SideNavContextProps>({
    open: true,
});
const myFont = localFont({src: "../../public/fonts/IRANSansX Regular.woff"});

interface Props {
    Name: string | null | undefined;
    email: string | null | undefined;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const MainSidebar: React.FC<Props> = ({ Name, email, children}) => {
    const [open, setOpen] = useState(true);
    const [profileHover] = useState(false);

    //در اینجا آیتم ها را مشخص کنید
    const Menus: NavItemsIProps = [
        { title: "صفحه ترجمه", icon: "Languages", href: "/translate" },
        { title: "تبدیل عکس به متن", icon: "Image", href: "/ocr" },
         { title: "تبدیل صوت به متن", icon: "FileAudio", href: "/audio-to-text" },
        // { title: "چت بات ", icon: "Bot", href: "/chat-bot" },
        // { title: "تشخیص چهره(مرصاد)", icon: "ScanSearch", href: "/face-detection" },
    ];


    return (
        <div className="flex h-screen" dir="rtl">
            <div dir="rtl" className={myFont.className}>
                <aside
                    className={`flex flex-col justify-between relative items-start h-full py-8 bg-white border-l border-[#e2e6ea] 
  ${open ? "w-64" : "w-[95px]"} duration-300`}
                >
                    <ArrowLeft
                        className={`absolute cursor-pointer -left-4 w-7 
                    border bg-slate-300 rounded-full  ${open && "rotate-180"}`}
                        onClick={() => setOpen(!open)}
                    />
                    <nav className="flex flex-col mr-2 flex-1 w-full">
                        <div
                            className={`relative  flex items-center transition-all duration-300 ${
                                open ? "gap-14 w-[90%]" : "gap-2 w-[75px]"
                            } `}
                        >
                            {/* Logo */}
                            <Link className="inline-block" href="/">
                                <Image
                                    className={`inline-block transition-all mr-2 ${
                                        open ? "h-6" : "w-0 h-6"
                                    } `}
                                    src={img}
                                    alt="logoipsum"
                                />
                            </Link>
                            <div className="group">
                                {/* Profile and Avatar*/}
                                <div
                                    className={`overflow-hidden cursor-pointer bg-[#ef4056] flex items-center justify-center text-white font-bold rounded-full transition-all duration-300 ${
                                        open ? "w-10 h-10" : "w-10 h-10"
                                    }`}
                                >
                                    {Name?.charAt(0).toUpperCase()}
                                </div>
                                {/* Tooltip */}
                                <div
                                    className={`absolute z-10 px-10 py-8 bg-white border border-gray-300 shadow-lg rounded-md 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${
                                        open ? "right-52" : "right-16"
                                    }`}
                                >
                                    <p
                                        className={`text-sm flex text-gray-600  flex-col items-start mb-3 font-semibold ${
                                            profileHover ? "w-20" : "w-20"
                                        }`}
                                    >
                                        {Name}
                                    </p>
                                    <p className="text-sm flex text-gray-600  flex-col items-start mb-3 font-semibold">
                                        {email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <SideNavContext.Provider value={{open}}>
                            <ul className="pt-6 flex-1 px-3 w-full">
                                {Menus.map((menu, index) => {
                                    return (
                                        <NavItem
                                            key={index}
                                            title={menu.title}
                                            icon={menu.icon}
                                            href={menu.href}
                                        />
                                    );
                                })}
                            </ul>
                        </SideNavContext.Provider>
                    </nav>

                    <div className={`flex flex-col items-center w-full  space-y-4`}>
                        {/* logout */}
                        <button
                            onClick={() => federatedLogout()}
                            className={`flex flex-row items-center justify-center overflow-hidden shadow-lg py-3 px-3 rounded-lg
                     bg-gray-100 text-[#ef4056] hover:bg-[#ef4056] hover:text-white transition-colors group ${
                                open ? " w-[80%]" : "w-[60px]"
                            } `}
                        >
                            <LogOut
                                className={`h-6 w-6 transition-all duration-200 ${
                                    open ? "scale-100" : "scale-100"
                                }`}
                            />
                            <span
                                className={`transition-all duration-200 overflow-hidden ${
                                    open ? "w-28 h-6" : "h-6 w-0 "
                                }`}
                            >
                  خروج از سامانه
                </span>
                            {!open && (
                                <div
                                    className={`
                absolute text-center right-[90px] rounded-md px-3 py-1 bg-[#ef4056] text-white text-xs invisible opacity-20 translate-x-3 transition-all w-[70px] whitespace-normal break-words group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 `}
                                    style={{
                                        wordBreak: "break-word",
                                        whiteSpace: "normal", // Allow text to wrap
                                    }}
                                >
                                    خروج از سامانه
                                </div>
                            )}
                        </button>

                    </div>
                </aside>
            </div>
            <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
    );
};
export default MainSidebar;
