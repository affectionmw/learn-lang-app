import "dotenv/config";
import type { Config } from "drizzle-kit";

export default (<Config>{
    schema: "./db/schema.ts",
    out: "./drizzle",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!,
    },
}) satisfies Config;
