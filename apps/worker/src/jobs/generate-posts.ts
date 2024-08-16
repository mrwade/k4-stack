import { faker } from "@faker-js/faker";
import { db, genId } from "@repo/db";
import { JobData, JobType } from "@repo/queue";

export const runGeneratePosts = async (
  data: JobData[JobType.GeneratePosts]
) => {
  const { count } = data;

  await db.$transaction(
    Array.from({ length: count }).map(() => {
      const username = faker.internet.userName();
      return db.post.create({
        data: {
          id: genId(),
          content: faker.lorem.paragraph({ min: 1, max: 5 }),
          createdAt: faker.date.recent({ days: 30 }),
          user: {
            connectOrCreate: {
              create: {
                id: genId(),
                name: faker.person.fullName(),
                username,
              },
              where: {
                username,
              },
            },
          },
        },
      });
    })
  );
};
