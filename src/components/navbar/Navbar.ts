import { languageManager, t } from '../../utils/language';
import { executePageTransition } from '../../utils/transitions';
import { getLanguageSelectorHTML, setupLanguageSelectorListeners } from './LanguageSelector';
import { getNavLinksHTML, setupNavLinksListeners, updateActiveNavLink } from './NavLinks';
import { getMobileMenuButtonHTML, setupMobileMenuListeners } from './MobileMenu';

export function Navbar(): HTMLElement {
  const navbar = document.createElement('nav');
  navbar.className =
    'w-full bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg transition-all duration-300';

  // Fixed positioning
  navbar.style.position = 'fixed';
  navbar.style.top = '0';
  navbar.style.left = '0';
  navbar.style.right = '0';
  navbar.style.zIndex = '9999';
  navbar.style.width = '100%';

  const renderContent = () => {
    navbar.innerHTML = `
		<div class="max-w-7xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
			<a href="#home" class="flex items-center space-x-3">
				<img src="/LOGO SACRED.png" class="h-10" alt="Sacred Logo" />
				<span class="self-center text-2xl font-bold whitespace-nowrap text-gray-800">${t(
          'navbar.brand'
        )}</span>
			</a>
			
			<div class="flex items-center md:order-2 space-x-1 md:space-x-0 relative">
				${getLanguageSelectorHTML()}
				${getMobileMenuButtonHTML()}
			</div>
			
			<div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-language">
				${getNavLinksHTML()}
			</div>
		</div>
		`;
  };

  renderContent();

  const setupEventListeners = () => {
    setupLanguageSelectorListeners(navbar);
    setupNavLinksListeners(navbar);
    setupMobileMenuListeners(navbar);

    // Brand link: dispara transición si estamos en una página distinta al home
    const brandLink = navbar.querySelector('a[href="#home"]');
    if (brandLink) {
      const newLink = brandLink.cloneNode(true) as HTMLElement;
      brandLink.parentNode?.replaceChild(newLink, brandLink);
      newLink.addEventListener('click', async (e) => {
        const currentHash = window.location.hash;
        // Solo animar si no estamos ya en home
        if (currentHash && currentHash !== '#home' && !currentHash.startsWith('#home?')) {
          e.preventDefault();
          await executePageTransition(() => {
            window.location.hash = '#home';
          });
        }
      });
    }
  };

  languageManager.subscribe(() => {
    renderContent();
    setupEventListeners();
  });

  setTimeout(() => {
    setupEventListeners();
  }, 100);

  const updateColors = (isTranslucent: boolean) => {
    const brandText = navbar.querySelector('span');
    const languageButton = navbar.querySelector('[data-dropdown-toggle="language-dropdown-menu"]');
    const mobileButton = navbar.querySelector('[data-collapse-toggle="navbar-language"]');
    const navLinks = navbar.querySelectorAll('.nav-link');

    const textColor = isTranslucent ? 'text-white' : 'text-gray-800';

    if (brandText) {
      brandText.className = `self-center text-2xl font-bold whitespace-nowrap ${textColor}`;
    }

    if (languageButton) {
      languageButton.classList.remove(
        'text-ocean-800',
        'text-gray-800',
        'text-white',
        'text-gray-700'
      );
      languageButton.classList.add(isTranslucent ? 'text-white' : 'text-ocean-800');
    }

    if (mobileButton) {
      mobileButton.classList.remove('text-ocean-800', 'text-gray-800', 'text-white');
      mobileButton.classList.add(isTranslucent ? 'text-white' : 'text-ocean-800');
    }

    // Update links using the helper, but also handle color overrides here if needed
    // Actually updateActiveNavLink handles its own colors based on transparency if we pass the navbar class check
    // But here we might want to force update all links text color first

    navLinks.forEach((link) => {
      // Basic text color for non-active links
      if (!link.getAttribute('aria-current')) {
        link.classList.remove('text-gray-700', 'text-white', 'text-white/80');
        link.classList.add(isTranslucent ? 'text-white/80' : 'text-gray-700');
      }
    });

    // Dropdown theme
    const dropdown = navbar.querySelector('#language-dropdown-menu');
    if (dropdown) {
      if (isTranslucent) {
        dropdown.classList.replace('bg-white', 'bg-gray-800');
        dropdown.classList.replace('divide-gray-100', 'divide-gray-600');
        dropdown.classList.replace('border-gray-200', 'border-gray-600');
        const links = dropdown.querySelectorAll('a');
        links.forEach((l) => {
          l.classList.replace('text-gray-700', 'text-white');
          l.classList.replace('hover:bg-gray-100', 'hover:bg-gray-700');
        });
      } else {
        dropdown.classList.replace('bg-gray-800', 'bg-white');
        dropdown.classList.replace('divide-gray-600', 'divide-gray-100');
        dropdown.classList.replace('border-gray-600', 'border-gray-200');
        const links = dropdown.querySelectorAll('a');
        links.forEach((l) => {
          l.classList.replace('text-white', 'text-gray-700');
          l.classList.replace('hover:bg-gray-700', 'hover:bg-gray-100');
        });
      }
    }

    // Ensure active link is updated
    updateActiveNavLink(navbar);
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
      navbar.classList.add('bg-black/30', 'backdrop-blur-lg', 'shadow-xl');
      navbar.classList.remove('bg-white/95', 'shadow-lg');
      updateColors(true);
    } else {
      navbar.classList.add('bg-white/95', 'shadow-lg');
      navbar.classList.remove('bg-black/30', 'backdrop-blur-lg', 'shadow-xl');
      updateColors(false);
    }
  };

  const combinedScrollHandler = () => {
    handleScroll();
    updateActiveNavLink(navbar);
  };

  window.addEventListener('scroll', combinedScrollHandler, { passive: true });

  // Initial check
  setTimeout(() => {
    handleScroll();
  }, 100);

  (navbar as any).cleanup = () => {
    window.removeEventListener('scroll', combinedScrollHandler);
  };

  return navbar;
}
