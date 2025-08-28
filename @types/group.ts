/**
 * Type representing the `group` table from MySQL.
 */
export type Group = {
  /** ID of the group. UUID for IDs. */
  id         : string;
  /** Name of the group. */
  name       : string;
  /** Description of the group. */
  description: string;
  /** ID of the user who created this group. */
  created_by : string;
  /** Date when the group was created. */
  created_at : Date;
};

/**
 * Necessary fields to insert a record.
 */
export type CreateGroup = {
  /** Name of the group. Max length 255. */
  name       : string;
  /** Description of the group. Max length 255. */
  description: string;
  /** ID of the user who created this group. */
  created_by : string;
};

export type Member = {
  /** UUID of the record */
  id       : string;
  /** UUID of the group member. */
  member_id: string;
  /** UUID of the group. */
  group_id : string;
  /** Date when the user joined that group. */
  joined_at: Date;
};

export type JoinGroup = Pick<Member, "group_id" | "member_id">;
