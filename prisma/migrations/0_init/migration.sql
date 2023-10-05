-- CreateTable
CREATE TABLE "gym" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "description" VARCHAR(255),
    "location" VARCHAR(255),
    "opening_hours" VARCHAR(255),
    "closing_hours" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "gym_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gym_member" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "membership_start_date" TIMESTAMP(6) NOT NULL,
    "membership_end_date" TIMESTAMP(6) NOT NULL,
    "user_id" UUID NOT NULL,
    "gym_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gym_member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gym_trainer" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "experience_years" INTEGER NOT NULL,
    "specialization" VARCHAR(255) NOT NULL,
    "user_id" UUID NOT NULL,
    "gym_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gym_trainer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutritionist" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "experience_years" INTEGER NOT NULL,
    "specialization" VARCHAR(255) NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nutritionist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training_course" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "course_name" VARCHAR(255) NOT NULL,
    "course_duration" INTEGER NOT NULL,
    "course_fee" INTEGER NOT NULL,
    "trainer_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "training_course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "roq_user_id" VARCHAR(255) NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "gym" ADD CONSTRAINT "gym_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gym_member" ADD CONSTRAINT "gym_member_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "gym"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gym_member" ADD CONSTRAINT "gym_member_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gym_trainer" ADD CONSTRAINT "gym_trainer_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "gym"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gym_trainer" ADD CONSTRAINT "gym_trainer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nutritionist" ADD CONSTRAINT "nutritionist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "training_course" ADD CONSTRAINT "training_course_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "gym_trainer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

