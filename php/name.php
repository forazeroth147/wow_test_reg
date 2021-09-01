<?php

 require_once 'mysql.php';
 
 if(isset($_POST['user']) && !empty($_POST['user']))
 {
	 
	 $name1=addstr($_POST['user']);
 	 $reg_name=regexp('/^[\w]{4,10}$/',$name1);
	 if(!$reg_name)
	 {
		 $name=array('t'=>'<font color="#FF6666">4-10个字母、数字组合，例如abcd,abc123等</font>','n'=>0);
		 echo json_encode($name);
		 exit;
	  }
	 //$sql="select cus_name from think_customer where cus_name='{$_POST['user']}'";
     $sql=select('think_customer','cus_name',"cus_name='$name1'");

     $name=mysql_num_rows($sql);
      if($name==0)
	  {
		//echo '<font color="#33CC99">恭喜你，该用户名可以使用</font>';
		$name=array('t'=>'<font color="#33CC99">恭喜你，该用户名可以使用</font>','n'=>1); 

	 }
	 else
	 {
	  // echo '<font color="#FF6666">很遗憾，改用户名已被注册</font>';
	   $name=array('t'=>'<font color="#FF6666">很遗憾，该用户名已被注册</font>','n'=>2);
	 }
	 echo json_encode($name);
	 
	  mysql_free_result($sql);
	  exit;
 }

	if(isset($_POST['ask']) && !empty($_POST['ask']) && isset($_POST['name']) && !empty($_POST['name']))
	{
		 $ask=addstr($_POST['ask']);
		 $reg_ans=regexp('/^[\s\S]{5,30}$/',$ask);
		 if(!$reg_ans)
		 {
			 echo 1;
			 exit;
		 }
		 $user=addstr($_POST['name']);
		 $result=select('think_customer','answer',"`answer`='$ask' and `cus_name`='$user'");
		 $num=mysql_num_rows($result);

		 if($num!=1)
		 {
			 echo 2;exit;
		 }
		mysql_free_result($result);
		exit;
	}//登录时验证问题答案是否正确
else
{
 // header('Loaction:'.$_SERVER['HTTP_REFERER']);
   echo '页面错误';
}