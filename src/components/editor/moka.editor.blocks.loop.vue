<template> 
    <div :class="Object.values(doc.css) + ' p-2 z-10'" v-if="doc" :style="stile(doc) + ' ' + background(doc)">
        <!--<div v-for="(block,index) in doc.blocks" v-if="doc" :class="'border bg-center bg-cover bg-no-repeat p-5 relative ' + Object.values(block.css)" :style="stile(block) + background(block)">-->
            <div v-for="(row,r) in doc.blocks" :class="'bg-center bg-cover bg-no-repeat z-20 relative p-4 ' + row.css" :style="stile(row) + background(row)">
                <draggable v-model="row.blocks">
                    <div v-for="(element,e) in row.blocks" class="relative z-max">
                        <moka-element :key="'el_' + r + e" 
                            :element="element" 
                            v-if="element.type!='grid'" 
                            class="z-20"
                            :coords="coords.concat([r,e])"
                            :develop="true"
                            @selected="$emit('selected',element,coords.concat([r,e]))"/>
                        
                    </div>
                    <div :class="'z-20 scale-110 moka-editor-selector ' + active(row.id)" @click="$store.dispatch('selected',row.id),$emit('selected',row,coords.concat([r]))">
                        <div class="moka-editor-tag">
                            <i class="material-icons">select_all</i>
                        </div>
                    </div>
                </draggable>
                
            </div>
            <div :class="'z-10 scale-110 moka-editor-selector ' + active(doc.id)" @click="$store.dispatch('selected',doc.id),$emit('selected',doc,coords)">
                <div class="moka-editor-tag">
                    <i class="material-icons">{{doc.icon}}</i>
                </div>
            </div>
        <!--</div>  -->
    </div>
</template>

<script>
import MokaElement from '@/components/editor/moka.editor.element'
import draggable from 'vuedraggable'
import { mapState } from 'vuex'
export default {
    name: 'MokaEditorBlocks',
    components: { MokaElement, draggable },
    data:()=>({
        doc: null
    }),
    computed:{
        ...mapState ( ['moka'] )
    },
    props:['blocks','coords'],
    mounted(){
        this.doc = this.blocks
    },
    methods:{
        active(id){
            if ( id === this.moka.selected ){
                return ' moka-editor-active'
            }
            return ''
        },
        stile(block){
            return block.hasOwnProperty('style') ? block.style : ''
        },
        background(block){
            return block.hasOwnProperty('image') ?
                block.image ? 
                    ' background-image:url(' + block.image.url + ');' : '' : ''
        },
    }
}
</script>