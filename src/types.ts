import type { Book, ReadingList, User } from "@prisma/client";

export type IReadingList = ReadingList & {
  user: User;
  books: Book[];
};
