ALTER TABLE "user"
ADD COLUMN IF NOT EXISTS "updated_at" timestamp;

UPDATE "user"
SET "updated_at" = now()
WHERE "updated_at" IS NULL;

ALTER TABLE "user"
ALTER COLUMN "updated_at" SET DEFAULT now();

ALTER TABLE "user"
ALTER COLUMN "updated_at" SET NOT NULL;
