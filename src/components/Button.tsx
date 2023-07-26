import { DiscordLogo, Lightning } from "@phosphor-icons/react";

interface ButtonProps {
  variant: 'primary' | 'secondary';
  text: string;
  iconSize: number;
}

export function Button({ variant, text, iconSize }: ButtonProps) {
  return (
    <a
      href="" 
      className={`p-4 text-sm flex flex-row-reverse items-center 
      justify-center gap-2 font-bold uppercase 
      ${
        variant === 'primary'
        ? 'bg-green-500 hover:bg-green-700 transition-colors'
        : 'border border-blue-500 hover:bg-blue-500 hover:text-gray-900 transition-colors'
      }`}
    >
      {text}
      {variant === 'primary' ? <DiscordLogo size={iconSize}/> : <Lightning size={iconSize}/>}
    </a>
  )
}