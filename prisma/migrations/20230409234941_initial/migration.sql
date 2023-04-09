-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MEMBER');

-- CreateTable
CREATE TABLE "estate_statuses" (
    "id" TEXT NOT NULL,
    "estate_status_name" TEXT NOT NULL,

    CONSTRAINT "estate_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estate_types" (
    "id" TEXT NOT NULL,
    "estate_type_name" TEXT NOT NULL,

    CONSTRAINT "estate_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estate_images" (
    "id" TEXT NOT NULL,
    "estate_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "estate_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',
    "email" VARCHAR(100) NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estates" (
    "id" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "estate_description" VARCHAR(1000) NOT NULL,
    "estate_name" VARCHAR(100) NOT NULL,
    "street_number" INTEGER NOT NULL,
    "city_name" VARCHAR(64) NOT NULL,
    "zip_code" VARCHAR(10) NOT NULL,
    "neighborhood_name" VARCHAR(64) NOT NULL,
    "street_name" VARCHAR(100) NOT NULL,
    "garages_number" INTEGER NOT NULL,
    "bedrooms_number" INTEGER NOT NULL,
    "bathrooms_number" INTEGER NOT NULL,
    "estate_status_id" TEXT NOT NULL,
    "estate_type_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "estates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "estate_images" ADD CONSTRAINT "estate_images_estate_id_fkey" FOREIGN KEY ("estate_id") REFERENCES "estates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estates" ADD CONSTRAINT "estates_estate_status_id_fkey" FOREIGN KEY ("estate_status_id") REFERENCES "estate_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estates" ADD CONSTRAINT "estates_estate_type_id_fkey" FOREIGN KEY ("estate_type_id") REFERENCES "estate_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
