function addEmp(){
  var empdata = {name:$('#uname').val(),dob:$('#dob').val(),email:$('#useremail').val(),phone:$('#phone_number').val(),address:$('#address').val(),salary:$('#salary').val(),role:$('#role').val(),team:$('#team').val(),}
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