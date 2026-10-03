import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { H1, H2 } from "@/components";
import { getUserWithRoles } from "@/lib/auth-helpers";
import { SignOut } from "@/components/auth-components";

export default async function AccountPage() {
    const session = await auth();
    if (!session) redirect("/login?callbackUrl=/account");

    const user = await getUserWithRoles();

    console.log(user);

    return (
        <div className="mx-6 mt-6">
            <H1>Your account</H1>
            <H2>{user.name}</H2>
            <p>{user.email}</p>
            <p>Roles: {user.roles?.map((r) => r.role.name).join(", ") || "none"}</p>

            <SignOut />
        </div>
    );
}