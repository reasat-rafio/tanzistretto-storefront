import { Dispatch, SetStateAction } from "react";
import { View, Direction } from "../profile-view";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
  return (
    <motion.div
      initial={{ x: direction === "right" ? 30 : -30 }}
      animate={{ x: 0 }}
      exit={{ x: direction === "right" ? 30 : -30 }}
      transition={{}}
    >
      <Button
        variant="ghost"
        onClick={() => {
          setView("default");
          setDirection("left");
        }}
        className="flex space-x-1 items-center group "
      >
        <MoveLeft
          className="group-hover:-translate-x-1 transition-transform duration-300"
          size={18}
          stroke="#3A4743"
        />
        <span className="text-xl font-medium">Addresses</span>
      </Button>

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
