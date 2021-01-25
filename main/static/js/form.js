var token = 'Token '+localStorage.getItem('token');
var admin = localStorage.getItem('admin');
function addEmp(){
  var empdata = {firstName:$('#fname').val(),lastName: $('#lname').val(),dob:$('#dob').val(),email:$('#useremail').val(),phone:$('#phone_number').val(),salary:$('#salary').val(),role:$('#role').val(),team:$('#team').val(),house_number:$('#house_number').val(),street:$('#street').val(),city:$('#city').val(),state:$('#province').val(),pincode:$('#pincode').val()}
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:8000/createEmployee',
      dataType: 'json',
      data:JSON.stringify(empdata),
      
      success: function(){
          console.log("success");
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
          var abc="<div class='container'>";
          console.log('ok');
          console.log($admin);
          console.log(attendance);
            attendance.forEach(element => {
              // abc+='<div class="col"'+element.name+'<select>'+element.present?'<option selected value="Present">Present</option><option value="Absent">Absent</option>':'<option selected value="Absent">Absent</option><option value="Present">Present</option>'+'</select>'+'</li>';
                abc+='<div class="row">';
                abc+='<div class="col">'+element.name+'</div>';
                abc+='<div class="col"><select class="form-select form-select-lg mb-3" id="atd'+element.user+'" onchange="saveAttendance('+element.user+',$(\'#atd'+element.user+'\').val());">';
                abc+= element.present? '<option selected value="present">Present</option><option value="absent">Absent</option>': '<option selected value="absent">Absent</option><option value="present">Present</option>'
                abc+='</select></div>';
                abc+='</div>';
              });
              abc+= "</div>";
            

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
          abc += "<h5>Percentage :"+data['percent']+"</h5><br>";
          abc+= "<h5>Status :"+data['status']+"</h5>";

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
      console.log(data);

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
      var data = {from : $('#leaveFrom').val(),till: $('#leaveTill').val(),reason: $('#leaveReason').val()}
      
      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/leave',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        headers:{Authorization: token},
        data: JSON.stringify(data),
        success : function(response){
          response = JSON.parse(response);
          alert(response['message']);
        }
      })
    }

    function leaveStatus(){     
      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/leave_status',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        headers:{Authorization: token},
        success : function(response){
          console.log(response);
          var xyz="";
          response.forEach(element => {
            xyz+="<div class='row'>";
            xyz+="<div class='col'><h5>From :</h5>"+element.from_date+"</div>";
            xyz+="<div class='col'><h5>Till :</h5>"+element.till_date+"</div>";
            xyz+="<div class='col'><h5>Reason : </h5>"+element.reason+"</div>";
            xyz+="<div class='col'>";
            xyz+= element.confirmed ? "<h4 style='color:green;'>Confirmed</h5>" : "<h4 style='color:red;'>Not Confirmed</h5></div></div>";

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

    function approveLeaves(){
      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/leave_requests',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        headers : {Authorization: token},
        success: function(data){
          console.log(data);
          var abc="<div class='container'><div class='row'><div class='col'><h5>Name</h5></div><div class='col'><h5>From: </h5></div><div class='col'><h5>Till: </h5></div><div class='col'><h5>Reason: </h5></div><div class='col'><h5>Status: </h5></div></div>"
          data.forEach(element => {
            console.log(element.name);
            abc+="<div class='row'>";
            abc+="<div class='col'>"+element.name+"</div>";
            abc+="<div class='col'>"+element.from_date+"</div>";
            abc+="<div class='col'>"+element.till_date+"</div>";
            abc+="<div class='col'><p>"+element.reason+"</p></div>";
            abc+="<div class='col'><select class='form-select form-select-lg mb-3' id='approve"+element.applicant+"' onchange='postLeaveApprove("+element.applicant+",\""+element.from_date+"\",\""+element.till_date+"\",$(\"#approve"+element.applicant+"\").val());'>";
            abc+=element.confirmed?"<option selected value='true'>Approved</option><option  value='false'>Not Approved</option>" : "<option selected  value='false'>Not Approved</option><option  value='true'>Approved</option>";
            abc+="</select></div></div>";

          })
          abc+='</div>';
          $('#leaveList').html(abc);
        }
      });
    }

    function postLeaveApprove(user,from,till,status){
      console.log('reached');
      var data = {'user':user,'from':from,'till':till,'status':status};
      console.log(data);
      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/leave_approve',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        headers : {Authorization: token},
        data: JSON.stringify(data),
      });
    }

    function getTeams(){
      console.log('reached');
      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/getTeams',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        headers : {Authorization: token},
        success: function(data){
          var abc="";
          console.log(data);
          abc+="<select id='teamrole'>";
          data.forEach(element => {
            abc+="<option value="+element.team_name+">"+element.team_name+"</option>";
            
          })
          abc+="</select>";
          $('#roleTeam').html(abc);
        }
      });
    }

    function saveTeam(){
      var data = {'team' : $('#teamname').val()};
      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/saveTeam',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        headers : {Authorization: token},
        data: JSON.stringify(data),
      });
    }

    function saveRole(){
      var data = {'role': $('#rolename').val(),'team':$('#teamrole').val()};
      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/saveRole',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        headers : {Authorization: token},
        data: JSON.stringify(data),
      });
    }

    function searchEmployee(){
      console.log('okk');
      var data = {'query': $('#searchEmployee').val()};
      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/searchEmployee',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        headers : {Authorization: token},
        data: JSON.stringify(data),
        success: function(data){
          console.log(data);
          var abc="<div class='row'><div class='col'><h5>Email</h5></div><div class='col'><h5>Date-Of-Birth</h5></div><div class='col'><h5>Phone-Number</h5></div><div class='col'><h5>Salary</h5></div></div>";
          data.forEach(element => {
            abc+="<div class='row'><div class='col'>"+element.email+"</div>";
            abc+="<div class='col'>"+element.dob+"</div>";
            abc+="<div class='col'>"+element.phone_number+"</div>";
            abc+="<div class='col'>"+element.salary+"</div>";
          })
          $('#searchResults').html(abc);
        }
      });
    }

  function loadRoleTeam(){
    console.log('a');
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:8000/getTeams',
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      crossDomain: true,
      headers : {Authorization: token},
      success: function(response){
          var abc="";
          console.log(response);
          abc+="<br><label for='teamrole'>Team Role:</label><br><select class='form-select form-select-lg mb-3' id='teamrole'>";
          response.forEach(element => {
            
            abc+="<option value="+element.team_name+">"+element.team_name+"</option>";
            
          })
          abc+="</select><br>";
          $('#team').html(abc);
      }
    });

    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:8000/getRoles',
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      crossDomain: true,
      headers : {Authorization: token},
      success: function(response){
          var abc="";
          console.log(response);
          abc+="<br><label for='emprole'>Employee Role:</label><br><select class='form-select form-select-lg mb-3' id='emprole'>";
          response.forEach(element => {
            
            abc+="<option value="+element.role+">"+element.role+"</option>";
            
          })
          abc+="</select><br>";
          $('#role').html(abc);
      }
    });
  }

  function searchEmployeeByTeam(){
    var data = {'team': $('#teamrole').val()};
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:8000/searchEmployeeByTeam',
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      crossDomain: true,
      headers : {Authorization: token},
      data: JSON.stringify(data),
      success: function(data){
        console.log(data);
        var abc="<div class='row'><div class='col'><h5>Email</h5></div><div class='col'><h5>Date-Of-Birth</h5></div><div class='col'><h5>Phone-Number</h5></div><div class='col'><h5>Salary</h5></div></div>";
        data.forEach(element => {
          abc+="<div class='row'><div class='col'>"+element.email+"</div>";
          abc+="<div class='col'>"+element.dob+"</div>";
          abc+="<div class='col'>"+element.phone_number+"</div>";
          abc+="<div class='col'>"+element.salary+"</div>";
        })
        $('#searchResults').html(abc);
      }
    });
  }

  function searchEmployeeByRole(){
    var data = {'role': $('#emprole').val()};
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:8000/searchEmployeeByRole',
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      crossDomain: true,
      headers : {Authorization: token},
      data: JSON.stringify(data),
      success: function(data){
        console.log(data);
        var abc="<div class='row'><div class='col'><h5>Email</h5></div><div class='col'><h5>Date-Of-Birth</h5></div><div class='col'><h5>Phone-Number</h5></div><div class='col'><h5>Salary</h5></div></div>";
        data.forEach(element => {
          abc+="<div class='row'><div class='col'>"+element.email+"</div>";
          abc+="<div class='col'>"+element.dob+"</div>";
          abc+="<div class='col'>"+element.phone_number+"</div>";
          abc+="<div class='col'>"+element.salary+"</div>";
        })
        $('#searchResults').html(abc);
      }
    });
  }