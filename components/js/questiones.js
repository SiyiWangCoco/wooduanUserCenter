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
      setQuetion(res.data);  
     },
    error: function() { 
      alert("error");
    } 
  });
}

function setQuestion(data){

}