import { FC } from "react";
import Index from "@pages/Index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "@pages/Signup";
import Signin from "@pages/Signin";
import Chat from "@pages/Chat";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
