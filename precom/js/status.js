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
function createStatus(array) {
  var table = $("<table></table>");
  table.addClass("table table-striped");
  table.appendTo(($("#status")));
 var string  ="";
  string+='<tr><td class = "textstyle">#</td><td class="basicstyle">Username</td><td class="basicstyle">Question Title</td><td class="basicstyle">Language</td><td class="basicstyle">Status</td><td class="basicstyle">Submit_Time</td><td class="basicstyle">Judge_Time</td></tr>';
  $(table).append(string);
  var tr_begin;
  for(var i = 0;i<array.length;i++){
    if(i%2==0){
      tr_begin = '<tr class="active">';
    }
    else {
      tr_begin = '<tr>';
    }
   
    var s = "";
    var string1 = '<td class = "textstyle">'+array[i]["id"]+'</td>'+'<td class = "textstyle">'+'<a href = "/user/'+array[i]["user_details"]["id"]+'">'+array[i]["user_details"]["username"]+'</a>'+'</td>'+
    '<td class = "textstyle">'+array[i]["question_details"]["title"]+'</td>';
    if(array[i]["language"]==0){
      s = '<td class = "textstyle">C</td>';
    }
    else if(array[i]["language"]==1){
      s = '<td class = "textstyle">C++</td>';
    }
    else if(array[i]["language"]==2){
      s = '<td class= "textstyle">Java</td>';
    }
    else if(array[i]["language"]==3){
      s = '<td class = "textstyle">Python3</td>';
    }
    else if (array[i]["language"]==4){
      s = '<td class = "textstyle">Python4</td>';
    }
    string1+=s;
    var s2= "";
    if(array[i]["status"]==0){
    s2 = '<td style = "color:#40E0D0;text-align:center;font-size:16px">Waiting</td>';
  }
  else if (array[i]["status"]==1){
    s2 = '<td style = "color:#E6E6FA">Judging</td>';
  }
  else if(array[i]["status"]==2){
    s2='<td style = "color:red">Compiling</td>';
  }
  else if(array[i]["status"]==3){
    s2 = '<td style = "color:BC8F8F">Running</td>';
  }
  else if (array[i]["status"]==4){
    s2 = '<td style = "color:#228B22;text-align:center;font-size:16px">Accepted</td>';
  }
  else if (array[i]["status"]==5){
    s2 = '<td style = "color:#FF6347;text-align:center;font-size:16px">CompilerError</td>';
  }
  else if (array[i]["status"]==6){
    s2 = '<td style = "color:#FF6347;text-align:center;font-size:16px">WrongAnswer</td>';
  }
  else if (array[i]["status"]==7){
    s2 = '<td style = "color:#FF6347;text-align:center;font-size:16px">RunTimeError</td>';
  }
   else if (array[i]["status"]==8){
    s2 = '<td style = "color:red">TimeLimitExceeded</td>';
  }
  else if (array[i]["status"]==9){
    s2 = '<td style = "color:#FF6347;text-align:center;font-size:16px">MemoryLimitExceeded</td>';
  }
  else if (array[i]["status"]==10){
    s2 = '<td style = "color:#FF6347;text-align:center;font-size:16px">OutputLimitExceeded</td>';
  }
   else if (array[i]["status"]==11){
    s2 = '<td style = "color:red">PresentationError</td>';
  }
  else if (array[i]["status"]==12){
    s2 = '<td style = "color:red">SystemError</td>';
  }
  string1+=s2;  
    var date1 =  moment(array[i]["submit_time"]).format("YYYY-MM-DD HH:mm:ss ");
    string1+='<td class = "textstyle">'+date1+'</td>';
    var date2 =  moment(array[i]["judge_time"]).format("YYYY-MM-DD HH:mm:ss ");
    string1+='<td class = "textstyle">'+date2+'</td>';
   tr_begin+=string1;
   tr_begin+='</tr>';
   $(table).append(tr_begin);
 }
 var footerstring = '<footer id = "statusfooter">'+'<p class= "pull-right">'+'<a href="#" class="btn btn-default">'+'Back to top'+'</a>'+'</p>'+'</footer>';
  $("#status").append(footerstring);
}
function createContent() {
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
       var obj = JSON.parse(variable.responseText);
       if(obj["success"]){
       createStatus(obj["statuses"]);
     }
    }
  }
  variable.open("GET","/api/status/?format=json",true);
  variable.send();

}

addLoadEvent(createContent);
