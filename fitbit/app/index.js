/*
 * Entry point for the watch app
 */
import document from "document";

console.log("App code started");

//variables
var hour_result = ["01","02","03","04","05","06","07","08","09","10","11","12"]; //0-11
var min_result = ["00","15","30","45"]; //0-3 
var hour_int = [1,2,3,4,5,6,7,8,9,10,11,12];
var min_int = [0,15,30,45];
var am_pm_result = ["AM","PM"];
let result = document.getElementById("result");
result.style.display = "none";
let result2 = document.getElementById("result2");
result2.style.display = "none";
let result3 = document.getElementById("result3");
result3.style.display = "none";
let result4 = document.getElementById("result4");
result4.style.display = "none";
let result5 = document.getElementById("result5");
result5.style.display = "none";
let result6 = document.getElementById("result6");
result6.style.display = "none";

//Main Text
let mixedtext = document.getElementById("mixedtext");
mixedtext.text = "Zzz";
//mixedtext.style.display = "none";

//Hour Button
let hour = document.getElementById("hour");
hour.style.display = "inline";
var x = 0; //for controlling hour array
//Initial Text
hour.text = "--";
//Click Event
hour.onactivate = function(evt){
  if(x==12){
    x = 0;
  }
  hour.text = hour_result[x];
  x++;
}

//Minutes Button
let min = document.getElementById("min");
min.style.display = "inline";
var y = 0; //for controlling min_unit list display
//Initial Text
min.text = "--";
//Click Event
min.onactivate = function(evt){
  if(y==4){
    y = 0;
  }
  min.text = min_result[y];
  y++;
}

//Am_PM Button
let am_pm = document.getElementById("am_pm");
am_pm.style.display = "inline";
var z = 0; //for controlling am_pm list display
//Initial Text
am_pm.text = "--";
//Click Event
am_pm.onactivate = function(evt){
  if(z==2){
    z = 0;
  }
  am_pm.text = am_pm_result[z];
  z++;
}

//back_button
let back_button = document.getElementById("back_button");
back_button.style.display = "none";
back_button.onactivate = function(evt) {
  back();
}

//Wake up at button
//x, y, z are all +1 because ++ is at the end
let calculate = document.getElementById("calculate_button");
calculate.style.display = "inline";
calculate.onactivate = function(evt) {
  console.log("CLICKED!");
  console.log("The time chosen is: " + hour_result[x-1] + ":" + min_result[y-1] + ":" + am_pm_result[z-1]);
  
  //clear current display
  clearMain();
  var time_arr = [hour_int[x-1],min_int[y-1]];
  time_arr[0] *= 3600000;
  time_arr[1] *= 60000;
  var timeInMs = time_arr[0]+time_arr[1];
  var sleepHours = wakeAt(timeInMs,am_pm_result[z-1]);
  result.text = sleepHours[6];
  result2.text = sleepHours[5];
  result3.text = sleepHours[4];
  result4.text = sleepHours[3];
  result5.text = sleepHours[2];
  result6.text = sleepHours[1];
  mixedtext.text = "Sleep At:";

}

