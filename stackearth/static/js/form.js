var token = 'Token '+sessionStorage.getItem('token');
var admin = sessionStorage.getItem('admin');
function addEmp(){
  var empdata = {firstName:$('#fname').val(),lastName: $('#lname').val(),dob:$('#dob').val(),email:$('#useremail').val(),phone:$('#phone_number').val(),address:$('#address').val(),salary:$('#salary').val(),role:$('#role').val(),team:$('#team').val(),house_number:$('#house_number').val(),street:$('#street').val(),city:$('#city').val(),state:$('#state').val(),pincode:$('#pincode').val()}
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:8000/createEmployee',
      dataType: 'json',
      data:JSON.stringify(empdata),
      
      success: function(){
          console.log("mofu");
          console.log(data);}
          
      });
        // return false;
        }
        
    function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');
    function fetchAttendance(){
    var $token = token;
    var $admin = admin;
    var atdDate = {date: $('#atdDate').val(),token: $token}
    
    if($admin == 'true'){
      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/getAttendance',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        headers:{Authorization: $token},
        data:JSON.stringify(atdDate),
        
        success: function(attendance){ 
          var abc="";
          console.log('ok');
          console.log($admin);
          console.log(attendance);
            attendance.forEach(element => {
              // abc+='<div class="col"'+element.name+'<select>'+element.present?'<option selected value="Present">Present</option><option value="Absent">Absent</option>':'<option selected value="Absent">Absent</option><option value="Present">Present</option>'+'</select>'+'</li>';
                abc+='<div class="row">';
                abc+='<div class="col">'+element.name+'</div>';
                  abc+='<div class="col"><select id="'+element.name+'" onchange="saveAttendance('+element.user+',$(\'#'+element.name+'\').val());">';
                    abc+= element.present? '<option selected value="present">Present</option><option value="absent">Absent</option>': '<option selected value="absent">Absent</option><option value="present">Present</option>'
                    abc+='</select>'+'</div>';
                  abc+='</div>';
              });
            

            $('#attendanceReceived').html(abc);
            }
            
        });
        // return false;
        }
    else{
      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/attendancePercent',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        headers:{Authorization: $token},
        data: JSON.stringify(atdDate),
        success: function(data){
          data = JSON.parse(data);
          var abc = "";
          abc += "<h5>Percentage : "+data['percent']+"</h5><br>";
          abc+= "<h5>Status : "+data['status']+"</h5>";

          $('#attendanceReceived').html(abc);
        }
        
      });
      
    }
  }
      
    function saveAttendance(user,attendance){
      console.log(user);
      date = $('#atdDate').val()
      var $token = token;
      data = {
        user: user,
        status: attendance,
        date : date,
      }

      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/saveAttendance',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        headers:{Authorization: $token},
        data: JSON.stringify(data),
      })
    }

    function percentAttendance(){
      var date = {date : $('#atdPercent').val() };
      var $crf_token = csrftoken;
      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/attendancePercent',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        headers:{"X-CSRFToken": $crf_token},
        data: JSON.stringify(date),
      })
    }

     async function currentUser(){
      var $crf_token = csrftoken;
      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/currentuser',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        headers:{"X-CSRFToken": $crf_token},
        success: await function(user){
          return new Promise((resolve) => {user['id'];})
        }
      })
    }

    function leaveApplication(){
      token = sessionStorage.getItem('token');
      var data = {from : $('#leaveFrom').val(),till: $('#leaveTill').val(),reason: $('#leaveReason').val()}
      
      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/leave',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        headers:{Authorization: 'token '+token},
        data: JSON.stringify(data),
        success : function(response){
          response = JSON.parse(response);
          alert(response['message']);
        }
      })
    }

    function leaveStatus(){
      token = sessionStorage.getItem('token');      
      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/leave_status',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        headers:{Authorization: 'token '+token},
        success : function(response){
          console.log(response);
          var xyz="";
          response.forEach(element => {
            xyz+="<div class='row'>";
            xyz+="<div class='col'><h5>From :</h5>"+element.from_date+"</div>";
            xyz+="<div class='col'><h5>Till :</h5>"+element.till_date+"</div>";
            xyz+="<div class='col'><h5>Reason : </h5>"+element.reason+"</div>";
            xyz+="<div class='col'>"+ element.confirmed ? "<h4 style='color:green;'>Confirmed</h5>" : "<h4 style='color:red;'>Not Confirmed</h5></div></div>";

          })

          $('#leaveStatus').html(xyz);
        }
      })
    }

    function login(){
      var data = {username : $('#username').val(),password: $('#password').val()}
      console.log('login');
      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/login',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        data: JSON.stringify(data),
        success: function(response){
          console.log(response);
          response = JSON.parse(response);
          alert(response['message']);
          if(response['status'] == 200){
            const loginToken = response['token'];
            sessionStorage.setItem('token',loginToken);
          }
        }
      })
    }

    function getUser(){
      var token = sessionStorage.getItem('token');
      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/getUser',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        headers : {Authorization: 'token '+token},
        success: function(user){
          user = JSON.parse(user)
          alert(user['user']);
        }
      });
    }