<?php include 'header.php';?>


<script>
    function clickHere(){
        var getname = document.myform.name.value;
        document.getElementById('showName').innerHTML = getname;

        var genderLength = document.myform.gender.length;
        for(i=0; i<genderLength; i++){
            var checkGender = document.myform.gender[i].checked;
            if(checkGender){
                genderValue = document.myform.gender[i].value;
            }
        }
        document.getElementById('showGender').innerHTML = genderValue;

        var depLength = document.myform.dep.length;
        for(i=0; i<depLength; i++){
            var checkDep = document.myform.dep[i].checked;
            if(checkDep){
                depValue = document.myform.dep[i].value;
            }
        }
        document.getElementById('showDep').innerHTML = depValue;

        var index = decument.myform.coder.selectIndex;
        var coderValue = document.myform.coder.options[index].value;
        document.getElementById('showCoder').innerHTML = coderValue;
    }
</script>

<table class="tblone">
    <tr> 
        <td colspan="2" align="center">Output</td>
    </tr>
    <tr>
        <td>Name</td>
        <td><span id="showName"></span></td>
    </tr>

    <tr>
        <td>Gender</td>
        <td><span id="showGender"></span></td>
    </tr>

    <tr>
        <td>Department</td>
        <td><span id="showDep"></span></td>
    </tr>

    <tr>
        <td>Coder</td>
        <td><span id="showCoder"></span></td>
    </tr>
</table>


<form action=""  name="myform" id="myform" onsubmit="clickHere(); return false;">
    <table>
        <tr>
            <td>Name</td>
            <td><input type="text" name="name" required="1"/></td>
        </tr>

        <tr>
            <td>Gender</td>
            <td>
                <input type="radio" name="gender" value="Male"/>Male
                <input type="radio" name="gender" value="Female"/>Female
            </td>
        </tr>

        <tr>
            <td>Department</td>
            <td>
                <input type="checkbox" name="dep" value="CSE"/>CSE
                <input type="checkbox" name="dep" value="Physice"/>Physice
                <input type="checkbox" name="dep" value="Maths"/>Maths
            </td>
        </tr>

        <tr>
            <td>Coder</td>
            <td>
                <select name="coder" requried="1">
                    <option value="">Select One</option>
                    <option value="JAVA">JAVA</option>
                    <option value="PHP">PHP</option>
                    <option value="C#">C#</option>
                </select>
            </td>
        </tr>

        <tr>
            <td></td>
            <td>
                <input type="submit" name="Submit" value="Submit">
                <input type="reset" value="Clear">
            </td>    
        </tr>
    </table>
</form>





<?php include 'footer.php'; ?>