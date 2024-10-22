-- Schema

CREATE DATABASE "Auth"

CREATE TABLE "Users" (
  "id" UUID DEFAULT gen_random_uuid() UNIQUE PRIMARY KEY NOT NULL,
  "name" VARCHAR(500) NOT NULL,
  "username" TEXT UNIQUE NOT NULL,
  "email" TEXT UNIQUE NOT NULL,
  "password" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'Created',
  "lastLogin" Timestamp NULL DEFAULT NULL,
  "isOnline" BOOL NOT NULL DEFAULT false,
  "isActive" BOOL NOT NULL DEFAULT true,
  "registerDate" Timestamp NOT NULL DEFAULT (now()),
  "createdAt" Timestamp NOT NULL DEFAULT (now()),
  "createdBy" VARCHAR(500) NOT NULL DEFAULT 'System',
  "updatedAt" Timestamp DEFAULT (now()),
  "updatedBy" VARCHAR(500) DEFAULT 'System'
);

CREATE TABLE "Permissions" (
  "id" UUID DEFAULT gen_random_uuid() UNIQUE PRIMARY KEY NOT NULL,
  "name" VARCHAR(500) UNIQUE NOT NULL,
  "description" TEXT NOT NULL,
  "typeId" UUID NOT NULL,
  "createdAt" Timestamp NOT NULL DEFAULT (now()),
  "createdBy" VARCHAR(500) NOT NULL DEFAULT 'System',
  "updatedAt" Timestamp DEFAULT (now()),
  "updatedBy" VARCHAR(500) DEFAULT 'System'
);

CREATE TABLE "Roles" (
  "id" UUID DEFAULT gen_random_uuid() UNIQUE PRIMARY KEY NOT NULL,
  "name" VARCHAR(500) UNIQUE NOT NULL,
  "description" TEXT NOT NULL,
  "childOfId" UUID DEFAULT null,
  "createdAt" Timestamp NOT NULL DEFAULT (now()),
  "createdBy" VARCHAR(500) NOT NULL DEFAULT 'System',
  "updatedAt" Timestamp DEFAULT (now()),
  "updatedBy" VARCHAR(500) DEFAULT 'System'
);

CREATE TABLE "Types" (
  "id" UUID DEFAULT gen_random_uuid() UNIQUE PRIMARY KEY NOT NULL,
  "name" VARCHAR(500) UNIQUE NOT NULL,
  "description" TEXT NOT NULL,
  "isCreated" BOOL NOT NULL DEFAULT false,
  "isReaded" BOOL NOT NULL DEFAULT false,
  "isUpdated" BOOL NOT NULL DEFAULT false,
  "isDeleted" BOOL NOT NULL DEFAULT false,
  "createdAt" Timestamp NOT NULL DEFAULT (now()),
  "createdBy" VARCHAR(500) NOT NULL DEFAULT 'System',
  "updatedAt" Timestamp DEFAULT (now()),
  "updatedBy" VARCHAR(500) DEFAULT 'System'
);

CREATE TABLE "Attributes" (
  "id" UUID DEFAULT gen_random_uuid() UNIQUE PRIMARY KEY NOT NULL,
  "userId" UUID NOT NULL,
  "key" TEXT NOT NULL,
  "value" TEXT,
  "type" VARCHAR(500) NOT NULL DEFAULT 'string',
  "isVisible" BOOL NOT NULL DEFAULT true,
  "createdAt" Timestamp NOT NULL DEFAULT (now()),
  "createdBy" VARCHAR(500) NOT NULL DEFAULT 'System',
  "updatedAt" Timestamp DEFAULT (now()),
  "updatedBy" VARCHAR(500) DEFAULT 'System'
);

CREATE TABLE "RolesPermissions" (
  "id" UUID DEFAULT gen_random_uuid() UNIQUE PRIMARY KEY NOT NULL,
  "roleId" UUID NOT NULL,
  "permissionId" UUID NOT NULL,
  "createdAt" Timestamp NOT NULL DEFAULT (now()),
  "createdBy" VARCHAR(500) NOT NULL DEFAULT 'System',
  "updatedAt" Timestamp DEFAULT (now()),
  "updatedBy" VARCHAR(500) DEFAULT 'System'
);

