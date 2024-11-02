import { ButtonProps } from "@mui/material";

export interface ButtonComfandiProps extends ButtonProps {
    content: string | undefined;
    isLoadingButton?: boolean;
    bgcolor?: string;
  }