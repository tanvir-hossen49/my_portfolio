// Global variables
let activeNav = ["0px", "51px"]; //[offsetLeft,offsetWidth ]
const darkLightToggleIcon = document.getElementById("icon");
const animatedSkills = document.querySelector(".about__skills");
const animatedElements = document.querySelectorAll(".animate");
const navItemsWrapper = document.querySelector(".nav__items");
const navContainer = document.querySelector(".nav__items");
const hamburger = document.querySelector(".hamburger");
const form = document.querySelector("form.form");
const checkBoxContainer = document.querySelector(".skills__filter");
const checkBoxes = document.querySelectorAll(".input-filter-checkbox");
const toast = document.querySelector(".toastMessage");

window.onload = () => {
  loadSkillsData();
  loadProjectsData();
  hideFilterOnMobile();
};

//----------------FETCH DATA-----------------
const loadSkillsData = async (level = false) => {
  const response = await fetch("./data/skills.json");
  const data = await response.json();

  const skills = level
    ? data.filter(
        skill =>
          skill.level === level?.[0] ||
          skill.level === level?.[1] ||
          skill.level === level?.[3]
      )
    : data;

  //categoryOfSkills = {language: [skill], tool:[skill], framework: [skill]}
  const categoryOfSkills = skills?.reduce((accumulator, current) => {
    let key = current?.category;
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
  // in mobile device when user click a link then navbar will be hide
  if (isMobile()) {
    onClickToggleNavbar();
  }

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

  console.log(navLink);

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

  // reset previous list
  languagesContainer.innerHTML = "";
  frameworksContainer.innerHTML = "";
  toolsContainer.innerHTML = "";

  displaySkills(languagesContainer, language);
  displaySkills(frameworksContainer, framework);
  displaySkills(toolsContainer, tool);
};

const onContactFormSubmit = async event => {
  event.preventDefault();

  const formData = event.target;

  const name = formData.name.value;
  const email = formData.email.value;
  const message = formData.message.value;
  const subject = formData.subject.value;

  const mailInfo = {
    name,
    email,
    message,
    subject,
  };

  try {
    const response = await fetch("https://server-ebon-delta.vercel.app/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mailInfo),
    });
    await response.json();

    toast.style.display = "block";
    toast.innerText = `${name} your form Submitted successful`;

    formData.reset();
  } catch (error) {
    toast.style.display = "block";
    toast.innerText = error.message;

    console.log("Error: sending contact info error", error);
  }

  // after 3s toast message is remove
  setTimeout(() => {
    toast.style.display = "none";
    toast.innerText = "";
  }, 3000);
};

const hideFilterOnMobile = () => {
  const filterSkilledContainer = document.querySelector(".skills__filter");
  if (isMobile()) {
    filterSkilledContainer.style.display = "none";
  }
};

const filteredSkills = () => {
  const isChecked = [];

  [...checkBoxes].forEach(checkBox => {
    if (checkBox.checked) {
      isChecked.push(checkBox.value);
    }
  });

  loadSkillsData(isChecked);
};

//---------------DOM FUNCTION---------------
const displaySkills = (parentElement, skillArray) => {
  if (!skillArray) {
    return (parentElement.innerHTML = `<li class="skills__category-item">No data found</li>`);
  }

  parentElement.innerHTML += skillArray
    ?.map(skill => {
      return `<li class="skills__category-item">${skill}</li>`;
    })
    .join("");
};

const displayProjects = projects => {
  const projectContent = document.getElementById("project__content");

  projectContent.innerHTML += projects
    .map(project => {
      const {
        image,
        name,
        technologies,
        description,
        codeLink,
        productionLink,
      } = project;
      return `<div class="project">
        <div class="project__img">
          <img src=${image} alt="${name}" loading="lazy"/>
        </div>
        <div class="project__name">
          <h4>${name}</h4>
        </div>
        <div class="project__technologies">
          <ul>
            ${technologies.map(technology => `<li>${technology}</li>`).join("")}
          </ul>
        </div>
        <div class="project__description">
          <p>
           ${description}
          </p>
        </div>
        <div class="project__button">
        ${
          codeLink?.client
            ? `<a
          href="${codeLink?.client}"
          target="_blank"
        >
         Client link
        </a>`
            : ""
        }

          ${
            codeLink?.server
              ? `<a
            href="${codeLink?.server}"
            target="_blank"
          >
           Server link
          </a>`
              : ""
          }

          <a href='${productionLink}' target="_blank">
            live site
          </a>
        </div>
      </div>`;
    })
    .join("");
};

//----------------UTILITIES----------------
const isMobile = () => window.innerWidth <= 640;

//---------------OBSERVER---------------
observer(countingSkills, animatedSkills).observe(animatedSkills);
animatedElements.forEach(section =>
  observer(onSectionTransition, section).observe(section)
);

//---------------EVENT LISTENER---------------
checkBoxContainer.addEventListener("change", filteredSkills);
form.addEventListener("submit", onContactFormSubmit);
darkLightToggleIcon.addEventListener("click", onClickToggleTheme);
hamburger.addEventListener("click", onClickToggleNavbar);
navContainer.addEventListener("click", onClickAddNavIndicator);
navContainer.addEventListener("mouseenter", onMouseEnterShowNavIndicator, true);
navContainer.addEventListener("mouseout", onMouseOutResetNavIndicator);