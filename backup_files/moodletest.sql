-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Nov 19. 22:35
-- Kiszolgáló verziója: 10.4.27-MariaDB
-- PHP verzió: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `moodletest`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `answers`
--

CREATE TABLE `answers` (
  `id` int(11) NOT NULL,
  `completion_id` int(11) DEFAULT NULL,
  `text` text DEFAULT NULL,
  `correct_incorrect` enum('correct','incorrect') DEFAULT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `answers`
--

INSERT INTO `answers` (`id`, `completion_id`, `text`, `correct_incorrect`, `score`) VALUES
(95, 58, 'SELECT', 'correct', 3),
(96, 58, 'Searches for a pattern in a text', 'correct', 3),
(97, 58, 'Better understanding of the table structure', 'correct', 3),
(98, 59, 'GET', 'incorrect', 0),
(99, 59, 'Compares 2 numbers', 'incorrect', 0),
(100, 59, 'Better understanding of the table structure', 'correct', 3),
(101, 60, '4', 'correct', 2),
(102, 60, '3, 4', 'incorrect', 0),
(103, 62, 'Humans', 'incorrect', 0),
(104, 62, 'Cows', 'incorrect', 0),
(105, 63, 'SELECT', 'correct', 3),
(106, 63, 'Searches for a pattern in a text', 'correct', 3),
(107, 63, 'To have something to hang out for our wall', 'incorrect', 0),
(108, 64, 'x^3+x+3*34', 'incorrect', 0),
(109, 64, '2, 152', 'incorrect', 0),
(110, 65, '4', 'correct', 2),
(111, 65, '3, 4', 'incorrect', 0),
(112, 66, '4', 'correct', 2),
(113, 66, 'Idunno', 'correct', 2),
(114, 67, 'We dont know', 'correct', 2),
(115, 67, 'We dont want to know', 'correct', 2),
(116, 68, 'SELECT', 'correct', 3),
(117, 68, 'Compares 2 numbers', 'incorrect', 0),
(118, 68, 'Making the world a better place', 'incorrect', 0),
(119, 69, 'SELECT', 'correct', 3),
(120, 69, 'Searches for a pattern in a text', 'correct', 3),
(121, 69, 'Better understanding of the table structure', 'correct', 3),
(122, 70, '4', 'correct', 2),
(123, 70, 'Idunno', 'correct', 2),
(124, 71, 'Aliens', 'incorrect', 0),
(125, 71, 'Scientific problems to solve', 'incorrect', 0),
(126, 72, 'We dont know', 'correct', 2),
(127, 72, 'We dont want to know', 'correct', 2),
(128, 73, 'SELECT', 'correct', 3),
(129, 73, 'Compares 2 numbers', 'incorrect', 0),
(130, 73, 'To have something to hang out for our wall', 'incorrect', 0),
(131, 74, '4', 'correct', 2),
(132, 74, 'Idunno', 'correct', 2),
(133, 75, 'SELECT', 'correct', 3),
(134, 75, 'Searches for a pattern in a text', 'correct', 3),
(135, 75, 'Better understanding of the table structure', 'correct', 3),
(136, 76, 'We dont know', 'correct', 2),
(137, 76, 'Cows', 'incorrect', 0),
(138, 77, 'We dont know', 'correct', 2),
(139, 77, 'We dont want to know', 'correct', 2),
(140, 78, 'SELECT', 'correct', 3),
(141, 78, 'Searches for a pattern in a text', 'correct', 3),
(142, 78, 'Better understanding of the table structure', 'correct', 3),
(143, 79, 'We dont know', 'correct', 2),
(144, 79, 'We dont want to know', 'correct', 2),
(145, 80, 'x^3+x+3*34', 'incorrect', 0),
(146, 80, '3, 4', 'incorrect', 0),
(147, 81, 'GET', 'incorrect', 0),
(148, 81, 'Searches for a pattern in a text', 'correct', 3),
(149, 81, 'Better understanding of the table structure', 'correct', 3),
(150, 82, 'GRAB', 'incorrect', 0),
(151, 82, 'Puts our records in the favorites section', 'incorrect', 0),
(152, 82, 'Making the world a better place', 'incorrect', 0),
(153, 83, 'GRAB', 'incorrect', 0),
(154, 83, 'Searches for a pattern in a text', 'correct', 3),
(155, 83, 'Better understanding of the table structure', 'correct', 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `completion`
--

CREATE TABLE `completion` (
  `id` int(11) NOT NULL,
  `test_id` int(11) DEFAULT NULL,
  `completer_id` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `score` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `completion`
--

INSERT INTO `completion` (`id`, `test_id`, `completer_id`, `date`, `score`) VALUES
(58, 24, 13, '2023-11-19 15:43:24', 9),
(59, 24, 13, '2023-11-19 15:43:45', 3),
(60, 25, 13, '2023-11-19 15:51:41', 2),
(62, 33, 13, '2023-11-19 15:52:37', 0),
(63, 24, 9, '2023-11-19 15:55:11', 6),
(64, 25, 9, '2023-11-19 15:55:26', 0),
(65, 25, 9, '2023-11-19 15:55:36', 2),
(66, 25, 9, '2023-11-19 15:55:45', 4),
(67, 33, 9, '2023-11-19 15:55:56', 4),
(68, 24, 9, '2023-11-19 16:04:03', 3),
(69, 24, 14, '2023-11-19 16:05:34', 9),
(70, 25, 14, '2023-11-19 16:05:44', 4),
(71, 33, 14, '2023-11-19 16:06:01', 0),
(72, 33, 14, '2023-11-19 16:06:14', 4),
(73, 24, 15, '2023-11-19 16:08:12', 3),
(74, 25, 15, '2023-11-19 16:08:22', 4),
(75, 24, 15, '2023-11-19 16:08:30', 9),
(76, 33, 15, '2023-11-19 16:08:49', 2),
(77, 33, 15, '2023-11-19 16:09:00', 4),
(78, 24, 16, '2023-11-19 16:12:48', 9),
(79, 33, 16, '2023-11-19 16:13:01', 4),
(80, 25, 16, '2023-11-19 16:13:11', 0),
(81, 24, 9, '2023-11-19 16:15:11', 6),
(82, 24, 9, '2023-11-19 16:15:28', 0),
(83, 24, 9, '2023-11-19 16:39:01', 6);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `question`
--

CREATE TABLE `question` (
  `id` int(11) NOT NULL,
  `test_id` int(11) DEFAULT NULL,
  `text` text DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `correct_answer` text DEFAULT NULL,
  `wrong_answer1` text DEFAULT NULL,
  `wrong_answer2` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `question`
--

INSERT INTO `question` (`id`, `test_id`, `text`, `score`, `correct_answer`, `wrong_answer1`, `wrong_answer2`) VALUES
(61, 24, 'What keyword is use to get information from a table?', 3, 'SELECT', 'GET', 'GRAB'),
(62, 24, 'What does LIKE do?', 3, 'Searches for a pattern in a text', 'Compares 2 numbers', 'Puts our records in the favorites section'),
(63, 24, 'Relations scemes are important for...', 3, 'Better understanding of the table structure', 'To have something to hang out for our wall', 'Making the world a better place'),
(64, 25, '2 + 2 = ?', 2, '4', 'x^3+x+3*34', '22'),
(65, 26, 'Powerhouse of the cell?', 3, 'Mitochondria', 'Batteries', 'Generator'),
(66, 25, 'Find the values of x and y: 3x+yi = 5x+1+2i', 2, 'Idunno', '3, 4', '2, 152'),
(67, 26, 'How many bones does a human have? (usually)', 3, '206', '210', '3'),
(68, 33, 'What are they?', 2, 'We dont know', 'Aliens', 'Humans'),
(69, 33, 'What do they want?', 2, 'We dont want to know', 'Cows', 'Scientific problems to solve'),
(70, 26, 'How many legs does a chair have?', 8, '1', '5', '622');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `creator_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `creationdate` datetime DEFAULT NULL,
  `minpoint` int(11) DEFAULT NULL,
  `noq` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `test`
--

INSERT INTO `test` (`id`, `creator_id`, `name`, `creationdate`, `minpoint`, `noq`) VALUES
(24, 9, 'Databases', '2023-11-19 15:07:43', 3, 3),
(25, 9, 'Math Finals', '2023-11-19 15:08:24', 2, 2),
(26, 9, 'Biology 101', '2023-11-19 15:11:20', 2, 3),
(33, 13, 'Axerwaliaks', '2023-11-19 15:41:25', 2, 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT 'ROLE_STUDENT',
  `loggedin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`id`, `name`, `username`, `password`, `role`, `loggedin`) VALUES
(9, 'Admin', 'Admin', '$2b$10$AF23N8uptxYxwFzk/7g1euNZUpjzs2IN5gJK0r07lz63aTtGOZa7i', 'ROLE_ADMIN', 0),
(11, 'Vicc Elek', 'viccelek', '$2b$10$FvZtzO7RLvUf7NloSJ.aGu69hJ/5xyS7SoKm6gu9lshbqsU4sjae2', 'ROLE_STUDENT', 0),
(12, 'Merenc Ferenc', 'merenc', '$2b$10$QjGjtq8xA25sFaVD1fz6Vug4i2ifEuMQ7SASsZ./gg5gvt6Hw5FXm', 'ROLE_STUDENT', 0),
(13, 'Karen Smith', 'MrsKaren', '$2b$10$9z75rnbDtTWCUOUsIQPuNOQ.7uOV63xyrAeZ/ffm/8kFwV83aWRmG', 'ROLE_TEACHER', 0),
(14, 'Csete Medárd', 'medi', '$2b$10$O6.pQ9MIcT18BzkI0aFc5O3yeYE5dZzbV0sRaqXlXx9DyQRTQqsAe', 'ROLE_STUDENT', 0),
(15, 'Felhő Dorina', 'felho', '$2b$10$UA3GPDSdh4P/4UlloRqZ8.npYbZTkwIk8NMg.Ead7PcEv89RMz1i.', 'ROLE_TEACHER', 0),
(16, 'Paprika Jancsi', 'pjani', '$2b$10$DgmTFlGmVsWgGBPAWrhDiey3heuCsLcoM6nv9UMr.zccIDUjHiw7G', 'ROLE_STUDENT', 0);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `completion_id` (`completion_id`);

--
-- A tábla indexei `completion`
--
ALTER TABLE `completion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `test_id` (`test_id`),
  ADD KEY `completer_id` (`completer_id`);

--
-- A tábla indexei `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`),
  ADD KEY `test_id` (`test_id`);

--
-- A tábla indexei `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`),
  ADD KEY `creator_id` (`creator_id`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- AUTO_INCREMENT a táblához `completion`
--
ALTER TABLE `completion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT a táblához `question`
--
ALTER TABLE `question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT a táblához `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`completion_id`) REFERENCES `completion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `completion`
--
ALTER TABLE `completion`
  ADD CONSTRAINT `completion_ibfk_1` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `completion_ibfk_2` FOREIGN KEY (`completer_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `test`
--
ALTER TABLE `test`
  ADD CONSTRAINT `test_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
