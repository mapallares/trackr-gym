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
    ('988340d4-c9a5-4dbe-8f5d-f26555849533','CreateMembership','Allows creating new memberships','988340d4-c9a5-4dbe-8f5d-f26555849533'),
    ('a14a0e9f-4c25-427b-a0c4-81750658583b','ReadMembership','Allows reading membership details','a14a0e9f-4c25-427b-a0c4-81750658583b'),
    ('a9987249-b084-4eff-bf85-0d876c4120e7','UpdateMembership','Allows updating membership details','a9987249-b084-4eff-bf85-0d876c4120e7'),
    ('dc049c6c-cbc1-4ad1-9bdb-f7d825cb88ff','DeleteMembership','Allows deleting memberships','dc049c6c-cbc1-4ad1-9bdb-f7d825cb88ff'),
    ('211beac9-f42d-404e-85e5-85c727c39aa2','CreatePlan','Allows creating plans','988340d4-c9a5-4dbe-8f5d-f26555849533'),
    ('bb6f9fbd-75cd-42e3-87e5-962a297617ab','ReadPlan','Allows reading plans','a14a0e9f-4c25-427b-a0c4-81750658583b'),
    ('78f75af7-c994-429f-bf2a-5d786e5b4d58','UpdatePlan','Allows updating plans','a9987249-b084-4eff-bf85-0d876c4120e7'),
    ('6543ba14-7728-4c7e-9f3d-3febb39edc77','DeletePlan','Allows deleting plans','dc049c6c-cbc1-4ad1-9bdb-f7d825cb88ff'),
    ('5200f1c3-cd3d-4a7a-a98b-5e9f8d378f59','CreateUser','Allows creating users','988340d4-c9a5-4dbe-8f5d-f26555849533'),
    ('c3b30149-8385-4a24-8229-16922293563d','ReadUser','Allows reading users','a14a0e9f-4c25-427b-a0c4-81750658583b'),
    ('2c0a704f-6392-4532-b246-86452f181642','UpdateUser','Allows updating users','a9987249-b084-4eff-bf85-0d876c4120e7'),
    ('0f62274b-d2c1-4889-9123-1ef17a99bb3a','DeleteUser','Allows deleting users','dc049c6c-cbc1-4ad1-9bdb-f7d825cb88ff');

INSERT INTO "Roles" 
("id","name","description","childOfId") 
VALUES
	('988340d4-c9a5-4dbe-8f5d-f26555849533','Admin','Role with the highest level of access',NULL),
	('a14a0e9f-4c25-427b-a0c4-81750658583b','User','Role for viewing content only',NULL);

INSERT INTO "RolesPermissions" 
("id","roleId","permissionId") 
VALUES
	('5df19091-bffd-4559-876c-e72ea23ec348','988340d4-c9a5-4dbe-8f5d-f26555849533','988340d4-c9a5-4dbe-8f5d-f26555849533'),
	('ab0b8870-f5e2-48d2-9f1c-b32996358297','988340d4-c9a5-4dbe-8f5d-f26555849533','a14a0e9f-4c25-427b-a0c4-81750658583b'),
	('9f7cf182-dc66-4f14-a19e-f96b9f2cd150','988340d4-c9a5-4dbe-8f5d-f26555849533','a9987249-b084-4eff-bf85-0d876c4120e7'),
	('b70da47a-4ccc-420d-b4a4-f4b200847110','988340d4-c9a5-4dbe-8f5d-f26555849533','dc049c6c-cbc1-4ad1-9bdb-f7d825cb88ff'),
	('db334964-150f-462b-b5fc-068b4526f3b3','988340d4-c9a5-4dbe-8f5d-f26555849533','211beac9-f42d-404e-85e5-85c727c39aa2'),
	('b57c6551-2dc3-4dc3-9436-e91dfce003b3','988340d4-c9a5-4dbe-8f5d-f26555849533','bb6f9fbd-75cd-42e3-87e5-962a297617ab'),
	('e68e40d2-1727-4a22-aad7-882a9707912f','988340d4-c9a5-4dbe-8f5d-f26555849533','78f75af7-c994-429f-bf2a-5d786e5b4d58'),
	('c707ccbe-00e2-4836-85f3-66d7fa1ade60','988340d4-c9a5-4dbe-8f5d-f26555849533','6543ba14-7728-4c7e-9f3d-3febb39edc77'),
	('90de9f20-b817-4c1f-835f-4dd155cdd9c7','a14a0e9f-4c25-427b-a0c4-81750658583b','988340d4-c9a5-4dbe-8f5d-f26555849533'),
	('a3ac94e6-2596-4bf9-a4b7-9233e395e17e','a14a0e9f-4c25-427b-a0c4-81750658583b','a14a0e9f-4c25-427b-a0c4-81750658583b'),
	('e39cdd47-a079-42ab-952f-1459725727ad','a14a0e9f-4c25-427b-a0c4-81750658583b','a9987249-b084-4eff-bf85-0d876c4120e7'),
	('08b17a47-1b6c-4fd2-960d-bcffe636a9e2','a14a0e9f-4c25-427b-a0c4-81750658583b','dc049c6c-cbc1-4ad1-9bdb-f7d825cb88ff'),
	('64551926-e1d9-432b-af46-e44239263ce4','a14a0e9f-4c25-427b-a0c4-81750658583b','bb6f9fbd-75cd-42e3-87e5-962a297617ab'),
	('e7342562-087d-443a-99dc-17ca23d15bb4','988340d4-c9a5-4dbe-8f5d-f26555849533','5200f1c3-cd3d-4a7a-a98b-5e9f8d378f59'),
	('f142da3f-48a6-48bb-adce-3b249ccd967d','988340d4-c9a5-4dbe-8f5d-f26555849533','c3b30149-8385-4a24-8229-16922293563d'),
	('45d0540f-373c-426a-b7b8-6c598898a4fb','988340d4-c9a5-4dbe-8f5d-f26555849533','2c0a704f-6392-4532-b246-86452f181642'),
	('2402b497-82af-40fc-9534-dab7630646e8','988340d4-c9a5-4dbe-8f5d-f26555849533','0f62274b-d2c1-4889-9123-1ef17a99bb3a'),
	('a813b22b-e0d8-471a-8238-7b52198d044c','a14a0e9f-4c25-427b-a0c4-81750658583b','5200f1c3-cd3d-4a7a-a98b-5e9f8d378f59'),
	('16937c47-7522-407c-83bb-ebaeae3e4e4f','a14a0e9f-4c25-427b-a0c4-81750658583b','c3b30149-8385-4a24-8229-16922293563d'),
	('3193bf1f-b2ef-49bc-a689-710292c8a1ae','a14a0e9f-4c25-427b-a0c4-81750658583b','2c0a704f-6392-4532-b246-86452f181642');

