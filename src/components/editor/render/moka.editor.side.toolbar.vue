<template>
<div v-if="current">
     <div class="fixed bottom-0 z-top left-0 cursor-pointer border bg-gray-800 w-full transform flex flex-row px-2 h-10 mb-10 items-center">
        <i class="material-icons text-gray-400 bg-gray-800 hover:text-blue-400" @click="opened=!opened" title="Open options">{{ current.icon }}</i>
        <div v-if="opened && editor.current.tag != 'document'" class="bg-gray-800 flex flex-row w-full">
            
            <i v-if="current.type === 'flex'" class="material-icons text-gray-400 hover:text-blue-400 ml-6" @click="$store.dispatch('setAction','addcomponent')" title="Add block/element">add</i>
            

            <i v-if="current.type != 'grid'  && current.type != 'flex'" class="material-icons text-gray-400 hover:text-blue-400 ml-6" @click="$emit('edit',current),$store.dispatch('setAction','edit')" title="Edit content">edit</i>

            <i class="material-icons text-gray-400 hover:text-blue-400 ml-6" @click="$emit('customize'),$store.dispatch('setAction','customize')" title="Edit component">brush</i>
            
            <i v-if="current.type==='grid' || current.type === 'flex'" class="material-icons text-gray-400 hover:text-blue-400 ml-6" title="Add reusable block" @click="$store.dispatch('setAction','addreusable')">widgets</i> 
            
            <i class="material-icons text-gray-400 hover:text-blue-400 ml-6" @click="copiedElement=current,$emit('copy',current)" title="Copy element">content_copy</i>

            <i v-if="copiedElement && current.type==='grid' || current.type === 'flex'" class="material-icons text-gray-400 hover:text-blue-400 ml-6" @click="$emit('paste')" title="Paste element">content_paste</i>

            <i class="material-icons text-gray-400 hover:text-blue-400 ml-6" @click="$emit('duplicate')" title="Duplicate element">file_copy</i>

            <i class="material-icons text-gray-400 hover:text-blue-400 ml-6" @click="$emit('animations')" title="Animation">motion_photos_on</i>

            <i class="material-icons text-gray-400 hover:text-blue-400 ml-6" v-if="editor.current" @click="$emit('saveblock')" title="Save block as component">archive</i>

            <i class="material-icons text-gray-400 hover:text-blue-400 ml-6" title="Elements tree" @click="$emit('tree')">account_tree</i>

            <i class="material-icons text-gray-400 hover:text-blue-400 ml-6" @click="$emit('delete')" title="Delete element">delete</i>

        </div>
    </div>
</div>
</template>

<script>
import  { mapState } from 'vuex'
export default {
    name: 'MokaEditorToolbar',
    data:()=>({
        copiedElement: null,
        opened: true
    }),
    props: [ 'component' ],
    computed:{
        ...mapState ( ['moka','editor'] ),
        current (){
            return this.editor.current
        }
    },
}
</script>