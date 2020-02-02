<?php
    $fonts = "verdana";
    $bgcolor ="#444";
    $fontcolor = "#fff";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>PHP Syntax</title>
    <style>
        body{font-family:<?php echo $fonts;?>}.phpcoding{width: 900px; margin: 0 auto; background: <?php echo "#ddd" ?>;} 
        .headeroption, .footeroption{background:<?php echo $bgcolor;?> ; color:<?php echo $fontcolor; ?> ; text-align: center;padding:20px;} 
        .headeroption h2, .footeroption h2{margin:0;font-size:24px}.maincontent{main-height:600px;padding:20px;font-size:18px;}
        p{margin:0}
        input[type="text"] {width:250px;}
    </style> 
</head>
<body>
    <div class="phpcoding">
        <section class="headeroption">
            <h2><?php echo "PHP Fundamaentals Training"; ?> </h2>
        </section>
    <section class="maincontent">
<hr/>
    Get Value From a Text Box in PHP
    <span style="float:right">
    <?php 
        date_default_timezone_set('Asia/Dhaka');
        echo "Time: ".date("h:i:s A");
    ?>
    </span>
<hr/>