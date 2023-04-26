import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  isRlPartOfUser: protectedProcedure
    .input(z.object({ rlId: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
        include: {
          readingLists: true,
        },
      });

      const userRl = user?.readingLists.filter((rl) => rl.id === input.rlId);

      if (userRl && userRl.length > 0) {
        return true;
      } else {
        return false;
      }
    }),
});
