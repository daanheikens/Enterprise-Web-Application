CREATE TABLE IF NOT EXISTS `users_games` (
`user_id` BIGINT(20) NOT NULL,
`game_id` BIGINT(20) NOT NULL,
PRIMARY KEY (`user_id`,`game_id`),
KEY `fk_user` (`user_id`),
KEY `fk_game` (`game_id`),
CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
CONSTRAINT `fk_game` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`)
);
