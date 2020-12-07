<template> 
    <div :ref="doc.id" :class="doc.css" :style="stile(doc,true) + ' ' + background(doc)" id="content">
        <!-- 1st level - BLOCKS LOOP -->
        
            <template v-for="(block,b) in doc.blocks">
                <div videobg v-if="block.image && (block.image.ext==='.mp4' || block.image.ext==='webm')" :class="'absolute ' + block.css.css">  
                    <video playsinline :poster="block.image.previewUrl" class="object-cover h-full w-full" autoplay loop>
                        <source :src="block.image.url"/>
                    </video>
                </div>
                <moka-container 
                    :key="block.id" 
                    v-if="!block.hasOwnProperty('slider')"
                    :doc="block" 
                    :level="b+1" 
                    :coords="b" 
                    />
                 <moka-slider :key="block.id" v-if="block.hasOwnProperty('slider')" :develop="true" :embeded="true" :doc="block" :editor="true"/>    
            </template>
        <!--
        <div block v-for="(block,b) in doc.blocks" :class="'relative ' + block.css.css + ' ' + block.css.container" :style="stile(block) + background(block)" :key="block.id" :ref="block.id">
            <div videobg v-if="block.image && block.image.ext==='.mp4'" :class="'absolute ' + block.css.css">  
                <video playsinline :poster="block.image.previewUrl" class="object-cover h-full w-full" autoplay loop>
                    <source :src="block.image.url"/>
                </video>
            </div>
            <template v-for="(row,r) in block.blocks">
                
                <moka-flex 
                    class="z-2"
                    :develop="false"
                    v-if="row.type==='flex'" 
                    :key="row.id"  
                    :doc="doc" 
                    :blocks="row" 
                    :coords="[b,r]"/> 
                
                <moka-grid 
                    class="z-2"
                    :develop="false"
                    v-if="row.type==='grid'" 
                    :key="row.id" 
                    :doc="doc"
                    :blocks="row" 
                    :coords="[b,r]"
                />
            </template>
            <!-- SLIDER BLOCK -->
              
                        
        
        <div class="fixed bottom-0 right-0 z-top p-4 bg-black bg-opacity-50 opacity-0 hover:opacity-100">
            <i class="material-icons nuxpresso-icon-circle mr-2" @click="$emit('save')">save</i>
            <i class="material-icons nuxpresso-icon-circle" @click="$emit('close')">close</i>
        </div> 
    </div>
</template>

<script>
import MokaElement from '@/components/editor/preview/moka.element'
import MokaContainer from '@/components/editor/preview/moka.preview.container'
import MokaFlex from '@/components/editor/preview/moka.editor.flex'
import MokaGrid from '@/components/editor/preview/moka.editor.grid'
import MokaSlider from '@/components/editor/preview/moka.slider'
import MokaArticlesLoop from '@/components/editor/moka.preview.articles.loop'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin ( ScrollTrigger )
const plugins = [ScrollTrigger];
import gsapEffects from '@/plugins/animations'

export default {
    name: 'MokaPreview',
    data:()=>({
        printScreen: null
    }),
    components: { 
        MokaContainer,
        MokaFlex,
        MokaGrid,
        MokaSlider ,
        MokaElement,
        MokaArticlesLoop
    },
    computed:{
        animations(){
            return gsapEffects
        }
    },
    props: [ 'doc' ],
    methods: {
        responsive(css){
            return this.$clean ( this.$cssResponsive ( css ) )
        },
        stile(block){
            let stl = ''
            if ( block.hasOwnProperty('fontFamily') ){
                stl += 'font-family:"' + block.fontFamily + '"'
            }
            stl += block.hasOwnProperty('style') ? block.style : ''
            return stl
        },
        background(block){
            return block.hasOwnProperty('image') ?
                block.image ? 
                    ' background-image:url(' + block.image.url + ');' : '' : ''
        },
        printSave(){
            this.print().then (()=>{
                this.$emit('save',this.printScreen)
                this.$emit('close')
            })
        },
       
        async print() {
            let el , options
            el = document.querySelector('#content')
            options = { type: "dataURL" , useCORS: true , scale: 0.50 }
            let screenshot = await this.$html2canvas(el, options)
            this.printScreen = screenshot
            this.$emit('save',screenshot)
        },
       
        animate(element,id   ){
                let vm = this
                !element.hasOwnProperty ( 'gsap' ) ?
                    element.gsap  = {
                        animation: '',
                        duration: .7,
                        delay:0,
                        ease:'none'
                    } : null  
                if ( this.$refs[id] ){      
                    let ani = gsap.effects[element.gsap.animation]( this.$refs[id] ,{
                        trigger: this.$refs[id],
                        duration: parseFloat(element.gsap.duration),
                        delay: parseFloat(element.gsap.delay),
                        ease: element.gsap.ease
                    })

                    //let ani = gsap.effects[element.animation]( this.$refs[id] ) 
                    
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
                        onStart:()=> { console.log ( 'started' , new Date() )},
                        onComplete:()=> { console.log ( 'completed' , new Date() )}
                        
                    });
                }
                
        },
        start(){
            console.log ( 'started' , new Date() )
        },
        animateSub(doc){
            doc.blocks.forEach ( block => {
                if ( block.hasOwnProperty('gsap') && block.gsap.animation  ){
                    this.animate(block, block.id)
                }
                if ( block.hasOwnProperty('blocks') ){

                    block.blocks.forEach ( el => {
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
    },
    mounted(){
        window.scrollTo(0,0)
        this.doc.blocks.forEach ( block => {
            if ( block.hasOwnProperty('gsap') && block.gsap.animation  ){
                this.animate(block, block.id)
            }
            if ( block.hasOwnProperty('blocks') ){
                block.blocks.forEach ( container => {
                    if ( container.hasOwnProperty('gsap') && container.gsap.animation ){
                        this.animate ( container , container.id )
                    }
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
                })
            }
        })
        window.addEventListener("keydown", e => {
            if ( e.altKey && e.code === 'KeyX' ){
                this.$emit('close')
            }
            if ( e.altKey && e.code === 'KeyS' ){
                this.$emit('save')
            }
        });
    }

}
</script>
