import { Skeleton } from './Skeleton';

export const Loader = () => {
  return (
    <div className="grid relative w-full px-3 gap-2">
      <Skeleton className="h-30 w-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-32 w-full" />
        <div className="flex justify-between gap-20">
          <Skeleton className="h-8 w-1/3 w-full" />
          <Skeleton className="h-8 w-1/3 w-full" />
        </div>
      </div>
    </div>
  );
};
