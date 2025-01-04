
import { ReactNode, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SideNavContext } from "./mainSidebar";

interface IProps {
  href: string;
  children: ReactNode;
}

const NavLink = ({ href, children }: IProps) => {
  const { open } = useContext(SideNavContext);

  const path = usePathname();
  const isActive = path === href;

  return (
    <>
      <Link
        href={href}
        className={`transition-all overflow-hidden ${
          isActive
            ? open
              ? "bg-gradient-to-tr cursor-default text-[#2a7de9] duration-75"
              : "text-[#2a7de9] duration-75 border-none"
            : open
            ? "hover:bg-gray-100 text-black"
            : "text-black"
        }`}
      >
        {children}
      </Link>
    </>
  );
};

export default NavLink;
