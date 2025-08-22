CREATE TABLE `users` (
  `id` varchar(36) NOT NULL PRIMARY KEY,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `inserted_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE UNIQUE INDEX email_index ON `users`(`email`);
CREATE UNIQUE INDEX group_name_idx ON `groups`(`name`);

