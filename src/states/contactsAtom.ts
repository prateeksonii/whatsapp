import { UserSchema } from "@/types/schemas";
import { atom } from "jotai";
import { focusAtom } from "jotai/optics";
import * as O from "optics-ts";

interface ContactsData {
  contacts: UserSchema[];
  selectedContact: UserSchema | null;
}

const contactsData: ContactsData = {
  contacts: [],
  selectedContact: null,
};

export const contactsAtom = atom(contactsData);

export const contactsListAtom = focusAtom(
  contactsAtom,
  (optic: O.OpticFor<ContactsData>) => optic.prop("contacts")
);

export const selectedContactAtom = focusAtom(
  contactsAtom,
  (optic: O.OpticFor<ContactsData>) => optic.prop("selectedContact")
);
