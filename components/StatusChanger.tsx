"use client";

import * as React from "react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Status = {
  value: "progress" | "finished" | "cancelled" | "planned";
  label: string;
};

const statuses: Status[] = [
  {
    value: "progress",
    label: "В процесі",
  },
  {
    value: "finished",
    label: "Завершено",
  },
  {
    value: "cancelled",
    label: "Відмінено",
  },
  {
    value: "planned",
    label: "Планується",
  },
];

interface StatusChangerProps {
  status: "progress" | "finished" | "cancelled" | "planned";
  statusHandler: (
    status: "progress" | "finished" | "cancelled" | "planned"
  ) => void;
}

export function StatusChanger({ status, statusHandler }: StatusChangerProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    statuses.find((s) => s.value === status) || null
  );

  useEffect(() => {
    setSelectedStatus(statuses.find((s) => s.value === status) || null);
  }, [status]);

  const handleSelect = (value: string) => {
    const newStatus = statuses.find((s) => s.value === value) || null;
    setSelectedStatus(newStatus);
    if (newStatus) {
      statusHandler(newStatus.value);
    }
    setOpen(false);
  };

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={handleSelect}
                  >
                    {status.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
