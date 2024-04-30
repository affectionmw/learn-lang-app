import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, {
    schema,
});

const main = async () => {
    try {
        console.log("Сидируем базу данных...");

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);

        await db.insert(schema.courses).values([
            { id: 1, title: "Испанский", imageSrc: "/es.svg" },
            { id: 2, title: "Итальянский", imageSrc: "/it.svg" },
            { id: 3, title: "Хорватский", imageSrc: "/hr.svg" },
            { id: 4, title: "Японский", imageSrc: "/jp.svg" },
            { id: 5, title: "Французский", imageSrc: "/fr.svg" },
        ]);

        console.log("Сидирование завершено");
    } catch (error) {
        console.error(error);
        throw new Error("Не удалось засидировать базу данных");
    }
};

main();
