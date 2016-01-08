$('body').on("click", function(){
		//console.log("Hello Lb.");
});
function hello(name){
	var vName = "";
	if(name)	vName = name;
	console.log("Do you know me?\t"+vName);
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

function testBtn(){
	console.log(window.location.href);
	var wkDiv = $('<div id="_lbWkDiv" class="lvmama_wkTime"></div>');
	wkDiv.html("中华人民共和国");
	$("body").append(wkDiv);
}
