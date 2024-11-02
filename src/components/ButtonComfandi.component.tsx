import { CircularProgress, Theme } from "@mui/material";
import { ButtonComfandiProps } from "./interfaces/Button.interface";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";

const ButtonComfandiStyles = styled(Button)<{
  theme?: Theme;
  bgcolor?: string;
}>(({ theme, bgcolor }) => ({
  backgroundColor: bgcolor ? bgcolor : theme.palette.primary.main,
  color: 'white',
  "&:hover": {
    boxShadow: "none",
  },
  "&.MuiButton-outlined": {
    border: "2px solid",
  },
  boxShadow: "none",
  fontSize: "16px",
  textTransform: "none",
  whiteSpace: "nowrap",
  minWidth: "auto",
  height: "40px",
}));

const ButtonComfandi: React.FC<ButtonComfandiProps> = ({
  content,
  variant = "contained",
  color = "primary",
  isLoadingButton = false,
  ...props
}: ButtonComfandiProps) => {
  return (
    <ButtonComfandiStyles
      {...props}
      color={color}
      fullWidth
      variant={variant}
      disabled={isLoadingButton || props.disabled}
      bgcolor={props.bgcolor}
    >
      {content}
      {isLoadingButton && (
        <CircularProgress
          size={20}
          style={{ marginLeft: "8px", color: "inherit" }}
        />
      )}
    </ButtonComfandiStyles>
  );
};

export default ButtonComfandi;
