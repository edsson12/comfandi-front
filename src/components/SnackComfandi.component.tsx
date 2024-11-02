import { useState } from "react";
import { SnackComfandiProps } from "./interfaces/Snack.interface";
import { Alert, Snackbar } from "@mui/material";

const styles = {
  "&.MuiSnackbar-anchorOriginTopRight": {
    top: "74px",
  },
};

const SnackComfandi: React.FC<SnackComfandiProps> = ({
  content,
  onClose,
  severity,
  variant,
  autoHideDuration,
  ...props
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    if (onClose) {
      onClose(event, reason);
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration || 1000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={styles}
      {...props}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant={variant}
        sx={{ width: "100%" }}
      >
        {content}
      </Alert>
    </Snackbar>
  );
};

export default SnackComfandi;
