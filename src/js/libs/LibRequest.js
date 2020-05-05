// eslint-disable-next-line import/no-cycle
import store from '../store/Instance';
import HelperNotification from '../helpers/HelperNotification';

export default class LibRequest {
  constructor(url = '', params = {}) {
    this.url = url;
    this.params = params;
  }

  // eslint-disable-next-line class-methods-use-this
  async send() {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchParams = {
      ...this.params,
      signal,
    };
    // controller.abort.bind(controller) // notice binding context
    // Add request to current requests
    const requests = store.state.currentRequests;
    requests.push({
      requestUrl: this.url,
      controller,
    });
    store.commit('currentRequests', requests);

    const response = await fetch(this.url, fetchParams)
      .catch(() => {
        const ntfData = {
          type: 'danger',
          msg: 'errorDefault',
        };
        const ntf = new HelperNotification(ntfData).render();
        document.querySelector('.fino-modal').appendChild(ntf);
      })
      .finally(() => {
        // Remove request from current requests
        const currentRequests = store.state.currentRequests
          .filter((item) => item.requestUrl !== this.url);
        store.commit('currentRequests', currentRequests);
      });
    return response.json();
  }
}
