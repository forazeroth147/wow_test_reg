<?php
header("content-type:text/html;charset=utf-8");
session_start();
 $conn=mysql_connect('127.0.0.1','root','123456')or die('连接服务器失败');
 mysql_select_db('test',$conn)or die('连接数据库失败');
 mysql_query("set names UTF8");


 date_default_timezone_set('PRC');//其中PRC为“中华人民共和国”
// ini_set('date.timezone','PRC');*/


function query($sql)
{
  return mysql_query($sql);	
}
function select($from,$field='*',$where=null,$bug=null)
{
	 if($where)
	 {
     $sql="select $field from $from where $where  limit 1";
	 }
	 else
	 {
	  $sql="select $field from $from";	 
	 }
	 
	 if($bug)
	 {echo $sql;exit;}
	 else
	 {
	 return query($sql); 
	 }
	
}
function insert($from,$field,$value,$bug=null)
{
	$sql="INSERT INTO `$from` ($field) value ($value)";

	if($bug)
	{
	echo $sql;
	exit;	
	}
	else
	{ return query($sql);}
	
}
function update($from,$val,$where=null,$bug=null)
{
	if($where)
	{
	$sql="UPDATE `$from` SET $val where $where limit 1";
	}
	else
	{
	 $sql="UPDATE `$from` SET $val limit 1";
	}
	if($bug)
	{
	  echo $sql;
	  exit;	
	}
	else
	{
		return query($sql);
	}
}

function addstr($str)
{
  if(get_magic_quotes_gpc())
  {
	 return strip_tags(trim($str));  
   }
   else
   {
	  $str=addslashes($str); 
	  return  strip_tags(trim($str));
   }	
}
function strip($str)
{
  if(get_magic_quotes_gpc())
  {
	 return strip_tags(trim($str));  
   }
   else
   {
	  $str=stripcslashes($str); 
	  return  strip_tags(trim($str));
   }	
}

function str_len($str,$min,$max)
{
  $len=mb_strlen($str,'UTF-8');
  if($len<$min)
  {
	// return '字符个数不得少于'.$min; 
	return $min;
	 exit;
   }
   if($len>$max)
   {
	   return $max;
	// return '字符个数不得多于'.$max;  
	 exit;
	}
	return $str;
}

function regexp($reg,$name)
{
	 $reg_name=preg_match($reg,$name);
     return $reg_name;
}
function __destruct()
{
	mysql_close();
}


function dt($now,$oldtime)
{
	 $old=$oldtime+86400;
	 if($now> $old)
	 return 1;
	 else
	 return 0;
}
