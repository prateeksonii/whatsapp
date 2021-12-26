import { UserSchema } from "@/types/schemas";
import { FC, useState } from "react";
import Modal from "react-modal";
import ContactsModal from "./ContactsModal";

Modal.setAppElement("#root");

const ContactsList: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [results, setResults] = useState<UserSchema[] | null>([]);

  return (
    <>
      <div className="mt-4">
        <div className="shadow-md  py-3 text-center font-head font-bold px-3">
          <div className="text-lg">Contacts</div>
          <button
            className="my-4 w-full px-6 py-3 bg-black rounded-lg text-white"
            onClick={() => setIsModalOpen(true)}
          >
            Add contact
          </button>
          <hr />
        </div>
      </div>
      <Modal
        className="absolute w-1/2 p-8 rounded-lg bg-white border-none outline-1 outline-slate-400 shadow-lg top-1/2 left-1/2 right-auto bottom-auto -mr-0.5 -translate-x-1/2 -translate-y-1/2"
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onAfterClose={() => setResults([])}
      >
        <ContactsModal setResults={setResults} />
        <div className="p-2" />
        {results?.length! > 0 && <p>Results:</p>}
        <ul>
          {results?.map((result) => (
            <div
              key={result.id}
              className="p-3 shadow-md text-lg flex items-center justify-between cursor-pointer hover:bg-black hover:text-white rounded-md transition-all"
            >
              <span className="font-medium">{result.name}</span>
              <span className="text-sm">{result.email}</span>
            </div>
          ))}
        </ul>
      </Modal>
    </>
  );
};

export default ContactsList;
