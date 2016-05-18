
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
function createTable(){
  function getCookie(name){
      var value = ";"+document.cookie;
      var parts = value.split(";"+name+"=");
      if(parts.length==2) return parts.pop().split(";").shift();
    }
    var csrf = getCookie('csrftoken');
    var number = location.pathname.match(/\d+/g);
    $.ajax({
      url:'/api/question/status/'+number,
      type:"GET",
      data:'csrfmiddlewaretoken='+csrf,
      cache:false,
      success:function(msg){
        if(msg["success"]==1){
var ctx = document.getElementById("myChart").getContext("2d");

var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["AC", "CE", "WA", "RE", "TLE", "MLE","OLE","PE","SE"],
    datasets: [{
      label: msg["question"]["title"],
      data: msg["question"]["status_list"],
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
var radarctx = document.getElementById("radar").getContext("2d");
var radarchart = new Chart(radarctx,{
  type:'radar',
  data:{
    labels: ["C","C++","Java","Python3","Python4"],
    data: msg["question"]["language_list"],
    datasets:[{
       label:msg["question"]["title"],
       data:[12, 19, 3, 5, 2, 3,18,9,10],
       backgroundColor: "rgba(179,181,198)",
       pointBackgroundColor: "rgba(179,181,198,1)",
       pointBorderColor: "#fff",
       pointHoverBackgroundColor: "#fff",
       pointHoverBorderColor: "rgba(179,181,198,1)"
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
var linectx = document.getElementById("line").getContext("2d");
var linechart = new Chart(linectx,{
  type:'line',
  data:{
    labels:msg["question"]["attention_days"],
    
    datasets:[{
       label: msg["question"]["title"],
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: msg["question"]["attention_values"],
            spanGaps: false,
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true,
          suggestedMin : -0.1,
          suggestedMax:0.1
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
}
addLoadEvent(createTable);