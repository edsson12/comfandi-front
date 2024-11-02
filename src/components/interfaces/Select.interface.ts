export interface Items {
  value: number | string;
  label: string;
  id: number | string;
}

export interface SelectComfandiProps {
  items: Items[];
  label: string;
  id: string;
}
