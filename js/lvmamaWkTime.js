/**
 * Created by libing on 2015/12/25.
 */
var lvmamaWkTime = {
    createMathResult : function(){
        return {
            wkStart: "",
            wkEnd:"",
            expDays:[],         //截止当前--异常打卡日
            companyAll:0,       //总--标准工作分钟数
            actualAll:0,        //总--实际工作分钟数
            companyAllSt:"",    //总--标准工时
            lessWkAllSt: "",    //总--差异工时
            companyNow:0,       //截止当前--标准工作分钟数
            companyNowSt:"",    //截止当前--标准工时
            lessWkNowSt: "",    //截止当前--差异工时
            actualAllSt:""      //实际工时
        }
    },
    mathMinutes: function(pResult){
        var vMinutes = pResult.actualAll-pResult.companyAll;
        var vHours = parseInt(vMinutes/60)%8;
        var vDays = parseInt(vMinutes/480);
        //pResult.lessWkAllSt = ""+(vDays==0?"":(vDays+" 天, "))+(vHours==0?"":(vHours+" 小时, "))+(vMinutes%60)+" 分钟";
        pResult.lessWkAllSt = ""+vDays+" 天, "+vHours+" 小时, "+(vMinutes%60)+" 分钟";

        vMinutes = pResult.actualAll-pResult.companyNow;
        vHours = parseInt(vMinutes/60)%8;
        vDays = parseInt(vMinutes/480);
        //pResult.lessWkNowSt = ""+(vDays==0?"":(vDays+" 天, "))+(vHours==0?"":(vHours+" 小时, "))+(vMinutes%60)+" 分钟";
        pResult.lessWkNowSt = ""+vDays+" 天, "+vHours+" 小时, "+(vMinutes%60)+" 分钟";

        vMinutes = pResult.actualAll;
        vHours = parseInt(vMinutes/60)%8;
        vDays = parseInt(vMinutes/480);
        //pResult.actualAllSt = ""+(vDays==0?"":(vDays+" 天, "))+(vHours==0?"":(vHours+" 小时, "))+(vMinutes%60)+" 分钟";
        pResult.actualAllSt = ""+vDays+" 天, "+vHours+" 小时, "+(vMinutes%60)+" 分钟";

        pResult.companyAllSt = parseInt(pResult.companyAll/480) + " 天";
        pResult.companyNowSt = (parseInt(pResult.companyNow/480)<10?"0":"")+parseInt(pResult.companyNow/480) + " 天";
        return pResult;
    },
    showMathResult: function(pResult){
        lvmamaWkTime.mathMinutes(pResult);
        console.log("["+pResult.wkStart+" 至 "+pResult.wkEnd+"]区间应工作 "+pResult.companyAll+" 分钟");
        console.log("当月应工作天数："+pResult.companyAllSt+"\t\t截止目前应工作天数："+pResult.companyNowSt);
        console.log("实际工作：[ "+pResult.actualAllSt+" ]");
        console.log("差异工时：[ "+pResult.lessWkAllSt+" ]");
        var exprDaysSt = "";
        if(pResult.expDays.length>0){
            for(var i=0;i<pResult.expDays.length;i++){
                exprDaysSt += (exprDaysSt.length<=0?"":", ")+pResult.expDays[i];
            }
            console.log("异常打卡("+pResult.expDays.length+")天：[ "+exprDaysSt+" ]");
        }

        var wkDiv = $("#_lbWkDiv").html("");
        var wkUl = $('<ul class="lvmama_wkUl"></ul>');
        wkUl.append($("<li></li>").html("统计区间：["+pResult.wkStart+" 至 "+pResult.wkEnd+"]"));
        wkUl.append($("<li></li>").html("实际工作：[ "+pResult.actualAllSt+" ]"));
        wkUl.append($("<li></li>").html("<span class='lvmama_less0'>截止当前--统计："+pResult.companyNowSt+"</span><span class='lvmama_less'>差异工时："+pResult.lessWkNowSt+"</span>"));
        wkUl.append($("<li></li>").html("<span class='lvmama_less0'>当月总共--统计："+pResult.companyAllSt+"</span><span class='lvmama_less'>差异工时："+pResult.lessWkAllSt+"</span>"));
        if(exprDaysSt!=""){
            wkUl.append($("<li></li>").html("异常打卡("+pResult.expDays.length+")天：[ "+exprDaysSt+" ]"));
        }
        wkDiv.append(wkUl);
        $("body").append(wkDiv);
    }
};
lvmamaWkTime.calcWorkTime = function(){
    var weekDays = ['天', '一', '二', '三', '四', '五', '六'];
    var nowDate = new Date();
    var perMitUrl = "http://ekp.joyu.com";
    if(window.location.href.indexOf(perMitUrl)!=0){
        alert("请先登陆 "+perMitUrl+" ,再使用此插件。");
        return;
    }
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
        lvmamaWkTime.loadingWkTimes();
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
        var mathResult= lvmamaWkTime.createMathResult();
        mathResult.wkStart = pData.fdStart;
        mathResult.wkEnd = pData.fdEnd;
        $.getJSON(url, pData, function(jsonData){
            var workDays = lvmamaWkTime.dealWithJson(jsonData);
            for(var oneDay = new Date(fdStart),dayOfMonth=0;oneDay<fdEnd; oneDay=new Date(oneDay.setDate(oneDay.getDate()+1))){
                if(lvmamaWkTime.isFreeDay(oneDay)){
                    continue;
                }
                mathResult.companyAll += 480;
                var dayKey = oneDay.getFullYear()+"-"+(oneDay.getMonth()+1)+"-"+oneDay.getDate();
                var actualMinutes = 0;
                var actualTimes = "";
                if(workDays[dayKey]){
                    actualMinutes = workDays[dayKey].stepMinutes;
                    actualTimes = workDays[dayKey].title;
                    mathResult.actualAll += actualMinutes;
                }
                if(lvmamaWkTime.isYesterdayOrBefore(oneDay)){
                    mathResult.companyNow += 480;
                    if(!workDays[dayKey] || !workDays[dayKey].stepMinutes || workDays[dayKey].stepMinutes<=0){
                        mathResult.expDays.push(dayKey);
                    }
                }
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
            lvmamaWkTime.showMathResult(mathResult);
        });
    }catch(e){
        alert("输入的 JSON 不合法!"+e);
    }
}

