//获取手机号码(忘记密码，绑定手机)
function phoneFind(use) {
  var phoneFind = document.getElementById("phoneFind");
  let phoneReg = /^1[3-578]\d{9}$/; 
  if (phoneReg.test(phoneFind.value) == false) { //输入为非法手机号
    alert("请输入正确的手机号码")
  } else {
    phoneCode(phoneFind.value,use);
  }
}

//获取手机号码(解绑手机)
function oldPhone(use) {
  var oldPhone = document.getElementById("oldPhone");
  phoneCode(oldPhone.value,use);
}


//获取邮箱号码(绑定邮箱)
function emailB(use) {
  var userEmail = document.getElementById("userEmail");
  let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  if (mailReg.test(userEmail.value) == false) { //输入为非法邮箱号
    alert("请输入正确的电子邮箱")
  } else {
    emailCode(userEmail.value,use);
  }
}

//获取邮箱号码(忘记密码)
function emailF(use) {
  var emailFind = document.getElementById("emailFind");
  let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  if (mailReg.test(emailFind.value) == false) { //输入为非法邮箱号
    alert("请输入正确的电子邮箱")
  } else {
    emailCode(emailFind.value,use);
  }
}

//获取邮箱号码(解绑邮箱)
function getEmail(use) {
  var oldEmail = document.getElementById("oldEmail");
  emailCode(oldEmail.value,use);
}

//图片二维码刷新，500过期
function refreshImageCode(){
  $.ajax({
    type:'GET',
    url:' http://192.168.0.18:8015/VerificationCode/img',
    dataType:"json",
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    },
    success: function(res){
      console.log(res.data);  
    },
    error: function() { 
      alert("error");
    } 
  });
}

//手机验证码 reg/login/forgot/bind/unbind/other
function phoneCode(phoneNum,use) {
  let key = "wizard-member-client-message-code";
  let postData = {
    type: use,
    phone: phoneNum,
    language: "zh",
    sign: $.md5( phoneNum + "|" + use + "|zh|" + key)
  }
  $.ajax({
    type:"POST",
    url: 'http://192.168.0.18:8015/web/basic/sendMessageCode',
    dataType:"json",
    data:JSON.stringify(postData),
    contentType:'application/json',
    success:function(res){
      console.log(res)
      if (res.code == 10000) {
        alert(" 输入错误");
      } else if( res.code == 10008) {
        alert("手机号已经注册过了");
      } else if( res.code == 1009) {
        alert("此手机号还未注册");
      } else if( res.code == 10010) {
        alert("验证码发送失败");
      } else if (res.code == 0) {
        alert("success");
      }
    },
    error:function(res) {
       alert("error");
    }
  });
}

//邮箱验证码 reg/login/forgot/bind/unbind
function emailCode(emailNum,use) {
  let postData = {
    email: emailNum,
    type: use,
    language: "zh"
  }
  $.ajax({
    type:"POST",
    url: 'http://192.168.0.18:8015/web/basic/sendEmailCode',
    dataType:"json",
    data:JSON.stringify(postData),
    contentType:'application/json',
    success:function(res){
      console.log(res)
      if (res.code == 100001) {
        alert(" 输入错误");
      } else if( res.code == 420049) {
        alert("邮箱已经注册");
      } else if( res.code == 1011) {
        alert("邮箱未注册");
      } else if( res.code == 10005) {
        alert("验证码发送失败");
      } else if (res.code == 0) {
        alert("success");
      }
    },
    error:function(res) {
       alert("error");
    }
  });
}

