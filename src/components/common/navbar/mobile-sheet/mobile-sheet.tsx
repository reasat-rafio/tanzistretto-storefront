import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useUiStore from "@/stores/ui-store";
import { Nav } from "@/types/site";
import { Menu } from "lucide-react";
import NavItem from "./nav-item";

interface MobileSheetProps {
  nav: Nav;
}

const MobileSheet: React.FC<MobileSheetProps> = ({ nav }) => {
  const open = useUiStore((state) => state.openMobileSheet);
  const updateSearchDropdown = useUiStore((state) => state.setMobileSheetOpen);

  return (
    <Sheet open={open} onOpenChange={updateSearchDropdown}>
      <SheetTrigger asChild className="p-0 lg:hidden">
        <Menu size={30} />
      </SheetTrigger>

      <SheetContent className="w-full overflow-auto">
        <ul className="text-primary flex flex-col divide-y">
          {nav.menu.map((props) => (
            <NavItem key={props._key} {...props} />
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
