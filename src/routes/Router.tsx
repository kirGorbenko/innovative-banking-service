import React, {type FC, lazy} from "react";
import {Route, Routes} from "react-router-dom";

const MainPage = lazy(async () => await import("@pages/Main/Main"));

export const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
};
