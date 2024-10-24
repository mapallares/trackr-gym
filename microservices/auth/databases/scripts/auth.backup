--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Debian 16.4-1.pgdg120+1)
-- Dumped by pg_dump version 16.4 (Debian 16.4-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Attributes; Type: TABLE; Schema: public; Owner: tguser
--

CREATE TABLE public."Attributes" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "userId" uuid NOT NULL,
    key text NOT NULL,
    value text,
    type character varying(500) DEFAULT 'string'::character varying NOT NULL,
    "isVisible" boolean DEFAULT true NOT NULL,
    status text DEFAULT 'Created'::text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "createdBy" character varying(500) DEFAULT 'System'::character varying NOT NULL,
    "updatedAt" timestamp without time zone,
    "updatedBy" character varying(500),
    CONSTRAINT "Attributes_key_check" CHECK ((length(TRIM(BOTH FROM key)) > 0)),
    CONSTRAINT "Attributes_status_check" CHECK ((length(TRIM(BOTH FROM status)) > 0)),
    CONSTRAINT "Attributes_type_check" CHECK ((length(TRIM(BOTH FROM type)) > 0)),
    CONSTRAINT "CK_Attributes_InsertedBy_NotEmpty" CHECK ((length(TRIM(BOTH FROM "createdBy")) > 0)),
    CONSTRAINT "CK_Attributes_UpdatedAt" CHECK ((("updatedAt" IS NULL) OR ("updatedAt" >= "createdAt"))),
    CONSTRAINT "CK_Attributes_UpdatedAtCoherence" CHECK (((("updatedAt" IS NULL) AND ("updatedBy" IS NULL)) OR (("updatedAt" IS NOT NULL) AND ("updatedBy" IS NOT NULL)))),
    CONSTRAINT "CK_Attributes_UpdatedBy_NotEmpty" CHECK ((("updatedBy" IS NULL) OR (length(TRIM(BOTH FROM "updatedBy")) > 0)))
);


ALTER TABLE public."Attributes" OWNER TO tguser;

--
-- Name: BlockedTokens; Type: TABLE; Schema: public; Owner: tguser
--

CREATE TABLE public."BlockedTokens" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "userId" uuid NOT NULL,
    token text NOT NULL,
    expiration timestamp without time zone DEFAULT (now() + '1 day'::interval) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "createdBy" character varying(500) DEFAULT 'System'::character varying NOT NULL,
    "updatedAt" timestamp without time zone,
    "updatedBy" character varying(500),
    CONSTRAINT "CK_BlockedTokens_InsertedBy_NotEmpty" CHECK ((length(TRIM(BOTH FROM "createdBy")) > 0)),
    CONSTRAINT "CK_BlockedTokens_UpdatedAt" CHECK ((("updatedAt" IS NULL) OR ("updatedAt" >= "createdAt"))),
    CONSTRAINT "CK_BlockedTokens_UpdatedAtCoherence" CHECK (((("updatedAt" IS NULL) AND ("updatedBy" IS NULL)) OR (("updatedAt" IS NOT NULL) AND ("updatedBy" IS NOT NULL)))),
    CONSTRAINT "CK_BlockedTokens_UpdatedBy_NotEmpty" CHECK ((("updatedBy" IS NULL) OR (length(TRIM(BOTH FROM "updatedBy")) > 0)))
);


ALTER TABLE public."BlockedTokens" OWNER TO tguser;

--
-- Name: Permissions; Type: TABLE; Schema: public; Owner: tguser
--

CREATE TABLE public."Permissions" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(500) NOT NULL,
    description text NOT NULL,
    "typeId" uuid NOT NULL,
    status text DEFAULT 'Created'::text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "createdBy" character varying(500) DEFAULT 'System'::character varying NOT NULL,
    "updatedAt" timestamp without time zone,
    "updatedBy" character varying(500),
    CONSTRAINT "CK_Permissions_InsertedBy_NotEmpty" CHECK ((length(TRIM(BOTH FROM "createdBy")) > 0)),
    CONSTRAINT "CK_Permissions_UpdatedAt" CHECK ((("updatedAt" IS NULL) OR ("updatedAt" >= "createdAt"))),
    CONSTRAINT "CK_Permissions_UpdatedAtCoherence" CHECK (((("updatedAt" IS NULL) AND ("updatedBy" IS NULL)) OR (("updatedAt" IS NOT NULL) AND ("updatedBy" IS NOT NULL)))),
    CONSTRAINT "CK_Permissions_UpdatedBy_NotEmpty" CHECK ((("updatedBy" IS NULL) OR (length(TRIM(BOTH FROM "updatedBy")) > 0))),
    CONSTRAINT "Permissions_description_check" CHECK ((length(TRIM(BOTH FROM description)) > 0)),
    CONSTRAINT "Permissions_name_check" CHECK ((length(TRIM(BOTH FROM name)) > 0)),
    CONSTRAINT "Permissions_status_check" CHECK ((length(TRIM(BOTH FROM status)) > 0))
);


