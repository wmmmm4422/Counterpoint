import prisma from "lib/prisma";

export default async function handler(req, res) {
  let { name } = req.body;

  try {
    const res = await prisma.projects.findUnique({
      where: {
        name,
      },
    });

    res.status(200).json(res);
  } catch (e) {
    console.log(e);
  }
}
