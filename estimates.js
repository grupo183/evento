const tabs = [
  {
    id: 0,
    key: 'tab0',
    visible: true
  },
  {
    id: 1,
    key: 'tab1',
    visible: false
  },
  {
    id: 2,
    key: 'tab2',
    visible: false
  },
  {
    id: 3,
    key: 'tab3',
    visible: false
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

document.addEventListener("DOMContentLoaded", function(event) {
  if (estimates) {
    showTab(currentTab);
  }
});
