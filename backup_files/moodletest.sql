-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Nov 12. 00:37
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
  `correct_incorrect` enum('correct','incorrect') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `answers`
--

INSERT INTO `answers` (`id`, `completion_id`, `text`, `correct_incorrect`) VALUES
(1, NULL, 'We dont want to know', 'correct');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `completion`
--

CREATE TABLE `completion` (
  `id` int(11) NOT NULL,
  `test_id` int(11) DEFAULT NULL,
  `completer_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `score` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `completion`
--

INSERT INTO `completion` (`id`, `test_id`, `completer_id`, `date`, `score`) VALUES
(1, 1, 2, '2023-11-10', NULL),
(2, 1, 1, '2023-11-10', 3),
(3, 1, 2, '2023-11-11', 0),
(4, 1, 2, '2023-11-11', 0),
(5, 1, 2, '2023-11-11', 0),
(6, 1, 2, '2023-11-11', 0);

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
(1, 1, 'Who are they?', 3, 'We dont want to know', 'Aliens', 'Cows'),
(2, 1, 'Why do they need cows?', 3, 'We dont know', 'Milk', 'Meat'),
(3, 1, 'What do they drive?', 3, 'Spaceship', 'Car', 'They walk on foot'),
(17, 2, 'Powerhouse of a cell?', 3, 'Mitochondria', 'Battery', 'Idunno');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `creator_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `creationdate` date DEFAULT NULL,
  `minpoint` int(11) DEFAULT NULL,
  `noq` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `test`
--

INSERT INTO `test` (`id`, `creator_id`, `name`, `creationdate`, `minpoint`, `noq`) VALUES
(1, 2, 'Axerwaliaks', '2023-11-08', 3, 3),
(2, 3, 'Bios 103', '2023-11-08', 5, 4),
(3, 2, 'Biggest test ever', '2023-11-10', 10, 5),
(4, 2, 'Are there really aliens?', '2023-11-10', 3, 1),
(5, 3, 'Calculus 3 midterm', '2023-11-10', 8, 5),
(6, 2, 'Database Querys', '2023-11-10', 3, 4),
(7, 2, 'Soy', '2023-11-10', 3, 3),
(11, 2, 'Circuits 2', '2023-11-11', 3, 2),
(12, 2, 'New Begginings', '2023-11-11', 2, 3);

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
(1, 'Kis Béla', 'probela', 'password1', 'ROLE_STUDENT', 0),
(2, 'Csete Medárd', 'medi', 'csetemedard', 'ROLE_ADMIN', 0),
(3, 'Karen Néni', 'karen', 'password3', 'ROLE_TEACHER', 0),
(4, 'Vicc Elek', 'elekgaming', 'elekgaming2008', 'ROLE_STUDENT', 0),
(5, 'Nig Bigga', 'Bign', '123asd', 'ROLE_STUDENT', 0),
(6, 'Nagy János', 'coolman48', 'janospass', 'ROLE_STUDENT', 0),
(7, 'Nagy Feri', 'feri', 'jelszo', 'ROLE_STUDENT', 0);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `completion`
--
ALTER TABLE `completion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `question`
--
ALTER TABLE `question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT a táblához `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`completion_id`) REFERENCES `completion` (`id`);

--
-- Megkötések a táblához `completion`
--
ALTER TABLE `completion`
  ADD CONSTRAINT `completion_ibfk_1` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`),
  ADD CONSTRAINT `completion_ibfk_2` FOREIGN KEY (`completer_id`) REFERENCES `user` (`id`);

--
-- Megkötések a táblához `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`);

--
-- Megkötések a táblához `test`
--
ALTER TABLE `test`
  ADD CONSTRAINT `test_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
