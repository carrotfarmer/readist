import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const readingListRouter = createTRPCRouter({
  createReadingList: protectedProcedure
  .input(
    z.object({
      name: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    return await ctx.prisma.readingList.create({
      data: {
        name: input.name,
        books: {
          create: {
            name: "Harry Potter and The Philosopher\'s Stone",
            author: "JK Rowling",
            isFinished: false,
          }
        }, 
        user: {
          connect: {
            id: ctx.session.user.id 
          } 
        }
      },
      include: {
        books: true,
        user: true,
      }
    })
  })
});
