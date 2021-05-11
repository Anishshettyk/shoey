import React, { useEffect } from 'react';
import { HeroSection, CategoryDisplay } from '../index';
import { makeNotification } from '../../redux';
import { useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(makeNotification({ message: `Welcome to shoey`, variant: 'success' }));
  }, [dispatch]);

  return (
    <div>
      <HeroSection />
      <CategoryDisplay />
    </div>
  );
};

export default Home;
