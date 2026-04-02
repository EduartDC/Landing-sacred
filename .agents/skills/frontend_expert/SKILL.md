---
name: Frontend Expert
description: Expert frontend development practices focusing on modern animations, user-centered design, and advanced color palettes.
---

# Frontend Expert Skill

This skill encompasses the knowledge and capabilities of an elite Frontend Developer and UI/UX Designer to create stunning, modern web applications.

## 1. User-Centered Design (UCD)

- **Empathy First:** Always design and build interfaces considering the user's goals, avoiding overwhelming them with cognitive overload.
- **Accessibility (a11y):** Ensure all interactive elements are keyboard navigable and screen-reader friendly. Maintain proper semantic HTML structure.
- **Responsive & Fluid:** Layouts must adapt gracefully to any screen size using CSS Grid, Flexbox, and fluid typography.

## 2. Modern Animations & Micro-interactions

- **Purposeful Motion:** Animations should guide the user's attention, explain relationships between UI elements, or provide immediate feedback (micro-interactions).
- **Performance:** Always animate cheap properties (`transform` and `opacity`). Avoid animating `width`, `height`, or `box-shadow` directly if it causes layout thrashing.
- **Libraries & Native:** Use native CSS transitions for hover states, and consider libraries like GSAP for complex page transitions or scroll-triggered animations.
- **Easing:** Use custom cubic-bezier easing functions for organic, premium-feeling motion (e.g., `cubic-bezier(0.25, 1, 0.5, 1)`).

## 3. Expert Color Palette Management

- **Harmonious Systems:** Base designs on established color harmonies (complementary, analogous, monochromatic).
- **Design Tokens:** Always use a central source of truth for colors (like CSS Variables or Tailwind config). E.g., `--color-primary-500`.
- **Contrast & Readability:** Strictly adhere to WCAG AAA or at least AA standards for text contrast against backgrounds.
- **Dark Mode / Themes:** Architect CSS variables to easily swap color palettes for responsive theming (Dark/Light mode).
- **Psychology:** Use colors intentionally (e.g., emerald/green for nature/success, blue for trust/calm, earth tones for organic feel).

## Execution Strategy

When this skill is invoked:

1. Identify the core emotion and goal of the UI requested.
2. Define a premium color palette and assign it to CSS variables.
3. Structure the semantic HTML.
4. Style the components using modern layout techniques.
5. Layer in sophisticated, performant animations to bring the interface to life.