CREATE TABLE "UsersRoles" (
  "id" UUID DEFAULT gen_random_uuid() UNIQUE PRIMARY KEY NOT NULL,
  "userId" UUID NOT NULL,
  "roleId" UUID NOT NULL,
  "createdAt" Timestamp NOT NULL DEFAULT (now()),
  "createdBy" VARCHAR(500) NOT NULL DEFAULT 'System',
  "updatedAt" Timestamp DEFAULT (now()),
  "updatedBy" VARCHAR(500) DEFAULT 'System'
);

CREATE TABLE "BlockedTokens" (
  "id" UUID DEFAULT gen_random_uuid() UNIQUE PRIMARY KEY NOT NULL,
  "userId" UUID NOT NULL,
  "token" TEXT UNIQUE NOT NULL,
  "expiration" Timestamp NOT NULL DEFAULT (now() + INTERVAL '1 day'),
  "createdAt" Timestamp NOT NULL DEFAULT (now()),
  "createdBy" VARCHAR(500) NOT NULL DEFAULT 'System',
  "updatedAt" Timestamp DEFAULT (now()),
  "updatedBy" VARCHAR(500) DEFAULT 'System'
);

ALTER TABLE "BlockedTokens" ADD FOREIGN KEY ("userId") REFERENCES "Users" ("id");

ALTER TABLE "Attributes" ADD FOREIGN KEY ("userId") REFERENCES "Users" ("id");

ALTER TABLE "Permissions" ADD FOREIGN KEY ("typeId") REFERENCES "Types" ("id");

ALTER TABLE "UsersRoles" ADD FOREIGN KEY ("userId") REFERENCES "Users" ("id");

ALTER TABLE "UsersRoles" ADD FOREIGN KEY ("roleId") REFERENCES "Roles" ("id");

ALTER TABLE "RolesPermissions" ADD FOREIGN KEY ("permissionId") REFERENCES "Permissions" ("id");

ALTER TABLE "RolesPermissions" ADD FOREIGN KEY ("roleId") REFERENCES "Roles" ("id");

ALTER TABLE "Roles" ADD FOREIGN KEY ("childOfId") REFERENCES "Roles" ("id");

-- Referenced Data

INSERT INTO "Types" 
("id","name","description","isCreated","isReaded","isUpdated","isDeleted") 
VALUES
    ('988340d4-c9a5-4dbe-8f5d-f26555849533','Create','Allows creation of resources',true,false,false,false),
    ('a14a0e9f-4c25-427b-a0c4-81750658583b','Read','Allows reading of resources',false,true,false,false),
    ('a9987249-b084-4eff-bf85-0d876c4120e7','Update','Allows updating of resources',false,false,true,false),
    ('dc049c6c-cbc1-4ad1-9bdb-f7d825cb88ff','Delete','Allows deletion of resources',false,false,false,true);

INSERT INTO "Permissions" 
("id","name","description","typeId") 
VALUES
    ('988340d4-c9a5-4dbe-8f5d-f26555849533','CreateUser','Allows creating new users','988340d4-c9a5-4dbe-8f5d-f26555849533'),
    ('a14a0e9f-4c25-427b-a0c4-81750658583b','ReadUser','Allows reading user details','a14a0e9f-4c25-427b-a0c4-81750658583b'),
    ('a9987249-b084-4eff-bf85-0d876c4120e7','UpdateUser','Allows updating user details','a9987249-b084-4eff-bf85-0d876c4120e7'),
    ('dc049c6c-cbc1-4ad1-9bdb-f7d825cb88ff','DeleteUser','Allows deleting users','dc049c6c-cbc1-4ad1-9bdb-f7d825cb88ff'),
    ('211beac9-f42d-404e-85e5-85c727c39aa2','CreateContent','Allows creating content','988340d4-c9a5-4dbe-8f5d-f26555849533'),
    ('bb6f9fbd-75cd-42e3-87e5-962a297617ab','ReadContent','Allows reading content','a14a0e9f-4c25-427b-a0c4-81750658583b'),
    ('78f75af7-c994-429f-bf2a-5d786e5b4d58','UpdateContent','Allows updating content','a9987249-b084-4eff-bf85-0d876c4120e7'),
    ('6543ba14-7728-4c7e-9f3d-3febb39edc77','DeleteContent','Allows deleting content','dc049c6c-cbc1-4ad1-9bdb-f7d825cb88ff');

