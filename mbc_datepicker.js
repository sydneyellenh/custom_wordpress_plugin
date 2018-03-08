/* 
	This is a simple, no-frills datepicker for use with MBC projects
	This version is compatible with WordPress
*/

console.log('MBC_datepicker.js is running!');

function mbc_zpad(n){
	n=n*1;
	if (n<10){
		return('0' + n);
	} else {
		return('' + n);
	}
}
function mbc_datepicker_clean_input(dp){
	var d=jQuery(dp).val();
	// default to epoch or TODAY?
	var td=new Date();
	var dflt=(td.getMonth()+1) + '/' + td.getDate() + '/' + td.getFullYear();
	if (d!=''){
		d.split('-').join('/');
		var b=d.split('/');
		if (b.length==3){
			d=mbc_zpad(b[0]) + '/' + mbc_zpad(b[1]) + '/' + mbc_zpad(b[2]);
		} else {
			d=dflt;
		}
	} else {
		d=dflt;
	}
	jQuery(dp).val(d);
}

function mbc_datepicker_cancel(dp){
	//jQuery(dp).parent().find('.mbcdp_stage').hide();
}
function mbc_datepicker_launch(dp){
	jQuery('.datepicker').parent().find('.mbcdp_stage').hide();
	mbc_datepicker_clean_input(dp);
	var d=jQuery(dp).val();
	var c=d.split('/');	
	var val=c[0] + '|' + c[2];
	jQuery(dp).parent().find('.mbcdp_monthyear').html(val);
	mbc_datepicker_draw_cal(dp);
	jQuery(dp).parent().find('.mbcdp_stage').show();
}

function mbc_datepicker_draw_cal(dp){
	var current_day=jQuery(dp).val().split('/')[1]*1;
	var current_mon=jQuery(dp).val().split('/')[0]*1;
	var current_year=jQuery(dp).val().split('/')[2]*1;
	var my=jQuery(dp).parent().find('.mbcdp_monthyear').html();
	var c=my.split('|');
	var mon=c[0];
	var yr=c[1];
	var mon_labels='*,JAN,FEB,MAR,APR,MAY,JUN,JUL,AUG,SEPT,OCT,NOV,DEC'.split(',');
	jQuery(dp).parent().find('.mbcdp_month_disp').html(mon_labels[mon*1] + ' ' +yr);

	var days_in_month=new Date(yr, mon, 0).getDate();
	var month_start_day = new Date(yr,(mon-1),1).getDay();
	// 6 - Saturday
	var html='<tr>';
	var total_days=days_in_month+month_start_day-1;
	weeks=0;
	for (i=0;i<=total_days;i++){
		var dy=i-month_start_day+1;
		if (i%7==0){
			html+='</tr><tr>';
			weeks++;
		}
		if (i<month_start_day){
			html+='<td>&nbsp;</td>';
		} else {
			html+='<td><a href="#" tabindex="-1" onclick="mbc_datepicker_select(this);return false;" class="mbcdp_day';
			if ( (dy==current_day) && (mon==current_mon) && (yr==current_year) ){
				html+=' mbcdp_active_day ';
			}
			html+='">' + dy + '</a></td>';
		}
	}
	var leftoverdays=6-total_days%7;
	for (i=0;i<leftoverdays;i++){
		html+='<td>&nbsp;</td>';
	}
	html+='</tr>';
	if (weeks<6){
		html+='<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
	}
	jQuery(dp).parent().find('tbody').html(html);
}

function mbc_datepicker_select(obj){
	dp=jQuery(obj).parent().parent().parent().parent().parent();
	var d=jQuery(obj).html()*1;
	var my=jQuery(dp).parent().find('.mbcdp_monthyear').html();
	var c=my.split('|');
	var mon=c[0];
	var yr=c[1];
	jQuery(dp).parent().find('.datepicker').val(mon + '/' + d + '/' + yr);
	jQuery(dp).hide();
}

function mbc_datepicker_month_change(dir,obj){
	dp=jQuery(obj).parent().parent().parent().find('.datepicker');
	var my=jQuery(dp).parent().find('.mbcdp_monthyear').html();
	var c=my.split('|');
	var mon=c[0];
	var yr=c[1];
	mon*=1;
	mon+=dir;
	if (mon<1){
		mon=12;yr--;
	}
	if (mon>12){
		mon=1;yr++;
	}
	jQuery(dp).parent().find('.mbcdp_monthyear').html(mon + '|' + yr);
	mbc_datepicker_draw_cal(dp);	
}


function mbc_datepicker_init(dp){
	var html='';
	html+='<div class="mbcdp_stage"><div class="mbcdp_monthyear"></div><div class="mbcdp_toprow"><a href="#" class="prev" tabindex="-1" onclick="mbc_datepicker_month_change(-1,this);return false;">&lt;</a><div class="mbcdp_month_disp">MONTH 2017</div><a href="#" class="next" tabindex="-1" onclick="mbc_datepicker_month_change(1,this);return false;">&gt;</a></div>';
	html+='<table class="mbcdp_calendar"><thead><th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th></thead><tbody></tbody></table></div>';
	html+='';
	jQuery(dp).parent().append(html);
	mbc_datepicker_clean_input(dp);
	jQuery(dp).focus(function(){
		mbc_datepicker_launch(jQuery(this));
	});
	jQuery(dp).blur(function(){
		mbc_datepicker_cancel(jQuery(this));
	});
}

function mbc_datepicker_init_stage(){
	var html='<link href="/wp-content/plugins/mbc-countdown-clock/mbc_datepicker.css" rel="stylesheet" id="mbc_datepicker_style">';
	jQuery('body').append(html);
	jQuery('input').each(function(){
		if (!jQuery(this).hasClass('datepicker')){
			jQuery(this).focus(function(){
				jQuery('.datepicker').parent().find('.mbcdp_stage').hide();
			});
		}
	});

}

jQuery(function() {
	var mbc_active_id='';
	jQuery('.datepicker').each(function(){
		mbc_datepicker_init(jQuery(this));
	});
	if (jQuery('.datepicker').length>0){
		mbc_datepicker_init_stage();
	}
});