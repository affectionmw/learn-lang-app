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
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

        await db.insert(schema.courses).values([
            { id: 1, title: "Испанский", imageSrc: "/es.svg" },
            { id: 2, title: "Итальянский", imageSrc: "/it.svg" },
            { id: 3, title: "Хорватский", imageSrc: "/hr.svg" },
            { id: 4, title: "Японский", imageSrc: "/jp.svg" },
            { id: 5, title: "Французский", imageSrc: "/fr.svg" },
        ]);

        await db
            .insert(schema.units)
            .values([{ id: 1, courseId: 1, title: "Раздел 1", description: "Основы испанского", order: 1 }]);

        await db.insert(schema.lessons).values([
            { id: 1, unitId: 1, order: 1, title: "Существительные" },
            { id: 2, unitId: 1, order: 2, title: "Глаголы" },
            { id: 3, unitId: 1, order: 3, title: "Еще что-то" },
            { id: 4, unitId: 1, order: 4, title: "Еще что-то2" },
            { id: 5, unitId: 1, order: 5, title: "Еще что-то3" },
        ]);

        await db.insert(schema.challenges).values([
            { id: 1, lessonId: 1, type: "SELECT", order: 1, question: 'Кого из них называют "человек"?' },
            { id: 2, lessonId: 1, type: "ASSIST", order: 2, question: '"человек"' },
            { id: 3, lessonId: 1, type: "SELECT", order: 3, question: 'Кого из них называют "робот"?' },
        ]);

        // challenge 1
        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 1,
                imageSrc: "/man.svg",
                correct: true,
                text: "el hombre",
                audioSrc: "/es_man.mp3",
            },
            {
                challengeId: 1,
                imageSrc: "/woman.svg",
                correct: false,
                text: "la mujer",
                audioSrc: "/es_woman.mp3",
            },
            {
                challengeId: 1,
                imageSrc: "/robot.svg",
                correct: false,
                text: "el robot",
                audioSrc: "/es_robot.mp3",
            },
        ]);

        // challenge 2
        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 2,
                correct: true,
                text: "el hombre",
                audioSrc: "/es_man.mp3",
            },
            {
                challengeId: 2,
                correct: false,
                text: "la mujer",
                audioSrc: "/es_woman.mp3",
            },
            {
                challengeId: 2,
                correct: false,
                text: "el robot",
                audioSrc: "/es_robot.mp3",
            },
        ]);

        // challenge 3
        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 3,
                imageSrc: "/man.svg",
                correct: false,
                text: "el hombre",
                audioSrc: "/es_man.mp3",
            },
            {
                challengeId: 3,
                imageSrc: "/woman.svg",
                correct: false,
                text: "la mujer",
                audioSrc: "/es_woman.mp3",
            },
            {
                challengeId: 3,
                imageSrc: "/robot.svg",
                correct: true,
                text: "el robot",
                audioSrc: "/es_robot.mp3",
            },
        ]);

        console.log("Сидирование завершено");
    } catch (error) {
        console.error(error);
        throw new Error("Не удалось засидировать базу данных");
    }
};

main();
