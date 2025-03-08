import { ArticleSources } from '@/app/utils/constants';

type Props = {
  sources: string[];
  handleSourceChange: (source: string) => void;
};
export const Sources = ({ sources, handleSourceChange }: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      {ArticleSources.map((source, ind) => (
        <div key={ind} className="flex items-center gap-1">
          <input
            type="checkbox"
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            onChange={() => handleSourceChange(source)}
            checked={sources.includes(source)}
          />
          <p className="text-sm">{source}</p>
        </div>
      ))}
    </div>
  );
};
