import { MENU_ICON } from '../../../icons';
import { IMessage } from '../../../model/message.model';
import { MessageService } from '../../../services/message-service';
import './sidebar.css';

export class Sidebar extends HTMLElement {

  private readonly SIDEBAR_HEADER_TEXT = 'Header';
  private _messages: IMessage [] = [];

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = this.render();
    this.loadMessages();
  }

  render(): string {
    return`
      <div class="sidebar-container">
        <div class="sidebar-header">
          <div class="menu-header-text">${this.SIDEBAR_HEADER_TEXT}</div>
          <div class="menu-toggler">${MENU_ICON}</div>
        </div>
        <div class="sidebar-content">
          ${this.renderMessagePreview()}
        </div>
      </div>
    `;
  }

  private renderMessagePreview(): string {
    const result = this._messages.map(item => {
      return `
        <div class="message-preview-item">
          <div class="message-author">${item.author}</div>
        </div>
      `
    });

    return result.join('');
  }

  private loadMessages(): void {
    const messageService = new MessageService();

    messageService.getAllMessages().then(messages => {
      this._messages = messages;

      const content = this.querySelector('.sidebar-content');

      if(content)
        content.innerHTML = this.renderMessagePreview();
     

      content?.addEventListener('click', this.selectMessage.bind(this));
    });
  }

  private selectMessage(event: Event): void {
    event.preventDefault();

    const list = this.querySelector('.sidebar-content')!!;
    const msgElement = event.target as HTMLDivElement;

    const result = msgElement.closest('.message-preview-item')!!;

    if (result.className.includes('selected'))
      return;

    if (result) {

      for(let i = 0; i < list.children.length; i++)
        list.children[i].classList.remove('selected');
  
      result.classList.add('selected');
    }
  }

}


if (!customElements.get('app-sidebar')) { 
  customElements.define("app-sidebar", Sidebar);
}