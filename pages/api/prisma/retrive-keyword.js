import prisma from "lib/prisma";

export default async function handler(req, res) {
  const { keyword } = req.body;
  try {
    const res = await prisma.keywords.findUnique({
      where: {
        name: keyword,
      },
      select: {
        projects: {
          select: {
            name: true,
            studentName: true,
            abstract: true,
            imgURL: true,
            slug: true,
          },
        },
      },
    });

    res.status(200).json(res);
  } catch (e) {
    console.log(e);
  }
}
