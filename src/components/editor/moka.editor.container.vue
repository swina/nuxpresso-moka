<template>
    <draggable v-if="doc" v-model="doc.blocks" :class="'relative ' + Object.values(doc.css).join(' ')" >
        <template v-for="(block,b) in doc.blocks">
            <moka-element
                v-if="!block.hasOwnProperty('blocks') || block.hasOwnProperty('items')"
                :key="block.id"
                :element="block" 
                :coords="[b]"
                :develop="true"
                @selected="setCurrent(block)"
                @customize="$emit('customize')"
                @animation="$emit('animations')"
                @delete="$emit('delete')" 
                @editinline="$emit('editinline')"/> 
            <moka-container :level="parseInt($attrs.level)+1" v-if="block.hasOwnProperty('blocks') && !block.hasOwnProperty('menu')" :doc="block"/>
        </template>
        <div :class="'absolute transform scale-y-105 py-1 scale-x-105 border-2 border-dashed top-0 left-0 bottom-0 right-0 z-' + $attrs.level + ' ' + active(doc.id,doc)" @click="setCurrent(doc)" v-if="!doc.hasOwnProperty('items')">
            <i class="absolute top-0 right-0 transform scale-100 material-icons nuxpresso-icon-circle text-sm -mt-4" v-if="doc.icon">{{doc.icon}}</i>
            <i class="absolute top-0 right-0 transform scale-100 material-icons nuxpresso-icon-circle text-sm -mt-4" v-if="!doc.icon">select_all</i>
        </div>
    </draggable>

</template>

<script>
import MokaElement from '@/components/editor/moka.editor.element'
import draggable from 'vuedraggable'
import { mapState } from 'vuex'
export default {
    name: 'MokaContainer',
    components: { MokaElement , draggable },
    props: [ 'doc' , 'coords'],
    computed:{
        ...mapState(['moka'])
    },
    methods:{
        setCurrent(el){
            console.log ( el )
            this.$store.dispatch( 'selected' , el.id )
            this.$store.dispatch ( 'current' , el )
            this.$emit('selected',el)
        },
        active(id,doc){
            let color = 'border-blue-500 '
            doc.type === 'flex' ?
                color = 'border-red-500 ' : null
            if ( this.moka && this.moka.selected ) {
                return this.moka.selected === id ? color + 'opacity-100' : color + 'opacity-0 hover:opacity-100'
            } else {
                return color + 'opacity-0 hover:opacity-100 '
            }
        },
        pos(el){
            let arr = []
            //console.log ( this.$findNode( this.doc.id , this.moka.component.json ) )
        },
        stile(block,doc){
            return 
            if ( !block || !doc ) return 
            let stile = ''
            if ( block.hasOwnProperty('fontFamily')){
                stile += 'font-family:\"' + block.fontFamily + '\"; '
            }
            return block.hasOwnProperty('style') ? block.style + stile : stile
        },
        background(block){
            if ( !block ) return 
            return block.hasOwnProperty('image') ?
                block.image && block.image.url ? 
                    block.image.previewUrl ? 
                        ' background-image:url(' + block.image.previewUrl + ');background-size:cover;background-repeat:no-repeat;' :
                            ' background-image:url(' + block.image.url + ');' : ''  : ''        
        },
    }

}
</script>