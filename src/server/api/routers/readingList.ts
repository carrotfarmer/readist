import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

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
              name: "Harry Potter and The Philosopher's Stone",
              author: "JK Rowling",
              isFinished: false,
            },
          },
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
        include: {
          books: true,
          user: true,
        },
      });
    }),

  getReadingLists: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.readingList.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        user: true,
        books: true,
      },
    });
  }),

  getReadingList: protectedProcedure
    .input(
      z.object({
        rlId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.readingList.findUnique({
        where: {
          id: input.rlId,
        },
        include: {
          user: true,
          books: true,
        },
      });
    }),

  deleteReadingList: protectedProcedure
    .input(
      z.object({
        readingListId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.readingList.delete({
        where: {
          id: input.readingListId,
        },
      });
    }),

  editReadingListName: protectedProcedure
    .input(
      z.object({
        readingListId: z.string(),
        newName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.readingList.update({
        where: {
          id: input.readingListId,
        },
        data: {
          name: input.newName,
        },
        include: {
          user: true,
          books: true,
        },
      });
    }),

  isDbRlEmpty: protectedProcedure.query(async ({ ctx }) => {
    const dbUser = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        readingLists: true,
      },
    });

    if (dbUser!.readingLists.length > 0) {
      return false;
    } else {
      return true;
    }
  }),
});
