<?php
$db = mysqli_connect("localhost", "root", "", "");
if (!$db) {
    die('Could not connect to database : ' . mysqli_error($db));
}
$query = 'CREATE DATABASE IF NOT EXISTS `assignment`;';
$result = mysqli_query($db, $query);
$query = 'USE `assignment`;';
$result = mysqli_query($db, $query);
$query = 'CREATE TABLE IF NOT EXISTS `facultydetails` (uid int(11) PRIMARY KEY AUTO_INCREMENT, facultyname varchar(20) NOT NULL, department varchar(10) NOT NULL,subjectname varchar(20) NOT NULL);';
$result = mysqli_query($db, $query);

if(isset($_POST['add_faculty'])){
    $facultyname = $_POST['facultyname'];
    $facultydept = $_POST['facultydepartment'];
    $facultysubject = $_POST['facultysubject'];
    $query = "INSERT INTO `facultydetails`(`facultyname`, `department`, `subjectname`) VALUES ('".$facultyname."','".$facultydept."','".$facultysubject."');";
    $result = mysqli_query($db, $query);
    print($result);
} else if(isset($_POST['getsubjects'])){
    $query = "SELECT `subjectname` FROM `facultydetails`;";
    $result = mysqli_query($db, $query);
    $array = [];
    while($temp = mysqli_fetch_assoc($result))
        $array[] = $temp;
    echo json_encode($array);
}else if(isset($_POST['add_student'])){
    $fullname = $_POST['fullname'];
    $age = $_POST['age'];
    $id = $_POST['id'];
    $emailid = $_POST['emailid'];
    $contactno = $_POST['contactno'];
    $fathername = $_POST['fathername'];
    $mothername = $_POST['mothername'];
    $subjectSelect = $_POST['subjectSelect'];
    $file = fopen("studentdetails.txt","a");
    echo fwrite($file,$fullname.','.$age.','.$id.','.$emailid.','.$contactno.','.$fathername.','.$mothername.','.$subjectSelect."\r\n");
    fclose($file);
}else if(isset($_POST['get_student'])){
    $file_lines = file('studentdetails.txt');
    $array = [];
    foreach ($file_lines as $line) {
        $array[] = explode (",", $line);
    }
    echo json_encode($array);
}

mysqli_close($db);
?>