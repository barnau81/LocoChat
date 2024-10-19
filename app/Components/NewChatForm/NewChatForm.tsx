import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Typography, TextField, Button } from "@mui/material";
import styles from "./Styles.module.sass";
import { useLocation } from "../../Hooks/useLocation";
import { chatApi } from "../../mockApi/newChatApi";

type FormInputs = {
  chatName: string;
  radiusInMiles: number;
};

export const NewChatForm: React.FC = () => {
  const { location } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data: FormInputs) => {
    console.log(data);
    console.log(location);

    const newChat: NewChat = {
      ...data,
      id: `${location?.latitude ?? 0}-${location?.longitude ?? 0}`,
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
          inputProps={{ min: 0, step: "any" }}
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

export type NewChat = {
  id: string;
  chatName: string;
  radiusInMiles: number;
  country: string;
  countryCode: string;
  county: string;
  houseNumber: string;
  postalCode: string;
  residential: string;
  road: string;
  state: string;
  latitude: number;
  longitude: number;
};
