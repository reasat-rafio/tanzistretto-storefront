import { useState } from "react";
import DefaultView from "./default-view";
import DeliveryAddressView from "./delivery-address/delivery-address-view";
import { AnimatePresence } from "framer-motion";
import AddDeliveryAddress from "./delivery-address/add/add-delivery-address";
import EditDeliveryAddress from "./delivery-address/edit/edit-delivery-address";

interface ProfileViewProps {}
export type Direction = "left" | "right";
export type View =
  | "default"
  | "delivery-addresses"
  | "add-delivery-address"
  | "edit-delivery-address";

const ProfileView: React.FC<ProfileViewProps> = ({}) => {
  const [view, setView] = useState<View>("default");
  const [direction, setDirection] = useState<Direction>("right");
  const [activeAddressId, setActiveAddressId] = useState<string | null>(null);

  const renderViews = () => {
    switch (view) {
      case "default":
        return <DefaultView setView={setView} setDirection={setDirection} />;
      case "delivery-addresses":
        return (
          <DeliveryAddressView
            direction={direction}
            setView={setView}
            setDirection={setDirection}
            setActiveAddressId={setActiveAddressId}
          />
        );
      case "add-delivery-address":
        return (
          <AddDeliveryAddress setView={setView} setDirection={setDirection} />
        );
      case "edit-delivery-address":
        return (
          <EditDeliveryAddress
            setView={setView}
            setDirection={setDirection}
            activeAddressId={activeAddressId}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <AnimatePresence mode="popLayout">{renderViews()}</AnimatePresence>
    </div>
  );
};

export default ProfileView;
