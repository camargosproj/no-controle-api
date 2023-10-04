export interface Income {
  amount: number;
  description: string;
  date: Date;
  categoryId: string;
  transactionGroupId?: string | undefined;
  receivedAt: Date | undefined | null;
}

export interface AccountGroup {
  name: string;
  description: string;
}
