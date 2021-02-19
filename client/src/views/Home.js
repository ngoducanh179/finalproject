import React from 'react';
// import sections
import Hero from '../componentss/sections/Hero';
import FeaturesTiles from '../componentss/sections/FeaturesTiles';
import FeaturesSplit from '../componentss/sections/FeaturesSplit';
import Testimonial from '../componentss/sections/Testimonial';
import Cta from '../componentss/sections/Cta';

const Home = () => {

  return (
    <>
      <Hero className="illustration-section-01" />
      <FeaturesTiles />
      <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" />
      <Testimonial topDivider />
      <Cta split />
    </>
  );
}

export default Home;