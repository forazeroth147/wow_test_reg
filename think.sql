-- phpMyAdmin SQL Dump
-- version 3.4.10.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2017 年 04 月 08 日 02:43
-- 服务器版本: 5.5.20
-- PHP 版本: 5.3.10

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `think`
--

-- --------------------------------------------------------

--
-- 表的结构 `think_customer`
--

CREATE TABLE IF NOT EXISTS `think_customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cus_name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `cus_pwd` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `cus_jifen` int(11) NOT NULL,
  `cus_email` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `cus_jihuo` int(5) NOT NULL,
  `cus_wed` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `ask` varchar(90) COLLATE utf8_unicode_ci NOT NULL COMMENT '问题',
  `answer` varchar(90) COLLATE utf8_unicode_ci NOT NULL COMMENT '答案',
  `register` datetime NOT NULL COMMENT '注册时间',
  `login` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '记录上次登陆时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `think_customer`
--

INSERT INTO `think_customer` (`id`, `cus_name`, `cus_pwd`, `cus_jifen`, `cus_email`, `cus_jihuo`, `cus_wed`, `ask`, `answer`, `register`, `login`) VALUES
(1, '1111', '3d4f2bf07dc1be38b20cd6e46949a1071f9d0e3d', 1, '1231@qq.com', 0, '其他', '你的职业', '11111', '2017-04-08 09:11:37', '1491617977');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
