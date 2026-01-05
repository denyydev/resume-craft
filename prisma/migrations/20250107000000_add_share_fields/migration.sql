-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "shareId" TEXT,
ADD COLUMN     "isShared" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sharedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Resume_shareId_key" ON "Resume"("shareId");