ALTER TABLE public."Permissions" OWNER TO tguser;

--
-- Name: Roles; Type: TABLE; Schema: public; Owner: tguser
--

CREATE TABLE public."Roles" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(500) NOT NULL,
    description text NOT NULL,
    "childOfId" uuid,
    status text DEFAULT 'Created'::text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "createdBy" character varying(500) DEFAULT 'System'::character varying NOT NULL,
    "updatedAt" timestamp without time zone,
    "updatedBy" character varying(500),
    CONSTRAINT "CK_Roles_InsertedBy_NotEmpty" CHECK ((length(TRIM(BOTH FROM "createdBy")) > 0)),
    CONSTRAINT "CK_Roles_UpdatedAt" CHECK ((("updatedAt" IS NULL) OR ("updatedAt" >= "createdAt"))),
    CONSTRAINT "CK_Roles_UpdatedAtCoherence" CHECK (((("updatedAt" IS NULL) AND ("updatedBy" IS NULL)) OR (("updatedAt" IS NOT NULL) AND ("updatedBy" IS NOT NULL)))),
    CONSTRAINT "CK_Roles_UpdatedBy_NotEmpty" CHECK ((("updatedBy" IS NULL) OR (length(TRIM(BOTH FROM "updatedBy")) > 0))),
    CONSTRAINT "Roles_description_check" CHECK ((length(TRIM(BOTH FROM description)) > 0)),
    CONSTRAINT "Roles_name_check" CHECK ((length(TRIM(BOTH FROM name)) > 0)),
    CONSTRAINT "Roles_status_check" CHECK ((length(TRIM(BOTH FROM status)) > 0))
);


ALTER TABLE public."Roles" OWNER TO tguser;

--
-- Name: RolesPermissions; Type: TABLE; Schema: public; Owner: tguser
--

CREATE TABLE public."RolesPermissions" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "roleId" uuid NOT NULL,
    "permissionId" uuid NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "createdBy" character varying(500) DEFAULT 'System'::character varying NOT NULL,
    "updatedAt" timestamp without time zone,
    "updatedBy" character varying(500),
    CONSTRAINT "CK_RolesPermissions_InsertedBy_NotEmpty" CHECK ((length(TRIM(BOTH FROM "createdBy")) > 0)),
    CONSTRAINT "CK_RolesPermissions_UpdatedAt" CHECK ((("updatedAt" IS NULL) OR ("updatedAt" >= "createdAt"))),
    CONSTRAINT "CK_RolesPermissions_UpdatedAtCoherence" CHECK (((("updatedAt" IS NULL) AND ("updatedBy" IS NULL)) OR (("updatedAt" IS NOT NULL) AND ("updatedBy" IS NOT NULL)))),
    CONSTRAINT "CK_RolesPermissions_UpdatedBy_NotEmpty" CHECK ((("updatedBy" IS NULL) OR (length(TRIM(BOTH FROM "updatedBy")) > 0)))
);


ALTER TABLE public."RolesPermissions" OWNER TO tguser;

--
-- Name: Types; Type: TABLE; Schema: public; Owner: tguser
--

