"use client";

import { updateUserToEditor } from "@/lib/actions/user.action";
import { Button } from "./ui/button";

interface Props {
  id: string;
  email: string;
}

const NewUser = ({ id, email }: Props) => {
  const handleClick = async () => {
    console.log(id);
    await updateUserToEditor(id);
  };
  return (
    <div className="flex flex-between">
      <p>{email}</p> <Button onClick={handleClick}>Прийняти</Button>
    </div>
  );
};

export default NewUser;
