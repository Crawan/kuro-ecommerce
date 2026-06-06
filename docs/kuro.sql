CREATE TYPE "Status" AS ENUM (
  'cancelled',
  'pending',
  'success'
);

CREATE TABLE "users" (
  "id" uuid PRIMARY KEY,
  "username" varchar NOT NULL,
  "password" varchar NOT NULL,
  "email" varchar NOT NULL UNIQUE,
  "created_at" timestamp DEFAULT current_timestamp
);

CREATE TABLE "mitra" (
  "id" uuid PRIMARY KEY,
  "name" varchar NOT NULL,
  "description" varchar,
  "created_at" timestamp DEFAULT current_timestamp
);

CREATE TABLE "services_category" (
  "id" integer PRIMARY KEY,
  "name" varchar NOT NULL
);

CREATE TABLE "staff" (
  "id" integer PRIMARY KEY,
  "users_id" uuid NOT NULL,
  "mitra_id" uuid NOT NULL,
  "fullname" varchar NOT NULL,
  "description" varchar
);

CREATE TABLE "service" (
  "id" integer PRIMARY KEY,
  "mitra_id" uuid NOT NULL,
  "service_category_id" integer NOT NULL,
  "name" varchar NOT NULL,
  "description" varchar,
  "lowest_price" decimal(12,2),
  "highest_price" decimal(12,2)
);

CREATE TABLE "review" (
  "id" integer PRIMARY KEY,
  "user_id" uuid NOT NULL,
  "service_id" integer NOT NULL,
  "description" varchar,
  "rate" integer NOT NULL CHECK("rate" >= 0 AND "rate" <= 5),
  "created_at" timestamp DEFAULT current_timestamp
);

CREATE TABLE "rating_summary" (
  "service_id" integer NOT NULL,
  "mitra_id" uuid NOT NULL,
  "total_rating" integer DEFAULT 0,
  "one_star" integer DEFAULT 0,
  "two_star" integer DEFAULT 0,
  "three_star" integer DEFAULT 0,
  "four_star" integer DEFAULT 0,
  "five_star" integer DEFAULT 0
);

CREATE TABLE "schedule" (
  "id" uuid PRIMARY KEY,
  "mitra_id" uuid NOT NULL,
  "staff_id" integer NOT NULL,
  "user_id" uuid NOT NULL,
  "start_date" timestamp DEFAULT current_timestamp,
  "end_date" timestamp DEFAULT current_timestamp,
  "title" varchar NOT NULL,
  "description" varchar
);

CREATE TABLE "history" (
  "id" uuid PRIMARY KEY,
  "status" "Status" NOT NULL,
  "title" varchar NOT NULL,
  "description" varchar,
  "mitra_id" uuid NOT NULL,
  "user_id" uuid NOT NULL,
  "schedule_id" uuid NOT NULL,
  "created_at" timestamp DEFAULT current_timestamp
);

ALTER TABLE "review" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "review" ADD FOREIGN KEY ("service_id") REFERENCES "service" ("id");

ALTER TABLE "rating_summary" ADD FOREIGN KEY ("service_id") REFERENCES "service" ("id");
ALTER TABLE "rating_summary" ADD FOREIGN KEY ("mitra_id") REFERENCES "mitra" ("id");

ALTER TABLE "staff" ADD FOREIGN KEY ("users_id") REFERENCES "users" ("id");
ALTER TABLE "staff" ADD FOREIGN KEY ("mitra_id") REFERENCES "mitra" ("id");

ALTER TABLE "service" ADD FOREIGN KEY ("mitra_id") REFERENCES "mitra" ("id");
ALTER TABLE "service" ADD FOREIGN KEY ("service_category_id") REFERENCES "services_category" ("id");

ALTER TABLE "schedule" ADD FOREIGN KEY ("mitra_id") REFERENCES "mitra" ("id");
ALTER TABLE "schedule" ADD FOREIGN KEY ("staff_id") REFERENCES "staff" ("id");
ALTER TABLE "schedule" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "history" ADD FOREIGN KEY ("mitra_id") REFERENCES "mitra" ("id");
ALTER TABLE "history" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "history" ADD FOREIGN KEY ("schedule_id") REFERENCES "schedule" ("id");