CREATE TABLE public."Types" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(500) NOT NULL,
    description text NOT NULL,
    "isCreated" boolean DEFAULT false NOT NULL,
    "isReaded" boolean DEFAULT false NOT NULL,
    "isUpdated" boolean DEFAULT false NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    status text DEFAULT 'Created'::text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "createdBy" character varying(500) DEFAULT 'System'::character varying NOT NULL,
    "updatedAt" timestamp without time zone,
    "updatedBy" character varying(500),
    CONSTRAINT "CK_Types_InsertedBy_NotEmpty" CHECK ((length(TRIM(BOTH FROM "createdBy")) > 0)),
    CONSTRAINT "CK_Types_UpdatedAt" CHECK ((("updatedAt" IS NULL) OR ("updatedAt" >= "createdAt"))),
    CONSTRAINT "CK_Types_UpdatedAtCoherence" CHECK (((("updatedAt" IS NULL) AND ("updatedBy" IS NULL)) OR (("updatedAt" IS NOT NULL) AND ("updatedBy" IS NOT NULL)))),
    CONSTRAINT "CK_Types_UpdatedBy_NotEmpty" CHECK ((("updatedBy" IS NULL) OR (length(TRIM(BOTH FROM "updatedBy")) > 0))),
    CONSTRAINT "Types_description_check" CHECK ((length(TRIM(BOTH FROM description)) > 0)),
    CONSTRAINT "Types_name_check" CHECK ((length(TRIM(BOTH FROM name)) > 0)),
    CONSTRAINT "Types_status_check" CHECK ((length(TRIM(BOTH FROM status)) > 0))
);


ALTER TABLE public."Types" OWNER TO tguser;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: tguser
--

CREATE TABLE public."Users" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(500) NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    password text NOT NULL,
    "lastLogin" timestamp without time zone,
    "isOnline" boolean DEFAULT false NOT NULL,
    status text DEFAULT 'Created'::text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "registerDate" timestamp without time zone DEFAULT now() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "createdBy" character varying(500) DEFAULT 'System'::character varying NOT NULL,
    "updatedAt" timestamp without time zone,
    "updatedBy" character varying(500),
    CONSTRAINT "CK_Users_InsertedBy_NotEmpty" CHECK ((length(TRIM(BOTH FROM "createdBy")) > 0)),
    CONSTRAINT "CK_Users_UpdatedAt" CHECK ((("updatedAt" IS NULL) OR ("updatedAt" >= "createdAt"))),
    CONSTRAINT "CK_Users_UpdatedAtCoherence" CHECK (((("updatedAt" IS NULL) AND ("updatedBy" IS NULL)) OR (("updatedAt" IS NOT NULL) AND ("updatedBy" IS NOT NULL)))),
    CONSTRAINT "CK_Users_UpdatedBy_NotEmpty" CHECK ((("updatedBy" IS NULL) OR (length(TRIM(BOTH FROM "updatedBy")) > 0))),
    CONSTRAINT "Users_email_check" CHECK ((length(TRIM(BOTH FROM email)) > 0)),
    CONSTRAINT "Users_name_check" CHECK ((length(TRIM(BOTH FROM name)) > 0)),
    CONSTRAINT "Users_password_check" CHECK ((length(TRIM(BOTH FROM password)) > 0)),
    CONSTRAINT "Users_phone_check" CHECK ((length(TRIM(BOTH FROM phone)) > 0)),
    CONSTRAINT "Users_status_check" CHECK ((length(TRIM(BOTH FROM status)) > 0)),
    CONSTRAINT "Users_username_check" CHECK ((length(TRIM(BOTH FROM username)) > 0))
);


ALTER TABLE public."Users" OWNER TO tguser;

--
-- Name: UsersRoles; Type: TABLE; Schema: public; Owner: tguser
--

CREATE TABLE public."UsersRoles" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "userId" uuid NOT NULL,
    "roleId" uuid NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "createdBy" character varying(500) DEFAULT 'System'::character varying NOT NULL,
    "updatedAt" timestamp without time zone,
    "updatedBy" character varying(500),
    CONSTRAINT "CK_UsersRoles_InsertedBy_NotEmpty" CHECK ((length(TRIM(BOTH FROM "createdBy")) > 0)),
    CONSTRAINT "CK_UsersRoles_UpdatedAt" CHECK ((("updatedAt" IS NULL) OR ("updatedAt" >= "createdAt"))),
    CONSTRAINT "CK_UsersRoles_UpdatedAtCoherence" CHECK (((("updatedAt" IS NULL) AND ("updatedBy" IS NULL)) OR (("updatedAt" IS NOT NULL) AND ("updatedBy" IS NOT NULL)))),
    CONSTRAINT "CK_UsersRoles_UpdatedBy_NotEmpty" CHECK ((("updatedBy" IS NULL) OR (length(TRIM(BOTH FROM "updatedBy")) > 0)))
);


