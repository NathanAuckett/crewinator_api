CREATE DATABASE `crewinator` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE `crewinator.event_invites` (
  `event_invite_id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `user_id` int NOT NULL,
  `status` enum('pending','accepted','declined','maybe') NOT NULL,
  `invite_date` datetime NOT NULL,
  PRIMARY KEY (`event_invite_id`),
  KEY `event_users_event_idx` (`event_id`),
  KEY `event_users_user_idx` (`user_id`),
  CONSTRAINT `event_users_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `event_users_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `crewinator.events` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL,
  `creator_user_id` int NOT NULL,
  `start_date_time` datetime NOT NULL,
  `creation_Date` datetime NOT NULL,
  `last_update` datetime NOT NULL,
  `image_url` text,
  PRIMARY KEY (`event_id`),
  KEY `events_users_idx` (`creator_user_id`),
  CONSTRAINT `events_users` FOREIGN KEY (`creator_user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `crewinator.friends` (
  `friend_id` int NOT NULL AUTO_INCREMENT,
  `user_id1` int NOT NULL,
  `user_id2` int NOT NULL,
  `status` enum('pending','accepted','declined','removed') NOT NULL,
  `request_date` datetime NOT NULL,
  PRIMARY KEY (`friend_id`),
  KEY `friend_user_id1_idx` (`user_id1`),
  KEY `friend_user_id2_idx` (`user_id2`),
  CONSTRAINT `friend_user_id1` FOREIGN KEY (`user_id1`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `friend_user_id2` FOREIGN KEY (`user_id2`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `crewinator.game_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `game_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `game_users_game_idx` (`game_id`),
  KEY `game_users_user_idx` (`user_id`),
  CONSTRAINT `game_users_game` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`) ON DELETE CASCADE,
  CONSTRAINT `game_users_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `crewinator.games` (
  `game_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image_url` text,
  `creation_date` datetime NOT NULL,
  `last_update` datetime NOT NULL,
  `is_igdb_game` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`game_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3292 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `crewinator.users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `creation_date` datetime NOT NULL,
  `last_update` datetime NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
