/**
 * Created by libing on 2015/12/25.
 */
var lvmamaWkTime = {};
lvmamaWkTime.calcWorkTime = function(){
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
            var workDays = lvmamaWkTime.dealWithJson(jsonData);
            for(var oneDay = new Date(fdStart),dayOfMonth=0;oneDay<fdEnd; oneDay=new Date(oneDay.setDate(oneDay.getDate()+1))){
                if(lvmamaWkTime.isFreeDay(oneDay)){
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
lvmamaWkTime.showResult = function(){

}