import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Typography, TextField, Button } from "@mui/material";
import styles from "./ChatForm.module.sass";
import { useLocation } from "../../Hooks/useLocation";
import { Chat } from "../../Models/Chat";
import { v4 as uuidv4 } from "uuid";
import { useUpsertChat } from "@/Hooks/useUpsertChat";

type FormInputs = {
  chatName: string;
  radiusInMiles: number;
};

export const ChatForm: React.FC<{
  onClose: () => void;
  chat?: Chat | null;
}> = ({ onClose, chat = null }) => {
  const { location } = useLocation();
  const { mutate: upsertChat } = useUpsertChat();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormInputs>();

  useEffect(() => {
    if (chat) {
      setValue("chatName", chat.chatName);
      setValue("radiusInMiles", chat.radiusInMiles);
    }
  }, [chat, setValue]);

  const onSubmit: SubmitHandler<FormInputs> = (data: FormInputs) => {
    const updatedChat: Chat = {
      ...data,
      id: chat?.id || uuidv4(),
      country: chat?.country || location?.country || "",
      countryCode: chat?.countryCode || location?.countryCode || "",
      county: chat?.county || location?.county || "",
      houseNumber: chat?.houseNumber || location?.houseNumber || "",
      postalCode: chat?.postalCode || location?.postalCode || "",
      residential: chat?.residential || location?.residential || "",
      road: chat?.road || location?.road || "",
      state: chat?.state || location?.state || "",
      latitude: chat?.latitude || location?.latitude || 0,
      longitude: chat?.longitude || location?.longitude || 0,
    };
    upsertChat({ id: updatedChat.id, updatedChat });
    onClose();
  };

  return (
    <div className={styles.newChatForm}>
      <Typography variant="h6">{chat ? "Edit Chat" : "New Chat"}</Typography>
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
          {chat ? "Update Chat" : "Create Chat"}
        </Button>
      </form>
    </div>
  );
};
