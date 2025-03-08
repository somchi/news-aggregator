export const Skeleton = ({ className }: { className: string }) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-100 dark:bg-slate-200 ${className}`}
    />
  );
};
