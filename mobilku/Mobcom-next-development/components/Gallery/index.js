import styles from './Gallery.module.css';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Gallery = ({urlImage}) => {
  const settings = {
    customPaging: function(i) {
      return (
        <a>
          <img src={urlImage[i]} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div>
      <Slider {...settings}>
        {urlImage.map((val) => {
          return (
            <div key={val}>
              <img src={val} />
            </div>
          )
        })}
        </Slider>
    </div>
  );
}

export default Gallery;
