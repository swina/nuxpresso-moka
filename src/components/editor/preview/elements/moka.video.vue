<template>
    <video :ref="el.id" :class="$cssResponsive(el.css)" v-if="el.type==='video' && el.image && el.image.url" :autoplay="el.hasOwnProperty('autoplay')?el.autoplay:true" 
        :controls="el.hasOwnProperty('controls')?el.controls:true"
        :loop="el.hasOwnProperty('loop')?el.loop:true">
        <source :src="el.image.url">
    </video> 
</template>

<script>
var gsap
export default {
    name: 'MokaRenderElement',
    props: [ 'el' ],
    mounted(){
        gsap = this.$animation(this.el,this.el.id,this.$refs)
    },
    beforeDestroy(){
        if ( gsap ) gsap.timeline().kill()
    }
}
</script>