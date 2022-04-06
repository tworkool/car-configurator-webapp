import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import BestellungenPage from "../../pages/bestellungen_page";
import CarConfiguratorPage from "../../pages/car_configurator_page";
import { CubeSpinner } from "../spinners";

const PageManager = () => {
  return (
    <>
      <Routes>
        <Route
          path="/bestellungen/:id"
          element={
            <Suspense fallback={<CubeSpinner />}>
              <BestellungenPage />
            </Suspense>
          }
        />
        <Route
          path="/bestellungen"
          element={
            <Suspense fallback={<CubeSpinner />}>
              <BestellungenPage />
            </Suspense>
          }
        />
        <Route
          path="/"
          element={
            <Suspense fallback={<CubeSpinner />}>
              <CarConfiguratorPage />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default PageManager;
