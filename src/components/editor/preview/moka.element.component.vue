<template>
    <component :ref="el.id" :is="component" :style="el.style" :class="$cssResponsive(el.css)" :el="el"/> 
</template>

<script>
import MokaText from '@/components/editor/preview/elements/moka.text'
import MokaVideo from '@/components/editor/preview/elements/moka.video'
import MokaSvg from '@/components/editor/preview/elements/moka.svg'
import MokaImg from '@/components/editor/preview/elements/moka.img'
import MokaIcon from '@/components/editor/preview/elements/moka.icon'
import MokaMenu from '@/components/editor/preview/elements/moka.menu'
import MokaInput from '@/components/editor/preview/elements/moka.input'
import MokaTextarea from '@/components/editor/preview/elements/moka.textarea'
import MokaSimpleSvg from '@/components/editor/preview/elements/moka.simple.svg'
export default {
    name: 'MokaRenderElement',
    components: {
        MokaText,
        MokaVideo,
        MokaSvg,
        MokaImg,
        MokaInput,
        MokaTextarea,
        MokaSimpleSvg
    },
    props: [ 'el' ],
    computed:{
        component(){
            let el = this.el
            if ( ( el.tag === 'element' || el.type === 'button' ) && el.element != 'img' && el.type != 'video' && el.type != 'audio' ) {
                return MokaText
            }
            if ( el.type === 'video' ) {
                return MokaVideo
            }
            if ( el.type === 'svg' ){
                return MokaSvg
            }
            if ( el.element === 'img' && el.image && el.image.url && el.image.ext != '.svg' && el.image.ext != '.mp4' ) {
                return MokaImg
            }
            if ( el.tag === 'icon' ){
                return MokaIcon
            }
            if ( el.element === 'menu' ){
                return MokaMenu
            }
            if ( el.tag === 'input' && el.type!='button' ){
                return MokaInput
            } 
            if ( el.element === 'textarea' ){
                return MokaTextarea
            }
            if ( (el.element === 'img')  && el.image && el.image.ext === '.svg' ) {
                return MokaSimpleSvg
            }
        }
    },
    methods: {
      
    },
    
}
</script>