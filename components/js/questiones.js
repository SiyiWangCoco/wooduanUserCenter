function getQuestion(){
  $.ajax({
    type:'GET',
    url:' http://192.168.0.18:8015/web/basic/getSecurityQuestions',
    dataType:"json",
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    },
    success: function(res){
      console.log(res.data); 
      setQuestion(res.data);  
     },
    error: function() { 
      alert("error");
    } 
  });
}

function setQuestion(data){
  var questionSele = document.getElementById("question");
  questionSele.innerHTML ="";
  let de = document.createElement("option");
  de.innerHTML = "请选择您设置的密保问题";
  de.value = "请选择您设置的密保问题";
  questionSele.appendChild(de);
  for (let i = 0; i < data.length; i++) {
    if (data[i].language =="zh") {
      let questionOption = document.createElement("option");
      questionOption.innerHTML = data[i].question;
      questionOption.value = data[i].question;
      questionOption.id = data[i].id;
      questionSele.appendChild(questionOption);
    }
  }
}