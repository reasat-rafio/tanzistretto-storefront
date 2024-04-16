"use client";

import { Promotion as PromotionTypes } from "@/types/site";
import { X } from "lucide-react";
import { PortableText } from "next-sanity";
import { useEffect } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface promotionProps {
  promotions: PromotionTypes[];
}

const Promotion: React.FC<promotionProps> = ({ promotions }) => {
  const [hidden, setHidden] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prevIndex) => (prevIndex + 1) % promotions.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [promotions.length]);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ height: "auto", y: 0 }}
          exit={{ height: "0", y: -30 }}
          transition={{ ease: "easeInOut" }}
        >
          <div className="bg-primary text-primary-foreground text-xxs relative py-2 text-center text-xs font-medium md:text-xs">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="container"
            >
              <PortableText value={promotions[activeIdx].title} />
            </motion.div>

            <button
              onClick={() => setHidden(true)}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <X size={18} color="white" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Promotion;
