import { useState } from "react";
import ContactInterface from "../interface/Contacts";
import { useUpdateContactMutation, useDeleteContactMutation, useGetContactByIdQuery } from "../services/contactsApi"

type contactProps = {
    data: ContactInterface,
    setDisplayedContact:React.Dispatch<React.SetStateAction<ContactInterface | null>>
}


function Contact({ data, setDisplayedContact }: contactProps) {
    const { isLoading, data: contact, error } = useGetContactByIdQuery(data.id!);

    const [updateContact] = useUpdateContactMutation();
    
    const updateContactData = async () => {
        const updatedContact = {
            id: data.id,
            name: "updated name",
            email: "updatedemail@gmail.com"
        }

        await updateContact(updatedContact);
    }

    const [deleteContact] = useDeleteContactMutation()

    const deleteContactData = async () => {
        await deleteContact(data.id!);
    }

    const DisplayContactData = async () => {
        setDisplayedContact(contact!)
    }

    return (
        <pre>
            {
                JSON.stringify(data, undefined, 2)
            }
            <button onClick={updateContactData}>update</button>
            <button onClick={deleteContactData}>delete</button>
            <button onClick={DisplayContactData}>display</button>
        </pre>

    )
}

export default Contact