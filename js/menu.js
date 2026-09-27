const previews = {'drinks': [], 'desserts': [], 'sets': []}

let selectedItem = {};
let currentPrice = 0;
let sizes = null;
let additives = null;

const menuGrid = document.querySelector('#menuGrid')

const urlParams = new URLSearchParams(window.location.search);
let activeMenuPage = urlParams.get('category') || 'drinks';
document.querySelector('#menuTitle').textContent = activeMenuPage;
document.querySelector(`#${activeMenuPage}Pin`).classList.add('active');


fetch('./js/products.json')
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

const refreshButton = document.querySelector('#refreshButton');

refreshButton.addEventListener('click', () => {
  showOtherElements();
  refreshButton.style.display = 'none'
})

function showFisrtThreeElements() {
  for (let i = 0; i < 3; i += 1) {
    showElement(previews[activeMenuPage][i]);
  }
}

function showOtherElements() {
  for (let i = 3; i < previews[activeMenuPage].length; i += 1) {
    showElement(previews[activeMenuPage][i]);
  }
}

function showElement(elem) {
  let item = document.createElement('div');

  item.className = 'flex-col gap-20 menu-item drop-shadow';
  item.innerHTML = `
      <div class="image-wrapper">
        <img src="assets/images/${elem.img}" alt="${elem.name}">
      </div>
      <div class="flex-col gap-10" style="height: 100%">
        <h3 class="font-title-2 accent-text">${elem.name}</h3>
        <div class="flex-col gap-10" style="justify-content: space-between; height: 100%">
          <p class="font-body">${elem.description}</p>
          <span style="align-self: flex-end" class="font-title-2">$ ${elem.price}</span>
        </div>
      </div>
  `;

  item.addEventListener('click', () => {
    showModalWindow(elem.id);
  })
  
  menuGrid.appendChild(item);
}

const modalWindow = document.querySelector('#modalWindow')

function closeModalWindow() {
  document.querySelector('#modalWindow').classList.remove('active');
  document.querySelector('#backdrop').classList.remove('active');
  document.querySelector('#body').style.overflow = 'visible';
}

function showModalWindow(id) {
  document.querySelector('#modalWindow').classList.add('active');
  document.querySelector('#backdrop').classList.add('active');
  document.querySelector('#body').style.overflow = 'hidden';

  selectedItem = previews[activeMenuPage].find(item => item.id == id)

  if (selectedItem.category !== 'sets') {
    additives = selectedItem.additives;
    sizes = selectedItem.sizes;
  }

  modalWindow.innerHTML = `
        <div class="image-wrapper">
          <img src="assets/images/${selectedItem.img}" alt="${selectedItem.name}">
        </div>
        <div class="flex-col gap-20 modal-window__info">
          <div class="flex-row gap-20 modal-window__title">
            <div class="flex-col gap-10">
              <h3 class="font-title-2 accent-text">${selectedItem.name}</h3>
              <p class="font-body">${selectedItem.description}</p>
            </div>
            <button class="icon-button font-title-2" onclick="closeModalWindow()">x</button>
          </div>
          ${selectedItem.category !== 'sets' ?
            `<div class="modal-separator"></div>` : ''}
          <div class="flex-col gap-10 modal-window__buttons">
          ${selectedItem.category !== 'sets' ?
            `<span class="font-caption modal-window__caption">Size</span>
              <div class="flex-row gap-20">
                <button class="modal-button modal-size active" id="s">S - ${sizes.s.size}</button>
                <button class="modal-button modal-size" id="m">M - ${sizes.m.size}</button>
                <button class="modal-button modal-size" id="l">L - ${sizes.l.size}</button>
              </div>
              <span class="font-caption modal-window__caption">Additives</span>
              <div class="flex-row gap-20">
                ${additives.map(item => `<button class="modal-button modal-additive" id="${item.name.toLowerCase()}">${item.name}</button>`).join('')}
              </div>
            ` : ''}
          </div>
          <div class="modal-separator"></div>
          <div class="flex-row modal-window__total">
            <span class="font-title-2">Total:</span>
            <span class="font-title-2" id="totalPrice">$ ${selectedItem.price}</span>
          </div>
        </div>
    `

  const sizeButtons = document.querySelectorAll('.modal-size');
  sizeButtons.forEach(elem => {
    elem.addEventListener('click', () => {
      sizeButtons.forEach(button => {
        button.classList.remove('active');
      })
      elem.classList.add('active');
      changePrice();
    })
  })

  const additiveButtons = document.querySelectorAll('.modal-additive');
  additiveButtons.forEach(elem => {
    elem.addEventListener('click', () => {
      elem.classList.toggle('active');
      changePrice();
    })
  })
}

function resetElements(){
  menuGrid.innerHTML = '';
  showFisrtThreeElements();
  if (previews[activeMenuPage].length <= 3) {
    refreshButton.style.display = 'none';
  }
  else {
    refreshButton.style.display = 'flex';
  }
}

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

function changePrice() {
  const sizeButton = document.querySelector('.modal-size.active');
  const additiveButtons = [...document.querySelectorAll('.modal-additive')];
  const activeButtons = additiveButtons.filter(item => item.classList.contains('active'));
  
  currentPrice = (+selectedItem.price + (+selectedItem.sizes[sizeButton.id]['add-price']));

  activeButtons
    .forEach(item => currentPrice += +selectedItem.additives
    .find(additive => additive.name.toLowerCase() == item.id)['add-price'])

  document.querySelector('#totalPrice').textContent = `$ ${currentPrice.toFixed(2)}`;
}