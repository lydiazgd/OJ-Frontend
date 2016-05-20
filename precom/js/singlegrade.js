
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
var username;
var submissions;
function creatSingleStatus() {
    var user_number = location.pathname.match(/\d+/g);
     function getCookie(name){
      var value = ";"+document.cookie;
      var parts = value.split(";"+name+"=");
      if(parts.length==2) return parts.pop().split(";").shift();
    }
    var csrf = getCookie('csrftoken');
    var data = 'csrfmiddlewaretoken='+csrf;
    $.ajax({
       url:"/api/user/"+user_number+"/?format=json",
       type:"GET",
       data:data,
       cache:false,
       success:function(msg){
        if(msg["success"]==1){
          username=msg["userdetails"]["username"];
          submissions= msg["userdetails"]["profile"]["submitions"];
          var div = $("#userdescription");
          var string = '<p id = "nametip">'+msg["userdetails"]["username"]+
          '<span class="glyphicon glyphicon-ok">'+'</span>'+'</p>'+
          '<p class="regtime">'+'Register time:'+moment(msg["userdetails"]["date_joined"]).format("YYYY-MM-DD HH:mm:ss ")+'</p>'+
          '<p class="regtime">'+'Last login:'+moment(msg["userdetails"]["last_login"]).format("YYYY-MM-DD HH:mm:ss ")+'</p>'+
          '<p class="regtime">'+'Group:'+msg["userdetails"]["groups"]+'</p>'+
          '<p class="regtime">'+'Problem Status:'+'</p>';
          $(div).append(string);
          for(var i =0; i<msg["userdetails"]["profile"]["try_list"].length;i++){
          $("#tryed_problem").append(msg["userdetails"]["profile"]["try_list"][i]);
          $("#tryed_problem").append(" ");
        } 
          for(var j = 0;j<msg["userdetails"]["profile"]["ac_list"].length;j++){
          $("#solved_problem").append(msg["userdetails"]["profile"]["ac_list"][j]);
          $("#solved_problem").append(" ");
        }
        var ctx = document.getElementById("myChart").getContext("2d");
        var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ["AC", "CE", "WA", "RE", "TLE", "MLE","OLE","PE","SE"],
          datasets: [{
            label: username,
            data: submissions,
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(85,  107, 47, 0.2)',
            'rgba(144, 238, 144, 0.2)',
            'rgba(205, 133, 63, 0.2)'
            ],
            borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 0
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              }
            }]
          },
          responsive: true,
          maintainAspectRatio: true
        }
      });
        }
       }
    });
};

addLoadEvent(creatSingleStatus);
