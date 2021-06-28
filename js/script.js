// Mitchell Nichols's Interactive Form project - 6/27/2021

//focus on name field
//https://www.w3schools.com/jsref/met_html_focus.asp
window.onload = function() {
    document.getElementById("name").focus();
};

let otherOptionJob = document.getElementById("other-job-role"); 
//set default everytime the page loads
otherOptionJob.style.display= 'none';

//hide and show when the 'other role' option is selected under the job role dropdown menu
document.getElementById("title").addEventListener("change", e =>{
    let hitOtherOption = e.target.value;
    if(hitOtherOption === "other"){
        otherOptionJob.style.display= "";
    }else{
        //hide the option job field box if the 'option role' option is unselected
        otherOptionJob.style.display= "none";
    }
});

//hide color selection
const shirtColorOption = document.getElementById("shirt-colors");
shirtColorOption.style.display = "none";
//document.querySelectorAll("#design option")[0].defaultSelected = true;

//show the color selection once the design option is selected
document.getElementById("shirt-designs").addEventListener("change", e => {
    shirtColorOption.style.display = "";
    //let designSelect = document.querySelectorAll("#design option");
    let colorSelect = document.querySelectorAll("#color option");
    //document.querySelectorAll("#design option")[0].defaultSelected = true;
    for(let i = 0; i < colorSelect.length; i++){
        colorSelect[i].style.display = "none";
        const target = e.target.value;
        const colorValue = colorSelect[i].dataset.theme;

        if(colorValue === target){
            colorSelect[i].selected = true;
            colorSelect[i].style.display = "";
        } else{
            colorSelect[i].selected = false;
            colorSelect[i].style.display = "none";
        }

    }
});

//listen for change action in the activities section
const input_boxes = document.querySelectorAll("#activities-box input");
const activities_box = document.querySelector("#activities-box");
let actList = document.getElementById("activities");
let set_activity_option;

actList.addEventListener("click", (e) => {
    set_activity_option = true;
    let totalCost = 0;
    const clickBox = e.target;
    const eBoxData = e.target.getAttribute("data-day-and-time");

    for (let i = 1; i < input_boxes.length; i++) {
        const label = input_boxes[i].parentElement;
        const boxData = input_boxes[i].getAttribute("data-day-and-time");

        if(input_boxes[i].checked || clickBox.dataset.cost == 200){
            if (clickBox.dataset.cost == 200){
                totalCost = 200;

                if (!document.getElementsByName("all")[0].checked){
                    totalCost = 0;
                    set_activity_option = false
                }

            } else {
                totalCost += parseInt(input_boxes[i].dataset.cost);
            }
        } 

        if(eBoxData === boxData && clickBox !== input_boxes[i] || clickBox.dataset.cost == 200){    
            label.classList.add("disabled");
            input_boxes[i].disabled = true;

            if (!clickBox.checked) {
                label.classList.remove("disabled");
                input_boxes[i].disabled = false;
                input_boxes[i].checked = false;
            };
        }  
        document.getElementById("activities-cost").innerHTML = `Total: $${totalCost}`;
    }
});

//Payment Section
//Set Credit Card as default in dropbox
const paymentList = document.getElementById("payment");
const creditcard = document.getElementById("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");

//Listen for change action in the payment section
paymentList.children[1].defaultSelected = true
paypal.style.display = "none";
bitcoin.style.display = "none";

paymentList.addEventListener("change", e=> {

    //reset the payment dropbox
    creditcard.style.display = "";
    paypal.style.display = "";
    bitcoin.style.display = "";

    if(e.target.value === "credit-card"){
        paypal.style.display = "none";
        bitcoin.style.display = "none";
    } else if(e.target.value === "paypal"){
        creditcard.style.display = "none";
        bitcoin.style.display = "none";
    } else if(e.target.value === "bitcoin"){
        paypal.style.display = "none";
        creditcard.style.display = "none";
    }
});

const form = document.getElementsByTagName("form")[0];
const name = document.getElementById("name");
const email = document.getElementById("email");
const cc = document.getElementById("cc-num");
const zip = document.getElementById("zip");
const cvv = document.getElementById("cvv");


// if the validation failed (by getting the false value in paramter), show the css error
// other wise show green check as passed true validation
function validationPass(element){
    element.parentElement.classList.add("valid");
    element.parentElement.classList.remove("not-valid");
    element.parentElement.lastElementChild.style.display = "none";
}

function validationFail(element){
    element.parentElement.classList.add("not-valid");
    element.parentElement.classList.remove("valid");
    element.parentElement.lastElementChild.style.display = "block";
}

//test and valid inputs and return true if its valid. Otherwise false.
const nameValidation = () => {
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(name.value);

    if(nameIsValid){
        validationPass(name);
    }
    else{
        validationFail(name);
    }

    return nameIsValid;
};

const emailValidation = () => {
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);

    if(emailIsValid){
        validationPass(email);
    }
    else{
        validationFail(email);
    }

    return emailIsValid;
};

const ccValidation = () => {
    const ccIsValid = /^[0-9]{13,16}$/.test(cc.value);

    if(ccIsValid){
        validationPass(cc);
    }
    else{
        validationFail(cc);
    }

    return ccIsValid;
};

const zipValidation = () => {
    const zipIsValid = /^[0-9]{5}$/.test(zip.value);

    if(zipIsValid){
        validationPass(zip);
    }
    else{
        validationFail(zip);
    }

    return zipIsValid;
};

const cvvValidation = () => {
    const cvvIsValid = /^[0-9]{3}$/.test(cvv.value);

    if(cvvIsValid){
        validationPass(cvv);
    }
    else{
        validationFail(cvv);
    }

    return cvvIsValid;
};

//Listen for submit button. If one of those inputs are not valid, prevent submit.
form.addEventListener('submit', e => {
    if(!nameValidation()){
        e.preventDefault();
    }

    if(!emailValidation()){
        e.preventDefault();
    }

    // Dont do the credit card validation if paypal or bitcoin is selected
    if(document.getElementById("payment").value == "credit-card"){
        if(!ccValidation()){
            e.preventDefault();
        }
        if(!zipValidation()){
            e.preventDefault();
        }
    
        if(!cvvValidation()){
            e.preventDefault();
        }
    }

    //Add error if no activity selected
    if(!set_activity_option){
        e.preventDefault();
        activities_box.parentElement.classList.add("not-valid");
        activities_box.parentElement.classList.remove("valid");
        activities_box.parentElement.lastElementChild.style.display = "block";
    }else if(set_activity_option){
         activities_box.parentElement.classList.add("valid");
         activities_box.parentElement.classList.remove("not-valid");
         activities_box.parentElement.lastElementChild.style.display = "none";
    }
});

//Accessibility: Handles tab index for activities checkboxes
document.querySelectorAll('#activities input').forEach(cx => {
  cx.addEventListener('focus', e => cx.parentElement.classList.add('focus'));

  cx.addEventListener('blur', e => {
    const active = document.querySelector('.focus');
    if (active) active.classList.remove('focus');
  })
});

//Form inputs validation - send a live error message if its not invalid during typing
email.addEventListener("keyup", () => {
    emailValidation(); 
});

name.addEventListener("keyup", () => {
    nameValidation(); 
});

cc.addEventListener("keyup", () => {
    ccValidation(); 
});

zip.addEventListener("keyup", () => {
    zipValidation(); 
});

cvv.addEventListener("keyup", () => {
    cvvValidation(); 
});