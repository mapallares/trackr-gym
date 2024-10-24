CREATE DATABASE "Bookings"

CREATE TABLE "Bookings" (
  "id" UUID PRIMARY KEY DEFAULT (GEN_RANDOM_UUID()),
  "activityId" UUID NOT NULL,
  "userId" UUID NOT NULL,
  "branchId" UUID NOT NULL,
  "date" TIMESTAMP NOT NULL,
  "startTime" TIME NOT NULL,
  "endTime" TIME NOT NULL,
  "reason" TEXT NOT NULL CHECK(LENGTH(TRIM("reason")) > 0),
  "isApproved" BOOL NOT NULL DEFAULT false,
  "isCancelled" BOOL NOT NULL DEFAULT false,
  "status" TEXT NOT NULL DEFAULT 'Created' CHECK(LENGTH(TRIM("status")) > 0),
  "isActive" BOOL NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT (NOW()),
  "createdBy" VARCHAR(500) NOT NULL DEFAULT 'System',
  "updatedAt" TIMESTAMP,
  "updatedBy" VARCHAR(500),
  
  CONSTRAINT "CK_Bookings_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_Bookings_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_Bookings_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_Bookings_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

CREATE TABLE "Activities" (
  "id" UUID PRIMARY KEY DEFAULT (GEN_RANDOM_UUID()),
  "serviceId" UUID NOT NULL,
  "branchId" UUID NOT NULL,
  "name" VARCHAR(500) NOT NULL CHECK(LENGTH(TRIM("name")) > 0),
  "details" TEXT,
  "type" VARCHAR(500) NOT NULL CHECK(LENGTH(TRIM("type")) > 0),
  "inCharge" TEXT NOT NULL,
  "capacity" int NOT NULL DEFAULT 1,
  "date" TIMESTAMP NOT NULL,
  "startTime" TIME NOT NULL,
  "endTime" TIME NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'Created' CHECK(LENGTH(TRIM("status")) > 0),
  "isActive" BOOL NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT (NOW()),
  "createdBy" VARCHAR(500) NOT NULL DEFAULT 'System',
  "updatedAt" TIMESTAMP,
  "updatedBy" VARCHAR(500),

  CONSTRAINT "CK_Activities_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_Activities_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_Activities_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_Activities_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

CREATE TABLE "Services" (
  "id" UUID PRIMARY KEY DEFAULT (GEN_RANDOM_UUID()),
  "name" VARCHAR(100) NOT NULL CHECK(LENGTH(TRIM("name")) > 0),
  "description" TEXT,
  "type" VARCHAR(500) NOT NULL CHECK(LENGTH(TRIM("type")) > 0),
  "cost" TEXT NOT NULL,
  "duration" int NOT NULL DEFAULT 1,
  "availableFrom" TIMESTAMP NOT NULL DEFAULT (NOW()),
  "availableTo" TIMESTAMP,
  "status" TEXT NOT NULL DEFAULT 'Created' CHECK(LENGTH(TRIM("status")) > 0),
  "isActive" BOOL NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT (NOW()),
  "createdBy" VARCHAR(500) NOT NULL DEFAULT 'System',
  "updatedAt" TIMESTAMP,
  "updatedBy" VARCHAR(500),

  CONSTRAINT "CK_Services_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_Services_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_Services_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_Services_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

CREATE TABLE "Attendances" (
  "id" UUID PRIMARY KEY DEFAULT (GEN_RANDOM_UUID()),
  "bookingId" UUID NOT NULL,
  "userId" UUID NOT NULL,
  "date" TIMESTAMP NOT NULL,
  "arrivalTime" TIMESTAMP NOT NULL,
  "departureTime" TIMESTAMP NOT NULL,
  "comments" TEXT,
  "status" TEXT NOT NULL DEFAULT 'Created' CHECK(LENGTH(TRIM("status")) > 0),
  "isActive" BOOL NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT (NOW()),
  "createdBy" VARCHAR(500) NOT NULL DEFAULT 'System',
  "updatedAt" TIMESTAMP,
  "updatedBy" VARCHAR(500),

  CONSTRAINT "CK_Attendances_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_Attendances_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_Attendances_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_Attendances_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

ALTER TABLE "Attendances" ADD FOREIGN KEY ("bookingId") REFERENCES "Bookings" ("id");

ALTER TABLE "Activities" ADD FOREIGN KEY ("serviceId") REFERENCES "Services" ("id");

ALTER TABLE "Bookings" ADD FOREIGN KEY ("activityId") REFERENCES "Activities" ("id");
