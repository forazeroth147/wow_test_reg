// JavaScript Document

var regCountInterval = 0;
$(function(){
	$(".nav").hover(function(){
		$(".nav").removeClass("navHover");
		$(this).addClass("navHover");
	}, function(){
		$(this).removeClass("navHover");
	});
	
	$(".webRegCount .weixin").hover(function(){
		$(this).attr('_mouseIn', 1);
		var div = $(this).find(".weixinContent").show();
		div.show();
	}, function(){
		$(this).attr('_mouseIn', 0);
		setTimeout(function(){
			var mouseIn = parseInt($('.webRegCount .weixin').attr('_mouseIn'));
			if(mouseIn == 0){
				$('.webRegCount .weixin').find(".weixinContent").hide();
			}
		}, 100);
	});
	$(".webRegCount .weixin .weixinContent").hover(function(){
		$('.webRegCount .weixin').attr('_mouseIn', 1);
	}, function(){
		$('.webRegCount .weixin').attr('_mouseIn', 0);
		setTimeout(function(){
			var mouseIn = parseInt($('.webRegCount .weixin').attr('_mouseIn'));
			if(mouseIn == 0){
				$(".webRegCount .weixin .weixinContent").hide();
			}
		}, 100);
	});
	
	$(".webRegCount .phone").hover(function(){
		$(this).attr('_mouseIn', 1);
		var div = $(this).find(".phoneContent").show();
		div.show();
	}, function(){
		$(this).attr('_mouseIn', 0);
		setTimeout(function(){
			var mouseIn = parseInt($('.webRegCount .phone').attr('_mouseIn'));
			if(mouseIn == 0){
				$('.webRegCount .phone').find(".phoneContent").hide();
			}
		}, 100);
	});
	$(".webRegCount .phone .phoneContent").hover(function(){
		$('.webRegCount .phone').attr('_mouseIn', 1);
	}, function(){
		$('.webRegCount .phone').attr('_mouseIn', 0);
		setTimeout(function(){
			var mouseIn = parseInt($('.webRegCount .phone').attr('_mouseIn'));
			if(mouseIn == 0){
				$(".webRegCount .phone .phoneContent").hide();
			}
		}, 100);
	});
	if ( $('.regCountMiddle').length != 0 ){
		regCountInterval = window.setInterval(regCountShow, 30);
	}
	
	footAutoHeight();
});

function footAutoHeight(){
	if ($('.footLineGray').length != 0){	
		var footHeightDifference = document.documentElement.clientHeight - ($('.footLineGray').offset().top + 2 + $('.webFoot').height());
		if ( footHeightDifference > 0 ){
			$('#autoHeightDiv').css("height", footHeightDifference);
		}
	}
}

/**function regCountShow(){
	var left1 = $('#regCountText1')[0].offsetLeft;
	var left2 = $('#regCountText2')[0].offsetLeft;
	//console.log(left1 + "  " + left2);
	if ( --left1 == 0 ){
		$('#regCountText1').css("left", left1);
		$('#regCountText2').css("left", 320);
		return;
	}
	if ( --left2 == 0 ){
		$('#regCountText1').css("left", 320);
		$('#regCountText2').css("left", left2);
		return;
	}
	//console.log(left1 + "  " + left2);
	$('#regCountText1').css("left", left1);
	$('#regCountText2').css("left", left2);
}**/
var _serviceHide = true;
var bd_cpro_rtid="PHcsPWR";

$(function(){
	setInterval("scorllText()",1);
});


function scorllText(){
	$(".text").animate({
	right : "800px"
	},30000,function(){
	$(this).css({right : "-550px"});
	});
}
