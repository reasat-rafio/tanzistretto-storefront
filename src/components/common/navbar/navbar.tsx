"use client";

import { SanityImageWithAlt, User } from "@/types/common";
import { Nav, SubLinks } from "@/types/site";
import { useEffect, useState } from "react";
import SanityImage from "../sanity-image";
import { Heart } from "lucide-react";
import SearchSheet from "./search-sheet/search-sheet";
import NavItems from "./nav-items";
import DesktopMegaMenu from "./mega-menu/desktop-mega-menu";
import MobileSheet from "./mobile-sheet/mobile-sheet";
import BagSheet from "./bag-sheet/bag-sheet";
import UserSheet from "./user-sheet/user-sheet";
import useUserStore from "@/stores/user-store";

interface NavbarProps {
  logo: SanityImageWithAlt;
  nav: Nav;
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ logo, nav, user }) => {
  const [showDesktopMegaMenu, setShowDesktopMegaMenu] = useState(false);
  const [activeSubLinks, setActiveSubLinks] = useState<SubLinks[] | undefined>(
    undefined
  );
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return (
    <nav
      className="z-30 w-full bg-white"
      onMouseLeave={() => setShowDesktopMegaMenu(false)}
    >
      <div className="relative">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-x-10">
            <a className="relative lg:z-30" href="/">
              <SanityImage
                className="h-full max-h-[70px] w-fit object-contain"
                sizes="200px"
                src={logo}
              />
            </a>

            <div className="hidden lg:block">
              <ul className="flex gap-x-5">
                {nav?.menu.map((navItem) => (
                  <NavItems
                    key={navItem._key}
                    navItem={navItem}
                    setActiveSubLinks={setActiveSubLinks}
                    setShowDesktopMegaMenu={setShowDesktopMegaMenu}
                  />
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-x-3 lg:gap-x-6">
            <SearchSheet />
            <div className="flex gap-x-2 lg:gap-x-4">
              <button>
                <Heart />
              </button>
              <UserSheet />
              <BagSheet />
              <MobileSheet nav={nav} />
            </div>
          </div>
        </div>

        <DesktopMegaMenu
          activeSubLinks={activeSubLinks}
          showDesktopMegaMenu={showDesktopMegaMenu}
        />
      </div>
    </nav>
  );
};
export default Navbar;
