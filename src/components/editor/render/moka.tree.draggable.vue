<template>
    <div class="absolute text-xs font-sans w-full overflow-y-auto">
        <i class="material-icons absolute top-0 right-0 m-1" @click="$emit('close')">close</i>
        <div class="items-center flex flex-row" @click="current=null,$emit('treeroot')">
            <i class="material-icons">web</i> Root
        </div>
        <moka-tree-elements v-if="doc.hasOwnProperty('blocks')" :expand="false" :level="0" :doc="doc" @selected="selected"/>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import MokaTreeElements from '@/components/editor/render/moka.tree.elements'
export default {
    name: 'MokaTree',
    components: { draggable , MokaTreeElements },
    data:()=>({
        current: null
    }),
    props: [ 'doc' ],
    methods:{
        selected ( el ){
            console.log ( 'tree selected => ' , el )
            this.$emit ( 'treeselect' , [0] , el )
        }
    }

}
</script>

<style>
ul.tree { margin-left:0rem; }
ul.tree > li { margin-left:0rem; }
</style>