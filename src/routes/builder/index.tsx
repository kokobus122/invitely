import InvitelyBuilder from "#/components/InvitelyBuilder";
import { getCurrentUserCard } from "#/lib/card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/builder/")({
  component: RouteComponent,
  loader: async () => {
    return await getCurrentUserCard();
  },
});

function RouteComponent() {
  const initialUserCard = Route.useLoaderData();
  return (
    <>
      <InvitelyBuilder initialUserCard={initialUserCard} />
    </>
  );
}
