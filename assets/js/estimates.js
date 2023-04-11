let tabView;
let typeEvent = '';
let resumen = [];
let eventCorporative;
let eventSocial;
let eventAsistant;

let estimateForm = document.querySelector('#estimateForm');
let corp = document.querySelector('#corp-event');
let soc = document.querySelector('#soc-event');
let eventCorp = document.getElementsByName('eventsCorp');

const tabs = [
  {
    id: 0,
    key: 'tab0',
    visible: true,
    type: 'TE'
  },
  {
    id: 1,
    key: 'tab1',
    visible: false,
    type: 'CA'
  },
  {
    id: 2,
    key: 'tab2',
    visible: false,
    type: 'EX'
  },
  {
    id: 3,
    key: 'tab3',
    visible: false,
    type: 'CO'
  },
  {
    id: 4,
    key: 'tab4',
    visible: false,
    type: 'RE'
  },
];

const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

/* Btn Next */
nextBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  const tabActive = tabs.filter(m => m.visible === true)[0];

  if (tabActive.id === tabs.length - 1) {
    createPdf();
    Swal.fire({
      title: 'Evento',
      text: 'Gracias por utilizar el presupuesto en linea. Pronto nos pondremos en contacto',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      location.href = '/index.html';        
    });
    
    return;
  }

  if (tabView === 'CO') {
    if (validateForm()) {
      document.querySelector(`#step${tabActive.id}`).classList.remove('step-success');
      document.querySelector(`#step${tabActive.id}`).classList.remove('step-active');
      document.querySelector(`#step${tabActive.id}`).classList.add('step-error');
      return;
    } else {
      document.querySelector(`#step${tabActive.id}`).classList.remove('step-error');
      document.querySelector('#steps').style.display = 'none';
    }
  }

  if (tabActive) {
    for (const tab of tabs) {

      if (tab.id === tabActive.id + 1) {
        tab.visible = true;
        document.querySelector(`#step${tabActive.id}`).classList.add('step-success');

        if (tabActive.id + 1 < tabs.length - 1) {
          document.querySelector(`#step${tabActive.id+1}`).classList.add('step-active');
        }

        document.getElementById(tab.key).style.display = 'block';
        tabView = tab.type;

        if (tab.type === 'EX') {
          const a = document.getElementById('containerExtras');
          const b = document.getElementById('divEventExtras');

          try {
            a.removeChild(b);
          } catch (error) {}

          htmlEventExtras(eventExtras);
        }
      } else {
        tab.visible = false;
        document.getElementById(tab.key).style.display = 'none';      
      }
    }
  }

  setNavigation();
});

/* Btn Prev */
prevBtn.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (tabView === 'TE') {
    const a = document.getElementById('containerListEventCorp');
    const b = document.getElementById('divListEventCorp');

    try {
      a.removeChild(b);
    } catch (error) {}

    const c = document.getElementById('containerListEventSoc');
    const d = document.getElementById('divListEventSoc');

    try {
      c.removeChild(d);
    } catch (error) {}

    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("prevBtn").style.display = "none";
    tabView = 'TE';
    document.querySelector(`#step0`).classList.add('step-active');
    corp.checked = '';
    soc.checked = '';

    return;
  }

  const tabActive = tabs.filter(m => m.visible === true)[0];

  if (tabView === 'RE') {
    document.querySelector('#steps').style.display = 'block';
  }

  if (tabActive.id < tabs.length - 1) {
    document.querySelector(`#step${tabActive.id}`).classList.remove('step-success');
    document.querySelector(`#step${tabActive.id}`).classList.remove('step-error');
    document.querySelector(`#step${tabActive.id}`).classList.remove('step-active');
  }

  if (tabActive.id === 0) return;

  if (tabActive) {
    for (const tab of tabs) {
      if (tab.id === tabActive.id - 1) {
        tab.visible = true;
        document.querySelector(`#step${tab.id}`).classList.remove('step-success');
        document.querySelector(`#step${tab.id}`).classList.add('step-active');
        document.getElementById(tab.key).style.display = 'block';
        tabView = tab.type;

        if (tab.type === 'EX') {
          const a = document.getElementById('containerExtras');
          const b = document.getElementById('divEventExtras');

          try {
            a.removeChild(b);
          } catch (error) {}
          htmlEventExtras(eventExtras);
        }
      } else {
        tab.visible = false;
        document.getElementById(tab.key).style.display = 'none';      
      }
    }
  }

  setNavigation();
});

