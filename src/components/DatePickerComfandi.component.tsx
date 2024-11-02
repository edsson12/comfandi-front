/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { DatePickerComfandiProps } from "./interfaces/DatePicker.interface";
import { normalizedDate } from "../helpers/conversion.helper";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";

const locale = "es-mx";

const DatePickerComfandi: React.FC<DatePickerComfandiProps> = ({
  onChange,
  value,
  label,
  name,
  ...props
}) => {
  const manageOnDataPickerChange = (valueI: string | null | Moment) => {
    const formattedValue =
      valueI && typeof valueI !== "string"
        ? valueI.format("YYYY-MM-DD")
        : valueI;
    onChange(normalizedDate(formattedValue));
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
        <DatePicker
          sx={{ width: "100%" }}
          {...props}
          name={name}
          label={label}
          value={value ? moment(value) : null}
          onChange={manageOnDataPickerChange}
          slotProps={{ textField: { size: "small" } }}
        />
      </LocalizationProvider>
    </>
  );
};

export default DatePickerComfandi;
