import { auth } from "@/auth";
import NewUser from "@/components/NewUser";
import { IUser } from "@/database/user.model";
import { getUserById, getUsers } from "@/lib/actions/user.action";
import { parseStringify } from "@/lib/utils";

import { redirect } from "next/navigation";

import React from "react";

const Users = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    redirect("/sign-in");
  }
  const user = await getUserById(session?.user?.id);
  if (user.role !== "admin") return redirect("/");

  const { users: newUsers } = await getUsers();
  const parsedUsers = parseStringify(newUsers);
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      {newUsers &&
        parsedUsers.map((user: IUser) => (
          <NewUser
            key={JSON.stringify(user._id)}
            id={JSON.stringify(user._id)}
            email={user.email}
          />
        ))}
    </div>
  );
};

export default Users;