INSERT INTO "Users"
("id","name","username","email","phone","password")
VALUES
    ('988340d4-c9a5-4dbe-8f5d-f26555849533','Martín Pallares','mapallares','mapallares@unimagdalena.edu.co','+57 3004943431','$2a$10$5JddKfQloSx5lm6Bjd5z9O8tT4jDDh8atyl1ud4lgIUb/8Kflxjla'),
    ('a14a0e9f-4c25-427b-a0c4-81750658583b','Breiner Gonzalez','bmgonzalez','bmgonzalez@unimagdalena.edu.co','+57 3004943432','$2a$10$u7csLfC9Nvk7eem78Go95Ob4c1eWLqaa7X3LCeYY9punFMmywx9ee'),
    ('a9987249-b084-4eff-bf85-0d876c4120e7','Miguel Toscano','luistoscanoms','luistoscanoms@unimagdalena.edu.co','+57 3004943433','$2a$10$sW0WfDaJeEJzHx2jSo/H0em4ESIxLDVbMPO6MOeEYSf8bD222UP9a'),
    ('7e6e37d8-f4ab-4681-836f-6da9d35172d3','Johan Robles','jrobles','jrobles@trackr.gym','+57 3004943434','$2a$10$mJ74CNyVvhd1oGvrf7eBQOIlyd7j.81k6hvhvjGlVqGZ3SyGxGelq'),
    ('33e43e25-46c3-4d3e-8502-6d1379fe13f4','Ben Hazretleri','benhazretleri','benhazretleri@trackr.gym','+57 3004943435','$2a$10$Nw/A2Tcz9itBbWjAngTpa.QspKfA64iZChkYiHqOJfBBwoCLodoFy');

INSERT INTO "UsersRoles" 
("id","userId","roleId") 
VALUES
    ('161b328c-a168-45b9-8d8a-920ba5cdb954','988340d4-c9a5-4dbe-8f5d-f26555849533','988340d4-c9a5-4dbe-8f5d-f26555849533'),
    ('9e02cc15-868f-48c9-80b4-5e5303d430a5','a14a0e9f-4c25-427b-a0c4-81750658583b','988340d4-c9a5-4dbe-8f5d-f26555849533'),
    ('60f0e217-22e4-4b68-a4cc-4b29c081346e','a9987249-b084-4eff-bf85-0d876c4120e7','988340d4-c9a5-4dbe-8f5d-f26555849533'),
    ('7e6e37d8-f4ab-4681-836f-6da9d35172d3','7e6e37d8-f4ab-4681-836f-6da9d35172d3','a14a0e9f-4c25-427b-a0c4-81750658583b'),
    ('a7fe87a7-659d-427e-8e26-78a783b471b1','33e43e25-46c3-4d3e-8502-6d1379fe13f4','a14a0e9f-4c25-427b-a0c4-81750658583b');

INSERT INTO "Attributes"
("userId","key","value","type")
VALUES
    ('988340d4-c9a5-4dbe-8f5d-f26555849533','cargo','Desarrolador','string'),
    ('a14a0e9f-4c25-427b-a0c4-81750658583b','cargo','Desarrolador','string'),
    ('a9987249-b084-4eff-bf85-0d876c4120e7','cargo','Desarrolador','string');
