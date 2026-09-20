function changeTheme() {
  let activeTheme = localStorage.getItem('theme');
  const themeButton = document.querySelector('#themeButton');
  if (activeTheme) {
    if (activeTheme === 'dark') {
      localStorage.setItem('theme', 'light');
      setFirstTheme();
    } else {
      localStorage.setItem('theme', 'dark'); 
      setFirstTheme();
    }
  }
  console.log(localStorage.getItem('theme'))
}

function setFirstTheme() {
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

setFirstTheme();