ALTER TABLE public."UsersRoles" OWNER TO tguser;

--
-- Data for Name: Attributes; Type: TABLE DATA; Schema: public; Owner: tguser
--

COPY public."Attributes" (id, "userId", key, value, type, "isVisible", status, "isActive", "createdAt", "createdBy", "updatedAt", "updatedBy") FROM stdin;
1e5d4409-db07-4715-923a-1240b006d4bb	988340d4-c9a5-4dbe-8f5d-f26555849533	cargo	Desarrolador	string	t	Created	t	2024-10-23 21:18:09.436394	System	\N	\N
303cca12-fac7-4b41-a0b0-dda5bcd8c4d3	a14a0e9f-4c25-427b-a0c4-81750658583b	cargo	Desarrolador	string	t	Created	t	2024-10-23 21:18:09.436394	System	\N	\N
d62078ec-ee16-4244-8ed2-be6fac2b9134	a9987249-b084-4eff-bf85-0d876c4120e7	cargo	Desarrolador	string	t	Created	t	2024-10-23 21:18:09.436394	System	\N	\N
\.


--
-- Data for Name: BlockedTokens; Type: TABLE DATA; Schema: public; Owner: tguser
--

COPY public."BlockedTokens" (id, "userId", token, expiration, "createdAt", "createdBy", "updatedAt", "updatedBy") FROM stdin;
\.


--
-- Data for Name: Permissions; Type: TABLE DATA; Schema: public; Owner: tguser
--

COPY public."Permissions" (id, name, description, "typeId", status, "isActive", "createdAt", "createdBy", "updatedAt", "updatedBy") FROM stdin;
988340d4-c9a5-4dbe-8f5d-f26555849533	CreateMembership	Allows creating new memberships	988340d4-c9a5-4dbe-8f5d-f26555849533	Created	t	2024-10-23 21:18:09.436394	System	\N	\N
a14a0e9f-4c25-427b-a0c4-81750658583b	ReadMembership	Allows reading membership details	a14a0e9f-4c25-427b-a0c4-81750658583b	Created	t	2024-10-23 21:18:09.436394	System	\N	\N
a9987249-b084-4eff-bf85-0d876c4120e7	UpdateMembership	Allows updating membership details	a9987249-b084-4eff-bf85-0d876c4120e7	Created	t	2024-10-23 21:18:09.436394	System	\N	\N
dc049c6c-cbc1-4ad1-9bdb-f7d825cb88ff	DeleteMembership	Allows deleting memberships	dc049c6c-cbc1-4ad1-9bdb-f7d825cb88ff	Created	t	2024-10-23 21:18:09.436394	System	\N	\N
211beac9-f42d-404e-85e5-85c727c39aa2	CreatePlan	Allows creating plans	988340d4-c9a5-4dbe-8f5d-f26555849533	Created	t	2024-10-23 21:18:09.436394	System	\N	\N
78f75af7-c994-429f-bf2a-5d786e5b4d58	UpdatePlan	Allows updating plans	a9987249-b084-4eff-bf85-0d876c4120e7	Created	t	2024-10-23 21:18:09.436394	System	\N	\N
6543ba14-7728-4c7e-9f3d-3febb39edc77	DeletePlan	Allows deleting plans	dc049c6c-cbc1-4ad1-9bdb-f7d825cb88ff	Created	t	2024-10-23 21:18:09.436394	System	\N	\N
5200f1c3-cd3d-4a7a-a98b-5e9f8d378f59	CreateUser	Allows creating users	988340d4-c9a5-4dbe-8f5d-f26555849533	Created	t	2024-10-23 21:18:09.436394	System	\N	\N
c3b30149-8385-4a24-8229-16922293563d	ReadUser	Allows reading users	a14a0e9f-4c25-427b-a0c4-81750658583b	Created	t	2024-10-23 21:18:09.436394	System	\N	\N
2c0a704f-6392-4532-b246-86452f181642	UpdateUser	Allows updating users	a9987249-b084-4eff-bf85-0d876c4120e7	Created	t	2024-10-23 21:18:09.436394	System	\N	\N
0f62274b-d2c1-4889-9123-1ef17a99bb3a	DeleteUser	Allows deleting users	dc049c6c-cbc1-4ad1-9bdb-f7d825cb88ff	Created	t	2024-10-23 21:18:09.436394	System	\N	\N
bb6f9fbd-75cd-42e3-87e5-962a297617ab	ReadPlan	Allows reading plans	a14a0e9f-4c25-427b-a0c4-81750658583b	Created	t	2024-10-23 21:18:09.436394	System	2024-10-24 05:00:42.975071	Martín Pallares
\.


