const previews = {'drinks': [], 'desserts': [], 'sets': []}

let selectedItem = {};

const menuGrid = document.querySelector('#menuGrid')

fetch('./js/menu.json')
.then(response => response.json())
.then(data => {
  data.forEach(element => {
    if (element.category == 'drinks') {
      previews['drinks'].push(element)
    }
    if (element.category == 'desserts') {
      previews['desserts'].push(element)
    }
    if (element.category == 'sets') {
      previews['sets'].push(element)
    }
  });
  resetElements();
})

function showElements() {
  previews[activeMenuPage].forEach(elem => {
    let item = document.createElement('div');
    item.className = 'flex-col gap-20 menu-item drop-shadow';
    item.innerHTML = `
        <div class="image-wrapper">
          <img src="assets/images/${elem.img}" alt="${elem.name}">
        </div>
        <div class="flex-col gap-10">
          <h3 class="font-title-2 accent-text">${elem.name}</h3>
          <p class="font-body">${elem.description}</p>
          <span class="font-title-2">$ ${elem.price.s}</span>
        </div>
    `;

    item.addEventListener('click', () => {
      showModalWindow(elem.id);
    })
    
    menuGrid.appendChild(item);
  })
}

const modalWindow = document.querySelector('#modalWindow')

function closeModalWindow() {
  document.querySelector('#modalWindow').classList.remove('active');
  document.querySelector('#backdrop').classList.remove('active');
  document.querySelector('#body').style.overflow = 'visible';

  console.log('closeModal')
}

document.querySelector('#backdrop').addEventListener('click', () => {
  // closeModalWindow();
})

function showModalWindow(id) {
  document.querySelector('#modalWindow').classList.add('active');
  document.querySelector('#backdrop').classList.add('active');
  document.querySelector('#body').style.overflow = 'hidden';

  console.log('showModal')

  previews[activeMenuPage].forEach(elem => {

    if (elem.id == id) {
      selectedItem = elem;
      console.log(selectedItem)

      modalWindow.innerHTML = `
        <div class="image-wrapper">
          <img src="assets/images/${elem.img}" alt="${elem.name}">
        </div>
        <div class="flex-col gap-10 modal-window__info">
          <div class="flex-row gap-20 modal-window__title">
            <div class="flex-col gap-10">
              <h2 class="font-title-2">${elem.name}</h2>
              <p class="font-body">${elem.description}</p>
            </div>
            <button class="icon-button font-title-2" onclick="closeModalWindow()">x</button>
          </div>
          <div class="modal-separator"></div>
          <div class="flex-col gap-10 modal-window__buttons">
            <span class="font-caption modal-window__caption">Size</span>
            <div class="flex-row gap-20">
              <button class="modal-button active" id="s">s</button>
              <button class="modal-button" id="m">m</button>
              <button class="modal-button" id="l">l</button>
            </div>
          </div>
          <div class="modal-separator"></div>
          <div class="flex-row modal-window__total">
            <span class="font-title-2">Total:</span>
            <span class="font-title-2" id="totalPrice">$ ${elem.price.s}</span>
          </div>
        </div>
    `
    }

  });
}

function resetElements(){
  menuGrid.innerHTML = '';
  showElements();
}

let activeMenuPage = 'drinks';

let drinksPin = document.querySelector('#drinksPin');
let dessertsPin = document.querySelector('#dessertsPin');
let setsPin = document.querySelector('#setsPin');

const menuTitle = document.querySelector('#menuTitle')

drinksPin.addEventListener('click', () => {
  if (activeMenuPage !== 'drinks') {
    drinksPin.classList.add('active');
    dessertsPin.classList.remove('active');
    setsPin.classList.remove('active');
    activeMenuPage = 'drinks';

    menuTitle.textContent = 'Drinks';
    resetElements();
  }
})
dessertsPin.addEventListener('click', () => {
  if (activeMenuPage !== 'desserts') {
    dessertsPin.classList.add('active');
    drinksPin.classList.remove('active');
    setsPin.classList.remove('active');
    activeMenuPage = 'desserts';

    menuTitle.textContent = 'Desserts';
    resetElements();
  }
})
setsPin.addEventListener('click', () => {
  if (activeMenuPage !== 'sets') {
    setsPin.classList.add('active')
    drinksPin.classList.remove('active');
    dessertsPin.classList.remove('active');
    activeMenuPage = 'sets';

    menuTitle.textContent = 'Sets';
    resetElements();
  }
})

const modalButtons = document.querySelectorAll('.model-button');
modalButtons.forEach(elem => {
  elem.addEventListener('click', (target) => {
    changePrice(target.id)
    console.log(target)
  })
})

function changePrice(size) {
  document.querySelector('#totalPrice').textContent = selectedItem.price[size];
}