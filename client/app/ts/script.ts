// Global variables
let activeNav: [string, string] = ["0px", "51px"]; // [offsetLeft, offsetWidth]

const ICON_URLS: {
  lightMode: string;
  darkMode: string;
} = {
  lightMode: "./assets/images/sun-moon.svg",
  darkMode: "./assets/images/moon.svg",
};

const ACTIVE_CLASS = "active";

interface IGroupOfSkill {
  framework?: string[];
  language?: string[];
  tool?: string[];
}

interface ISkill {
  _id: string;
  name: string;
  level: string;
  category: string;
}

interface Project {
  image: string;
  name: string;
  technologies: string[];
  description: string;
  codeLink: { client: string; server?: string };
  productionLink: string;
}

// Entry point when the window loads
window.onload = () => {
  main();
  loadSkillsData();
  loadProjectsData();
};

// Main function that initializes the page
const main = (): void => {
  // DOM references
  const darkLightToggleIcon = document.getElementById("icon") as HTMLImageElement;
  const animatedSkills = document.querySelector(".about__skills") as HTMLElement;
  const animatedElements = document.querySelectorAll(".animate") as NodeList;
  const navContainer = document.querySelector(".nav__items") as HTMLUListElement;
  const hamburger = document.querySelector(".hamburger") as HTMLElement;
  const form = document.querySelector("form.form") as HTMLFormElement;
  const checkBoxContainer = document.querySelector(".skills__filter") as HTMLElement;

  // Set up IntersectionObservers for animated sections
  observer(countingSkills, animatedSkills).observe(animatedSkills);

  animatedElements.forEach((section: any) =>
    observer(sectionTransition, section).observe(section)
  );

  // Event listeners
  checkBoxContainer.addEventListener("change", filteredSkills);
  form.addEventListener("submit", submitContactForm);
  darkLightToggleIcon.addEventListener("click", toggleTheme);
  hamburger.addEventListener("click", toggleNavbar);
  navContainer.addEventListener("click", addNavIndicator);
  navContainer.addEventListener("mouseout", resetNavIndicator);
  navContainer.addEventListener("mouseenter", showNavIndicator, true);
};

// Fetch data
const loadSkillsData = async (level?: string[]): Promise<void> => {
  try {
    const response = await fetch("./data/skills.json");
    const data: ISkill[] = await response.json();

    const skills = level
      ? data.filter(
          (skill) =>
            skill.level === level?.[0] ||
            skill.level === level?.[1] ||
            skill.level === level?.[2]
        )
      : data;

    const categoryOfSkills: IGroupOfSkill = (skills || []).reduce((accumulator, current) => {
      let key: string = current?.category;
      if (!key) return accumulator;

      if (!accumulator[key]) {
        accumulator[key] = [];
      }

      accumulator[key].push(current.name);
      return accumulator;
    }, {} as Record<string, string[]>);

    handleSkillsData(categoryOfSkills);
  } catch (error) {
    console.error(error);
  }
};

const loadProjectsData = async () => {
  try {
    const response = await fetch("./data/projects.json");
    const projects: Project[] = await response.json();
    displayProjects(projects);
  } catch (error) {
    console.error(error);
  }
};

// Helper function: create an IntersectionObserver
const observer = (callback: (sectionClass: any) => void, sectionClass: Node) => {
  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(sectionClass);
      }
    });
  });
};

// Event handlers
const toggleTheme = (event: MouseEvent): void => {
  const body = document.body.classList;
  const icon = event.target as HTMLImageElement;

  body.toggle("night");

  if (body.contains("night")) {
    icon.src = ICON_URLS.lightMode;
    icon.alt = "light mode";
  } else {
    icon.src = ICON_URLS.darkMode;
    icon.alt = "dark mode";
  }
};

const toggleNavbar = () => {
  const navItemsWrapper: HTMLElement | null = document.querySelector(".nav__items");
  const hamburger: HTMLElement | null = document.querySelector(".hamburger");

  if (hamburger) {
    hamburger.classList.toggle(ACTIVE_CLASS);
  }

  if (navItemsWrapper) {
    navItemsWrapper.classList.toggle(ACTIVE_CLASS);
  }
};

const addNavIndicator = (event: MouseEvent) => {
  if (isMobile()) {
    toggleNavbar();
  }

  const marker = document.querySelector(".nav__marker") as HTMLElement | null;
  const navLinks = document.querySelectorAll(".nav__link");
  const navLink = event.target as HTMLElement;

  if (marker) {
    const offsetLeft = navLink.offsetLeft + "px";
    const offsetWidth = navLink.offsetWidth + "px";

    marker.style.left = offsetLeft;
    marker.style.width = offsetWidth;

    activeNav = [offsetLeft, offsetWidth];
  }

  navLinks.forEach((link) => {
    if (link.classList.contains(ACTIVE_CLASS)) {
      link.classList.remove(ACTIVE_CLASS);
    }
  });

  navLink.classList.add(ACTIVE_CLASS);
};