--
-- Data for Name: Roles; Type: TABLE DATA; Schema: public; Owner: tguser
--

COPY public."Roles" (id, name, description, "childOfId", status, "isActive", "createdAt", "createdBy", "updatedAt", "updatedBy") FROM stdin;
988340d4-c9a5-4dbe-8f5d-f26555849533	Admin	Role with the highest level of access	\N	Created	t	2024-10-23 21:18:09.436394	System	\N	\N
a14a0e9f-4c25-427b-a0c4-81750658583b	User	Role for viewing content only	\N	Created	t	2024-10-23 21:18:09.436394	System	\N	\N
\.


--
-- Data for Name: RolesPermissions; Type: TABLE DATA; Schema: public; Owner: tguser
--

COPY public."RolesPermissions" (id, "roleId", "permissionId", "createdAt", "createdBy", "updatedAt", "updatedBy") FROM stdin;
5df19091-bffd-4559-876c-e72ea23ec348	988340d4-c9a5-4dbe-8f5d-f26555849533	988340d4-c9a5-4dbe-8f5d-f26555849533	2024-10-23 21:18:09.436394	System	\N	\N
ab0b8870-f5e2-48d2-9f1c-b32996358297	988340d4-c9a5-4dbe-8f5d-f26555849533	a14a0e9f-4c25-427b-a0c4-81750658583b	2024-10-23 21:18:09.436394	System	\N	\N
9f7cf182-dc66-4f14-a19e-f96b9f2cd150	988340d4-c9a5-4dbe-8f5d-f26555849533	a9987249-b084-4eff-bf85-0d876c4120e7	2024-10-23 21:18:09.436394	System	\N	\N
b70da47a-4ccc-420d-b4a4-f4b200847110	988340d4-c9a5-4dbe-8f5d-f26555849533	dc049c6c-cbc1-4ad1-9bdb-f7d825cb88ff	2024-10-23 21:18:09.436394	System	\N	\N
db334964-150f-462b-b5fc-068b4526f3b3	988340d4-c9a5-4dbe-8f5d-f26555849533	211beac9-f42d-404e-85e5-85c727c39aa2	2024-10-23 21:18:09.436394	System	\N	\N
b57c6551-2dc3-4dc3-9436-e91dfce003b3	988340d4-c9a5-4dbe-8f5d-f26555849533	bb6f9fbd-75cd-42e3-87e5-962a297617ab	2024-10-23 21:18:09.436394	System	\N	\N
e68e40d2-1727-4a22-aad7-882a9707912f	988340d4-c9a5-4dbe-8f5d-f26555849533	78f75af7-c994-429f-bf2a-5d786e5b4d58	2024-10-23 21:18:09.436394	System	\N	\N
c707ccbe-00e2-4836-85f3-66d7fa1ade60	988340d4-c9a5-4dbe-8f5d-f26555849533	6543ba14-7728-4c7e-9f3d-3febb39edc77	2024-10-23 21:18:09.436394	System	\N	\N
90de9f20-b817-4c1f-835f-4dd155cdd9c7	a14a0e9f-4c25-427b-a0c4-81750658583b	988340d4-c9a5-4dbe-8f5d-f26555849533	2024-10-23 21:18:09.436394	System	\N	\N
a3ac94e6-2596-4bf9-a4b7-9233e395e17e	a14a0e9f-4c25-427b-a0c4-81750658583b	a14a0e9f-4c25-427b-a0c4-81750658583b	2024-10-23 21:18:09.436394	System	\N	\N
e39cdd47-a079-42ab-952f-1459725727ad	a14a0e9f-4c25-427b-a0c4-81750658583b	a9987249-b084-4eff-bf85-0d876c4120e7	2024-10-23 21:18:09.436394	System	\N	\N
08b17a47-1b6c-4fd2-960d-bcffe636a9e2	a14a0e9f-4c25-427b-a0c4-81750658583b	dc049c6c-cbc1-4ad1-9bdb-f7d825cb88ff	2024-10-23 21:18:09.436394	System	\N	\N
e7342562-087d-443a-99dc-17ca23d15bb4	988340d4-c9a5-4dbe-8f5d-f26555849533	5200f1c3-cd3d-4a7a-a98b-5e9f8d378f59	2024-10-23 21:18:09.436394	System	\N	\N
f142da3f-48a6-48bb-adce-3b249ccd967d	988340d4-c9a5-4dbe-8f5d-f26555849533	c3b30149-8385-4a24-8229-16922293563d	2024-10-23 21:18:09.436394	System	\N	\N
45d0540f-373c-426a-b7b8-6c598898a4fb	988340d4-c9a5-4dbe-8f5d-f26555849533	2c0a704f-6392-4532-b246-86452f181642	2024-10-23 21:18:09.436394	System	\N	\N
2402b497-82af-40fc-9534-dab7630646e8	988340d4-c9a5-4dbe-8f5d-f26555849533	0f62274b-d2c1-4889-9123-1ef17a99bb3a	2024-10-23 21:18:09.436394	System	\N	\N
a813b22b-e0d8-471a-8238-7b52198d044c	a14a0e9f-4c25-427b-a0c4-81750658583b	5200f1c3-cd3d-4a7a-a98b-5e9f8d378f59	2024-10-23 21:18:09.436394	System	\N	\N
16937c47-7522-407c-83bb-ebaeae3e4e4f	a14a0e9f-4c25-427b-a0c4-81750658583b	c3b30149-8385-4a24-8229-16922293563d	2024-10-23 21:18:09.436394	System	\N	\N
3193bf1f-b2ef-49bc-a689-710292c8a1ae	a14a0e9f-4c25-427b-a0c4-81750658583b	2c0a704f-6392-4532-b246-86452f181642	2024-10-23 21:18:09.436394	System	\N	\N
3647a7da-1bcd-41e8-8600-c86b28bfe431	a14a0e9f-4c25-427b-a0c4-81750658583b	bb6f9fbd-75cd-42e3-87e5-962a297617ab	2024-10-24 04:25:56.320935	System	\N	\N
\.


