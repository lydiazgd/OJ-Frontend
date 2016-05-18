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
function creatTable2 (array) {
  var s = "";
  var table = $("<table></table>");
  table.addClass("table table-bordered");
  table.appendTo(($("#table")));
  s+= '<tr><td>#</td><td class = "title">Problem</td><td class = "title">Submit</td><td class = "title">Source</td><td class="title">Accept</td></tr>';
  $(table).append(s);
  var dim1 = array.length;
  var tr_begin;
  for(var i=0;i<dim1;i++ ){
    if((i+1)%2==0){
      tr_begin = '<tr>';
    }
    else if((i+1)%10==1){
     tr_begin = '<tr class = "success">';
    }
    else if((i+1)%10==3){
      tr_begin = '<tr class = "warning">';
    }
    else if((i+1)%10==5){
      tr_begin = '<tr class = "danger">';
    }
    else if((i+1)%10==7){
      tr_begin = '<tr class = "info">';
    }
    else if((i+1)%10==9){
      tr_begin = '<tr class = "active">';
    }
    var string=tr_begin;
    var string1='<td class = "small">'+array[i]["id"]+'</td>'+'<td class = "big">'+'<a href = "http://oj.lydiage.com/problem/'+array[i]["id"]+'">'+array[i]["title"]+'</a>'+
    '</td>'+'<td class = "small">'+'<a href = "/submit/'+array[i]["id"]+'">'+ 
    '<span class= "glyphicon glyphicon-send">'+'</span>'+'</a>'+'</td>'+'<td class="mid">'+array[i]["source"]+'</td>'+
    '<td class = "mid">'+'<a href="/statistics/'+array[i]["id"]+'">'+array[i]["ac_num"]+'</a>'+'</td>';
    string+=string1;
    string+='</tr>';
    $(table).append(string);
  }
}
function locateContent() {
  var variable;
  var a;
  if(window.XMLHttpRequest){
    variable = new XMLHttpRequest();
  }
  else {
    variable= new ActiveXObject("Microsoft.XMLHTTP");
  }
  variable.onreadystatechange=function(){
    if(variable.readyState==4&&variable.status==200){
      var obj=JSON.parse(variable.responseText);
      if(obj["success"]){

        creatTable2(obj["questions"]);
      }
    }
  }
variable.open("GET","/api/question/?format=json",true);
variable.send();
}
addLoadEvent(locateContent);