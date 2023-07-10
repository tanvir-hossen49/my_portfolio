// Global variables
let activeNav = ["0px", "51px"]; //[offsetLeft,offsetWidth ]
const darkLightToggleIcon = document.getElementById("icon");
const animatedSkills = document.querySelector(".about__skills");
const animatedElements = document.querySelectorAll(".animate");
const navItemsWrapper = document.querySelector(".nav__items");
const navItems = document.querySelectorAll(".nav__item");
const hamburger = document.querySelector(".hamburger");

window.onload = () => {
  loadSkillsData();
};

//----------------FETCH DATA-----------------
const loadSkillsData = async () => {
  const response = await fetch("/public/skill.json");
  const skills = await response.json();

  //categoryOfSkills = {language: [skill], tool:[skill], framework: [skill]}
  const categoryOfSkills = skills.reduce((accumulator, current) => {
    let key = current.category;
    if (!accumulator[key]) {
      accumulator[key] = [];
    }

    accumulator[key].push(current.name);
    return accumulator;
  }, {});
  handleSkillsData(categoryOfSkills);
};

//----------------OBSERVER-----------------
const observer = (cb, sectionClass) => {
  return new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cb(sectionClass);
      }
    });
  });
};

//---------------EVENT HANDLER---------------
const onClickToggleTheme = event => {
  const body = document.body.classList;
  body.toggle("night");
  if (body.contains("night")) {
    event.target.src = "./assets/images/sun.png";
  } else {
    event.target.src = "./assets/images/moon.png";
  }
};

const onClickToggleNavbar = () => {
  hamburger.classList.toggle("active");
  navItemsWrapper.classList.toggle("active");
};

const onClickAddNavIndicator = event => {
  const marker = document.querySelector(".nav__marker");
  const navLinks = document.querySelectorAll(".nav__link");
  const navLink = event.target;

  const offsetLeft = navLink.offsetLeft + "px";
  const offsetWidth = navLink.offsetWidth + "px";

  marker.style.left = offsetLeft;
  marker.style.width = offsetWidth;

  activeNav = [offsetLeft, offsetWidth];

  navLinks.forEach(link => {
    link.classList.contains("active") && link.classList.remove("active");
  });

  navLink.classList.add("active");
};

const onMouseEnterShowNavIndicator = event => {
  const marker = document.querySelector(".nav__marker");
  const navLink = event.target;

  const offsetLeft = navLink.offsetLeft + "px";
  const offsetWidth = navLink.offsetWidth + "px";

  marker.style.left = offsetLeft;
  marker.style.width = offsetWidth;
};

const onMouseOutResetNavIndicator = () => {
  const marker = document.querySelector(".nav__marker");
  marker.style.left = activeNav[0];
  marker.style.width = activeNav[1];
};

const countingSkills = () => {
  const valueDisplays = document.querySelectorAll(".count");
  let interval = 1000;
  valueDisplays.forEach(valueDisplay => {
    let startValue = 0;
    let endValue = parseInt(valueDisplay.getAttribute("data-val"));

    let duration = Math.floor(interval / endValue);

    let counter = setInterval(function () {
      startValue += 1;
      valueDisplay.textContent = startValue + "+";
      if (startValue == endValue) {
        clearInterval(counter);
      }
    }, duration);
  });
};

const onSectionTransition = section => {
  section.style.opacity = 1;
  section.style.transform = "translateY(0)";
  section.style.visibility = "visible";
};

const handleSkillsData = ({ language, framework, tool }) => {
  const languagesContainer = document.querySelector(".languages-container");
  const frameworksContainer = document.querySelector(".frameworks-container");
  const toolsContainer = document.querySelector(".tools-container");

  showSkillsData(languagesContainer, language);
  showSkillsData(frameworksContainer, framework);
  showSkillsData(toolsContainer, tool);
};

//---------------DOM FUNCTION---------------
const showSkillsData = (parentElement, arr) => {
  parentElement.innerHTML += arr
    .map(skill => {
      return ` <li class="skills__category-item">${skill}</li>`;
    })
    .join("");
};

//---------------UTILITIES---------------

//---------------OBSERVER---------------
observer(countingSkills, animatedSkills).observe(animatedSkills);
animatedElements.forEach(section =>
  observer(onSectionTransition, section).observe(section)
);

//---------------EVENT LISTENER---------------
darkLightToggleIcon.addEventListener("click", onClickToggleTheme);
hamburger.addEventListener("click", onClickToggleNavbar);
navItems.forEach(navItem => {
  navItem.addEventListener("click", onClickAddNavIndicator);
  navItem.addEventListener("mouseenter", onMouseEnterShowNavIndicator);
  navItem.addEventListener("mouseout", onMouseOutResetNavIndicator);
});
