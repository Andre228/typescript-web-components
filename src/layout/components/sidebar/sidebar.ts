import { MENU_ICON } from '../../../icons';
import './sidebar.css';

export class Sidebar extends HTMLElement {

  private _toggler: HTMLButtonElement | null;
  private readonly SIDEBAR_HEADER_TEXT = 'Header';

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = this.render();

    this._toggler = this.querySelector('.sidebar-header .menu-toggler');
    this._toggler?.addEventListener('click', this.toggle.bind(this));
  }

  render(): string {
    return`
      <div class="sidebar-container">
        <div class="sidebar-header">
          <div class="menu-header-text">${this.SIDEBAR_HEADER_TEXT}</div>
          <div class="menu-toggler">${MENU_ICON}</div>
        </div>
        <div class="sidebar-content"></div>
      </div>
    `;
  }

  toggle(event: Event) {
    const text = this.querySelector('.sidebar-header .menu-header-text') as HTMLDivElement;
    const header = this.querySelector('.sidebar-header') as HTMLDivElement;
    if (this.classList[0] === "fade-in") {
      this.classList.remove("fade-in");
      this.classList.add("fade-out");
      
      text.classList.remove("fade-in-text");
      text.classList.add("fade-out-text");

      header.classList.remove("fade-in-header");
      header.classList.add("fade-out-header");
    } else {
      this.classList.remove("fade-out");
      this.classList.add("fade-in");

      text.classList.remove("fade-out-text");
      text.classList.add("fade-in-text");

      header.classList.remove("fade-out-header");
      header.classList.add("fade-in-header");
    }
  }
}


if (!customElements.get('app-sidebar')) { 
  customElements.define("app-sidebar", Sidebar);
}