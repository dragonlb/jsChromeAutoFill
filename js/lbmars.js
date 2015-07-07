$('body').on("click", function(){
		console.log("Hello Lb.");
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