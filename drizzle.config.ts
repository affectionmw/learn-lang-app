import "dotenv/config";
import type { Config } from "drizzle-kit";

export default (<Config>{
    schema: "./db/schema.ts",
    out: "./drizzle",
    driver: "postgresql",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
}) satisfies Config;
