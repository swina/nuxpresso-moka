<template>
    <div :data="iscomponent">
        <moka v-if="component" :component="component" @message="setMessage"/>
        
        <transition name="fade">
            <div style="transform: translateX(-50%);left:50%;" class="nuxpresso-admin border-l-4 border-blue-500 fixed bottom-0 m-auto shadow-xl mb-2 bg-gray-800 text-gray-100 text-left p-4 w-1/2  z-top" v-if="message">   
            {{ message }}
            </div>
        </transition>
        
    </div>
</template>

<script>
import Moka from '@/components/moka/moka'
import { mapState } from 'vuex'
export default {
    name: 'MokaStudio',
    data:()=>({
        component: null,
        message: ''
    }),
    components: { Moka },
    computed:{
        ...mapState ( ['moka']),
        iscomponent(){
            !this.moka.component ? this.$router.push('dashboard') : null
            return true
        },
        app_msg(){
            this.message = this.moka.message
        }
    },
    mounted(){
        this.component = this.$store.getters.component
    },
    methods:{
        setMessage(msg){
            this.message = msg
        }
    },
    watch: {
        message(v){
            if ( v ){
                window.setTimeout(()=>{ this.message = '' }, 4000)
            }
        },
    },
  
}
</script>