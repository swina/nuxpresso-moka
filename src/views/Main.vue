<template>
  <div class="bg-gray-800 min-h-screen h-screen flex flex-col justify-center items-center">
    <div class="m-auto w-full md:w-1/4">
      <img alt="Moka Logo" class="m-auto w-32" src="../assets/new-logo.png">
      <div class="m-auto text-center font-thin ">
        <div class="text-4xl w-32 m-auto h-32 bg-gray-900 hover:border-gray-200 border-transparent border rounded-full flex flex-col text-gray-300 font-black animate-pulse cursor-pointer" @click="$router.push('dashboard')">
          <div class="m-auto">M O K A</div>
        </div>
        <div class="text-gray-500 text-sm mt-1 font-hairline">S T U D I O</div>
      </div>
      <div class="flex flex-col text-sm text-gray-500" v-if="!user.login">
        <label>User</label>
        <input type="email" v-model="email" class="dark"/>
        <label>Password</label>
        <input type="password" v-model="password" class="dark"/>
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
    password: ''
  }),
  computed:{
    ...mapState ( [ 'moka' , 'user'] )
  },
 
  beforeMount(){
    if ( !this.user.login ){
      console.log ( 'not logged' )
    }
    this.$http.get('components').then( response=> {
      console.log ( response )
    })
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