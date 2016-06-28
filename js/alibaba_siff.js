/**
 * Created by alber.lb on 2016/6/8 0008.
 */

var alibaba_siff = {
}
alibaba_siff.refreshPrint = function(){
    var jOptions = $("[name='_ordStatus']");
    $.each(jOptions, function(key, val){
        var jOption = $(val);
        if(jOption.attr("status")=='已取票'){
            jOption.append($("<a style='cursor:pointer'>重置取票</a>").attr("orderId", jOption.attr("orderId")).attr("showName", jOption.attr("showName")));
        }
        if(jOption.attr("status")=='Printed'){
            jOption.append($("<a style='cursor:pointer'>Reset</a>").attr("orderId", jOption.attr("orderId")).attr("showName", jOption.attr("showName")));
        }
    });
    jOptions.delegate("a", "click", function(){
        var jHref = $(this);
        console.log(jHref.attr("orderId"));
        var now = new Date();
        var nowMonth = 1 + now.getMonth();
        nowMonth = (nowMonth < 10 ? "0" : "") + nowMonth;
        var nowDate = now.getDate();
        nowDate = (nowDate < 10 ? "0" : "") + nowDate;
        var reqData = {
                tbOrderId: jHref.attr("orderId"),
                d: now.getFullYear() + "-" + nowMonth + "-" + nowDate
            };
        var showName = jHref.attr("showName");
        if(confirm("确定重置该用户下的影片["+showName+"]取票状态吗？")){
            $.ajax({
                url: "/guest_order/reset_status_before_print.json",
                type: "post",
                data : reqData,
                success: function (result) {
                    console.log(result);
                    if(result.data==1){
                        alert("成功的重置了一条记录："+showName+"\t"+reqData.tbOrderId);
                    }
                    else{
                        alert("重置失败, 请手工重置淘宝ID "+showName+"\t"+reqData.tbOrderId);
                    }
                }
            });
        }
    });
}

