<template>
    <component
        :is="semantic"
        :id="doc.hasOwnProperty('anchor')? doc.anchor : doc.id"
        v-if="doc"
        :key="randomID"
        :class="classe(doc.css)" :style="doc.style + ' ' +  background(doc)" :ref="doc.id">
        <template v-for="(block,b) in doc.blocks">
            <moka-element
                @click="elementAction"
                v-if="block && !block.hasOwnProperty('blocks') || block.hasOwnProperty('items')"
                :key="block.id"
                :el="block"
                :coords="[b]"
                :develop="false"/> 

            <moka-preview-container
                :key="block.id"
                v-if="block && !block.hasOwnProperty('slider') && block.hasOwnProperty('blocks') && !block.hasOwnProperty('items') && !block.hasOwnProperty('image_flip') && !block.hasOwnProperty('popup')" @action="elementAction" 
                :doc="block" :animation="$attrs.animation"/>

            <moka-slider 
                :key="block.id" 
                :ref="block.id" 
                v-if="block && block.hasOwnProperty('slider')" 
                :develop="true" 
                :embeded="true" 
                :doc="block" 
                :editor="true"/>

            <moka-flipbox
                :key="block.id" 
                :ref="block.id" 
                v-if="block && block.hasOwnProperty('image_flip')" 
                :develop="true" 
                :embeded="true" 
                :doc="block" 
                :editor="true"/>
               
            <moka-popup
                :key="block.id" 
                :ref="block.id" 
                v-if="block && block.hasOwnProperty('popup')" 
                :develop="true" 
                :embeded="true" 
                :doc="block" 
                :editor="true"/>

        </template>
    </component>

</template>

<script>
//import MokaElement from '@/components/editor/preview/moka.element'
import MokaElement from '@/components/editor/preview/moka.element.component'
import draggable from 'vuedraggable'
import MokaSlider from '@/components/editor/preview/moka.slider'
import MokaFlipbox from './moka.flipbox'
import MokaPopup from './moka.popup'
import { mapState } from 'vuex'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin ( ScrollTrigger )
const plugins = [ScrollTrigger];
export default {
    name: 'MokaPreviewContainer',
    components: { MokaElement , MokaSlider , draggable , MokaFlipbox , MokaPopup },
    props: { 
        doc : { type: Object }  
    },
    data:()=>({
        modal: true,
        animation: null,
        randomID: null
    }),
    computed:{
        ...mapState(['moka']),
        animations(){
            return gsapEffects
        },
        semantic(){
            return this.doc.semantic ? this.doc.semantic : 'div'
        },
        /*
        popup(){
            if ( this.doc.hasOwnProperty('popup')  ){
                if ( this.doc.popup.trigger ){
                    if ( this.doc.popup.trigger === this.moka.popup ){
                        this.modal = true
                        
                    } else {
                        this.modal = false
                    }
                }
            }
        },
        popupCSS(){

            return this.doc.hasOwnProperty ( 'popup' ) ? 'moka-popup-' + this.randomID : ''
        }
        */
    },
    
    methods:{
        
        classe(css){
            return css.hasOwnProperty('css') ? css.css + ' ' + css.container : css 
        },
        stile(block,doc){
            if ( !block || !doc ) return 
            let stile = ''
            if ( block.hasOwnProperty('fontFamily')){
                stile += 'font-family:\"' + block.fontFamily + '\"; '
            }
            return block.hasOwnProperty('style') ? block.style + stile : stile
        },
        background(block){
            if ( !block ) return ''
            return block.hasOwnProperty('image') ?
                //'background-image:url(' + this.$imageURL(block.image) + ')' : ''
                block.image && block.image.url ? 
                        ' background-image:url(' + this.$imageURL(block.image) + ');' :
                             ''  : ''
        },
        elementAction(action){
            this.$emit('action',action)
        },
        animate(element,id){
            let vm = this
            //if ( this.$refs && element.hasOwnProperty('gsap') && element.gsap.animation && !this.doc.hasOwnProperty('popup') ){
                let ani = gsap.effects[element.gsap.animation]( this.$refs[id] ,{
                    trigger: this.$refs[id],
                    duration: parseFloat(element.gsap.duration),
                    delay: parseFloat(element.gsap.delay),
                    ease: element.gsap.ease
                })
                ScrollTrigger.create({
                    id: id,
                    start: "center 99%",
                    trigger: this.$refs[id],
                    toggleActions: "play pause restart none",
                    animation:ani,
                    onEnter: ()=>{
                        if ( element.gsap.delay ){
                            ani.play()
                        } else {
                            ani.play(0)
                        }
                    },
                    
                });
                
                    
            //}
        }
    },
    mounted(){
        //this.randomID = this.$randomID()
        window.scrollTo(0,0)
        //if ( !this.doc && !this.doc.hasOwnProperty('gsap') && !this.doc.gsap && !this.doc.gsap.animation ) return 
        if ( this.doc.hasOwnProperty('gsap') && this.doc.gsap.animation  ){
            if ( this.doc.hasOwnProperty ( 'popup') && this.doc.popup.trigger ) return
                this.$animation( this.doc , this.doc.id , this.$refs )
        }
        return
        
    }
}
</script>
