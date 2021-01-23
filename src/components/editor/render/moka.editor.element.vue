<template>
    <div editorelement v-if="element" :class="$attrs.develop ? 'relative ' : ''" @dblclick="$emit('editinline',element)" :style="element.style">
            <span :class="'text-xs ' + showid">{{element.id}}</span> 
            
            <!--<span :class="'relative z-2xtop '" v-if="editor.current && editor.current.id === el.id && editor.current.tag === 'element'">
                <moka-text-editor v-if="editor.current.tag === 'element' && editor.current.element === 'p'"  v-model="editor.current.content" @close="editContent=!editContent"/>
                
                
                
            </span>
            
            <span v-else>
                -->
            <moka-inline-editor v-if="(el.tag==='element' || el.type==='button' || el.type==='download' || ( el.tag === 'article' && !el.hasOwnProperty('article') ) )  && el.element !='img' && el.type != 'video' && el.type != 'audio'" :element="el"/>
            <!--
            <div  class="relative z-2xtop"  v-if="editor.current && editor.current.id === el.id && editor.current.tag === 'element' && editor.current.element === 'div'">
                <moka-inline-editor v-if="editor.current && editor.current.tag === 'element' && editor.current.element != 'p'"/>
            </div>-->
            <!--<div v-else>-->
            
            <!--<component :class="$cssResponsive(el.css)" :is="tag" v-html="el.content" v-if="(el.tag==='element' || el.type==='button' || ( el.tag === 'article' && !el.hasOwnProperty('article') ) )  && el.element !='img' && el.type != 'video' && el.type != 'audio'" :style="stile"></component>
            -->
            
            <component :is="tag" v-if="el.tag === 'article' && el.hasOwnProperty('article')" v-html="el.article[el.label]"/>
            
            <svg v-if="el.tag === 'svg'" :viewBox="el.content.viewBox" width="100%" height="100%" v-html="el.content.g" :class="el.css + ' fill-current'"></svg>

            <img v-if="el.element === 'img' && el.image && el.image.url && el.image.ext != '.svg'" 
                :src="$imageURL(el.image)" :caption="el.image.caption" :alt="el.image.alternative_text" :class="$cssResponsive(el.css)"/>
            
            <div v-if="(el.element === 'img')  && el.image && el.image.ext === '.svg'" :class="el.css + ' fill-current'">     
                <simple-svg :src="$imageURL(el.image)" width="100%" height="100%"/>
            </div>
            <!--<button v-if="el.element === 'button'" :class="el.css">{{ el.content }}</button>-->

            <img :class="$cssResponsive(el.css)" :ref="el.id" v-if="el.type==='video' && el.image && el.image.url && el.image.ext != '.svg'" :src="$imagePreviewURL(el.image)"/><!--el.image.previewUrl-->

            <i :class="'material-icons text-10xl m-auto ' + $cssResponsive(el.css)" v-if="el.type==='video' && !el.image" :title="el.label">movie</i> 

            
            <i :class="'material-icons text-4xl m-auto ' + $cssResponsive(el.css)" v-if="el.type==='audio'" :title="el.label"> audiotrack</i>
            
            <i :class="'material-icons text-10xl m-auto ' + $cssResponsive(el.css)" v-if="el.type==='image' && !el.image">photo</i> 

            <input :type="el.type" v-if="el.element!= 'textarea' && el.tag === 'input' && el.type!='button'" :class="$cssResponsive(el.css)" :value="el.content" :placeholder="el.required?'required!':''"/><sup v-if="el.required" class="ml-1 nuxpresso-element-required">*</sup>

            <!-- icon -->
            <i v-if="el.tag==='icon' && !el.link" :class="'material-icons moka-icons ' + $cssResponsive(el.css)">{{el.content}}</i>
            <a v-if="el.link && el.tag==='icon'" :href="el.link">
                <i v-if="el.tag==='icon'" :class="'material-icons moka-icons ' + $cssResponsive(el.css)">{{el.content}}</i>
            </a>



            <textarea v-if="el.element === 'textarea'" :class="$cssResponsive(el.css)"></textarea>
            <!--</div>-->
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
            <div v-if="$attrs.develop " :class="'absolute border border-green-500 border-dashed z-top top-0 left-0 bottom-0 right-0 scale-x-102 scale-y-102 transform ' + active(el.id,el.css) + ' bg-transparent'" style="min-height:2rem" @click="select(el)">
                <div class="h-2 w-2 absolute top-0 right-0 bg-black rounded-full -m-1"></div>
                <div class="h-2 w-2 absolute top-0 left-0 bg-black rounded-full -m-1"></div>
                <div class="h-2 w-2 absolute bottom-0 right-0 bg-black rounded-full -m-1"></div>
                <div class="h-2 w-2 absolute bottom-0 left-0 bg-black rounded-full -m-1"></div>
                <!-- 
                    <i class="absolute top-0 right-0 material-icons nuxpresso-icon-circle text-sm text-black -mt-4" @click="$emit('editinline')">{{ el.icon }}</i>-->
                <div class="absolute bottom-0 left-0 -mb-4 text-xs text-purple-500" v-if="el.gsap && el.gsap.animation">{{ el.gsap.animation }}</div>
            </div>
             <div v-if="el.id===moka.selected" class="z-top absolute top-0 left-0 -mt-6 h-6 bg-gray-800 text-gray-300 text-xs rounded-2xl items-center flex flex-row">
                    <!--,$store.dispatch('setParent',$attrs.parent)-->
                    <i class="material-icons text-sm text-gray-600 leading-4 ml-2" @click="toolbar=!toolbar,$store.dispatch('setAction','replaceelement'),$store.dispatch('setParent',$attrs.parent)" title="Replace element">{{ el.icon }}</i>
                    <i class="material-icons text-sm text-gray-600 hover:text-blue-500 leading-4 mr-2" @click="toolbar=!toolbar" v-if="!toolbar">arrow_right</i>
                    <i class="material-icons text-sm text-gray-600 hover:text-blue-500 leading-4 mr-2" @click="toolbar=!toolbar" v-if="toolbar">arrow_left</i>
                        <div v-if="toolbar||!toolbar" class="flex flex-row items-center">
                        <i class="material-icons hover:text-blue-500 text-sm leading-4 mx-2" @click="$store.dispatch('setAction','edit')" title="Edit content">edit</i>
                        <i class="material-icons hover:text-blue-500 text-sm leading-4 mx-2" @click="$store.dispatch('setAction','customize'),toolbar=!toolbar" title="Customize">brush</i>
                        <i class="material-icons hover:text-blue-500 text-sm leading-4 mx-2" @click="$store.dispatch('setAction','delete')" title="Delete">delete</i> 
                        </div>
                </div>
            
    </div>
