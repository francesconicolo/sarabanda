import { BrowserRouter, Routes, Route } from 'react-router';
import Home from '../pages/home/Home';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
