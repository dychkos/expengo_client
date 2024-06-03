import { Skeleton } from '@mui/material'
import BodyLoader from './BodyLoader'
import React from "react";

const MainLoader: React.FC = () => {
  return (
    <div>
      {/*  Header */}
      <div className="px-12 py-6 items-center flex flex-column justify-between">
        <Skeleton variant="rounded" width={140} height={45} />

        <div className="flex gap-6">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
        </div>
      </div>

      {/*  Body */}
      <BodyLoader className="mt-24"/>

      {/*  NavBar */}
      <div>
        <Skeleton
          animation="wave"
          className="mx-auto mt-24"
          variant="rounded"
          sx={{ borderRadius: 8 }}
          width={300}
          height={70}
        />
      </div>
    </div>
  )
}

export default MainLoader
