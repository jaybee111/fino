import store from '../store/Instance';
import LibComponent from '../libs/LibComponent';
import HelperNotification from '../helpers/HelperNotification';

export default class ComponentNotifications extends LibComponent {
  constructor() {
    super({
      store,
    });

    let notificationTimeout;
    store.events.subscribe('stateChangeNotification', () => {
      if (typeof store.state.notification.type !== 'undefined' && typeof store.state.notification.msg !== 'undefined') {
        const notification = new HelperNotification(store.state.notification).render();
        const notificationOld = document.querySelector('.fino-notification.is-active');

        // FadeOut old notification
        if (notificationOld) {
          clearTimeout(notificationTimeout);
          notificationOld.classList.remove('is-active');
        }

        // FadeIn new notification
        notification.classList.add('is-pending');
        document.querySelector('.fino-modal').appendChild(notification);
        const notificationNew = document.querySelector('.fino-notification.is-pending');
        notificationNew.classList.remove('is-pending');
        notificationNew.classList.add('is-active');
        notificationTimeout = setTimeout(() => notificationNew.classList.remove('is-active'), 2000);
      }
    });
  }
}
