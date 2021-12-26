import { User } from "@supabase/supabase-js";
import type { FC } from "react";

interface HeaderProps {
  name: string;
}

const Header: FC<HeaderProps> = ({ name }) => {
  return (
    <div>
      <div className="italic text-xs">Logged in as: </div>
      <div className="font-bold">{name}</div>
    </div>
  );
};

export default Header;
