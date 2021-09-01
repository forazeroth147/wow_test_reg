<?php

require_once 'mysql.php';
if(isset($_POST['xui']) && $_POST['xui']=='gai')
{

	$kg='/^\s*$/';
	$word='/^[\u4E00-\u9FA5\uF900-\uFA2D\w]{5,30}$/';
	//php 判断中文的正则错误（这个正则只能用于js）；
	
	$email_reg='/^\s*([a-zA-Z0-9]{2,10})+@([a-zA-Z0-9]{2,5}\.)+([a-zA-Z0-9]{2,5})\s*$/';
	
	$result=select('think_customer','cus_pwd,cus_email,cus_wed',"`id`={$_POST['id']}");
	$p_e=mysql_fetch_assoc($result);
	$p=$p_e['cus_pwd'];
	$e=$p_e['cus_email'];//取得原数据
	$w=$p_e['cus_wed'];
	
	if(!preg_match('/^\s*$/',$_POST['old_pass']))
	{
		$old_pass=sha1(addstr($_POST['old_pass']));
	    $result=select('think_customer','cus_pwd',"`id`={$_POST['id']} and `cus_pwd`='$old_pass'");
		$num=mysql_num_rows($result);
		if($num!=1)
		{
		  echo 1;
		  exit;	
		}
		mysql_free_result($result);
	}
	
	if(!preg_match('/^\s*$/',$_POST['pass']))
	{
		if(preg_match('/^\s*$/',$_POST['old_pass']))
		{
			echo 2;
			exit;
		}
		if(preg_match('/^\s*$/',$_POST['pass2']))
		{
			echo 3;
			exit;
		}
		$pwd=addstr($_POST['pass']);
		
		if($pwd!==addstr($_POST['pass2']))
		{
			echo 4;
			exit;
		}
		$reg_pass=regexp('/^[0-9a-zA-Z]{6,9}$/',$pwd);
		if(!$reg_pass)
		{
			echo 5;
			exit;
		}
		$pwd=sha1($pwd);
		if($p!==$pwd)
		{
			$pass=$pwd;
		}
	}
	if(!preg_match('/^\s*$/',$_POST['pass2']))
	{
		if(preg_match('/^\s*$/',$_POST['old_pass']))
		{
			echo 2;
			exit;
		}
		if(preg_match('/^\s*$/',$_POST['pass']))
		{
			echo 7;
			exit;
		}

    }
	if($_POST['ask']!=1 && !preg_match('/^\s*$/',$_POST['ask2']))
	{
		echo 8;
		exit;
	}
	if($_POST['ask']!=1)
	{
		if(preg_match('/^\s*$/',$_POST['answer']))
		{
			echo 9;
			exit;
		}
		else
		{
			$ans_wer=addstr($_POST['answer']);
			$reg_ans=regexp("/^[\.\w]{5,30}$/",$ans_wer);
			if(!$reg_ans)
			{
				echo 10;
				exit;
			}
			else
			{
			  $ask=addstr($_POST['ask']);
			  $answer=$ans_wer;
			}
		}
	}
	
	if(!preg_match('/^\s*$/',$_POST['answer']))
	{
	   $reg_ans=regexp("/^[\s\S]{5,30}$/",$_POST['answer']);
		if(!$reg_ans)
		{
			echo 10;
			exit;
		}
		if($_POST['ask']==1)
		{
		  echo 11;
		  exit;	
		}
	}

	if(!preg_match('/^\s*$/',$_POST['ask2']))
	{
		$ask2=addstr($_POST['ask2']);
		$reg_ask=regexp('/^[\s\S]{5,10}$/',$ask2);
		if(!$reg_ask)
		{echo 13;exit;}
		
		$ans_wer2=addstr($_POST['answer2']);
		if(preg_match('/^\s*$/',$ans_wer2))
		{
		   echo 12;
		   exit;	
		}
		else
		{
			$reg_ans=regexp('/^[\s\S]{5,30}$/',$ans_wer2);
			if(!$reg_ans)
			{echo 13;exit;}
			else
			{
				$ask=$_POST['ask2'];
				$answer=$ans_wer2;
			}
		}
	}
	if(!preg_match('/^\s*$/',$_POST['answer2']))
	{
		$ans_wer2=addstr($_POST['answer2']);
		$reg_ans=regexp('/^[\s\S]{5,30}$/',$ans_wer2);
		if(!$reg_ans)
		{echo 13;exit;}
		
		if(preg_match('/^\s*$/',$_POST['ask2']))
		{
			echo 14;
			exit;
		}
		else
		{
			$ask2=addstr($_POST['ask2']);
			$reg_ask=regexp('/^[\s\S]{5,30}$/',$ask2);
			if(!$reg_ask)
			{echo 13;exit;}
		}
	}
	
	if(!preg_match('/^\s*$/',$_POST['email']))
	{
		$email_=addstr($_POST['email']);
		if($e!==$email_)
		  {
			  $reg_email=regexp($email_reg,$email_);
				if(!$reg_email)
				{
					echo 15;
					exit;
				}
				else
				{ 
					$email=$email_;
				}
		  }
		
	}
	if($w!==addstr($_POST['wed']))
	{
		$wed=addstr($_POST['wed']);
	}
	
	$field_Val='';

	if(isset($pass))
	{
		$field_Val.="`cus_pwd`='$pass',";
	}
    if(isset($ask))
	{
		$field_Val.="`ask`='$ask',";
	}
	if(isset($answer))
	{
		$field_Val.="`answer`='$answer',";
	}
	if(isset($email))
	{
		$field_Val.="`cus_email`='$email',";
	}
	if(isset($wed))
	{
		$field_Val.="`cus_wed`='$wed',";
	}
	if(($_POST['ask']==1) && ($_POST['ask2']==''))
	{
		$field_Val.="`ask`='',`answer`='',";
	}
	if(!preg_match('/^\s*$/',$field_Val))
	{
		$field_Val=substr($field_Val,0,-1);
		
    	$num=update('think_customer',$field_Val,"`id`={$_POST['id']}");
		if($num==1)
		{echo 17;exit;}
		else
		{
			echo 16;exit;
		}
	}
	else
	{
		echo 6;
		exit;
	}
}
else
{echo '页面错误';exit;}