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
function createProblemContent(array) {
  var str = location.pathname;
  var number = str.match(/\d+/g);
  number = parseInt(number);
  number+=1;
  $("#question_number").attr("href","/problem/"+number);
  var number2=number-1;
  $("#question_statistics").attr("href","/statistics/"+number2);
	var string = "";
  string +='<div>'+'<h2 class = "textstyle">'+array["title"]+'</h2>'+
  '<p class = "time_limit">'+'time_limit: '+array["time_limit"]+' '+';'+'memory_limit: '+array["memory_limit"]+'</p>'+
  '<h3>'+'Problem Description'+'</h3>'+'</div>';
  var string1 = '<div>'+'<p class = "description">'+array["description"]+'</p>'+'<h3>'+'Input'+'</h3>'+'</div>';
  string+=string1;
  var string2 = '<div>'+'<p class = "description">'+array["description_input"]+'</p>'+'<h3>'+' Output'+'</h3>'+'</div>';
   string+=string2;
  var string3 = '<div>'+'<p class = "description">'+array["description_output"]+'</p>'+'<h3>'+'Sample Input'+'</h3>'+'</div>';
  string+=string3;
  var string4 = '<div>'+'<div class = "inner">'+'<pre>'+'<p class = "description">'+array["sample_input"]+'</p>'+'</pre>'+'</div>'+
  '<h3>'+'Sample Output'+'</h3>'+'</div>';
  string+=string4;
  var string5 = '<div>'+'<div class = "inner">'+'<pre>'+'<p class = "description">'+array["sample_output"]+'</p>'+'</pre>'+'</div>'+
  '<h3>'+'Source'+'</h3>'+'</div>';
  string+=string5;
  string6 = '<div>'+'<p class = "description">'+array["source"]+'</p>'+'</div>';
  string+=string6;
  $("#problemd").append(string);
  string7 = '<footer>'+'<p class = "pull-right">'+'<a href="#" class = "btn btn-default">'+'Back to top'+'</a>'+'</p>'+'</footer>';
  $("#problemd").append(string7);
}
function locateContent2() {
  var variable;
  var str = location.pathname;
  var number = str.match(/\d+/g);
  if(window.XMLHttpRequest){
    variable = new XMLHttpRequest();
  }
  else {
    variable= new ActiveXObject("Microsoft.XMLHTTP");
  }
  variable.onreadystatechange=function(){
    if(variable.readyState==4&&variable.status==200){
       var obj = JSON.parse(variable.responseText);
       if(obj["success"]){
       createProblemContent(obj["question"]);
     }
    }
  }
  variable.open("GET",'/api/question/'+number+'/?format=json',true);
  variable.send();

}
addLoadEvent(locateContent2);

