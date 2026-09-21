function changeTheme() {
  let activeTheme = localStorage.getItem('theme');
  if (activeTheme) {
    if (activeTheme === 'dark') {
      localStorage.setItem('theme', 'light');
      resetTheme();
    } else {
      localStorage.setItem('theme', 'dark'); 
      resetTheme();
    }
  }
}


function resetTheme() {
  let activeTheme = localStorage.getItem('theme');
  if (!activeTheme) {
    localStorage.setItem('theme', 'light');
  } else {
    document.querySelector('#body').className = activeTheme;
    document.querySelector('#themeButtonIcon').src = `assets/images/${activeTheme}-theme.svg`

    if (document.querySelector('#burgerMenu').classList.contains('active')) {
      document.querySelector('#burgerButtonIcon').src = `assets/images/close-burger-${activeTheme}.svg`
    } else {
      document.querySelector('#burgerButtonIcon').src = `assets/images/burger-${activeTheme}.svg`
    }

    if (document.querySelector('#iconCoffeeBean')) {
      document.querySelector('#iconCoffeeBean').src = `assets/images/coffee-bean-${activeTheme}.svg`;
      document.querySelector('#iconBakery').src = `assets/images/bakery-${activeTheme}.svg`;
      document.querySelector('#iconSmile').src = `assets/images/smile-${activeTheme}.svg`;
    }
    if (document.querySelector('#refreshButton')) {
      document.querySelector('#refreshButtonIcon').src = `assets/images/refresh-${activeTheme}.svg`;
    }
  }
}

resetTheme();

if (document.querySelector('#specialOffers')) {

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

  if (window.matchMedia("(max-width: 800px)").matches){
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
  
    let x1 = null;
    let y1 = null;
  
    function handleTouchStart(event){
        const firstTouch = event.touches[0];
  
        x1 = firstTouch.clientX;
        y1 = firstTouch.clientY;
    }
  
    function handleTouchMove(event){
      if(!x1 || !y1) return false;

      let x2 = event.touches[0].clientX;
      let y2 = event.touches[0].clientY;

      let xDiff = x2 - x1;
      let yDiff = y2 - y1;

      if(Math.abs(xDiff)>Math.abs(yDiff)){
        if(xDiff > 0){
          if (currentSlide - 1 < 0) currentSlide = slides.length - 1;
          else currentSlide -= 1;
          resetSlide();
        }
        else {
          if (currentSlide + 1 >= slides.length) currentSlide = 0;
          else currentSlide += 1;
          resetSlide();
        }
      }
      x1 = null;
      y1 = null;
    }
  }
}
  
function openBurger() {
}

document.querySelector('#burgerButton').addEventListener('click', () => {
  let activeTheme = localStorage.getItem('theme');

  if (document.querySelector('#burgerButtonIcon').src.endsWith(`/burger-${activeTheme}.svg`)) {
    document.querySelector('#burgerButtonIcon').src = `assets/images/close-burger-${activeTheme}.svg`
  } else {
    document.querySelector('#burgerButtonIcon').src = `assets/images/burger-${activeTheme}.svg`
  }
  document.querySelector('#burgerMenu').classList.toggle('active');
})

document.querySelectorAll('.burger-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('#burgerMenu').classList.remove('active');
    document.querySelector('#burgerButtonIcon').src = `assets/images/burger-${localStorage.getItem('theme')}.svg`

  })
})

