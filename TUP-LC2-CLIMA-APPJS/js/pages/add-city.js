// Elementos DOM
const addCity = document.getElementById("addCity"); // input
const alerts = document.getElementById("alerts"); // alert
const agregar = document.getElementById("agregarCiudad"); // Enviar

// MENSAJES DE STATUS
const messages = {
    exito: "Ciudad agregada con éxito",
    error: "Error: La ciudad ingresada no se encuenta en la API o se produjo un error al consultar",
    cuidado: "La ciudad ingresada ya se encuentra almacenada",
}

agregar.onclick = async function() {
    alerts.innerHTML = loader;

    let cities = getCitiesFromLocalStorage();
    let newCity = addCity.value.toUpperCase();

    if(cities.includes(newCity)){
        alert = "cuidado";
    }else{
        if (await consultAPI(newCity)) {
            cities.push(newCity);
            localStorage.setItem("CITIES", JSON.stringify(cities));
            alert = "exito";
        }
        else {
            alert = "error";
        };
    }
    mostrarAlerts(alert);
}

function mostrarAlerts(alert){
    const parrafo = document.createElement("p");
    parrafo.textContent = messages[alert];
    parrafo.classList.add("status", alert)

    setTimeout(function() {
        alerts.innerHTML = "";
        alerts.appendChild(parrafo); 
        },1500); 
}
