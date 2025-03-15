import { ChangeEventHandler } from 'react'

type Props = {
  label?: string;
  onClick?: ChangeEventHandler<HTMLInputElement>;
  value?: boolean;
}

export default function SwitchButton({label, onClick, value}: Props) {
  return (
    <div>
        <label className='inline-flex items-center cursor-pointer'>
            <input type='checkbox' value='' className='sr-only peer' onChange={onClick} checked={value}/>
            <div className='relative w-11 h-6 bg-gray-200 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500'></div>
            <span className='ms-3 text-sm font-medium text-nowBrown dark:text-gray-300'>{label}</span>
        </label>
    </div>
  )
}
