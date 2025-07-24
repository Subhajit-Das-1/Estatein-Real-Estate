import React from "react";

import { motion } from "motion/react";
import { fadeIn, fadeInUp, staggerContainer } from "../motion/animation";

const Cta = () => {
  return (
    <motion.section
      variants={staggerContainer}
      whileInView="show"
      initial="hidden"
      viewport={{ once: true }}
      className="mt-16 py-16 relative border-y border-grey-15"
    >
      <div className="container grid gap-10 lg:grid-cols-[1fr_0.3fr] items-center justify-between">
        {/* Content */}
        <div>
          <motion.h2 variants={fadeInUp}>
            Start Your Real Estate Journey Today
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-5">
            Your dream property is just a click away. Whether you're looking for
            a new home, a strategic investment, or expert real estate advice,
            Estatein is here to assist you every step of the way. Take the first
            step towards your real estate goals and explore our available
            properties or get in touch with our team for personalized
            assistance.
          </motion.p>
        </div>
        {/* Btn */}
        <motion.button
          variants={fadeInUp}
          className="secondary-btn max-w-max ml-auto"
        >
          Explore Properties
        </motion.button>
      </div>
      {/* bg image */}
      <motion.div variants={fadeIn} className="absolute bottom-0 left-0 -z-10">
        <img src="/images/shape-2.svg" alt="shape" width={474} height={258} />
      </motion.div>
    </motion.section>
  );
};

export default Cta;
