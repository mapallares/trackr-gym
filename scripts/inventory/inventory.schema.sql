CREATE DATABASE "Inventory"

CREATE TABLE "Products" (
  "id" UUID PRIMARY KEY DEFAULT (GEN_RANDOM_UUID()),
  "variantOfId" UUID,
  "name" VARCHAR(500) NOT NULL CHECK(LENGTH(TRIM("name")) > 0),
  "description" TEXT,
  "type" VARCHAR(500) NOT NULL CHECK(LENGTH(TRIM("type")) > 0),
  "purchasePrice" TEXT NOT NULL CHECK(LENGTH(TRIM("purchasePrice")) > 0),
  "salePrice" TEXT NOT NULL CHECK(LENGTH(TRIM("salePrice")) > 0),
  "stock" integer NOT NULL DEFAULT 0,
  "isSaleProduct" boolean NOT NULL DEFAULT false,
  "status" VARCHAR(500) NOT NULL DEFAULT 'Created' CHECK(LENGTH(TRIM("status")) > 0),
  "isActive" bool NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT (NOW()),
  "createdBy" VARCHAR(500) NOT NULL DEFAULT 'System',
  "updatedAt" TIMESTAMP,
  "updatedBy" VARCHAR(500),

  CONSTRAINT "CK_Products_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_Products_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_Products_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_Products_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

CREATE TABLE "Details" (
  "id" UUID PRIMARY KEY DEFAULT (GEN_RANDOM_UUID()),
  "productId" UUID NOT NULL,
  "key" TEXT NOT NULL CHECK(LENGTH(TRIM("key")) > 0),
  "value" TEXT,
  "type" VARCHAR(500) NOT NULL DEFAULT 'string' CHECK(LENGTH(TRIM("type")) > 0),
  "isVisible" BOOL NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT (NOW()),
  "createdBy" VARCHAR(500) NOT NULL DEFAULT 'System',
  "updatedAt" TIMESTAMP DEFAULT (NOW()),
  "updatedBy" VARCHAR(500) DEFAULT 'System',

  CONSTRAINT "CK_Details_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_Details_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_Details_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_Details_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

CREATE TABLE "InventoryMovements" (
  "id" UUID PRIMARY KEY DEFAULT (GEN_RANDOM_UUID()),
  "productId" UUID NOT NULL,
  "paymentId" UUID NOT NULL,
  "type" VARCHAR(500) NOT NULL,
  "quantity" integer NOT NULL DEFAULT 0,
  "description" VARCHAR(500),
  "createdAt" TIMESTAMP NOT NULL DEFAULT (NOW()),
  "createdBy" VARCHAR(500) NOT NULL DEFAULT 'System',
  "updatedAt" TIMESTAMP,
  "updatedBy" VARCHAR(500),

  CONSTRAINT "CK_InventoryMovements_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_InventoryMovements_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_InventoryMovements_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_InventoryMovements_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

ALTER TABLE "Details" ADD FOREIGN KEY ("productId") REFERENCES "Products" ("id");

ALTER TABLE "InventoryMovements" ADD FOREIGN KEY ("productId") REFERENCES "Products" ("id");

ALTER TABLE "Products" ADD FOREIGN KEY ("variantOfId") REFERENCES "Products" ("id");
