import React from 'react'

type Props = {
    text: string;
}

export default function TitlePage({text}: Props) {
  return (
    <div className='font-bold text-2xl'>
        {text}
    </div>
  )
}