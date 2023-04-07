let typeEvent = '';
let resumen = [];
let eventCorporative;
let eventSocial;
let eventAsistant;

let estimateForm = document.querySelector('#estimateForm');
let corp = document.querySelector('#corp-event');
let soc = document.querySelector('#soc-event');
let eventCorp = document.getElementsByName('eventsCorp');

/* Lists EventsCorp */

const containerListEventCorp = document.querySelector('#containerListEventCorp');

function htmlLEC(arrayLEC) {
  let fragment = document.createDocumentFragment();
  let divElement = document.createElement('div');
  divElement.classList.add('d-grid');
  divElement.classList.add('gap-2');
  divElement.classList.add('col-7');
  divElement.classList.add('mx-auto');
  divElement.id = 'divListEventCorp';
  arrayLEC.forEach(function(val) {
    divElement.innerHTML +=
    `
      <input type="radio" class="btn-check" name="${val.name}" id="${val.id}" onchange="getValue('C', this)" autocomplete="off">
      <label class="btn btn-outline-${val.btn} btn-sm" for="${val.id}">${val.text}</label>
    `;
    fragment.append(divElement);
  });

  containerListEventCorp.append(fragment);
}

let eventCorps = listEventsCorp;

/* Lists EventsSoc */
const containerListEventSoc = document.querySelector('#containerListEventSoc');

function htmlLES(arrayLES) {
  let fragment = document.createDocumentFragment();
  let divElement = document.createElement('div');
  divElement.classList.add('d-grid');
  divElement.classList.add('gap-2');
  divElement.classList.add('col-7');
  divElement.classList.add('mx-auto');
  divElement.id = 'divListEventSoc';
  arrayLES.forEach(function(val) {
    divElement.innerHTML +=
    `
      <input type="radio" class="btn-check" name="${val.name}" id="${val.id}" onchange="getValue('S', this)" autocomplete="off">
      <label class="btn btn-outline-${val.btn} btn-sm" for="${val.id}">${val.text}</label>
    `;
    fragment.append(divElement);
  });
  
  containerListEventSoc.append(fragment);
}

let eventSocs = listEventsSoc;

/* Lists EventsSoc */
const containerListCountAsistant = document.querySelector('#containerListCountAsistant');

function htmlCountAsistant(arrayCountAsist) {
  let fragment = document.createDocumentFragment();
  let divElement = document.createElement('div');
  divElement.classList.add('d-grid');
  divElement.classList.add('gap-2');
  divElement.classList.add('col-6');
  divElement.classList.add('mx-auto');
  divElement.id = 'divCountAsistant';
  arrayCountAsist.forEach(function(val) {
    divElement.innerHTML +=
    `
      <input type="radio" class="btn-check" name="${val.name}" id="${val.id}" onchange="getValue('A', this)" autocomplete="off">
      <label class="btn btn-outline-${val.btn} btn-sm" for="${val.id}">${val.text}</label>
    `;
    fragment.append(divElement);
  });
  
  containerListCountAsistant.append(fragment);
}

let countAsistants = listCountAsistant;

const containerExtras = document.querySelector('#containerExtras');

function htmlEventExtras(arrayEventExtras) {
  let fragment = document.createDocumentFragment();
  let divElement = document.createElement('div');
  divElement.classList.add('row');
  divElement.classList.add('align-items-center');
  divElement.id = 'divEventExtras';
  arrayEventExtras.forEach(function(val) {
    divElement.innerHTML += `
      <div class="offset-1 offset-md-1 col-5 col-md-6 mb-3">
        <span class="pl-5">${val.text}</span>
      </div>
    `;
    let div1 = document.createElement('div');
    div1.classList.add('col-6');
    div1.classList.add('offset-md-1');
    div1.classList.add('col-md-3');
    div1.classList.add('d-flex');
    div1.classList.add('mb-2');
    val.options.forEach(function(opt) {
      div1.innerHTML += `
        <div class="mx-auto">
          <input type="radio" class="btn-check" name="${val.name}" id="${opt.id}" onchange="setExtras('${val.id}','${opt.id}')" autocomplete="off" ${opt.state}>
          <label class="btn btn-outline-${opt.btn}" for="${opt.id}">${opt.text}</label>
        </div>
      `;
      divElement.append(div1);
    });
    fragment.append(divElement);
  });

  containerExtras.append(fragment);
}

const containerResumen = document.querySelector('#containerResumen');

