import RequireAuth from "@/components/auth/require-auth";
import { ProfileView } from "@/components/profile/profile-view";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;
  return (
    <RequireAuth tenant={tenant}>
      <ProfileView tenant={tenant} />
    </RequireAuth>
  );
}
