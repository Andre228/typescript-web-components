import './layout.css'

export class Layout extends HTMLElement {

  private _toggler: HTMLButtonElement | null;

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = this.render();
    const container = this.querySelector('.layout-container')
    container?.appendChild(document.createElement('app-sidebar'));
    container?.appendChild(document.createElement('app-chat'));

    this._toggler = this.querySelector('.sidebar-header .menu-toggler');
    this._toggler?.addEventListener('click', this.toggle.bind(this));
  }

  render(): string {
    return`
      <div class="layout-container">
      </div>
    `;
  }

  toggle(event: Event) {
    const sidebar = this.querySelector('app-sidebar') as HTMLElement;
    const chat = this.querySelector('app-chat') as HTMLElement;
    const text = this.querySelector('.sidebar-header .menu-header-text') as HTMLDivElement;
    const header = this.querySelector('.sidebar-header') as HTMLDivElement;

    if (sidebar.classList[0] === "fade-in") {
      sidebar.classList.remove("fade-in");
      sidebar.classList.add("fade-out");

      chat.classList.remove("fade-in");
      chat.classList.add("fade-out");
      
      text.classList.remove("fade-in-text");
      text.classList.add("fade-out-text");

      header.classList.remove("fade-in-header");
      header.classList.add("fade-out-header");
    } else {
      sidebar.classList.remove("fade-out");
      sidebar.classList.add("fade-in");

      chat.classList.remove("fade-out");
      chat.classList.add("fade-in");

      text.classList.remove("fade-out-text");
      text.classList.add("fade-in-text");

      header.classList.remove("fade-out-header");
      header.classList.add("fade-in-header");
    }
  }
}

if (!customElements.get('app-layout')) { 
  customElements.define("app-layout", Layout);
}