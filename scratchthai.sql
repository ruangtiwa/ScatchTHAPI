-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 11, 2020 at 04:37 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scratchthai`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `activity_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `status` varchar(255) NOT NULL,
  `learnerInfo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`activity_id`, `date`, `status`, `learnerInfo_id`) VALUES
(1, '2019-11-13 09:00:00', 'submitted', 3);

-- --------------------------------------------------------

--
-- Table structure for table `evaluation`
--

CREATE TABLE `evaluation` (
  `evaluation_id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `description` longtext,
  `activity_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `identification`
--

CREATE TABLE `identification` (
  `identification_id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `student_id` varchar(45) NOT NULL,
  `dateOfBirth` date NOT NULL,
  `age` int(11) NOT NULL,
  `learnerInfo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `learnerinformation`
--

CREATE TABLE `learnerinformation` (
  `learnerInformation_id` int(11) NOT NULL,
  `context` varchar(255) NOT NULL,
  `lessonplan_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `learnerinformation`
--

INSERT INTO `learnerinformation` (`learnerInformation_id`, `context`, `lessonplan_id`) VALUES
(2, 'grade4', 1),
(3, 'grade6', 1);

-- --------------------------------------------------------

--
-- Table structure for table `learningobject`
--

CREATE TABLE `learningobject` (
  `learningObject_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `technicalLocation` longtext NOT NULL,
  `activity_id` int(11) DEFAULT NULL,
  `lpComp_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `learningobject`
--

INSERT INTO `learningobject` (`learningObject_id`, `title`, `technicalLocation`, `activity_id`, `lpComp_id`) VALUES
(1, 'exercise1', 'https://scratch.mit.edu/exercise1', 1, 1),
(2, 'exercise2', 'https://scratch.mit.edu/projects/325576227', NULL, 2),
(3, 'exercise3', 'https://scratch.mit.edu/projects/325576227', NULL, 3);

-- --------------------------------------------------------

--
-- Table structure for table `lessonplan`
--

CREATE TABLE `lessonplan` (
  `lessonPlan_id` int(11) NOT NULL,
  `lessonPlanType` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `lessonplan`
--

INSERT INTO `lessonplan` (`lessonPlan_id`, `lessonPlanType`) VALUES
(1, 'sequence'),
(2, 'se'),
(3, 'seq');

-- --------------------------------------------------------

--
-- Table structure for table `lp_comp`
--

CREATE TABLE `lp_comp` (
  `lc_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `lp_comp`
--

INSERT INTO `lp_comp` (`lc_id`) VALUES
(1),
(2),
(3);

-- --------------------------------------------------------

--
-- Table structure for table `lp_lc`
--

CREATE TABLE `lp_lc` (
  `lplc_id` int(11) NOT NULL,
  `lp_id` int(11) DEFAULT NULL,
  `lc_id` int(11) DEFAULT NULL,
  `pre_id` int(11) DEFAULT NULL,
  `fol_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `lp_lc`
--

INSERT INTO `lp_lc` (`lplc_id`, `lp_id`, `lc_id`, `pre_id`, `fol_id`) VALUES
(1, 1, 1, NULL, 2),
(2, 1, 2, 1, 3),
(3, 1, 3, 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `result`
--

CREATE TABLE `result` (
  `result_id` int(11) NOT NULL,
  `score` varchar(45) NOT NULL,
  `grade` varchar(45) NOT NULL,
  `evaluation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `securitykey`
--

CREATE TABLE `securitykey` (
  `securityKey_id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `learnerInfo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `securitykey`
--

INSERT INTO `securitykey` (`securityKey_id`, `username`, `password`, `learnerInfo_id`) VALUES
(1, 'st001', '1234', 2),
(2, 'hathai', '120443', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`activity_id`),
  ADD KEY `learnerInfo_id` (`learnerInfo_id`);

--
-- Indexes for table `evaluation`
--
ALTER TABLE `evaluation`
  ADD PRIMARY KEY (`evaluation_id`),
  ADD KEY `activity_id` (`activity_id`);

--
-- Indexes for table `identification`
--
ALTER TABLE `identification`
  ADD PRIMARY KEY (`identification_id`),
  ADD KEY `learnerInfo_id` (`learnerInfo_id`);

--
-- Indexes for table `learnerinformation`
--
ALTER TABLE `learnerinformation`
  ADD PRIMARY KEY (`learnerInformation_id`),
  ADD KEY `lessonplan_id` (`lessonplan_id`);

--
-- Indexes for table `learningobject`
--
ALTER TABLE `learningobject`
  ADD PRIMARY KEY (`learningObject_id`),
  ADD KEY `learningobject_ibfk_1` (`activity_id`),
  ADD KEY `lpComId` (`lpComp_id`);

--
-- Indexes for table `lessonplan`
--
ALTER TABLE `lessonplan`
  ADD PRIMARY KEY (`lessonPlan_id`);

--
-- Indexes for table `lp_comp`
--
ALTER TABLE `lp_comp`
  ADD PRIMARY KEY (`lc_id`);

--
-- Indexes for table `lp_lc`
--
ALTER TABLE `lp_lc`
  ADD PRIMARY KEY (`lplc_id`),
  ADD KEY `a_lp_id` (`lp_id`),
  ADD KEY `a_lc_id` (`lc_id`),
  ADD KEY `a_self_pre` (`pre_id`),
  ADD KEY `a_self_fol` (`fol_id`);

--
-- Indexes for table `result`
--
ALTER TABLE `result`
  ADD PRIMARY KEY (`result_id`),
  ADD KEY `evaluation_id` (`evaluation_id`);

--
-- Indexes for table `securitykey`
--
ALTER TABLE `securitykey`
  ADD PRIMARY KEY (`securityKey_id`),
  ADD KEY `learnerInfo_id` (`learnerInfo_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `activity_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `evaluation`
--
ALTER TABLE `evaluation`
  MODIFY `evaluation_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `identification`
--
ALTER TABLE `identification`
  MODIFY `identification_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `learnerinformation`
--
ALTER TABLE `learnerinformation`
  MODIFY `learnerInformation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `learningobject`
--
ALTER TABLE `learningobject`
  MODIFY `learningObject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `lessonplan`
--
ALTER TABLE `lessonplan`
  MODIFY `lessonPlan_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `result`
--
ALTER TABLE `result`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `securitykey`
--
ALTER TABLE `securitykey`
  MODIFY `securityKey_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`learnerInfo_id`) REFERENCES `learnerinformation` (`learnerInformation_id`);

--
-- Constraints for table `evaluation`
--
ALTER TABLE `evaluation`
  ADD CONSTRAINT `evaluation_ibfk_1` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`activity_id`);

--
-- Constraints for table `identification`
--
ALTER TABLE `identification`
  ADD CONSTRAINT `identification_ibfk_1` FOREIGN KEY (`learnerInfo_id`) REFERENCES `learnerinformation` (`learnerInformation_id`);

--
-- Constraints for table `learnerinformation`
--
ALTER TABLE `learnerinformation`
  ADD CONSTRAINT `learnerinformation_ibfk_1` FOREIGN KEY (`lessonplan_id`) REFERENCES `lessonplan` (`lessonPlan_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `learningobject`
--
ALTER TABLE `learningobject`
  ADD CONSTRAINT `learningobject_ibfk_1` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`activity_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lpComId` FOREIGN KEY (`lpComp_id`) REFERENCES `lp_comp` (`lc_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lp_lc`
--
ALTER TABLE `lp_lc`
  ADD CONSTRAINT `a_lc_id` FOREIGN KEY (`lc_id`) REFERENCES `lp_comp` (`lc_id`),
  ADD CONSTRAINT `a_lp_id` FOREIGN KEY (`lp_id`) REFERENCES `lessonplan` (`lessonPlan_id`),
  ADD CONSTRAINT `a_self_fol` FOREIGN KEY (`fol_id`) REFERENCES `lp_lc` (`lplc_id`),
  ADD CONSTRAINT `a_self_pre` FOREIGN KEY (`pre_id`) REFERENCES `lp_lc` (`lplc_id`);

--
-- Constraints for table `result`
--
ALTER TABLE `result`
  ADD CONSTRAINT `result_ibfk_1` FOREIGN KEY (`evaluation_id`) REFERENCES `evaluation` (`evaluation_id`);

--
-- Constraints for table `securitykey`
--
ALTER TABLE `securitykey`
  ADD CONSTRAINT `securitykey_ibfk_1` FOREIGN KEY (`learnerInfo_id`) REFERENCES `learnerinformation` (`learnerInformation_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
