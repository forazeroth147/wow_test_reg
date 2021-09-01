<?php 
 require_once 'mysql.php';

 $arr=array();
 
 if(isset($_POST['xieyi']) && $_POST['xieyi']==1)
 {
	$name=addstr($_POST['user']);
	$reg_name=regexp('/^[\w]{4,10}$/',$name);
    $ti=0;
	 if(!$reg_name)
	 {
		$ti=1;
	   //$ti_str='您的用户名格式不正确';
	 }
	 else
	 {
		 $sql=select('think_customer','cus_name',"cus_name='$name'");

		 $num=@mysql_num_rows($sql);
         if($num==1)
		 {
			 $ti=7;
		 }//用户名已被注册
     }
	  
	 $pwd=addstr($_POST['pwd']);
	 $reg_pwd=regexp('/^[a-zA-Z0-9]{6,9}$/',$pwd);
	  if(!$reg_pwd)
	  {
	     $ti=2;	  
	  }
	  $pwd2=addstr($_POST['pwd2']);
	  if($pwd2!=$pwd)
	  {
		 $ti=3; 
	  }
	  $email=addstr($_POST['email']);
	  $reg_email=regexp('/^([a-zA-Z0-9]{2,10})+@([a-zA-Z0-9\.]{3,10})+[a-zA-Z0-9]{2,5}$/',$email);
	  if(!$reg_email)
	  {
		$ti=4;  
	  }
	  
	  if(isset($_POST['wed']) && !empty($_POST['wed']))
	  {
		 $wed=addstr($_POST['wed']);
	  }
      else
	  {
		 $wed=addstr('其他');  
	  }

	  if($ti==0)
	  {
		$pwd=sha1($pwd);
		$time=date('Y-m-d H:i:s',time());
		$result=insert('think_customer',"`cus_name`, `cus_pwd`, `cus_email`,`cus_wed`,`register`","'$name','$pwd','$email','$wed','$time'"); 
		
		if($result)//1
		{
			$ti=5;
		}
		else
		{
			$ti=6;
		}
		  $arr['ti']=$ti;
		  echo json_encode($arr);
	  }
	  else
	  {
		  $arr['ti']=$ti;
		  echo json_encode($arr);
	  }
	  exit;
	 mysql_free_result($result);
	/* mysql_close();*/
 }
 else
 {
 // header('Loaction:'.$_SERVER['HTTP_REFERER']);
   echo '页面错误';
  }

