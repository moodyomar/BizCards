import React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const ScrollToTop = ({ children }) => {
  const { key,pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    window.scrollTo(0, 450);
  }, [key]);

  return children || null;
};

export default ScrollToTop;
