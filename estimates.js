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
    type: 'EX'
  },
  {
    id: 2,
    key: 'tab2',
    visible: false,
    type: 'CO'
  },
  {
    id: 3,
    key: 'tab3',
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

  if (tabActive.id === tabs.length - 1) return;

  if (tabActive) {
    for (const tab of tabs) {
      if (tab.id === tabActive.id + 1) {
        tab.visible = true;
        document.getElementById(tab.key).style.display = 'block';

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
});

/* Btn Prev */
prevBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  const tabActive = tabs.filter(m => m.visible === true)[0];

  if (tabActive.id === 0) return;

  if (tabActive) {
    for (const tab of tabs) {
      if (tab.id === tabActive.id - 1) {
        tab.visible = true;
        document.getElementById(tab.key).style.display = 'block';
      } else {
        tab.visible = false;
        document.getElementById(tab.key).style.display = 'none';      
      }
    }
  }
});


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

let eventExtras = listExtras;

function htmlTypeEventSelect() {
  document.getElementById("titleCountAsistant").style.display = "none";
  document.getElementById("countAsistant").style.display = "none";
  // document.getElementById("nextprevious").style.display = "none";

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

  if (eventCorporative || eventSocial) {
    document.getElementById("titleCountAsistant").style.display = "block";
    document.getElementById("countAsistant").style.display = "block";
  }
  
  if (eventAsistant) {
    // document.getElementById("nextprevious").style.display = "block";
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

    document.getElementById("titleCountAsistant").style.display = "none";
    document.getElementById("countAsistant").style.display = "none";
    // document.getElementById("nextprevious").style.display = "none";
  }
});