function htmlResumen() {
  let fragment = document.createDocumentFragment();
  let divElement = document.createElement('div');
  divElement.classList.add('row-resumen');
  divElement.id = 'divResumen';
  resumen.forEach(function(val) {
    divElement.innerHTML += `
      <div class="col-5-resumen">
        <p class="m-b-0">${val.type}</p>
      </div>
      <div class="col-7-resumen">
        <small class="m-b-0 p-x-0">${val.value}</small>
      </div>
    `;
    fragment.append(divElement);
  });

  containerResumen.append(fragment);
}

let eventExtras = listExtras;

const typeEventSelect = document.querySelector('#typeEventSelect');

function htmlTypeEventSelect() {
  document.getElementById("titleCountAsistant").style.display = "none";
  document.getElementById("countAsistant").style.display = "none";
  document.getElementById("nextprevious").style.display = "none";

  const a = document.getElementById('containerListCountAsistant');
  const b = document.getElementById('divCountAsistant');

  try {
    a.removeChild(b);
  } catch (error) {}

  if (typeEvent === 'C') {
    let levelOne = document.getElementById("containerListEventCorp");
    let levelTwo = document.getElementById("divListEventCorp");

    try {
      levelOne.removeChild(levelTwo);      
    } catch (error) {}

    htmlLEC(eventCorps);
    document.getElementById("typeEventSoc").style.display = "none";
    document.getElementById("typeEventCorp").style.display = "block";
  }

  if (typeEvent === 'S') {
    const levelOne = document.getElementById("containerListEventSoc");
    const levelTwo = document.getElementById("divListEventSoc");

    try {
      levelOne.removeChild(levelTwo);
    } catch (error) {}

    htmlLES(eventSocs);
    document.getElementById("typeEventCorp").style.display = "none";
    document.getElementById("typeEventSoc").style.display = "block";
  }
}

if (estimates) {
  corp.addEventListener('click', function(evt) {
    typeEvent = 'C';
    htmlTypeEventSelect();
  });

  soc.addEventListener('click', function(evt) {
    typeEvent = 'S';
    htmlTypeEventSelect();
  });

  document.getElementById("titleCountAsistant").style.display = "none";
  document.getElementById("countAsistant").style.display = "none";
  document.getElementById("nextprevious").style.display = "none";
}

function getValue(type, radio) {
  const a = document.getElementById('containerListCountAsistant');
  const b = document.getElementById('divCountAsistant');

  if (type !== 'A') {
    try {
      a.removeChild(b);
    } catch (error) {}

    eventCorporative = null;
    eventSocial = null;
    htmlCountAsistant(countAsistants);
  } 

  eventAsistant = null;
    
  switch (type) {
    case 'C':
      eventCorporative = listEventsCorp.filter(m => m.id === radio.id)[0];
      break;
    case 'S':
      eventSocial = listEventsSoc.filter(m => m.id === radio.id)[0];
      break;
    case 'A':
      eventAsistant = listCountAsistant.filter(m => m.id === radio.id)[0];
      break;  
  }

  if (eventCorporative || eventSocial) {
    document.getElementById("titleCountAsistant").style.display = "block";
    document.getElementById("countAsistant").style.display = "block";
  }
  
  if (eventAsistant) {
    document.getElementById("nextprevious").style.display = "block";
  }
}

function setExtras(extras, option) {
  const temp = eventExtras.filter(m => m.id === extras)[0];

  for (const o of temp.options) {
    if (o.id === option) {
      o.state = 'checked';
    } else {
      o.state = '';
    }
  }
}


// WIZARD

var currentTab = 0;

document.addEventListener("DOMContentLoaded", function(event) {
  if (estimates) {
    showTab(currentTab);
  }
});

function showTab(n) {
  var x = document.getElementsByClassName("tab");

  if (n === x.length) {
    document.getElementById("prevBtn").innerHTML = "Volver";
    document.getElementById("nextBtn").innerHTML = "Solicitar";
    return;
  }

  x[n].style.display = "block";

  if (n === 1) {
    const a = document.getElementById('containerExtras');
    const b = document.getElementById('divEventExtras');

    try {
      a.removeChild(b);
    } catch (error) {}
    htmlEventExtras(eventExtras);
  }

  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Finalizar";
  } else {
    document.getElementById("nextBtn").innerHTML = "Siguiente";
  }

  fixStepIndicator(n);
}

