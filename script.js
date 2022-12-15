let today = new Date(); // create a date Object

let day = today.getDate().toString().padStart(2,"0"); //assign today's day
let month = today.getMonth()+1; //January is 0 (assign today's month)
let year = today.getFullYear();//assign today's year

today = year+'-'+month+'-'+ day; //Create the correct format for the date

const date = document.getElementById("date");//get the input date

date.setAttribute("min", today);//Create and set an attribute min starting today

//Select my form
let form = document.querySelector("form");

const elements = form.elements;

//Create an option object, to assign default options for our futur tooltips
const options = {
    title:"Message par défaut", //title by default otherwise tooltip cannot appear
    customClass:"custom-tooltip"
}

//Loop on elements to isolate the inputs
for (const element of elements){
    const type = element.type;
    const elementName = element.name;
    //Check if one or several inputs are invalids
    if( type != "submit"){ 
        element.addEventListener("invalid", (event) => { //Create a callback function when an input is invalid
            event.preventDefault(); //Disable default beahvior of html
            
            //add bootstrap classes to make appear an input as invalid
            element.classList.add("is-invalid");

            let getElementName = document.getElementById(`${elementName}-text`);
            getElementName.classList.add("text-danger");

            let message = "";

            //check if input is invalid because of value Missing and custom the message in the tooltip
            if(element.validity.valueMissing){ 
                message = "Ce champs est obligatoire";
            }else if(elementName == "date" && element.validity.rangeUnderflow){  //check if the date is under the min attribute
                message = "Doit être égale ou supérieure à aujourd'hui";
            }else if(elementName == "price" && element.validity.rangeUnderflow){  //check if the price is under 0
                message = "Doit être positif";
            }

            //Create or get a tooltip from an element with specified options
            const tooltip = bootstrap.Tooltip.getOrCreateInstance(element, options);
            
            //modified the message after submitted form if input is still invalid
            tooltip.setContent({'.tooltip-inner' : message});
            
            let firstInvalidElement = document.querySelector(".is-invalid");//get first invalid input
            if(firstInvalidElement == element){//after change if the element on focus is first invalid element => focus()
                firstInvalidElement.focus();
            }
            
        })  

        //Create a function when an input is changed by the user
        element.addEventListener("change", (event) => {
            if(element.checkValidity()){

                element.classList.remove("is-invalid");
                element.classList.add("is-valid");
                
                let getElementName = document.getElementById(`${elementName}-text`);
                getElementName.classList.remove("text-danger"); 
                getElementName.classList.add("text-success"); 

                const tooltip = bootstrap.Tooltip.getOrCreateInstance(element);

                tooltip.dispose();//destroy the tooltip
            }

        })

    }  
       
}
form.addEventListener("submit", (event) => {
        event.preventDefault();
            if(form.reportValidity()){//check if all the fields are valid...
                form.reset();//...the form resets...
                for(const element of elements){
                    element.classList.remove("is-valid");
                    const elementName = element.name;
                    let getElementName = document.getElementById(`${elementName}-text`);
                    getElementName.classList.remove("text-success");
                }
                displayToaster(); //...the function for the toaster is called     
            }
           
})

//Function to display a toaster
function displayToaster(){
    const myToast = document.querySelector('.toast');
    const toast = bootstrap.Toast.getOrCreateInstance(myToast);
    toast.show();
}


        





















