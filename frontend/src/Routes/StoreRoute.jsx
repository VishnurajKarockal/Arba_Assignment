// StoreRoute.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StoreCategories from '../Components/StoreCategories';
import StoreProducts from '../Components/StoreProducts';

const StoreRoute = () => {
  return (
    <Routes>
      <Route path='' element={<StoreCategories />} />
      <Route path='prod' element={<StoreProducts />} />
    </Routes>
  );
}

export default StoreRoute;
