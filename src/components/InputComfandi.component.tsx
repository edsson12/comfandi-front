import {
  CircularProgress,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";

const styles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "6px",

    input: {
      "&:-webkit-autofill": {
        boxShadow: "0 0 0 100px #FAF9FA inset",
      },
    },
  },
  "& .MuiFormHelperText-root": {
    margin: "3px 0px 0px",
  },
  "& .MuiFormHelperText-root.Mui-error": {
    position: "absolute",
    top: "100%",
  },
};

type InputComfandiProps = TextFieldProps & {
  isLoading?: boolean;
};

const InputComfandi: React.FC<InputComfandiProps> = ({
  isLoading,
  ...props
}: InputComfandiProps) => {
  return (
    <>
      <TextField
        fullWidth
        variant="outlined"
        {...props}
        sx={styles}
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                {isLoading && <CircularProgress size={20} color="primary" />}
              </InputAdornment>
            ),
          },
        }}
      />
    </>
  );
};

export { InputComfandi };
