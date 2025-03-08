import { Loader } from './Loader';

export const ArticleLoader = () => {
  return (
    <div className="flex flex-wrap w-full gap-4">
      <div className="w-72">
        <Loader />
      </div>
      <div className="w-72">
        <Loader />
      </div>
      <div className="w-72">
        <Loader />
      </div>
      <div className="w-72">
        <Loader />
      </div>
    </div>
  );
};
