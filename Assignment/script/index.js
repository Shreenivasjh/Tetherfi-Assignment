function loginIn() {
  var username = $('#signInusername').val()
  var password = $('#signInpassword').val()
  $('#signinreport').addClass('alert').prop('role', 'alert')
  $('#signInusername').val('')
  $('#signInpassword').val('')
  var error = ''
  if (!username.match('^[a-zA-Z0-9_]+$')) {
    error += 'Username can contain only alphabets, numbers and underscore'
  } else if (username === 'admin') {
    if (password === 'admin@123') {
      //Add faculty
      $('#signIntab').css('display', 'none')
      $('#facultydetailsTab').css('display', 'block')
    } else {
      error += 'Username and Password don\'t match'
    }
  } else if (password === username) {
    // Student details
    $('#signIntab').css('display', 'none')
    $('#studentdetailsTab').css('display', 'block')
    load_subjectlist()
    load_studenttable()
  } else {
    error += 'Username and Password don\'t match'
  }
  if (error.length > 1) {
    $('#signinreport')
      .removeClass('alert-success')
      .addClass('alert-danger')
      .html(error)
  }
}

function admin_submitdetails() {
  var facultyname = $('#admin_facultyname').val()
  var facultydepartment = $('#admin_facultydept').val()
  var facultysubject = $('#admin_subjectname').val()
  $.post(
    'functions.php', {
      add_faculty: true,
      facultyname: facultyname,
      facultydepartment: facultydepartment,
      facultysubject: facultysubject
    },
    function (data) {
      data = parseInt(data)
      if (data === 0) {
        $('#add_faculty_report')
          .removeClass('alert-success')
          .addClass('alert-danger')
          .html("Faculty details couldn\'t be added")
      } else {
        $('#add_faculty_report')
          .removeClass('alert-danger')
          .addClass('alert-success')
          .html('Success! Faculty details added successfully')
      }
    })
}

function student_resetdetails() {
  $('#fullname').val('')
  $('#age').val('')
  $('#idno').val('')
  $('#emailid').val('')
  $('#contactno').val('')
  $('#fathername').val('')
  $('#mothername').val('')
  load_subjectlist()
}

function load_subjectlist() {
  $.post(
    'functions.php', {
      getsubjects: true
    },
    function (data) {
      data = JSON.parse(data)
      var text = '<label>Subject</label> <select class = "form-control" id = "subjectSelect"> '
      if (data !== null) {
        $.each(data, (index, element) => {
          text += '<option value="' + element.subjectname + '">' + element.subjectname + '</option>'
        })
      }
      text += '</select> '
      $('#subjectlist').html(text)
    }
  )
}

function student_submitdetails() {
  var fullname = $('#fullname').val()
  var age = $('#age').val()
  var id = $('#idno').val()
  var emailid = $('#emailid').val()
  var contactno = $('#contactno').val()
  var fathername = $('#fathername').val()
  var mothername = $('#mothername').val()
  var subjectSelect = $('#subjectSelect').val()
  $.post(
    'functions.php', {
      add_student: true,
      fullname: fullname,
      age: age,
      id: id,
      emailid: emailid,
      contactno: contactno,
      fathername: fathername,
      mothername: mothername,
      subjectSelect: subjectSelect
    },
    function (data) {
      data = parseInt(data)
      if (data === 0) {
        $('#studentdetailsreport')
          .removeClass('alert-success')
          .addClass('alert-danger')
          .html("Student details couldn\'t be added")
      } else {
        var table = document.getElementById("studentdetailstable")
        var row = table.insertRow(0)
        var cell1 = row.insertCell(0)
        var cell2 = row.insertCell(1)
        var cell3 = row.insertCell(2)
        var cell4 = row.insertCell(3)
        var cell5 = row.insertCell(4)
        var cell6 = row.insertCell(5)
        var cell7 = row.insertCell(6)
        var cell8 = row.insertCell(7)
        cell1.innerHTML = fullname
        cell2.innerHTML = age
        cell3.innerHTML = id
        cell4.innerHTML = emailid
        cell5.innerHTML = contactno
        cell6.innerHTML = fathername
        cell7.innerHTML = mothername
        cell8.innerHTML = subjectSelect

      }
    })
}

function load_studenttable() {
  $.post(
    'functions.php', {
      get_student: true
    },
    function (data) {
      data = JSON.parse(data)
      console.log(data)
      if (data !== null) {
        $.each(data, (index, element) => {
          var table = document.getElementById("studentdetailstable")
          var row = table.insertRow(0)
          var cell1 = row.insertCell(0)
          var cell2 = row.insertCell(1)
          var cell3 = row.insertCell(2)
          var cell4 = row.insertCell(3)
          var cell5 = row.insertCell(4)
          var cell6 = row.insertCell(5)
          var cell7 = row.insertCell(6)
          var cell8 = row.insertCell(7)
          cell1.innerHTML = element[0]
          cell2.innerHTML = element[1]
          cell3.innerHTML = element[2]
          cell4.innerHTML = element[3]
          cell5.innerHTML = element[4]
          cell6.innerHTML = element[5]
          cell7.innerHTML = element[6]
          cell8.innerHTML = element[7]
        })
      }
    })
}

// $.cookie('uid', username, {
//   path: "/",
//   expires: 10
// })
// if (username === 'placement') {
//   setTimeout(function () {
//     $(location).attr('href', 'placement.html')
//   }, 100)
// } else {
//   setTimeout(function () {
//     $(location).attr('href', 'loggedin.html')
//   }, 100)
// }