<template>
    <div
        :ref="blocks.id"
        v-if="blocks && blocks.hasOwnProperty('id')" 
        :class="'relative ' + flexCSS(blocks)"
        :style="blocks.style + ' ' + background(blocks)">
        <div v-if="!blocks.blocks">add element</div>
        <div  v-for="(el,i) in blocks.blocks" :key="el.id" :ref="el.id" class="relative z-5">
            <span class="text-yellow-400 text-xs">{{ el.type }}</span>
            <moka-element  
                :key="el.id"
                :element="el"
                v-if="el && el.type != 'flex' && el.type != 'grid'"
                :coords="$attrs.coords"
                :develop="$attrs.develop"
                @selected="setCurrent([i],el)"
                @customize="$emit('customize')"
                @animation="$emit('animations')"
                @delete="$emit('delete')"
                @editinline="$emit('editinline')"/>

            <moka-grid 
                v-if="el.type==='grid'" 
                :key="el.id" 
                :doc="$attrs.doc"
                :blocks="el" 
                :index="i"
                :coords="$attrs.coords" 
                :develop="true" 
                @selected="setCurrentSub"
                @customize="$emit('customize')"
                @animation="$emit('animations')"
                @delete="$emit('delete')"
                @editinline="$emit('editinline')"/>

            <draggable 
                tag="div" 
                :ref="el.id"
                :list="el.blocks" 
                v-if="el && el.hasOwnProperty('id') && el.type === 'flex'" 
                :class="'relative ' + Object.values(el.css).join(' ')"
                :style="el.style + ' ' + background(el)">
                <span v-if="!el.blocks.length">add an element</span>
                <div v-for="(sub,s) in el.blocks" class="z-10">
                    <moka-element  
                        :key="sub.id"
                        :element="sub"
                        v-if="sub && sub.type != 'flex' && sub.type != 'grid'"
                        :coords="$attrs.coords"
                        :develop="$attrs.develop"
                        @selected="setCurrent([i,s],sub)"
                        @customize="$emit('customize')"
                        @animation="$emit('animations')"
                        @delete="$emit('delete')"
                        @editinline="$emit('editinline')"/>
                    <span v-if="sub.type === 'grid'">grid</span>    
                </div>
                <div v-if="$attrs.develop" :class="'absolute transform scale-y-104 scale-x-106 border border-orange-600 w-full top-0 left-0 bottom-0 right-0 border-dashed z-5 ' + active(el.id)" style="min-height:1.4rem;" @click="setCurrent([i],el)">
                    <div class="bg-gray-800 rounded-xl absolute top-0 right-0 -mt-4  z-top">
                        <i class="material-icons nuxpresso-icon-circle text-sm z-top" @click="swap(false)">expand_less</i>
                        <i class="material-icons nuxpresso-icon-circle text-sm z-top" @click="swap(true)">expand_more</i>
                        
                        <i class="material-icons nuxpresso-icon-circle text-sm z-top" @click="switchFlex(el,el.css.css)">highlight_alt</i>
                    </div>
                </div> 

            </draggable>
        </div>
        <div v-if="$attrs.develop" :class="'absolute transform scale-y-104 scale-x-106 border border-orange-600 w-full top-0 left-0 bottom-0 right-0 border-dashed z-4 ' + active(blocks.id)" style="min-height:1.4rem;" @click="setCurrent([],blocks)">
            <div class="bg-gray-800 rounded-xl absolute top-0 right-0 -mt-4  z-top">
                <i class="material-icons nuxpresso-icon-circle text-sm z-top" @click="swap(false)">expand_less</i>
                <i class="material-icons nuxpresso-icon-circle text-sm z-top" @click="swap(true)">expand_more</i>
                
                <i class="material-icons nuxpresso-icon-circle text-sm z-top" @click="switchFlex(blocks,blocks.css.css)">highlight_alt</i>
            </div>
        </div> 
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import MokaElement from '@/components/editor/moka.editor.element'
import MokaGrid from '@/components/editor/moka.editor.grid'
import { mapState } from 'vuex'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin ( ScrollTrigger )
const plugins = [ScrollTrigger];
import gsapEffects from '@/plugins/animations'

export default {
    name: 'MokaFlex',
    components:{ draggable , MokaElement , MokaGrid },
    props:['blocks','doc'],
    computed: {
        ...mapState ( ['moka']),
        animations(){
            return gsapEffects
        }
    },
    methods: {
        flexCSS(block){
            return block.css.hasOwnProperty('container') ?
                    block.css.css + ' ' + block.css.container :
                        block.css
        },
        switchFlex(el,css){
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
            let coords = this.$attrs.coords
            if ( arr ){
                arr.forEach ( a => {
                    coords.push ( a )
                })
            }
            this.$store.dispatch ( 'selected' , element.id )
            this.$emit('selected',coords,element)
        },
        setCurrentSub(arr,element){
            this.$store.dispatch('selected',element.id)
            this.$store.dispatch('current',{ coords: arr , entity: element })
        },
        swap(arr,flag,el){
            //this.setCurrent(arr,el.id)
            this.$emit('swap',flag) 
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
                    start: "bottom",
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
    },
    mounted(){
        if ( !this.$attrs.develop ){
        console.log ( this.blocks.gsap )   
        window.scrollTo(0,0)
        if ( this.blocks.hasOwnProperty('gsap') && this.blocks.gsap.animation ){
            this.animate ( this.blocks , this.blocks.id )
        }
        this.blocks.blocks.forEach ( block => {
            if ( block.hasOwnProperty('gsap') && block.gsap.animation  ){
                console.log ( block.gsap.animation , block.id , this.$refs[block.id] )
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
                                    console.log ( element , element.gsap )
                                    this.animate ( element , element.id   )
                                }
                            })
                        }
                        
                    })
                })
            }
        })
        }
    }
}
</script>