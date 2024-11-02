/* eslint-disable @typescript-eslint/no-explicit-any */
import { Moment } from "moment";

export interface DatePickerComfandiProps {

  onChange: (value: string | null, keyboardInputValue?: string) => void;
  name: string;
  value: string | null | Moment;
  label: string;
  
}
