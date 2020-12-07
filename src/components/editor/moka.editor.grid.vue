<template>
    <draggable
        v-model="blocks.blocks" 
        v-if="blocks"
        :class="'relative z-8 ' + blocks.css.css + ' ' + blocks.css.container "
        :style="blocks.style + ' ' + background(blocks)">
        
        <draggable
            @end="checkDrag"
            v-model="flex.blocks"
            :key="flex.id"
            v-for="(flex,f) in blocks.blocks" 
            :class="'relative ' + flex.css.css + ' ' + flex.css.container"
            :style="flex.style + ' ' + background(flex)">

            <template v-for="(el,i) in flex.blocks">
                
                <moka-element
                    v-if="el.type != 'grid' && el.type != 'flex'"
                    :key="el.id"
                    :element="el" 
                    :coords="$attrs.coords"
                    :develop="true"
                    @selected="setCurrent([f,i],el)"
                    @customize="$emit('customize')"
                    @animation="$emit('animations')"
                    @delete="$emit('delete')"
                    @editinline="$emit('editinline')"/>
                
                <moka-grid
                    :key="el.id"
                    :blocks="el"
                    v-if="el && el.type && el.type === 'grid'"
                    />
            </template>
            <div v-if="$attrs.develop"  :class="'absolute transform scale-y-108 scale-x-105 border border-red-500 border-dashed z-6 top-0 left-0 bottom-0 right-0 ' + active(flex.id) + ' border-2'" @click="setCurrent([f],flex)">
                <i class="absolute top-0 right-0 material-icons  nuxpresso-icon-circle text-sm -mt-4" @click="switchFlex(flex,flex.css.css)">select_all</i>
            </div> 
        </draggable>
        <div v-if="$attrs.develop" :class="'absolute transform scale-y-110 scale-x-105 border-blue-500 border-2 border-dashed z-5 top-0 left-0 bottom-0 right-0 ' + active(blocks.id)" @click="setCurrent([],blocks)">
            <i class="absolute top-0 right-0 material-icons nuxpresso-icon-circle text-sm -mt-4">view_column</i>
        </div>
    </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import MokaElement from '@/components/editor/moka.editor.element'
import MokaFlex from '@/components/editor/moka.editor.flex'

import { mapState } from 'vuex'
export default {
    name: 'MokaGrid',
    components:{ draggable , MokaElement , MokaFlex },
    computed: {
        ...mapState ( ['moka'] )
    },
    props: ['blocks'],
    methods:{
        checkDrag(what){
            console.log ( what )
        },
        switchFlex(el,css){
            console.log ( 'switch flex =>'  , el, css )
            if ( el.id === this.moka.selected ){
                if ( !css.length ) { 
                    el.css.css = 'flex-col'
                    return
                }
                if ( css.indexOf('flex-col') < 0 ){
                    el.css.css += ' flex-col'
                } else {
                    el.css.css = el.css.css.replace('flex-col','')
                }
            }
        },
        background(block){
            return block.hasOwnProperty('image') ?
                block.image && block.image.url ? 
                    block.image.previewUrl ? 
                        ' background-image:url(' + block.image.previewUrl + ');background-size:cover;background-repeat:no-repeat;' :
                            ' background-image:url(' + block.image.url + ');' : ''  : ''        
        },
        active(id){
            if ( this.moka && this.moka.selected ) {
                return this.moka.selected === id ? 'opacity-100' : 'opacity-0 hover:opacity-100'
            } else {
                return 'opacity-0 hover:opacity-100 '
            }
        },
        setCurrent(arr,element){
            let el = element
            !el.hasOwnProperty('gsap') ? 
                el.gsap = {
                    animation: '',
                    duration: .7,
                    ease: '',
                    delay:0
                } : null
            let coords = this.$attrs.coords
            coords.push ( this.$attrs.index )
            if ( arr ){
                arr.forEach ( a => {
                    coords.push ( a )
                })
            }
            console.log ( el )
            this.$store.dispatch ( 'selected' , el.id )
            this.$emit('selected',coords,el)
        },
        setCurrentSub(arr,element){
            this.$store.dispatch('selected',element.id)
            this.$emit('selected',arr,element)
        },
    }
}
</script>