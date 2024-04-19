import { Dispatch, SetStateAction, use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { View, Direction } from "../../profile-view";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import useUserStore from "@/stores/user-store";
import { Address } from "@medusajs/medusa";
import EditDeliveryForm from "./edit-delivery-form";

interface EditDeliveryAddressProps {
  activeAddressId: string | null;
  setView: Dispatch<SetStateAction<View>>;
  setDirection: Dispatch<SetStateAction<Direction>>;
}

const EditDeliveryAddress: React.FC<EditDeliveryAddressProps> = ({
  activeAddressId,
  setView,
  setDirection,
}) => {
  const user = useUserStore((state) => state.user);
  const [defaultFormValues, setDefaultFormValues] = useState<Address | null>(
    null
  );

  useEffect(() => {
    const activeFormVal = user?.shipping_addresses.find(
      (addr) => addr.id === activeAddressId
    );
    if (activeFormVal) setDefaultFormValues(activeFormVal);
  }, [user, activeAddressId]);

  return (
    <motion.div initial={{ x: 30 }} animate={{ x: 0 }} exit={{ x: 30 }}>
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
        <span className="text-xl font-medium underline">Edit Address</span>
      </div>

      {defaultFormValues && (
        <EditDeliveryForm
          setView={setView}
          setDirection={setDirection}
          defaultFormValues={defaultFormValues}
        />
      )}
    </motion.div>
  );
};

export default EditDeliveryAddress;