function nextPrev(n) {
  if (n === -1) {
    resumen.length = 0;    
  }

  if (resumen.length > 0) {
    Swal.fire({
      title: 'Evento',
      text: 'Gracias por utilizar el presupuesto en linea. Pronto nos pondremos en contacto',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      // document.getElementsByName('evento-resumen')[0].style.display = "none";
      document.getElementById("nextprevious").style.display = "none";
      document.getElementById("p1").style.display = "none";
      createPdf();
      setTimeout(() => {
        // location.href = '/estimates.html';        
      }, 2000);
    });
    
    return;
  }

  var x = document.getElementsByClassName("tab");

  if (resumen.length === 0) {
    if (n == 1 && !validateForm()) return false;
  }

  if (n === -1 && currentTab === x.length) {
    document.getElementById("prevBtn").innerHTML = "Anterior";
    x[currentTab-1].style.display = "none";
    resumen.length = 0;
    const a2 = document.getElementById('containerResumen');
    const b2 = document.getElementById('divResumen');
    try {
      a2.removeChild(b2);
    } catch (error) {}
    document.getElementById("all-steps").style.display = "block";
    document.getElementById("resumen").style.display = "none";
  } else { 
    x[currentTab].style.display = "none";
  }
  
  currentTab = currentTab + n;

  if (currentTab >= x.length) {
    document.getElementById("all-steps").style.display = "none";
    document.getElementById("resumen").style.display = "block";

    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const phone = document.querySelector('#phone').value;
    const email = document.querySelector('#email').value;
    const eventDate = document.querySelector('#eventDate').value;
    
    resumen.length = 0;
    resumen.push({
      type: 'Contacto',
      value: firstName + ' ' + lastName
    });
    resumen.push({
      type: 'Email',
      value: email
    });
    resumen.push({
      type: 'Teléfono',
      value: phone
    });
    resumen.push({
      type: 'Fecha Evento',
      value: eventDate
    });
    resumen.push({
      type: 'Tipo Evento',
      value: (typeEvent === 'C' ? 'Corporativo' : 'Social')
    });
    resumen.push({
      type: 'Evento',
      value: (typeEvent === 'C' ? eventCorporative.text : eventSocial.text)
    });
    resumen.push({
      type: 'Asistentes',
      value: eventAsistant.text
    });

    for (const optExtras of eventExtras) {
      for (const opt of optExtras.options) {
        if (opt.state === 'checked' && opt.text === 'SI') {
          resumen.push({
            type: optExtras.text,
            value: opt.text
          });   
        }
      }
    }

    htmlResumen();
  }

  showTab(currentTab);
}

function validateForm() {
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");

  for (i = 0; i < y.length; i++) {
    y[i].className += " valid";

    if (y[i].value == "") {
      y[i].className += " invalid";
      valid = false;
    }
  }

  if (valid) { 
    document.getElementsByClassName("step")[currentTab].className += " finish"; 
  }

  return valid;
}

function fixStepIndicator(n) {
  var i, x = document.getElementsByClassName("step");

  for (i = 0; i < x.length; i++) { 
    x[i].className = x[i].className.replace(" active", ""); 
  }

  x[n].className += " active";
}

function createPdf() {
  // var canvas = document.getElementById('resumen');

  // domtoimage.toPng(canvas).then((dataUrl)=>{
  //   let imagen= new Image();
  //   imagen.src=dataUrl;/*obtengo el screenshot*/
  //   let pdf = new jsPDF('l','mm','A4');/* creamos el pdf con jspdf, l es de landscape, mm: medidas en milímetros, y A4 el formato*/
  //   pdf.addImage( imagen, 18, 10, 260,189); /*imagen: es la captura que insertaremos en el pdf, 18: margen izquierdo, 10: margen superior, 260:ancho, 189:alto, pueden jugar con estos valores, de esta forma me quedó prolijo en A4 horizontal*/
  //   pdf.save( 'documento.pdf' ); /* descargamos el pdf con ese nombre.*/
  // });



  const options = {
    margin: 1,
    filename: 'presupuesto.pdf',
    image: {
      type: 'jpeg',
      quality: 0.98
    },
    html2canvas: {
      scale: 2,
      letterRendering: true,
    },
    jsPDF: {
      unit: 'in',
      orientation: 'portrait'
    }
  };

  const element = document.getElementById('resumen');
  console.log("🚀 ~ file: estimates.js:455 ~ createPdf ~ element:", element);

  html2pdf()
    .from(element)
    .set(options)
    .toPdf()
    .save()
    .catch(err => console.log(err));
}


