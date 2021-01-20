<template>
    <component :ref="el.id" :is="component" :style="el.style" :class="css" :el="el" :child="child"/> 
</template>

<script>
import MokaText from '@/components/editor/preview/elements/moka.text'
import MokaLink from '@/components/editor/preview/elements/moka.link'
import MokaVideo from '@/components/editor/preview/elements/moka.video'
import MokaAudio from '@/components/editor/preview/elements/moka.audio'
import MokaIframe from '@/components/editor/preview/elements/moka.iframe'
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
        MokaAudio,
        MokaIframe,
        MokaSvg,
        MokaImg,
        MokaInput,
        MokaTextarea,
        MokaSimpleSvg
    },
    props: [ 'el' ],
    data:()=>({
        css: '',
        child: null
    }),
    computed:{
        component(){
            let el = this.el
            !el.link ?
                this.css = this.$cssResponsive(el.css) :
                    this.css = ''
            
            if ( ( el.tag === 'element' || el.type === 'button' ) && el.element != 'img' && el.type != 'video' && el.type != 'audio' ) {
                this.child = MokaText
                return el.link ? MokaLink : MokaText
            }
            if ( el.type === 'video' ) {
                if ( el.element != 'iframe' ){
                    this.child = MokaVideo
                    return el.link ? MokaLink : MokaVideo
                } else {
                    this.child = MokaIframe
                    return MokaIframe
                }
            }
            if ( el.type === 'audio' ) {
                this.child = MokaAudio
                return el.link ? MokaLink : MokaAudio
            }
            if ( el.type === 'svg' ){
                this.child = MokaSvg
                return el.link ? MokaLink : MokaSvg
            }
            if ( el.element === 'img' && el.image && el.image.url && el.image.ext != '.svg' && el.image.ext != '.mp4' ) {
                this.child = MokaImg
                return el.link ? MokaLink : MokaImg
            }
            if ( el.tag === 'icon' ){
                this.child = MokaIcon
                return el.link ? MokaLink : MokaIcon
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
                this.child = MokaSimpleSvg
                return el.link ? MokaLink : MokaSimpleSvg    
            }
        }
    },
    methods: {
      
    },
    
}
</script>