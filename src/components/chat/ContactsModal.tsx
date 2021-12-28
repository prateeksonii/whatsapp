import supabaseClient from "@/services/supabaseClient";
import { contactsListAtom } from "@/states/contactsAtom";
import { UserSchema } from "@/types/schemas";
import { useAtom } from "jotai";
import { debounce } from "lodash-es";
import { ChangeEventHandler, FC, useState } from "react";

const ContactsModal: FC = () => {
  const [results, setResults] = useState<UserSchema[] | null>([]);
  const signedInUser = supabaseClient.auth.user();

  const [, setContacts] = useAtom(contactsListAtom);

  const handleClick = async (user: UserSchema) => {
    await supabaseClient
      .from("users_contacts")
      .insert({ user_id: signedInUser?.id, contact_id: user.id });
    setContacts((contacts) => [...contacts, user]);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = debounce(
    async (event) => {
      const query: string = event.target.value;
      const { data: results } = await supabaseClient
        .from<UserSchema>("users")
        .select("*")
        .or(`name.ilike.%${query}%,email.ilike.%${query}%`);
      setResults(results);
    },
    200
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
        <div className="p-2" />
        {results?.length! > 0 && <p>Results:</p>}
        <ul>
          {results?.map((result) => (
            <div
              key={result.id}
              className="p-3 shadow-md text-lg flex items-center justify-between cursor-pointer hover:bg-black hover:text-white rounded-md transition-all"
              onClick={() => handleClick(result)}
            >
              <span className="font-medium">{result.name}</span>
              <span className="text-sm">{result.email}</span>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContactsModal;
