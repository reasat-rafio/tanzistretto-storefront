import { useState } from "react";
import DefaultView from "./default-view";
import DeliveryAddressView from "./delivery-address/delivery-address-view";
import { AnimatePresence } from "framer-motion";
import AddDeliveryAddress from "./delivery-address/add-delivery-address";

interface ProfileViewProps {}

export type View = "default" | "delivery-addresses" | "add-delivery-address";
export type Direction = "left" | "right";

const ProfileView: React.FC<ProfileViewProps> = ({}) => {
  const [view, setView] = useState<View>("default");
  const [direction, setDirection] = useState<Direction>("right");

  return (
    <div>
      <AnimatePresence mode="popLayout">
        {view === "default" ? (
          <DefaultView setView={setView} setDirection={setDirection} />
        ) : view === "delivery-addresses" ? (
          <DeliveryAddressView
            direction={direction}
            setView={setView}
            setDirection={setDirection}
          />
        ) : view === "add-delivery-address" ? (
          <AddDeliveryAddress setView={setView} setDirection={setDirection} />
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default ProfileView;
