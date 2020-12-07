<template>
    <div editorelement v-if="element" @click="$emit('selected')" :class="$attrs.develop ? 'relative z-top' : ''" @dblclick="$emit('editinline',element)" :style="element.style">

            <component :class="$cssResponsive(el.css)" :is="tag" v-html="el.content" v-if="(el.tag==='element' || el.type==='button' || ( el.tag === 'article' && !el.hasOwnProperty('article') ) )  && el.element !='img' && el.type != 'video' && el.type != 'audio'" :style="stile"></component>
            
            <component :is="tag" v-if="el.tag === 'article' && el.hasOwnProperty('article')" v-html="el.article[el.label]"/>
            
            <svg v-if="el.tag === 'svg'" :viewBox="el.content.viewbox" width="100%" height="100%" v-html="el.content.g" :class="el.css + ' fill-current'"></svg>

            <img v-if="el.element === 'img' && el.image && el.image.url && el.image.ext != '.svg'" :src="el.image.url" :caption="el.image.caption" :alt="el.image.alternative_text" :class="$cssResponsive(el.css)"/>
            
            <div v-if="(el.element === 'img')  && el.image && el.image.ext === '.svg'" :class="el.css + ' fill-current'">     
                <simple-svg :src="el.image.url" width="100%" height="100%"/>
            </div>
            <!--<button v-if="el.element === 'button'" :class="el.css">{{ el.content }}</button>-->

            <img :class="$cssResponsive(el.css)" :ref="el.id" v-if="el.type==='video' && el.image && el.image.url && el.image.ext != '.svg'" :src="el.image.previewUrl"/>

            <i :class="'material-icons text-10xl ' + $cssResponsive(el.css)" v-if="el.type==='video' && !el.image">movie</i> 
            <i :class="'material-icons text-10xl ' + $cssResponsive(el.css)" v-if="el.type==='image' && !el.image">photo</i> 

            <input :type="el.type" v-if="el.tag === 'input' && el.type!='button'" :class="$cssResponsive(el.css)" :value="el.content" :placeholder="el.required?'required!':''"/><sup v-if="el.required" class="ml-1 nuxpresso-element-required">*</sup>

            <!-- icon -->
            <i v-if="el.tag==='icon' && !el.link" :class="'material-icons moka-icons ' + $cssResponsive(el.css)">{{el.content}}</i>
            <a v-if="el.link && el.tag==='icon'" :href="el.link">
                <i v-if="el.tag==='icon'" :class="'material-icons moka-icons ' + $cssResponsive(el.css)">{{el.content}}</i>
            </a>


            <textarea v-if="el.element === 'textarea'" :class="$cssResponsive(el.css)"></textarea>
 
            <nav v-if="el.element === 'menu'" :class="el.css.container + ' ' + el.css.align"> 
                <div v-for="(item,i) in el.items" :class="el.css.css + ' cursor-pointer relative pr-4'" :key="el.id + '_' + i"> 
                    
                    
                    <a :class="el.css.css" v-if="!item.submenu && !$attrs.develop && item.link && !item.link.includes('http')" :href="item.link">{{ item.label }} <i v-if="item.submenu" class="material-icons moka-icons">arrow_drop_down</i></a>
                    
                    <div v-else @mouseover="menuover=i" :class="el.css.css" @click="menuover=i">{{item.label}} <i v-if="item.submenu && item.submenu.length" :class="el.css.css + ' material-icons moka-icons text-sm'">arrow_drop_down</i></div>
                    
                    <div v-if="item.submenu && item.submenu.length && !$attrs.develop" :class="isOver(i) + ' ' + el.css.css + ' absolute w-48 p-1 flex flex-col z-max'" @mouseleave="menuover=-1"> 
                        <div v-for="sub in item.submenu">
                            <div :class="el.css.css">{{sub.label}}</div>
                        </div>
                    </div>
                </div>
            </nav>
            <i :class="'material-icons moka-icons z-top fixed md:hidden top-0 left-0 m-1 ' + el.css.css" v-if="el.element === 'menu' && el.responsive" @click="menu_show=!menu_show">menu</i>
            <transition name="fade">
            <nav v-if="el.element === 'menu' && menu_show" class="z-top flex flex-col p-1 my-2"> 
                <div v-for="(item,i) in el.items" :class="el.css.css + ' cursor-pointer relative p-1'"> 
                    
                    <a :class="el.css.css" v-if="!item.submenu && !$attrs.develop && item.link && !item.link.includes('http')" :href="item.link">{{ item.label }} <i v-if="item.submenu" class="material-icons moka-icons">arrow_drop_down</i></a>
                    
                    <div v-else @mouseover="menuover=i" :class="el.css.css" @click="menuover=i">{{item.label}} <i v-if="item.submenu && item.submenu.length" :class="el.css.css + ' material-icons moka-icons text-sm'">arrow_drop_down</i></div>
                    
                    <div v-if="item.submenu && item.submenu.length" :class="isOver(i) + ' ' + el.css.css + ' absolute w-48 p-1 flex flex-col z-40'" @mouseleave="menuover=-1"> 
                        <div v-for="sub in item.submenu">
                            <div :class="el.css.css">{{sub.label}}</div>
                        </div>
                    </div>
                </div>
            </nav>
            </transition>
            <div v-if="$attrs.develop" :class="'z-top absolute border border-green-500 border-dashed z-4 top-0 left-0 bottom-0 right-0 scale-x-102 scale-y-102 transform ' + active(el.id,el.css) + ' bg-transparent'" @click="$store.dispatch('selected',el.id),$emit('selected')">
                <!--<i class="absolute top-0 right-0 material-icons nuxpresso-icon-circle text-sm text-black -mt-4" @click="$emit('editinline')">{{ el.icon }}</i>-->
                <div v-if="el.id===moka.selected" class="absolute top-0 left-0 -mt-6 h-6 bg-gray-800 text-gray-300 text-xs rounded-2xl items-center flex flex-row">
                    <i class="material-icons text-sm text-gray-600 leading-4 ml-2" @click="toolbar=!toolbar">{{ el.icon }}</i>
                    <i class="material-icons text-sm text-gray-600 hover:text-blue-500 leading-4 mr-2" @click="toolbar=!toolbar" v-if="!toolbar">arrow_right</i>
                    <i class="material-icons text-sm text-gray-600 hover:text-blue-500 leading-4 mr-2" @click="toolbar=!toolbar" v-if="toolbar">arrow_left</i>
                    <transition name="fade">
                        <div v-if="toolbar" class="flex flex-row items-center">
                        <i class="material-icons hover:text-blue-500 text-sm leading-4 mx-2" @click="$emit('editinline')">edit</i>
                        <i class="material-icons hover:text-blue-500 text-sm leading-4 mx-2" @click="$emit('customize'),toolbar=!toolbar">brush</i>
                        <i class="material-icons hover:text-blue-500 text-sm leading-4 mx-2" @click="$emit('copy')">content_copy</i>
                        <i class="material-icons hover:text-blue-500 text-sm leading-4 mx-2" @click="$emit('animation')">motion_photos_on</i>
                        <i class="material-icons hover:text-blue-500 text-sm leading-4 mx-2" @click="$emit('delete')">delete</i>
                        </div>
                    </transition>
                </div>
            </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import gallery from '@/components/moka/moka.gallery'
