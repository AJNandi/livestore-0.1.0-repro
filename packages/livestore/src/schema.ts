import { DbSchema, makeSchema } from "@livestore/livestore"
import { Schema } from "effect"
import * as mutations from "./mutations"
import { IconColors, Icons } from "./types/icons"

export { mutations }

const file = DbSchema.table(
  "file",
  {
    id: DbSchema.text({ primaryKey: true }),
    name: DbSchema.text({ default: "Untitled" }),
    workspaceId: DbSchema.text(),
    created: DbSchema.integer({ default: { sql: `(strftime('%s','now'))` } }),
    modified: DbSchema.integer({ default: { sql: `(strftime('%s','now'))` } }),
    deleted: DbSchema.integer({ nullable: true }),
    folderId: DbSchema.text({}),
    icon: DbSchema.text({ default: Icons.TableCellsIcon }),
    color: DbSchema.text({ default: IconColors.Slate }),
  },
  {
    indexes: [
      { name: "file_created", columns: ["created"] },
      { name: "file_modified", columns: ["modified"] },
      { name: "file_folderId", columns: ["folderId"] },
    ],
    deriveMutations: true,
  }
)

const user = DbSchema.table(
  "user",
  {
    id: DbSchema.text({ primaryKey: true }),
    email: DbSchema.text(),
    name: DbSchema.text({ default: "Untitled user" }),
    created: DbSchema.integer({ default: { sql: `(strftime('%s','now'))` } }),
    modified: DbSchema.integer({ default: { sql: `(strftime('%s','now'))` } }),
    deleted: DbSchema.integer({ nullable: true }),
  },
  { deriveMutations: true }
)

const workspaceMembership = DbSchema.table(
  "workspaceMembership",
  {
    userId: DbSchema.text(),
    workspaceId: DbSchema.text(),
    role: DbSchema.text({ default: "member" }),
    created: DbSchema.integer({ default: { sql: `(strftime('%s','now'))` } }),
    modified: DbSchema.integer({ default: { sql: `(strftime('%s','now'))` } }),
    deleted: DbSchema.integer({ nullable: true }),
  },
  {
    indexes: [
      {
        name: "workspaceMembership_userId",
        columns: ["userId"],
      },
      {
        name: "workspaceMembership_workspaceId",
        columns: ["workspaceId"],
      },
    ],
    deriveMutations: true,
  }
)

const workspace = DbSchema.table(
  "workspace",
  {
    id: DbSchema.text({ primaryKey: true }),
    name: DbSchema.text({ default: "Untitled workspace" }),
    created: DbSchema.integer({ default: { sql: `(strftime('%s','now'))` } }),
    modified: DbSchema.integer({ default: { sql: `(strftime('%s','now'))` } }),
    deleted: DbSchema.integer({ nullable: true }),
    rootFolderId: DbSchema.text({}),
  },
  { deriveMutations: true }
)

const fileMembership = DbSchema.table(
  "fileMembership",
  {
    id: DbSchema.text({ primaryKey: true }),
    userId: DbSchema.text(),
    fileId: DbSchema.text(),
    workspaceId: DbSchema.text(),
    created: DbSchema.integer({ default: { sql: `(strftime('%s','now'))` } }),
    modified: DbSchema.integer({ default: { sql: `(strftime('%s','now'))` } }),
    deleted: DbSchema.integer({ nullable: true }),
  },
  {
    indexes: [
      { name: "fileMembership_userId", columns: ["userId"] },
      { name: "fileMembership_fileId", columns: ["fileId"] },
    ],
    deriveMutations: true,
  }
)

const folder = DbSchema.table(
  "folder",
  {
    id: DbSchema.text({ primaryKey: true }),
    name: DbSchema.text({ default: "Untitled Folder" }),
    workspaceId: DbSchema.text(),
    created: DbSchema.integer({ default: { sql: `(strftime('%s','now'))` } }),
    modified: DbSchema.integer({ default: { sql: `(strftime('%s','now'))` } }),
    parentFolderId: DbSchema.text({ nullable: true }),
    rootUserId: DbSchema.text({ nullable: true }),
    deleted: DbSchema.integer({ nullable: true }),
    icon: DbSchema.text({ default: Icons.FolderIcon }),
    color: DbSchema.text({ default: IconColors.Slate }),
  },
  {
    indexes: [
      { name: "folder_created", columns: ["created"] },
      { name: "folder_modified", columns: ["modified"] },
      { name: "folder_workspaceId", columns: ["workspaceId"] },
      { name: "folder_parentFolderId", columns: ["parentFolderId"] },
    ],
    deriveMutations: true,
  }
)

const folderMembership = DbSchema.table(
  "folderMembership",
  {
    id: DbSchema.text({ primaryKey: true }),
    userId: DbSchema.text(),
    folderId: DbSchema.text(),
    workspaceId: DbSchema.text(),
    created: DbSchema.integer({ default: { sql: `(strftime('%s','now'))` } }),
    modified: DbSchema.integer({ default: { sql: `(strftime('%s','now'))` } }),
    deleted: DbSchema.integer({ nullable: true }),
  },
  { deriveMutations: true }
)

const favorite = DbSchema.table(
  "favorite",
  {
    id: DbSchema.text({ primaryKey: true }),
    userId: DbSchema.text(),
    workspaceId: DbSchema.text(),
    fileId: DbSchema.text({ nullable: true }),
    folderId: DbSchema.text({ nullable: true }),
    deleted: DbSchema.integer({ nullable: true }),
  },
  {
    indexes: [{ name: "favorite_userId_workspaceId", columns: ["userId", "workspaceId"] }],
    deriveMutations: true,
  }
)

export type File = DbSchema.FromTable.RowDecoded<typeof file>
export type User = DbSchema.FromTable.RowDecoded<typeof user>
export type Workspace = DbSchema.FromTable.RowDecoded<typeof workspace>
export type Folder = DbSchema.FromTable.RowDecoded<typeof folder>
export type Favorite = DbSchema.FromTable.RowDecoded<typeof favorite>

export const ClientState = Schema.Struct({
  activeWorkspaceId: Schema.optional(Schema.String),
  activeUserId: Schema.optional(Schema.String),
})

export const clientStateTable = DbSchema.table("client_state", DbSchema.json({ schema: ClientState, default: {} }), {
  deriveMutations: { enabled: true, localOnly: true },
})

export const tables = {
  file,
  fileMembership,
  user,
  workspace,
  workspaceMembership,
  folder,
  folderMembership,
  favorite,
  clientState: clientStateTable,
}

export const schema = makeSchema({ tables, mutations, migrations: { strategy: "from-mutation-log" } })
