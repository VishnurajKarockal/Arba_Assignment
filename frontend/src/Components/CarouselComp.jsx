import React from 'react';
import { Carousel } from 'react-bootstrap';

const CarouselComp = () => {
  return (
    <div >
      <Carousel style={{width: '80%', height: '350px',margin:"auto"}} >
      <Carousel.Item interval={4000} style={{backgroundColor:"red",width: '100%', height: '350px'}} >
        {/* <img
          className="d-block w-100"
          src="https://github.com/VishnurajKarockal/Resources/blob/main/byte-bhaav-unit6-project-recipe_images/istockphoto-1130228935-1024x1024.jpg?raw=true"
          alt="First slide"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        /> */}
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Some representative placeholder content for the first slide.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000} style={{backgroundColor:"green",width: '100%', height: '350px'}} >
        {/* <img
          className="d-block w-100"
          src="https://github.com/VishnurajKarockal/Resources/blob/main/byte-bhaav-unit6-project-recipe_images/istockphoto-1461085339-1024x1024.jpg?raw=true"
          alt="Second slide"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        /> */}
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Some representative placeholder content for the second slide.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{backgroundColor:"#00aac3",width: '100%', height: '350px'}} >
        {/* <img
          className="d-block w-100"
          src="https://github.com/VishnurajKarockal/Resources/blob/main/byte-bhaav-unit6-project-recipe_images/istockphoto-1461085339-1024x1024.jpg?raw=true"
          alt="Third slide"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        /> */}
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Some representative placeholder content for the third slide.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default CarouselComp;
