// CSS
import './css/btn.scss';
import './css/modal.scss';
import './css/actionbar.scss';
import './css/folder_list.scss';
import './css/file_list.scss';
import './css/notifications.scss';

// Store
import store from './js/store/Instance';

// Layout
import ComponentModal from './js/components/ComponentModal';
import ComponentFolderList from './js/components/ComponentFolderList';
import ComponentActionBar from './js/components/ComponentActionBar';

// Translation
import I18nDe from './js/i18n/I18nDe';
import I18nEn from './js/i18n/I18nEn';

// Helpers

/**
 * @TODO Conditional Loading
 * if (process.env.NODE_ENV === 'development') {
  import('./server')
    .then((makeServer) => {
      makeServer.default('development');
    });
  *  }
 *
 */
import makeServer from './server';

if (process.env.NODE_ENV === 'development') {
  makeServer('development');
}

export default class Fino {
  static init(customSettings = {}) {
    // Merge the default settings with custom settings
    const defaultSettings = {
      fallbackLang: 'en',
      i18n: {
        de: I18nDe,
        en: I18nEn,
      },
      api: {
        key: '',
        endpoints: {
          folderList: { method: 'GET', url: '/api/folder' },
          folderEdit: { method: 'POST', url: '/api/folders' },
          folderMove: { method: 'PUT', url: '/api/folders/type/:type' },
        },
      },
    };
    const settings = { ...defaultSettings, ...customSettings };

    // Set current language
    settings.lang = (typeof document.querySelector('html').getAttribute('lang') !== 'undefined' ? document.querySelector('html').getAttribute('lang') : settings.fallbackLang);

    // Merge custom translations with default translations
    if (typeof customSettings.i18n === 'object') {
      if (typeof defaultSettings.i18n[settings.lang] === 'object' && typeof customSettings.i18n[settings.lang] === 'object') {
        settings.i18n[settings.lang] = {
          ...defaultSettings.i18n[settings.lang],
          ...customSettings.i18n[settings.lang],
        };
      }
    }

    if (typeof settings.i18n[settings.lang] === 'object') {
      settings.translation = settings.i18n[settings.lang];
    } else {
      settings.translation = settings.i18n[settings.fallbackLang];
    }
    store.commit('settings', settings);

    const body = document.querySelector('body');
    const bg = document.createElement('div');
    bg.classList.add('fino-modal-wrapper');
    body.appendChild(bg);
    const modal = new ComponentModal();
    modal.render();
    const folderList = new ComponentFolderList();
    folderList.render();
    const actionBar = new ComponentActionBar();
    actionBar.render();

    return settings;
  }
}
