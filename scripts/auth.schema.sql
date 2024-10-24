CREATE DATABASE "Auth"

CREATE TABLE "Users" (
  "id" UUID DEFAULT GEN_RANDOM_UUID() UNIQUE PRIMARY KEY NOT NULL,
  "name" VARCHAR(500) NOT NULL CHECK(LENGTH(TRIM("name")) > 0),
  "username" TEXT UNIQUE NOT NULL CHECK(LENGTH(TRIM("username")) > 0),
  "email" TEXT UNIQUE NOT NULL CHECK(LENGTH(TRIM("email")) > 0),
  "phone" TEXT UNIQUE NOT NULL CHECK(LENGTH(TRIM("phone")) > 0),
  "password" TEXT NOT NULL CHECK(LENGTH(TRIM("password")) > 0),
  "lastLogin" Timestamp NULL DEFAULT NULL,
  "isOnline" BOOL NOT NULL DEFAULT false,
  "status" TEXT NOT NULL DEFAULT 'Created' CHECK(LENGTH(TRIM("status")) > 0),
  "isActive" BOOL NOT NULL DEFAULT true,
  "registerDate" Timestamp NOT NULL DEFAULT (NOW()),
  "createdAt" Timestamp NOT NULL DEFAULT (NOW()),
  "createdBy" VARCHAR(500) NOT NULL DEFAULT 'System',
  "updatedAt" Timestamp NULL,
  "updatedBy" VARCHAR(500) NULL,

  CONSTRAINT "CK_Users_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_Users_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_Users_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_Users_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

CREATE TABLE "Permissions" (
  "id" UUID DEFAULT GEN_RANDOM_UUID() UNIQUE PRIMARY KEY NOT NULL,
  "name" VARCHAR(500) UNIQUE NOT NULL CHECK(LENGTH(TRIM("name")) > 0),
  "description" TEXT NOT NULL CHECK(LENGTH(TRIM("description")) > 0),
  "typeId" UUID NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'Created' CHECK(LENGTH(TRIM("status")) > 0),
  "isActive" BOOL NOT NULL DEFAULT true,
  "createdAt" Timestamp NOT NULL DEFAULT (NOW()),
  "createdBy" VARCHAR(500) NOT NULL DEFAULT 'System',
  "updatedAt" Timestamp NULL,
  "updatedBy" VARCHAR(500) NULL,

  CONSTRAINT "CK_Permissions_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_Permissions_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_Permissions_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_Permissions_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

CREATE TABLE "Roles" (
  "id" UUID DEFAULT GEN_RANDOM_UUID() UNIQUE PRIMARY KEY NOT NULL,
  "name" VARCHAR(500) UNIQUE NOT NULL CHECK(LENGTH(TRIM("name")) > 0),
  "description" TEXT NOT NULL CHECK(LENGTH(TRIM("description")) > 0),
  "childOfId" UUID NULL,
  "status" TEXT NOT NULL DEFAULT 'Created' CHECK(LENGTH(TRIM("status")) > 0),
  "isActive" BOOL NOT NULL DEFAULT true,
  "createdAt" Timestamp NOT NULL DEFAULT (NOW()),
  "createdBy" VARCHAR(500) NOT NULL DEFAULT 'System',
  "updatedAt" Timestamp NULL,
  "updatedBy" VARCHAR(500) NULL,

  CONSTRAINT "CK_Roles_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_Roles_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_Roles_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_Roles_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

CREATE TABLE "Types" (
  "id" UUID DEFAULT GEN_RANDOM_UUID() UNIQUE PRIMARY KEY NOT NULL,
  "name" VARCHAR(500) UNIQUE NOT NULL CHECK(LENGTH(TRIM("name")) > 0),
  "description" TEXT NOT NULL CHECK(LENGTH(TRIM("description")) > 0),
  "isCreated" BOOL NOT NULL DEFAULT false,
  "isReaded" BOOL NOT NULL DEFAULT false,
  "isUpdated" BOOL NOT NULL DEFAULT false,
  "isDeleted" BOOL NOT NULL DEFAULT false,
  "status" TEXT NOT NULL DEFAULT 'Created' CHECK(LENGTH(TRIM("status")) > 0),
  "isActive" BOOL NOT NULL DEFAULT true,
  "createdAt" Timestamp NOT NULL DEFAULT (NOW()),
  "createdBy" VARCHAR(500) NOT NULL DEFAULT 'System',
  "updatedAt" Timestamp NULL,
  "updatedBy" VARCHAR(500) NULL,

  CONSTRAINT "CK_Types_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_Types_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_Types_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_Types_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

CREATE TABLE "Attributes" (
  "id" UUID DEFAULT GEN_RANDOM_UUID() UNIQUE PRIMARY KEY NOT NULL,
  "userId" UUID NOT NULL,
  "key" TEXT NOT NULL CHECK(LENGTH(TRIM("key")) > 0),
  "value" TEXT,
  "type" VARCHAR(500) NOT NULL DEFAULT 'string' CHECK(LENGTH(TRIM("type")) > 0),
  "isVisible" BOOL NOT NULL DEFAULT true,
  "status" TEXT NOT NULL DEFAULT 'Created' CHECK(LENGTH(TRIM("status")) > 0),
  "isActive" BOOL NOT NULL DEFAULT true,
  "createdAt" Timestamp NOT NULL DEFAULT (NOW()),
  "createdBy" VARCHAR(500) NOT NULL DEFAULT 'System',
  "updatedAt" Timestamp NULL,
  "updatedBy" VARCHAR(500) NULL,

  CONSTRAINT "UQ_Attributes_User_Key" UNIQUE ("userId", "key"),
  CONSTRAINT "CK_Attributes_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_Attributes_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_Attributes_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_Attributes_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

CREATE TABLE "RolesPermissions" (
  "id" UUID DEFAULT GEN_RANDOM_UUID() UNIQUE PRIMARY KEY NOT NULL,
  "roleId" UUID NOT NULL,
  "permissionId" UUID NOT NULL,
  "createdAt" Timestamp NOT NULL DEFAULT (NOW()),
  "createdBy" VARCHAR(500) NOT NULL DEFAULT 'System',
  "updatedAt" Timestamp NULL,
  "updatedBy" VARCHAR(500) NULL,

  CONSTRAINT "UQ_RolesPermissions_Role_Permission" UNIQUE ("roleId", "permissionId"),
  CONSTRAINT "CK_RolesPermissions_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_RolesPermissions_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_RolesPermissions_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_RolesPermissions_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

CREATE TABLE "UsersRoles" (
  "id" UUID DEFAULT GEN_RANDOM_UUID() UNIQUE PRIMARY KEY NOT NULL,
  "userId" UUID NOT NULL,
  "roleId" UUID NOT NULL,
  "createdAt" Timestamp NOT NULL DEFAULT (NOW()),
  "createdBy" VARCHAR(500) NOT NULL DEFAULT 'System',
  "updatedAt" Timestamp NULL,
  "updatedBy" VARCHAR(500) NULL,

  CONSTRAINT "UQ_UsersRoles_User_Role" unique ("userId", "roleId"),
  CONSTRAINT "CK_UsersRoles_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_UsersRoles_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_UsersRoles_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_UsersRoles_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

CREATE TABLE "BlockedTokens" (
  "id" UUID DEFAULT GEN_RANDOM_UUID() UNIQUE PRIMARY KEY NOT NULL,
  "userId" UUID NOT NULL,
  "token" TEXT UNIQUE NOT NULL,
  "expiration" Timestamp NOT NULL DEFAULT (NOW() + INTERVAL '1 day'),
  "createdAt" Timestamp NOT NULL DEFAULT (NOW()),
  "createdBy" VARCHAR(500) NOT NULL DEFAULT 'System',
  "updatedAt" Timestamp NULL,
  "updatedBy" VARCHAR(500) NULL,

  CONSTRAINT "CK_BlockedTokens_UpdatedAt" CHECK ("updatedAt" IS NULL OR "updatedAt" >= "createdAt"),
  CONSTRAINT "CK_BlockedTokens_UpdatedAtCoherence" CHECK (("updatedAt" IS NULL AND "updatedBy" IS NULL) OR ("updatedAt" IS NOT NULL AND "updatedBy" IS NOT NULL)),
  CONSTRAINT "CK_BlockedTokens_InsertedBy_NotEmpty" CHECK (LENGTH(TRIM("createdBy")) > 0),
  CONSTRAINT "CK_BlockedTokens_UpdatedBy_NotEmpty" CHECK ("updatedBy" IS NULL OR LENGTH(TRIM("updatedBy")) > 0)
);

ALTER TABLE "BlockedTokens" ADD FOREIGN KEY ("userId") REFERENCES "Users" ("id");

ALTER TABLE "Attributes" ADD FOREIGN KEY ("userId") REFERENCES "Users" ("id");

ALTER TABLE "Permissions" ADD FOREIGN KEY ("typeId") REFERENCES "Types" ("id");

ALTER TABLE "UsersRoles" ADD FOREIGN KEY ("userId") REFERENCES "Users" ("id");

ALTER TABLE "UsersRoles" ADD FOREIGN KEY ("roleId") REFERENCES "Roles" ("id");

ALTER TABLE "RolesPermissions" ADD FOREIGN KEY ("permissionId") REFERENCES "Permissions" ("id");

ALTER TABLE "RolesPermissions" ADD FOREIGN KEY ("roleId") REFERENCES "Roles" ("id");

ALTER TABLE "Roles" ADD FOREIGN KEY ("childOfId") REFERENCES "Roles" ("id");
