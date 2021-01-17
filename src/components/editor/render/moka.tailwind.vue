<template>
    <div class="mt-1" :data="init">
        <template v-for="g in groups">
             <div :key="g.attr" class="w-full pl-1 mb-1 bg-gray-400 hover:bg-blue-300 hover:text-black text-black capitalize" @click="toggle(g)">
                 {{ g.label }}
             </div>
             <div v-if="g === group">
                 <div :key="$randomID()" v-for="component in g.components" class="mb-2">
                     <component 
                        :key="$randomID()"
                        :is="component.name" 
                        :component="component.name" 
                        :css="css" 
                        :stile="editor.current.style"
                        v-model="cssTw[component.attr]" 
                        :entity="editor.current"
                        :attr="component.attr" 
                        :icon="component.icon||null"
                        :classe="component.css||''"
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
import MokaBgcolor from '@/components/editor/tailwind/tailwind.bgcolor'
import MokaBgPosition from '@/components/editor/tailwind/tailwind.bgposition'
import MokaBorderColor from '@/components/editor/tailwind/tailwind.border.color'
import MokaBorderType from '@/components/editor/tailwind/tailwind.border.type'
import MokaButton from '@/components/editor/tailwind/tailwind.button'
import MokaCheckbox from '@/components/editor/tailwind/tailwind.checkbox'
import MokaColor from '@/components/editor/tailwind/tailwind.color'
import MokaGradient from '@/components/editor/tailwind/tailwind.gradient'
import MokaGrid from '@/components/editor/tailwind/tailwind.grid'
import MokaHeights from '@/components/editor/tailwind/tailwind.height'
import MokaOptions from '@/components/editor/tailwind/tailwind.options'
import MokaPosition from '@/components/editor/tailwind/tailwind.position'
import MokaRange from '@/components/editor/tailwind/tailwind.range'
//import MokaTextStyle from '@/components/editor/tailwind/tailwind.text.style'
import MokaTextFont from '@/components/editor/tailwind/tailwind.text.font'
import MokaWidths from '@/components/editor/tailwind/tailwind.width'
import { mapState } from 'vuex'
import twgroups from '@/plugins/tw.groups'
export default {
    name: 'MokaTailwind',
    components: {
        MokaBgcolor,
        MokaBgPosition,
        MokaBorderColor,
        MokaBorderType,
        MokaButton,
        MokaCheckbox,
        MokaColor,
        MokaGradient,
        MokaGrid,
        MokaPosition,
        MokaTextFont,
        //MokaTextStyle,
        MokaWidths,
        MokaHeights,
        MokaOptions,
        MokaRange,
    },
    data:()=>({
        cssTw:{},
        groups: null,
        group: '',
        allCss: '',
        allStyle: ''
    }),
    props: [ 'css'],
    computed: {
        ...mapState ( ['moka','editor'] ),
        init(){
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
        this.groups = twgroups
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
        
    },
    methods:{
        toggle(group){
            this.group === group ? this.group = '' : this.group = group
        },
        update(classe){
            console.log ( classe )
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