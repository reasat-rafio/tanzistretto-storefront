import { Dispatch, SetStateAction } from "react";
import { View, Direction } from "../profile-view";
import {
  DeleteIcon,
  Edit,
  Edit2,
  Edit2Icon,
  MoveLeft,
  Trash2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import useUserStore from "@/stores/user-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

      {!!user?.shipping_addresses?.length && (
        <div className="mt-5 space-y-3">
          {user.shipping_addresses.map(
            ({
              first_name,
              last_name,
              id,
              phone,
              city,
              postal_code,
              address_1,
              address_2,
            }) => (
              <Card className="relative" key={id}>
                <div className="absolute right-2 top-2 space-x-2">
                  <button className="transition-all duration-300 text-gray-500 p-1.5 hover:bg-muted rounded-full hover:shadow-md text-primary">
                    <Edit2Icon size={14} />
                  </button>
                  <button className="transition-all duration-300 text-gray-500 p-1.5 hover:bg-muted rounded-full hover:shadow-md text-primary">
                    <Trash2Icon size={16} />
                  </button>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">
                    {first_name} {last_name}
                  </CardTitle>
                  <CardDescription>{phone}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{address_1}</p>
                  <p>{address_2}</p>
                  <p>
                    {city} {postal_code}
                  </p>
                </CardContent>
              </Card>
            )
          )}
        </div>
      )}

      <Button
        size="lg"
        onClick={() => {
          setView("add-delivery-address");
          setDirection("right");
        }}
        className="w-full mt-5 border-2 font-semibold uppercase "
        variant="default"
      >
        Add Address
      </Button>
    </motion.div>
  );
};

export default DeliveryAddressView;
