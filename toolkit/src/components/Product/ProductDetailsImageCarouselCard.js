import React from 'react';

import {Swiper,SwiperSlide} from 'swiper/react';
import { Autoplay,Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductDetailsImageCarouselCard = ({images}) => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  return (
    <Swiper
          cssMode={true}
          navigation={true}
          pagination={pagination}
          mousewheel={true}
          keyboard={true}
          loop={true}
          centeredSlides={true}
          autoplay={{delay: 2500, disableOnInteraction: false}}
          modules={[Autoplay,Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
    >
      {images.map((image)=>(
        <SwiperSlide key={image.public_id}>
          <img src={image.url} alt={image.public_id} key={image._id}/>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ProductDetailsImageCarouselCard