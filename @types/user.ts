/**
 * Represents the user that is to be sent to the client.
 *
 * TODO: add `token` field for JWT token.
 */
export type User = {
  /** ID of the user */
  id      : string;
  /** Username of the user */
  username: string;
  /** Email of the user */
  email   : string;
};

/**
 * Represents information that a user should have when registering.
 */
export type RegisterUser = {
  /** Username of the user */
  username: string;
  /** Email of the user */
  email   : string;
  /** Password of the user. It must be hashed/encoded for security reasons. */
  password: string;
};

/**
 * Represents information that a user should have when logging in.
 */
export type LoginUser = {
  /** Email of the user */
  email   : string;
  /** Password of the user */
  password: string;
};

