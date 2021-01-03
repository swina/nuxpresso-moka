<template>
  <div id="app">
    
    <router-view/>
    <!--
    <transition name="fade">
      <div style="transform: translateX(-50%);left:50%;" class="nuxpresso-admin border-l-4 border-blue-500 fixed bottom-0 m-auto shadow-xl mb-2 bg-gray-200 text-left p-4 w-1/2 z-50" v-if="message" @message="setMessage">
      {{ message }}
      </div>
    </transition>
    -->
    <transition name="fade">
        <div style="transform: translateX(-50%);left:50%;" class="border-l-4 border-blue-500 fixed bottom-0 m-auto shadow-xl mb-2 bg-gray-800 text-gray-200 text-left p-4 w-1/2  z-top" v-if="message">   
        {{ message }}
        </div>
    </transition>
  </div>
</template>

<script>
import WebFontLoader from 'webfontloader';
import FontFaceObserver from 'fontfaceobserver'
import { mapState } from 'vuex'
export default {
  name: 'App',
  data:()=>({
    message: ''
  }),
  computed:{
    ...mapState ( ['moka'] ),
    
  },
  watch: {
    '$store.state.moka.message':function(msg){
      this.setMessage ( msg )
    },
    message(v){
        if ( v ){
            window.setTimeout(()=>{ 
              this.message = ''
              this.$store.dispatch('message','') 
            }, 4000)
        }
    },
  },
  methods: {
    setMessage(msg){
      this.message = msg
    },
  },
  mounted(){
    if ( window.localStorage.getItem('nuxpresso-jwt') ){
      this.$http.defaults.headers.common = {
          'Authorization': window.localStorage.getItem('nuxpresso-jwt')
      }
      this.$http.get('users/me').then ( resp => {
        this.$store.dispatch ( 'message' , 'Welcome back ' + resp.data.username )
        this.$store.dispatch('login',true)
        this.$store.dispatch('user',JSON.parse(JSON.stringify(window.localStorage.getItem('nuxpresso-user'))))   
      }).catch ( error => {
        this.$store.dispatch('message','You are not authenticated! Save/Update is disabled')
        console.log ( error )
      })
      //this.$store.dispatch('loadComponents')
      this.$store.dispatch('loadElements')
      //this.$store.dispatch('loadMedia')
      //this.$store.dispatch('loading',false)
    }
    
  }
}
</script>

<style>

::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }
  ::-webkit-scrollbar-thumb {
    background: #739eb0;
    border: 0px none #ffffff;
    border-radius: 50px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #ffffff;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #000000;
  }
  ::-webkit-scrollbar-track {
    background: #ededed;
    border: 0px none #ffffff;
    border-radius: 40px;
  }
  ::-webkit-scrollbar-track:hover {
    background: #ebebeb;
  }
  ::-webkit-scrollbar-track:active {
    background: #333333;
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }
</style>