import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, IconButton, Dialog, TextField, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";

const ContactsTable = () => {
  const [contacts, setContacts] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);

  // Fetch contacts from the backend
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/contacts");
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  // Delete a contact
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/contacts/${id}`);
      setContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleEdit = (contact) => {
    setCurrentContact(contact);
    setOpenEditDialog(true);
  };

  // Update contact details
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/contacts/${currentContact._id}`, currentContact);
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact._id === currentContact._id ? currentContact : contact
        )
      );
      setOpenEditDialog(false);
      setCurrentContact(null);
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
    setCurrentContact(null);
  };

  const columns = [
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "phoneNumber", headerName: "Phone Number", width: 150 },
    { field: "company", headerName: "Company", width: 150 },
    { field: "jobTitle", headerName: "Job Title", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleEdit(params.row)} color="primary">
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row._id)} color="error">
            <Delete />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={contacts}
        columns={columns}
        getRowId={(row) => row._id} 
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
      />

      {/* Edit Contact Dialog */}
      {currentContact && (
        <Dialog open={openEditDialog} onClose={handleCloseDialog}>
          <DialogTitle>Edit Contact</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="First Name"
              fullWidth
              value={currentContact.firstName}
              onChange={(e) =>
                setCurrentContact({ ...currentContact, firstName: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Last Name"
              fullWidth
              value={currentContact.lastName}
              onChange={(e) =>
                setCurrentContact({ ...currentContact, lastName: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Email"
              fullWidth
              value={currentContact.email}
              onChange={(e) =>
                setCurrentContact({ ...currentContact, email: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Phone Number"
              fullWidth
              value={currentContact.phoneNumber}
              onChange={(e) =>
                setCurrentContact({ ...currentContact, phoneNumber: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Company"
              fullWidth
              value={currentContact.company}
              onChange={(e) =>
                setCurrentContact({ ...currentContact, company: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Job Title"
              fullWidth
              value={currentContact.jobTitle}
              onChange={(e) =>
                setCurrentContact({ ...currentContact, jobTitle: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleUpdate} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ContactsTable;
