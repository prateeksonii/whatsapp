import { selectedContactAtom } from "@/states/contactsAtom";
import { useAtom } from "jotai";
import { FC } from "react";
import { Icon } from "@iconify/react";

const ChatBox: FC = () => {
  const [contact] = useAtom(selectedContactAtom);

  return (
    <div className="h-full">
      {!contact ? (
        <div>Select a contact to start conversation</div>
      ) : (
        <div className="h-full flex flex-col">
          <div className="w-full flex items-center justify-between shadow-md p-6 bg-purple-50 flex-initial">
            <div className="font-bold">{contact.name}</div>
            <div className="text-sm">{contact.email}</div>
          </div>
          <div className="flex-auto py-3 flex flex-col">
            <div className="flex-auto">ok</div>
            <div className="flex-initial">
              <div className="relative h-max">
                <input
                  type="text"
                  className="w-full border-2 p-2 rounded-lg"
                  placeholder="Type your message..."
                />
                <Icon
                  icon="fluent:send-16-filled"
                  color="purple"
                  className="absolute top-auto bottom-1/3 right-5"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
