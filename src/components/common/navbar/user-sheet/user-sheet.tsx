import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useUiStore from "@/stores/ui-store";
import { User2Icon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Profile from "./profile/profile";
import Order from "./order/order";
import ForYou from "./for-you/for-you";

interface UserSheetProps {}

const UserSheet: React.FC<UserSheetProps> = ({}) => {
  const open = useUiStore((state) => state.openUserSheet);
  const updateSearchDropdown = useUiStore((state) => state.setUserSheetOpen);

  return (
    <Sheet open={open} onOpenChange={updateSearchDropdown}>
      <SheetTrigger asChild>
        <button>
          <User2Icon />
        </button>
      </SheetTrigger>

      <SheetContent className="w-full overflow-auto ">
        <SheetHeader>
          <SheetTitle>Welcome</SheetTitle>
        </SheetHeader>

        <Tabs defaultValue="profile" className="mt-2 w-full ">
          <TabsList className="sticky top-0 w-full">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="order">Orders</TabsTrigger>
            <TabsTrigger value="for-you">For You</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Profile />
          </TabsContent>
          <TabsContent value="order">
            <Order />
          </TabsContent>
          <TabsContent value="for-you">
            <ForYou />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default UserSheet;
