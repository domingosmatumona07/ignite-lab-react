// import { gql, useMutation } from "@apollo/client";
import { Logo } from "../components/Logo";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateSubscriberMutation } from "../graphql/generated";

interface IFormInputs {
  fullname: string;
  email: string;
}

/*
const CREATE_SUBSCRIBER_MUTATION = gql`
  mutation CreateSubscriber($name: String!, $email: String!) {
    createSubscriber(data: {name: $name, email: $email}) {
      id
    }
  }
`
*/

export function Subscribe() {
  const navigate = useNavigate();

  const { handleSubmit: handleSubscribe, register, formState: { errors } } = useForm<IFormInputs>();
  const [createSubscriber, { loading }] = useCreateSubscriberMutation();

  const onSubmit: SubmitHandler<IFormInputs> = async ({ fullname, email }) => {
    await createSubscriber({
      variables: {
        name: fullname,
        email
      }
    })

    navigate('/event');
  };


  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className=" w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px]">
          <Logo />

          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
          </p>
        </div>

        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">Inscreva-se gratuitamente</strong>

          <form action="" onSubmit={handleSubscribe(onSubmit)} className="flex flex-col gap-2 w-full">
            <input 
              className="bg-gray-900 rounded px-5 h-14"
              type="text" 
              {...register("fullname", {
                required: true,
              })}
              placeholder="Seu nome completo" 
            />
            {errors.fullname && <div className="text-red-500">Seu nome completo é obrigatório</div>}

            <input 
              className="bg-gray-900 rounded px-5 h-14"
              type="email" 
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido!"
                }
              })}
              placeholder="Digite seu e-mail" 
            />
            {errors.email && <div className="text-red-500">Digite um e-mail válido!</div>}
  
            <button 
              type="submit"
              disabled={loading}
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold hover:bg-green-700 transition-colors disabled:opacity-50"  
            >
              Garantir minha vaga
            </button>
          </form> 
        </div>
      </div>

      <img src="/src/assets/code-mockup.png" className="mt-10" alt="" />
    </div>
  )
}