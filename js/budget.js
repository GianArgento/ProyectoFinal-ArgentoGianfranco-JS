//Formas de pago//

let deletPayment = false;
  
  $("#formasPago").click(showPayments);
  $("#formPresupuesto > #divpagos").hide();
  
function showPayments() {
    $.ajax({
      url: "json/ejemplo.json",
      tye: "GET",
      dataType: "json"
  
    }).done( function(resultJson) {
      if (deletPayment) {
        $("#formPresupuesto > #divpagos").fadeOut(1000);      
      } else {   
          $("#formPresupuesto > #divpagos > h5").remove();
          $("#formPresupuesto > #divpagos > h4").remove();
          for (let i = 0; i <= 3; i++){
            let id = resultJson.detalles[i].id;
            let pago = resultJson.detalles[i].pago;
            console.log(id)
            let idelemento = document.createElement("h4");
            let idtexto = document.createTextNode(id);
            idelemento.appendChild(idtexto);
            $("#formPresupuesto > #divpagos").append(idelemento);
            let pagoelemento = document.createElement("h5");
            let pagotexto = document.createTextNode(pago);
            pagoelemento.appendChild(pagotexto);
            $("#formPresupuesto > #divpagos").append(pagoelemento);
      } 
      $("#formPresupuesto > #divpagos").fadeIn(800);
    }
    deletPayment = !deletPayment;
     }).fail( function(xhr, status, error) {
      console.log(xhr);
      console.log(status);
      console.log(error);
    })
}




//Datos Cliente//

function Client (nombre, mail, dni) {
    this.nombre = nombre;
    this.email = mail;
    this.dni = parseInt(dni);
}
//Servicio a contratar//
  
function Service(sections, tienda, mantenimiento, webExpress) {
      this.sections = parseInt(sections);
      this.tienda = tienda;
      this.mantenimiento = mantenimiento;
      this.webExpress = webExpress;
}
  
//Precios//
  
function totalPrice(param){ 
  if (param.tienda == "si") {
    valorTienda=200;
  } else {
    valorTienda=0;
  }
  if (param.mantenimiento == "si") {
    valorMantenimiento=100;
  } else {
    valorMantenimiento=0;
  }
  if (param.webExpress == "si") {
    valorWebExpress=150;
  } else {
    valorWebExpress=0;
  }
  let resultado = (param.sections+valorTienda+valorMantenimiento+valorWebExpress);
  return resultado;
}
  
  
//Validar datos//

function validateName(valor) {
    if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
      console.log(valor);
      return false;
    } 
    return true;
}
  
function validateDNI(valor) {
    if( valor == null || valor.length == 0 || !(/^\d{7,8}$/.test(valor))) {
      console.log(valor);
      return false;
    } 
    return true;
}
  
function validateMail(valor) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if( valor == null || valor.length == 0 || !re.test(valor)) {
      console.log(valor);
      return false;
    } 
    return true;
}
//Obtener datos de servicio//
function getService(){
    let formSecciones = $("#selectSecciones").val() ;
    console.log(formSecciones);
    let formTiendaOnline = $("#selectTiendaOnline").val() ;
    console.log(formTiendaOnline);
    let formMantenimiento = $("#selectMantenimiento").val() ;
    console.log(formMantenimiento);
    let formWebExpress = $("#selectWebExpress").val() ;
    console.log(formWebExpress);
    let servicio1 = new Service(formSecciones, formTiendaOnline, formMantenimiento, formWebExpress);
    return servicio1;
};

//Obtener datos de cliente

function getClient(){
    let formNombre = $("#inputNombre").val() ;
    console.log(formNombre);
    let formDni = $("#inputDni").val();
    console.log(formDni);
    let formEmail = $("#inputEmail").val() ;
    console.log(formEmail);
    let cliente1 = new Client(formNombre, formEmail, formDni);
    return cliente1;
  
}
  
//Mostrar presupuesto y errores en datos//

function submitForm(){
    let servicio1 = getService();
    let cliente1 = getClient();
    showBudget(servicio1, cliente1);
    saveClient(cliente1);
  }
  
