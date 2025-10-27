-- CreateTable
CREATE TABLE "roles" (
    "id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "role_id" BIGINT NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_user_id_role_id_key" ON "user_roles"("user_id", "role_id");

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Add current roles from discord
INSERT INTO roles (name, id) VALUES ('Design', 1316002102631202866);
INSERT INTO roles (name, id) VALUES ('Elec', 1316002716627107921);                                                                                                                    
INSERT INTO roles (name, id) VALUES ('carl-bot', 1316130798704918540);
INSERT INTO roles (name, id) VALUES ('muted', 1316131777802403941);
INSERT INTO roles (name, id) VALUES ('Jorien', 1316141627311652924);
INSERT INTO roles (name, id) VALUES ('Volunteer Elec', 1316146457841238016);
INSERT INTO roles (name, id) VALUES ('Volunteer Construction', 1316146594785136780);
INSERT INTO roles (name, id) VALUES ('Construction', 1362492932887805994);
INSERT INTO roles (name, id) VALUES ('Member', 1362493283464380487);
INSERT INTO roles (name, id) VALUES ('CenEka', 1396576990676521090);
INSERT INTO roles (name, id) VALUES ('PKarus', 1396577092111437824);
INSERT INTO roles (name, id) VALUES ('Energy', 1399034561475907634);
INSERT INTO roles (name, id) VALUES ('Volunteer Energy', 1419674361216106617);
INSERT INTO roles (name, id) VALUES ('Voltunteer Design', 1419674440354107494);
INSERT INTO roles (name, id) VALUES ('MATES', 1422578278811828264);
INSERT INTO roles (name, id) VALUES ('Autonomous', 1422579129315758130);
INSERT INTO roles (name, id) VALUES ('Volunteer Autonomous', 1422579377702699049);
INSERT INTO roles (name, id) VALUES ('CREW', 1422579667914854440);
INSERT INTO roles (name, id) VALUES ('IT', 1422686308253302874);
INSERT INTO roles (name, id) VALUES ('Kwacque', 1422741473891192895);
INSERT INTO roles (name, id) VALUES ('Captain', 1424125799056806051);
INSERT INTO roles (name, id) VALUES ('Web & IT', 1424126937290248302);
INSERT INTO roles (name, id) VALUES ('Volunteer', 1425829577686519840);
INSERT INTO roles (name, id) VALUES ('Sponsors', 1432120129415549162);