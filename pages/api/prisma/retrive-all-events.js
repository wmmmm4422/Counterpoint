import prisma from "lib/prisma";

export default async function handler(req, res) {
  try {
    const result = await prisma.events.findMany();

    res.status(200).json(result);
  } catch (e) {
    console.log(e);
  }
}
