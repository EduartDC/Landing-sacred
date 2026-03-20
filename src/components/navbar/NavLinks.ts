import { t } from "../../utils/language";
import { executePageTransition } from "../../utils/transitions";

export function getNavLinksHTML(): string {
    return `
    <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-200 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent">
        <li>
            <a href="#home" data-nav-link="home" class="nav-link block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-ocean-600 md:p-0 transition-colors duration-200">${t(
        "navbar.home"
    )}</a>
        </li>
        <li>
            <a href="#about" data-nav-link="about" class="nav-link block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-ocean-600 md:p-0 transition-colors duration-200">${t(
        "navbar.about"
    )}</a>
        </li>
        <li>
            <a href="#services" data-nav-link="services" class="nav-link block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-ocean-600 md:p-0 transition-colors duration-200">${t(
        "navbar.services"
    )}</a>
        </li>
        <li>
            <a href="#contact" data-nav-link="contact" class="nav-link block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-ocean-600 md:p-0 transition-colors duration-200">${t(
        "navbar.contact"
    )}</a>
        </li>
    </ul>
    `;
}

export function setupNavLinksListeners(navbar: HTMLElement): void {
    const navLinks = navbar.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
        // Clone to remove previous listeners if any (though usually we render fresh)
        const newLink = link.cloneNode(true);
        link.parentNode?.replaceChild(newLink, link);

        newLink.addEventListener("click", async (e) => {
            const target = (newLink as HTMLElement).getAttribute("href");
            const targetSection = (newLink as HTMLElement).getAttribute("data-nav-link");

            if (target && targetSection) {
                const element = document.querySelector(target);

                if (element) {
                    // Home page navigation (smooth scroll)
                    e.preventDefault();
                    element.scrollIntoView({ behavior: "smooth" });
                    setTimeout(() => {
                        updateActiveNavLink(navbar);
                    }, 100);
                } else {
                    // Other page (e.g. Tour) -> Home transition
                    e.preventDefault();
                    await executePageTransition(() => {
                        window.location.hash = target;
                    });
                }
            }
        });
    });
}

export function updateActiveNavLink(navbar: HTMLElement): void {
    const sections = ["home", "about", "services", "contact"];
    const scrollPosition = window.scrollY + 150;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    let currentSection = "home";

    if (window.scrollY > 10) {
        if (scrollPosition + windowHeight >= documentHeight - 100) {
            currentSection = "contact";
        } else {
            for (let i = sections.length - 1; i >= 0; i--) {
                const sectionId = sections[i];
                const element = document.getElementById(sectionId);
                if (element) {
                    const offsetTop = element.offsetTop;
                    if (scrollPosition >= offsetTop - 100) {
                        currentSection = sectionId;
                        break;
                    }
                }
            }
        }
    }

    const isTranslucent = navbar.classList.contains("bg-black/30");
    const navLinks = navbar.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
        const linkSection = link.getAttribute("data-nav-link");

        if (linkSection === currentSection) {
            link.classList.remove("text-gray-700", "text-white", "text-white/80");
            link.setAttribute("aria-current", "page");

            if (isTranslucent) {
                link.classList.add(
                    "text-white",
                    "bg-white/20",
                    "md:bg-white/10",
                    "border-b-2",
                    "border-white/80",
                    "font-bold",
                    "md:border-b-2"
                );
                link.classList.remove("bg-ocean-600", "md:bg-transparent");
            } else {
                link.classList.add(
                    "text-white",
                    "bg-ocean-600",
                    "md:bg-transparent",
                    "md:text-ocean-600",
                    "md:border-b-2",
                    "md:border-ocean-600",
                    "font-bold"
                );
                link.classList.remove("bg-white/20", "md:bg-white/10", "border-white/80");
            }
        } else {
            link.classList.remove(
                "text-white",
                "bg-ocean-600",
                "md:bg-transparent",
                "md:text-ocean-600",
                "bg-white/20",
                "md:bg-white/10",
                "border-b-2",
                "border-white/80",
                "md:border-ocean-600",
                "font-bold",
                "md:border-b-2"
            );
            link.removeAttribute("aria-current");

            if (isTranslucent) {
                link.classList.add("text-white/80");
            } else {
                link.classList.add("text-gray-700");
            }
        }
    });
}
