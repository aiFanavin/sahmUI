import React, { useContext } from "react";
import { SideNavContext } from "./mainSidebar";
import NavLink from "./navLink";
import {Bot, FileAudio, Languages, ScanSearch,Image} from "lucide-react";



export interface NavItemIProps {
  title: string;
  icon: string;
  href: string;
}

const NavItem = ({ title, icon, href }: NavItemIProps) => {
  const { open } = useContext(SideNavContext);

  //در اینجا آیکون ها را تعریف کنید
  // Define a mapping from string identifiers to actual icon components
  const iconMap:any = {
    Languages: <Languages />,
    Image: <Image />,
    FileAudio: <FileAudio />,
    Bot: <Bot />,
    ScanSearch: <ScanSearch />,
  };

  return (
    <>
      <li className=" relative flex items-center px-3 my-1 cursor-pointer p-1.5 focus:outline-none transition-colors duration-200 rounded-lg group">
        <NavLink href={href}>
          <div className="flex items-center py-3">
            {/* implement icons here*/}
            <div className="h-6 w-6">{iconMap[icon]}</div>
            <span
              className={`overflow-hidden transition-all ${
                open ? "w-36 h-6 mr-3" : "h-6 w-0"
              } `}
            >
              {title}
            </span>
          </div>
        </NavLink>
        {/* tooltip for the Menus items*/}
        {!open && (
          <div
            className={`
          absolute text-center right-[80px] rounded-md px-3 py-1 bg-blue-100 text-black text-xs invisible opacity-20 translate-x-3 transition-all w-[90px] whitespace-normal break-words group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 `}
            style={{
              wordBreak: "break-word",
              whiteSpace: "normal", // Allow text to wrap
            }}
          >
            {title}
          </div>
        )}
      </li>
    </>
  );
};

export default NavItem;
