// datos mails
const publicKey = '6qwMRE_ep9cKodiyb'; 
const contactService = 'service_7bqbp9n'
const contactForm = 'template_2536i8p';

// Carteles de status para el mail
const successEmail = '<div class="status exito"><span id="bold">Email</span> enviado exitosamente</div>';
const errorEmail = '<div class="status error">Ingrese un <span id="bold">Email</span> válido</div>';
const errorEmailApi = '<div class="status error">Algo falló en el envío, por favor intente mas tarde</div>';
const errorInputs = '<div class="status error">Debe completar todos los campos</div>';

// Elementos DOM
const statusEmail = document.getElementById('statusEmail');
const emailValue = document.getElementById('email');
const nameValue = document.getElementById('nombre');
const messaje = document.getElementById('messaje');
const form = document.getElementById('contact-form'); //formulario

emailjs.init(publicKey);

window.onload = function() {
    form.addEventListener('submit', function(event) {
        
        statusEmail.innerHTML = loader;                
        
        if (validarEmail(emailValue.value) && nameValue.value != "" && messaje.value != "") {  /*Validación de mail y campos vaciós antes de mandar el mail */
            event.preventDefault();
            emailjs.sendForm(contactService, contactForm, this)            
            .then(function() {
                statusEmail.innerHTML = successEmail;   /* Todo salió bien -> un cartel informando la situacion */
            }, function (Error) {
                statusEmail.innerHTML = errorEmailApi;  /* Fallo en el envío -> muestra un cartel informando*/
            });
        } else{
            if (nameValue.value == "" || messaje.value == "") {
                statusEmail.innerHTML = errorInputs;
            }else{
                statusEmail.innerHTML = errorEmail;    /* Email ingresado inválido -> muestra un cartelito*/        
            }
        } 
    });}

function validarEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);    
    }
