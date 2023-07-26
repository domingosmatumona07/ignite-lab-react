// import { gql, useQuery } from "@apollo/client";
import { Lesson } from "./Lesson";
import { useGetLessonsQuery } from "../graphql/generated";

/*
const GET_LESSONS_QUERY = gql`
  query {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
      id
      title
      slug
      lessonType
      availableAt
    }
  }
`

interface GetLessonsQueryResponse {
  lessons: {
    id: string;
    title: string;
    slug: string;
    lessonType: 'live' | 'class';
    availableAt: string;
  }[]
}
*/

export function Sidebar() {
  const { data } = useGetLessonsQuery();
 
  return (
    <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Cronograma de aulas
      </span>

      <div className="flex flex-col gap-8">
        {data?.lessons.map(lesson => {
          return (
            <Lesson 
              key={lesson.id}
              title={lesson.title}
              slug={lesson.slug}
              availableAt={new Date(lesson.availableAt)}
              type={lesson.lessonType}
            />
          )
        })}
      </div>
    </aside>
  )
}