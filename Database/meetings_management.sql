-- MySQL dump 10.13  Distrib 8.4.9, for Linux (x86_64)
--
-- Host: localhost    Database: appdb
-- ------------------------------------------------------
-- Server version	8.4.9

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
-- Table structure for table `dev_groups`
--

DROP TABLE IF EXISTS `dev_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dev_groups` (
  `group_id` int NOT NULL AUTO_INCREMENT,
  `group_name` varchar(100) NOT NULL,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dev_groups`
--

LOCK TABLES `dev_groups` WRITE;
/*!40000 ALTER TABLE `dev_groups` DISABLE KEYS */;
INSERT INTO `dev_groups` VALUES (1,'Team UI'),(2,'Team Mobile'),(3,'Team React'),(4,'Team Backend'),(5,'Team DevOps');
/*!40000 ALTER TABLE `dev_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meetings`
--

DROP TABLE IF EXISTS `meetings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meetings` (
  `meeting_id` int NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `description` text NOT NULL,
  `room` varchar(100) NOT NULL,
  PRIMARY KEY (`meeting_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `meetings_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `dev_groups` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meetings`
--

LOCK TABLES `meetings` WRITE;
/*!40000 ALTER TABLE `meetings` DISABLE KEYS */;
INSERT INTO `meetings` VALUES (16,1,'2026-07-10 09:00:00','2026-07-10 10:00:00','Sprint planning','Blue Room'),(17,2,'2026-07-12 11:00:00','2026-07-12 12:00:00','Mobile release review','Large Board Room'),(18,3,'2026-08-01 09:00:00','2026-08-01 10:30:00','React migration','Blue Room'),(19,1,'2026-05-15 14:00:00','2026-05-15 15:30:00','UI retrospective','New York Room'),(20,4,'2026-04-01 10:00:00','2026-04-01 11:00:00','API design session','New York Room'),(26,5,'2026-06-16 20:00:00','2026-06-16 21:00:00','╫á╫Ö╫¬╫ò╫ù ╫á╫ñ╫Ö╫£╫¬ ╫ö╫⌐╫¿╫¬╫Ö╫¥ ╫₧╫É╫¬╫₧╫ò╫£ ╫æ╫£╫Ö╫£╫ö. ╫ö╫ñ╫º╫¬ ╫£╫º╫ù╫Ö╫¥, ╫⌐╫Ö╫ñ╫ò╫¿ ╫₧╫ó╫¿╫Ü ╫ö╫á╫Ö╫ÿ╫ò╫¿ ╫æ-Grafana ╫ò╫₧╫á╫Ö╫ó╫¬ ╫ö╫Ö╫⌐╫á╫ò╫¬ ╫ö╫₧╫º╫¿╫ö','Blue Room');
/*!40000 ALTER TABLE `meetings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-14 16:19:45
