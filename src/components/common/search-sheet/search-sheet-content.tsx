import useUiStore from "@/stores/ui-store";
import { Search, X } from "lucide-react";

interface SearchSheetContentProps {}

const SearchSheetContent: React.FC<SearchSheetContentProps> = ({}) => {
  const closeSearchDropdown = useUiStore((state) => state.setSearchSheetOpen);

  return (
    <div>
      <div className="mx-auto max-w-screen-lg">
        <div className="border-primary my-4 flex gap-x-3 rounded-full border px-3 py-2">
          <Search />
          <input className="flex-1 bg-transparent outline-none" type="text" />
          <button onClick={() => closeSearchDropdown(false)}>
            <X />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSheetContent;
