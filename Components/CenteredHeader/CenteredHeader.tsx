import { Typography } from "@mui/material";
import styles from "./CenteredHeader.module.sass";

interface CenteredHeaderProps {
  headerText: string;
}

export const CenteredHeader: React.FC<CenteredHeaderProps> = ({
  headerText,
}) => {
  return (
    <div className={styles.root}>
      <Typography variant="h4">{headerText}</Typography>
    </div>
  );
};