/* Lists EventsCorp */
const containerListEventCorp = document.querySelector('#containerListEventCorp');

function htmlLEC(arrayLEC) {
  let fragment = document.createDocumentFragment();
  let divElement = document.createElement('div');
  divElement.classList.add('d-grid');
  divElement.classList.add('gap-2');
  divElement.classList.add('col-8');
  divElement.classList.add('col-md-7');
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
  divElement.classList.add('col-8');
  divElement.classList.add('col-md-7');
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

/* Lists CountAsistant */
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
  let divElement = document.createElement('ul');
  divElement.classList.add('switches');
  divElement.id = 'divEventExtras';
  arrayEventExtras.forEach(function(opt) {
    divElement.innerHTML += 
    `
      <li>
        <input type="checkbox" class="chk" name="${opt.name}" id="${opt.id}" onchange="setExtras('${opt.id}',event)" ${opt.state}>
        <label class="lbl" for="${opt.id}">
          <span>${opt.text}</span>
          <span></span>
        </label>
      </li>
    `;
    fragment.append(divElement);
  });

  containerExtras.append(fragment);
}

let eventExtras = listExtras;


const containerResumen = document.querySelector('#containerResumen');

function htmlResumen() {
  const firstName = document.querySelector('#firstNameEstimate').value;
  const lastName = document.querySelector('#lastNameEstimate').value;
  const phone = document.querySelector('#phoneEstimate').value;
  const email = document.querySelector('#emailEstimate').value;
  const eventDate = document.querySelector('#eventDateEstimate').value;
  
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

  if (eventAsistant) {
    resumen.push({
      type: 'Asistentes',
      value: eventAsistant.text
    });
  }

  for (const optExtras of eventExtras) {
    if (optExtras.state === 'checked') {
      resumen.push({
        type: optExtras.text,
        value: 'SI'
      });
    }
  }

  const a = document.getElementById('containerResumen');
  const b = document.getElementById('divResumen');

  try {
    a.removeChild(b);
  } catch (error) {}

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

function htmlTypeEventSelect() {
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

  setNavigation();
}

function setNavigation() {
  document.getElementById("nextBtn").style.display = "inline";
  document.getElementById("prevBtn").style.display = "inline";
  document.getElementById("nextBtn").innerHTML = "Siguiente";
  document.getElementById("prevBtn").innerHTML = "Anterior";

  switch (tabView) {
    case 'TE':      
      document.getElementById("prevBtn").style.display = "inline";
      document.getElementById("prevBtn").innerHTML = "Cancelar";
      break;
    case 'RE':
      document.getElementById("nextBtn").innerHTML = "Solicitar";
      document.getElementById("prevBtn").innerHTML = "Volver";
      htmlResumen();
      break;
    case 'CO':
      document.getElementById("nextBtn").innerHTML = "Finalizar";
      break;
    default:
      break;
  }
}

function setExtras(optID, evt) {
  const temp = eventExtras.filter(m => m.id === optID)[0];
  
  if (evt.target.checked) {
    temp.state = 'checked';
  } else {
    temp.state = '';
  }
}

function validateForm() {
  const fields = [
    {
      field: "firstNameEstimate",
      text: "Nombre"
    },
    {
      field: "lastNameEstimate",
      text: "Apellido"
    },
    {
      field: "phoneEstimate",
      text: "Teléfono"
    },
    {
      field: "emailEstimate",
      text: "email",
      validate: 'E'
    },
    {
      field: "eventDateEstimate",
      text: "Fecha del evento",
      validate: 'D'
    },
  ];

  let i, l = fields.length;
  let result = false;

  for (i = 0; i < l; i++) {
    if (document.forms.estimateForm[fields[i].field].value === "") {
      document.forms.estimateForm[fields[i].field].className += " is-invalid";
      document.getElementById(`${fields[i].field}FeedBack`).innerHTML = `Debe ingresar un valor para ${fields[i].text}`;
      result = true;
    } else {
      document.getElementById(fields[i].field).classList.remove('is-invalid');
    }
  }
  
  if (document.forms.estimateForm[fields.filter(m => m.validate === 'E')[0].field].value !== '') {
    if (validateEmail(document.forms.estimateForm[fields.filter(m => m.validate === 'E')[0].field].value)) {
      document.getElementById(fields.filter(m => m.validate === 'E')[0].field).classList.add('is-invalid');
      document.getElementById(`${fields.filter(m => m.validate === 'E')[0].field}FeedBack`).innerHTML = `El ${fields.filter(m => m.validate === 'E')[0].text} no es válido`;
      result = true;
    } else {
      document.getElementById(`${fields.filter(m => m.validate === 'E')[0].field}FeedBack`).classList.add('is-valid');
    }
  }

  if (document.forms.estimateForm[fields.filter(m => m.validate === 'D')[0].field].value !== '') {
    const eventDate = new Date(document.getElementById('eventDateEstimate').value);
    const toDate = new Date();
  
    if (eventDate <= toDate) {
      document.getElementById(fields.filter(m => m.validate === 'D')[0].field).classList.add('is-invalid');
      document.getElementById(`${fields.filter(m => m.validate === 'D')[0].field}FeedBack`).innerHTML = `La ${fields.filter(m => m.validate === 'D')[0].text} no puede ser menor a la actual`;
      result = true;
    } else {
      document.getElementById(`${fields.filter(m => m.validate === 'D')[0].field}FeedBack`).classList.add('is-valid'); 
    }

  }

  return result;
}

function validateEmail(input) {
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.match(validRegex)) {
    return false;
  } else {
    return true;
  }
}

