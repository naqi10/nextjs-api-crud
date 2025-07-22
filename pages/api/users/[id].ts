// pages/api/users/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from './lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') return res.status(400).json({ error: 'Invalid ID' });

  if (req.method === 'GET') {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json(user);
  }

  if (req.method === 'PUT') {
    const { name, email } = req.body;
    const updated = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email },
    });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    await prisma.user.delete({ where: { id: Number(id) } });
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
