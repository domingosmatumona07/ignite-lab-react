import { CaretRight, FileArrowDown } from "@phosphor-icons/react";
import { Button } from "./Button";
import { RocketseatLogo } from "./RocketseatLogo";
import { DefaultUi, Player, Youtube } from "@vime/react";
// import { gql, useQuery } from "@apollo/client";
import '@vime/core/themes/default.css';
import { useGetLessonBySlugQuery } from "../graphql/generated";

/*
const GET_LESSON_BY_SLUG_QUERY = gql`
  query GetLessonBySlug ($slug: String) {
    lesson(where: {slug: $slug}, stage: PUBLISHED) {
      title
      lessonType
      videoId
      slug
      description
      teacher {
        name
        bio
        avatarURL
      }
    }
  }
`

interface GetLessonBySlugResponse {
  lesson: {
    title: string;
    lessonType: string;
    videoId: string;
    slug: string;
    description: string;
    teacher: {
      name: string;
      bio: string;
      avatarURL: string;
    }
  }
}
*/

interface VideoProps {
  lessonSlug: string;
}

export function Video({ lessonSlug }: VideoProps) {
  const { data } = useGetLessonBySlugQuery({
    variables: { 
      slug: lessonSlug
    }
  });

  if(!data || !data.lesson) {
    return (
      <div className="flex-1">
        <p>Carregando...</p>
      </div>
    )
  }


  return (
    <div className="flex-1">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <Player>
            <Youtube videoId={data.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {data.lesson.title}
            </h1>
            <p className="pt-4 text-gray-200 leading-relaxed">
              {data.lesson.description}
            </p>

            {data.lesson.teacher && (
              <div className="flex items-center gap-4 mt-6">
              <img
              className="h-16 w-16 rounded-full border-2 border-blue-500" 
                src={data.lesson.teacher.avatarURL} 
                alt="" 
              />

              <div className="leading-relaxed">
                <strong className="font-bold text-2xl block">{data.lesson.teacher.name}</strong>
                <span className="text-gray-200 text-sm block">Software Developer</span>
              </div>

            </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <Button variant="primary" text="Comunidade no discord" iconSize={24} />
            <Button variant="secondary" text="Acesse o desafio" iconSize={24}  />
        </div>
        </div>

        <div className="gap-8 mt-20 grid grid-cols-2">
          <a href="" className="bg-gray-700 rounded overflow-hidden flex items-strech gap-6 hover:bg-gray-600 transition-color">
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Material complementar</strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelerar o seu desenvolvimento
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>
          
          <a href="" className="bg-gray-700 rounded overflow-hidden flex items-strech gap-6 hover:bg-gray-600 transition-color">
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Wallpapers exclusivos</strong>
              <p className="text-sm text-gray-200 mt-2">
              Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>
        </div>       
      </div>

      <footer className="max-w-[1100px] mx-auto border-t border-gray-500 h-16 text-gray-300 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <RocketseatLogo />
          <span>Rocketseat - Todos os direitos reservados</span>
        </div>
        <div>
          <span>Políticas de privacidade</span>
        </div>
      </footer>
    </div>
  )
}    