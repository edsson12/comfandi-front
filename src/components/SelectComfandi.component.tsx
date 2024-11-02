import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Items } from "./interfaces/Select.interface";
import { v4 as uuidv4 } from "uuid";

const styles = {
  borderRadius: "6px",
  "& .MuiFormHelperText-root.Mui-error": {
    margin: "0px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#CBD5E1",
  },
  "& .MuiSvgIcon-root": {
    color: "#0F172A",
  },
  "& .MuiSelect-select": {
    textAlign: "left",
  },
};

type SelectComfandiProps = SelectProps & {
  items: Items[];
  label: string;
  id: string;
};

export const SelectComfandi = ({
  items,
  label,
  id,
  ...props
}: SelectComfandiProps) => {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        id={id}
        value={props.value}
        label={label}
        onChange={props.onChange}
        name={props.name}
        IconComponent={KeyboardArrowDownIcon}
        sx={styles}
      >
        {items?.length > 0 &&
          items.map((item) => (
            <MenuItem
              key={uuidv4()}
              value={item.value}
              sx={{ textAlign: "left" }}
            >
              {item.label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export const SelectComfandiRegister = ({
  items,
  label,
  id,
  ...props
}: SelectComfandiProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel sx={{ color: "text.disabled" }} id={id}>
        {label}
      </InputLabel>
      <Select
        labelId={id}
        id={id}
        value={props.value}
        label={label}
        onChange={props.onChange}
        name={props.name}
        IconComponent={KeyboardArrowDownIcon}
        size="small"
      >
        {items?.length > 0 &&
          items.map((item) => (
            <MenuItem
              key={item.id}
              value={item.value}
              sx={{ textAlign: "left" }}
            >
              {item.label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};
