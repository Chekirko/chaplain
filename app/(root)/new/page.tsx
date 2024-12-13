import { auth } from "@/auth";
import JourneyForm from "@/components/forms/JourneyForm";
import { redirect } from "next/navigation";

const AddJourney = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect("/sign-in");
  }

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Додай поїздку</h1>
      <div className="mt-9">
        <JourneyForm type="create" userId={session?.user?.id} />
      </div>
    </>
  );
};

export default AddJourney;
