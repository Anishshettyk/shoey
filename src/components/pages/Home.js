import React from 'react';
import { HeroSection, CategoryDisplay } from '../index';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Shoey - A central hub to find a perfect sole.</title>
      </Helmet>
      <HeroSection />
      <CategoryDisplay />
    </div>
  );
};

export default Home;
