// import Store from '../store/Store';

export default class LibComponent {
  constructor(props = {}) {
    // const self = this;

    this.render = this.render || function () {};

    /*
    if (props.store instanceof Store) {
      props.store.events.subscribe('stateChange', () => self.render());
    }
    */

    if (props.hasOwnProperty('element')) {
      this.element = props.element;
    }
  }
}
