
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
    if(type != "submit"){
        element.addEventListener("invalid", (event) => {
            event.preventDefault();
            
            element.classList.add("is-invalid");

            let getElementName = document.getElementById(`${elementName}-text`);
            getElementName.classList.add("text-danger"); 
        
            element.addEventListener("focus", (event) => {
                let validityState = element.validity;
                displayTooltip(element, elementName, validityState); 
            })
        })
        element.addEventListener("change", (event) => {
            if(element.checkValidity()){
                
                element.classList.replace("is-invalid", "is-valid");

                let getElementName = document.getElementById(`${elementName}-text`);
                getElementName.classList.replace("text-danger","text-success"); 

            }else{
                let validityState = element.validity;
                displayTooltip(element, elementName, validityState);
            }

        })

    }
}

function displayTooltip(element,elementName, validityState){
    let textTooltip = "";

    const errorValueMissing = validityState["valueMissing"];
    const errorRangeUnderFlow = validityState["rangeUnderflow"];

    if(errorValueMissing == true){
        textTooltip = "Veuillez remplir ce champs";
    }else if(elementName == "date" && errorRangeUnderFlow  == true){
        textTooltip = "Veuillez indiquer une date supérieure à aujourd'hui"; 
    }else if(elementName == "price" && errorRangeUnderFlow  == true){
        textTooltip = "Veuillez indiquer un tarif supérieur à zéro";
    }

    element.setAttribute("data-bs-toggle", "tooltip");
    element.setAttribute("data-bs-title", textTooltip);
    element.setAttribute("data-bs-custom-class", "custom-tooltip");
    element.setAttribute("data-bs-placement", "top");

    const tooltip = bootstrap.Tooltip.getOrCreateInstance(element);

    tooltip.show();
}


form.addEventListener("submit", (event) => {
    event.preventDefault();
        if(form.reportValidity()){
            form.reset();
            const toastBtn = document.getElementById('toastBtn');
            const myToast= document.getElementById('myToast');
            displayToast(toastBtn, myToast);
        }
    })

function displayToast(toastBtn, myToast){
    if(toastBtn){
        toastBtn.addEventListener('click', () =>{
            const toast = new bootstrap.Toast(myToast);
            toast.show();
            console.log(toast.isShown());
            
        })
    }
    
}

        





















