
function createlist(){
  $("#whole").animate({
   opacity:'1'
 })
 
  $("#reg").click(function(){
   $("#divmain").show().animate({
      height:'400px',
      width:'400px',
      left:'35%',
      top:'21%'
   });
    $("#whole").animate({
     opacity:'0.4'
   })
    $("#table").animate({
      opacity:'0.4'
    })
     $("#divmain2").hide().animate({
       
  });
  });
  $("#close").click(function(){
    $("#divmain").hide().animate({
       
  });
    $("#whole").animate({
     opacity:'1'
   })
    $("#table").animate({
      opacity:'1'
    })
  });
  $("#whole").animate({
   opacity:'1'
 })
 
  $("#reg2").click(function(){
   $("#divmain2").show().animate({
      height:'300px',
      width:'400px',
      left:'35%',
      top:'21%'
   });
    $("#whole").animate({
     opacity:'0.4'
   })
    $("#table").animate({
      opacity:'0.4'
    })
     $("#divmain").hide().animate({
       
  });
  });
  $("#close2").click(function(){
    $("#divmain2").hide().animate({
       
  });
    $("#whole").animate({
     opacity:'1'
   })
    $("#table").animate({
      opacity:'1'
    })
  });
};
function submitInput() {
  $("#submit2").click(function(){
   
    var username = $('input[name="username"]');
    var password = $('input[name="password"]');
    function getCookie(name){
      var value = ";"+document.cookie;
      var parts = value.split(";"+name+"=");
      if(parts.length==2) return parts.pop().split(";").shift();
    }
    var csrf = getCookie('csrftoken');
    var data = 'username='+username.val()+'&'+'password='+password.val()+'&csrfmiddlewaretoken='+csrf;
    $.ajax ({
      url:"/api/login/?format=json",
      type:"POST",
      data:data,
      cache:false,
      success:function(msg){
        if(msg["success"]==1){
           $("#whole").animate({
          opacity:'1'
          })
         $("#table").animate({
          opacity:'1'
          })
         $("#divmain2").hide().animate({
       
          });
          alert('login successful');
          $("#reg2").empty();
          var name = $("<span>"+username.val()+"</span>");
          name.appendTo(($("#reg2")));
          $("#reg2").unbind();
          $("#reg").empty();
          var second = $("<span>Log Out</span>");
          second.appendTo(($("#reg")));
          $("#reg").unbind();
          logout();
      }
        else {
          username.value="";
          password.value="";
          submitInput();
          alert('error message');
        }
      }
    });
    return false;
  });
};
function logout() {
  function getCookie(name){
      var value = ";"+document.cookie;
      var parts = value.split(";"+name+"=");
      if(parts.length==2) return parts.pop().split(";").shift();
    }
    var csrf = getCookie('csrftoken');
    var data = 'csrfmiddlewaretoken='+csrf;
  $("#reg").click(function(){
            $.ajax({
              url:"/api/logout/?format=json",
              type:"GET",
              data:data,
              cache:false,
              success:function(msg){
                if(msg["success"]==1){
              $("#reg2").empty();
              var name = $("<span>Log in</span>");
              name.appendTo(($("#reg2")));
              $("#reg").empty();
              var second = $('<span>Signup</span>');
              second.appendTo(($("#reg")));
              createlist();
              submitInput();
              register();
            
              }
            }
          })
        });
};
function register() {
  $("#submit1").click(function(){
    var usernameori = $('input[name="usernameori"]');
    var passwordori = $('input[name="passwordori"]');
    var email = $('input[name = "email"]');
     function getCookie(name){
      var value = ";"+document.cookie;
      var parts = value.split(";"+name+"=");
      if(parts.length==2) return parts.pop().split(";").shift();
    }
    var csrf = getCookie('csrftoken');
    var data = 'username='+usernameori.val()+'&'+'email='+email.val()+'&'+'password='+passwordori.val()+'&csrfmiddlewaretoken='+csrf;
    $.ajax({
       url:"/api/register/?format=json",
       type:"POST",
       data:data,
       cache:false,
       success:function(msg){
        if(msg["success"]==1){

          $("#divmain").hide().animate({
       
          });
          $("#divmain2").show().animate({
           height:'300px',
           width:'400px',
           left:'35%',
           top:'21%'
           });
           $("#whole").animate({
           opacity:'0.4'
           })
           $("#table").animate({
           opacity:'0.4'
           })

         
        }
        else {
          alert('wrong message');
        }
       }
    })
      
  });
};
function addTips() {
  var login = $('<span>Login</span>');
  login.appendTo(($("#reg2")));
  var register = $('<span>Signup</span>');
  register.appendTo(($("#reg")));
} 
function testUsername() {
    function getCookie(name){
      var value = ";"+document.cookie;
      var parts = value.split(";"+name+"=");
      if(parts.length==2) return parts.pop().split(";").shift();
    }
    var csrf = getCookie('csrftoken');
    var data = 'csrfmiddlewaretoken='+csrf;
  $.ajax({
   url:"/api/whoami/?format=json",
   type:"GET",
   data:data,
   cache:false,
   success:function(msg){
    if(msg["user"]!="AnonymousUser"){
       $("#reg2").empty();
       var username = $('<span>'+msg["user"]+'</span>');
       username.appendTo(($("#reg2")));
       $("#reg").empty();
       var status = $('<span>log out</span>');
       status.appendTo(($("#reg")));
       logout();
    }
    else{
      submitInput();
      register();
      createlist();
      addTips();
    }
   }

  });
};
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

addLoadEvent(testUsername);

