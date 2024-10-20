"use client";

import styles from "./ChatList.module.sass";

import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetAvailableChats } from "../../Hooks/useGetAvailableChats";
import { CircularProgress, Typography } from "@mui/material";
import { Chat } from "@/Models/Chat";

export const ChatList: React.FC = () => {
  const { data: availableChats, isLoading, error } = useGetAvailableChats();

  console.log(availableChats);

  const columns: GridColDef<Chat>[] = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "chatName",
      headerName: "Chat Name",
      width: 150,
      renderCell: (params) => {
        debugger;
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
  ];

  if (isLoading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <div className={styles.chatList}>
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
        disableRowSelectionOnClick
      />
    </div>
  );
};
