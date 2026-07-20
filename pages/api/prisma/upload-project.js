import prisma from "lib/prisma";

export default async function handler(req, res) {
  let { name, studentName, abstract, imgURL, slug, keywordsArray } = req.body;

  try {
    //find project

    await prisma.projects.upsert({
      where: {
        name,
      },
      update: {
        name,
        studentName,
        abstract,
        imgURL,
        slug,
        keywords: {
          connectOrCreate: keywordsArray.map((keyword) => {
            return {
              where: { name: keyword },
              create: { name: keyword },
            };
          }),
        },
      },
      create: {
        name,
        studentName,
        abstract,
        imgURL,
        slug,
        keywords: {
          connectOrCreate: keywordsArray.map((keyword) => {
            return {
              where: { name: keyword },
              create: { name: keyword },
            };
          }),
        },
      },
    });

    res.status(200).json({ message: "Project created successfully" });
  } catch (e) {
    console.log(e);
  }
}
