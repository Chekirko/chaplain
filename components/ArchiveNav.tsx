"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  // TableBody,
  TableCaption,
  TableCell,
  // TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MONTH_NAMES } from "@/constants";
import { IJourney } from "@/database/journey.model";
import { GroupedData } from "@/lib/actions/general.action";
import { parseStringify } from "@/lib/utils";

interface ArchiveNavProps {
  data: GroupedData;
}

export function ArchiveNav({ data }: ArchiveNavProps) {
  const sortedYears = Object.keys(data)
    .map((year) => parseInt(year, 10))
    .sort((a, b) => b - a);

  return (
    <Accordion type="multiple" className="w-full">
      {sortedYears.map((year) => {
        if (isNaN(year)) {
          console.error(`Invalid year key: ${year}`);
          return null;
        }

        const months = Object.keys(data[year])
          .map((month) => parseInt(month, 10))
          .sort((a, b) => a - b);

        return (
          <AccordionItem key={year} value={year.toString()}>
            <AccordionTrigger>{year}</AccordionTrigger>
            <AccordionContent>
              <Accordion type="multiple" className="pl-5">
                {months.map((month) => {
                  if (isNaN(month) || month < 1 || month > 12) {
                    console.error(`Invalid month value: ${month}`);
                    return null;
                  }

                  const journeys = data[year][month];

                  return (
                    <AccordionItem key={month} value={`${year}-${month}`}>
                      <AccordionTrigger>
                        {MONTH_NAMES[month - 1]}
                      </AccordionTrigger>
                      <AccordionContent>
                        <Table>
                          <TableCaption>Список поїздок</TableCaption>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[100px] p-4">
                                Виїзд
                              </TableHead>
                              <TableHead className="p-4">Приїзд</TableHead>
                              <TableHead className="p-4">Статус</TableHead>
                              <TableHead className="text-center p-4">
                                Церква
                              </TableHead>
                              <TableHead className="p-4">Напрямок</TableHead>

                              <TableHead className="text-right p-4">
                                Відповідальний
                              </TableHead>
                              <TableHead className="p-4">Телефон</TableHead>
                              <TableHead className="p-4">
                                Учасники команди
                              </TableHead>
                              <TableHead className="p-4">Коментар</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {journeys.map((journey: IJourney) => (
                              <TableRow
                                key={parseStringify(journey._id)}
                                className="py-1"
                              >
                                <TableCell className="font-medium">
                                  {journey.start.toLocaleString()}
                                </TableCell>
                                <TableCell className="font-medium">
                                  {journey.finish.toLocaleString()}
                                </TableCell>
                                <TableCell className="font-medium">
                                  {journey.status}
                                </TableCell>
                                <TableCell className="font-medium">
                                  {journey.church}
                                </TableCell>
                                <TableCell className="font-medium">
                                  {journey.vector}
                                </TableCell>
                                <TableCell className="font-medium">
                                  {journey.chief}
                                </TableCell>
                                <TableCell className="font-medium">
                                  {journey.chiefPhone}
                                </TableCell>
                                <TableCell className="font-medium">
                                  {journey.members}
                                </TableCell>
                                <TableCell className="font-medium">
                                  {journey.comment}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>

                        <div className="pl-5"></div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
