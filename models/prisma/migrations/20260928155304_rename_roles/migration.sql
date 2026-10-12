DELETE FROM "roles";

INSERT INTO "roles" ("name", "id") VALUES ('Team', 1422579667914854440);
INSERT INTO "roles" ("name", "id") VALUES ('Captain', 1424125799056806051);
INSERT INTO "roles" ("name", "id") VALUES ('Partner', 1442468154034094221);
INSERT INTO "roles" ("name", "id") VALUES ('Web', 1424126937290248302);
INSERT INTO "roles" ("name", "id") VALUES ('Penning', 1442980971505914056);

-- AlterEnum
ALTER TYPE "PartnerType" ADD VALUE 'NAME';
