import ProtectedRoute from "@/Components/ProtectedRoute";
import styles from "./page.module.css";
import { Typography } from "@mui/material";

export default function Home() {
  return (
    <ProtectedRoute>
      <div className={styles.page}>
        <main className={styles.main}>
          <Typography variant="h1">Welcome to Loco Chat</Typography>
        </main>
        <footer className={styles.footer}>
          <Typography>Footer placeholder</Typography>
        </footer>
      </div>
    </ProtectedRoute>
  );
}
