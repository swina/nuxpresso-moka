<template>
    <!-- SLIDER -->
    <div :data="getSlider" class="z-top border bg-white">
        <transition name="fade">
        <div class="bg-gray-200 p-1 flex flex-row items-center" v-if="sliderTools && !$attrs.slide">
            SLIDER <i title="Slider settings" class="material-icons mx-2" @click="$store.dispatch('setCurrent',doc),$store.dispatch('setAction','slidersettings')">settings</i> <button class="danger" @click="$emit('remove')">Remove</button>
        
            <div class="flex flex-row justify-end w-full">
                <button class="mx-2" @click="addSlide()">Add slide</button>
                <button class="danger mx-2" v-if="!slideDelete && slideIndex > -1" @click="slideDelete=!slideDelete">Delete slide</button>
                <button class="danger" v-if="slideDelete" @click="doc.blocks.splice(slideIndex,1),slideIndex=0,slideDelete=!slideDelete">Confirm to delete this slide?</button>
                <button class="rounded-none mx-2" v-if="currentSlide" @click="$emit('duplicate')">Duplicate</button>
            </div>
        </div>
        </transition>
        <div v-if="sliderTools">
            <label class="text-sm">Slide title </label> 
            <input type="text" class="my-1" v-model="doc.blocks[slideIndex].name"/>
        </div>
        
        <div class="flex flex-row items-center">
        <div class="items-center bg-yellow-500 text-sm border rounded-tr rounded-tl px-2">Slider <i class="material-icons" @click="sliderTools=!sliderTools">build_circle</i></div>
        <draggable :list="doc.blocks" class="flex flex-row text-sm">
            <div v-for="(slide,index) in doc.blocks" :class="'w-auto px-2 h-6 border justify-center items-center flex flex-col rounded-tr rounded-tl ' + slideSelected(index)" @click="slideDelete=false,currentSlide=slide,slideIndex=index,$store.dispatch('setCurrent',slide),$store.dispatch('selected',slide.id)">
                {{ 'Slide ' + (index+1) }}
            </div>
        </draggable>
        </div>
        
        

        <div :class="doc.css + ' relative border-2 border-dashed p-4 text-black '" :style="stile(doc,true) + ' ' + background(doc)" id="content">
            <template v-for="(block,i) in doc.blocks">
                <moka-single-container
                    v-if="slideIndex===i"
                    :key="block.id" 
                    :doc="block"
                    :component="doc" 
                    level="0"
                    index="0"
                    :slide="true"
                    :top="true" 
                    :pos="[0,0]"
                    :coords="[0,0]" 
                    zi="1"/>
            </template>
        </div>
        
    </div>
</template>

<script>
import MokaSingleContainer from '@/components/editor/render/moka.editor.single.slide'
import draggable from 'vuedraggable'
export default {
    name: 'MokaEditorSlides',
    components: { MokaSingleContainer , draggable },
    props: [ 'doc' ],
    data:()=>({
        sliderTools: false, 
        currentSlide : 0,
        slideDelete: false,
        slideIndex:0
    }),
    computed:{
        getSlider(){
            if ( this.doc.hasOwnProperty('slider') ){
                this.currentSlide = this.doc.blocks[0]
            }
            return true
        },
    },
    methods:{
        addSlide(){
            this.doc.blocks.push ( this.$grid(1) )
        },
        slideSelected(index){
            return index === this.slideIndex ? 'bg-blue-400 text-white' : ''
        },
        stile(){
            return
        },
        classe(css){
            return
        },
        background(img){
            return
        }
    }
}
</script>