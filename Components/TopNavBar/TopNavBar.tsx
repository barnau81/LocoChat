"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Tooltip,
  Typography,
  Box,
  Popover,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { NewChatForm } from "../NewChatForm/NewChatForm";
import styles from "./Styles.module.sass";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";

const TopNavBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogout = () => {
    // TODO: Implement logout functionality
    console.log("Logout clicked");
  };

  const handleAddChat = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseModal = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <AppBar position="static">
      <Toolbar className={styles.toolbar}>
        <HamburgerMenu />
        <Typography variant="h6" component="div">
          My Chat App
        </Typography>
        <div>
          <Tooltip title="Add Chat" arrow>
            <IconButton
              color="inherit"
              aria-label="add chat"
              onClick={handleAddChat}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Toolbar>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseModal}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box className={styles.modalContent}>
          <NewChatForm />
        </Box>
      </Popover>
    </AppBar>
  );
};

export default TopNavBar;
