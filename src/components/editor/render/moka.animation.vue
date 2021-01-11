<template>
    <div class="flex flex-col" v-if="current" :key="current.id">
        <i class="material-icons absolute top-0 right-0 m-1" @click="$emit('close')">close</i>
            <label>Animation</label>
            <select class="w-full dark" v-model="$attrs.value.gsap.animation" @change="animate(current,current.id)">
                <option value="">none</option>
                <option v-for="(ani,i) in gsapAnimations.gsapEffects" :value="ani.replace('-','')"><span class="capitalize">{{ ani.replace('-' , ' ')}}</span></option>
            </select>
            <label>Easing</label>
            <select class="w-full dark" v-model="$attrs.value.gsap.ease">
                <option value="">none</option>
                <option v-for="(ease,i) in gsapAnimations.gsapEase" :value="ease"><span class="capitalize">{{ ease.replace('.out','')}}</span></option>
            </select>
            <label>Duration (secs)</label>
            <input class="w-full dark" type="number" min=".1" max="100" step=".1" v-model="$attrs.value.gsap.duration"/>
            <label>Delay (secs)</label>
            <input class="w-full dark" type="number" min="0" max="100" step=".1" v-model="$attrs.value.gsap.delay"/>
            <h1 ref="aniDemo" class="text-gray-300 m-auto p-10">DEMO</h1>
            <a href="#" @click="animate()">Run</a>
    </div>
</template>

<script>

import gsap from 'gsap'
import gsapEffects from '@/plugins/animations'
export default {
    name: 'MokaEditorAnimation',
    data:()=>({
        current: null
    }),
    //props: [ 'element' ],
    mounted(){  
        this.current = this.$attrs.element
        !this.current.hasOwnProperty('gsap') ?
            this.current.gsap = {
                animation: '',
                ease: '',
                duration: 1,
                delay:0
            } :
            this.current.gsap = Object.assign ( {} , this.$attrs.element.gsap )
    },
    watch: {
        
    },
    computed:{
        gsapAnimations(){
            return gsapEffects
        }
    },
    methods: {
         animate(){
            if ( this.current.gsap && this.current.gsap.animation ){
                gsap.effects[this.current.gsap.animation]( this.$refs['aniDemo'] ,{
                    trigger: this.$refs['aniDemo'],
                    duration: parseFloat(this.current.gsap.duration) ,
                    ease: this.current.gsap.ease,
                    delay: parseFloat(this.current.gsap.delay)

                }) 
            }
            
        }
    }
}
</script>