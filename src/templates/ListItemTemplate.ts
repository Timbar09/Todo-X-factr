import FullList from "../model/FullList";
import CategoryList from "../model/CategoryList";
import ListItem from "../model/ListItem";
import ListTemplate from "./ListTemplate";

export default class ListItemTemplate {
  element: HTMLLIElement;

  constructor(
    item: ListItem,
    fullList: FullList,
    categoryList: CategoryList,
    listTemplate: ListTemplate
  ) {
    this.element = document.createElement("li");
    this.element.className = "app__task--list__item";

    const checkboxContainer = document.createElement("div");
    checkboxContainer.className = "app__task--list__item--checkbox";

    const checkboxOuntlineColor = categoryList.findCategoryById(
      item.categoryId
    )?.color;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = item.id;
    checkbox.tabIndex = 0;
    checkbox.checked = item.checked;
    checkbox.style.setProperty(
      "--outline-color",
      checkboxOuntlineColor as string
    );
    checkboxContainer.appendChild(checkbox);

    checkbox.addEventListener("change", () => {
      item.checked = checkbox.checked;
      fullList.save();
    });

    const listItemNameContainer = document.createElement("label");
    listItemNameContainer.htmlFor = item.id;

    const listItenName = document.createElement("span");
    listItenName.className = "app__task--list__item--text";
    listItenName.textContent = item.title;
    listItemNameContainer.appendChild(listItenName);
    checkboxContainer.appendChild(listItemNameContainer);
    this.element.appendChild(checkboxContainer);

    const deleteButtonContainer = document.createElement("div");
    deleteButtonContainer.className = "app__task--list__item--button-container";

    const deleteButton = document.createElement("button");
    deleteButton.className = "app__task--list__item--button";
    deleteButton.tabIndex = 0;
    deleteButton.ariaLabel = "Delete item";

    const deleteButtonIcon = document.createElement("span");
    deleteButtonIcon.className = "material-symbols-outlined";
    deleteButtonIcon.textContent = "delete";
    deleteButton.appendChild(deleteButtonIcon);
    deleteButtonContainer.appendChild(deleteButton);

    this.element.appendChild(deleteButtonContainer);

    deleteButton.addEventListener("click", () => {
      fullList.removeItem(item.id);
      listTemplate.render(fullList, categoryList);
    });
  }
}
