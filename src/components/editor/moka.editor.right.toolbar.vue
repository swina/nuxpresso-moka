<template>
<div>
    <div style="transform:translateY(-50%);top:50%;" class="fixed top-0 z-top right-0 w-10 pl-2 cursor-pointer border shadow-lg rounded-tl-lg rounded-bl-lg bg-gray-800 transform flex flex-col pt-2">
        
        <i class="material-icons text-gray-400 hover:text-blue-400 mb-2" title="Elements tree" @click="$emit('tree')">account_tree</i>

        <i v-if="current && current.entity" class="material-icons text-gray-400 hover:text-blue-400 mb-2" @click="$emit('customize')" title="Edit component">brush</i>

        <i v-if="current && current.coords.length > 0" class="material-icons text-gray-400 hover:text-blue-400 mb-2" @click="$emit('reusable')" title="Add component">add</i>
        
        <i v-if="current && current.coords && ( current.coords.length === 3 || current.coords.length === 5 )" class="material-icons text-gray-400 hover:text-blue-400 mb-2" @click="copiedElement=current.entity,$emit('copy',current)" title="Copy element">content_copy</i>

        <i v-if="copiedElement" class="material-icons text-gray-400 hover:text-blue-400 mb-2" @click="$emit('paste')" title="Paste element">content_paste</i>

        <i v-if="current && current.entity" class="material-icons text-gray-400 hover:text-blue-400 mb-2" @click="$emit('duplicate',current)" title="Duplicate element">file_copy</i>

        

        <i v-if="current && current.entity" class="material-icons text-gray-400 hover:text-blue-400 mb-2" @click="$emit('animations')" title="Animation">motion_photos_on</i>

        <i class="material-icons text-gray-400 hover:text-blue-400 mb-2" title="Import component" @click="$emit('import')">system_update_alt</i> 

        <i v-if="component && !component.hasOwnProperty('slider')" class="material-icons text-gray-400 hover:text-blue-400 mb-2" title="Preview" @click="$emit('preview')">preview</i>

        <i v-if="component && component.hasOwnProperty('slider')" class="material-icons text-gray-400 hover:text-blue-400 mb-2" title="Preview" @click="$emit('slider')">preview</i>

        <i class="material-icons text-gray-400 hover:text-blue-400 mb-2" title="Save" @click="$emit('save')">save</i>

        <i class="material-icons text-gray-400 hover:text-blue-400 mb-2" v-if="current && current.entity && current.entity.tag==='container'" @click="$emit('saveblock')" title="Save block as component">widgets</i>

        <i v-if="current && current.entity" class="material-icons text-gray-400 hover:text-blue-400 mb-2" @click="$emit('delete')" title="Delete element">delete</i>

    </div>


</div>
</template>

<script>
import  { mapState } from 'vuex'
export default {
    name: 'MokaEditorToolbar',
    data:()=>({
        copiedElement: null
    }),
    props: [ 'current' , 'component' ],
    computed:{
        ...mapState ( ['moka'] )
    }
}
</script>