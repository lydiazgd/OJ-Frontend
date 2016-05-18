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
function locateContent() {
	var address=document.write(location.pathname);
	var number = document.write(str.match(/\d+/g));
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
       a = variable.responseText;
		}
	}
	variable.open("GET","http://oj.lydiage.com/api/question/?format=json",true);
	variable.send();

}
