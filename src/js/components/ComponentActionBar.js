import Feather from 'feather-icons';
import store from '../store/Instance';
import LibComponent from '../libs/LibComponent';
import LibRequest from '../libs/LibRequest';
import HelperBtn from '../helpers/HelperBtn';

export default class ComponentFolderList extends LibComponent {
  constructor() {
    super({
      store,
      element: document.querySelector('.fino-actionbar'),
    });
    store.events.subscribe('stateChangeSelectedFolderPath', () => this.render());
    store.events.subscribe('stateChangeClipboard', () => this.render());
  }

  render() {
    let node;
    if (store.state.selectedFileType === 'folder') {
      node = this.getFolderBar();
    } else if (store.state.selectedFileType === 'file') {
      node = this.getFileBar();
    }
    if (typeof node !== 'undefined') {
      this.element.innerHTML = '';
      this.element.insertAdjacentElement('afterbegin', node);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getFolderBar() {
    const actionBar = document.createElement('ul');

    /**
     * Copy button
     */
    if (typeof store.state.clipboard.type === 'undefined') {
      const btnCopy = this.getBtnCopy();
      const liElCopy = document.createElement('li');
      liElCopy.classList.add('fino-actionbar__item');
      liElCopy.appendChild(btnCopy);
      actionBar.appendChild(liElCopy);
    }

    /**
     * Cut button
     */
    if (typeof store.state.clipboard.type === 'undefined') {
      const btnCut = this.getBtnCut();
      const liElCut = document.createElement('li');
      liElCut.classList.add('fino-actionbar__item');
      liElCut.appendChild(btnCut);
      actionBar.appendChild(liElCut);
    }

    /**
     * Insert button
     */
    if (
      typeof store.state.clipboard.type !== 'undefined'
    ) {
      const btnInsert = this.getBtnInsert();
      const liElInsert = document.createElement('li');
      liElInsert.classList.add('fino-actionbar__item');
      liElInsert.appendChild(btnInsert);
      actionBar.appendChild(liElInsert);
    }

    /**
     * Clear clipboad button
     */
    if (typeof store.state.clipboard.type !== 'undefined') {
      const btnClearClipboard = this.getBtnClearClipboard();
      const liElClearClipboard = document.createElement('li');
      liElClearClipboard.classList.add('fino-actionbar__item');
      liElClearClipboard.appendChild(btnClearClipboard);
      actionBar.appendChild(liElClearClipboard);
    }

    /**
     * New folder button
     */
    if (typeof store.state.clipboard.type === 'undefined') {
      const btnNewFolder = this.getBtnNewFolder();
      const liElNewFolder = document.createElement('li');
      liElNewFolder.classList.add('fino-actionbar__item');
      liElNewFolder.appendChild(btnNewFolder);
      actionBar.appendChild(liElNewFolder);
    }

    /**
     * Delete folder button
     */
    if (typeof store.state.clipboard.type === 'undefined') {
      const btnDeleteFolder = this.getBtnDeleteFolder();
      const liElDeleteFolder = document.createElement('li');
      liElDeleteFolder.classList.add('fino-actionbar__item');
      liElDeleteFolder.appendChild(btnDeleteFolder);
      actionBar.appendChild(liElDeleteFolder);
    }

    return actionBar;
  }

  // eslint-disable-next-line class-methods-use-this
  getBtnCopy() {
    const attrCopy = {
      labelHtml: `${Feather.icons.copy.toSvg({ 'stroke-width': 1.3, width: 20, height: 20 })} ${store.state.settings.translation.btnCopy}`,
      attributes: [
        { href: '#' },
        { title: store.state.settings.translation.btnCopy },
        { class: 'fino-btn' },
      ],
    };
    const btnCopy = new HelperBtn(attrCopy).render();
    btnCopy.addEventListener('click', (e) => {
      e.preventDefault();
      const data = {
        type: 'copyFolder',
        value: store.state.selectedFolderPath,
      };
      store.commit('clipboard', data);
    });

    return btnCopy;
  }

  // eslint-disable-next-line class-methods-use-this
  getBtnCut() {
    const attrCut = {
      labelHtml: `${Feather.icons.scissors.toSvg({ 'stroke-width': 1.3, width: 20, height: 20 })} ${store.state.settings.translation.btnCut}`,
      attributes: [
        { href: '#' },
        { title: store.state.settings.translation.btnCut },
        { class: 'fino-btn' },
      ],
    };
    const btnCut = new HelperBtn(attrCut).render();
    btnCut.addEventListener('click', (e) => {
      e.preventDefault();
      const data = {
        type: 'cutFolder',
        value: store.state.selectedFolderPath,
      };
      store.commit('clipboard', data);
    });

    return btnCut;
  }

  // eslint-disable-next-line class-methods-use-this
  getBtnClearClipboard() {
    const attrClearClipboard = {
      labelHtml: `${Feather.icons['x-circle'].toSvg({ 'stroke-width': 1.3, width: 20, height: 20 })} ${store.state.settings.translation.btnClearClipboard}`,
      attributes: [
        { href: '#' },
        { title: store.state.settings.translation.btnClearClipboard },
        { class: 'fino-btn' },
      ],
    };
    const btnClearClipboard = new HelperBtn(attrClearClipboard).render();
    btnClearClipboard.addEventListener('click', (e) => {
      e.preventDefault();
      store.commit('clipboard', {});
    });
    return btnClearClipboard;
  }

  // eslint-disable-next-line class-methods-use-this
  getBtnInsert() {
    const classArr = ['fino-btn'];
    const clipboardParentPath = store.state.clipboard.value.split('/');
    clipboardParentPath.pop();
    const clipboardParentPathStr = clipboardParentPath.join('/');
    if (
      typeof store.state.clipboard.type === 'string'
      && (store.state.clipboard.type === 'cutFolder' || store.state.clipboard.type === 'copyFolder')
      && (
        store.state.selectedFolderPath.includes(store.state.clipboard.value)
        || clipboardParentPathStr === store.state.selectedFolderPath
      )
    ) {
      classArr.push('disabled');
    }
    const attrInsert = {
      labelHtml: `${Feather.icons['arrow-down'].toSvg({ 'stroke-width': 1.3, width: 20, height: 20 })} ${store.state.settings.translation.btnInsert}`,
      attributes: [
        { href: '#' },
        { title: store.state.settings.translation.btnInsert },
        { class: classArr },
      ],
    };
    const btnInsert = new HelperBtn(attrInsert).render();
    btnInsert.addEventListener('click', async (e) => {
      e.preventDefault();
      const requestParams = { method: store.state.settings.api.endpoints.folderMove.method };
      const request = new LibRequest(
        store.state.settings.api.endpoints.folderMove.url,
        requestParams,
      );
      await request.send();
      store.commit('clipboard', {});
      store.dispatch('updateFolderList');
    });

    return btnInsert;
  }

  // eslint-disable-next-line class-methods-use-this
  getBtnNewFolder() {
    const attrNewFolder = {
      labelHtml: `${Feather.icons['folder-plus'].toSvg({ 'stroke-width': 1.3, width: 20, height: 20 })} ${store.state.settings.translation.btnNewFolder}`,
      attributes: [
        { href: '#' },
        { title: store.state.settings.translation.btnNewFolder },
        { class: 'fino-btn' },
      ],
    };
    const btnNewFolder = new HelperBtn(attrNewFolder).render();

    return btnNewFolder;
  }

  // eslint-disable-next-line class-methods-use-this
  getBtnDeleteFolder() {
    const attrDeleteFolder = {
      labelHtml: `${Feather.icons['folder-minus'].toSvg({ 'stroke-width': 1.3, width: 20, height: 20 })} ${store.state.settings.translation.btnDelete}`,
      attributes: [
        { href: '#' },
        { title: store.state.settings.translation.btnDelete },
        { class: 'fino-btn' },
      ],
    };
    const btnDeleteFolder = new HelperBtn(attrDeleteFolder).render();

    return btnDeleteFolder;
  }

  // eslint-disable-next-line class-methods-use-this
  getFileBar() {

  }
}
