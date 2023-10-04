export interface Expense {
  amount: number;
  description: string;
  date: Date;
  categoryId: string;
  transactionGroupId: string | null;
  paidAt: Date | undefined | null;
}

export interface AccountGroup {
  name: string;
  description: string;
}