--
-- Data for Name: Types; Type: TABLE DATA; Schema: public; Owner: tguser
--

COPY public."Types" (id, name, description, "isCreated", "isReaded", "isUpdated", "isDeleted", status, "isActive", "createdAt", "createdBy", "updatedAt", "updatedBy") FROM stdin;
988340d4-c9a5-4dbe-8f5d-f26555849533	Create	Allows creation of resources	t	f	f	f	Created	t	2024-10-23 21:18:09.436394	System	\N	\N
a14a0e9f-4c25-427b-a0c4-81750658583b	Read	Allows reading of resources	f	t	f	f	Created	t	2024-10-23 21:18:09.436394	System	\N	\N
a9987249-b084-4eff-bf85-0d876c4120e7	Update	Allows updating of resources	f	f	t	f	Created	t	2024-10-23 21:18:09.436394	System	\N	\N
dc049c6c-cbc1-4ad1-9bdb-f7d825cb88ff	Delete	Allows deletion of resources	f	f	f	t	Created	t	2024-10-23 21:18:09.436394	System	\N	\N
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: tguser
--

COPY public."Users" (id, name, username, email, phone, password, "lastLogin", "isOnline", status, "isActive", "registerDate", "createdAt", "createdBy", "updatedAt", "updatedBy") FROM stdin;
988340d4-c9a5-4dbe-8f5d-f26555849533	Martín Pallares	mapallares	mapallares@unimagdalena.edu.co	+57 3004943431	$2a$10$5JddKfQloSx5lm6Bjd5z9O8tT4jDDh8atyl1ud4lgIUb/8Kflxjla	\N	f	Created	t	2024-10-23 21:18:09.436394	2024-10-23 21:18:09.436394	System	\N	\N
a14a0e9f-4c25-427b-a0c4-81750658583b	Breiner Gonzalez	bmgonzalez	bmgonzalez@unimagdalena.edu.co	+57 3004943432	$2a$10$u7csLfC9Nvk7eem78Go95Ob4c1eWLqaa7X3LCeYY9punFMmywx9ee	\N	f	Created	t	2024-10-23 21:18:09.436394	2024-10-23 21:18:09.436394	System	\N	\N
a9987249-b084-4eff-bf85-0d876c4120e7	Miguel Toscano	luistoscanoms	luistoscanoms@unimagdalena.edu.co	+57 3004943433	$2a$10$sW0WfDaJeEJzHx2jSo/H0em4ESIxLDVbMPO6MOeEYSf8bD222UP9a	\N	f	Created	t	2024-10-23 21:18:09.436394	2024-10-23 21:18:09.436394	System	\N	\N
7e6e37d8-f4ab-4681-836f-6da9d35172d3	Johan Robles	jrobles	jrobles@trackr.gym	+57 3004943434	$2a$10$mJ74CNyVvhd1oGvrf7eBQOIlyd7j.81k6hvhvjGlVqGZ3SyGxGelq	\N	f	Created	t	2024-10-23 21:18:09.436394	2024-10-23 21:18:09.436394	System	\N	\N
33e43e25-46c3-4d3e-8502-6d1379fe13f4	Ben Hazretleri	benhazretleri	benhazretleri@trackr.gym	+57 3004943435	$2a$10$Nw/A2Tcz9itBbWjAngTpa.QspKfA64iZChkYiHqOJfBBwoCLodoFy	\N	f	Created	t	2024-10-23 21:18:09.436394	2024-10-23 21:18:09.436394	System	\N	\N
\.