document.addEventListener("DOMContentLoaded", function(event) {
  if (estimates) {
    corp.addEventListener('click', function(evt) {
      typeEvent = 'C';
      htmlTypeEventSelect();
    });

    soc.addEventListener('click', function(evt) {
      typeEvent = 'S';
      htmlTypeEventSelect();
    });

    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("prevBtn").style.display = "none";
    tabView = 'TE';
    document.querySelector(`#step0`).classList.add('step-active');
  }
});


function createPdf() {
  let element = 
  `
  <div>
      <h3 style="text-align: center;">PRESUPUESTO</h1>
      <p>Gracias por utilizar nuestros servicios. Nuestros asesores se comunicaran para finalizar esta solicitud</p>
      <table>
        <thead>
        <tr>
            <th style="width: 250px;">Contacto</th>
            <th style="width: 250px;">Email</th>
            <th style="width: 100px;">Teléfono</th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td scope="row" >${resumen[0].value}</td>
            <td>${resumen[1].value}</td>
            <td>${resumen[2].value}</td>
            </tr>
        </tbody>
      </table>
      <table>
        <tr>
          <th style="width:100px">Tipo</th>
          <th style="width:300px">Evento</th>
          <th style="width:100px">Fecha</th>
          <th style="width:100px">Asistentes</th>
        </tr>
        <tr>
          <td style="text-align:center" >${resumen[4].value}</td>
          <td style="text-align:center" >${resumen[5].value}</td>
          <td style="text-align:center" >${resumen[3].value}</td>
          <td style="text-align:center" >${resumen[6].value}</td>
        </tr>
      </table>
      <table>
        <thead>
          <tr>
            <th style="width: 250px;">Adicionales</th>
          </tr>
        </thead>
        <tbody>`;

  for (let i = 7; i < resumen.length; i++) {
    element += `<tr>
            <td scope="row" >${resumen[i].type}</td>
          </tr>`;
  }
          
  element += `</tbody>
      </table>

      <div style="display: flex; align-items: center;">
      <h2 style="text-align: center;"> Estas en EVENTO</h2>
      <span style="text-align: center; padding-top: 6px; padding-left: 5px">donde tú evento es nuestra pasión...</span>
      </div>
      
    </div>
  `;

  var val = htmlToPdfmake(element);
  var dd = { content: val };
  pdfMake.createPdf(dd).download();
}
