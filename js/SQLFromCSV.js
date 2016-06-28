/**
 * Created by alber.lb on 2016/6/28 0028.
 */


function PrepareColumn(pColumnName, pColumnType, pValueSt) {
    this.columnName = pColumnName;
    this.columnType = pColumnType;
    this.valueSt = pValueSt;

    if( typeof PrepareColumn._initiallized == 'undefined'){
        PrepareColumn.prototype.toDbValue = function () {
            if(this.columnType == 'string'){
                return "\'"+this.valueSt+"\'";
            }
            if(this.columnType == 'date'){
                return "\'"+this.valueSt+"\'";
            }
            return this.valueSt;
        };
        PrepareColumn.prototype.available = function () {
            if (this.valueSt==undefined || this.valueSt=="\N" || this.valueSt=="\\N") return false;
            return true;
        };
        PrepareColumn._initiallized = true;
    }
}

var columnNames = ["tb_order_id", "ext_order_id", "status", "ori_price", "trade_price", "activity_flag", "seat_order_id", "user_id", "cinema_id", "ext_cinema_id", "cinema_name", "partner_code", "type", "sale_count", "sale_id", "sale_name", "sale_content", "std_price", "price", "count", "is_combo", "print_count", "print_date", "source", "operator", "refund_status", "refund_reason", "std_flag"];
var columnPros = {tb_order_id : { type: "int"},
    ext_order_id : { type: "string"},
    status : { type: "string"},
    ori_price : { type: "int"},
    trade_price : { type: "int"},
    activity_flag : { type: "string"},
    seat_order_id : { type: "int"},
    user_id : { type: "int"},
    cinema_id : { type: "int"},
    ext_cinema_id : { type: "string"},
    cinema_name : { type: "string"},
    partner_code : { type: "string"},
    type : { type: "int"},
    sale_count : { type: "int"},
    sale_id : { type: "string"},
    sale_name : { type: "string"},
    sale_content : { type: "string"},
    std_price : { type: "int"},
    price : { type: "int", ignore: true},
    count : { type: "int"},
    is_combo : { type: "int"},
    print_count : { type: "int"},
    print_date : { type: "string"},
    source : { type: "int"},
    operator : { type: "string"},
    refund_status : { type: "string"},
    refund_reason : { type: "string"},
    std_flag : { type: "string"},
    gmt_create : { type: "string", default: "now()"},
    gmt_modified : { type: "string", default: "now()"}
};

function convert2insert(lineSt) {
    if (lineSt==undefined || lineSt.length<=0) return;
    var lineColumns = lineSt.split(",");
    var sqlColumns = new Array(), sqlValues = new Array();
    for( var i=0;i<lineColumns.length;i++){
        var columnName = columnNames[i];
        if (columnPros[columnName].ignore!='undefined' && columnPros[columnName].ignore==true)    continue;;
        var oneColumn = new PrepareColumn(columnName, columnPros[columnName].type, lineColumns[i]);
        if (oneColumn.available()){
            sqlColumns.push(oneColumn.columnName);
            sqlValues.push(oneColumn.toDbValue());
        }
    }
    sqlColumns.push("gmt_create");sqlValues.push(columnPros.gmt_create.default);
    sqlColumns.push("gmt_modified");sqlValues.push(columnPros.gmt_modified.default);
    var insertSQL = "insert into tkn_sale_order_detail_sub_0000 ("+sqlColumns.join(",")+") values ("+sqlValues.join(",")+");\n";
    return insertSQL;
}

$("#genInsertSQL").click(function(){
    var aimContents = "";
    var a = $("#csvContent").val();
    columnNames = $("#columnIndex").val().replace(new RegExp(/(\s+)/g),'').split(",");
    new StringObj(a).readLine(function(line){
        aimContents += convert2insert(line);
    });
    $("#insertSqls").val(aimContents);
});