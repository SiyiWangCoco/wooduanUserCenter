let old_password, new_password, confirm_password;
let token = window.localStorage.token;

//原密码是否输入（仅修改密码界面）
function oldPasswordTest() {
  var oldPassword = document.getElementById("oldPassword");
  if (oldPassword.value.length == 0) { //未输入原密码
    alert("请输入您的原密码");
    return;
  }
  old_password = oldPassword.value;
  passwordTest();
}

//新密码测试（设置密码，修改密码）
function passwordTest()  {
  var passwordNum = document.getElementById("password");
  var passwordAgain = document.getElementById("passwordAgain");
  
  if (passwordNum.value.length == 0) { //未输入新密码
    alert("请输入您的新密码");
    return;
  } else if (passwordAgain.value.length == 0) { //未再次输入新密码
    alert("请再次输入您的新密码");
    return;
  } else if (passwordNum.value != passwordAgain.value) { //新密码不一致
    alert("再次输入密码不一致请重新输入您的新密码");
    return;
  } else {
    var regLetter = /[A-Za-z]/;
    var regNum = /[0-9]/;
    var regTeShu =new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？+-]");
    if (passwordNum.value.length < 6 || passwordNum.value.length > 16) { //密码位数不对
      alert("您设置的密码应在6-16位");
      return;
    } else if ((regLetter.test(passwordNum.value)== false)&& (regNum.test(passwordNum.value == false))) { //至少包含一个数字或字母
      alert("您设置的密码应至少包含一个数字或字母");
      return;
    } else if (regTeShu.test(passwordNum.value)) { //不包含特殊字符
      alert("您设置的密码应不包含特殊字符");
      return;
    }
    new_password = passwordNum.value;
    confirm_password = passwordAgain.value; 
  } 
  passwordChange();
}

function passwordChange(){
  let postData = {
    old_password: old_password,
    new_password:new_password,
    confirm_password: confirm_password
  }
          
  $.ajax({
    type:"POST",
    url: 'http://192.168.0.18:8015/web/index/modifyPassword',
    dataType:"json",
    data:JSON.stringify(postData),
    contentType:'application/json',
    headers:{
      'Content-Type':'application/json', 
      'token' : token
    },
    success:function(res){
      console.log(res)
      if (res.code == 420002) {
        alert("旧密码错误");
      } else if (res.code == 10001) {
        alert("新密码与旧密码不能一致");
      } else if (res.code == 0) {
        alert("success");
        window.location.href = "/components/login.html";
      } else {
        alert( res.code + ": "+ res.msg);
      }
    },
    error: function(res) {
      alert("error");
    }
  });
}