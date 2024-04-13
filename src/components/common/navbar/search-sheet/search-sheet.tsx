import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search } from "lucide-react";
import SearchSheetContent from "./search-sheet-content";

interface SearchSheetProps {}

const SearchSheet: React.FC<SearchSheetProps> = ({}) => {
  return (
    <Sheet open={true}>
      <SheetTrigger asChild>
        <button className="bg-primary/70 text-primary-foreground flex items-center gap-x-2 rounded-full px-5 py-2 text-xs md:text-sm">
          <Search className="h-[16px] w-[16px] md:h-[18px] md:w-[18px]" />
          <span>search</span>
        </button>
      </SheetTrigger>

      <SheetContent side="top">
        <div className="container">
          <SheetHeader>
            <SheetTitle>Yo?</SheetTitle>
          </SheetHeader>

          <SearchSheetContent />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchSheet;
