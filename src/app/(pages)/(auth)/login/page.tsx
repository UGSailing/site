import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { SignIn } from "@/components/auth-components";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to UGent Sailing",
}

const SignInPage = async () => {
    const session = await auth();

    if (session) redirect("/account")
    return (
        <div className="mt-5 font-sans items-center justify-items-center min-h-screen px-6">
            <main className="w-full flex flex-col gap-[32px] row-start-1 items-center sm:items-start">
                <section>
                    <div className="text-center">
                        <SignIn provider="discord" />
                    </div>
                </section>
            </main>
        </div>
    )
};

export default SignInPage;