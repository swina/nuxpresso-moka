<template>
  <div class="bg-gray-800 min-h-screen h-screen flex flex-col justify-center items-center">
    <div class="m-auto w-full md:w-1/4">
       <svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   id="svg8"
   version="1.1"
   viewBox="0 0 135.46667 135.46668"
   class="w-16 h-16 m-auto">
  <g
     transform="translate(0,-161.53332)"
     id="layer1">
    <rect
       transform="matrix(0.93817342,0.34616562,-0.95166813,0.30712826,0,0)"
       y="322.19547"
       x="397.90588"
       height="65.536835"
       width="66.15889"
       id="rect4518-4-4"
       style="fill:none;fill-opacity:1;fill-rule:evenodd;stroke:#0f0f0f;stroke-width:0.16160659;stroke-miterlimit:4;stroke-dasharray:1.29285277, 1.29285277;stroke-dashoffset:0;stroke-opacity:1" />
    <rect
       transform="matrix(0.93817342,0.34616563,-0.95166813,0.30712825,0,0)"
       y="301.70334"
       x="377.75974"
       height="65.536835"
       width="66.15889"
       id="rect4518-4"
       style="fill:#afe9dd;fill-opacity:1;fill-rule:evenodd;stroke-width:0.16189831" />
    <rect
       transform="matrix(0.93417962,0.35680308,-0.94847476,0.31685269,0,0)"
       y="265.89914"
       x="341.99258"
       height="65.757492"
       width="66.441734"
       id="rect4518-4-6"
       style="fill:#37c8ab;fill-opacity:1;fill-rule:evenodd;stroke-width:0.16251691" />
    <rect
       transform="matrix(0.93817342,0.34616562,-0.95166813,0.30712826,0,0)"
       y="251.83545"
       x="326.85443"
       height="65.536835"
       width="66.15889"
       id="rect4518-4-0"
       style="fill:#217867;fill-opacity:1;fill-rule:evenodd;stroke-width:0.16189831" />
  </g>
</svg>
      <img alt="Moka Logo" class="m-auto w-32" src="../assets/new-logo.png">
      <div class="m-auto text-center font-thin ">
        <div class="text-4xl w-32 m-auto h-32 bg-gray-900 hover:border-gray-200 border-transparent border rounded-full flex flex-col text-gray-300 font-black animate-pulse cursor-pointer" @click="$router.push('dashboard')">
          <div class="m-auto">M O K A</div>
        </div>
        <div class="text-gray-500 text-sm mt-1 font-hairline">S T U D I O</div>
      </div>
      <div class="flex flex-col w-full text-sm text-gray-500" v-if="!logged && !loginOK">
        <label>User</label>
        <input type="email" v-model="email" class="w-full dark"/>
        <label>Password</label>
        <input type="password" v-model="password" class="w-full dark"/>
        <button class="mt-2" @click="login">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
export default {
  name: 'Main',
  components: {
  },
  data:()=>({
    email: '',
    password: '',
    loginOK: false
  }),
  computed:{
    ...mapState ( [ 'moka' , 'user'] ),
    logged(){
      if ( !this.user.login || !window.localStorage.getItem('nuxpresso-jwt') ){
        this.user.login = false
        return false
      } else {
        return true
      }
    }

  },
 
  beforeMount(){
    if ( !this.user.login || !window.localStorage.getItem('nuxpresso-jwt') ){
      this.user.login = false
      console.log ( 'not logged' )
    }
  },
  methods:{
    login(){
      let vm = this
      this.$http.post(
          'auth/local', {
          identifier: this.email,
          password: this.password,
      })
      .then(response => {
          // Handle success.
          console.log ( response )
          let authenticated = {
              user : response.data.user,
              jwt : response.data.jwt
          }
          vm.$store.dispatch('login',true)
          vm.$store.dispatch('user',response.data.user)
          vm.loginOK = true
          //vm.$store.dispatch ( 'authenticatedUser' , authenticated )
          //vm.$axios.defaults.headers.common = {'Authorization': 'Bearer ' + response.jwt};
          window.localStorage.setItem ( 'nuxpresso-jwt' , "Bearer " + response.data.jwt )
          window.localStorage.setItem ( 'nuxpresso-user' , JSON.stringify(response.data.user) )
          vm.viewForm = false
          vm.enabled = true
          vm.responseClass = 'text-green-500'
          vm.response = 'Welcome ! You are authenticated'
      })
      .catch(error => {
          console.log ( error )
          vm.response = 'Login error. Please retry later'
          vm.responseClass = 'text-red-500'
          
      }); 
    }
  }
  
}
</script>
<style>
.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
            background:rgb(45, 45, 72);
        }
        50% {
            opacity: .5;
            background:rgb(5, 223, 23);
        }
    }
</style>