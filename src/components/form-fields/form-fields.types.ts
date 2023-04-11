import { Control } from "react-hook-form";

export interface IField {
  name: string;
  label: string;
  className?: string;
  control: Control<any, any>;
}
