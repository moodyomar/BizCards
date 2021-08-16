import React from 'react';
import "../../css/header_nav.css"

const Hero = ({ imgPath, heroTitle }) => {

  return (

    <div className="hero" style={{ backgroundImage: `url(${imgPath})` }}>
      <h1 data-aos="fade-in" data-aos-duration="1000" className="display-2 heroTitle">{heroTitle}</h1>
    </div>


  )
}

export const heroImg = '/images/hero.jpeg'
export default Hero