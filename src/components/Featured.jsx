import React from "react";
import Title from "./Title";
import { featuredItems } from "../constants/data";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";

import { motion } from "motion/react";
import { fadeIn, fadeInUp, staggerContainer } from "../motion/animation";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";

const Featured = () => {
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
          title="Featured Properties"
          text='Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through Estatein. Click "View Details" for more information.'
          link="View All Properties"
        />

        <motion.div variants={fadeIn}>
          {/* Card wrapper */}
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            navigation={{
              prevEl: ".prev-btn",
              nextEl: ".next-btn",
            }}
            breakpoints={{
              768: {
                slidesPerView: 1.5,
              },
              1200: {
                slidesPerView: 2.5,
              },
            }}
            className="mt-10 lg:mt-16"
          >
            {featuredItems.map((item) => (
              // Card
              <SwiperSlide
                key={item.id}
                className="border border-grey-15 p-6 rounded-xl"
              >
                {/* image */}
                <div>
                  <img
                    src={item.img}
                    alt={item.title}
                    width={354}
                    height={255}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                {/* content */}
                <div className="mt-3.5">
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                  <div className="flex items-center flex-wrap gap-1.5 my-5">
                    {item.icons.map((item, index) => (
                      // box
                      <div
                        key={index}
                        className="ring ring-grey-15 rounded-[28px] p-3 flex gap-1.5 bg-grey-10"
                      >
                        <span>
                          <img
                            src={item.icon}
                            alt="icon"
                            width={20}
                            height={20}
                          />
                        </span>
                        <p className="text-sm">{item.label}</p>
                      </div>
                    ))}
                  </div>
                  {/* Price & btn */}
                  <div className="flex justify-between items-center flex-wrap gap-6">
                    <p className="grid gap-1 font-semibold">
                      price{" "}
                      <span className="text-white text-lg">${item.price}</span>
                    </p>

                    <button className="secondary-btn">
                      View All Properties
                    </button>
                  </div>
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

export default Featured;
