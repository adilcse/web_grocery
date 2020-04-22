import React, { useState }  from 'react';
import { Carousel } from 'react-bootstrap';
/**
 * display slider images
 * @param {*} props 
 */
const Slider=(props)=>{
    const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };
  const imageStyle={
      maxHeight:'300px'
  }
  const img=['https://www.bigbasket.com/media/uploads/banner_images/2003071_hk-clearance-sale_460.jpg',
             'https://www.bigbasket.com/media/uploads/banner_images/2003091_protein-corner_460.jpg',
             'https://www.bigbasket.com/media/uploads/banner_images/T1_All_Bathingsoaps_DT_13_1600x460_28thFeb.jpg']
  return (
    <Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img.pop()}
          alt="First slide"
          style={imageStyle}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src={img.pop()}
          alt="Second slide"
          style={imageStyle}
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img.pop()}
          alt="Third slide"
          style={imageStyle}
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;