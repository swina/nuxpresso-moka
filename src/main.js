import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/tailwind.css'
import '@/assets/fonts/fonts.css'

import './plugins'
import api from "./plugins/api";
Vue.prototype.$http = api; 
api.defaults.timeout = 10000;
Vue.prototype.$http = api 

import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import _ from 'lodash';    
Object.defineProperty(Vue.prototype, '$_', { value: _ });


// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:1337/graphql',
})

import VueDraggableResizable from 'vue-draggable-resizable'

// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

Vue.component('vue-draggable-resizable', VueDraggableResizable)



// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

import VueApollo from 'vue-apollo'

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

import MokaMedia from '@/components/media/media'
Vue.component('MokaMedia',MokaMedia)

import VueHtml2Canvas from "vue-html2canvas";
Vue.use(VueHtml2Canvas);

//import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
