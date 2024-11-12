import { Schema } from "effect"
import { defineMutation, sql } from "@livestore/livestore"

export const createUser = defineMutation(
  "createUser",
  Schema.Struct({ id: Schema.String, name: Schema.String, email: Schema.String, created: Schema.Number, modified: Schema.Number }),
  [sql`INSERT INTO user (id, name, email, created, modified) VALUES ($id, $name, $email, $created, $modified)`]
)

export const createWorkspaceWithMemberAndRootFolders = defineMutation(
  "createWorkspaceWithMemberAndRootFolders",
  Schema.Struct({
    workspaceId: Schema.String,
    membershipId: Schema.String,
    folderId: Schema.String,
    folderMembershipId: Schema.String,
    personalFolderId: Schema.String,
    personalFolderMembershipId: Schema.String,
    name: Schema.String,
    created: Schema.Number,
    modified: Schema.Number,
    userId: Schema.String,
  }),
  [
    sql`INSERT INTO workspace (id, name, rootFolderId, created, modified) VALUES ($workspaceId, $name, $folderId, $created, $modified)`,
    sql`INSERT INTO workspaceMembership (id, userId, workspaceId, created, modified) VALUES ($membershipId, $userId, $workspaceId, $created, $modified)`,
    sql`INSERT INTO folder (id, name, workspaceId, created, modified) VALUES ($folderId, $name, $workspaceId, $created, $modified)`,
    sql`INSERT INTO folderMembership (id, workspaceId, userId, folderId, created, modified) VALUES ($folderMembershipId, $workspaceId, $userId, $folderId, $created, $modified)`,
    sql`INSERT INTO folder (id, name, workspaceId, created, modified, rootUserId) VALUES ($personalFolderId, 'My Files', $workspaceId, $created, $modified, $userId)`,
    sql`INSERT INTO folderMembership (id, workspaceId, userId, folderId, created, modified) VALUES ($personalFolderMembershipId, $workspaceId, $userId, $personalFolderId, $created, $modified)`,
  ]
)

export const createFileWithMembership = defineMutation(
  "createFileWithMembership",
  Schema.Struct({
    fileId: Schema.String,
    name: Schema.String,
    created: Schema.Number,
    modified: Schema.Number,
    membershipId: Schema.String,
    workspaceId: Schema.String,
    userId: Schema.String,
    folderId: Schema.String,
  }),
  [
    sql`INSERT INTO file (id, name, created, modified, workspaceId, folderId) VALUES ($fileId, $name, $created, $modified, $workspaceId, $folderId)`,
    sql`INSERT INTO fileMembership (id, userId, workspaceId, fileId, created, modified) VALUES ($membershipId, $userId, $workspaceId, $fileId, $created, $modified)`,
  ]
)

export const deleteFile = defineMutation("deleteFile", Schema.Struct({ id: Schema.String, deleted: Schema.Number }), [
  sql`UPDATE file SET deleted = $deleted WHERE id = $id`,
])

export const updateFileName = defineMutation("updateFileName", Schema.Struct({ id: Schema.String, name: Schema.String }), [
  sql`UPDATE file SET name = $name, modified = unixepoch() * 1000 WHERE id = $id`,
])

export const updateLastEditTime = defineMutation("updateLastEditTime", Schema.Struct({ id: Schema.String, modified: Schema.Number }), [
  sql`UPDATE file SET modified = $modified WHERE id = $id`,
])

export const createFolderWithMembership = defineMutation(
  "createFolderWithMembership",
  Schema.Struct({
    id: Schema.String,
    name: Schema.String,
    workspaceId: Schema.String,
    parentFolderId: Schema.String,
    userId: Schema.String,
    created: Schema.Number,
    modified: Schema.Number,
    membershipId: Schema.String,
  }),
  [
    sql`INSERT INTO folder (id, name, workspaceId, parentFolderId, created, modified) VALUES ($id, $name, $workspaceId, $parentFolderId, $created, $modified)`,
    sql`INSERT INTO folderMembership (id, userId, workspaceId, folderId, created, modified) VALUES ($membershipId, $userId, $workspaceId, $id, $created, $modified)`,
  ]
)

export const updateFolderName = defineMutation("updateFolderName", Schema.Struct({ id: Schema.String, name: Schema.String }), [
  sql`UPDATE folder SET name = $name, modified = unixepoch() * 1000 WHERE id = $id`,
])

export const updateFileIcon = defineMutation("updateFileIcon", Schema.Struct({ id: Schema.String, icon: Schema.String }), [
  sql`UPDATE file SET icon = $icon, modified = unixepoch() * 1000 WHERE id = $id`,
])

export const updateFileColor = defineMutation("updateFileColor", Schema.Struct({ id: Schema.String, color: Schema.String }), [
  sql`UPDATE file SET color = $color, modified = unixepoch() * 1000 WHERE id = $id`,
])

export const updateFolderColor = defineMutation("updateFolderColor", Schema.Struct({ id: Schema.String, color: Schema.String }), [
  sql`UPDATE folder SET color = $color, modified = unixepoch() * 1000 WHERE id = $id`,
])

export const favoriteFile = defineMutation(
  "favoriteFile",
  Schema.Struct({ id: Schema.String, userId: Schema.String, fileId: Schema.String, workspaceId: Schema.String }),
  [sql`INSERT INTO favorite (id, userId, fileId, workspaceId) VALUES ($id, $userId, $fileId, $workspaceId)`]
)

export const unfavoriteFile = defineMutation("unfavoriteFile", Schema.Struct({ fileId: Schema.String, userId: Schema.String }), [
  sql`DELETE FROM favorite WHERE userId = $userId AND fileId = $fileId`,
])

export const favoriteFolder = defineMutation(
  "favoriteFolder",
  Schema.Struct({ id: Schema.String, userId: Schema.String, folderId: Schema.String, workspaceId: Schema.String }),
  [sql`INSERT INTO favorite (id, userId, folderId, workspaceId) VALUES ($id, $userId, $folderId, $workspaceId)`]
)

export const unfavoriteFolder = defineMutation("unfavoriteFolder", Schema.Struct({ folderId: Schema.String, userId: Schema.String }), [
  sql`DELETE FROM favorite WHERE userId = $userId AND folderId = $folderId`,
])
