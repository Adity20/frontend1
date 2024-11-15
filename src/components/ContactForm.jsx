import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";

const ContactForm = ({ addContact }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    addContact(data);
    reset();
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8"
    >
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Add New Contact</h2>
      <div className="grid grid-cols-2 gap-4">
        <TextField label="First Name" {...register("firstName", { required: true })} fullWidth />
        <TextField label="Last Name" {...register("lastName", { required: true })} fullWidth />
        <TextField label="Email" {...register("email", { required: true })} fullWidth />
        <TextField label="Phone Number" {...register("phoneNumber", { required: true })} fullWidth />
        <TextField label="Company" {...register("company")} fullWidth />
        <TextField label="Job Title" {...register("jobTitle")} fullWidth />
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        <Button type="reset" onClick={reset} variant="outlined">Reset</Button>
        <Button type="submit" variant="contained" color="primary">Add Contact</Button>
      </div>
    </form>
  );
};

export default ContactForm;
