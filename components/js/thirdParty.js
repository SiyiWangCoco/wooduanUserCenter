//第三方登录，游戏基本信息接口
function getInfo(){
  $.ajax({
    type:'GET',
    url:' http://192.168.0.18:8015/web/basic/chargeBaseData',
    dataType:"json",
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    },
    success: function(res){
      console.log(res.data); 
      setInfo(res.data);
    },
    error: function() { 
      alert("error");
    } 
  });
}

function setInfo(data) {
  var qq = document.getElementById("qq");
  qq.setAttribute("href", data.base_configs.third_login_url.facebook + "&amp;source=h5");
  qq.setAttribute("target", "_blank");
}