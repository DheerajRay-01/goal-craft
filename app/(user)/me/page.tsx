import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import UserProfile from "@/components/user/UserProfile";

export default async function MePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?._id) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center px-4">
        <div className="w-full rounded-3xl border bg-card p-10 text-center shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight">
            Unauthorized
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Please sign in to access your profile.
          </p>
        </div>
      </div>
    );
  }


  console.log(session?.user?._id);
  

  // ✅ Fetch from your API
    const res = await fetch(
      `${process.env.BASE_URL}/api/user/me?userId=${session?.user?._id}`,
      { cache: "no-store" }
    );

  const result = await res.json();

  if (!result.success) {
    return <p className="text-center mt-10">Failed to load profile</p>;
  }

  const user = result.data;

  console.log(user);
  

  return (
    <section className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-6 lg:py-10">

        {/* Page Header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight lg:text-4xl">
            My Profile
          </h1>

          <p className="text-sm text-muted-foreground lg:text-base">
            Manage your profile, experiences, and account information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-3xl border bg-card p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] lg:p-6">
          <UserProfile user={user} />
        </div>

      </div>
    </section>
  );
}