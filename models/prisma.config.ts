import path from 'node:path';
import { defineConfig } from 'prisma/config';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const host = process.env.DB_HOST;                    // "db" inside compose
if (host) {
    if (process.env.DATABASE_URL)
        process.env.DATABASE_URL = process.env.DATABASE_URL.replace(/@([^:/]+)/, `@${host}`);
    if (process.env.SHADOW_DATABASE_URL)
        process.env.SHADOW_DATABASE_URL = process.env.SHADOW_DATABASE_URL.replace(/@([^:/]+)/, `@${host}`);
}

export default defineConfig({
    schema: "./prisma/schema.prisma",
});