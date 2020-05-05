import Feather from 'feather-icons';
import store from '../store/Instance';
import LibComponent from '../libs/LibComponent';
import HelperOutput from '../helpers/HelperOutput';

export default class ComponentFolderList extends LibComponent {
  constructor() {
    super({
      store,
      element: document.querySelector('.fino-folder-list'),
    });
    store.dispatch('updateFolderList');
    store.events.subscribe('stateChangeFolderList', () => this.render());
  }

  render() {
    this.element.insertAdjacentHTML('afterbegin', this.getList(store.state.folderList));

    const folderEl = document.querySelectorAll('.fino-folder-list__name');
    folderEl.forEach((item) => {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        const el = this;
        const parent = el.closest('.fino-folder-list__item');
        const currentSelected = document.querySelector('.fino-folder-list__item.is-selected');
        if (currentSelected) {
          currentSelected.classList.remove('is-selected');
        }
        if (parent.querySelector('ul')) {
          parent.classList.add('is-open');
        }
        parent.classList.add('is-selected');
        store.commit('selectedFileType', 'folder');
        store.commit('selectedFolderPath', el.getAttribute('data-path'));
      });
    });

    const accordionHandlerEl = document.querySelectorAll('.fino-folder-list__accordion-handler');
    accordionHandlerEl.forEach((item) => {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        const el = this;
        const parent = el.closest('.fino-folder-list__item');
        if (parent.classList.contains('is-open')) {
          parent.classList.remove('is-open');
        } else {
          parent.classList.add('is-open');
        }
      });
    });
  }

  getList(items) {
    if (!items.length) {
      return '';
    }
    const list = `<ul class="is-open">
      ${items.map((item) => `
        <li class="fino-folder-list__item">
          <div class="fino-folder-list__name-wrapper">
            <a class="fino-folder-list__name" href="#" data-path="${item.path}">
                ${Feather.icons.folder.toSvg({ width: 20, height: 20 })}
                <span>${HelperOutput.getAbbr(item.name)}</span>
            </a>
            ${item.children && item.children.length ? `<a class="fino-folder-list__accordion-handler" href="#">${Feather.icons['chevron-down'].toSvg({ width: 20, height: 20 })}</a>` : ''}
          </div>
          ${item.children ? this.getList(item.children) : ''}
        </li>
      `).join('')}
      </ul>`;
    return list;
  }
}
