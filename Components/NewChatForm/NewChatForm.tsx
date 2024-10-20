import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Typography, TextField, Button } from "@mui/material";
import styles from "./NewChatForm.module.sass";
import { useLocation } from "../../Hooks/useLocation";
import { chatApi } from "../../mockApi/newChatApi";
import { Chat } from "../../Models/Chat";
import { v4 as uuidv4 } from "uuid";

type FormInputs = {
  chatName: string;
  radiusInMiles: number;
};

export const NewChatForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { location } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data: FormInputs) => {
    console.log(data);
    console.log(location);

    const newChat: Chat = {
      ...data,
      id: uuidv4(), // lets replace this with a uuid
      country: location?.country ?? "",
      countryCode: location?.countryCode ?? "",
      county: location?.county ?? "",
      houseNumber: location?.houseNumber ?? "",
      postalCode: location?.postalCode ?? "",
      residential: location?.residential ?? "",
      road: location?.road ?? "",
      state: location?.state ?? "",
      latitude: location?.latitude ?? 0,
      longitude: location?.longitude ?? 0,
    };
    chatApi.createChat(newChat);
    onClose();
  };

  return (
    <div className={styles.newChatForm}>
      <Typography variant="h6">New Chat</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("chatName", { required: "Chat name is required" })}
          label="Chat Name"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.chatName}
          helperText={errors.chatName?.message}
        />
        <TextField
          {...register("radiusInMiles", {
            required: "Radius is required",
            valueAsNumber: true,
            validate: (value) => !isNaN(value) || "Please enter a valid number",
          })}
          label="Radius in Miles"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          error={!!errors.radiusInMiles}
          helperText={errors.radiusInMiles?.message}
        />
        <Button type="submit" variant="contained" color="primary">
          Create Chat
        </Button>
      </form>
    </div>
  );
};
