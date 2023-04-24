import { createTRPCRouter } from "~/server/api/trpc";

import { readingListRouter } from "~/server/api/routers/readingList";
import { bookRouter } from "./routers/book";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  readingList: readingListRouter,
  book: bookRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
