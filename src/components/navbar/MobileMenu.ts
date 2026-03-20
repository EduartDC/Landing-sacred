export function getMobileMenuButtonHTML(): string {
    return `
    <button data-collapse-toggle="navbar-language" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-ocean-800 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors duration-200" aria-controls="navbar-language" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    `;
}

export function setupMobileMenuListeners(navbar: HTMLElement): void {
    const mobileButton = navbar.querySelector(
        '[data-collapse-toggle="navbar-language"]'
    );
    const mobileMenu = navbar.querySelector("#navbar-language");

    if (mobileButton && mobileMenu) {
        const newMobileButton = mobileButton.cloneNode(true);
        mobileButton.parentNode?.replaceChild(newMobileButton, mobileButton);

        newMobileButton.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }
}
