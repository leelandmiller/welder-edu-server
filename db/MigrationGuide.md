# Migration Guide/Shortcuts

#### **Run Migrations**: `npm run migrate`

#### **Undo Previous Migration:** `npm run undo-migrate`


You can revert back to initial state by undoing all migrations with db:migrate:undo:all command. You can also revert back to a specific migration by passing its name in --to option.
#### **Undo All:** `npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js`

#### **Create Model & Migration:** `npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string`

#### **Create Migration:** `npx sequelize-cli migration:generate --name migration-skeleton`
