import Feather from 'feather-icons';
import store from '../store/Instance';
import LibComponent from '../libs/LibComponent';
import HelperBtn from '../helpers/HelperBtn';

export default class ComponentModal extends LibComponent {
  constructor() {
    super({
      store,
      element: document.querySelector('.fino-modal-wrapper'),
    });
  }

  render() {
    const self = this;
    self.element.insertAdjacentHTML('afterbegin', `
      <div class="fino-modal">
        <div class="fino-modal__body">
            <div class="fino-actionbar"></div>
            <div class="fino-modal__list-wrapper">
                <div class="fino-folder-list"></div>
                <div class="fino-file-list"></div>
            </div>
        </div>
      </div>
    `);
    document.querySelector('.fino-modal').insertAdjacentElement('afterbegin', self.getHeader());
  }

  // eslint-disable-next-line class-methods-use-this
  getHeader() {
    const divHeader = document.createElement('div');
    divHeader.classList.add('fino-modal__header');

    // Add Close - Button to Header
    const attr = {
      labelHtml: Feather.icons['x-circle'].toSvg({ 'stroke-width': 1.3 }),
      attributes: [
        { href: '#' },
        { title: store.state.settings.translation.modalBtnClose },
        { class: 'fino-modal__close-handler' },
      ],
    };
    const btnHeaderClose = new HelperBtn(attr).render();
    btnHeaderClose.addEventListener('click', (e) => {
      e.preventDefault();
      store.commit('modalOpen', false);
    });
    divHeader.appendChild(btnHeaderClose);

    return divHeader;
  }
}
