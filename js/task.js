import images from './gallery-items.js';

const refs = {
    ul: document.querySelector('.js-gallery'),
    lightBox: document.querySelector('.js-lightbox'),
    lightBoxOverlay: document.querySelector('.lightbox__overlay'),
    lightBoxImage: document.querySelector('.lightbox__image'),
    lightBoxCloseBtn: document.querySelector('[data-action="close-lightbox"]'),  
};

function createItem(item) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const img = document.createElement('img');

    li.classList.add('gallery__item');
    
    a.classList.add('gallery__link');
    a.href = item.original;

    img.classList.add('gallery__image');
    img.src = item.preview;
    img.dataset.source = item.original;
    img.alt = item.description;
    img.dataset.index = images.indexOf(item);


    a.append(img);
    li.append(a);

    return li;
}

const itemArr = images.map(image => createItem(image));

refs.ul.append(...itemArr);

const galleryImagesRefs = document.querySelectorAll('.gallery__image');
const galleryImagesArr = Array.from(galleryImagesRefs);

refs.ul.addEventListener('click', ulClick);
refs.lightBoxCloseBtn.addEventListener('click', lightboxClose);
refs.lightBoxOverlay.addEventListener('click', lightboxOverlayClick);

function ulClick(event) {
    event.preventDefault();

    if(event.target.nodeName !== 'IMG') {
        return;
    }

    openModal(event.target);   
}

function lightboxClose() {
    closeModal();
}

function lightboxOverlayClick(event) {
    if (event.target === event.currentTarget) {
        closeModal();
    }
}

function keyboardPress(event) {
    let currentIndex = findActiveIndex();

    switch (event.code) {
        case 'ArrowRight':
        currentIndex += 1;
        break;

        case 'ArrowLeft':
        currentIndex -= 1;
        break;

        case 'Escape':
        closeModal();
        break;

        default:
    }

    changeImg(currentIndex);
}

function openModal(image) {
    window.addEventListener('keydown', keyboardPress);

    refs.lightBox.classList.add('is-open');
    
    refs.lightBoxImage.src = image.dataset.source;
    refs.lightBoxImage.alt = image.alt;
}

function closeModal() {
    window.removeEventListener('keydown', keyboardPress);

    refs.lightBox.classList.remove('is-open');

    refs.lightBoxImage.src = '';
    refs.lightBoxImage.alt = '';
}

function findActiveIndex() {
    const activeSource = refs.lightBoxImage.src;
    const activeImage = galleryImagesArr.find(
        image => image.dataset.source === activeSource,
    );
    const findIndex = activeImage.dataset.index;

    return Number(findIndex);
}

function changeImg(index) {
    if (index >= 0 && index <= galleryImagesArr.length - 1) {
        const nextImg = document.querySelector(`[data-index="${index}"]`);

        refs.lightBoxImage.src = nextImg.dataset.source;
        refs.lightBoxImage.alt = nextImg.alt;
    }
}



