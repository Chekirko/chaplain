import Image from "next/image";
import Link from "next/link";
import React from "react";

import Theme from "./Theme";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.action";
import { Button } from "@/components/ui/button";
import Logout from "./logout";

const Navbar = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect("/sign-in");
  }
  const user = await getUserById(session?.user?.id);
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image src="/images/site-logo.svg" width={23} height={23} alt="logo" />

        <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Дім<span className="text-primary-500">Милосердя</span>
        </p>
      </Link>
      {user?.role === "admin" && (
        <Button className="base-bold  btn-secondary min-h-[41px] rounded-lg px-4 py-3 shadow-none">
          <Link href="/users" className="primary-text-gradient">
            Нові
          </Link>
        </Button>
      )}

      <div className="flex-between gap-5">
        <Theme />
        {user ? (
          <Logout img={user?.image} />
        ) : (
          // <Avatar>
          //   <AvatarImage src={user?.image} alt="avatar" />
          //   <AvatarFallback>CN</AvatarFallback>
          // </Avatar>
          <Button asChild>
            <Link href="/sign-in">
              <p className="font-bold text-primary-500">Log in</p>
            </Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
