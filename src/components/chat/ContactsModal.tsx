import supabaseClient from "@/services/supabaseClient";
import { UserSchema } from "@/types/schemas";
import { debounce } from "lodash-es";
import { ChangeEventHandler, FC, useState } from "react";

interface ContactsModalProps {
  setResults: React.Dispatch<React.SetStateAction<UserSchema[] | null>>;
}

const ContactsModal: FC<ContactsModalProps> = ({ setResults }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = debounce(
    async (event) => {
      const query: string = event.target.value;
      const { data: results } = await supabaseClient
        .from<UserSchema>("users")
        .select("*")
        .or(`name.ilike.%${query}%,email.ilike.%${query}%`);
      setResults(results);
    },
    1000
  );

  return (
    <div>
      <div className="flex flex-col">
        <h4 className="text-2xl mb-4">Search contacts</h4>
        <label htmlFor="search-contact">
          Enter contact's name or email address
        </label>
        <input
          className="border-2 rounded-md p-2"
          type="text"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ContactsModal;
