import { Dispatch, SetStateAction } from "react";
import { View, Direction } from "../profile-view";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

interface AddDeliveryAddressProps {
  setView: Dispatch<SetStateAction<View>>;
  setDirection: Dispatch<SetStateAction<Direction>>;
}

const AddDeliveryAddress: React.FC<AddDeliveryAddressProps> = ({
  setView,
  setDirection,
}) => {
  return (
    <motion.div
      initial={{ x: 30 }}
      animate={{ x: 0 }}
      exit={{ x: 30 }}
      transition={{}}
    >
      <Button
        variant="ghost"
        onClick={() => {
          setView("delivery-addresses");
          setDirection("left");
        }}
        className="flex space-x-1 items-center group "
      >
        <MoveLeft
          className="group-hover:-translate-x-1 transition-transform duration-300"
          size={18}
          stroke="#3A4743"
        />
        <span className="text-xl font-medium">Add Address</span>
      </Button>
    </motion.div>
  );
};

export default AddDeliveryAddress;
