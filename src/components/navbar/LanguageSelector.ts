import { languageManager } from '../../utils/language';
import { languages } from './constants';

export function getLanguageSelectorHTML(): string {
  const currentLang = languageManager.getCurrentLanguage();
  const currentLanguageInfo = languages[currentLang];

  return `
    <div class="relative">
        <button type="button" data-dropdown-toggle="language-dropdown-menu" class="inline-flex items-center font-medium justify-center px-2 py-1.5 md:px-4 md:py-2 text-base md:text-sm text-ocean-800 rounded-md md:rounded-lg cursor-pointer hover:bg-jungle-100 transition-colors duration-200 gap-1">
            ${currentLanguageInfo.flag}
            <span class="lang-code">${currentLanguageInfo.code}</span>
            <svg class="chevron-icon w-1.5 h-1.5 md:w-2.5 md:h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg>
        </button>
        
        <!-- Dropdown -->
        <div class="z-50 hidden absolute right-0 mt-2 w-44 text-base list-none bg-white divide-y divide-gray-100 rounded-lg border border-gray-200 shadow-lg" id="language-dropdown-menu">
            <ul class="py-2 font-medium" role="none">
                ${Object.entries(languages)
                  .map(
                    ([code, lang]) => `
                    <li>
                        <a href="#" data-lang="${code}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200" role="menuitem">
                            <div class="inline-flex items-center">
                                ${lang.flag}
                                ${lang.name}
                            </div>
                        </a>
                    </li>
                `
                  )
                  .join('')}
            </ul>
        </div>
    </div>
    `;
}

export function setupLanguageSelectorListeners(navbar: HTMLElement): void {
  const dropdownButton = navbar.querySelector('[data-dropdown-toggle="language-dropdown-menu"]');
  const dropdownMenu = navbar.querySelector('#language-dropdown-menu');

  if (dropdownButton && dropdownMenu) {
    // Clone to remove previous listeners if any
    const newDropdownButton = dropdownButton.cloneNode(true);
    dropdownButton.parentNode?.replaceChild(newDropdownButton, dropdownButton);

    newDropdownButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropdownMenu.classList.toggle('hidden');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
      const target = event.target as Node;
      if (!newDropdownButton.contains(target) && !dropdownMenu.contains(target)) {
        dropdownMenu.classList.add('hidden');
      }
    });

    // Handle language selection
    const languageLinks = dropdownMenu.querySelectorAll('a[data-lang]');
    languageLinks.forEach((link) => {
      link.addEventListener('click', async (e) => {
        e.preventDefault();
        const selectedLang = (e.currentTarget as HTMLElement).getAttribute('data-lang');
        if (selectedLang) {
          dropdownMenu.classList.add('hidden');
          await languageManager.setLanguageWithTransition(selectedLang as any);
        }
      });
    });
  }
}
