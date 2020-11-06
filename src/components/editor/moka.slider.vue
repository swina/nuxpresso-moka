<template>
    <div class="relative" v-if="$attrs.slider" :data="isautoplay" :class="$attrs.slider.css" ref="slides">
        <div :class="'z-max bg-center h-full bg-cover bg-no-repeat ' + $attrs.slider.slider.animation + ' ' + $attrs.slider.blocks[index].css.css + ' ' + $attrs.slider.blocks[index].css.container" :style="stile($attrs.slider.blocks[index]) + background($attrs.slider.blocks[index])" :key="$attrs.slider.blocks[index].id" @click="next">
            <div v-for="(row,r) in $attrs.slider.blocks[index].blocks" :class="row.css + ' bg-center h-full bg-cover bg-no-repeat '" :style="stile(row) + background(row)" ref="slide">
                <div v-for="(element,e) in row.blocks" :key="element.id" class="relative z-5" ref="element">
                    <moka-element :key="'el_' + r + e" 
                        :element="element" 
                        v-if="element.type!='grid'" 
                        class="z-4"
                        :coords="[index,r,e]"
                        :develop="false"/>

                    <div v-else :class="element.css.css + ' ' + element.css.container">
                        
                        <div v-for="(subrow,s) in element.blocks" :class="subrow.css + ' bg-center bg-cover bg-no-repeat'" :style="stile(subrow) + background(subrow)" :key="subrow.id">
                            <div v-for="(subelement,ss) in subrow.blocks" :key="subelement.id">
                                
                                <moka-element :key="'el_' + r + e" 
                                    :element="subelement" 
                                    v-if="subelement.type!='grid'" 
                                    class="z-20"
                                    :coords="[index,r,e,s,ss]"
                                    :develop="false"/>
                                
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div v-if="$attrs.slider.slider.dots.enable" class="mb-2 absolute left-0 bottom-0 w-full m-auto flex flex-row justify-center">
            <div v-for="(dot,d) in $attrs.slider.blocks" title="" :class="'nuxpresso-slider-dots mr-2 nuxpresso-slider-dot-active ' + isActive(d)" @click="index=d"></div>
        </div>
        <div v-if="$attrs.slider.slider.navigation.enable">
            <div class="p-0 md:p-2 absolute md:opacity-0 hover:opacity-100" style="top:50%;left:0;transform:translateY(-50%)" @click="prev" >
                <i class="material-icons text-3xl md:text-5xl text-white cursor-pointer bg-gray-400 rounded-full hover:bg-black hover:text-white">chevron_left</i>
            </div>
            <div class="p-0 md:p-2 absolute md:opacity-0 hover:opacity-100" style="top:50%;right:0;transform:translateY(-50%)" @click="next">
                <i class="material-icons text-3xl md:text-5xl text-white cursor-pointer bg-gray-400 rounded-full hover:bg-black hover:text-white">chevron_right</i>
            </div>
        </div>
        <i v-if="$attrs.develop" class="material-icons nuxpresso-icon-circle text-black mr-4" title="Save" @click="print">save</i>
        <i v-if="!$attrs.embeded" class="material-icons nuxpresso-icon-circle fixed z-top top-0 right-0 text-2xl" @click="timer=null,$emit('close')">close</i>

    </div>
</template>

<script>
import MokaElement from '@/components/editor/moka.editor.element'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin ( ScrollTrigger )

