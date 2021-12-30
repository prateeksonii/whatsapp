import { selectedContactAtom } from "@/states/contactsAtom";
import { useAtom } from "jotai";
import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { Icon } from "@iconify/react";
import supabaseClient from "@/services/supabaseClient";
import { ChatSchema, Message } from "@/types/schemas";
import { SupabaseRealtimePayload } from "@supabase/supabase-js";
import moment from "moment";

const ChatBox: FC = () => {
  const [contact] = useAtom(selectedContactAtom);
  const user = supabaseClient.auth.user()!;

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    supabaseClient
      .from(`chats:sender=eq.${contact?.id}`)
      .on("INSERT", (payload: SupabaseRealtimePayload<ChatSchema>) => {
        if (payload.new.receiver === user.id) {
          setMessages((messages) => [
            ...messages,
            {
              chat: payload.new,
              timestamp: new Date(payload.commit_timestamp),
              sent: false,
            },
          ]);
        }
      })
      .subscribe();

    return () => {
      supabaseClient.removeAllSubscriptions();
    };
  }, [contact]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setMessage(event.target.value);
  };

  const onSend: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { body } = await supabaseClient
      .from<ChatSchema>("chats")
      .insert({ sender: user.id, receiver: contact?.id, message });

    setMessages((messages) => [
      ...messages,
      {
        chat: body![0],
        timestamp: new Date(body![0].created_at),
        sent: true,
      },
    ]);

    setMessage(() => "");
  };

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
            <div className="flex-auto flex flex-col gap-2 h-96 p-2 overflow-y-scroll">
              {messages.map((message) =>
                message.sent ? (
                  <div
                    key={message.chat.id}
                    className="ml-auto flex flex-col items-end"
                  >
                    <div className="p-3 bg-purple-200 w-fit rounded-md">
                      {message.chat.message}
                    </div>
                    <div className="text-xs mt-1">
                      {moment(message.timestamp).format("LT")}
                    </div>
                  </div>
                ) : (
                  <div
                    key={message.chat.id}
                    className="flex flex-col items-start"
                  >
                    <div className="p-3 bg-purple-50 w-fit rounded-md">
                      {message.chat.message}
                    </div>
                    <div className="text-xs mt-1">
                      {moment(message.timestamp).format("LT")}
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="flex-initial">
              <div className="relative h-max">
                <form onSubmit={onSend}>
                  <input
                    type="text"
                    value={message}
                    className="w-full border-2 p-2 rounded-lg"
                    placeholder="Type your message..."
                    onChange={handleChange}
                  />
                  <button
                    className="cursor-pointer absolute top-auto bottom-1/3 right-5"
                    type="submit"
                  >
                    <Icon icon="fluent:send-16-filled" color="purple" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
