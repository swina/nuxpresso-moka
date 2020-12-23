<template>
    <div class="p-4" v-if="enabled">
        <h3>NUXPRESSO DEPLOY</h3>
        <input type="text" v-model="user.build"/><button @click="deployNuxpresso">Deploy</button>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
    name: 'MokaDeploy',
    data:()=>({
        deploy: ''
    }),
    computed:{
        ...mapState ( ['user'] ),
        enabled(){
            if ( typeof webpackHotUpdate === 'undefined') this.$store.dispatch('message','This option is available only in development mode')
            return typeof webpackHotUpdate != 'undefined' ? true : false 
        }
    },
    methods:{
        deployNuxpresso(){
            axios.post ( this.user.build ,{}).then ( response => {
                console.log ( response )
            })
        }
    }

}
</script>