-- CreateTable
CREATE TABLE "star" (
    "id" SERIAL NOT NULL,
    "x" DECIMAL NOT NULL,
    "y" DECIMAL NOT NULL,
    "z" DECIMAL NOT NULL,
    "distance" DECIMAL NOT NULL,
    "officialName" VARCHAR,
    "hd" INTEGER,
    "hr" INTEGER,
    "colorIndex" DECIMAL,
    "magnitude" DECIMAL,

    CONSTRAINT "stars_pkey" PRIMARY KEY ("id")
);
