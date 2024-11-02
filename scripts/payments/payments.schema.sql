CREATE DATABASE "Payments"

CREATE TABLE "PaymentMethods" (
  "id" UUID PRIMARY KEY DEFAULT (GEN_RANDOM_UUID()),
  "name" VARCHAR(500) UNIQUE NOT NULL CHECK(LENGTH(TRIM("name")) > 0),
  "abbreviation" VARCHAR(10) UNIQUE NOT NULL CHECK(LENGTH(TRIM("abbreviation")) > 0),
  "description" TEXT,
  "status" TEXT NOT NULL DEFAULT 'Created' CHECK(LENGTH(TRIM("status")) > 0),
  "isActive" BOOL NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT (NOW()),
  "createdBy" TEXT NOT NULL DEFAULT 'System',
  "updatedAt" TIMESTAMP NULL,
  "updatedBy" TEXT NULL,
  
  CONSTRAINT "CK_PaymentsMethods_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_PaymentsMethods_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_PaymentsMethods_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_PaymentsMethods_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

CREATE TABLE "CurrencyAmountUnitTypes" (
  "id" UUID PRIMARY KEY DEFAULT (GEN_RANDOM_UUID()),
  "name" VARCHAR(500) UNIQUE NOT NULL CHECK(LENGTH(TRIM("name")) > 0),
  "abbreviation" VARCHAR(10) UNIQUE NOT NULL CHECK(LENGTH(TRIM("abbreviation")) > 0),
  "symbol" VARCHAR(10) NOT NULL DEFAULT '$' CHECK(LENGTH(TRIM("symbol")) > 0),
  "unit" VARCHAR(100) NOT NULL CHECK(LENGTH(TRIM("unit")) > 0),
  "description" TEXT,
  "status" TEXT NOT NULL DEFAULT 'Created' CHECK(LENGTH(TRIM("status")) > 0),
  "isActive" BOOL NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT (NOW()),
  "createdBy" TEXT NOT NULL DEFAULT 'System',
  "updatedAt" TIMESTAMP NULL,
  "updatedBy" TEXT NULL,

  CONSTRAINT "CK_CurrencyAmountUnitTypes_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_CurrencyAmountUnitTypes_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_CurrencyAmountUnitTypes_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_CurrencyAmountUnitTypes_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

CREATE TABLE "Payments" (
  "id" UUID PRIMARY KEY DEFAULT (GEN_RANDOM_UUID()),
  "userId" UUID NOT NULL,
  "reason" TEXT NOT NULL CHECK(LENGTH(TRIM("reason")) > 0),
  "description" TEXT,
  "paymentMethodId" UUID NOT NULL,
  "paymentDate" TIMESTAMP NOT NULL,
  "paymentPercentage" decimal(10,2) NOT NULL DEFAULT 100,
  "reference" VARCHAR(100) UNIQUE NOT NULL,
  "currencyAmount" numeric NOT NULL DEFAULT '0',
  "currencyAmountUnitId" UUID NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'Created' CHECK(LENGTH(TRIM("status")) > 0),
  "isActive" BOOL NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT (NOW()),
  "createdBy" TEXT NOT NULL DEFAULT 'System',
  "updatedAt" TIMESTAMP NULL,
  "updatedBy" TEXT NULL,

  CONSTRAINT "CK_Payments_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_Payments_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_Payments_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_Payments_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

CREATE TABLE "Invoices" (
  "id" UUID PRIMARY KEY DEFAULT (GEN_RANDOM_UUID()),
  "paymentId" UUID NOT NULL,
  "emissionDate" TIMESTAMP NOT NULL DEFAULT (NOW()),
  "totalCurrencyAmount" numeric NOT NULL DEFAULT '0',
  "currencyAmoutUnitTypeId" UUID NOT NULL,
  "code" TEXT NOT NULL DEFAULT (GEN_RANDOM_UUID()),
  "status" TEXT NOT NULL DEFAULT 'Created' CHECK(LENGTH(TRIM("status")) > 0),
  "isActive" BOOL NOT NULL DEFAULT true,
  "isCorrect" BOOL NOT NULL DEFAULT true,
  "isValid" BOOL NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT (NOW()),
  "createdBy" TEXT NOT NULL DEFAULT 'System',
  "updatedAt" TIMESTAMP NULL,
  "updatedBy" TEXT NULL,

  CONSTRAINT "CK_Invoices_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_Invoices_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_Invoices_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_Invoices_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

CREATE TABLE "PaymentsComments" (
  "id" UUID PRIMARY KEY DEFAULT (GEN_RANDOM_UUID()),
  "paymentId" UUID NOT NULL,
  "name" VARCHAR(100) NOT NULL CHECK(LENGTH(TRIM("name")) > 0),
  "description" TEXT NOT NULL CHECK(LENGTH(TRIM("description")) > 0),
  "date" TIMESTAMP NOT NULL,
  "commenter" VARCHAR(500) NOT NULL CHECK(LENGTH(TRIM("commenter")) > 0),
  "isActive" BOOL NOT NULL DEFAULT true,
  "isDeleted" BOOL NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP NOT NULL DEFAULT (NOW()),
  "createdBy" TEXT NOT NULL DEFAULT 'System',
  "updatedAt" TIMESTAMP NULL,
  "updatedBy" TEXT NULL,

  CONSTRAINT "CK_PaymentsComments_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_PaymentsComments_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_PaymentsComments_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_PaymentsComments_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

ALTER TABLE "Payments" ADD FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethods" ("id");

ALTER TABLE "Invoices" ADD FOREIGN KEY ("paymentId") REFERENCES "Payments" ("id");

ALTER TABLE "Invoices" ADD FOREIGN KEY ("currencyAmoutUnitTypeId") REFERENCES "CurrencyAmountUnitTypes" ("id");

ALTER TABLE "Payments" ADD FOREIGN KEY ("currencyAmountUnitId") REFERENCES "CurrencyAmountUnitTypes" ("id");

ALTER TABLE "PaymentsComments" ADD FOREIGN KEY ("paymentId") REFERENCES "Payments" ("id");