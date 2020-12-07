<template>
    <div class="mt-1">
        <template v-for="g in groups">
             <div class="w-full pl-1 mb-1 bg-gray-700 hover:bg-blue-300 hover:text-black text-white capitalize" @click="toggle(g)">
                 {{ g.label }}
             </div>
             <div v-if="g === group">
                 <div v-for="component in g.components" class="mb-2">
                     <component 
                        :is="component.name" 
                        :component="component.name" 
                        :css="css" 
                        v-model="cssTw[component.attr]" 
                        :entity="$attrs.entity"
                        :attr="component.attr" 
                        @stile="stile"
                        @clearstile="stile"
                        @blockcss="blockcss"
                        @css="update"/>
                 </div>
             </div>
        </template>
        <!--
        <moka-grid :css="css" v-model="grid"/>
        <moka-justify :css="css" v-model="justify"/>
        <moka-widths :css="css" v-model="width"/>
        <moka-gradient :css="css" v-model="gradient"/>
        -->
    </div>
</template>

<script>
import MokaWidths from '@/components/editor/tailwind/tailwind.width'
import MokaHeights from '@/components/editor/tailwind/tailwind.height'
import MokaBorder from '@/components/editor/tailwind/tailwind.border'
import MokaBorderColor from '@/components/editor/tailwind/tailwind.border.color'
import MokaBorderType from '@/components/editor/tailwind/tailwind.border.type'
import MokaColor from '@/components/editor/tailwind/tailwind.color'
import MokaClipPath from '@/components/editor/tailwind/tailwind.clip.path'
import MokaBgcolor from '@/components/editor/tailwind/tailwind.bgcolor'
import MokaBgPosition from '@/components/editor/tailwind/tailwind.bgposition'
import MokaExtras from '@/components/editor/tailwind/tailwind.extras'
import MokaFlexAlign from '@/components/editor/tailwind/tailwind.flex.align'
import MokaGradient from '@/components/editor/tailwind/tailwind.gradient'
import MokaGrid from '@/components/editor/tailwind/tailwind.grid'
import MokaJustify from '@/components/editor/tailwind/tailwind.justify'
import MokaObjectFit from '@/components/editor/tailwind/tailwind.object.fit'
import MokaOpacity from '@/components/editor/tailwind/tailwind.opacity'
import MokaMargin from '@/components/editor/tailwind/tailwind.margin'
import MokaPadding from '@/components/editor/tailwind/tailwind.padding'
import MokaPosition from '@/components/editor/tailwind/tailwind.position'
import MokaPositionElement from '@/components/editor/tailwind/tailwind.position.element'
import MokaTextSize from '@/components/editor/tailwind/tailwind.text.size'
import MokaTextAlign from '@/components/editor/tailwind/tailwind.text.align'
import MokaTextStyle from '@/components/editor/tailwind/tailwind.text.style'
import MokaTextFont from '@/components/editor/tailwind/tailwind.text.font'
import MokaZindex from '@/components/editor/tailwind/tailwind.zindex'
import { mapState } from 'vuex'
export default {
    name: 'MokaTailwind',
    components: {
        MokaBgcolor,
        MokaBgPosition,
        MokaBorder,
        MokaBorderColor,
        MokaBorderType,
        MokaColor,
        MokaClipPath,
        MokaExtras,
        MokaFlexAlign,
        MokaGradient,
        MokaGrid,
        MokaJustify,
        MokaObjectFit,
        MokaOpacity,
        MokaMargin,
        MokaPadding,
        MokaPosition,
        MokaPositionElement,
        MokaTextAlign,
        MokaTextFont,
        MokaTextSize,
        MokaTextStyle,
        MokaWidths,
        MokaHeights,
        MokaZindex
    },
    data:()=>({
        cssTw: {
            textcolor: '',
            textsize:'',
            textalign:'',
            textfont:'',
            textstyle:'',
            textopacity:'',
            bgcolor:'',
            bgopacity:'',
            gradient:'',
            margin:'',
            padding:'',
            position:'',
            justify:'',
            width:'',
            height:''
        },
        groups: [
            { label: 'grid' , components: [
                { name: 'MokaGrid' , attr: 'grid'  }
            ]},
            { label: 'flex' , components: [
                { name: 'MokaFlexAlign' , attr: 'flexalign'  }
            ]},
            { label: 'object' , components: [
                { name: 'MokaObjectFit' , attr: 'objectfit' }
            ]},
            { label: 'position', components : [ 
                { name: 'MokaPositionElement' , attr: 'positionelement' },
                { name: 'MokaPosition' , attr: 'position' },
                { name: 'MokaJustify' , attr: 'justify' },
                { name: 'MokaZindex' , attr: 'zindex' }

            ]},
            { label: 'dimension' , components: [ 
                { name: 'MokaWidths' , attr: 'width' },
                { name: 'MokaHeights' , attr: 'height' } 
            ]},
            { label: 'text' , components: [ 
                { name: 'MokaColor' , attr: 'textcolor' },
                { name: 'MokaTextSize' , attr: 'textsize' },
                { name: 'MokaTextAlign' , attr: 'textalign' },
                { name: 'MokaTextStyle' , attr: 'textstyle' },
                { name: 'MokaTextFont' , attr: 'textfont' },
                { name: 'MokaOpacity' , attr: 'textopacity'}
            ]},
            { label: 'background' , components: [ 
                { name: 'MokaBgcolor' , attr: 'bgcolor'},
                { name: 'MokaGradient' , attr: 'gradient' },
                { name: 'MokaBgPosition' , attr: 'bgposition' },
                { name: 'MokaOpacity' , attr: 'bgopacity'}
            ]},
            { label: 'padding', components : [ { name: 'MokaPadding' , attr: 'padding' } ] }, 
            { label: 'margin', components : [ { name: 'MokaMargin' , attr: 'margin' } ] },
            { label: 'border', components : [ 
                { name: 'MokaBorder' , attr: 'border' } ,
                { name: 'MokaBorderColor' , attr: 'bordercolor' },
                { name: 'MokaBorderType' , attr: 'bordertype' },
                { name: 'MokaOpacity' , attr: 'borderopacity' }
            ]},
            { label: 'extras', components : [ { name: 'MokaExtras' , attr: 'extras' } ] },
            { label: 'transform', components : [ { name: 'MokaClipPath' , attr: 'clippath' } ] },   

        ],
        group: '',
        bgcolor:'',
        gradient: '',
        grid: '',
        justify:'',
        width: '',
        allCss: '',
        allStyle: ''
        /*
           
            'text',
            'background',
            'padding',
            'margin',
            'border',
            'extras'
            */
    }),
    props: [ 'css'],
    computed: {
        ...mapState ( ['moka'] )
    },
    watch:{
        cssTw:{
            handler(old,changed){
                !this.$attrs.entity.css.hasOwnProperty('css') ?
                    this.$attrs.entity.css = this.allCss + ' ' + this.$clean(Object.values(changed).join(' ')) :
                        this.$attrs.entity.css.css = this.allCss + ' ' + this.$clean(Object.values(changed).join(' ')) 
            },
            deep:true
        }
    },
    mounted(){
        this.allCss = this.css
        this.allStyle = this.$attrs.entity.style
        if ( this.$attrs.entity.type != 'grid' ){
            this.groups.forEach ( (g,i) => {
                if ( g.label === 'grid' ){
                    this.groups.splice(i,1)            
                }
            })
        } 
        if ( this.$attrs.entity.type != 'flex' ){
            this.groups.forEach ( (g,i) => {
                if ( g.label === 'flex' ){
                    this.groups.splice(i,1)            
                }
            })
        }
    },
    methods:{
        toggle(group){
            this.group === group ? this.group = '' : this.group = group
        },
        update(classe){
            this.allCss = this.allCss.replace(this.$clean(classe),' ')
        },
        blockcss(classe){
            this.$attrs.entity.css.css = classe
        },
        stile(stile){
            this.$emit('stile',stile)
        },
        clearstile(stile){
            this.allStyle = this.$clean(this.allStyle.replace(this.$clean(style),''))

        }
    }
}
</script>