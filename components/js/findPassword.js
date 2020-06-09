let password, confirmPassword, email, code, language, phone, answer, question;
let token = window.localStorage.token;

function testQuestion(){   //通过密保找回密码
  var questionSele = document.getElementById('question');
  var answerSele = document.getElementById("answer");
  if (questionSele.value == "请选择您设置的密保问题") { // 未选择问题
    alert("请选择您设置的密保问题");
    return;
  } else if (answerSele.value.length == 0) { //未输入答案
    alert("请输入您的答案");
    return;
  } else {
    answer = answerSele.value;
    question = questionSele.value;
    passwordTest();
  }
}


function testPhone(){
  var phoneFind = document.getElementById('phoneFind');
  var verificationEnter = document.getElementById("verificationEnter");
  if (phoneFind.value.length == 0) { // 未输入手机
    alert("请输入您的手机号");
    return;
  } else if (verificationEnter.value.length == 0) { //未输入验证码
    alert("请输入验证码");
    return;
  } else {
    let phoneReg = /^1[3-578]\d{9}$/; 
    if (phoneReg.test(phoneFind.value) == false) { //输入为非法手机号格式
      alert("请输入正确的手机号");
      return;
    }
    code = verificationEnter.value;
    phone = phoneFind.value;
    passwordTest();
  }
}


function testEmail(){
  var emailFind = document.getElementById('emailFind');
  var verificationEnter = document.getElementById("verificationEnter");

  if (emailFind.value.length == 0) { // 未输入邮箱
    alert("请输入您的电子邮箱");
    return;
  } else if (verificationEnter.value.length == 0) { //未输入验证码
    alert("请输入验证码");
    return;
  } else {
    let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (mailReg.test(emailFind.value) == false) { //输入为非法邮箱格式
      alert("请输入正确的邮箱");
      return;
    }
    code = verificationEnter.value;
    email = emailFind.value;
    passwordTest();
  }
}

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
    password = passwordNum.value;
    confirmPassword = passwordAgain.value; 
    language = "zh";
  } 
  passwordSubmit();
}

function passwordSubmit(){
  let postData = {
    password: password,
    confirm_password: confirmPassword,
    question: question,
    answer: answer,
    language: language,
    code: code,
    email: email,
    phone: phone
    }
        
  $.ajax({
    type:"POST",
    url: 'http://192.168.0.18:8015/web/basic/getPassword',
    dataType:"json",
    data:JSON.stringify(postData),
    contentType:'application/json',
    // headers:{
    //   'Content-Type':application/json', 
    //   'token' : token
    // },
    success:function(res){
      console.log(res)
      if (res.code == 10001) {
        alert("参数错误");
      } else if( res.code == 100004) {
        alert("验证码错误");
      }  else if( res.code == 420028) {
        alert("密保答案错误");
      } else if (res.code == 0) {
        alert("success");
        window.rocation.href = "/components/login.html";
      } else {
        alert( res.code + ": "+ res.msg);
      }
    },
    error: function(res) {
      alert("error");
    }
  });
} 