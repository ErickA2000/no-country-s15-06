// BenefitsCard.tsx
import React from 'react'
import '../benefitsSection/BenefitsCards.css'

type Props = {
  icon: React.ReactNode
  benefit: {
    title: string
    description: string
  }
}

export const BenefitsCard = ({ icon, benefit }: Props) => {
  return (
    <div className='benefit-card'>
      <div className='flex items-center mb-4'>
        {icon}
        <h3 className='text-lg font-bold ml-4'>{benefit.title}</h3>
      </div>
      <p className='text-gray-600'>{benefit.description}</p>
    </div>
  )
}