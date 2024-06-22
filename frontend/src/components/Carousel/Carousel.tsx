import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";

interface CarouselProps<T> {
  cardDataArray: T[];
  renderCard: (card: T) => React.ReactNode;
}

const Carousel = <T,>({ cardDataArray, renderCard }: CarouselProps<T>) => {
  return (
    <Swiper navigation={true} modules={[Pagination]} className="mySwiper">
      {cardDataArray.map((card, index) => (
        <SwiperSlide className="mySwiperSlide" key={index}>
          {renderCard(card)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
