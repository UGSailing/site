import { PrismaClient } from './client';

import dotenv from 'dotenv';

dotenv.config()

export const prisma = new PrismaClient();