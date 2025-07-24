import { RiMailLine, RiSendPlaneFill } from "@remixicon/react";
import React from "react";
import { footerItems, socialIcons } from "../constants/data";

import { motion } from "motion/react";
import { fadeIn, fadeInUp, staggerContainer } from "../motion/animation";

function slugify(label) {
  return "/" + label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const Footer = () => {
  return (
    <footer className="pt-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="container grid gap-8 lg:gap-24"
      >
        {/* Footer top */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-[1.5fr_0.7fr_0.7fr_0.7fr] lg:grid-cols-[1.5fr_0.7fr_0.7fr_0.5fr_0.7fr] lg:gap-12">
          {/* Footer brand */}
          <motion.div variants={fadeInUp}>
            {/* logo */}
            <div>
              <img
                src="/images/logo.png"
                alt="footer logo"
                width={114}
                height={34}
              />
            </div>
            {/* input field */}
            <div className="flex items-center gap-1.5 max-w-[305px] w-full relative mt-6">
              <span className="absolute top-1/2 left-4 -translate-y-1/2">
                <RiMailLine />
              </span>

              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full h-full border border-grey-15 p-5 rounded-lg focus:border-purple-700 outline-none indent-8"
              />

              <button className="absolute top-1/2 right-4 -translate-y-1/2 hover:text-purple-600 transition-colors">
                <RiSendPlaneFill />
              </button>
            </div>
          </motion.div>
          {/* Footer list */}
          {footerItems.map((item) => (
            <motion.div variants={fadeInUp} key={item.id}>
              <p className="font-semibold text-white mb-2">{item.title}</p>
              <ul className="space-y-1.5">
                {item.links.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="hover:underline hover:text-white" tabIndex={-1} aria-disabled="true">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        {/* Footer bottom */}
        <div className="flex flex-wrap justify-between items-center pt-6 border-t border-grey-20 pb-12">
          <motion.div variants={fadeInUp}>
            <p>
              &copy; {new Date().getFullYear()} Estatein. All Rights Reserved
            </p>

            <a href="#" className="hover:underline hover:text-white" tabIndex={-1} aria-disabled="true">
              Terms & conditions
            </a>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="flex items-center flex-wrap gap-2"
          >
            {socialIcons.map((item, index) => (
              <a
                href="#"
                key={index}
                className="w-12 h-12 bg-grey-10 flex items-center justify-center rounded-full hover:bg-grey-20 transition-colors"
              >
                {<item.icon />}
              </a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
