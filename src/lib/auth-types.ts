import 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            roles?: {id: BigInt, name: string}[];
        };
    }
}

export const ROLES: Record<string, BigInt[]> = {
    ADMIN: [
        BigInt("1422686308253302874"), // IT
        BigInt("1424125799056806051"), // Captain
    ],
    MATES: [
        BigInt("1422686308253302874"), // IT
        BigInt("1424125799056806051"), // Captain
        BigInt("1422578278811828264"), // MATES
    ],
    TEAM_MEMBER: [
        BigInt("1422579667914854440"), // CREW
        BigInt("1422578278811828264"), // MATES
        BigInt("1316002102631202866"), // Team Design
        BigInt("1316002716627107921"), // Team Elec
        BigInt("1362492932887805994"), // Team Construction
        BigInt("1399034561475907634"), // Team Energy
        BigInt("1422579129315758130"), // Team Autonomous
        BigInt("1424126937290248302"), // Team Web & ICT
        BigInt("1422686308253302874"), // IT
        BigInt("1424125799056806051"), // Captain
    ],
    SPONSOR: [
        BigInt("1432120129415549162"), // Sponsors
    ],
}