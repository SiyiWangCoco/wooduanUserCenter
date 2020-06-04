

function userInfomation() {
    $.ajax({
              headers: {
                "Authorization":localStorage.getItem("mytoken")//此处放置请求到的用户token
              },

              type:'GET',
              url:' http://192.168.0.18:8015/web/basic/chargeBaseData',
              contentType:'application/x-www-form-urlencoded', 
              
              
              success:function(res){
               console.log("请求结果=="+JSON.stringify(res));

              },
              error:function() { 
                alert("请求失败！");
             } 
            });
}


