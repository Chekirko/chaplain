import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const buttonClass =
    "background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5 flex flex-center";

  return (
    <main className="flex min-h-screen items-center justify-center bg-auth-light bg-cover bg-center bg-no-repeat px-4 py-10 dark:bg-auth-dark">
      <section className="light-border background-light800_dark200 shadow-light100_dark100 min-w-full rounded-[10px] border px-4 py-10 shadow-md sm:min-w-[520px] sm:px-8">
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-2.5">
            <h1 className="h2-bold text-dark100_light900 text-center">
              Звернись до адміністратора, щоб отримати дозвіл на доступ і тоді:
            </h1>
          </div>
        </div>

        {children}

        <Button className={buttonClass} asChild>
          <Link href="/sign-in">Спробуй ще раз</Link>
        </Button>
      </section>
    </main>
  );
};

export default AuthLayout;
