CREATE DATABASE "Memberships"

CREATE TABLE "Gyms" (
  "id" UUID DEFAULT GEN_RANDOM_UUID() UNIQUE PRIMARY KEY NOT NULL,
  "name" VARCHAR(500) NOT NULL CHECK(LENGTH(TRIM("name")) > 0),
  "slogan" VARCHAR(500) CHECK(LENGTH(TRIM("slogan")) > 0),
  "nit" TEXT UNIQUE,
  "type" VARCHAR(500) NOT NULL CHECK(LENGTH(TRIM("type")) > 0),
  "adress" TEXT NOT NULL CHECK(LENGTH(TRIM("adress")) > 0),
  "phone" TEXT UNIQUE NOT NULL CHECK(LENGTH(TRIM("phone")) > 0),
  "email" TEXT UNIQUE NOT NULL CHECK(LENGTH(TRIM("email")) > 0),
  "foundedIn" DATE NOT NULL DEFAULT (NOW()),
  "status" TEXT NOT NULL DEFAULT 'Created' CHECK(LENGTH(TRIM("status")) > 0),
  "isActive" BOOL NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT (NOW()),
  "createdBy" TEXT NOT NULL DEFAULT 'System',
  "updatedAt" TIMESTAMP NULL,
  "updatedBy" TEXT NULL,
  
  CONSTRAINT "CK_Gyms_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_Gyms_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_Gyms_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_Gyms_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

CREATE TABLE "Networks" (
  "id" UUID DEFAULT GEN_RANDOM_UUID() UNIQUE PRIMARY KEY NOT NULL,
  "gymId" UUID NOT NULL,
  "name" VARCHAR(500) NOT NULL CHECK(LENGTH(TRIM("name")) > 0),
  "description" TEXT NULL,
  "label" VARCHAR(500) NOT NULL CHECK(LENGTH(TRIM("label")) > 0),
  "profile" TEXT NOT NULL CHECK(LENGTH(TRIM("profile")) > 0),
  "link" TEXT NOT NULL CHECK(LENGTH(TRIM("link")) > 0),
  "status" TEXT NOT NULL DEFAULT 'Created' CHECK(LENGTH(TRIM("status")) > 0),
  "isActive" BOOL NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT (NOW()),
  "createdBy" TEXT NOT NULL DEFAULT 'System',
  "updatedAt" TIMESTAMP NULL,
  "updatedBy" TEXT NULL,
  
  CONSTRAINT "CK_Networks_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_Networks_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_Networks_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_Networks_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

CREATE TABLE "Branches" (
  "id" UUID DEFAULT GEN_RANDOM_UUID() UNIQUE PRIMARY KEY NOT NULL,
  "gymId" UUID NOT NULL,
  "name" VARCHAR(500) NOT NULL CHECK(LENGTH(TRIM("name")) > 0),
  "description" TEXT NULL,
  "location" TEXT NOT NULL CHECK(LENGTH(TRIM("location")) > 0),
  "status" TEXT NOT NULL DEFAULT 'Created' CHECK(LENGTH(TRIM("status")) > 0),
  "isActive" BOOL NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT (NOW()),
  "createdBy" TEXT NOT NULL DEFAULT 'System',
  "updatedAt" TIMESTAMP NULL,
  "updatedBy" TEXT NULL,

  CONSTRAINT "CK_Branches_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_Branches_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_Branches_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_Branches_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

CREATE TABLE "Schedules" (
  "id" UUID DEFAULT GEN_RANDOM_UUID() UNIQUE PRIMARY KEY NOT NULL,
  "branchId" UUID NOT NULL,
  "type" VARCHAR(500) NOT NULL CHECK(LENGTH(TRIM("type")) > 0),
  "description" TEXT NULL,
  "day" VARCHAR(500) NOT NULL CHECK(LENGTH(TRIM("day")) > 0),
  "startTime" TIME NOT NULL,
  "endTime" TIME NOT NULL,
  "isRecurrent" BOOL NOT NULL DEFAULT true,
  "isAppliesOnHolidays" BOOL NOT NULL DEFAULT true,
  "status" TEXT NOT NULL DEFAULT 'Created' CHECK(LENGTH(TRIM("status")) > 0),
  "isActive" BOOL NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT (NOW()),
  "createdBy" TEXT NOT NULL DEFAULT 'System',
  "updatedAt" TIMESTAMP NULL,
  "updatedBy" TEXT NULL,

  CONSTRAINT "CK_Schedules_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_Schedules_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_Schedules_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_Schedules_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

CREATE TABLE "Plans" (
  "id" UUID DEFAULT GEN_RANDOM_UUID() UNIQUE PRIMARY KEY NOT NULL,
  "gymId" UUID NOT NULL,
  "name" VARCHAR(500) NOT NULL CHECK(LENGTH(TRIM("name")) > 0),
  "description" TEXT NULL,
  "type" VARCHAR(500) NOT NULL CHECK(LENGTH(TRIM("type")) > 0),
  "price" decimal(10,2) NOT NULL DEFAULT 0,
  "ability" int NOT NULL DEFAULT 1,
  "status" TEXT NOT NULL DEFAULT 'Created' CHECK(LENGTH(TRIM("status")) > 0),
  "isActive" BOOL NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT (NOW()),
  "createdBy" TEXT NOT NULL DEFAULT 'System',
  "updatedAt" TIMESTAMP NULL,
  "updatedBy" TEXT NULL,

  CONSTRAINT "CK_Plans_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_Plans_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_Plans_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_Plans_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

CREATE TABLE "Benefits" (
  "id" UUID DEFAULT GEN_RANDOM_UUID() UNIQUE PRIMARY KEY NOT NULL,
  "gymId" UUID NOT NULL,
  "name" VARCHAR(500) NOT NULL CHECK(LENGTH(TRIM("name")) > 0),
  "description" TEXT NULL CHECK(LENGTH(TRIM("description")) > 0),
  "type" VARCHAR(500) NOT NULL CHECK(LENGTH(TRIM("type")) > 0),
  "status" TEXT NOT NULL DEFAULT 'Created' CHECK(LENGTH(TRIM("status")) > 0),
  "isActive" BOOL NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT (NOW()),
  "createdBy" TEXT NOT NULL DEFAULT 'System',
  "updatedAt" TIMESTAMP NULL,
  "updatedBy" TEXT NULL,

  CONSTRAINT "CK_Benefits_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_Benefits_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_Benefits_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_Benefits_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

CREATE TABLE "PlansBenefits" (
  "id" UUID DEFAULT GEN_RANDOM_UUID() UNIQUE PRIMARY KEY NOT NULL,
  "planId" UUID NOT NULL,
  "benefitId" UUID NOT NULL,
  "isApplicable" BOOL NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT (NOW()),
  "createdBy" TEXT NOT NULL DEFAULT 'System',
  "updatedAt" TIMESTAMP NULL,
  "updatedBy" TEXT NULL,

  CONSTRAINT "UQ_PlansBenefits_planId_benefitId" UNIQUE ("planId", "benefitId"),
  CONSTRAINT "CK_PlansBenefits_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_PlansBenefits_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_PlansBenefits_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_PlansBenefits_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

CREATE TABLE "PlansBranches" (
  "id" UUID DEFAULT GEN_RANDOM_UUID() UNIQUE PRIMARY KEY NOT NULL,
  "planId" UUID NOT NULL,
  "branchId" UUID NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'Created' CHECK(LENGTH(TRIM("status")) > 0),
  "isActive" BOOL NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT (NOW()),
  "createdBy" TEXT NOT NULL DEFAULT 'System',
  "updatedAt" TIMESTAMP NULL,
  "updatedBy" TEXT NULL,

  CONSTRAINT "UQ_PlansBenefits_planId_branchId" UNIQUE ("planId", "branchId"),
  CONSTRAINT "CK_PlansBranches_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_PlansBranches_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_PlansBranches_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_PlansBranches_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

CREATE TABLE "Memberships" (
  "id" UUID DEFAULT GEN_RANDOM_UUID() UNIQUE PRIMARY KEY NOT NULL,
  "planId" UUID NOT NULL,
  "userId" UUID NOT NULL,
  "paymentId" UUID NOT NULL,
  "purchaseDate" TIMESTAMP NOT NULL,
  "expirationDate" TIMESTAMP NOT NULL,
  "paymentDueDate" TIMESTAMP NOT NULL,
  "wasRenewed" BOOL NOT NULL DEFAULT false,
  "isCancelled" BOOL NOT NULL DEFAULT false,
  "isActive" BOOL NOT NULL DEFAULT true,
  "status" TEXT NOT NULL DEFAULT 'Created',
  "createdAt" TIMESTAMP NOT NULL DEFAULT (NOW()),
  "createdBy" TEXT NOT NULL DEFAULT 'System',
  "updatedAt" TIMESTAMP NULL,
  "updatedBy" TEXT NULL,

  CONSTRAINT "CK_Memberships_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_Memberships_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_Memberships_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_Memberships_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

CREATE TABLE "UsersMemberships" (
  "id" UUID DEFAULT GEN_RANDOM_UUID() UNIQUE PRIMARY KEY NOT NULL,
  "userId" UUID NOT NULL,
  "membershipId" UUID NOT NULL,
  "abilityOrder" int NOT NULL DEFAULT 1,
  "createdAt" TIMESTAMP NOT NULL DEFAULT (NOW()),
  "createdBy" TEXT NOT NULL DEFAULT 'System',
  "updatedAt" TIMESTAMP NULL,
  "updatedBy" TEXT NULL,

  CONSTRAINT "UQ_UsersMemberships_userId_membershipId" UNIQUE ("userId", "membershipId"),
  CONSTRAINT "CK_UsersMemberships_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_UsersMemberships_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_UsersMemberships_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_UsersMemberships_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

ALTER TABLE "Memberships" ADD FOREIGN KEY ("planId") REFERENCES "Plans" ("id");

ALTER TABLE "PlansBenefits" ADD FOREIGN KEY ("planId") REFERENCES "Plans" ("id");

ALTER TABLE "PlansBenefits" ADD FOREIGN KEY ("benefitId") REFERENCES "Benefits" ("id");

ALTER TABLE "UsersMemberships" ADD FOREIGN KEY ("membershipId") REFERENCES "Memberships" ("id");

ALTER TABLE "Plans" ADD FOREIGN KEY ("gymId") REFERENCES "Gyms" ("id");

ALTER TABLE "Branches" ADD FOREIGN KEY ("gymId") REFERENCES "Gyms" ("id");

ALTER TABLE "PlansBranches" ADD FOREIGN KEY ("branchId") REFERENCES "Branches" ("id");

ALTER TABLE "PlansBranches" ADD FOREIGN KEY ("planId") REFERENCES "Plans" ("id");

ALTER TABLE "Networks" ADD FOREIGN KEY ("gymId") REFERENCES "Gyms" ("id");

ALTER TABLE "Benefits" ADD FOREIGN KEY ("gymId") REFERENCES "Gyms" ("id");

ALTER TABLE "Schedules" ADD FOREIGN KEY ("branchId") REFERENCES "Branches" ("id");