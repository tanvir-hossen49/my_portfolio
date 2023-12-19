"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Global variables
let activeNav = ["0px", "51px"]; //[offsetLeft,offsetWidth ]
const ICON_URLS = {
    lightMode: "./assets/images/sun-moon.svg",
    darkMode: "./assets/images/moon.svg",
};
const ACTIVE_CLASS = "active";
// Entry point when the window loads
window.onload = () => {
    main();
    loadSkillsData();
    loadProjectsData();
};
// main is a boot function that initializes the page
const main = () => {
    // dom references
    const darkLightToggleIcon = document.getElementById("icon");
    const animatedSkills = document.querySelector(".about__skills");
    const animatedElements = document.querySelectorAll(".animate");
    const navContainer = document.querySelector(".nav__items");
    const hamburger = document.querySelector(".hamburger");
    const form = document.querySelector("form.form");
    const checkBoxContainer = document.querySelector(".skills__filter");
    // Set up IntersectionObservers for animated sections
    observer(countingSkills, animatedSkills).observe(animatedSkills);
    animatedElements.forEach((section) => observer(sectionTransition, section).observe(section));
    //---------------EVENT LISTENER---------------
    checkBoxContainer.addEventListener("change", filteredSkills);
    form.addEventListener("submit", submitContactForm);
    darkLightToggleIcon.addEventListener("click", toggleTheme);
    hamburger.addEventListener("click", toggleNavbar);
    navContainer.addEventListener("click", addNavIndicator);
    navContainer.addEventListener("mouseout", resetNavIndicator);
    navContainer.addEventListener("mouseenter", showNavIndicator, true); // active event delegation);
};
//----------------FETCH DATA-----------------
const loadSkillsData = (level) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("./data/skills.json");
        const data = yield response.json();
        console.log(data);
        const skills = level
            ? data.filter((skill) => skill.level === (level === null || level === void 0 ? void 0 : level[0]) ||
                skill.level === (level === null || level === void 0 ? void 0 : level[1]) ||
                skill.level === (level === null || level === void 0 ? void 0 : level[2]))
            : data;
        //categoryOfSkills = {language: [skill], tool:[skill], framework: [skill]}
        const categoryOfSkills = (skills || []).reduce((accumulator, current) => {
            let key = current === null || current === void 0 ? void 0 : current.category;
            if (!key)
                return accumulator;
            if (!accumulator[key]) {
                accumulator[key] = [];
            }
            accumulator[key].push(current.name);
            return accumulator;
        }, {});
        handleSkillsData(categoryOfSkills);
    }
    catch (error) {
        console.log(error);
    }
});
const loadProjectsData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("./data/projects.json");
        const projects = yield response.json();
        displayProjects(projects);
    }
    catch (error) {
        console.log(error);
    }
});
//helper: create an IntersectionObserver
const observer = (callback, sectionClass) => {
    return new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(sectionClass);
            }
        });
    });
};
//---------------EVENT HANDLER---------------
const toggleTheme = event => {
    const body = document.body.classList;
    const icon = event.target;
    body.toggle("night");
    if (body.contains("night")) {
        icon.src = ICON_URLS.lightMode;
        icon.alt = "light mode";
    }
    else {
        icon.src = ICON_URLS.darkMode;
        icon.alt = "dark mode";
    }
};
const toggleNavbar = () => {
    const navItemsWrapper = document.querySelector(".nav__items");
    const hamburger = document.querySelector(".hamburger");
    hamburger.classList.toggle(ACTIVE_CLASS);
    navItemsWrapper.classList.toggle(ACTIVE_CLASS);
};
const addNavIndicator = event => {
    // in mobile device when user click a link then navbar will be hide
    if (isMobile()) {
        toggleNavbar();
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
        link.classList.contains(ACTIVE_CLASS) &&
            link.classList.remove(ACTIVE_CLASS);
    });
    navLink.classList.add(ACTIVE_CLASS);
};
const showNavIndicator = event => {
    const marker = document.querySelector(".nav__marker");
    const navLink = event.target;
    const offsetLeft = navLink.offsetLeft + "px";
    const offsetWidth = navLink.offsetWidth + "px";
    marker.style.left = offsetLeft;
    marker.style.width = offsetWidth;
};
const resetNavIndicator = () => {
    const marker = document.querySelector(".nav__marker");
    if (marker) {
        marker.style.left = activeNav[0];
        marker.style.width = activeNav[1];
    }
};
const countingSkills = () => {
    const countElements = document.querySelectorAll(".count");
    let interval = 1000;
    countElements.forEach(valueDisplay => {
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
const sectionTransition = (section) => {
    section.style.opacity = "1";
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
const submitContactForm = (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const toast = document.querySelector(".toastMessage");
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
        const response = yield fetch("https://server-ebon-delta.vercel.app/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mailInfo),
        });
        if (response.ok) {
            toast.style.display = "block";
            toast.innerText = `${name}, your form was submitted successfully.`;
            // Clear form fields
            formData.reset();
        }
        else {
            throw new Error("Submission failed.");
        }
    }
    catch (error) {
        toast.style.display = "block";
        toast.innerText = error.message;
        console.log("Error: sending contact info error", error);
    }
    // after 3s toast message is remove
    setTimeout(() => {
        toast.style.display = "none";
        toast.innerText = "";
    }, 3000);
});
//filtering skills based on checkboxes
const filteredSkills = () => {
    const checkBoxes = document.querySelectorAll(".input-filter-checkbox");
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
        // Use textContent to insert plain text
        parentElement.appendChild(document.createTextNode("No data found"));
        return;
    }
    skillArray === null || skillArray === void 0 ? void 0 : skillArray.forEach(skill => {
        const skillItem = document.createElement("li");
        skillItem.className = "skills__category-item";
        skillItem.textContent = skill;
        // Append the skill item to the parent element
        parentElement.appendChild(skillItem);
    });
};
const displayProjects = (projects) => {
    const projectContent = document.getElementById("project__content");
    projectContent.innerHTML += projects
        .map(project => {
        const { image, name, technologies, description, codeLink, productionLink, } = project;
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
        ${(codeLink === null || codeLink === void 0 ? void 0 : codeLink.client)
            ? `<a
          href="${codeLink === null || codeLink === void 0 ? void 0 : codeLink.client}"
          target="_blank"
        >
         Client link
        </a>`
            : ""}

          ${(codeLink === null || codeLink === void 0 ? void 0 : codeLink.server)
            ? `<a
            href="${codeLink === null || codeLink === void 0 ? void 0 : codeLink.server}"
            target="_blank"
          >
           Server link
          </a>`
            : ""}

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
