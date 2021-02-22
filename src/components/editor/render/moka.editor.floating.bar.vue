<template>
    
    <div class="z-highest absolute top-0 left-0 ml-2 p-1 -mt-2  h-6 w-auto bg-gray-800 text-gray-300 text-xs rounded-2xl items-center flex flex-row justify-around">
        
        <i class="transform scale-100 material-icons text-lime-400 hover:text-red-500  text-sm mr-2" v-if="doc.icon">{{doc.icon}}</i>
        
        <i class="transform scale-100 material-icons text-lime-400 hover:text-red-500 text-sm mr-2" v-if="!doc.icon">select_all</i>
        
        <i class="transform scale-100 material-icons hover:text-blue-500  text-base mr-2" @click="$emit('moveup')" title="Move up">expand_less</i>
        
        <i v-if="doc.hasOwnProperty('popup')" class="transform scale-100 material-icons hover:text-blue-500  text-base mr-2" @click="$store.dispatch('setAction','popupsettings')" title="Popup settings">settings</i>

        <i v-if="doc.type==='flex' || doc.type==='grid'" class="mr-2 material-icons hover:text-blue-500 text-sm leading-4" @click="$store.dispatch('setAction','addcomponent')" title="Add element">add</i>

        <i v-if="doc.tag==='form'" class="mr-2 material-icons hover:text-blue-500 text-sm leading-4" @click="$store.dispatch('setAction','formsetting')" title="Settings">settings</i> 
        
        <i class="mr-2 material-icons hover:text-blue-500 text-sm leading-4 " @click="$store.dispatch('setAction','customize')" title="Customize">brush</i>
        
        <i v-if="doc.type === 'flex' || doc.type==='grid'" class="material-icons text-gray-400 hover:text-blue-400 mr-2" title="Add block" @click="$store.dispatch('setAction','addreusable')">widgets</i> 
        
        <i class="mr-2 material-icons hover:text-blue-500 text-sm leading-4 " @click="$store.dispatch('setAction','delete')" title="Delete">delete</i>

    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'MokaEditorFloatingBar',
    props: [ 'doc' ],
    computed:{
        ...mapState ( ['editor'] )
    },
    mounted(){
    window.addEventListener("keydown", e => {
        if ( e.altKey && e.code === 'KeyM' ){
                this.$emit('moveup')
            }
        })
    }
}
</script>