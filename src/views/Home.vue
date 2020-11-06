<template>
  <div class="bg-gray-800 min-h-screen h-screen flex flex-col justify-center items-center">
    <div class="m-auto">
      <img alt="Vue logo" class="m-auto w-32" src="../assets/new-logo.png">
      <div class="m-auto text-center font-thin ">
        <div class="text-4xl w-32 m-auto h-32 bg-gray-900 hover:border-gray-200 border-transparent border rounded-full flex flex-col text-gray-300 font-black animate-pulse cursor-pointer" @click="$router.push('dashboard')">
          <div class="m-auto">M O K A</div>
        </div>
        <div class="text-gray-500 text-sm mt-1 font-hairline">S T U D I O</div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
  },
  computed:{
    ...mapState ( [ 'moka'] )
  },
 
  beforeMount(){
    this.$http.get('components').then( response=> {
      console.log ( response )
    })
  },
  
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