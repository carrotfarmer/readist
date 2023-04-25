import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const bookRouter = createTRPCRouter({
  createBook: protectedProcedure
    .input(
      z.object({
        rlId: z.string(),
        bookName: z.string(),
        bookAuthor: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.book.create({
        data: {
          name: input.bookName,
          author: input.bookAuthor,
          isFinished: false,
          readingListId: input.rlId,
        },
      });
    }),

  getBooks: protectedProcedure
    .input(
      z.object({
        rlId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.book.findMany({
        where: {
          readingListId: input.rlId,
        },
      });
    }),

  deleteBook: protectedProcedure
    .input(
      z.object({
        bookId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.book.delete({
        where: {
          id: input.bookId,
        },
      });
    }),
});
