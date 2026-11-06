import { PrismaClient } from "./generated/prisma/client.ts";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import "dotenv/config"


const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL,
});

const client = new PrismaClient({ adapter });

export default client;