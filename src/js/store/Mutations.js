export default {
  settings(state, payload) {
    state.settings = payload;

    return state;
  },
  folderList(state, payload) {
    state.folderList = payload;

    return state;
  },
  selectedFileType(state, payload) {
    state.selectedFileType = payload;

    return state;
  },
  selectedFolderPath(state, payload) {
    state.selectedFolderPath = payload;

    return state;
  },
  clipboard(state, payload) {
    state.clipboard = payload;

    return state;
  },
  currentRequests(state, payload) {
    state.currentRequests = payload;

    return state;
  },
};
