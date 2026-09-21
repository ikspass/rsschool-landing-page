function changeTheme() {
  let activeTheme = localStorage.getItem('theme');
  const themeButton = document.querySelector('#themeButton');
  if (activeTheme) {
    if (activeTheme === 'dark') {
      localStorage.setItem('theme', 'light');
      resetTheme();
    } else {
      localStorage.setItem('theme', 'dark'); 
      resetTheme();
    }
  }
  console.log(localStorage.getItem('theme'))
}

function resetTheme() {
  let activeTheme = localStorage.getItem('theme');
  if (!activeTheme) {
    localStorage.setItem('theme', 'light');
  } else {
    document.querySelector('#body').className = activeTheme;
    document.querySelector('#themeButtonIcon').src = `assets/images/${activeTheme}-theme.svg`
    document.querySelector('#iconCoffeeBean').src = `assets/images/coffee-bean-${activeTheme}.svg`;
    document.querySelector('#iconBakery').src = `assets/images/bakery-${activeTheme}.svg`;
    document.querySelector('#iconSmile').src = `assets/images/smile-${activeTheme}.svg`;
  }
}

resetTheme();

let slides = [];
let currentSlide = 0;
const sliderIndicators = document.querySelector('#sliderIndicators');

fetch('./js/special-offers.json')
  .then(response => response.json())
  .then(data => {
    slides = data;
    sliderIndicators.innerHTML = `<div class="carousel__indicator"></div>`.repeat(slides.length)

    document.querySelectorAll('.carousel__indicator')[0].classList.add('active');
  })

const leftButton = document.querySelector('#leftButton');
const rightButton = document.querySelector('#rightButton');
const slideImg = document.querySelector('#slideImg');
const slideTitle = document.querySelector('#slideTitle');
const slideDescription = document.querySelector('#slideDescription');

leftButton.addEventListener('click', () => {
  if (currentSlide - 1 < 0) currentSlide = slides.length - 1;
  else currentSlide -= 1;
  resetSlide();
})

rightButton.addEventListener('click', () => {
  if (currentSlide + 1 >= slides.length) currentSlide = 0;
  else currentSlide += 1;
  resetSlide();
})

function resetSlide() {
  slideImg.src = `assets/images/${slides[currentSlide].img}`;
  slideTitle.textContent = slides[currentSlide].name;
  slideDescription.textContent = slides[currentSlide].description;
  resetIndicator();
}

function resetIndicator() {
  document.querySelectorAll('.carousel__indicator').forEach(elem => {
    elem.classList.remove('active')
  })
  document.querySelectorAll('.carousel__indicator')[currentSlide].classList.add('active');
}