"use client";

import styles from "./ChatList.module.sass";

import React, { useState } from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useGetAvailableChats } from "../../Hooks/useGetAvailableChats";
import {
  CircularProgress,
  Typography,
  Box,
  Button,
  Modal,
} from "@mui/material";
import { Chat } from "@/Models/Chat";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ChatForm } from "../NewChatForm/ChatForm";
import { useDeleteChat } from "@/Hooks/useDeleteChat";

export const ChatList: React.FC = () => {
  const { data: availableChats, isLoading, error } = useGetAvailableChats();
  const { mutate: deleteChat } = useDeleteChat();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatToEdit, setChatToEdit] = useState<Chat | null>(null);

  const handleRowClick = (params: GridRowParams) => {
    setSelectedChat(params.row as Chat);
  };

  const handleEditClick = (chat: Chat) => {
    setChatToEdit(chat);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm("Are you sure you want to delete this chat?")) {
      deleteChat(id, {
        onSuccess: () => {
          console.log("Chat deleted successfully");
        },
        onError: (error) => {
          console.error("Failed to delete chat:", error);
        },
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setChatToEdit(null);
  };

  const columns: GridColDef<Chat>[] = [
    {
      field: "chatName",
      headerName: "Chat Name",
      width: 150,
      renderCell: (params) => {
        return params.row.chatName;
      },
    },
    {
      field: "radiusInMiles",
      headerName: "Radius (Miles)",
      width: 130,
      type: "number",
    },
    { field: "country", headerName: "Country", width: 120 },
    { field: "countryCode", headerName: "Country Code", width: 120 },
    { field: "county", headerName: "County", width: 120 },
    { field: "houseNumber", headerName: "House Number", width: 130 },
    { field: "postalCode", headerName: "Postal Code", width: 120 },
    { field: "residential", headerName: "Residential", width: 120 },
    { field: "road", headerName: "Road", width: 120 },
    { field: "state", headerName: "State", width: 120 },
    { field: "latitude", headerName: "Latitude", width: 130, type: "number" },
    { field: "longitude", headerName: "Longitude", width: 130, type: "number" },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            startIcon={<EditIcon />}
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(params.row as Chat);
            }}
          >
            Edit
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(params.row.id);
            }}
            color="error"
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  if (isLoading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Box className={styles.chatList}>
      <DataGrid
        className={styles.dataGrid}
        rows={availableChats}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        onRowClick={handleRowClick}
      />
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal}>
          <ChatForm onClose={handleCloseModal} chat={chatToEdit} />
        </Box>
      </Modal>
    </Box>
  );
};
