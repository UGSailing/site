import 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            roles?: {id: bigint, name: string}[];
        };
    }
}

export const ROLES: Record<string, bigint[]> = {
    ADMIN: [
        BigInt("1424126937290248302"), // Web
        BigInt("1424125799056806051"), // Captain
    ],
    TEAM: [
        BigInt("1424126937290248302"), // Web
        BigInt("1424125799056806051"), // Captain
        BigInt("1422579667914854440"), // Team
    ],
    PARTNER: [
        BigInt("1442468154034094221"), // Partner
    ],
}