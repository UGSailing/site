import { A, H1 } from ".";

export function Http401() { // Unauthorised
    return (
        <div className="m-8">
            <H1 className="text-2xl font-bold">Not logged in</H1>
            <p className="mt-2">You need to log in with Discord to view this page.</p>
            <A href="/login" className="mt-4 block underline">Go to login</A>
        </div>
    );
}

export function Http403() { // Forbidden
    return (
        <div className="m-8">
            <H1 className="text-2xl font-bold">No access</H1>
            <p className="mt-2">
                Your account doesn&apos;t have the required roles for this page.
            </p>
            <p className="mt-2">
                If you think this is a mistake, ask in Discord to get the role assigned,
                then log out and back in — roles only sync at login.
            </p>
            <A href="/" className="mt-4 block underline">Back to the site</A>
        </div>
    );
}