import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import HomePage from "./pages/home/HomePage";
import ObjectRegistrationPage from "./pages/documentation/ObjectRegistrationPages/ObjectRegistrationPage";
import IGSList from "./pages/documentation/IGSList";
import LabTestsList from "./pages/documentation/LabTestsList";
import AOSRList from "./pages/documentation/AOSRList";
import AOSRCreate from "./pages/documentation/AOSRCreatePages/AOSRCreate"; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Все маршруты внутри MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="homepage" element={<HomePage />} />
          <Route path="register" element={<ObjectRegistrationPage />} />
          <Route path="igslist" element={<IGSList />} />
          <Route path="lab-tests" element={<LabTestsList />} />
          <Route path="aosrlist" element={<AOSRList />} />
          <Route path="aosrlist/create" element={<AOSRCreate />} />
        </Route>

        {/* Пример отдельной страницы без MainLayout, если понадобится */}
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  );
}