<template>
<div v-if="current">
     <div class="fixed bottom-0 z-top left-0 cursor-pointer border bg-gray-800 transform flex flex-row px-2 h-10 mb-10 flex flex-row items-center">
        <i class="material-icons text-gray-400 hover:text-blue-400" @click="opened=!opened" title="Open options">menu</i>
        <div v-if="opened" class="flex flex-row items-center">
            <i class="material-icons text-gray-400 hover:text-blue-400 ml-2" @click="$emit('customize'),$store.dispatch('setAction','customize')" title="Edit component">brush</i>

            <i v-if="current.type != 'grid'  && current.type != 'flex'" class="material-icons text-gray-400 hover:text-blue-400 ml-2" @click="$emit('edit',current),$store.dispatch('setAction','edit')" title="Edit content">edit</i>

            <i v-if="current.type === 'flex'" class="material-icons text-gray-400 hover:text-blue-400 ml-2" @click="$store.dispatch('setAction','addcomponent')" title="Add component">add</i>
            
            <i class="material-icons text-gray-400 hover:text-blue-400 ml-2" @click="copiedElement=current,$emit('copy',current)" title="Copy element">content_copy</i>

            <i v-if="copiedElement && current.type==='grid' || current.type === 'flex'" class="material-icons text-gray-400 hover:text-blue-400 ml-2" @click="$emit('paste')" title="Paste element">content_paste</i>

            <i class="material-icons text-gray-400 hover:text-blue-400 ml-2" @click="$emit('duplicate')" title="Duplicate element">file_copy</i>

            <i class="material-icons text-gray-400 hover:text-blue-400 ml-2" @click="$emit('animations')" title="Animation">motion_photos_on</i>

            <i v-if="current.type==='grid' || current.type === 'flex'" class="material-icons text-gray-400 hover:text-blue-400 ml-2" title="Import component" @click="$store.dispatch('setAction','addreusable')">widgets</i> 


            <i v-if="component && !component.hasOwnProperty('slider')" class="material-icons text-gray-400 hover:text-blue-400 ml-2" title="Preview" @click="$emit('preview')">preview</i>

            <i v-if="component && component.hasOwnProperty('slider')" class="material-icons text-gray-400 hover:text-blue-400 ml-2" title="Preview" @click="$emit('slider')">preview</i>

            <i class="material-icons text-gray-400 hover:text-blue-400 ml-2" title="Save" @click="$emit('save')">save</i>

            <i class="material-icons text-gray-400 hover:text-blue-400 ml-2" v-if="editor.current" @click="$emit('saveblock')" title="Save block as component">archive</i>

            <i class="material-icons text-gray-400 hover:text-blue-400 ml-2" title="Elements tree" @click="$emit('tree')">account_tree</i>

            <i class="material-icons text-gray-400 hover:text-blue-400 ml-2" @click="$emit('delete')" title="Delete element">delete</i>

        </div>
    </div>
    <!--    
    <div style="transform:translateY(-50%);top:50%;" class="fixed top-0 z-top left-0 w-10 pl-2 cursor-pointer border shadow-lg rounded-tr-lg rounded-br-lg bg-gray-800 transform flex flex-col pt-2">
        <i class="material-icons text-gray-400 hover:text-blue-400 mb-2" @click="opened=!opened" title="Open options">menu</i>
        <div v-if="opened" class="flex flex-col">
            <i class="material-icons text-gray-400 hover:text-blue-400 mb-2" @click="$emit('customize'),$store.dispatch('setAction','customize')" title="Edit component">brush</i>

            <i v-if="current.type != 'grid'  && current.type != 'flex'" class="material-icons text-gray-400 hover:text-blue-400 mb-2" @click="$emit('edit',current),$store.dispatch('setAction','edit')" title="Edit content">edit</i>

            <i v-if="current.type === 'flex'" class="material-icons text-gray-400 hover:text-blue-400 mb-2" @click="$emit('reusable')" title="Add component">add</i>
            
            <i class="material-icons text-gray-400 hover:text-blue-400 mb-2" @click="copiedElement=current,$emit('copy',current)" title="Copy element">content_copy</i>

            <i v-if="copiedElement && current.type==='grid' || current.type === 'flex'" class="material-icons text-gray-400 hover:text-blue-400 mb-2" @click="$emit('paste')" title="Paste element">content_paste</i>

            <i class="material-icons text-gray-400 hover:text-blue-400 mb-2" @click="$emit('duplicate')" title="Duplicate element">file_copy</i>

            <i class="material-icons text-gray-400 hover:text-blue-400 mb-2" @click="$emit('animations')" title="Animation">motion_photos_on</i>

            <i v-if="current.type==='grid' || current.type === 'flex'" class="material-icons text-gray-400 hover:text-blue-400 mb-2" title="Import component" @click="$store.dispatch('setAction','addreusable')">system_update_alt</i> 


            <i v-if="component && !component.hasOwnProperty('slider')" class="material-icons text-gray-400 hover:text-blue-400 mb-2" title="Preview" @click="$emit('preview')">preview</i>

            <i v-if="component && component.hasOwnProperty('slider')" class="material-icons text-gray-400 hover:text-blue-400 mb-2" title="Preview" @click="$emit('slider')">preview</i>

            <i class="material-icons text-gray-400 hover:text-blue-400 mb-2" title="Save" @click="$emit('save')">save</i>

            

            <i class="material-icons text-gray-400 hover:text-blue-400 mb-2" v-if="editor.current" @click="$emit('saveblock')" title="Save block as component">widgets</i>

            <i class="material-icons text-gray-400 hover:text-blue-400 mb-2" title="Elements tree" @click="$emit('tree')">account_tree</i>

            <i class="material-icons text-gray-400 hover:text-blue-400 mb-2" @click="$emit('delete')" title="Delete element">delete</i>
        </div>

    </div>
    -->

</div>
</template>

<script>
import  { mapState } from 'vuex'
export default {
    name: 'MokaEditorToolbar',
    data:()=>({
        copiedElement: null,
        opened: false
    }),
    props: [ 'component' ],
    computed:{
        ...mapState ( ['moka','editor'] ),
        current (){
            return this.editor.current
        }
    }
}
</script>