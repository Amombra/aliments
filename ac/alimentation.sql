-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  ven. 29 mars 2019 à 00:35
-- Version du serveur :  10.1.32-MariaDB
-- Version de PHP :  7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `alimentation`
--

-- --------------------------------------------------------

--
-- Structure de la table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `categorie_produit` varchar(100) NOT NULL,
  `nom_produit` varchar(100) NOT NULL,
  `prix` int(11) NOT NULL,
  `localite_prod` varchar(100) NOT NULL,
  `email_marchand` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `customers`
--

INSERT INTO `customers` (`id`, `categorie_produit`, `nom_produit`, `prix`, `localite_prod`, `email_marchand`) VALUES
(3, 'LEGUMES', 'Aubergine', 500, 'KOUMASSI', 'boukary@gmail.com'),
(4, 'FRUITS', 'RAISINS', 700, 'PLATEU', 'ahmadou@gmail.com'),
(5, 'FEUILLES', 'EPINARD', 200, 'PORT BOUET', 'aadele@gmail.com'),
(6, 'TUBERCULES', 'MANIOC', 500, 'KOUMASSI', 'ahmadou@gmail.com'),
(7, 'CRUSTACES', 'CREVETTES', 1000, 'YOPOUGON', 'validation@gmail.com'),
(8, 'FRUITS', 'KIWI', 350, 'COCODY', 'yves@gmail.com'),
(9, 'TUBERCULES', 'POMMES DE TERRE ', 600, 'KOUMASSI', 'tyty@gmail.com'),
(10, 'FRUITS', 'obergine', 0, 'KOUMASSI', 'boukary@gmail.com'),
(11, 'TUBERCULES', 'MANIOC', 500, 'KOUMASSI', 'aadele@gmail.com'),
(12, 'FRUITS', 'Raisin', 1500, 'KOUMASSI', 'zedfg@mail.com'),
(13, 'FRUITS', 'Raisin', 1550, 'KOUMASSI', 'zertyui@gmail.com');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'admin', '$2a$10$k9rxGdXsjc/rhv9YLfzwd.91dq7UTAo8NOckXJ6L0rgOKpIabnRzK'),
(2, 'et1', '$2a$10$0kYzzb7IrImv4nHpeifhn.BFUJn6O81cnxPICKIQKixwygAHVAwN.'),
(3, 'Yohou Eunice', '$2a$10$2zBp8nZzgt1GHlREKTkIDugpXvwwWWngxyrFCVYBSou1Zn9HRcrge'),
(4, 'Fabiola', '$2a$10$edRGgE9/Yi2RzCRQevFI..bxofXpt35BFv6rj2bcvUCsHVJjM2DmK'),
(5, 'EUNICE RICHESSSE', '$2a$10$VFSV823/.pFKK6qOk/VweOPpf0nMwkBJVR5U3EA7uKUugdCT0mZN2'),
(6, 'aaaa', '$2a$10$qm85eeW7cPh1Lqm41Gscm./ynJgyfxSDd1iP.L6BbOfMaypvXWUUa'),
(7, 'bbb', '$2a$10$eVWjeWGGCsempkdERhRL2ObmVat2bPCTfdC/98VxeNtTkpbYEHKTe'),
(8, 'Ahou', '$2a$10$Yyd80MlKtrszAVLRozcOWOVB7P.s2cIBursS9ApqtMoiHOlVqmmF.'),
(9, 'eee', '$2a$10$0a4Fd8ySTHVMsnZMzQoJd.qvLYFyQu2CtzoNo/kZIBzVF1T1ArxGi'),
(10, 'ttt', '$2a$10$m1MG/3ggeHm868PAQlvcw.bWradQTvQrqQIgtjRtP74hZto6blkfi'),
(11, 'yyy', '$2a$10$o4.a7zK8GiAnh.MylSvlhe2u8H9xXK3a.M1CMZzO1gmcIDtGhv/lC'),
(12, 'kkk', '$2a$10$/te0A3tpXFre0GkGQ20J1OoivFbJJ2gvPodxYn3IZxuQFnmZ4ACES'),
(13, 'apo', '$2a$10$ko3zPa5BlVlVZR52rEGJHu3CJJF50TCh2LQYbCVXSyyrEohnJeAoe'),
(14, 'Liliane', '$2a$10$vSIyrAeDDq7FfMaMh9Pnf.pVOakuk19DnE9s0Cq.gMoqm.FYOut2i'),
(15, 'Marie', '$2a$10$olJ2yk9Js7Dw/y09.BfQHeXTgG//khGcIJVjQHNQc7gT/b5paWY3G'),
(16, 'pop', '$2a$10$SBPVDHZEunkEXPJs6ksXsubceVq9iOMolXfw6bWBtSzajSUjfbIua'),
(17, 'audite', '$2a$10$wQDlfj.y1CgQ9UBX40rcKeJug6YKu8ITqhB05pRSRJknqK/lnU6xe'),
(18, 'aline', '$2a$10$wjjW4E7pRYnDZVev0naBY.pONfXCGJ64rNfuZWKiIjunC5dsDgnTC'),
(19, 'eline', '$2a$10$zlhitPSxkIvJCmD0MA0e7Os8Wdtiqvc9yw01rK9QtDCCrp6g4hAYW');

-- --------------------------------------------------------

--
-- Structure de la table `valide`
--

CREATE TABLE `valide` (
  `id` int(11) NOT NULL,
  `categorie_produit_acc` varchar(100) NOT NULL,
  `nom_produit_acc` varchar(100) NOT NULL,
  `prix_acc` int(11) NOT NULL,
  `localite_prod_acc` varchar(255) NOT NULL,
  `email_marchand_acc` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `valide`
--

INSERT INTO `valide` (`id`, `categorie_produit_acc`, `nom_produit_acc`, `prix_acc`, `localite_prod_acc`, `email_marchand_acc`) VALUES
(1, 'Céréales', 'mil', 100, 'COCODY SAINT JEAN', 'ahmeddiallo@gmail.com'),
(2, 'Céréales', 'mil', 500, 'COCODY SAINT JEAN', 'ahmeddiallo@gmail.com'),
(3, 'LEGUMES', 'OIGNONS', 400, 'KOUMASSI SICOGI', 'ibrahim@gmail.com'),
(4, 'LEGUMES', 'piment', 700, 'KOUMASSI SICOGI', 'sdfghj@gmail.com');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `valide`
--
ALTER TABLE `valide`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `valide`
--
ALTER TABLE `valide`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
