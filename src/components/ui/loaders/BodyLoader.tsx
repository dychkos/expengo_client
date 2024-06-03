import { Skeleton } from '@mui/material'
import React from 'react'
import { cn } from '../../../app/className'

interface BodyLoaderProps {
  className?: string
}

const BodyLoader: React.FC<BodyLoaderProps> = ({ className }) => {
  return (
    <div>
      <div className={cn('pt-32 flex flex-col gap-12 items-center justify-center', className)}>
        <Skeleton variant="rounded" sx={{ borderRadius: 4 }} width={700} height={60} />
        <Skeleton variant="rounded" sx={{ borderRadius: 4 }} width={700} height={60} />
        <Skeleton variant="rounded" sx={{ borderRadius: 4 }} width={700} height={60} />
        <Skeleton variant="rounded" sx={{ borderRadius: 4 }} width={700} height={60} />
      </div>
    </div>
  )
}

export default BodyLoader
