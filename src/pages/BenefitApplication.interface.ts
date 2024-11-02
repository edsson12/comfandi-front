export interface RowsProps {
  id: number;
  is_family_head: boolean;
  first_name: string;
  second_name: string | null;
  first_last_name: string;
  second_last_name: string | null;
  birth_date: Date;
  document_type: string;
  document_number: string;
  created_at: Date;
  updated_at: Date;
}
