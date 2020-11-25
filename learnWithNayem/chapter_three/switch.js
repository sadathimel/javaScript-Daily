var date = new Date();

var today = date.getDay();

switch(today){
    case 0:
        console.log('Today is Sunday');
        break;
    case 1:
        console.log('Today is Monday');
        break;
    case 2:
        console.log('Today is Tuesday');
        break;
    case 3:
        console.log('Today is Wednesday');
        break;
    case 4:
        console.log('Today is Thursday');
        break;
    case 5:
        console.log('Today is Friday');
        break;
    case 6:
        console.log('Today is Saturday');
        break;
    default: console.log('nat a valid number')              
}

var rollNo = 6;
switch(rollNo){
    case 1:
        console.log('Himel');
        break;
    case 2:
        console.log('opel');
        break;
    case 3:
        console.log('salma');
        break;
    case 4:
        console.log('sadat');
        break;
    case 5:
        console.log('tranvir');
        break;
    case 6:
        console.log('umme');
        break;
    default: console.log('no match rollNo')           
}