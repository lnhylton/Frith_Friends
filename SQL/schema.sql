-- MySQL dump 10.13  Distrib 8.2.0, for Win64 (x86_64)
--
-- Host: localhost    Database: frith_friends
-- ------------------------------------------------------
-- Server version       8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `consumable`
--

DROP TABLE IF EXISTS `consumable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumable` (
  `c_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(63) NOT NULL,
  `datasheet` varchar(255) DEFAULT NULL,
  `category` varchar(31) DEFAULT NULL,
  `raw_material` tinyint(1) DEFAULT NULL,
  `stock` varchar(31) DEFAULT NULL,
  `guide` varchar(255) DEFAULT NULL,
  `hidden` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `consumable_changes`
--

DROP TABLE IF EXISTS `consumable_changes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumable_changes` (
  `c_time_id` int NOT NULL AUTO_INCREMENT,
  `c_id` int DEFAULT NULL,
  `name` varchar(63) NOT NULL,
  `datasheet` varchar(255) DEFAULT NULL,
  `category` varchar(31) DEFAULT NULL,
  `raw_material` tinyint(1) DEFAULT NULL,
  `stock` varchar(31) DEFAULT NULL,
  `guide` varchar(255) DEFAULT NULL,
  `hidden` tinyint(1) DEFAULT NULL,
  `change_timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`c_time_id`),
  KEY `c_id` (`c_id`),
  CONSTRAINT `consumable_changes_ibfk_1` FOREIGN KEY (`c_id`) REFERENCES `consumable` (`c_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `consumable_location`
--

DROP TABLE IF EXISTS `consumable_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumable_location` (
  `c_id` int NOT NULL,
  `r_id` int NOT NULL,
  `sm_id` int NOT NULL,
  PRIMARY KEY (`c_id`,`r_id`,`sm_id`),
  KEY `r_id` (`r_id`),
  KEY `sm_id` (`sm_id`),
  CONSTRAINT `consumable_location_ibfk_1` FOREIGN KEY (`c_id`) REFERENCES `consumable` (`c_id`) ON DELETE CASCADE,
  CONSTRAINT `consumable_location_ibfk_2` FOREIGN KEY (`r_id`) REFERENCES `room` (`r_id`) ON DELETE CASCADE,
  CONSTRAINT `consumable_location_ibfk_3` FOREIGN KEY (`sm_id`) REFERENCES `storage_medium` (`sm_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `machine`
--

DROP TABLE IF EXISTS `machine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `machine` (
  `m_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(63) DEFAULT NULL,
  `functional` tinyint(1) DEFAULT NULL,
  `training` varchar(31) DEFAULT NULL,
  `guide` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`m_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `machine_changes`
--

DROP TABLE IF EXISTS `machine_changes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `machine_changes` (
  `m_timestamp_id` int NOT NULL AUTO_INCREMENT,
  `m_id` int DEFAULT NULL,
  `name` varchar(63) DEFAULT NULL,
  `functional` tinyint(1) DEFAULT NULL,
  `training` varchar(31) DEFAULT NULL,
  `guide` varchar(255) DEFAULT NULL,
  `change_timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`m_timestamp_id`),
  KEY `m_id` (`m_id`),
  CONSTRAINT `machine_changes_ibfk_1` FOREIGN KEY (`m_id`) REFERENCES `machine` (`m_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `machine_location`
--

DROP TABLE IF EXISTS `machine_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `machine_location` (
  `m_id` int NOT NULL,
  `r_id` int NOT NULL,
  `sm_id` int NOT NULL,
  PRIMARY KEY (`m_id`,`r_id`,`sm_id`),
  KEY `r_id` (`r_id`),
  KEY `sm_id` (`sm_id`),
  CONSTRAINT `machine_location_ibfk_1` FOREIGN KEY (`m_id`) REFERENCES `machine` (`m_id`) ON DELETE CASCADE,
  CONSTRAINT `machine_location_ibfk_2` FOREIGN KEY (`r_id`) REFERENCES `room` (`r_id`) ON DELETE CASCADE,
  CONSTRAINT `machine_location_ibfk_3` FOREIGN KEY (`sm_id`) REFERENCES `storage_medium` (`sm_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `non_consumable`
--

DROP TABLE IF EXISTS `non_consumable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `non_consumable` (
  `nc_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(63) DEFAULT NULL,
  `inventory_count` int DEFAULT NULL,
  `category` varchar(31) DEFAULT NULL,
  `training` varchar(31) DEFAULT NULL,
  `guide` varchar(255) DEFAULT NULL,
  `hidden` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`nc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `non_consumable_changes`
--

DROP TABLE IF EXISTS `non_consumable_changes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `non_consumable_changes` (
  `nc_timestamp_id` int NOT NULL AUTO_INCREMENT,
  `nc_id` int DEFAULT NULL,
  `name` varchar(63) DEFAULT NULL,
  `inventory_count` int DEFAULT NULL,
  `category` varchar(31) DEFAULT NULL,
  `training` varchar(31) DEFAULT NULL,
  `guide` varchar(255) DEFAULT NULL,
  `hidden` tinyint(1) DEFAULT NULL,
  `change_timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`nc_timestamp_id`),
  KEY `nc_id` (`nc_id`),
  CONSTRAINT `non_consumable_changes_ibfk_1` FOREIGN KEY (`nc_id`) REFERENCES `non_consumable` (`nc_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `non_consumable_location`
--

DROP TABLE IF EXISTS `non_consumable_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `non_consumable_location` (
  `nc_id` int NOT NULL,
  `r_id` int NOT NULL,
  `sm_id` int NOT NULL,
  PRIMARY KEY (`nc_id`,`r_id`,`sm_id`),
  KEY `r_id` (`r_id`),
  KEY `sm_id` (`sm_id`),
  CONSTRAINT `non_consumable_location_ibfk_1` FOREIGN KEY (`nc_id`) REFERENCES `non_consumable` (`nc_id`) ON DELETE CASCADE,
  CONSTRAINT `non_consumable_location_ibfk_2` FOREIGN KEY (`r_id`) REFERENCES `room` (`r_id`) ON DELETE CASCADE,
  CONSTRAINT `non_consumable_location_ibfk_3` FOREIGN KEY (`sm_id`) REFERENCES `storage_medium` (`sm_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `r_id` int NOT NULL AUTO_INCREMENT,
  `building` varchar(63) DEFAULT NULL,
  `number` int DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  PRIMARY KEY (`r_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `storage_medium`
--

DROP TABLE IF EXISTS `storage_medium`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storage_medium` (
  `sm_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(63) DEFAULT NULL,
  `type` varchar(63) DEFAULT NULL,
  PRIMARY KEY (`sm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `storage_medium_location`
--

DROP TABLE IF EXISTS `storage_medium_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storage_medium_location` (
  `child_sm_id` int NOT NULL,
  `parent_sm_id` int NOT NULL,
  PRIMARY KEY (`child_sm_id`,`parent_sm_id`),
  KEY `parent_sm_id` (`parent_sm_id`),
  CONSTRAINT `storage_medium_location_ibfk_1` FOREIGN KEY (`child_sm_id`) REFERENCES `storage_medium` (`sm_id`) ON DELETE CASCADE,
  CONSTRAINT `storage_medium_location_ibfk_2` FOREIGN KEY (`parent_sm_id`) REFERENCES `storage_medium` (`sm_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_authentication`
--

DROP TABLE IF EXISTS `user_authentication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_authentication` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(512) NOT NULL,
  `EncryptionType` varchar(50) NOT NULL,
  `PasswordExpirationDate` date DEFAULT NULL,
  `UserIsLoggedIn` tinyint(1) DEFAULT '0',
  `UserType` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-04 12:01:06