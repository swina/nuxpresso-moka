<template>
    <img :ref="el.id" :src="el.image.url" :caption="el.image.caption||el.image.name" :alt="el.image.alternative_text||el.image.name" :title="el.image.name.split('.')[0]" :class="$cssResponsive(el.css)"/>
</template>

<script>
var gsap
export default {
    name: 'MokaImgElement',
    props: ['el'],
    mounted(){
        gsap = this.$animation(this.el,this.el.id,this.$refs)
    },
    beforeDestroy(){
        if ( gsap ) gsap.timeline().kill()
    }
}
</script>