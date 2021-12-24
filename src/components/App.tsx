import { FC } from "react";
import Index from "@pages/Index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "@pages/Signup";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
