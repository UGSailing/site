-- CreateTable
CREATE TABLE "positions" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "positions_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "boardmembers" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "board_id" BIGINT NOT NULL,

    CONSTRAINT "boardmembers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boardmember_position" (
    "id" SERIAL NOT NULL,
    "boardmember_id" BIGINT NOT NULL,
    "position_id" TEXT NOT NULL,

    CONSTRAINT "boardmember_position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boards" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id" BIGSERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "htmlid" TEXT NOT NULL,

    CONSTRAINT "boards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "positions_name_key" ON "positions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "boardmember_position_boardmember_id_position_id_key" ON "boardmember_position"("boardmember_id", "position_id");

-- CreateIndex
CREATE UNIQUE INDEX "boards_year_key" ON "boards"("year");

-- AddForeignKey
ALTER TABLE "boardmembers" ADD CONSTRAINT "boardmembers_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boardmember_position" ADD CONSTRAINT "boardmember_position_boardmember_id_fkey" FOREIGN KEY ("boardmember_id") REFERENCES "boardmembers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boardmember_position" ADD CONSTRAINT "boardmember_position_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "positions"("name") ON DELETE CASCADE ON UPDATE CASCADE;
