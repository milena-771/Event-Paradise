const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

let today = new Date();

let day = today.getDate();
let month = today.getMonth()+1; //January is 0
let year = today.getFullYear();

        if(day<10){
                day='0'+day
            } 
        if(month<10){
            month='0'+month
        }
        today = year+'-'+month+'-'+ day;

const date = document.getElementById("date");

date.setAttribute("min", today);

let form = document.querySelector("form");

const elements = form.elements;

for (const element of elements){
    const type = element.type;
    const elementName = element.name;
    if(!element.checkValidity()){

        element.addEventListener("invalid", (event) => {
            event.preventDefault();
            
            element.classList.add("is-invalid");

            let getElementName = document.getElementById(`${elementName}-text`);
            getElementName.classList.add("text-danger");

            if(element.validity.valueMissing){
                element.setAttribute("data-bs-title", "Ce champs est obligatoire")
            }else if(elementName == "date" && element.validity.rangeUnderflow){
                element.setAttribute("tooltip-inner", "Doit être égale ou supérieure à aujourd'hui");
            }else if(elementName == "price" && element.validity.rangeUnderflow){
                element.setAttribute("tooltip-inner", "Doit être positif");
            }

            element.setAttribute("data-bs-toggle", "tooltip");
            element.setAttribute("data-bs-custom-class", "custom-tooltip");
            element.setAttribute("data-bs-placement", "top");

            const tooltip = bootstrap.Tooltip.getOrCreateInstance(element);

            if(element.validity.valueMissing){
                tooltip.setContent({'.tooltip-inner' : 'Ce champs est obligatoire'});
            }else if(elementName == "date" && element.validity.rangeUnderflow){
                tooltip.setContent({'.tooltip-inner' : 'Doit être égale ou supérieure à aujourd\'hui'});
            }else if(elementName == "price" && element.validity.rangeUnderflow){
                tooltip.setContent({'.tooltip-inner' : 'Doit être positif'});
            }

            let firstInvalidElement = document.querySelector(".is-invalid");
            
            firstInvalidElement.focus();
           

        })    
        element.addEventListener("change", (event) => {
            if(element.checkValidity()){
                
                element.classList.replace("is-invalid","is-valid");

                let getElementName = document.getElementById(`${elementName}-text`);
                getElementName.classList.replace("text-danger","text-success"); 

                const tooltip = bootstrap.Tooltip.getOrCreateInstance(element);

                tooltip.dispose();   

            }

        })
    }
}


    form.addEventListener("submit", (event) => {
        event.preventDefault();
            if(form.reportValidity()){
                form.reset();
                displayToaster();       
            }
            /*if(element.checkValidity()){
                const elementName = element.name;
                element.classList.add("is-valid");
                let getElementName = document.getElementById(`${elementName}-text`);
                getElementName.classList.add("text-success");
    
            }*/
    })
    



//Display a toaster when form is valid
function displayToaster(){
    const myToast = document.querySelector('.toast');
    const toast = bootstrap.Toast.getOrCreateInstance(myToast);
    toast.show();
}


        





















