import store from '../store/Store';
import Component from '../libs/LibComponent';

export default class List extends Component {
  constructor() {
    super({
      // eslint-disable-next-line no-undef
      store,
      element: document.querySelector('.js-items'),
    });
  }

  render() {
    const self = this;

    if (store.state.items.length === 0) {
      self.element.innerHTML = '<p class="no-items">You\'ve done nothing yet &#x1f622;</p>';
      return;
    }

    self.element.innerHTML = `
      <ul class="app__items">
        ${store.state.items.map((item) => `
            <li>${item}<button aria-label="Delete this item">×</button></li>
          `).join('')}
      </ul>
    `;

    self.element.querySelectorAll('button').forEach((button, index) => {
      button.addEventListener('click', () => {
        store.dispatch('clearItem', { index });
      });
    });
  }
}
