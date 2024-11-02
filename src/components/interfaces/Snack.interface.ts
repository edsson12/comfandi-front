import { SnackbarProps } from "@mui/material";

export interface SnackComfandiProps extends SnackbarProps {
  content: string;
  onClose?: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  severity?: "success" | "info" | "warning" | "error";
  variant?: "filled" | "outlined" | "standard";
  autoHideDuration?: number;
}
