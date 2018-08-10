// client-side js
// run by the browser each time your view template is loaded


$("#form1").submit(function(e)
                  {
  var username=$("#uname").value();
  var data=
      {
        "username":username
      };
  
  $.ajax({
    type:"post",
    url:"/api/exercise/new-user",
    data:data,
    success: function(data) {
                      console.log("success")
                      console.log("ok");
                    },
      error: function( jqXhr, textStatus, errorThrown ){
        console.log("error");
      }
    });
});

$("#form2").submit(function(e)
                   {
  var uid=$("#uid").value();
  var desc=$("#desc").value();
  var dur=$("#dur").value();
  var date=$("#date").value();
  console.log("hi"+uid);
  var data={
    "userId":uid,
    "description":desc,
    "duration":dur,
    "date":date
  };
  $.ajax({
    type:"post",
    url:"/api/exercise/add",
    data:data,
    success: function(data) {
                      console.log("success")
                      console.log("ok");
                    },
      error: function( jqXhr, textStatus, errorThrown ){
        console.log("error");
      }
    });
  
});