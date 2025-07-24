import React from "react";
import { heroStats } from "../constants/data";
import { RiArrowRightUpLongLine } from "@remixicon/react";

import { motion } from "motion/react";
import { fadeIn, fadeInUp, staggerContainer } from "../motion/animation";

const Hero = () => {
  return (
    <section className="max-lg:py-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="container grid gap-14 lg:grid-cols-2"
      >
        {/* Content */}
        <div className="flex flex-col justify-center md:py-12">
          <motion.h1
            variants={fadeInUp}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white"
          >
            Discover Your Dream Property with Estatein
          </motion.h1>
          <motion.p variants={fadeInUp} className="max-w-[640px] mb-8 mt-4">
            Your journey to finding the perfect property begins here. Explore
            our listings to find the home that matches your dreams.
          </motion.p>
          {/* Btn wrapper */}
          <div className="flex flex-wrap gap-3.5">
            <motion.button variants={fadeInUp} className="primary-btn">
              Learn More
            </motion.button>
            <motion.button variants={fadeInUp} className="secondary-btn">
              Browse Properties
            </motion.button>
          </div>
          {/* Stats wrapper */}
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 mt-10 lg:mt-12">
            {heroStats.map((item) => (
              // card
              <motion.div
                variants={fadeInUp}
                className={`border border-grey-15 bg-grey-10 px-5 py-3.5 rounded-xl text-center lg:text-left ${
                  item.id === 3 ? " max-sm:col-span-2" : ""
                }`}
                key={item.id}
              >
                <h3 className="text-3xl font-semibold text-white">
                  {item.value}
                  {item.id === 2 ? "k" : ""}
                </h3>
                <p>{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
        {/* banner */}
        <motion.figure variants={fadeIn} className="relative">
          <img
            src="/images/hero-banner.png"
            alt="hero banner"
            width={690}
            height={622}
            className="w-full h-full object-cover"
          />
          {/* animated text */}
          <div className="absolute max-lg:-bottom-16 max-lg:left-1/2 lg:top-10 lg:-left-16 max-lg:-translate-x-1/2 bg-grey-08 ring-grey-15 ring p-2.5 rounded-full max-w-max aspect-square">
            <div className="relative">
              <img
                src="/images/text-shape.svg"
                alt="text shape"
                width={106}
                height={106}
                className="text-shape"
              />
              <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-grey-10 ring ring-grey-15 w-14 h-14 rounded-full flex items-center justify-center hover:text-white transition-colors">
                <RiArrowRightUpLongLine size={24} />
              </button>
            </div>
          </div>
        </motion.figure>
      </motion.div>
    </section>
  );
};

export default Hero;
