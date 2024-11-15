import React, { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactsTable from "./components/Table";
import axios from "axios";

const App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("https://backend123.up.railway.app/contacts");
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const addContact = async (newContact) => {
    try {
      const response = await axios.post("https://backend123.up.railway.app/contacts", newContact);
      setContacts([...contacts, response.data]);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const updateContact = async (id, updatedContact) => {
    try {
      await axios.put(`https://backend123.up.railway.app/contacts/${id}`, updatedContact);
      setContacts(contacts.map(contact => contact.id === id ? updatedContact : contact));
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`https://backend123.up.railway.app/contacts/${id}`);
      setContacts(contacts.filter(contact => contact.id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Contact Management</h1>
      <div className="max-w-6xl mx-auto">
        <ContactForm addContact={addContact} />
        <ContactsTable 
          contacts={contacts} 
          updateContact={updateContact} 
          deleteContact={deleteContact} 
        />
      </div>
    </div>
  );
};

export default App;
