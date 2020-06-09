//let token = window.localStorage.token;
let token =" eyJhbGciOiJzaGEyNTYiLCJ0eXBlIjoiand0In0=.eyJhcHBfa2V5IjoiQTAwMDEiLCJhcHBfaWQiOjEsImV4cGlyZSI6MTU5MTEwNDQxMywidHlwZSI6InVzZXJfdG9rZW4iLCJpcCI6IjEyNy4wLjAuMSIsInVzZXIiOnsiaWQiOjYsIndkX2lkIjoid2RfMjAxOTEwMjUiLCJhY2NvdW50IjoieHd6In19.a59e282b7f3f84dab91c9aa3a35e70fc38b54f55aad33df1479e908b3bbadeb8";
//接口用户信息
function getInfo(info){
  $.ajax({
    type:'GET',
    url:' http://192.168.0.18:8015/web/index/getUserBasicInfo',
    dataType:"json",
    headers:{
      'Content-Type':'application/x-www-form-urlencoded', 
      'token' : token
    },
    success:function(res) { 
      if (info == "email") {
        getEmail(res.data);
      } else if (info == "phone") {
        gotPhone(res.data);
      } else if (info == "question") {
        getQuestion(res.data);
      } else if (info == "identity") {
        getIdentity(res.data);
      } else {
        alert("user info error");
        return;
      }
    },
    error:function() { 
      alert("error");
    } 
  });
}

//用户已选密保问题
function getQuestion(data){
  var chooseQuestion = document.getElementById("chooseQuestion");
  chooseQuestion.innerHTML = "";
  if (data.security_question == null) {
    alert("您还没有选择密保问题");
    window.location.href = "/components/setQuestion.html";
  } else {
    chooseQuestion.innerHTML = data.security_question;
  }
}

//用户已设置的手机号码
function getPhone(data){
  var phoneNum = document.getElementById("phoneNum");
  phoneNum.innerHTML = "";
  if (data.phone.length == 0) {
    alert("您还没有设置手机号码");
    window.location.href = "/components/setPhone.html";
  } else {
    phoneNum.innerHTML = data.phone;
  }
}

//用户已设置的电子邮箱
function getEmail(data) {
  var emailNum = document.getElementById("emailNum");
  emailNum.innerHTML = "";
  if (data.email.length == 0) {
    alert("您还没有设置电子邮箱");
    window.location.href = "/components/setEmail.html";
  } else {
    emailNum.innerHTML = data.email;
  } 
}

//用户实名认证姓名和身份证号码
function getIdentity(data) {
  var identityName = document.getElementById("identityName");
  var identityNum = document.getElementById("identityNum");
  identityName.innerHTML = "";
  identityNum.innerHTML = "";
  if (data.real_name.length == 0 || data.card_id.length == 0) {
    alert("您还没实名认证");
    window.location.href = "/components/setIdentity.html"
  } else {
    identityName.innerHTML = data.real_name;
    identityNum.innerHTML =data.card_id;
  }
}

