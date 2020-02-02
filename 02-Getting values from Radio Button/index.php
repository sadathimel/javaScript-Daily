<?php include 'header.php';?>


<script>
    function clickHere () {
        var genderleng = document.myform.gender.length;
        for(i=0; i<genderleng; i++){
            var checkValue = document.myform.gender[i].checked;
            if(checkValue){
                var checkResult = document.myform.gender.value;
            }
        }
        var showData = "Your Gender is :"+checkResult;
        document.getElementById('show').innerHTML = showData;
    }
</script>


<p id="show"></p>
<form action="" method="post" name="myform" id="myform" onsubmit="clickHere(); return false;" >
    <table>
        <tr>
            <td>Gender :</td>
            <td>
                <input type="radio" name="gender" value="Male"/>Male
                <input type="radio" name="gender" value="Female"/>Female
                <input type="radio" name="gender" value="Others"/>Others
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                <input type="submit" value="Submit">
                <input type="reset" value="Clear">
            </td>    
        </tr>
    </table>
</form>





<?php include 'footer.php'; ?>