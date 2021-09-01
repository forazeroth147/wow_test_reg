<?php 
require_once 'mysql.php';
if((isset($_POST['user']) && !empty($_POST['user'])) && (isset($_POST['pwd']) && !empty($_POST['pwd'])) && $_POST['ver'])
{
	if($_SESSION['ver']!==$_POST['ver'])
	{
		echo 1;
		exit;
	};
	$pwd=sha1(addstr($_POST['pwd']));
	$user=addstr($_POST['user']);
	$where="`cus_name`='$user' and `cus_pwd`='$pwd'";
    $result=select('`think_customer`','`id`,`cus_name`,`ask`,`answer`,`cus_jifen`,`login`',$where);
	$num=mysql_num_rows($result);
	
	if($num!=1)
	{ echo 2;exit;}
	
	$ask_an=mysql_fetch_assoc($result);
	$ask=$ask_an['ask'];
	$answer=$ask_an['answer'];
	$login=$ask_an['login'];
	$jifen=$ask_an['cus_jifen'];
	
	$arr_id=array();
	$now=time();
	$jifen_num=dt($now,$login);
     $jf=false;
	
	   if($jifen_num==1)
	   {
		   $jifen+=1;
		   $affected=update('think_customer',"`cus_jifen`=$jifen, `login`='$now'",$where);
		   if($affected==1)
		   { $jf=1; }
	   }
	   else
	   {
		  $affected=update('think_customer',"`login`='$now'",$where);
		  if($affected!=1)
		   {
			 echo 2;exit;
		   }
	   }//判断积分和记录登录时间
	  
	if(empty($ask))
	{
		$Hours=3600;
		setcookie('cus_name',$ask_an['cus_name'],time()+$Hours);
		$arr_id['n']=$ask_an['cus_name'];
		$arr_id['id']=$ask_an['id'];
        $arr_id['jf']=$jf;

	    echo json_encode($arr_id);
	}
	else
	{
		//echo 'ask';
		$answer2=addstr($_POST['answer']);
	    $reg_ans=regexp('/^[\s\S]{5,30}$/',$answer2);
		if(!$reg_ans)
		{
			echo 3;exit;
		}
		if($answer!==$answer2)
		{
			echo 4;exit;
		}
		if($answer===$answer2)
		{
		    $Hours=3600;
			setcookie('cus_name',$ask_an['cus_name'],time()+$Hours);
		
			/*if(isset($jf))
			$arr_id=array('id'=>$ask_an['id'],'jf'=>1);
			else
			$arr_id=array('id'=>$ask_an['id']);
			*/
			$arr_id['n']=$ask_an['cus_name'];
			$arr_id['id']=$ask_an['id'];
            $arr_id['jf']=$jf;
		    echo json_encode($arr_id);
		}
	}
	 mysql_free_result($result);
}
else
{
	echo '页面错误';
}