--
-- Data for Name: UsersRoles; Type: TABLE DATA; Schema: public; Owner: tguser
--

COPY public."UsersRoles" (id, "userId", "roleId", "createdAt", "createdBy", "updatedAt", "updatedBy") FROM stdin;
161b328c-a168-45b9-8d8a-920ba5cdb954	988340d4-c9a5-4dbe-8f5d-f26555849533	988340d4-c9a5-4dbe-8f5d-f26555849533	2024-10-23 21:18:09.436394	System	\N	\N
9e02cc15-868f-48c9-80b4-5e5303d430a5	a14a0e9f-4c25-427b-a0c4-81750658583b	988340d4-c9a5-4dbe-8f5d-f26555849533	2024-10-23 21:18:09.436394	System	\N	\N
60f0e217-22e4-4b68-a4cc-4b29c081346e	a9987249-b084-4eff-bf85-0d876c4120e7	988340d4-c9a5-4dbe-8f5d-f26555849533	2024-10-23 21:18:09.436394	System	\N	\N
7e6e37d8-f4ab-4681-836f-6da9d35172d3	7e6e37d8-f4ab-4681-836f-6da9d35172d3	a14a0e9f-4c25-427b-a0c4-81750658583b	2024-10-23 21:18:09.436394	System	\N	\N
a7fe87a7-659d-427e-8e26-78a783b471b1	33e43e25-46c3-4d3e-8502-6d1379fe13f4	a14a0e9f-4c25-427b-a0c4-81750658583b	2024-10-23 21:18:09.436394	System	\N	\N
\.


--
-- Name: Attributes Attributes_pkey; Type: CONSTRAINT; Schema: public; Owner: tguser
--

ALTER TABLE ONLY public."Attributes"
    ADD CONSTRAINT "Attributes_pkey" PRIMARY KEY (id);


--
-- Name: BlockedTokens BlockedTokens_pkey; Type: CONSTRAINT; Schema: public; Owner: tguser
--

ALTER TABLE ONLY public."BlockedTokens"
    ADD CONSTRAINT "BlockedTokens_pkey" PRIMARY KEY (id);


--
-- Name: BlockedTokens BlockedTokens_token_key; Type: CONSTRAINT; Schema: public; Owner: tguser
--

ALTER TABLE ONLY public."BlockedTokens"
    ADD CONSTRAINT "BlockedTokens_token_key" UNIQUE (token);


--
-- Name: Permissions Permissions_name_key; Type: CONSTRAINT; Schema: public; Owner: tguser
--

ALTER TABLE ONLY public."Permissions"
    ADD CONSTRAINT "Permissions_name_key" UNIQUE (name);