lvmamaWkTime.dealWithJson = function(workJson){
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
            oneDay.from = new Date(oneDay.start+" "+wkTimes[0]);
            oneDay.to = new Date(oneDay.start+" "+wkTimes[1]);
            if($.trim(wkTimes[0]).length==0 || $.trim(wkTimes[1]).length==0 ){
                oneDay.stepMinutes = 0;
            }
            else{
                lvmamaWkTime.calcStepMinutes(oneDay);
            }
        }catch(Ex){
            continue;
        }
        var dayKey = oneDay.from.getFullYear()+"-"+(oneDay.from.getMonth()+1)+"-"+oneDay.from.getDate();
        retJson[''+dayKey+''] = oneDay;
    }
    return retJson;
}

lvmamaWkTime.calcStepMinutes = function(oneDay){
    oneDay.stepMinutes = 0;
    var morningTime = new Date(oneDay.start+" 12:00:00");
    var afternoonTime = new Date(oneDay.start+" 13:00:00");
    if(oneDay.to-oneDay.from<0){
        oneDay.to = new Date(oneDay.to.setDate(oneDay.to.getDate()+1));
    }
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
}

/**
 * 节假日判断
 * @param pDay
 * @returns {boolean}
 */
lvmamaWkTime.isFreeDay = function(pDay){
    if(!pDay || !(pDay instanceof Date) )   return false;
    var freeDays_noYear = ["0101", "0501", "1001", "1002", "1003", "1004", "1005", "1006", "1007"];
    var freeDays = ["20160207","20160208","20160209","20160210","20160211","20160212","20160213"];
    try{
        for(var i=0;i<freeDays.length;i++){
            if(lvmamaWkTime.isSameDay(pDay, freeDays[i])){
                return true;
            }
        }
        for(var i=0;i<freeDays_noYear.length;i++){
            if(lvmamaWkTime.isSameDay_noYear(pDay, freeDays_noYear[i])){
                return true;
            }
        }
        if(pDay.getDay()==0 || pDay.getDay()==6){//周六或周日
            return true;
        }
    }catch(E){return false;}
    return false;
}

lvmamaWkTime.isSameDay = function(pDay, freeDaySt){
    var pDaySt = pDay.getFullYear();
    pDaySt += (pDay.getMonth()+1)<10?('0'+(pDay.getMonth()+1)):(pDay.getMonth()+1);
    pDaySt += pDay.getDate();
    return pDaySt==freeDaySt;
}
lvmamaWkTime.isSameDay_noYear = function(pDay, freeDaySt){
    var pDaySt = "";
    pDaySt += (pDay.getMonth()+1)<10?('0'+(pDay.getMonth()+1)):(pDay.getMonth()+1);
    pDaySt += pDay.getDate()<10?('0'+pDay.getDate()):pDay.getDate();
    return pDaySt==freeDaySt;
}
lvmamaWkTime.isYesterdayOrBefore = function(pDay){
    var pDaySt = pDay.getFullYear();
    pDaySt += (pDay.getMonth()+1)<10?('0'+(pDay.getMonth()+1)):(pDay.getMonth()+1);
    pDaySt += pDay.getDate();
    var nowDay = new Date();
    var nDaySt = nowDay.getFullYear();
    nDaySt += (nowDay.getMonth()+1)<10?('0'+(nowDay.getMonth()+1)):(nowDay.getMonth()+1);
    nDaySt += nowDay.getDate();
    return parseInt(pDaySt)<parseInt(nDaySt);
}
lvmamaWkTime.loadingWkTimes = function(){
    var wkDiv = $('<div id="_lbWkDiv" class="lvmama_wkTime"></div>');
    var contentHtml = "";
    contentHtml += '<div class="spinner">' +
        '<div class="spinner-container container1">' +
        '<div class="circle1"></div>' +
        '<div class="circle2"></div>' +
        '<div class="circle3"></div>' +
        '<div class="circle4"></div>' +
        '</div>' +
        '<div class="spinner-container container2">' +
        '<div class="circle1"></div>' +
        '<div class="circle2"></div>' +
        '<div class="circle3"></div>' +
        '<div class="circle4"></div>' +
        '</div>' +
        '<div class="spinner-container container3">' +
        '<div class="circle1"></div>' +
        '<div class="circle2"></div>' +
        '<div class="circle3"></div>' +
        '<div class="circle4"></div>' +
        '</div>' +
        '</div>';
    wkDiv.html(contentHtml);
    $("body").append(wkDiv);
    $("body").unbind("click").bind("click", function(){$("#_lbWkDiv").remove();})
}