export default {
    name: 'MokaEditorElement',
    data:()=>({
        el: null,
        article: 'article',
        opacity: 'opacity-0',
        menuover: -1,
        menu_show: false,
        toolbar: false,
    }),

    props: ['current'],
    beforeMount(){
        let vm = this
        
        this.article = 'article[' + this.$attrs.element.field + ']'
        if ( this.$attrs.element.element === 'article' && this.$attrs.element.id ){
            console.log ( this.$attrs.element.id )
            this.$axios.$get ( 'articles/' + this.$attrs.element.id ).then ( response => {
                vm.article = response[this.$attrs.element.field]
                return Promise.resolve(response)
            })
        }
    },
    computed:{
        ...mapState ( ['moka'] ),
        
        element(){
            //this.$attrs.element && this.$attrs.element.css ? this.$attrs.element.css = this.$clean(this.$attrs.element.css,'md:') : null
            return this.$attrs.element  ? this.el = this.$attrs.element : false
        },
        tag(){
            return this.$attrs.element.element === 'h' ? 'h' + this.$attrs.element.level : 
                    this.$attrs.element.element
        },
        stile(){
            if (this.el.image ){
                return 'background-image:url(' + this.el.image.url + ');background-repeat:no-repeat; background-size:cover;background-position:center center; ' + this.el.style  
            }
            return ''
        },
        
        
    },
    async asyncData({context}){
        const { data } = await this.$axios.$get('articles/2')
        console.log ( data )
        return { article: data.content }
    },
    methods:{
        layer(){
            
            let classe = 'relative '
            if ( this.element.css.length ){
                let cl = this.element.css.split(' ')
                cl.forEach ( z => {
                    z.indexOf('z-') > -1 ? classe += z : null
                })
                return classe
            }
            classe += 'z-top'
            return classe
        },
        responsiveCss(css){
            return css //this.$clean ( this.$cssResponsive ( css ) )
        
        },
        active(id,css){
            let translate = ''
            
            if ( css.length ){
                let classi = css.split(' ')
                classi.forEach ( classe => {
                    if ( classe.indexOf ( 'translate' ) > -1 ){
                        translate += ' transform ' + classe
                    }
                    if ( classe.indexOf ( 'w-') > -1 ){
                        translate += ' '
                    }
                    if ( classe.indexOf ( 'h-') > -1 ){
                        translate += ' '
                    }
                    
                })
            }
            if ( id === this.moka.selected ){
                
                return ' opacity-100 bg-transparent ' + translate
            }
            return ' opacity-0 hover:opacity-100 bg-transparent ' + translate
        },
        isOver(i){
            return i < 0 ? 'opacity-0' : this.menuover === i ? 'opacity-100' : 'opacity-0'
        },
        menu_responsive(menu){
            if ( menu.type === 'horizontal' ) return 'flex flex-row' 
            if ( menu.type === 'vertical' ) return 'flex flex-col'
            if ( menu.responsive ) return menu.css.container.replace('flex-row','h-0 opacity-0 md:h-auto md:opacity-100 flex-col md:flex-row')
        }
    }
}
</script>   