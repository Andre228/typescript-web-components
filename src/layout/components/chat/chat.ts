import { MENU_ICON } from '../../../icons';
import './chat.css';

export class Chat extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = this.render();
  }

  render(): string {
    return`
      <div class="chat-container">
      </div>
    `;
  }
}

if (!customElements.get('app-chat')) { 
  customElements.define("app-chat", Chat);
}