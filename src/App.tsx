import React, { ChangeEvent, MouseEventHandler, useState } from "react";
import Contact from "./components/Contact";
import ContactInterface from "./interface/Contacts"
import { useAddContactMutation, useGetAllContactsQuery, useGetContactByIdQuery } from "./services/contactsApi"

function App() {

  const [displayedContact, setDisplayedContact] = useState<ContactInterface | null>({} as ContactInterface)
  const { isLoading, data, error } = useGetAllContactsQuery();
  const [contact, setContact] = useState({} as ContactInterface)
  const [addContact] = useAddContactMutation()

  const addNewContact = async () => {
    await addContact(contact)
  }

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    setContact(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const [id, setId] = useState(0);
  const {data:dataById} = useGetContactByIdQuery(id);

  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <h1>Add new contact</h1>
        <input type="text" name="name" value={contact.name} onChange={handleOnchange} />
        <input type={"email"} name="email" value={contact.email} onChange={handleOnchange} />

        <button onClick={addNewContact}>Add new contact</button>
        {
          dataById && 
          <pre> 
            {JSON.stringify(dataById, undefined, 2)}
          </pre>
        }

      </div>
      {
        isLoading ? <h2>Loading....</h2> : error ? <h2>Something went wrong</h2> : data?.map(contact => (
          <Contact data={contact} key={contact.id} setId={setId} />
        ))
      }

    </div>
  );
}

export default App;
