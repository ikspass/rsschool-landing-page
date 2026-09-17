let activeMenuPage = 'drinks';

let drinksPin = document.querySelector('#drinksPin');
let dessertsPin = document.querySelector('#dessertsPin');
let setsPin = document.querySelector('#setsPin');

drinksPin.addEventListener('click', () => {
  if (activeMenuPage !== 'drinks') {
    drinksPin.classList.add('active');
    dessertsPin.classList.remove('active');
    setsPin.classList.remove('active');
    activeMenuPage = 'drinks';
  }
})
dessertsPin.addEventListener('click', () => {
  if (activeMenuPage !== 'desserts') {
    dessertsPin.classList.add('active');
    drinksPin.classList.remove('active');
    setsPin.classList.remove('active');
    activeMenuPage = 'desserts';
  }
})
setsPin.addEventListener('click', () => {
  if (activeMenuPage !== 'sets') {
    setsPin.classList.add('active')
    drinksPin.classList.remove('active');
    dessertsPin.classList.remove('active');
    activeMenuPage = 'sets';
  }
})

