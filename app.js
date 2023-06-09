let moneys;

/* Call API Rest */
function getMoney() {
  const options = {method: 'GET', headers: {accept: 'application/json'}};
  fetch('https://api.bluelytics.com.ar/v2/latest', options)
  .then(response => response.json())
  .then(response => {moneys = response;})
  .catch(err => console.error(err));
}

getMoney();

function html(section, dataList, typeElement) {
  const container = document.querySelector(`#container${section}`);
  let fragment = document.createDocumentFragment();
  let element = document.createElement(typeElement);
  let index = 0;
  
  switch (section) {
    case 'Staffs':
      element.classList.add('row');
      index = 0;
      dataList.forEach(function(data){
        index++;
        element.innerHTML +=  
        `         
          <div class="col-lg-4 col-md-6">
            <div class="staff" data-aos="fade-up" data-aos-delay="${index*50*3}">
              <img src="${data.path}" alt="staff 1" class="img-fluid">
              <div class="details">
                <h3>
                  <a href="javascript:void(0)">${data.name}</a>
                </h3>
                <p>${data.rol}</p>
                <div class="social">
                  <a href="javascript:void(0)">
                    <i class="bi bi-twitter"></i>
                  </a>
                  <a href="javascript:void(0)">
                    <i class="bi bi-facebook"></i>
                  </a>
                  <a href="javascript:void(0)">
                    <i class="bi bi-instagram"></i>
                  </a>
                  <a href="javascript:void(0)">
                    <i class="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        `; 

        fragment.append(element); 
      });
      break;
    case 'Services':
      element.classList.add('servicesList');
      index = 0;
      dataList.forEach(function(data){
        index++;
        element.innerHTML += 
        `
          <div class="thumbex" data-aos="fade-up" data-aos-delay="${index*50*3}">
            <div class="thumbnail">
              <a href="javascript:void(0)">
                <img src="${data.path}">
                <span>${data.name}</span>
              </a>
            </div>
          </div>
        `;

        fragment.append(element);              
      });
      break;
    case 'Hotels': 
      element.classList.add('row');
      element.setAttribute('data-aos', 'fade-up');
      element.setAttribute('data-aos-delay', '100');
      dataList.forEach(function(data){
        element.innerHTML += 
        `
          <div class="col-lg-4 col-md-6">
            <div class="hotel">
              <div class="hotel-img">
                <img src="${data.path}" alt="Hotel Sheraton" class="img-fluid">
              </div>
              <h3><a href="javascript:void(0)">${data.name}</a></h3>
              <div class="stars">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
              </div>
              <p>${data.distance}</p>
            </div>
          </div>
        `;
        fragment.append(element);
        
      });

      break;
    case 'FAQs':
      element.classList.add('faq-list');
      dataList.forEach(function(data){
        element.innerHTML += 
        `
          <li>
            <div data-bs-toggle="collapse" class="collapsed question" href="#${data.ref}">
              ${data.question}
              <i class="bi bi-chevron-down icon-show"></i>
              <i class="bi bi-chevron-up icon-close"></i>
            </div>
            <div id="${data.ref}" class="collapse" data-bs-parent=".faq-list">
              <p>${data.answer}</p>
            </div>
          </li>
        `;
        fragment.append(element);
        
      });
      break;
  }

  container.append(fragment);            
}

function viewMsgContact() {
  Swal.fire({
      title: 'Contacto',
      text: `
        Hola ${document.querySelector('#nameMessage').value}, hemos recibido tu mensaje referido a: ${document.querySelector('#subjectMessage').value}. Te estaremos respondiendo a la brevedad posible en tu correo electronico ${document.querySelector('#emailMessage').value}
        `,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      document.querySelector('#nameMessage').value = '';
      document.querySelector('#emailMessage').value = '';
      document.querySelector('#subjectMessage').value = '';
      document.querySelector('#messageMessage').value = '';
    });
}

function validateEmail(input) {
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.match(validRegex)) {
    return false;
  } else {
    return true;
  }
}


const subscribeNews = document.querySelector('#subscribeNews');
const sendMessage = document.querySelector('#sendMessage');
const dateMoney = document.querySelector('#dateMoney');
const music = document.querySelector('#music');
  
const audio = document.createElement("audio");
audio.preload = "auto";
audio.volume = 0.8;
audio.src = "./assets/mp3/hf.mp3";
document.body.appendChild(audio);

document.addEventListener("DOMContentLoaded", function(event) {
  
  if (!estimates) {
    html('Staffs', staffsList, 'div');
    html('Services', servicesList, 'div');
    html('Hotels', hotelsList, 'div');
    html('FAQs', faqLists, 'ul');
  }

  dateMoney.addEventListener('click', (evt) => {
    evt.preventDefault();
    getMoney();
  });

  subscribeNews.addEventListener('click', (evt) => {
    evt.preventDefault();

    if (document.querySelector('#emailNewsletter').value !== '') {
      if (!validateEmail(document.querySelector('#emailNewsletter').value)) {
        Swal.fire({
            title: 'Newsletter',
            text: `
              Gracias por subscribirte a nuestro newsletter en breve te estaran llegando nuesras novedades a ${document.querySelector('#emailNewsletter').value}
              `,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            document.querySelector('#emailNewsletter').value = '';
          });
      } else {
        Swal.fire({
          title: 'Newsletter',
          text: 'Formato de email incorrecto',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }
  });
  
  sendMessage.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (document.querySelector('#nameMessage').value !== '' &&
        document.querySelector('#emailMessage').value !== '' &&
        document.querySelector('#subjectMessage').value !== '' &&
        document.querySelector('#messageMessage').value !== '') {
      if (!validateEmail(document.querySelector('#emailMessage').value)) {
        viewMsgContact();
      } else {
        Swal.fire({
          title: 'Contacto',
          text: 'Formato de email incorrecto',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }
  });

  setTimeout(() => {
    document.querySelector('#dateMoney').innerHTML = `<i class="bi bi-arrow-clockwise"></i> ${new Date(moneys.last_update).toLocaleDateString('es-es', { weekday:"short", year:"numeric", month:"short", day:"numeric", hour:"2-digit", minute: "2-digit"}).toLocaleUpperCase()}`;
    document.querySelector('#dco').innerHTML = `$ ${moneys.oficial.value_buy}`;
    document.querySelector('#dvo').innerHTML = `$ ${moneys.oficial.value_sell}`;
    document.querySelector('#dcb').innerHTML = `$ ${moneys.blue.value_buy}`;
    document.querySelector('#dvb').innerHTML = `$ ${moneys.blue.value_sell}`;
    document.querySelector('#eco').innerHTML = `$ ${moneys.oficial_euro.value_buy}`;
    document.querySelector('#evo').innerHTML = `$ ${moneys.oficial_euro.value_sell}`;
    document.querySelector('#ecb').innerHTML = `$ ${moneys.blue_euro.value_buy}`;
    document.querySelector('#evb').innerHTML = `$ ${moneys.blue_euro.value_sell}`;
  }, 2000);
  
  setTimeout(() => {
    document.querySelector('.ring').style.display = 'none';    
  }, 1000);

  music.addEventListener('click', (evt) => {
    evt.preventDefault();
    
    if (musicPlay === true) {
      musicPlay = !musicPlay;
      document.getElementById('music').src = './assets/img/stop.png';
      audio.pause();
    } else {
      musicPlay = !musicPlay;
      document.getElementById('music').src = './assets/img/play.png';
      audio.play();
    }
  });

});

