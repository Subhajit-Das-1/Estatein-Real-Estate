import React from "react";
import Title from "./Title";
import { testimonialsItems } from "../constants/data";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiStarFill,
} from "@remixicon/react";

import { motion } from "motion/react";
import { fadeIn, fadeInUp, staggerContainer } from "../motion/animation";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Navigation } from "swiper/modules";

const Testimonials = () => {
  return (
    <section className="section">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="container"
      >
        {/* Title */}
        <Title
          title="What Our Clients Say"
          text="Read the success stories and heartfelt testimonials from our valued clients. Discover why they chose Estatein for their real estate needs."
        />

        <motion.div variants={fadeIn}>
          {/* Card wrapper */}
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            navigation={{
              prevEl: ".prev-btn",
              nextEl: ".next-btn",
            }}
            loop={true}
            breakpoints={{
              768: {
                slidesPerView: 1.5,
              },
              1200: {
                slidesPerView: 2.5,
              },
            }}
            className="grid mt-10 lg:mt-14"
          >
            {testimonialsItems.map((item) => (
              // Card
              <SwiperSlide
                key={item.id}
                className="border border-grey-15 rounded-lg p-6 lg:p-10"
              >
                {/* Stars */}
                <div className="flex items-center gap-1.5 text-amber-500">
                  <RiStarFill className="ring ring-grey-15 rounded-full" />
                  <RiStarFill className="ring ring-grey-15 rounded-full" />
                  <RiStarFill className="ring ring-grey-15 rounded-full" />
                  <RiStarFill className="ring ring-grey-15 rounded-full" />
                  <RiStarFill className="ring ring-grey-15 rounded-full" />
                </div>

                {/* Card content */}
                <div className="my-4">
                  <h4>{item.title}</h4>
                  <p className="base">{item.text}</p>
                </div>

                {/* author info */}
                <div>
                  <p className="font-semibold text-white">{item.name}</p>
                  <p>{item.residential}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
        {/* Navigation btns */}
        <motion.div variants={fadeIn} className="mt-10 flex items-center gap-5">
          <button className="prev-btn w-12 h-12 ring ring-grey-20 flex items-center justify-center rounded-full hover:bg-grey-10 transition-colors active:bg-grey-15">
            <RiArrowLeftSLine />
          </button>
          <button className="next-btn w-12 h-12 ring ring-grey-20 flex items-center justify-center rounded-full hover:bg-grey-10 transition-colors active:bg-grey-15">
            <RiArrowRightSLine />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
