/* Lists Gallery*/

const containerGallerys = document.querySelector('#containerGallerys');

function htmlGallerys(arrayGallerys){
  let fragment = document.createDocumentFragment();
  let divGallery = document.createElement('div');
  divGallery.classList.add('swiper-wrapper');
  divGallery.classList.add('align-items-center');
  arrayGallerys.forEach(function(gallery){
    divGallery.innerHTML += 
    `
      <div class="swiper-slide">
        <a href="${gallery.path}" class="gallery-lightbox">
          <img src="${gallery.path}" class="img-fluid" alt="">
        </a>
      </div>
    `;

    fragment.append(divGallery);
  });
  
  containerGallerys.append(fragment);
}

let gallerys = gallerysList;
htmlGallerys(gallerys);

