import React from "react";
import { CardsItems } from "../constants/data";
import { RiArrowRightUpLine } from "@remixicon/react";

import { motion } from "motion/react";
import { fadeInUp, staggerContainer } from "../motion/animation";

const Card = () => {
  return (
    <section>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="container grid gap-2.5 border-y border-grey-15 py-3 px-0 rounded-2xl grid-cols-2 lg:grid-cols-4"
      >
        {CardsItems.map((item) => (
          // Card
          <motion.div
            variants={fadeInUp}
            className="bg-grey-10 px-3.5 py-4 ring ring-grey-15 rounded-xl"
            key={item.id}
          >
            <span className="hover:text-white transition-colors cursor-pointer flex justify-self-end mb-1.5">
              <RiArrowRightUpLine size={24} />
            </span>
            <div className="max-w-max mx-auto">
              <img src={item.icon} alt={item.title} width={48} height={48} />
            </div>
            <p className="text-center text-white font-semibold mt-3.5">
              {item.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Card;
