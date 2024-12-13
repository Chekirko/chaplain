"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { IJourney } from "@/database/journey.model";
import { AddJourneySchema } from "@/lib/validations";
import { createJourney, editJourney } from "@/lib/actions/journey.action";

import { StatusChanger } from "../StatusChanger";
import { Button } from "../ui/button";
import { DatePicker } from "../ui/datepicker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";

interface JourneyFormProps {
  userId: string;
  journeyId?: string;
  type: "create" | "edit" | "changeStatus";
  existingJourney?: IJourney;
}

const JourneyForm = ({
  userId,
  type,
  existingJourney,
  journeyId,
}: JourneyFormProps) => {
  const {
    start,
    finish,
    church,
    vector,
    chief,
    chiefPhone,
    members,
    status,
    comment,
  } = existingJourney || {};

  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof AddJourneySchema>>({
    resolver: zodResolver(AddJourneySchema),
    defaultValues: {
      start: start ? new Date(start) : new Date(),
      finish: finish ? new Date(finish) : new Date(),
      vector: vector || "",
      church: church || "",
      chief: chief || "",
      chiefPhone: chiefPhone || "",
      members: members || "",
      comment: comment || "",
      status: status || "planned",
    },
  });

  const handleAddJourney = async (data: z.infer<typeof AddJourneySchema>) => {
    setIsSubmitting(true);

    try {
      if (type === "create") {
        await createJourney({ author: userId, data: data });

        router.push("/");
      } else {
        if (!journeyId) {
          throw new Error("Journey not found");
        }
        if (userId !== existingJourney?.author.toString()) {
          throw new Error("You are not authorized to edit this journey");
        }
        await editJourney({
          id: journeyId,
          data: {
            ...data,
          },
          path: "/",
        });

        router.push("/");
      }
    } catch (error) {
      console.error("Помилка при обробці форми:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const dateHandler = (date: Date, field: "finish" | "start") => {
    if (date) {
      form.setValue(field, date);
    }
  };

  const statusHandler = (
    status: "planned" | "progress" | "finished" | "cancelled"
  ) => {
    if (status) {
      form.setValue("status", status);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handleAddJourney)}
      >
        <Separator className="h-1 rounded-full" />
        <h2 className="h2-bold text-primary-500 dark:text-primary-100">
          Деталі поїздки
        </h2>
        <FormField
          control={form.control}
          name="church"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Церква (або команда) <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Вкажи церкву або команду, яка відправляється
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vector"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Напрямок поїздки
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Тут має бути вказано напрямок (або область), куди здійснюється
                поїздка
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="chief"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Відповідальний <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Ім&apos;я та прізвище відповідального за поїздку
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="chiefPhone"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Телефон <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Вказати номер телефону відповідального
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="members"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Учасники поїздки та їх кількість{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Вкажи кількість учасників поїздки та їх імена
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Коментар
              </FormLabel>
              <FormControl>
                <Textarea
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Тут можна вказати мету поїздки, окремі деталі або додати
                коментар
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="start"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Дата відправлення <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <DatePicker
                  dateHandler={dateHandler}
                  existingDate={form.getValues("start")}
                  field="start"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Вказати, коли планується виїзд
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {type !== "create" && (
          <FormField
            control={form.control}
            name="status"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Поточний статус поїздки
                  <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <StatusChanger
                    statusHandler={statusHandler}
                    status={form.getValues("status")}
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  В якому статусі зараз
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="finish"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Дата повернення
              </FormLabel>
              <FormControl>
                <DatePicker
                  dateHandler={dateHandler}
                  existingDate={form.getValues("finish")}
                  field="finish"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Вказати, коли планується повернення (за можливості)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-16 flex justify-end">
          <Button
            type="submit"
            className="primary-gradient w-fit !text-light-900"
          >
            {isSubmitting ? (
              <>{type === "edit" ? "Змінюю..." : "Додаю..."}</>
            ) : (
              <>{type === "edit" ? "Змінити" : "Додати"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default JourneyForm;
