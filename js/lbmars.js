$('body').on("click", function(){
		//console.log("Hello Lb.");
});
function hello(name){
	var vName = "";
	if(name)	vName = name;
	console.log("Do you know me?\t"+vName);
}
function switchLight(lightAction){
    if(lightAction == 'off'){
        document.body.style.backgroundColor='#000';
    } else {
        document.body.style.backgroundColor='#fff';
    }
}
function autoDeal(){
	var cnNames = ["张三","李四","王二","钱五","张三一","李四二","王二二","钱五二","张三三","李四三","王二三","钱五三"];
	var enNames1 = ["zhan","li","wang","qian","zhan2","li2","wang2","qian2","zhan3","li3","wang3","qian3"];
	var enNames2 = ["san","si","er","wu","san2","si2","er2","wu2","san3","si3","er3","wu3"];
	$("[type_name='mobile']").each(function(idx, item){
	  $(item).val(13524644444+idx%10);
	});
	$("[type_name='email']").each(function(idx, item){
	  $(item).val("123@123.com");
	});
	$("[name*='fullName']").each(function(idx, item){
	  $(item).val(cnNames[idx%cnNames.length]);
	});
	$("[name*='firstName']").each(function(idx, item){
	  $(item).val(enNames1[idx%enNames1.length]);
	});
	$("[name*='lastName']").each(function(idx, item){
	  $(item).val(enNames2[idx%enNames2.length]);
	});
	$("[name$='idNo']").each(function(idx, item){
	  $(item).val(342401198012121212+idx%10);
	});
	$("[name*='address']").each(function(idx, item){
	  $(item).val("测试地址___"+idx);
	});
	$("[name*='postcode']").each(function(idx, item){
	  $(item).val(201510+idx%10);
	});
	$("#user_name").val(cnNames[0]);
}
function autoClose(){
	$("#cs_right_bottom").hide();
	$("#res0").hide();
	var jHrefAds = $("A");
	jHrefAds.each(function(i, item){
		var jItem = $(item);
		if(jItem.width>=$(window).width() && jItem.height>=$(window).height()){
			jItem.hide();
		}
	});
	var jFlashs = $("[type='application/x-shockwave-flash']");
	jFlashs.each(function(i, item){
		$(item).hide();
	});
	//document.getElementById("cs_right_bottom").style.display="none";
}

function lvmamaAddBGDiv(){
	var productIdDiv = $("<input type='text' id='lb_productId' value='' >").blur(function(){$("#aimBtn").attr("data", $("#lb_productId").val());});
	var startDistrictId = $("<input type='text' id='lb_startDistrictId' value='9' >").blur(function(){$("#aimBtn").attr("startdistrictid", $("#lb_startDistrictId").val());});
	var specDate = $("<input type='text' id='lb_specDate' value='2015-10-17' >").blur(function(){$("#aimBtn").attr("groupdate", $("#lb_specDate").val());});
	var categoryId = $("<input type='text' id='lb_categoryId' value='18' >").blur(function(){$("#aimBtn").attr("categoryid", $("#lb_categoryId").val());});;
	var button = "<a data='397947' startdistrictid='9' categoryid='18' groupdate='2015-10-17' id='aimBtn' class='btn btn_cc1 xzcpBtn'  onclick='javascript:xzcpBtnClick(this)'>选择</a>";
	var newDiv = $("<div></div>").append("产品ID").append(productIdDiv)
		.append("出发地ID：").append(startDistrictId)
		.append("日期：").append(specDate)
		.append("品类ID:").append(categoryId)
		.append(button);
	$("#result").append(newDiv);
}

function lvmamaDoSelect(dom){
	var jDom = $(dom);
	jDom.attr("data", $("#lb_productId").val());
	jDom.attr("startdistrictid", $("#lb_startDistrictId").val());
	jDom.attr("groupdate", $("#lb_specDate").val());
	jDom.attr("categoryid", $("#lb_categoryId").val());
	xzcpBtnClick(dom);
}

