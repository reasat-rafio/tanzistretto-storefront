import { Dispatch, SetStateAction } from "react";
import { View, Direction } from "../profile-view";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import useUserStore from "@/stores/user-store";

interface DeliveryAddressViewProps {
  direction: Direction;
  setView: Dispatch<SetStateAction<View>>;
  setDirection: Dispatch<SetStateAction<Direction>>;
}

const DeliveryAddressView: React.FC<DeliveryAddressViewProps> = ({
  direction,
  setView,
  setDirection,
}) => {
  const user = useUserStore((state) => state.user);

  console.log("====================================");
  console.log(user?.billing_address);
  console.log("====================================");

  return (
    <motion.div
      initial={{ x: direction === "right" ? 30 : -30 }}
      animate={{ x: 0 }}
      exit={{ x: direction === "right" ? 30 : -30 }}
      transition={{}}
    >
      <div className="relative py-3 flex justify-end items-center ">
        <Button
          size="sm"
          variant="outline"
          className="group absolute left-0 top-1/2 -translate-y-1/2"
          onClick={() => {
            setView("default");
            setDirection("left");
          }}
        >
          <MoveLeft
            className="group-hover:-translate-x-0.5 transition-transform duration-300"
            size={14}
            stroke="#3A4743"
          />
        </Button>
        <span className="text-xl font-medium underline">Addresses</span>
      </div>

      <p className="text-sm">
        View and update your shipping addresses, you can add as many as you
        like. Saving your addresses will make them available during checkout.
      </p>

      <Button
        size="lg"
        onClick={() => {
          setView("add-delivery-address");
          setDirection("right");
        }}
        className="w-full mt-5 border-2 font-semibold uppercase"
        variant="outline"
      >
        Add Address
      </Button>
    </motion.div>
  );
};

export default DeliveryAddressView;
