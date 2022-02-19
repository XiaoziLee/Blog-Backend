-- MySQL Script generated by MySQL Workbench
-- Mon Feb 14 19:32:15 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema blogs_data
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `blogs_data` ;

-- -----------------------------------------------------
-- Schema blogs_data
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `blogs_data` DEFAULT CHARACTER SET utf8 ;
USE `blogs_data` ;

-- -----------------------------------------------------
-- Table `blogs_data`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `blogs_data`.`users` ;

CREATE TABLE IF NOT EXISTS `blogs_data`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL,
  `nick_name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL,
  `phone_number` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nick_name_UNIQUE` (`nick_name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `blogs_data`.`user_friend_relationship`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `blogs_data`.`user_friend_relationship` ;

CREATE TABLE IF NOT EXISTS `blogs_data`.`user_friend_relationship` (
  `user_id_one` INT NOT NULL,
  `user_id_two` INT NOT NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `blogs_data`.`blogs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `blogs_data`.`blogs` ;

CREATE TABLE IF NOT EXISTS `blogs_data`.`blogs` (
  `blog_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `blog_text` MEDIUMTEXT NULL,
  `blog_title` TEXT NULL,
  `blog_update_date` VARCHAR(45) NULL,
  `like_number` INT NOT NULL DEFAULT 0,
  `comment_number` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`blog_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `blogs_data`.`like`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `blogs_data`.`like` ;

CREATE TABLE IF NOT EXISTS `blogs_data`.`like` (
  `user_id` INT NOT NULL,
  `blog_id` INT NOT NULL,
  `like_date` DATETIME NOT NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `blogs_data`.`comments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `blogs_data`.`comments` ;

CREATE TABLE IF NOT EXISTS `blogs_data`.`comments` (
  `user_id` INT NOT NULL,
  `comment_content` MEDIUMTEXT NULL,
  `blog_id` INT NOT NULL,
  `comment_date` DATETIME NOT NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `blogs_data`.`message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `blogs_data`.`message` ;

CREATE TABLE IF NOT EXISTS `blogs_data`.`message` (
  `user_id_send` INT NOT NULL,
  `user_id_receive` INT NOT NULL,
  `message_content` MEDIUMTEXT NOT NULL,
  `message_date` DATETIME NOT NULL)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