const plugins = [ScrollTrigger];
export default {
    name: 'MokaSlider',
    components: { MokaElement },
    data:()=>({
        slider: null,
        index: 0,
        timer: null,
        ani: null
    }),
    computed:{
        isautoplay(){
            parseInt(this.$attrs.slider.slider.delay) > 0 ? this.playslides ( this.$attrs.slider.slider.delay ) : null
        }
    },
    methods:{
        isActive(i){
            return i === this.index ? ' animate-ping bg-white' : ''
        },
        playslides ( sec ){
            console.log ( sec )
            let vm = this
            this.timer = window.setInterval( function(){
                vm.index < (vm.$attrs.slider.blocks.length-1) ? vm.index++ : vm.index = 0
            },parseInt(sec)*1000)
            
        },
        stile(block){
            return block.hasOwnProperty('style') ? block.style : ''
        },
        background(block){
            return block.hasOwnProperty('image') ?
                block.image ? 
                    ' background-image:url(' + block.image.url + ');' : '' : ''
        },
        next(){
            this.index < (this.$attrs.slider.blocks.length-1) ? this.index++ : this.index = 0
        },
        prev(){
            this.index > 0 ? this.index-- : this.index = this.$attrs.slider.blocks.length-1
        },
        animateSlide(element,id){
           let vm = this
            if ( element.animation.indexOf('hover') < 0 ){   
                this.ani = gsap.effects[element.animation]( this.$refs.slides ,{
                    id: 'slide-0',
                    trigger: this.$refs.slides,
                    duration:2,
                    onUpdate: function(){ console.log('play') },
                }) 
                console.log ( this.ani )
                
            }
        },
        animate(element,id){
           let vm = this
            if ( element.animation.indexOf('hover') < 0 ){   
                let ani = gsap.effects[element.animation]( this.$refs[id] ,{
                    trigger: this.$refs[id],
                    duration:2
                }) 
                ScrollTrigger.create({
                    id: id,
                    start: "top 70%",
                    trigger: this.$refs[id],
                    toggleActions: "restart pause restart none",
                    animation: ani
                });
            }
        },
    },
    watch:{
      index(v){
        console.log ( v , this.$refs ,  this.$refs['slide-' + v] )
        let slide = this.$attrs.slider.blocks[v]
        
        gsap.effects[slide.animation]( this.$refs.slides ,{
            id: 'slide-' + v,
            duration:2,
            onStart: function(){ console.log('play') },
        })
        this.$attrs.slider.blocks[v].blocks.forEach ( container => {
                if ( container.hasOwnProperty('animation') && container.animation ){
                    this.animate ( container , container.id )
                }
                container.blocks.forEach ( el => {
                    if ( el.hasOwnProperty('animation') && el.animation ) this.animate ( el , el.id )
                })
            })
        
        //this.animate( slide , slide.id )
        /*if ( slide.hasOwnProperty('animation') && slide.animation ){
          console.log ( 'animate ...?')
          gsap.effects[slide.animation]( this.$refs.slides,{
              trigger: this.$refs.slides,
              duration:2
          })
        }
        */
      }
    },
    mounted(){
        window.scrollTo(0,0)
        this.animateSlide( this.$attrs.slider.blocks[0], this.$attrs.slider.blocks[0].id)
        
        this.$attrs.slider.blocks.forEach ( block => {
            block.blocks.forEach ( container => {
                if ( container.hasOwnProperty('animation') && container.animation ){
                    this.animate ( container , container.id )
                }
                container.blocks.forEach ( el => {
                    if ( el.hasOwnProperty('animation') && el.animation ) this.animate ( el , el.id )
                })
            })
        })

    }
}
</script>

<style>
.fade-in , .animation-1 {
    animation:fade 2s;
}
@keyframes fade
{
  0%   {opacity:0}
  100% { opacity: 1}
}

.slide-left , .animation-2 {
	-webkit-animation: slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@keyframes slide-left {
  0% {
      opacity:0;
    -webkit-transform: translateX(100%);
            transform: translateX(100%);
  }
  100% {
      opacity:1;
    -webkit-transform: translateX(0%);
            transform: translateX(0%);
  }
}


.flip-2-ver-right-1 , .animation-3 {
	animation: flip-2-ver-right-1 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
}

 @keyframes flip-2-ver-right-1 {
    0% { 
      transform: translateX(100%) rotateY(-180deg);
      transform-origin: 0% 50%;
    }
    100% {
      transform: translateX(0) rotateY(0deg);
      transform-origin: 100% 50%;
    }
  }

  .flip-out-hor-top , .animation-4 {
	animation: flip-out-hor-top 0.45s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}

@keyframes flip-out-hor-top {
  100% {
    transform: rotateX(0);
    opacity: 1;
  }
  0% {
    transform: rotateX(70deg);
    opacity: 0;
  }
}

.tilt-in-right-1 , .animation-5 {
	animation: tilt-in-right-1 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@keyframes tilt-in-right-1 {
  0% {
    transform: rotateX(-30deg) translateX(300px) skewX(30deg);
    opacity: 0;
  }
  100% {
    transform: rotateX(0deg) translateX(0) skewX(0deg);
    opacity: 1;
  }
}  

.roll-in-right , .animation-6 {
	animation: roll-in-right 0.6s ease-out both;
}

@keyframes roll-in-right {
  0% {
    transform: translateX(300px) rotate(540deg);
    opacity: 0;
  }
  100% {
    transform: translateX(0) rotate(0deg);
    opacity: 1;
  }
}

</style>