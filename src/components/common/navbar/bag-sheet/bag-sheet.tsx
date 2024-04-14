import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import useUiStore from "@/stores/ui-store";
import { ShoppingBag } from "lucide-react";

interface BagSheetProps {}

const BagSheet: React.FC<BagSheetProps> = ({}) => {
  const open = useUiStore((state) => state.openBagSheet);
  const updateSearchDropdown = useUiStore((state) => state.setBagSheetOpen);

  return (
    <Sheet open={open} onOpenChange={updateSearchDropdown}>
      <SheetTrigger asChild>
        <button>
          <ShoppingBag />
        </button>
      </SheetTrigger>

      <SheetContent className="w-full overflow-auto">
        <SheetHeader>
          <SheetTitle>YOUR BAG</SheetTitle>
          <SheetDescription>Your cart is empty</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default BagSheet;
