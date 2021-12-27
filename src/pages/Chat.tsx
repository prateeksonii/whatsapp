import Card from "@components/Card";
import Center from "@components/Center";
import ChatBox from "@components/chat/ChatBox";
import ContactsList from "@components/chat/ContactsList";
import Header from "@components/chat/Header";
import Page from "@components/Page";
import { User } from "@supabase/supabase-js";
import type { FC } from "react";

interface ChatProps {
  user: User;
}

const Chat: FC<ChatProps> = ({ user }) => {
  return (
    <Page>
      <div className="h-full grid place-items-center">
        <div className="h-5/6 w-5/6 ">
          <div className="h-full bg-white rounded-md p-8">
            <div className="h-full">
              <div className="h-full text-black grid grid-cols-[400px_auto] gap-8">
                <div>
                  <Header name={user.user_metadata.name} />
                  <ContactsList />
                </div>
                <div className="h-full">
                  <ChatBox />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Chat;
