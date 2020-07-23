# Migration & DB Guide/Shortcuts

#### **Run Migrations**: 
`npm run migrate`

This will run any pending migrations.

---

#### **Check Migration Status:**
`npm run migrate-status`

Displays the status of all migration files.

---

#### **Undo Previous Migration:** 
`npm run migrate-undo`

Undo the previous migration file.

---

#### **Undo All:** 
`sequelize db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js`

You can revert back to initial state by undoing all migrations with db:migrate:undo:all command. You can also revert back to a specific migration by passing its name in --to option.

---

#### **Create Model & Migration:** 
`sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string`

Creates a model file and migration with the supplied name and supplied attributes.

---

#### **Create Migration:** 
`sequelize migration:generate --name migration-**skeleton**`

Creates a migration file with the supplied file name.

---

#### **Connect to DB in psql**: `
`psql DBUSER DBUSER`