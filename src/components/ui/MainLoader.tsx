import { Skeleton } from '@mui/material'

export const MainLoader: React.FC = () => {
  return (
    <div>
      <div className="px-12 py-6 items-center flex flex-column justify-between">
        <Skeleton variant="rounded" width={140} height={45} />

        <div className="flex gap-6">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
        </div>
      </div>
      <div className="flex mt-24 flex-col gap-12 items-center justify-center">
        <Skeleton variant="rounded" sx={{ borderRadius: 4 }} width={700} height={60} />
        <Skeleton variant="rounded" sx={{ borderRadius: 4 }} width={700} height={60} />
        <Skeleton variant="rounded" sx={{ borderRadius: 4 }} width={700} height={60} />
        <Skeleton variant="rounded" sx={{ borderRadius: 4 }} width={700} height={60} />
      </div>
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
