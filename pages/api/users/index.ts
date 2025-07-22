// pages/api/users/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from './lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  }

  if (req.method === 'POST') {
    const { name, email } = req.body;
    try {
      const user = await prisma.user.create({
        data: { name, email },
      });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: 'Email must be unique' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