--
-- Name: Permissions Permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: tguser
--

ALTER TABLE ONLY public."Permissions"
    ADD CONSTRAINT "Permissions_pkey" PRIMARY KEY (id);


--
-- Name: RolesPermissions RolesPermissions_pkey; Type: CONSTRAINT; Schema: public; Owner: tguser
--

ALTER TABLE ONLY public."RolesPermissions"
    ADD CONSTRAINT "RolesPermissions_pkey" PRIMARY KEY (id);


--
-- Name: Roles Roles_name_key; Type: CONSTRAINT; Schema: public; Owner: tguser
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_name_key" UNIQUE (name);


--
-- Name: Roles Roles_pkey; Type: CONSTRAINT; Schema: public; Owner: tguser
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY (id);


--
-- Name: Types Types_name_key; Type: CONSTRAINT; Schema: public; Owner: tguser
--

ALTER TABLE ONLY public."Types"
    ADD CONSTRAINT "Types_name_key" UNIQUE (name);


--
-- Name: Types Types_pkey; Type: CONSTRAINT; Schema: public; Owner: tguser
--

ALTER TABLE ONLY public."Types"
    ADD CONSTRAINT "Types_pkey" PRIMARY KEY (id);


--
-- Name: Attributes UQ_Attributes_User_Key; Type: CONSTRAINT; Schema: public; Owner: tguser
--

ALTER TABLE ONLY public."Attributes"
    ADD CONSTRAINT "UQ_Attributes_User_Key" UNIQUE ("userId", key);


--
-- Name: RolesPermissions UQ_RolesPermissions_Role_Permission; Type: CONSTRAINT; Schema: public; Owner: tguser
--

ALTER TABLE ONLY public."RolesPermissions"
    ADD CONSTRAINT "UQ_RolesPermissions_Role_Permission" UNIQUE ("roleId", "permissionId");


--
-- Name: UsersRoles UQ_UsersRoles_User_Role; Type: CONSTRAINT; Schema: public; Owner: tguser
--

ALTER TABLE ONLY public."UsersRoles"
    ADD CONSTRAINT "UQ_UsersRoles_User_Role" UNIQUE ("userId", "roleId");


--
-- Name: UsersRoles UsersRoles_pkey; Type: CONSTRAINT; Schema: public; Owner: tguser
--

ALTER TABLE ONLY public."UsersRoles"
    ADD CONSTRAINT "UsersRoles_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: tguser
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_phone_key; Type: CONSTRAINT; Schema: public; Owner: tguser
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_phone_key" UNIQUE (phone);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: tguser
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_username_key; Type: CONSTRAINT; Schema: public; Owner: tguser
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);


--
-- Name: Attributes Attributes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tguser
--

ALTER TABLE ONLY public."Attributes"
    ADD CONSTRAINT "Attributes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id);


--
-- Name: BlockedTokens BlockedTokens_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tguser
--

ALTER TABLE ONLY public."BlockedTokens"
    ADD CONSTRAINT "BlockedTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id);


--
-- Name: Permissions Permissions_typeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tguser
--

ALTER TABLE ONLY public."Permissions"
    ADD CONSTRAINT "Permissions_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES public."Types"(id);


--
-- Name: RolesPermissions RolesPermissions_permissionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tguser
--

ALTER TABLE ONLY public."RolesPermissions"
    ADD CONSTRAINT "RolesPermissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES public."Permissions"(id);


--
-- Name: RolesPermissions RolesPermissions_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tguser
--

ALTER TABLE ONLY public."RolesPermissions"
    ADD CONSTRAINT "RolesPermissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Roles"(id);


--
-- Name: Roles Roles_childOfId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tguser
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_childOfId_fkey" FOREIGN KEY ("childOfId") REFERENCES public."Roles"(id);


--
-- Name: UsersRoles UsersRoles_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tguser
--

ALTER TABLE ONLY public."UsersRoles"
    ADD CONSTRAINT "UsersRoles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Roles"(id);


--
-- Name: UsersRoles UsersRoles_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tguser
--

ALTER TABLE ONLY public."UsersRoles"
    ADD CONSTRAINT "UsersRoles_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id);


--
-- PostgreSQL database dump complete
--