function wakeAt(timeInMs, ampm){
  //variables
  var sleepTime = 5400000; //1.5 hours in ms
  var time_list = [];
  var ampm_list = [];
  var min_disp = ["00","15","30","45"];
  var hour_store = [];
  var min_store = [];
  var return_list = [];
  var time = new Date((timeInMs+14400000));
  
  //log the selected time
  console.log("Hours : " + time.getHours() + " ; Minutes : " + time.getMinutes() + " " + ampm);
  
  //create list of dates with new times to sleep at
  time_list[0] = new Date((time.valueOf()-sleepTime));
  time_list[1] = new Date((time.valueOf()-(sleepTime*2)));
  time_list[2] = new Date((time.valueOf()-(sleepTime*3)));
  time_list[3] = new Date((time.valueOf()-(sleepTime*4)));
  time_list[4] = new Date((time.valueOf()-(sleepTime*5)));
  time_list[5] = new Date((time.valueOf()-(sleepTime*6)));
  time_list[6] = time;
  
  //loop through time_list to adjust AM/PM if it changed
  for(var i=0;i<time_list.length-1;i++){
    if(time_list[i].getHours()==0){
      time_list[i].setHours(12);
      ampm_list[i] = "AM";
    }
    if(time_list[i].getHours()>=13){
      if(ampm == "AM"){
        ampm_list[i] = "PM";
      }else{
        ampm_list[i] = "AM";
      }
      time_list[i].setHours(time_list[i].getHours()-12);
    }else{
      ampm_list[i] = ampm;
    }
  }
  
  //loop through time_list to set minutes to display 2 0s, also covers the others
  for(var k=0;k<time_list.length;k++){
    if(time_list[k].getMinutes()==0){
      min_store[k] = min_disp[0];
    }else if(time_list[k].getMinutes()==15){
      min_store[k] = min_disp[1];
    }else if(time_list[k].getMinutes()==30){
      min_store[k] = min_disp[2];
    }else if(time_list[k].getMinutes()==45){
      min_store[k] = min_disp[3];
    }
  }
  
  //loop through time_list to set hours under 10 to display 0 in front
  for(var k=0;k<time_list.length;k++){
    if(time_list[k].getHours()==1){
      hour_store[k] = "01";
    }else if(time_list[k].getHours()==2){
      hour_store[k] = "02";
    }else if(time_list[k].getHours()==3){
      hour_store[k] = "03";
    }else if(time_list[k].getHours()==4){
      hour_store[k] = "04";
    }else if(time_list[k].getHours()==5){
      hour_store[k] = "05";
    }else if(time_list[k].getHours()==6){
      hour_store[k] = "06";
    }else if(time_list[k].getHours()==7){
      hour_store[k] = "07";
    }else if(time_list[k].getHours()==8){
      hour_store[k] = "08";
    }else if(time_list[k].getHours()==9){
      hour_store[k] = "09";
    }else if(time_list[k].getHours()==9){
      hour_store[k] = "09";
    }else if(time_list[k].getHours()==10){
      hour_store[k] = "10";
    }else if(time_list[k].getHours()==11){
      hour_store[k] = "11";
    }else if(time_list[k].getHours()==12){
      hour_store[k] = "12";
    }
  }
  
  return_list[0] = time_list[6].getHours() + " : " + time_list[6].getMinutes() + " " + ampm;  
  return_list[1] = hour_store[0] + ":" + min_store[0] + " " + ampm_list[0];
  return_list[2] = hour_store[1] + ":" + min_store[1] + " " + ampm_list[1];
  return_list[3] = hour_store[2] + ":" + min_store[2] + " " + ampm_list[2];
  return_list[4] = hour_store[3] + ":" + min_store[3] + " " + ampm_list[3];
  return_list[5] = hour_store[4] + ":" + min_store[4] + " " + ampm_list[4];
  return_list[6] = hour_store[5] + ":" + min_store[5] + " " + ampm_list[5];
  
  return return_list;
}

let calculate2 = document.getElementById("calculate_button2");
calculate2.style.display = "inline";
calculate2.onactivate = function(evt) {
  console.log("CLICKED!");
  console.log("The time chosen is: " + hour_result[x-1] + ":" + min_result[y-1] + ":" + am_pm_result[z-1]);
  
  //clear current display
  clearMain();
  var time_arr = [hour_int[x-1],min_int[y-1]];
  time_arr[0] *= 3600000;
  time_arr[1] *= 60000;
  var timeInMs = time_arr[0]+time_arr[1];
  var sleepHours = sleepAt(timeInMs,am_pm_result[z-1]);
  result.text = sleepHours[1];
  result2.text = sleepHours[2];
  result3.text = sleepHours[3];
  result4.text = sleepHours[4];
  result5.text = sleepHours[5];
  result6.text = sleepHours[6];
  mixedtext.text = "Wake At:";
}

