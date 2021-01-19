function addEmp(){
  var empdata = {name:$('#uname').val(),dob:$('#dob').val(),email:$('#useremail').val(),phone:$('#phone_number').val(),address:$('#address').val(),salary:$('#salary').val(),role:$('#role').val(),team:$('#team').val(),house_number:$('#house_number').val(),street:$('#street').val(),city:$('#city').val(),state:$('#state').val(),pincode:$('#pincode').val()}
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

<<<<<<< HEAD
// function fetchAttendance(){
//     console.log('done');
//     var atdDate = {date: $('#atdDate').val(),}
//     $.ajax({
//       type: 'POST',
//       url: 'http://127.0.0.1:8000/getAttendance',
//       dataType: 'json',
//       data:JSON.stringify(atdDate),
      
//       success: function(data1){
//           console.log("mofu");
//           console.log(data1);}
          
//       });
//         // return false;
//         }

=======
>>>>>>> 4bd5376f81914e1af31f095dfe1fea5b93d6c97b

