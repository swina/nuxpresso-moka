import Vue from 'vue'
import utils from './utils.js'
//import serializer from './serializer.js'
import editor from './editor.js'
import classes from './tw.classes.js'
import animator from './gsap.js'

Vue.use(utils)
Vue.use(animator)
Vue.use(editor)
Vue.use(classes)
//Vue.use(slider)