import { cn } from "@/lib/utils";
import { Menu } from "@/types/site";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SanityImage from "../../sanity-image";
import { AnimatePresence, motion } from "framer-motion";

const NavItem: React.FC<Menu> = ({
  title,
  type,
  externalLink,
  internalLink,
  subLinks,
}) => {
  const hasSubLinks = !!subLinks?.length;
  const [open, setOpen] = useState(false);

  function onClickAction() {
    if (hasSubLinks) setOpen((prev) => !prev);
  }

  return (
    <li className="py-3 bg-white" onClick={onClickAction}>
      <Element
        type={type}
        hasSubLinks={hasSubLinks}
        internalLink={internalLink}
        externalLink={externalLink}
        className="flex w-full items-center justify-between text-lg uppercase"
      >
        <span>{title}</span>

        {hasSubLinks && (
          <button
            className={cn(
              open ? "rotate-180" : "rotate-0",
              "transition-transform duration-300"
            )}
          >
            <ChevronDown size={20} />
          </button>
        )}
      </Element>

      <AnimatePresence>
        {hasSubLinks && open && !!subLinks?.length && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="grid grid-cols-2 gap-4 px-2"
          >
            {subLinks.map((subLink) => (
              <>
                {subLink._type === "links" ? (
                  <ul className="col-span-2 space-y-2 pt-2">
                    {subLink.links.map(({ link, title }, index) => (
                      <li key={index}>
                        <Link className="font-medium" href={link}>
                          {title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <>
                    {subLink._type === "poster" ? (
                      <li>
                        <Link className="space-y-2" href={subLink.link}>
                          <div className="aspect-square overflow-hidden rounded-2xl">
                            <SanityImage
                              src={subLink.image}
                              alt={subLink.title}
                              sizes="200px"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="block font-medium">
                            {subLink.title}
                          </span>
                        </Link>
                      </li>
                    ) : null}
                  </>
                )}
              </>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

export default NavItem;

const Element: React.FC<
  { children: React.ReactNode; className: string; hasSubLinks: boolean } & Omit<
    Menu,
    "title" | "_key"
  >
> = ({
  children,
  hasSubLinks,
  className,
  type,
  internalLink,
  externalLink,
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
