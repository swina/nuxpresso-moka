<template>
    <div class="mt-1" :data="init">
        <template v-for="g in groups">
             <div class="w-full pl-1 mb-1 bg-gray-700 hover:bg-blue-300 hover:text-black text-white capitalize" @click="toggle(g)">
                 {{ g.label }}
             </div>
             <div v-if="g === group">
                 <div v-for="component in g.components" class="mb-2">
                     <component 
                        :key="$randomID()"
                        :is="component.name" 
                        :component="component.name" 
                        :css="css" 
                        :stile="editor.current.style"
                        v-model="cssTw[component.attr]" 
                        :entity="editor.current"
                        :attr="component.attr" 
                        :required="component.hasOwnProperty('required')? component.required :''"
                        :title="component.hasOwnProperty('title')?component.title:''"
                        :negative="component.hasOwnProperty('negative')?component.negative:false"
                        @stile="stile"
                        @clearstile="stile"
                        @blockcss="blockcss"
                        @css="update"/>
                        <!--:entity="$attrs.entity"-->
                 </div>
             </div>
        </template>
    </div>
</template>

<script>
import MokaAlignItems from '@/components/editor/tailwind/tailwind.align.items'
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
import MokaFlexDirection from '@/components/editor/tailwind/tailwind.flex.direction'
import MokaFlexAlign from '@/components/editor/tailwind/tailwind.flex.align'
import MokaGradient from '@/components/editor/tailwind/tailwind.gradient'
import MokaGrid from '@/components/editor/tailwind/tailwind.grid'
import MokaJustify from '@/components/editor/tailwind/tailwind.justify'
import MokaObjectFit from '@/components/editor/tailwind/tailwind.object.fit'
import MokaOpacity from '@/components/editor/tailwind/tailwind.opacity'
import MokaOrderItems from '@/components/editor/tailwind/tailwind.order.items'
import MokaMargin from '@/components/editor/tailwind/tailwind.margin'
import MokaPadding from '@/components/editor/tailwind/tailwind.padding'
import MokaPosition from '@/components/editor/tailwind/tailwind.position'
import MokaRotate from '@/components/editor/tailwind/tailwind.rotate'
import MokaPositionElement from '@/components/editor/tailwind/tailwind.position.element'
import MokaTextSize from '@/components/editor/tailwind/tailwind.text.size'
import MokaTextAlign from '@/components/editor/tailwind/tailwind.text.align'
import MokaTextStyle from '@/components/editor/tailwind/tailwind.text.style'
import MokaTextLineHeight from '@/components/editor/tailwind/tailwind.text.line.height'
import MokaTextFont from '@/components/editor/tailwind/tailwind.text.font'
import MokaZindex from '@/components/editor/tailwind/tailwind.zindex'
import MokaOptions from '@/components/editor/tailwind/tailwind.options'
import MokaRange from '@/components/editor/tailwind/tailwind.range'
import MokaCheckbox from '@/components/editor/tailwind/tailwind.checkbox'
import { mapState } from 'vuex'
export default {
    name: 'MokaTailwind',
    components: {
        MokaAlignItems,
        MokaBgcolor,
        MokaBgPosition,
        MokaBorder,
        MokaBorderColor,
        MokaBorderType,
        MokaColor,
        MokaClipPath,
        MokaExtras,
        MokaFlexAlign,
        MokaFlexDirection,
        MokaGradient,
        MokaGrid,
        MokaJustify,
        MokaObjectFit,
        MokaOpacity,
        MokaOrderItems,
        MokaMargin,
        MokaPadding,
        MokaPosition,
        MokaPositionElement,
        MokaRotate,
        MokaTextAlign,
        MokaTextFont,
        MokaTextLineHeight,
        MokaTextSize,
        MokaTextStyle,
        MokaWidths,
        MokaHeights,
        MokaZindex,
        MokaOptions,
        MokaRange,
        MokaCheckbox
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
            { label: 'grid' , filter: ['grid'] , components: [
                { name: 'MokaGrid' , attr: 'grid'  },
                { name: 'MokaOptions' , attr: 'gridgap' , title: 'grid gap'}
            ]},
            { label: 'flex' , filter: ['flex'] , components: [
                { name: 'MokaFlexDirection' , attr: 'flexdirection'  },
                //{ name: 'MokaAlignItems' , attr: 'flexalign' },
                //{ name: 'MokaJustify' , attr: 'flexjustify' },
                { name: 'MokaOrderItems' , attr: 'flexorder' }
            ]},
            {
                label: 'box align' , filter: ['grid','flex'] , components: [
                    { name: 'MokaOptions' , attr: 'alignitems' , title: 'Align items' },
                    { name: 'MokaOptions' , attr: 'aligncontent' , title: 'Align content' },
                    { name: 'MokaOptions' , attr: 'alignself' , title: 'Align self' },
                ]
            },
            {
                label: 'box justify' , filter: ['grid','flex'] , components: [
                    { name: 'MokaOptions' , attr: 'justifycontent' , title: 'Justify content' },
                    { name: 'MokaOptions' , attr: 'justifyitems' , title: 'Justify items' },
                    { name: 'MokaOptions' , attr: 'justifyself' , title: 'justify self' },
                ]
            },
            { label: 'position', components : [ 
                { name: 'MokaOptions' , attr: 'positionelement' , title: 'position' },
                { name: 'MokaPosition' , attr: 'position' },
                { name: 'MokaJustify' , attr: 'justify' },
                { name: 'MokaZindex' , attr: 'zindex' },
                { name: 'MokaOptions' , attr: 'objectfit' , title: 'Object fit' }
            ]},
            { label: 'dimension' , components: [ 
                { name: 'MokaWidths' , attr: 'width' },
                { name: 'MokaHeights' , attr: 'height' } 
            ]},
            { label: 'text' , components: [ 
                { name: 'MokaColor' , attr: 'textcolor' },
                //{ name: 'MokaTextSize' , attr: 'textsize' },
                { name: 'MokaRange' , attr: 'textSize' , title: 'size' },
                { name: 'MokaOptions' , attr: 'textAlign' , title: 'Align' },
                { name: 'MokaTextStyle' , attr: 'textstyle' },
                { name: 'MokaOptions' , attr: 'textlineheight' , title: 'line height'},
                { name: 'MokaTextFont' , attr: 'textfont' },
                { name: 'MokaRange' , attr: 'textOpacity' , title: 'opacity' }
            ]},
            { label: 'background' , components: [ 
                { name: 'MokaBgcolor' , attr: 'bgcolor'},
                { name: 'MokaGradient' , attr: 'gradient' },
                { name: 'MokaBgPosition' , attr: 'bgposition' },
                //{ name: 'MokaOpacity' , attr: 'bgopacity'},
                { name: 'MokaRange' , attr: 'bgOpacity' , title: 'opacity' }
            ]},
            { label: 'padding', components : [ 
                //{ name: 'MokaPadding' , attr: 'padding' } 
                { name: 'MokaRange' , attr: 'padding' , title: 'all'},
                { name: 'MokaRange' , attr: 'paddingTop' , title: 'top'},
                { name: 'MokaRange' , attr: 'paddingBottom' , title: 'bottom'},
                { name: 'MokaRange' , attr: 'paddingLeft' , title: 'left'},
                { name: 'MokaRange' , attr: 'paddingRight' , title: 'right'},
            ] }, 
            { label: 'margin', components : [ 
                //{ name: 'MokaMargin' , attr: 'margin' } ,
                { name: 'MokaRange' , attr: 'margin' , title: 'all' , negative: true},
                { name: 'MokaRange' , attr: 'marginTop' , title: 'top', negative: true},
                { name: 'MokaRange' , attr: 'marginBottom' , title: 'bottom', negative: true},
                { name: 'MokaRange' , attr: 'marginLeft' , title: 'left', negative: true},
                { name: 'MokaRange' , attr: 'marginRight' , title: 'right', negative: true},
                { name: 'MokaCheckbox' , attr: 'mauto' , title: 'auto' }

            ] },
            { label: 'border', components : [ 
                //{ name: 'MokaBorder' , attr: 'border' } ,
                { name: 'MokaRange' , attr: 'border' , title: 'all' },
                { name: 'MokaRange' , attr: 'borderTop' , title: 'top' },
                { name: 'MokaRange' , attr: 'borderRight' , title: 'right' },
                { name: 'MokaRange' , attr: 'borderBottom' , title: 'bottom' },
                { name: 'MokaRange' , attr: 'borderLeft' , title: 'left' },
                { name: 'MokaBorderColor' , attr: 'bordercolor' },
                { name: 'MokaOptions' , attr: 'borderType' },
                { name: 'MokaRange' , attr: 'borderOpacity' , title: 'opacity' }
                //{ name: 'MokaOpacity' , attr: 'borderopacity' }
            ]},
            { label: 'rounded / shadow', components : [ 
                { name: 'MokaOptions' , attr: 'rounded' },
                { name: 'MokaOptions' , attr: 'shadow' }, 
            ]},
            { label: 'transform', components : [ 
                { name: 'MokaOptions' , attr: 'skewX' , required: 'transform' , title: 'Skew X' },
                { name: 'MokaOptions' , attr: 'skewY' , required: 'transform' , title: 'Skew Y' },
                { name: 'MokaOptions' , attr: 'rotate' , required: 'transform' },
                { name: 'MokaOptions' , attr: 'clipPath' , required: 'transform' , title: 'clip path'},
            ]},   

        ],
        group: '',
        bgcolor:'',
        gradient: '',
        grid: '',
        justify:'',
        width: '',
        allCss: '',
        allStyle: ''
    }),
    props: [ 'css'],
    computed: {
        ...mapState ( ['moka','editor'] ),
        init(){
            this.allCss = this.css
            return true
        }
       
    },
    watch:{
        cssTw:{
            handler(old,changed){
                let css = this.allCss + ' ' + this.$clean(Object.values(changed).join(' ')) 
                if ( this.$attrs.submenu ){
                    this.$attrs.entity.css.submenu = this.allCss + ' ' + this.$clean(Object.values(changed).join(' '))
                    console.log ( 'submenu=>' , this.$attrs.entity.css.submenu )
                } else {
                    !this.$attrs.entity.css.hasOwnProperty('css') ?
                        this.$attrs.entity.css = this.allCss + ' ' + this.$clean(Object.values(changed).join(' ')) :
                            this.$attrs.entity.css.css = this.allCss + ' ' + this.$clean(Object.values(changed).join(' ')) 
                }
            },
            deep:true
        },
    },
    mounted(){
        this.allCss = this.css
        this.allStyle = this.editor.current.style
        //this.allStyle = this.$attrs.entity.style
        let obj = []
        this.groups.forEach ( (g , i) => {
            if ( g.hasOwnProperty('filter') ){
                if ( g.filter.includes(this.$attrs.entity.type)){
                    obj.push ( g )
                }
            } else {
                obj.push ( g )
            }
        })
        this.groups = obj
        /*
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
        */
    },
    methods:{
        toggle(group){
            this.group === group ? this.group = '' : this.group = group
        },
        update(classe){
            this.allCss = this.$clean(this.allCss.replace(this.$clean(classe),' '))
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