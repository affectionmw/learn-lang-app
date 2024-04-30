import { getCourses, getUserProgress } from "@/db/queries";
import { List } from "@/app/(main)/courses/list";

const CoursesPage = async () => {
    const coursesReq = getCourses();
    const userProgressReq = getUserProgress();

    const [courses, userProgress] = await Promise.all([coursesReq, userProgressReq]);

    return (
        <div className='h-full max-w--[912px] px-3 max-auto'>
            <h1 className='text-2xl font-bold text-neutral-700'>Языковые курсы</h1>
            <List courses={courses} activeCourseId={userProgress?.activeCourseId} />
        </div>
    );
};

export default CoursesPage;
