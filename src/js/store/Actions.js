// eslint-disable-next-line import/no-cycle
import LibRequest from '../libs/LibRequest';

export default {
  async updateFolderList(store) {
    const requestParams = { method: store.state.settings.api.endpoints.folderList.method };
    const request = new LibRequest(
      store.state.settings.api.endpoints.folderList.url,
      requestParams,
    );
    const items = await request.send();
    store.commit('folderList', items);
  },
};
