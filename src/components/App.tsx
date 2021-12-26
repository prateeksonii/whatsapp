import { FC, useEffect, useState } from "react";
import Index from "@pages/Index";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Signup from "@pages/Signup";
import Signin from "@pages/Signin";
import Chat from "@pages/Chat";
import supabaseClient from "@/services/supabaseClient";
import { User } from "@supabase/supabase-js";

interface RouteProps {
  user: User | null;
}

const PrivateRoute: FC<RouteProps> = ({ user }) => {
  if (user) return <Outlet />;

  return <Navigate to="/" replace />;
};

const PublicRoute: FC<RouteProps> = ({ user }) => {
  if (!user) return <Outlet />;

  return <Navigate to="/chat" replace />;
};

const App: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (refresh) {
      setUser(supabaseClient.auth.user());
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute user={user} />}>
          <Route path="/" element={<Index />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin setRefresh={setRefresh} />} />
        </Route>
        <Route path="/chat" element={<PrivateRoute user={user} />}>
          <Route element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
