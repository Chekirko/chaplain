import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
import { fetchGroupedData } from "@/lib/actions/general.action";
import { parseStringify } from "@/lib/utils";
import { ArchiveNav } from "@/components/ArchiveNav";

export default async function Home() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    redirect("/sign-in");
  }

  const data = await fetchGroupedData();
  const normalizedData = parseStringify(data);
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Всі поїздки</h1>

        <Link href="/new" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Додати поїздку
          </Button>
        </Link>
      </div>
      <ArchiveNav data={normalizedData} />
    </>
  );
}
