import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/style/globalStyle.scss';
import { registerGlobalComponent } from './untils/layout';

import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import {
  faBars,
  faPencil,
  faFileInvoice,
  faArrowRightFromBracket,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

/* add icons to the library */
library.add(
  faBars,
  faPencil,
  faTrashCan,
  faFileInvoice,
  faArrowRightFromBracket,
  faXmark
);
const app = createApp(App);
registerGlobalComponent(app);

app
  .use(router)
  .use(store)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
