<?php 
require_once 'mysql.php';

if(isset($_POST['id']))
{
	$array=array();
	if(isset($_COOKIE['cus_name']))
	{
	  $name=$_COOKIE['cus_name'];
	  $id=$_POST['id'];
	  $result=select('think_customer','cus_email,cus_jifen,register,cus_wed,cus_name,ask,answer',"`id`=$id and `cus_name`='$name'");
	  $arr=mysql_fetch_assoc($result);
	  
	  $num=mysql_num_rows($result);
	  if($num==0)
	  {echo 'null'; exit;}//判断传来的ＩＤ是否正确
	  
	  $array['email']=strip($arr['cus_email']);
	  $array['wed']=strip($arr['cus_wed']);
	  $array['name']=strip($arr['cus_name']);
	  $array['ask']=strip($arr['ask']);
	  $array['answer']=strip($arr['answer']);
	  
	  $array['jifen']=$arr['cus_jifen'];
	  $array['register']=$arr['register'];
	  
	  echo json_encode($array);
	  mysql_free_result($result);
	  exit;
	}
	else
	{
	  echo 'null';exit;	
	}
}//个人资料修改页面

if(isset($_COOKIE['cus_name']))
{
  echo $name=$_COOKIE['cus_name'];

}// 投诉页面---首页
