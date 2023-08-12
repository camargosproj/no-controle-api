import { MonthType } from "@prisma/client";
import * as moment from "moment";
import BalanceService from "../balance/balance.service";
import { PrismaService } from "../core/shared";
import { NotFoundError } from "../errors";
import { Expense } from "./expense.interface";

export default class ExpenseService {
  private prisma: PrismaService;
  private balanceService: BalanceService;
  constructor(prisma: PrismaService, balanceService: BalanceService) {
    this.prisma = prisma;
    this.balanceService = balanceService;
  }
  async create(expense: Expense) {
    const transactionDefaultGroup =
      await this.prisma.transactionGroup.findFirst({
        where: {
          userId: expense.userId,
          isDefault: true,
          type: "EXPENSE",
        },
        select: {
          id: true,
        },
      });

    const transactionGroupId =
      expense?.transactionGroupId || transactionDefaultGroup.id;
    const expenseData = await this.prisma.expense.create({
      data: {
        ...expense,
        transactionGroupId,
        date: new Date(expense.date),
      },
    });

    const balanceMonthName = moment(expense.date).format("MMMM");

    const totalAmount = await this.balanceService.updateTotalAmount(
      transactionGroupId,
      "expense",
      balanceMonthName as MonthType
    );
    return { ...expenseData, totalAmount };
  }

  async findAll(userId: string, transactionGroupId: string, month?: string) {
    if (!month) {
      month = moment().format("MMMM").toUpperCase();
    }

    let data = await this.prisma.expense.findMany({
      where: {
        userId,
        transactionGroupId,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    const totalAmount = await this.balanceService.getTotalAmount(
      transactionGroupId,
      "expense",
      month as MonthType
    );
    if (totalAmount) {
      return [...data, { totalAmount }];
    }
    return {
      data: data,
      balance: await this.balanceService.getBalance(userId, month as MonthType),
    };
  }

  async findOne(userId: string, id: string) {
    const expense = await this.prisma.expense.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!expense) {
      throw new NotFoundError("Expense not found");
    }

    return expense;
  }

  async update(userId: string, id: string, data: Expense) {
    const expense = await this.findOne(userId, id);

    const updatedExpense = await this.prisma.expense.update({
      where: {
        id,
      },
      data: {
        ...data,
        date: new Date(data.date),
      },
    });

    const balanceMonthName = moment(updatedExpense.date).format("MMMM");

    if (expense.transactionGroupId !== data.transactionGroupId) {
      await this.balanceService.updateTotalAmount(
        expense.transactionGroupId,
        "expense",
        balanceMonthName as MonthType
      );
    }
    await this.balanceService.updateTotalAmount(
      data.transactionGroupId,
      "expense",
      balanceMonthName as MonthType
    );

    return updatedExpense;
  }

  async delete(userId: string, id: string) {
    await this.findOne(userId, id);

    const deletedExpense = await this.prisma.expense.delete({
      where: {
        id,
      },
    });

    const balanceMonthName = moment(deletedExpense.date).format("MMMM");

    await this.balanceService.updateTotalAmount(
      deletedExpense.transactionGroupId,
      "expense",
      balanceMonthName as MonthType
    );

    return;
  }
}
