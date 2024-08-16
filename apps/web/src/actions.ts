"use server";

import { enqueue, JobType } from "@repo/queue";
import { revalidatePath } from "next/cache";

export async function generatePosts() {
  await enqueue(JobType.GeneratePosts, { count: 5 });
  console.log("Enqueued job");
  revalidatePath("/");
}
