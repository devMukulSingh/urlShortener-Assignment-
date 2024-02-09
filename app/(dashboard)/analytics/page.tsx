import { DataTable } from '@/components/ui/DataTable';
import { columns } from "@/components/ui/Columns";
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { getTokenDataInPage } from '@/actions/getTokenDataInPage';
import { BASE_URL } from '@/lib/constants';
import {format} from "date-fns";

const AnalyticsPage = async () => {

  const { id: userId } = getTokenDataInPage();

  const urls = await prisma.url.findMany({
    where: {
      userId,
    }
  });

  const formattedUrls = urls.map(url => (
    {
      ...url,
      shortenedUrl: `${BASE_URL}/${url.nanoId}`,
      createdAt: format(url.createdAt, "dd-MM-yyyy")
    }
  ));


  return (
    <main className='flex flex-col gap-10 p-5 lg:p-15 md:p-10'>
      <header>
        <h1 className='text-2xl font-semibold space-x-3'>Dashboard</h1>
        <h1>Manage Preferences</h1>
      </header>
      <DataTable
        columns={columns}
        data={formattedUrls}
      />
    </main>
  )
}

export default AnalyticsPage