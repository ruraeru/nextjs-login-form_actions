/*
  Warnings:

  - Added the required column `likeTweetId` to the `Response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likeUserId` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Response" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "payload" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "tweetId" INTEGER NOT NULL,
    "likeTweetId" INTEGER NOT NULL,
    "likeUserId" INTEGER NOT NULL,
    CONSTRAINT "Response_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Response_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Response_likeTweetId_likeUserId_fkey" FOREIGN KEY ("likeTweetId", "likeUserId") REFERENCES "Like" ("tweetId", "userId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Response" ("created_at", "id", "payload", "tweetId", "updated_at", "userId") SELECT "created_at", "id", "payload", "tweetId", "updated_at", "userId" FROM "Response";
DROP TABLE "Response";
ALTER TABLE "new_Response" RENAME TO "Response";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
