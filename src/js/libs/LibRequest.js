export default class LibRequest {
  constructor(url = '', params = {}, store = {}) {
    this.url = url;
    this.params = params;
    this.store = store;
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
    const requests = this.store.state.currentRequests;
    requests.push({
      requestUrl: this.url,
      controller,
    });
    this.store.commit('currentRequests', requests);

    try {
      const response = await fetch(this.url, fetchParams)
        .finally(() => {
          // Remove request from current requests
          const currentRequests = this.store.state.currentRequests
            .filter((item) => item.requestUrl !== this.url);
          this.store.commit('currentRequests', currentRequests);
        });

      return response.json();
    } catch (err) {
      const notification = {
        type: 'danger',
        msg: err,
      };
      this.store.commit('notification', notification);
      return {
        error: true,
        msg: err,
      };
    }
  }
}