INSERT INTO "Roles" 
("id","name","description","childOfId") 
VALUES
    ('988340d4-c9a5-4dbe-8f5d-f26555849533','Admin','Role with the highest level of access',NULL),
    ('a14a0e9f-4c25-427b-a0c4-81750658583b','User','Role for viewing content only',NULL);

INSERT INTO "RolesPermissions"
("roleId","permissionId")
VALUES
('988340d4-c9a5-4dbe-8f5d-f26555849533','988340d4-c9a5-4dbe-8f5d-f26555849533'),
('988340d4-c9a5-4dbe-8f5d-f26555849533','a14a0e9f-4c25-427b-a0c4-81750658583b'),
('988340d4-c9a5-4dbe-8f5d-f26555849533','a9987249-b084-4eff-bf85-0d876c4120e7'),
('988340d4-c9a5-4dbe-8f5d-f26555849533','dc049c6c-cbc1-4ad1-9bdb-f7d825cb88ff'),
('988340d4-c9a5-4dbe-8f5d-f26555849533','211beac9-f42d-404e-85e5-85c727c39aa2'),
('988340d4-c9a5-4dbe-8f5d-f26555849533','bb6f9fbd-75cd-42e3-87e5-962a297617ab'),
('988340d4-c9a5-4dbe-8f5d-f26555849533','78f75af7-c994-429f-bf2a-5d786e5b4d58'),
('988340d4-c9a5-4dbe-8f5d-f26555849533','6543ba14-7728-4c7e-9f3d-3febb39edc77'),
('a14a0e9f-4c25-427b-a0c4-81750658583b','988340d4-c9a5-4dbe-8f5d-f26555849533'),
('a14a0e9f-4c25-427b-a0c4-81750658583b','a14a0e9f-4c25-427b-a0c4-81750658583b'),
('a14a0e9f-4c25-427b-a0c4-81750658583b','a9987249-b084-4eff-bf85-0d876c4120e7'),
('a14a0e9f-4c25-427b-a0c4-81750658583b','dc049c6c-cbc1-4ad1-9bdb-f7d825cb88ff');

INSERT INTO "Users"
("id","name","username","email","password")
VALUES
('988340d4-c9a5-4dbe-8f5d-f26555849533','Martín Pallares','mapallares','mapallares@unimagdalena.edu.co','$2a$10$5JddKfQloSx5lm6Bjd5z9O8tT4jDDh8atyl1ud4lgIUb/8Kflxjla'),
('a14a0e9f-4c25-427b-a0c4-81750658583b','Breiner Gonzalez','bmgonzalez','bmgonzalez@unimagdalena.edu.co','$2a$10$u7csLfC9Nvk7eem78Go95Ob4c1eWLqaa7X3LCeYY9punFMmywx9ee'),
('a9987249-b084-4eff-bf85-0d876c4120e7','Miguel Toscano','luistoscanoms','luistoscanoms@unimagdalena.edu.co','$2a$10$sW0WfDaJeEJzHx2jSo/H0em4ESIxLDVbMPO6MOeEYSf8bD222UP9a');

INSERT INTO "UsersRoles"
("userId","roleId")
VALUES
('988340d4-c9a5-4dbe-8f5d-f26555849533','988340d4-c9a5-4dbe-8f5d-f26555849533'),
('a14a0e9f-4c25-427b-a0c4-81750658583b','988340d4-c9a5-4dbe-8f5d-f26555849533'),
('a9987249-b084-4eff-bf85-0d876c4120e7','988340d4-c9a5-4dbe-8f5d-f26555849533');

INSERT INTO "Attributes"
("userId","key","value","type")
VALUES
('988340d4-c9a5-4dbe-8f5d-f26555849533','cargo','Desarrolador','string'),
('a14a0e9f-4c25-427b-a0c4-81750658583b','cargo','Desarrolador','string'),
('a9987249-b084-4eff-bf85-0d876c4120e7','cargo','Desarrolador','string');