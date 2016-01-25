var sendChatMsg = function () {
    var msgNode = document.getElementById("chat_msg");
    if (msgNode.value == "") {
        return;
    }
    chrome.extension.sendRequest({msg: msgNode.value});
    contentNode = document.getElementById("chat_content");
    contentNode.value = contentNode.value + "i say:" + msgNode.value + "/r/n";
    contentNode.scrollTop = contentNode.scrollHeight;
    msgNode.value = "";
};
chatdiv = document.createElement("div");
chatdiv.id = "chat_div";
chatdiv.style.zIndex = "100";
chatdiv.style.position = "absolute";
chatdiv.style.left = "560px";
chatdiv.style.top = "280px";
chatdiv.style.width = "auto";
chatdiv.style.height = "auto";
chatdiv.style.border = "1px solid";
chatdiv.style.overflow = "auto";
chatdiv.style.backgroundColor = "#F7F4EC";
chatdiv.innerHTML = "<div>" +
    "<textarea id=\"chat_content\" ROWS=\"8\" COLS=\"40\"></textarea>" +
    "<div><input id='chat_msg' size=\"35\" type=\"text\"/><input id='sendBtn' type=\"button\" value=\"send\"/></div></div>";
document.body.appendChild(chatdiv);
document.getElementById("sendBtn").addEventListener('click', sendChatMsg, false);
chrome.extension.onRequest.addListener(
    function (data) {
        contentNode = document.getElementById("chat_content");
        contentNode.value = contentNode.value + "extension say:" + data.msg + "/r/n";
        contentNode.scrollTop = contentNode.scrollHeight;
    }
);