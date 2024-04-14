import { cn } from "@/lib/utils";
import { Menu, SubLinks } from "@/types/site";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

interface NavItemsProps {
  navItem: Menu;
  setActiveSubLinks: Dispatch<SetStateAction<SubLinks[] | undefined>>;
  setShowDesktopMegaMenu: Dispatch<SetStateAction<boolean>>;
}

const NavItems: React.FC<NavItemsProps> = ({
  navItem: { title, type, externalLink, internalLink, subLinks },
  setActiveSubLinks,
  setShowDesktopMegaMenu,
}) => {
  const hasSubLinks = !!subLinks?.length;
  const [open, setOpen] = useState(false);

  function handleMouseEnter() {
    if (hasSubLinks) {
      setShowDesktopMegaMenu(true);
      setActiveSubLinks(subLinks);
    } else {
      setShowDesktopMegaMenu(false);
    }
  }

  return (
    <li onMouseEnter={handleMouseEnter}>
      <Element
        type={type}
        hasSubLinks={hasSubLinks}
        internalLink={internalLink}
        externalLink={externalLink}
        className="hover:border-primary flex h-full w-full items-center justify-between space-x-2 border-b-2 border-b-transparent py-5 text-lg uppercase transition-[border] duration-300 cursor-pointer"
      >
        <span>{title}</span>
        {hasSubLinks && (
          <button
            className={cn(
              open ? "rotate-180" : "rotate-0",
              "transition-transform duration-300"
            )}
          >
            <ChevronDown />
          </button>
        )}
      </Element>
    </li>
  );
};

export default NavItems;

interface ElementProps {
  hasSubLinks: boolean;
  internalLink?: string;
  externalLink?: string;
  type: "internal" | "external";
  className: string;
  children: React.ReactNode;
}
const Element: React.FC<ElementProps> = ({
  type,
  hasSubLinks,
  children,
  internalLink,
  externalLink,
  className,
}) => {
  return (
    <>
      {hasSubLinks ? (
        <div className={className}>{children}</div>
      ) : (
        <Link
          className={className}
          href={
            type === "internal"
              ? (internalLink as string)
              : (externalLink as string)
          }
        >
          {children}
        </Link>
      )}
    </>
  );
};
