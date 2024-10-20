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
import styles from "./TopNavBar.module.sass";
import { HamburgerMenu, ChatForm } from "@/Components";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const TopNavBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleAddChat = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseModal = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar className={styles.toolbar}>
        {session && <HamburgerMenu />}
        <Typography variant="h6" component="div">
          Loco Chat
        </Typography>
        {session && (
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
            <Button color="inherit" onClick={handleSignOut}>
              Logout
            </Button>
          </div>
        )}
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
          <ChatForm onClose={handleCloseModal} />
        </Box>
      </Popover>
    </AppBar>
  );
};
