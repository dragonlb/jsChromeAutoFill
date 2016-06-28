/**
 * Created by alber.lb on 2016/6/28 0028.
 */
function StringObj(pContent) {
    this.content = pContent;

    if( typeof StringObj._initiallized == 'undefined'){
        StringObj.prototype.readLine = function (eachFun) {
            if (this.content.length <= 0) return;
            for (var pFrom = 0, pTo = -1; (pTo = this.content.indexOf("\n", pFrom)) > 0; pFrom = pTo + 1) {
                var oneLine = this.content.slice(pFrom, pTo);
                if( false == eachFun( oneLine ) )   break;;
            }
        };
        StringObj._initiallized = true;
    }
}
