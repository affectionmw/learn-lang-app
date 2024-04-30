"use server";

import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getCourseById, getUserProgress } from "@/db/queries";
import db from "@/db/drizzle";
import { userProgress } from "@/db/schema";
import { revalidatePath } from "next/cache";

export const upsertUserProgress = async (courseId: number) => {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        throw new Error("Ты не авторизован");
    }

    const course = await getCourseById(courseId);

    if (!course) {
        throw new Error("Курс не найден");
    }

    /*if (!course.units.length || !course.units[0].lessons.length) {
        throw new Error('Курс пуст')
    }*/

    const existingUserProgress = await getUserProgress();

    if (existingUserProgress) {
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user.firstName || "Пользователь",
            userImageSrc: user.imageUrl || "/mascot.svg",
        });

        revalidatePath("/courses");
        revalidatePath("/learn");
        redirect("/learn");
    }

    await db.insert(userProgress).values({
        userId,
        activeCourseId: courseId,
        userName: user.firstName || "Пользователь",
        userImageSrc: user.imageUrl || "/mascot.svg",
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
};
