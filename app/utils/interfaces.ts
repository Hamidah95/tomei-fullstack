export interface TodoPayload {
  id?: number;
  title: string;
  description?: string;
  status: string;
  created_at?: string;
}

export interface TodoProps {
  id: number;
  title: string;
  description?: string;
  status: string;
  created_at: Date;
}