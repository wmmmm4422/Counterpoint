const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const projects = [
  {
    name: "Echoes of the Commons",
    studentName: "Maya Chen",
    abstract: "An interactive sound map that turns shared memories into a living public archive.",
    imgURL: "events/Hypertext_Jump.png",
    slug: "demo-echoes-of-the-commons",
    keywords: ["Collective Memory", "Sound", "Public Space"],
  },
  {
    name: "Soft Systems",
    studentName: "Leo Park",
    abstract: "A tactile installation exploring how care, maintenance, and technology shape everyday life.",
    imgURL: "events/Runway.png",
    slug: "demo-soft-systems",
    keywords: ["Care", "Technology", "Materiality"],
  },
  {
    name: "Tidal Memory",
    studentName: "Amina Rahman",
    abstract: "A visual essay about coastal change, inherited stories, and the rhythm of disappearing places.",
    imgURL: "events/Instagram.png",
    slug: "demo-tidal-memory",
    keywords: ["Climate", "Collective Memory", "Visual Essay"],
  },
  {
    name: "The Listening Room",
    studentName: "Noah Williams",
    abstract: "A participatory room where visitors compose a temporary landscape through listening and movement.",
    imgURL: "events/Hypertext_Jump.png",
    slug: "demo-the-listening-room",
    keywords: ["Sound", "Participation", "Public Space"],
  },
  {
    name: "Unstable Ground",
    studentName: "Sofia Martinez",
    abstract: "An atlas of small disruptions that reveals how infrastructures quietly organize our choices.",
    imgURL: "events/Runway.png",
    slug: "demo-unstable-ground",
    keywords: ["Infrastructure", "Systems", "Climate"],
  },
  {
    name: "Visible Signals",
    studentName: "Eli Turner",
    abstract: "A generative identity system that makes invisible exchanges between people and places visible.",
    imgURL: "events/Instagram.png",
    slug: "demo-visible-signals",
    keywords: ["Systems", "Identity", "Participation"],
  },
];

const events = [
  {
    name: "Hypertext Jump!: Co-constructing Rhizomatic Narrative",
    studentName: "Jeanyoon Choi",
    date: "2023-06-30T16:10:00.000Z",
    endDate: "2023-06-30T16:30:00.000Z",
    description: "Jump hypertextually from word to word and co-construct a rhizomatic artwork.",
    imgURL: "events/Hypertext_Jump.png",
    slug: "jeanyoon-choi",
  },
  {
    name: "Building Third Runways: Challenging Equality (=)",
    studentName: "Jeanyoon Choi",
    date: "2023-06-30T16:30:00.000Z",
    endDate: "2023-06-30T16:50:00.000Z",
    description: "Co-create an imaginary land installation of runways around the world's airports.",
    imgURL: "events/Runway.png",
    slug: "jeanyoon-choi",
  },
  {
    name: "In-In-In-In-Instagram",
    studentName: "Jeanyoon Choi",
    date: "2023-06-30T16:00:00.000Z",
    endDate: "2023-06-30T16:10:00.000Z",
    description: "An Instagram live-in-Instagram performance that loops a social image through itself.",
    imgURL: "events/Instagram.png",
    slug: "jeanyoon-choi",
  },
  {
    name: "Shared Frequencies",
    studentName: "Counterpoint Ensemble",
    date: "2023-07-01T14:00:00.000Z",
    endDate: "2023-07-01T14:30:00.000Z",
    description: "A live generative composition built from audience movement and ambient sound.",
    imgURL: "events/Hypertext_Jump.png",
    slug: "counterpoint-ensemble",
  },
  {
    name: "Closing Signals",
    studentName: "Counterpoint Ensemble",
    date: "2023-07-02T15:30:00.000Z",
    endDate: "2023-07-02T16:00:00.000Z",
    description: "A closing performance connecting the exhibition's projects through sound and light.",
    imgURL: "events/Runway.png",
    slug: "counterpoint-ensemble",
  },
];

async function seedProjects() {
  for (const project of projects) {
    const { keywords, ...projectData } = project;

    await prisma.projects.upsert({
      where: { name: project.name },
      update: {
        ...projectData,
        keywords: {
          set: [],
          connectOrCreate: keywords.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
      create: {
        ...projectData,
        keywords: {
          connectOrCreate: keywords.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
    });
  }
}

async function seedEvents() {
  for (const event of events) {
    await prisma.events.upsert({
      where: { name: event.name },
      update: event,
      create: event,
    });
  }
}

async function main() {
  await seedProjects();
  await seedEvents();
  console.log(`Seeded ${projects.length} projects and ${events.length} events.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