//Sleep At
function sleepAt(timeInMs, ampm){
  //variables
  var sleepTime = 5400000; //1.5 hours in ms
  var time_list = [];
  var ampm_list = [];
  var min_disp = ["00","15","30","45"];
  var hour_store = [];
  var min_store = [];
  var return_list = [];
  var time = new Date((timeInMs+14400000));
  
  //log the selected time
  console.log("Hours : " + time.getHours() + " ; Minutes : " + time.getMinutes() + " " + ampm);
  
  //create list of dates with new times to sleep at
  time_list[0] = new Date((sleepTime+time.valueOf()));
  time_list[1] = new Date((time.valueOf()+(sleepTime*2)));
  time_list[2] = new Date((time.valueOf()+(sleepTime*3)));
  time_list[3] = new Date((time.valueOf()+(sleepTime*4)));
  time_list[4] = new Date((time.valueOf()+(sleepTime*5)));
  time_list[5] = new Date((time.valueOf()+(sleepTime*6)));
  time_list[6] = time;
  
  //loop through time_list to adjust AM/PM if it changed
  for(var i=0;i<time_list.length-1;i++){
    if(time_list[i].getHours()==0){
      time_list[i].setHours(12);
      ampm_list[i] = "AM";
    }
    if(time_list[i].getHours()>=13){
      if(ampm == "AM"){
        ampm_list[i] = "PM";
      }else{
        ampm_list[i] = "AM";
      }
      time_list[i].setHours(time_list[i].getHours()-12);
    }else{
      ampm_list[i] = ampm;
    }
  }

  
  //loop through time_list to set minutes to display 2 0s, also covers the others
  for(var k=0;k<time_list.length;k++){
    if(time_list[k].getMinutes()==0){
      min_store[k] = min_disp[0];
    }else if(time_list[k].getMinutes()==15){
      min_store[k] = min_disp[1];
    }else if(time_list[k].getMinutes()==30){
      min_store[k] = min_disp[2];
    }else if(time_list[k].getMinutes()==45){
      min_store[k] = min_disp[3];
    }
  }
  
  //loop through time_list to set hours under 10 to display 0 in front
  for(var k=0;k<time_list.length;k++){
    if(time_list[k].getHours()==1){
      hour_store[k] = "01";
    }else if(time_list[k].getHours()==2){
      hour_store[k] = "02";
    }else if(time_list[k].getHours()==3){
      hour_store[k] = "03";
    }else if(time_list[k].getHours()==4){
      hour_store[k] = "04";
    }else if(time_list[k].getHours()==5){
      hour_store[k] = "05";
    }else if(time_list[k].getHours()==6){
      hour_store[k] = "06";
    }else if(time_list[k].getHours()==7){
      hour_store[k] = "07";
    }else if(time_list[k].getHours()==8){
      hour_store[k] = "08";
    }else if(time_list[k].getHours()==9){
      hour_store[k] = "09";
    }else if(time_list[k].getHours()==9){
      hour_store[k] = "09";
    }else if(time_list[k].getHours()==10){
      hour_store[k] = "10";
    }else if(time_list[k].getHours()==11){
      hour_store[k] = "11";
    }else if(time_list[k].getHours()==12){
      hour_store[k] = "12";
    }
  }
  
  return_list[0] = time_list[6].getHours() + " : " + time_list[6].getMinutes() + " " + ampm;  
  return_list[1] = hour_store[0] + ":" + min_store[0] + " " + ampm_list[0];
  return_list[2] = hour_store[1] + ":" + min_store[1] + " " + ampm_list[1];
  return_list[3] = hour_store[2] + ":" + min_store[2] + " " + ampm_list[2];
  return_list[4] = hour_store[3] + ":" + min_store[3] + " " + ampm_list[3];
  return_list[5] = hour_store[4] + ":" + min_store[4] + " " + ampm_list[4];
  return_list[6] = hour_store[5] + ":" + min_store[5] + " " + ampm_list[5];

  return return_list;
}

function dispRes(arraY){
  return (hour_result[arraY[0]] + ":" + min_result[arraY[1]] + ":" + am_pm_result[arraY[2]]);
}


//To show and hide an element
function toggle(ele) {
  ele.style.display = (ele.style.display === "inline") ? "none" : "inline";
}

//Uses toggle to activate and then again to hide all main elements
function clearMain(){
  toggle(hour);
  toggle(min);
  toggle(am_pm);
  toggle(calculate);
  toggle(calculate2);
  
  toggle(result);
  toggle(result2);
  toggle(result3);
  toggle(result4);
  toggle(result5);  
  toggle(result6);  
  //toggle(mixedtext); 
  toggle(back_button);
}



function back(){ 
  toggle(result);
  toggle(result2);
  toggle(result3);
  toggle(result4);
  toggle(result5);  
  toggle(result6);  
  //toggle(mixedtext); 
  toggle(back_button);
  mixedtext.text = "Zzz";
  toggle(hour);
  toggle(min);
  toggle(am_pm);
  toggle(calculate);
  toggle(calculate2);
}