const showNavIndicator = (event: MouseEvent) => {
  const marker = document.querySelector(".nav__marker") as HTMLElement | null;
  const navLink = event.target as HTMLElement;

  if (marker) {
    const offsetLeft = navLink.offsetLeft + "px";
    const offsetWidth = navLink.offsetWidth + "px";

    marker.style.left = offsetLeft;
    marker.style.width = offsetWidth;
  }
};

const resetNavIndicator = (): void => {
  const marker = document.querySelector(".nav__marker") as HTMLElement | null;

  if (marker) {
    marker.style.left = activeNav[0];
    marker.style.width = activeNav[1];
  }
};

const countingSkills = () => {
  const countElements = document.querySelectorAll(".count") as NodeListOf<HTMLElement>;

  const interval = 1000;

  countElements.forEach((valueDisplay) => {
    let startValue = 0;
    const dataValAttribute: any = valueDisplay.getAttribute("data-val");
    const endValue = parseInt(dataValAttribute, 10) || 0;

    const duration = Math.floor(interval / endValue);

    const counter = setInterval(() => {
      startValue += 1;
      valueDisplay.textContent = startValue + "+";

      if (startValue === endValue) {
        clearInterval(counter);
      }
    }, duration);
  });
};

const sectionTransition = (section: HTMLElement) => {
  section.style.opacity = "1";
  section.style.transform = "translateY(0)";
  section.style.visibility = "visible";
};

const handleSkillsData = ({ language, framework, tool }: IGroupOfSkill) => {
  const languagesContainer = document.querySelector(".languages-container") as HTMLElement | null;
  const frameworksContainer = document.querySelector(".frameworks-container") as HTMLElement | null;
  const toolsContainer = document.querySelector(".tools-container") as HTMLElement | null;

  // Check if containers exist before manipulating them
  if (languagesContainer && frameworksContainer && toolsContainer) {
    // Reset previous list
    languagesContainer.innerHTML = "";
    frameworksContainer.innerHTML = "";
    toolsContainer.innerHTML = "";

    // Display skills in respective containers
    displaySkills(languagesContainer, language);
    displaySkills(frameworksContainer, framework);
    displaySkills(toolsContainer, tool);
  }
};

const submitContactForm = async (event: Event) => {
  event.preventDefault();

  const toast = document.querySelector(".toastMessage") as HTMLElement | null;
  const formData = event.target as HTMLFormElement;

  if (!toast) {
    console.error("Toast element not found");
    return;
  }

  const name = (formData.elements.namedItem("name") as HTMLInputElement)?.value || "";
  const email = (formData.elements.namedItem("email") as HTMLInputElement)?.value || "";
  const message = (formData.elements.namedItem("message") as HTMLTextAreaElement)?.value || "";
  const subject = (formData.elements.namedItem("subject") as HTMLInputElement)?.value || "";

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

    if (response.ok) {
      toast.style.display = "block";
      toast.innerText = `${name}, your form was submitted successfully.`;
      // Clear form fields
      formData.reset();
    } else {
      throw new Error("Submission failed.");
    }
  } catch (error: any) {
    toast.style.display = "block";
    toast.innerText = error.message;

    console.error("Error: sending contact info error", error);
  }

  // After 3s, remove the toast message
  setTimeout(() => {
    if (toast) {
      toast.style.display = "none";
      toast.innerText = "";
    }
  }, 3000);
};

// Filtering skills based on checkboxes
const filteredSkills = (): void => {
  const checkBoxes = document.querySelectorAll(".input-filter-checkbox") as NodeListOf<HTMLInputElement>;
  const isChecked: string[] = [];

  checkBoxes.forEach((checkBox) => {
    if (checkBox.checked) {
      isChecked.push(checkBox.value);
    }
  });

  loadSkillsData(isChecked);
};

// DOM function
const displaySkills = (parentElement: HTMLElement, skillArray?: string[] | null) => {
  if (!skillArray || skillArray.length === 0) {
    // Use textContent to insert plain text
    parentElement.appendChild(document.createTextNode("No data found"));
    return;
  }

  skillArray.forEach((skill) => {
    const skillItem = document.createElement("li");
    skillItem.className = "skills__category-item";
    skillItem.textContent = skill;

    // Append the skill item to the parent element
    parentElement.appendChild(skillItem);
  });
};

// Display projects
const displayProjects = (projects: Project[]): void => {
  const projectContent = document.getElementById("project__content");

  if (!projectContent) {
    console.error("Project content container not found");
    return;
  }

  projectContent.innerHTML += projects
    .map((project) => {
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
            ${technologies.map((technology) => `<li>${technology}</li>`).join("")}
          </ul>
        </div>
        <div class="project__description">
          <p>${description}</p>
        </div>
        <div class="project__button">
          ${
            codeLink?.client
              ? `<a href="${codeLink.client}" target="_blank">Client link</a>`
              : ""
          }
          ${
            codeLink?.server
              ? `<a href="${codeLink.server}" target="_blank">Server link</a>`
              : ""
          }
          <a href='${productionLink}' target="_blank">Live site</a>
        </div>
      </div>`;
    })
    .join("");
};

// Utilities
const isMobile = () => window.innerWidth <= 640;
