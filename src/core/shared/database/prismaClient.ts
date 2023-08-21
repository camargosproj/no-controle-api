import { PrismaClient } from "@prisma/client";

export class PrismaService extends PrismaClient {
  constructor() {
    super({
      // log: ["error", "info", "query", "warn"],
    });
  }
}

export const prismaServiceClient = new PrismaService();
