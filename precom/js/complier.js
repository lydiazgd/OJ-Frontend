function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }

}
var myCodeMirror;
var language=1;
function creatcomplier() {
  
  myCodeMirror = CodeMirror.fromTextArea(document.getElementById("code"), {
  value: "function myScript(){return 100;}\n",
  mode:  "text/x-c++src",
  lineNumbers:true,
  matchBrackets:true,
  theme:"base16-light"
});
  
  myCodeMirror.setValue("hello world !");

}
function fullfillTheBlank() {

  $("#cplus").click( function(){
    $("#dropdownMenu1").empty();
    var title = $("<span>"+"C++"+" "+"</span>");
    var menu = $("#dropdownMenu1");
    title.appendTo(menu);
    var tip = $("<span></span>");
    tip.addClass("caret");
    tip.appendTo(menu);
    language=1;
    myCodeMirror.setOption("mode","text/x-c++src");
  });
  $("#c").click( function(){
    $("#dropdownMenu1").empty();
    var title = $("<span>"+"C"+" "+"</span>");
    var menu = $("#dropdownMenu1");
    title.appendTo(menu);
    var tip = $("<span></span>");
    tip.addClass("caret");
    tip.appendTo(menu);
    language=0;
    myCodeMirror.setOption("mode","text/x-csrc");
  });
   $("#java").click( function(){
    $("#dropdownMenu1").empty();
    var title = $("<span>"+"java"+" "+"</span>");
    var menu = $("#dropdownMenu1");
    title.appendTo(menu);
    var tip = $("<span></span>");
    tip.addClass("caret");
    tip.appendTo(menu);
    language=2;
    myCodeMirror.setOption("mode","text/x-java");
  });
   $("#python3").click( function(){
    $("#dropdownMenu1").empty();
    var title = $("<span>"+"python2"+" "+"</span>");
    var menu = $("#dropdownMenu1");
    title.appendTo(menu);
    var tip = $("<span></span>");
    tip.addClass("caret");
    tip.appendTo(menu);
    language=3;
    myCodeMirror.setOption("mode","python");

  });
   $("#python4").click(function(){
    $("#dropdownMenu1").empty();
    var title = $("<span>"+"python3"+" "+"</span>");
    var menu = $("#dropdownMenu1");
    title.appendTo(menu);
    var tip = $("<span></span>");
    tip.addClass("caret");
    tip.appendTo(menu);
    language=4;
    myCodeMirror.setOption("mode","python");
   });
}
function sendCodeContent() {
  $("#scode").click(function(){
     function getCookie(name){
      var value = ";"+document.cookie;
      var parts = value.split(";"+name+"=");
      if(parts.length==2) return parts.pop().split(";").shift();
    }
    var csrf = getCookie('csrftoken');
  $("#code").text(myCodeMirror.getValue());
  var content =$("#code").val();
  var real_content = encodeURIComponent(content);
  var question = location.pathname.match(/\d+/g);
  var button_content = $("#dropdownMenu1").val();
  var data = 'code='+real_content+'&'+'language='+language+'&'+'question='+question+'&csrfmiddlewaretoken='+csrf;
  $.ajax({
     url:"/api/submit/?format=json",
     type:"POST",
     data:data,
     cache:false,
     success:function(msg){
      if(msg["success"]==1){
        window.location.href="/status.html";
      }
     }
  });
});
};
function fullfillQuestionNumber() {
  var path = location.pathname;
  var string = path.match(/\d+/g);
  $("#question_number").attr("placeholder",string);
}
addLoadEvent(fullfillTheBlank);
addLoadEvent(creatcomplier);
addLoadEvent(fullfillQuestionNumber);
addLoadEvent(sendCodeContent);
