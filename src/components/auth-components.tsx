import { signIn, signOut } from "@/lib/auth"

export async function SignIn({ provider }: { provider?: string }) {
    return (
        <form
            action={async () => {
                "use server"
                await signIn(provider)
            }}
        >
            <button className="bg-neutral-700 text-white p-2 rounded-md">
                Sign In with {provider}
            </button>
        </form>
    )
}

export async function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
        >
            <button className="bg-neutral-700 text-white p-2 rounded-md">
                Sign Out
            </button>
        </form>
    )
}