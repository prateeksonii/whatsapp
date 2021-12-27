import { contactsListAtom, selectedContactAtom } from "@/states/contactsAtom";
import { UserSchema } from "@/types/schemas";
import { useAtom } from "jotai";
import { FC, useState } from "react";
import Modal from "react-modal";
import ContactsModal from "./ContactsModal";

Modal.setAppElement("#root");

const ContactsList: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [contacts] = useAtom(contactsListAtom);
  const [selectedContact, setSelectedContact] = useAtom(selectedContactAtom);

  const handleSelectContact = (contact: UserSchema) => {
    setSelectedContact(contact);
  };

  return (
    <>
      <div className="mt-4">
        <div className="shadow-md  py-3 text-center font-head  px-3">
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
                className="p-3 rounded-lg shadow"
                style={{
                  fontWeight: contact === selectedContact ? "bold" : "normal",
                }}
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
