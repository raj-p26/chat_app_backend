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
