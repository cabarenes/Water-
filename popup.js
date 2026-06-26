
const DAILY_GOAL = 2500;


let waterAmount = 0;



function getToday(){

    return new Date()
    .toISOString()
    .split("T")[0];

}



function loadData(){


chrome.storage.local.get(
[
"water",
"date"

],

(result)=>{


let today=getToday();


if(result.date !== today){

    waterAmount=0;

    chrome.storage.local.set({

        water:0,
        date:today

    });


}

else{

    waterAmount=result.water || 0;

}


updateUI();


});


}





function addWater(amount){


waterAmount += amount;


chrome.storage.local.set({

water:waterAmount,
date:getToday()

});


updateUI();


}




function updateUI(){


document.getElementById("amount")
.innerText =
`${waterAmount} ml / ${DAILY_GOAL} ml`;



let percentage =
(waterAmount / DAILY_GOAL)*100;


if(percentage>100)
percentage=100;



document.getElementById("progressBar")
.style.width =
percentage+"%";


}





document
.querySelectorAll(".water")
.forEach(button=>{


button.onclick=()=>{


let amount =
Number(button.dataset.amount);


addWater(amount);


};



});






document
.getElementById("addCustom")
.onclick=()=>{


let input =
document.getElementById("customAmount");


let value =
Number(input.value);



if(value>0){

addWater(value);

input.value="";

}


};






document
.getElementById("reset")
.onclick=()=>{


waterAmount=0;


chrome.storage.local.set({

water:0,
date:getToday()

});


updateUI();


};




loadData();
