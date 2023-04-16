-- CreateTable
CREATE TABLE "constellation" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "constellation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "star" (
    "id" SERIAL NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "z" DOUBLE PRECISION NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "officialName" VARCHAR,
    "hd" INTEGER,
    "hr" INTEGER,
    "colorIndex" REAL,
    "magnitude" REAL NOT NULL,
    "r" REAL NOT NULL,
    "g" REAL NOT NULL,
    "b" REAL NOT NULL,
    "constellationId" INTEGER,

    CONSTRAINT "stars_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "star" ADD CONSTRAINT "star_constellationId_fkey" FOREIGN KEY ("constellationId") REFERENCES "constellation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
