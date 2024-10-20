"use client";

import React from "react";
import { Button, Typography, Box, Container } from "@mui/material";
import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";

const LoginPage = () => {
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
          Sign in to Loco Chat
        </Typography>
        <Button
          fullWidth
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignIn}
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In with Google
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
