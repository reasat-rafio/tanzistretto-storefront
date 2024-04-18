import { MapPin, RotateCw, User2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOutUser } from "@/app/actions/auth-actions";
import { useToast } from "@/components/ui/use-toast";
import useUserStore from "@/stores/user-store";
import { User } from "@/types/common";
import { Dispatch, SetStateAction, useState } from "react";
import { View, Direction } from "./profile-view";
import { motion } from "framer-motion";

interface DefaultViewProps {
  setView: Dispatch<SetStateAction<View>>;
  setDirection: Dispatch<SetStateAction<Direction>>;
}

const DefaultView: React.FC<DefaultViewProps> = ({ setView, setDirection }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const user = useUserStore((state) => state.user) as User;

  async function handleLogout() {
    try {
      setLoading(true);
      await signOutUser();
      toast({
        variant: "default",
        title: "You've successfully logged out!",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.toString(),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ x: -30 }}
      animate={{ x: 0 }}
      exit={{ x: -30 }}
      transition={{}}
    >
      <div className="flex flex-col divide-y">
        <button className="group flex origin-left items-center gap-3 py-3">
          <div className="bg-primary/40 rounded-sm p-1.5">
            <User2Icon size={18} fill="#3A4743" strokeWidth={0} />
          </div>
          <div className="flex flex-col transition-transform duration-300 group-hover:translate-x-0.5">
            <div className=" text-left font-bold">My information</div>
            <div className="text-xs">{user.email}</div>
          </div>
        </button>
        <button
          onClick={() => {
            setDirection("right");
            setView("delivery-addresses");
          }}
          className="group flex items-center gap-3 py-3"
        >
          <div className="bg-primary/40 rounded-sm p-1.5">
            <MapPin size={18} fill="#3A4743" strokeWidth={0} />
          </div>
          <div className="flex flex-col transition-transform duration-300 group-hover:translate-x-0.5">
            <div className=" text-left font-bold">Shipping addresses</div>
          </div>
        </button>
      </div>

      <Button
        disabled={loading}
        onClick={handleLogout}
        className="w-full space-x-1"
      >
        {loading && <RotateCw size={18} className="animate-spin" />}
        <span>Logout</span>
      </Button>
    </motion.div>
  );
};
export default DefaultView;
