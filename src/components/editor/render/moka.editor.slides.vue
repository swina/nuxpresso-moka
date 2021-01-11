<template>
    <!-- SLIDER -->
    <div :data="getSlider" class="z-top">
        <div class="bg-gray-200 p-1">
            SLIDER <button class="danger" @click="$emit('remove')">Remove</button>
        </div>
        <div class="flex flex-row items-center p-1">
            <i title="Slider settings" class="material-icons mx-2" @click="$store.dispatch('setCurrent',doc),$store.dispatch('setAction','slidersettings')">settings</i>
            <button class="mx-2" @click="addSlide()">Add slide</button>
            <button class="danger mx-2" v-if="!slideDelete && slideIndex > -1" @click="slideDelete=!slideDelete">Delete slide</button>
            <button class="danger" v-if="slideDelete" @click="doc.blocks.splice(slideIndex,1),slideIndex=0,slideDelete=!slideDelete">Confirm to delete this slide?</button>
            <!--<button class="rounded-none mx-2" v-if="currentSlide">Duplicate</button>-->
        </div>
        
        <draggable :list="doc.blocks" class="flex flex-row mb-4">
            <div v-for="(slide,index) in doc.blocks" :class="'w-auto px-1 h-8 border justify-center items-center flex flex-col mr-4 ' + slideSelected(index)" @click="slideDelete=false,currentSlide=slide,slideIndex=index,$store.dispatch('setCurrent',slide),$store.dispatch('selected',slide.id)">
                {{ 'Slide ' + (index+1) }}
            </div>
        </draggable>
        <label class="text-sm">Slide title </label> 
        <input type="text" class="my-1" v-model="doc.blocks[slideIndex].name"/>
        <div v-if="currentSlide" :class="doc.css + ' relative border-2 border-dashed p-4 text-black '" :style="stile(doc,true) + ' ' + background(doc)" id="content">
        
            <moka-container
                :key="currentSlide.id" 
                :doc="currentSlide"
                :component="doc" 
                level="0"
                index="0"
                :slide="true"
                :top="true" 
                :pos="[0,0]"
                :coords="[0,0]" 
                zi="1"/>
        
        </div>
    </div>
</template>

<script>
import MokaContainer from '@/components/editor/render/moka.editor.container'
import draggable from 'vuedraggable'
export default {
    name: 'MokaEditorSlides',
    components: { MokaContainer , draggable },
    props: [ 'doc' ],
    data:()=>({
        currentSlide : null,
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