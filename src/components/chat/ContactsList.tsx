import { FC, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ContactsList: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      >
        <div className="flex flex-col">
          <h4 className="text-2xl mb-4">Search contacts</h4>
          <label htmlFor="search-contact">
            Enter contact's name or email address
          </label>
          <input className="border-2 rounded-md p-2" type="text" />
        </div>
      </Modal>
    </>
  );
};

export default ContactsList;
