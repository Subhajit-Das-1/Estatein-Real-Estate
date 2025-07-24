import React from "react";

import { motion } from "motion/react";
import { fadeIn, fadeInUp } from "../motion/animation";

const Title = ({ title, text, link }) => {
  return (
    <div className="flex justify-between flex-wrap gap-3 items-center">
      {/* title */}
      <div>
        <motion.span variants={fadeIn} className="mb-2.5 block">
          <img
            src="/images/title-icon.svg"
            alt="title icon"
            width={55}
            height={24}
          />
        </motion.span>
        <motion.h2 variants={fadeInUp}>{title}</motion.h2>
        <motion.p variants={fadeInUp} className="mt-3 max-w-[730px]">
          {text}
        </motion.p>
      </div>
      {/* button */}
      {link && (
        <motion.button variants={fadeInUp} className="primary-btn">
          {link}
        </motion.button>
      )}
    </div>
  );
};

export default Title;
