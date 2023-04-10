function html(section, dataList, typeElement) {
  const container = document.querySelector(`#container${section}`);
  let fragment = document.createDocumentFragment();
  let element = document.createElement(typeElement);

  switch (section) {
    case 'Staffs':
      element.classList.add('row');
      dataList.forEach(function(data){
        element.innerHTML +=  
        `         
          <div class="col-lg-4 col-md-6">
            <div class="staff" data-aos="fade-up" data-aos-delay="100" >
              <img src="${data.path}" alt="staff 1" class="img-fluid">
              <div class="details">
                <h3>
                  <a href="staff-details.html">${data.name}</a>
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
        dataList.forEach(function(data){
          element.innerHTML += 
          `
            <div class="thumbex" data-aos="fade-up">
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

if (!estimates) {
  html('Staffs', staffsList, 'div');
  html('Services', servicesList, 'div');
  html('Hotels', hotelsList, 'div');
  html('FAQs', faqLists, 'ul');
}

function viewMsgContact() {
  Swal.fire({
      title: 'Enviando mensaje...',
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

const sendMessage = document.querySelector('#sendMessage');

sendMessage.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (document.querySelector('#nameMessage').value !== '' &&
      document.querySelector('#emailMessage').value !== '' &&
      document.querySelector('#subjectMessage').value !== '' &&
      document.querySelector('#messageMessage').value !== '') {
    viewMsgContact();
  }
});

const subscribeNews = document.querySelector('#subscribeNews');

subscribeNews.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (document.querySelector('#emailNewsletter').value !== '') {
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
  }
});

