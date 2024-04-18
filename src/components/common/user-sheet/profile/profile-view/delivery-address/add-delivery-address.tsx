import { Dispatch, SetStateAction } from "react";
import { View, Direction } from "../profile-view";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import Form from "./add-delivery-form";

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
      <div className="relative py-3 flex justify-end items-center ">
        <Button
          size="sm"
          variant="outline"
          className="group absolute left-0 top-1/2 -translate-y-1/2"
          onClick={() => {
            setView("delivery-addresses");
            setDirection("left");
          }}
        >
          <MoveLeft
            className="group-hover:-translate-x-0.5 transition-transform duration-300"
            size={14}
            stroke="#3A4743"
          />
        </Button>
        <span className="text-xl font-medium underline">Add Address</span>
      </div>

      <Form />
    </motion.div>
  );
};

export default AddDeliveryAddress;
