import PaperPrimary from '@/common/paper/PaperPrimary';
import TitlePage from '@/common/title/TitlePage'
import AddDoctorComponent from '@/components/addDoctorComponent/AddDoctorComponent';
import React from 'react'

type Props = {}

export default function AddDoctor({}: Props) {

    return (
        <div className='flex flex-col py-10 min-h-screen'>
            <TitlePage text='เพิ่มหมอ'/>
            <PaperPrimary className='p-2 md:p-10'>
                <AddDoctorComponent/>
            </PaperPrimary>
        </div>
    )
}