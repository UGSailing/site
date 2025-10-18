import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { SignIn, SignOut } from "@/components/auth-components";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to UGent Sailing",
}

const Timeline = async () => {
    const session = await auth();
    return (
        <div className="mt-5 font-sans items-center justify-items-center min-h-screen px-6">
            <main className="w-full flex flex-col gap-[32px] row-start-1 items-center sm:items-start">
                <section>
                    {!session ? (
                        <div className="text-center">
                            <SignIn provider="github" />
                            <SignIn provider="discord" />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="text-center">
                                <p className="text-gray-300">Signed in as:</p>
                                <p className="text-white">{session.user?.email}</p>
                            </div>

                            <div className="text-center">
                                <p className="text-gray-300">Data fetched from DB with Prisma:</p>
                            </div>

                            <div className="bg-neutral-900 rounded p-3">
                                <pre className="text-xs text-gray-300">
                                    {JSON.stringify(session.user, null, 2)}
                                </pre>
                            </div>

                            <div className="text-center">
                                <SignOut />
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    )
};

export default Timeline;