$("#saveChanges").click( function() {
    let nameCheck = validateName($("#inputNombre").val());
    let DNICheck = validateDNI($("#inputDni").val());
    let mailCheck  = validateMail($("#inputEmail").val()); 
  
    $("#formPresupuesto > #divmostrarPresup > h3").remove();
    $("#formPresupuesto > #validar-nombre > h6").remove();
    $("#formPresupuesto > #validar-dni > h6").remove();
    $("#formPresupuesto > #validar-email > h6").remove();
  
    if(nameCheck && DNICheck && mailCheck){
      submitForm();
    }else{
      if(nameCheck == false){
        let nombreFalse = $("<h6></h6>").text("Ingrese nombre válido!")
        $("#formPresupuesto > #validar-nombre").append(nombreFalse);
        //div con error en nombre
      }
      if(DNICheck == false){
        //div con error en dni
        let dniFalse = $("<h6></h6>").text("Ingrese DNI válido!")
        $("#formPresupuesto > #validar-dni").append(dniFalse);
      }
      if(mailCheck == false){
        //div con error en mail
        let emailFalse = $("<h6></h6>").text("Ingrese email válido!")
        $("#formPresupuesto > #validar-email").append(emailFalse);
      }
    }
  })
  
  $("#limpiarDatos").click(function(){
    removeElements();
  })
  
  function removeElements() {
    $("#formPresupuesto > #divmostrarPresup > h3").remove();
    $("#formPresupuesto > #divmostrarPresup > #selectCuotasPresupuesto").hide(300);
    $("#formPresupuesto > #divmostrarPresup > #labelCuotas").hide(300);
  };
  
$("#formPresupuesto > #divmostrarPresup").hide();
  
function showBudget(servicio,cliente) {
      console.log(servicio)
      console.log(cliente)
      let resultado = totalPrice(servicio);
  
      $("#formPresupuesto > #divmostrarPresup > h3").remove();
      let totalPresupuesto = $("<h3></h3>").text("Hola " + cliente.nombre + ", su presupuesto es " + resultado + "U$D");
      $("#formPresupuesto > #divmostrarPresup").append(totalPresupuesto);
      $("#formPresupuesto > #divmostrarPresup").fadeIn(800);
      $("#formPresupuesto > #divmostrarPresup > #labelCuotas").fadeIn(600);
      $("#formPresupuesto > #divmostrarPresup > #selectCuotasPresupuesto").fadeIn(600);
  
      return resultado;
};
  
//calculo de cuotas//
  
$("#selectCuotasPresupuesto").change(function(){
    calculateFees();
})
  
function calculateFees() {
    let servicio1 = getService();
    let precioTotal = totalPrice(servicio1);
    let opcionesCuotas = parseInt($("#selectCuotasPresupuesto").val()) ;
    let calculoDeCuotas = precioTotal/opcionesCuotas;
    calculoDeCuotas = calculoDeCuotas.toFixed(2);
    console.log(calculoDeCuotas);
    showFees(calculoDeCuotas, opcionesCuotas);
    return calculoDeCuotas;
  };
  
  
  
function showFees(calculo, opciones) {
    let cliente1 = getClient();
    $("#formPresupuesto > #divmostrarPresup > h3").text("Hola "+ cliente1.nombre + ", su presupuesto es " + calculo + "U$D x" + opciones);
   
}
  
  
//Local Storage//

function saveClient(cliente2) {
    console.log(cliente2)
    let jsonCliente = { nombre: cliente2.nombre, dni: cliente2.dni, mail: cliente2.email }
    console.log(jsonCliente);
    console.log(jsonCliente['nombre'])
    let stringifyJson = JSON.stringify(jsonCliente);
    console.log(stringifyJson);
    localStorage.setItem('cliente', stringifyJson);
}
  
loadClient();
  
function loadClient() {
    let stringifyClient = localStorage.getItem('cliente')
    if (stringifyClient) {
    let cliente = JSON.parse(stringifyClient);
    console.log(cliente['nombre']);
    $("#inputNombre").val(cliente['nombre']);
    $("#inputDni").val(cliente['dni']);
    $("#inputEmail").val(cliente ['mail']);
  } else {
    console.log('no existe elemento en local storage')
  }
  
}

