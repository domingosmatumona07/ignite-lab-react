import { CheckCircle, Lock } from "@phosphor-icons/react"
import { Link, useParams } from "react-router-dom";
import { isPast, format } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import classnames from "classnames";

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string}>();

  const isLessonAvailable = isPast(props.availableAt);
  const availableDateFormatted = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
    locale: ptBR
  });

  const isActiveLesson = slug === props.slug;

  return (
    <Link to={`/event/lesson/${props.slug}`} className="group">
      <span className="text-gray-300">
        {availableDateFormatted.toString()}
      </span>

      <div className={classnames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
        'bg-green-500': isActiveLesson
      })}>
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
             <span className={classnames('flex items-center gap-2 text-sm text-blue-500 font-medium', {
              'text-white': isActiveLesson
             })}>           
              <CheckCircle size={20} />
              Conteúdo liberado
          </span>
          ) : (
            <span className="flex items-center gap-2 text-sm text-orange-500 font-medium">           
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span className={classnames('text-xs rounded py-[0.125rem] px-2 text-white border border-green-300 font-bold', {
            'border-white': isActiveLesson
          })}>
            { props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA' }
          </span>
        </header>

        <strong className={classnames('text-gray-200 mt-5 block', {
          'text-white': isActiveLesson
        })}>
          {props.title}
        </strong>
      </div>
    </Link>
  )
}