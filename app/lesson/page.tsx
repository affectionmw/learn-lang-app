import React from "react";
import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "@/app/lesson/quiz";

const LessonIdPage = async () => {
    const lessonReq = getLesson();
    const userProgressReq = getUserProgress();

    const [lesson, userProgress] = await Promise.all([lessonReq, userProgressReq]);

    if (!lesson || !userProgress) {
        redirect("/learn");
    }

    const initialPercentage =
        (lesson.challenges.filter((challenge) => challenge.completed).length / lesson.challenges.length) * 100;

    return (
        <Quiz
            initialLessonId={lesson.id}
            initialLessonChallenges={lesson.challenges}
            initialHearts={userProgress.hearts}
            initialPercentage={initialPercentage}
            userSubscription={null} // TODO: добавить подписку
        />
    );
};

export default LessonIdPage;
