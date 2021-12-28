import supabaseClient from "@/services/supabaseClient";
import { contactsListAtom, selectedContactAtom } from "@/states/contactsAtom";
import { UserSchema, UsersContactSchema } from "@/types/schemas";
import { PostgrestResponse } from "@supabase/supabase-js";
import { useAtom } from "jotai";
import { FC, useEffect, useState } from "react";
import Modal from "react-modal";
import ContactsModal from "./ContactsModal";

Modal.setAppElement("#root");

const ContactsList: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = supabaseClient.auth.user()!;

  const [contacts, setContacts] = useAtom(contactsListAtom);
  const [selectedContact, setSelectedContact] = useAtom(selectedContactAtom);

  const handleSelectContact = (contact: UserSchema) => {
    setSelectedContact(contact);
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedContacts = await supabaseClient
        .from<{ user_id: string; contact: UserSchema }>("users_contacts")
        .select(
          `
          contact: contact_id (*)
        `
        )
        .eq("user_id", user.id);
      setContacts([
        ...contacts,
        ...fetchedContacts.body!.map((contact) => contact.contact),
      ]);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="mt-4">
        <div className="shadow-md rounded-lg  py-3 text-center font-head  px-3">
          <div className="text-lg font-bold">Contacts</div>
          <button
            className="my-4 w-full px-6 py-3 bg-black rounded-lg text-white"
            onClick={() => setIsModalOpen(true)}
          >
            Add contact
          </button>
          <hr />
          <ul className="text-left mt-3">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="p-3 rounded-lg shadow cursor-pointer"
                style={
                  contact === selectedContact
                    ? {
                        fontWeight: "bold",
                        background: "purple",
                        color: "white",
                      }
                    : {}
                }
                onClick={() => handleSelectContact(contact)}
              >
                {contact.name}
              </div>
            ))}
          </ul>
        </div>
      </div>
      <Modal
        className="absolute w-1/2 p-8 rounded-lg bg-white border-none outline-1 outline-slate-400 shadow-lg top-1/2 left-1/2 right-auto bottom-auto -mr-0.5 -translate-x-1/2 -translate-y-1/2"
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <ContactsModal />
      </Modal>
    </>
  );
};

export default ContactsList;