</template>

<script>
import MokaTextEditor from '@/components/editor/render/moka.text.editor'
import MokaInlineEditor from '@/components/editor/render/moka.editor.inline'
import { mapState } from 'vuex'
export default {
    name: 'MokaEditorElement',
    components: { MokaTextEditor , MokaInlineEditor },
    data:()=>({
        el: null,
        article: 'article',
        opacity: 'opacity-0',
        menuover: -1,
        menu_show: false,
        toolbar: false,
    }),

    props: ['current'],
   
    computed:{
        ...mapState ( ['moka','editor'] ),
        showid(){
            return this.$attrs.debug ? '' : 'hidden'
        },
        element(){
            //this.$attrs.element && this.$attrs.element.css ? this.$attrs.element.css = this.$clean(this.$attrs.element.css,'md:') : null
            return this.$attrs.element  ? this.el = this.$attrs.element : false
        },
        tag(){
            if ( !this.editor.current ){
                return this.$attrs.element.element === 'h' ? 
                            'h' + this.$attrs.element.level : 
                                    this.$attrs.element.element
            } else {
                return this.$attrs.element.id != this.editor.current.id ?
                    this.$attrs.element.element === 'h' ? 
                        'h' + this.$attrs.element.level : 
                            this.$attrs.element.element : 
                                MokaInlineEditor
            }
        },
        stile(){
            if (this.el.image ){
                return 'background-image:url(' + this.el.image.url + ');background-repeat:no-repeat; background-size:cover;background-position:center center; ' + this.el.style  
            }
            return ''
        },
        
        
    },
    /*
    async asyncData({context}){
        const { data } = await this.$axios.$get('articles/2')
        console.log ( data )
        return { article: data.content }
    },
    */
    methods:{
        select(el){
            this.$store.dispatch('selected',el.id)
            this.$emit('selected',el)
        },
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
            if ( css && css.length ){
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
        },
        handleInput: function(e){
            let pippo = '<a style="pippo">'.replace(/style=\".*"/gm,'')
            console.log ( pippo )
            let text = e.target.innerHTML.replaceAll(/style=\".*"/gm,'')
            console.log ( text )
            this.editor.current.content = text//e.target.innerHTML
            //this.editor.current.content = this.editor.current.content.replace(/<style.*?<\/style>/g, '')
        },
    }
}
</script>   