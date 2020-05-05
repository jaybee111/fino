import Feather from 'feather-icons';

export default class HelperNotification {
  /**
   * @param data
   */
  constructor(data) {
    this.data = data;
  }

  /**
   * Render Document
   * @returns {HTMLDivElement}
   */
  render() {
    const type = (typeof this.data.type === 'string' ? this.data.type : 'primary');

    const ntf = document.createElement('div');
    ntf.classList.add('fino-notification', `fino-notification-${type}`);

    const ntfIcon = document.createElement('div');
    ntfIcon.classList.add('fino-notification__icon');
    let iconType = 'alert-triangle';
    if (type === 'success') {
      iconType = 'check-circle';
    }
    ntfIcon.innerHTML = Feather.icons[iconType].toSvg({ 'stroke-width': 1.5, width: 26, height: 26 });
    ntf.appendChild(ntfIcon);

    const ntfContent = document.createElement('div');
    ntfContent.classList.add('fino-notification__content');
    ntfContent.innerText = (typeof this.data.type === 'string' ? this.data.msg : '');
    ntf.appendChild(ntfContent);

    return ntf;
  }
}