function calcWorkTime(){
	var weekDays = ['天', '一', '二', '三', '四', '五', '六'];
	var nowDate = new Date();
	var theMonth = window.prompt("请输入工时月份",nowDate.getMonth()+1);
	try{
		if(!theMonth || theMonth=="")	throw theMonth;
		var intMonth = parseInt(theMonth);
		if(!intMonth || intMonth<0 || intMonth>12){
			throw "月份[ "+theMonth+" ]非法";
		}
		theMonth = intMonth;
	}catch(e){
		console.log("你未输入有效的月份 "+e);
		return;
	}
	try{
		var fdStart = new Date(nowDate.setMonth(theMonth-2));
		fdStart = new Date(fdStart.setDate(26));
		fdStart = new Date(fdStart.setHours(0));
		fdStart = new Date(fdStart.setMinutes(0));
		fdStart = new Date(fdStart.setSeconds(0));
		console.log(fdStart);
		var fdEnd = new Date(fdStart);
		fdEnd = new Date(fdEnd.setMonth(fdEnd.getMonth()+1));
		var url = "/km/review/km_review_card_record/kmReviewCardRecord.do";
		var pData = {
			method: 'data',
			fdStart: fdStart.getFullYear()+"-"+(fdStart.getMonth()+1)+"-"+fdStart.getDate()+' 00:00',
			fdEnd: fdEnd.getFullYear()+"-"+(fdEnd.getMonth()+1)+"-"+fdEnd.getDate()+' 00:00'
		};
		console.log(pData);
		$.getJSON(url, pData, function(jsonData){
			var companyAll = 0, actualAll = 0;
			var workDays = dealWithJson(jsonData);
			for(var oneDay = new Date(fdStart),dayOfMonth=0;oneDay<fdEnd; oneDay=new Date(oneDay.setDate(oneDay.getDate()+1))){
				if(oneDay.getDay()==0 || oneDay.getDay()==6){
					continue;
				}
				var dayKey = oneDay.getFullYear()+"-"+(oneDay.getMonth()+1)+"-"+oneDay.getDate();
				var actualMinutes = 0;
				var actualTimes = "";
				if(workDays[dayKey]){
					actualMinutes = workDays[dayKey].stepMinutes
					actualTimes = workDays[dayKey].title;
				}
				companyAll += 480;
				actualAll += actualMinutes;
				var actualMinutesSt = actualMinutes.toString();
				for(var i=actualMinutesSt.length;i<=3;i++){
					actualMinutesSt = " "+actualMinutesSt;
				}
				var lessMinutesSt = (actualMinutes-480).toString();
				for(var i=lessMinutesSt.length;i<=4;i++){
					lessMinutesSt = " "+lessMinutesSt;
				}
				console.log((++dayOfMonth)+"\t"+"周"+weekDays[oneDay.getDay()]+"\t\t"+dayKey+"\t应工作 480 分钟，实际工作 "+actualMinutesSt+"\t分钟，差异分钟数:\t[ "+lessMinutesSt+" ]\t\t"+actualTimes);
			}
			console.log("------------------------------------------------- 统计 -------------------------------------------------");
			var lessOfMinutes = actualAll-companyAll;
			var lessOfHours = parseInt(lessOfMinutes/60)%8;
			var lessOfDays = parseInt(lessOfMinutes/480);
			console.log("["+pData.fdStart+" 至 "+pData.fdEnd+"]区间应工作 "+companyAll+" 分钟，实际工作 "+actualAll+" 分钟，差异分钟数：[ "+(actualAll-companyAll)+" ],即 [  "+lessOfDays+" 天, "+lessOfHours+" 小时, "+(lessOfMinutes%60)+" 分钟 ]");
		});
	}catch(e){
		alert("输入的 JSON 不合法!"+e);
	}
}

function dealWithJson(workJson){
	var retJson = {};
	for(var i=0;i<workJson.length;i++){
		var oneDay = workJson[i];
		if( !oneDay || !oneDay.title || !oneDay.start ){
			continue;
		}
		var wkTimes = oneDay.title.split("~");
		if(!wkTimes || wkTimes.length!=2){
			continue;
		}
		try{
			var wkTypeSt = "补打卡:";
			if(wkTimes[0].indexOf(wkTypeSt)>=0){
				oneDay.wkType = wkTypeSt;
				wkTimes[0] = wkTimes[0].substring(wkTimes[0].indexOf(wkTypeSt)+wkTypeSt.length, wkTimes[0].length);
			}
			else{
				wkTypeSt = "加班:";
				if(wkTimes[0].indexOf(wkTypeSt)>=0){
					oneDay.wkType = wkTypeSt;
					wkTimes[0] = wkTimes[0].substring(wkTimes[0].indexOf(wkTypeSt)+wkTypeSt.length, wkTimes[0].length);
				}
			}
			if($.trim(wkTimes[0]).length==0|| $.trim(wkTimes[1]).length==0 ){
				continue;
			}
			oneDay.from = new Date(oneDay.start+" "+wkTimes[0]);
			oneDay.to = new Date(oneDay.start+" "+wkTimes[1]);
		}catch(Ex){
			continue;
		}
		var morningTime = new Date(oneDay.start+" 12:00:00");
		var afternoonTime = new Date(oneDay.start+" 13:00:00");
		if(oneDay.to-oneDay.from<0){
			oneDay.to = new Date(oneDay.to.setDate(oneDay.to.getDate()+1));
		}
		oneDay.stepMinutes = 0;
		//计算上午工时
		if( oneDay.from<morningTime ){
			if(oneDay.to<morningTime){
				oneDay.stepMinutes = (oneDay.to - oneDay.from)/(1000*60);
			}else{
				oneDay.stepMinutes = (morningTime - oneDay.from)/(1000*60);
			}
		}
		//计算下午工时
		if( oneDay.to>afternoonTime ){
			if(oneDay.from>afternoonTime){
				oneDay.stepMinutes += (oneDay.to - oneDay.from)/(1000*60);
			}else{
				oneDay.stepMinutes += (oneDay.to - afternoonTime)/(1000*60);
			}
		}
		if(oneDay.from.getDay()==0 || oneDay.from.getDay()==6){
			continue;
		}
		var dayKey = oneDay.from.getFullYear()+"-"+(oneDay.from.getMonth()+1)+"-"+oneDay.from.getDate();
		retJson[''+dayKey+''] = oneDay;
	}
	return retJson;
}