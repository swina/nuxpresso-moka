<template>
    <div class="mt-1">
        <template v-for="g in groups">
             <div class="w-full p-1 mb-1 bg-gray-700 hover:bg-blue-300 hover:text-black text-white capitalize" @click="toggle(g)">
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
import MokaColor from '@/components/editor/tailwind/tailwind.color'
import MokaClipPath from '@/components/editor/tailwind/tailwind.clip.path'
import MokaBgcolor from '@/components/editor/tailwind/tailwind.bgcolor'
import MokaBgPosition from '@/components/editor/tailwind/tailwind.bgposition'
import MokaExtras from '@/components/editor/tailwind/tailwind.extras'
import MokaGradient from '@/components/editor/tailwind/tailwind.gradient'
import MokaGrid from '@/components/editor/tailwind/tailwind.grid'
import MokaJustify from '@/components/editor/tailwind/tailwind.justify'
import MokaOpacity from '@/components/editor/tailwind/tailwind.opacity'
import MokaMargin from '@/components/editor/tailwind/tailwind.margin'
import MokaPadding from '@/components/editor/tailwind/tailwind.padding'
import MokaPosition from '@/components/editor/tailwind/tailwind.position'
import MokaTextSize from '@/components/editor/tailwind/tailwind.text.size'
import MokaTextAlign from '@/components/editor/tailwind/tailwind.text.align'
import MokaTextStyle from '@/components/editor/tailwind/tailwind.text.style'
import MokaZindex from '@/components/editor/tailwind/tailwind.zindex'
export default {
    name: 'MokaTailwind',
    components: {
        MokaBgcolor,
        MokaBgPosition,
        MokaColor,
        MokaClipPath,
        MokaExtras,
        MokaGradient,
        MokaGrid,
        MokaJustify,
        MokaOpacity,
        MokaMargin,
        MokaPadding,
        MokaPosition,
        MokaTextSize,
        MokaTextAlign,
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
            textstyle:'',
            textopacity:'',
            bgcolor:'',
            bgopacity:'',
            gradient:'',
            margin:'',
            padding:'',
            position:'',
            justify:'',
            width:''
        },
        groups: [
            { label: 'columns' , components: [
                { name: 'MokaGrid' , attr: 'grid' }
            ]},
            { label: 'position', components : [ 
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
            { label: 'extras', components : [ { name: 'MokaExtras' , attr: 'extras' } ] },
            { label: 'transform', components : [ { name: 'MokaClipPath' , attr: 'clippath' } ] },   

        ],
        group: '',
        bgcolor:'',
        gradient: '',
        grid: '',
        justify:'',
        width: '',
        allCss: ''
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
        if ( !this.$attrs.columns ){
            this.groups.splice(0,1)
        }
    },
    methods:{
        toggle(group){
            this.group === group ? this.group = '' : this.group = group
        },
        update(classe){
            this.allCss = this.$clean(this.allCss.replace(this.$clean(classe),''))
        },
        blockcss(classe){
            this.$attrs.entity.css.css = classe
        },
        stile(stile){
            this.$emit('stile',stile)
        }
    }
}
</script>