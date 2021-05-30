import galleryItems from "./gallery-items.js";

const galleryRef = document.querySelector('ul.js-gallery');
const galleryMurkup = createGalleryMurkup(galleryItems)
const galleryItemRef = document.querySelector('.gallery__item')
const modalRef = document.querySelector('.js-lightbox')
const galleryImage = document.querySelector('.lightbox__image')
const closeModalRef = document.querySelector('[data-action="close-lightbox"]')
const overlayRef = document.querySelector('.lightbox__overlay')

galleryRef.insertAdjacentHTML('afterbegin', galleryMurkup);



// Создание и рендер разметки по массиву данных и предоставленному шаблону.

function createGalleryMurkup(galleryItems){
    return galleryItems.map(({ preview , original, description }) => {
        return `<li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>      
          `
    }).join('')
    
}

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.

galleryRef.addEventListener('click', onGalleryClick);

function onGalleryClick(event){
    event.preventDefault();
    if(event.target.classList.contains(galleryItemRef)){
        return;
    }
    OpenModal(event.target);
}

// Открытие модального окна по клику на элементе галереи.

function OpenModal(target){
  modalRef.classList.add('is-open');
  newModalAtributes(target)

  closeModalRef.addEventListener('click', onCloseModal);
  overlayRef.addEventListener('click',  onCloseOverlay);
  document.addEventListener('keydown', closeOnEscape);  

}

// Подмена значения атрибута src элемента img.lightbox__image.

function newModalAtributes(target){
  galleryImage.src = target.dataset.source;
  galleryImage.alt = target.alt 
}
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

function onCloseModal(){
  modalRef.classList.remove('is-open');
  galleryImage.src = '';
  galleryImage.alt = '';
  
  galleryImage.removeEventListener('click',onCloseOverlay)
  closeModalRef.removeEventListener('click', onCloseModal)
  document.removeEventListener('keydown', closeOnEscape)
}
// Закрытие модального окна по клику на div.lightbox__overlay.
function onCloseOverlay(){
  onCloseModal()
}

// Закрытие модального окна по нажатию клавиши ESC.
function closeOnEscape(event){
  const ESC_KEY = 'Escape';
  if(event.key === ESC_KEY){
    onCloseModal()
  }
}
