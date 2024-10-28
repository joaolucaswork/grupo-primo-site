/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import 'sticksy';

export function centralGp() {
  const stickyEl = new Sticksy('.js-sticky-widget');
  // just for demonstration of state handling
  stickyEl.onStateChanged = function (state) {
    if (state === 'fixed') stickyEl.nodeRef.classList.add('widget--fixed');
    else stickyEl.nodeRef.classList.remove('widget--fixed');
  };
}
