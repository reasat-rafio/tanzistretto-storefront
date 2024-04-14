import { SubLinks } from "@/types/site";
import Link from "next/link";
import SanityImage from "../sanity-image";
import { AnimatePresence, motion } from "framer-motion";

interface DesktopNavItemsDropdownProps {
  activeSubLinks: SubLinks[] | undefined;
  showDesktopMegaMenu: boolean;
}

const DesktopMegaMenu: React.FC<DesktopNavItemsDropdownProps> = ({
  activeSubLinks,
  showDesktopMegaMenu,
}) => {
  return (
    <AnimatePresence>
      {showDesktopMegaMenu && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-0 left-0 min-h-[20dvh] w-full translate-y-full border-t bg-white shadow-lg"
        >
          <div className="mx-auto max-w-screen-lg py-10">
            <ul className="grid grid-cols-5 gap-5">
              {activeSubLinks?.map((subLink) => (
                <li key={subLink._key}>
                  {subLink._type === "links" ? (
                    <ul className="space-y-2 pt-2">
                      {subLink.links.map(({ link, title }, index) => (
                        <li key={index}>
                          <a className="font-medium" href={link}>
                            {title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : subLink._type === "poster" ? (
                    <Link className="space-y-2" href={subLink.link}>
                      <div className="aspect-square overflow-hidden rounded-2xl">
                        <SanityImage
                          src={subLink.image}
                          alt={subLink.title}
                          sizes="200px"
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>
                        <span className="block font-medium">
                          {subLink.title}
                        </span>
                        {!!subLink?.subtitle && (
                          <span className="text-sm italic">
                            {subLink.subtitle}
                          </span>
                        )}
                      </div>
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DesktopMegaMenu;
