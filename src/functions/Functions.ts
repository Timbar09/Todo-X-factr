/**
 * @description Add class to element
 * @param element HTMLElement - element to add class to
 * @param className string - class name to add
 */

export const addClass = (element: HTMLElement, className: string): void => {
  if (!element) return;

  element.classList.add(className);
};

/**
 * @description Remove class from element
 * @param element HTMLElement - element to remove class from
 * @param className string - class name to remove
 */

export const removeClass = (element: HTMLElement, className: string): void => {
  if (!element) return;

  element.classList.remove(className);
};

/**
 * @description Toggle class on element
 * @param element HTMLElement - element to toggle class on
 * @param className string - class name to toggle
 */

export const toggleClass = (element: HTMLElement, className: string): void => {
  if (!element) return;

  element.classList.toggle(className);
};

/**
 * @description Selects a theme template
 * @param template string - theme template to select
 * @returns void
 * @example selectThemeTemplate("default")
 */

export const selectThemeTemplate = (template: string): void => {
  const body = document.body;

  body.setAttribute("data-template", template);
  localStorage.setItem("themeTemplate", template);
};

/**
 * @description Get theme template
 * @returns string
 */

export const getThemeTemplate = (): string => {
  const template = localStorage.getItem("themeTemplate");

  if (!template) return "default";

  return template;
};

export const openEntryForm = (): void => {
  const entryForm = document.getElementById("itemEntryFormContainer");

  if (!entryForm) return;

  const lockFocus = (): void => {
    if (!entryForm.classList.contains("open")) return;

    const focusableElements = entryForm.querySelectorAll(
      "input, button"
    ) as NodeListOf<HTMLElement>;
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    entryForm.addEventListener("keydown", (event) => {
      if (event.key === "Tab" && event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          firstElement.focus();
        }
      } else if (event.key === "Tab") {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          lastElement.focus();
        }
      }
    });
  };

  addClass(entryForm, "open");
  lockFocus();
};
