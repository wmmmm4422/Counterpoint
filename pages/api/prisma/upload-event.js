import prisma from "lib/prisma";

export default async function handler(req, res) {
  let { name, studentName, date, endDate, description, imgURL, slug } = req.body;

  try {
    //find project
    console.log(req.body);
    await prisma.events.upsert({
      where: {
        name,
      },
      update: {
        name,
        studentName,
        description,
        date,
        endDate,
        imgURL,
        slug,
      },
      create: {
        name,
        studentName,
        description,
        imgURL,
        date,
        endDate,
        slug,
      },
    });

    res.status(200).json({ message: "Project created successfully" });
  } catch (e) {
    console.log(e);
  }
}
