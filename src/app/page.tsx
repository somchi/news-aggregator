import { SearchInput } from '@/_components/Search';
import { todaysDate } from './utils/helper';
import { Articles } from '@/_components/Articles';
import { SearchParams } from './utils/types';
import { Filter } from '@/_components/Filter';
import { Sidebar } from '@/_components/Sidebar';
import { Header } from '@/_components/Header';

export default async function Home(props: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;

  return (
    <main className="flex flex-col flex-col w-full min-h-screen bg-[#f9f8f8]">
      <Header />
      <div className="flex flex-col gap-8 p-4 md:p-10 relative">
        <div className="w-full md:w-2/3">
          <SearchInput searchParams={searchParams} />
          <div className="flex justify-between items-center">
            <div className="grid gap-1 my-4">
              <h1 className="text-2xl">News Articles</h1>
              <h2 className="text-md text-gray-500">{todaysDate()}</h2>
            </div>
            <Filter />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-full md:w-4/6 rounded-xl shadow min-h-screen px-6 bg- py-6">
            <h3 className="text-xl">Stories for you </h3>
            <div className="w-full h-[1px] bg-gray-400 my-2"></div>
            <Articles searchParams={searchParams} />
          </div>
          <Sidebar />
        </div>
      </div>
    </main>
  );
}
