import Card from "@components/Card";
import Center from "@components/Center";
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
      <Center>
        <div className="w-5/6">
          <Card>
            <div>
              <div className="text-black grid grid-cols-[400px_auto]">
                <div>
                  <Header name={user.user_metadata.name} />
                  <ContactsList />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Center>
    </Page>
  );
};

export default Chat;
