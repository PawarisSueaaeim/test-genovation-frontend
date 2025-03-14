import RegisterComponent from '@/components/auth/RegisterComponent'
import React from 'react'
import PaperPrimary from '../../common/paper/PaperPrimary'

type Props = {}

export default function Register({}: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center">
    <PaperPrimary className="p-8">
        <div className="flex flex-col gap-4">
            <RegisterComponent/>
        </div>
    </PaperPrimary>
</div>
  )
}