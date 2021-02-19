<template>
    <component
        :is="semantic"
        :id="doc.hasOwnProperty('anchor')? doc.anchor : doc.id"
        v-if="doc && (modal || moka.popup)"
        :modal="popup"  
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
                v-if="block && !block.hasOwnProperty('slider') && block.hasOwnProperty('blocks') && !block.hasOwnProperty('menu') && !block.hasOwnProperty('image_flip')" @action="elementAction" 
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
                

        </template>
        <i class="material-icons absolute top-0 right-0 m-1" v-if="doc.hasOwnProperty('popup') && doc.popup.close" @click="popupClose">close</i>
    </component>

</template>

<script>
//import MokaElement from '@/components/editor/preview/moka.element'
import MokaElement from '@/components/editor/preview/moka.element.component'
import draggable from 'vuedraggable'
import MokaSlider from '@/components/editor/preview/moka.slider'
import MokaFlipbox from './moka.flipbox.vue'

import { mapState } from 'vuex'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin ( ScrollTrigger )
const plugins = [ScrollTrigger];
export default {
    name: 'MokaPreviewContainer',
    components: { MokaElement , MokaSlider , draggable , MokaFlipbox },
    props: [ 'doc' ,   { 'animation' : Boolean , default: true } ],
    data:()=>({
        modal: true
    }),
    computed:{
        ...mapState(['moka']),
        animations(){
            return gsapEffects
        },
        semantic(){
            return this.doc.semantic ? this.doc.semantic : 'div'
        },
        popup(){
            if ( this.doc.hasOwnProperty('popup') ){
                if ( this.doc.popup.trigger ){
                    //this.doc.css.css.replace('modal','')
                    this.modal = false
                }
            }
        }
    },
    watch:{
        '$store.state.moka.popup':function(v){
            if ( v ){
                if ( this.doc.hasOwnProperty('gsap') && this.doc.gsap.animation ){
                    this.animate ( this.doc , this.doc.id )
                }
            }
        }
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
            if ( this.$refs && element.hasOwnProperty('gsap') && element.gsap.animation ){
                let ani = gsap.effects[element.gsap.animation]( this.$refs[id] ,{
                    trigger: this.$refs[id],
                    duration: parseFloat(element.gsap.duration),
                    delay: parseFloat(element.gsap.delay),
                    ease: element.gsap.ease
                })
                ScrollTrigger.create({
                    id: id,
                    start: "top 99%",
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
                    
            }
        },
        popupClose(){
            this.modal = false
            this.$store.dispatch('popup','')
        }
    },
    mounted(){
        window.scrollTo(0,0)
        if ( !this.animation ) return 
        if ( this.doc.hasOwnProperty('gsap') && this.doc.gsap.animation ){
            this.animate ( this.doc , this.doc.id )
        }
        return
        this.doc.blocks.forEach ( block => {
            if ( block.hasOwnProperty('gsap') && block.gsap.animation  ){
                this.animate(block, block.id)
            }
            if ( block.hasOwnProperty('blocks') ){
                block.blocks.forEach ( container => {
                    if ( container.hasOwnProperty('gsap') && container.gsap.animation ){
                        this.animate ( container , container.id )
                    }
                    if ( container.hasOwnProperty('blocks') ){
                        container.blocks.forEach ( el => {
                            if ( el.hasOwnProperty('gsap') && el.gsap.animation ){
                                this.animate ( el , el.id   )
                            }
                                if ( el.hasOwnProperty('blocks') ){
                                el.blocks.forEach ( element => {
                                        if ( element.hasOwnProperty('gsap') && element.gsap.animation ){
                                        this.animate ( element , element.id   )
                                    }
                                })
                            }
                            
                        })
                    }
                })
            }
        })
    }
}
</script>