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
  loadProjectsData();
};

//----------------FETCH DATA-----------------
const loadSkillsData = async () => {
  const response = await fetch("./data/skills.json");
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

const loadProjectsData = async () => {
  try {
    const response = await fetch("./data/projects.json");
    const projects = await response.json();
    displayProjects(projects);
  } catch (error) {
    console.log(error);
  }
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
    event.target.src = "./assets/images/sun-moon.svg";
    event.target.alt = "light mode";
  } else {
    event.target.src = "./assets/images/moon.svg";
    event.target.alt = "dark mode";
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

  displaySkills(languagesContainer, language);
  displaySkills(frameworksContainer, framework);
  displaySkills(toolsContainer, tool);
};

//---------------DOM FUNCTION---------------
const displaySkills = (parentElement, skillArray) => {
  parentElement.innerHTML += skillArray
    .map(skill => {
      return `<li class="skills__category-item">${skill}</li>`;
    })
    .join("");
};

const displayProjects = projects => {
  const projectContent = document.getElementById("project__content");
  console.log(projects, projectContent);
  projectContent.innerHTML += projects
    .map(project => {
      return `<div class="project">
        <div class="project__img">
          <img src=${project.image} alt=${project.image} loading="lazy" />
        </div>
        <div class="project__name">
          <h4>${project.name}</h4>
        </div>
        <div class="project__technologies">
          <ul>
            <li>React</li>
            <li>Tailwind</li>
            <li>Node</li>
            <li>Express</li>
            <li>Firebase</li>
            <li>Stripe</li>
            <li>ReactQuery</li>
            <li>MongoDB</li>
          </ul>
        </div>
        <div class="project__description">
          <p>
           ${project.description}
          </p>
        </div>
        <div class="project__button">
          <a
            href="https://github.com/tanvir-hossen49/sunnah-camp-client.git"
            target="_blank"
          >
            Client code
          </a>
          <a
            href="https://github.com/tanvir-hossen49/sunnah-camp-server.git"
            target="_blank"
          >
            server code
          </a>
          <a href="https://summer-camp-eac1c.web.app" target="_blank">
            live site
          </a>
        </div>
      </div>`;
    })
    .join("");
};

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
