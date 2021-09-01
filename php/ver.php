<?php
header("content-type:image/gif");
session_start();
	function ver($w,$h,$size)
	{
     $img=imagecreatetruecolor($w,$h);
	 $color_bg=imagecolorallocate($img,rand(200,250),rand(220,250),rand(200,255));
	 imagefill($img,0,0,$color_bg);
	 
	 for($i=0;$i<100;$i++)
	 {
	   $color_pix=imagecolorallocate($img,mt_rand(0,255),mt_rand(0,250),mt_rand(0,255));
	   imagesetpixel($img,rand(1,$w),rand(1,$h),$color_pix);
	 }
	 
	 for($i=0;$i<5;$i++)
	 {
	  $color_edarc=imagecolorallocate($img,mt_rand(200,215),mt_rand(210,250),mt_rand(210,225));
	  imagefilledarc($img,rand($w/10,$w),rand($h/10,$h),$w/2,$h/2,rand(0,300),rand(10,360),$color_edarc,IMG_ARC_NOFILL);
	 }
     
	 for($i=0;$i<5;$i++)
	 {
	  	$color_line=imagecolorallocate($img,mt_rand(200,225),mt_rand(210,250),mt_rand(210,255)); 
		imageline($img,mt_rand(0,$w/2),mt_rand(0,$h/2),rand($w/2,$w),rand($h/2,$h),$color_line);
     }
	 
	$str=substr(uniqid(mt_rand()),0,5);

	$_SESSION['ver']=$str;
	
	$len=strlen($str);
    $f_style='../font/simhei.ttf';
	
	for($i=0;$i<5;$i++)
	{
	   $font_color=imagecolorallocate($img,rand(0,200),rand(0,250),rand(0,255));
	// imagestring($img,35,$i*30,0,substr($str,$i,1),$font_color);
	  imagettftext($img, $size, rand(-10,10), $w/$len*$i, $h/2+$size/2, $font_color,$f_style,substr($str,$i,1));
	}
     imagegif($img);
	 imagedestroy($img);
	}
ver(80,30,15);

//session_destroy();
