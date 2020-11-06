<template>
    <div :data="component" class="overflow-y-auto iscustomizer">
        <div v-if="$attrs.element && entity && entity.entity" class="overflow-y-auto p-2">
            
            <div class="bg-gray-700 text-white flex flex-row items-center p-1 shadow relative p-1" v-if="entity.coords">
                <div class="flex flex-row items-center" @dblclick="$emit('switch')">
                    <i class="material-icons mr-2" @click="$emit('switch')">horizontal_distribute</i>
                    <div>{{ entities[entity.coords.length] }}</div>
                    <i class="material-icons text-sm ml-2">{{entity.entity.icon}}</i> 
                    <!--<div class="ml-1 uppercase">{{entity.entity.type}}</div>-->
                </div>
                <div class="flex-1 absolute right-0">
                    
                    <i v-if="entity.entity.tag === 'blocks'" class="material-icons mx-2 nuxpresso-icon-circle bg-gray-600 border-0" @click="$emit('addreusable')">add</i>
                    <i v-if="entity.coords.length > 2" class="material-icons mr-2 nuxpresso-icon-circle bg-gray-600 border-0" @click="entity_copy">content_copy</i>
                    <i v-if="entity.coords.length > 1" class="material-icons mr-2 nuxpresso-icon-circle bg-gray-600 border-0" @click="entity_paste">content_paste</i>
                    <i v-if="entity.coords.length === 2" class="material-icons mr-2 nuxpresso-icon-circle bg-gray-600 border-0" @click="entity_duplicate">file_copy</i>
                    <i v-if="entity.coords.length > -1" class="material-icons mr-2 nuxpresso-icon-circle bg-gray-600 border-0" @click="confirmModal=!confirmModal">delete</i>
                    <i v-if="entity.coords.length === 1" class="material-icons mr-2 nuxpresso-icon-circle bg-gray-600 border-0" title="Save as a reusable component" @click="saveAsReusable=!saveAsReusable">save</i>
                    <i v-if="entity.coords.length === 1" class="material-icons mr-2 nuxpresso-icon-circle  bg-gray-600 border-0" title="Save as a reusable component" @click="$emit('print',entity.coords[1])">print</i>
                    <i class="material-icons mr-2" @click="$emit('close')">close</i>
                </div>
            </div>

            <div v-else class="bg-gray-700 text-white flex flex-row items-center p-1 shadow relative p-1">
                Component
            </div>
            
            <moka-tw 
                v-if="entity && !entity.entity.css.hasOwnProperty('css')" 
                :css="entity.entity.css" 
                :entity="entity.entity"
                :key="entity.entity.id"
                :columns="false"
                @stile="set_style"
                @css="setCSS"/>
            
            <moka-tw 
                v-if="entity && entity.entity.css.hasOwnProperty('css')" 
                :css="entity.entity.css.css" 
                :entity="entity.entity"
                :key="entity.entity.id"
                :columns="true"
                @stile="set_style"
                @css="setCSS"/>

            <transition name="fade">
                <div class="w-full mr-1 bg-white border shadow p-4 z-max" v-if="confirmModal">
                    <h5>Delete this object ?</h5>
                    <button @click="confirm=false,confirmModal=!confirmModal">No</button>
                    <button class="ml-2 danger" @click="confirm=true,confirmModal=!confirmModal,entity_delete()">Yes, delete</button>
                </div>  
            </transition>

            <div v-if="entity.entity.tag === 'blocks'" class="w-4/5 h-10 fixed  bottom-0 left-0 mb-10  z-top">
                <i class="absolute right-0 rounded-full hover:bg-black text-white cursor-pointer shadow-lg bg-blue-400 text-2xl p-2 material-icons mr-2" @click="$emit('addreusable')" title="Add a component or element">add</i>
            </div>
            <!-- menu settings -->
            <transition name="slidedown">
                <moka-menus v-if="entity.entity.tag==='menu'" :menu="entity.entity"/>
            </transition>

            <!-- entity position array and info status bar -->
            <!--
            <div class="fixed bottom-0 left-0 p-1 border-t w-4/5 bg-white z-max uppercase">
                <div v-if="entity.coords">
                    <span v-if="entity.entity.type">{{ entity.entity.type }}</span>
                    <i class="material-icons text-sm mx-2" v-if="entity.entity.icon">{{entity.entity.icon}}</i>
                    <span v-else>CONTAINER <i class="material-icons text-sm mx-2">select_all</i></span> {{entity.coords}}
                    <span class="mx-8">{{ entity.entity.id }}</span>
                    <span>Mobile Breakpoint <span class="lowercase font-bold">{{ breakpoint }}</span></span>
                    <input type="text" class="ml-2 w-64" v-model="entity.entity.css"/>
                </div>
                <div v-else>COMPONENT</div>
            </div>
            -->
            <div v-if="entity && entity.entity" class="flex flex-col hidden">
                <div>Element: {{entity.entity.element}}</div>
                <div class="w-full"> 
                    <div v-if="typeof entity.entity.css === 'object'" class="flex flex-col">
                        Container
                        <textarea v-model="entity.entity.css.container"/>
                        CSS 
                        <textarea v-model="entity.entity.css.css"/>
                    </div>    
                    <div v-else class="flex flex-col">
                        Element CSS
                        <textarea v-model="entity.entity.css"/> 
                    </div>
                    
                    <textarea v-model="entity.entity.content"/>
                    
                                       
                    Style
                    <textarea v-model="entity.entity.style"/>
                </div>
                <img v-if="entity.entity.image" :src="entity.entity.image.url" class="w-full"/>
                {{Object.keys(entity.entity)}}
            </div>

            <!-- image or background image -->
            <div class="p-4 text-center" v-if="entity && entity.entity.hasOwnProperty('image')">
                <span v-if="entity.entity.element!='img'">Background </span>Image
                <moka-image-placeholder v-if="entity" size="sm" :image="entity.entity.image" @noimage="entity.entity.image=null" @media="$emit('media')"/> 
                <div class="flex flex-col my-1 text-left">
                    <label>Link</label>
                    <input class="dark" type="text" v-model="entity.entity.link"/>
                    <label>Anchor</label>
                    <input class="dark" type="text" v-model="entity.entity.anchor"/>
                </div>
            </div>

            <!-- rich text editor -->
            <div class="editfields w-full my-2" v-if="entity.entity.type === 'element'">
                
                <button class="w-full mb-2" v-if="entity.entity.element && entity.entity.element==='p'" @click="editor=!editor">Edit Content</button>

                <moka-edit-content :element="entity.entity" v-else/>
                <div class="flex flex-col">
                    <label>Link</label>
                    <input class="dark" type="text" v-model="entity.entity.link"/>
                    <label>Anchor</label>
                    <input class="dark" type="text" v-model="entity.entity.anchor"/>
                </div>
            </div>

                
            <div v-if="entity.entity.tag === 'container'">
                Loop
                <select v-model="loop">
                    <option :value="false">no loop</option>
                    <option :value="true">Articles</option>
                </select>
            </div>
 
            <div class="w-full my-2" v-if="entity.entity.type === 'button' || entity.entity.type === 'video' || entity.entity.type === 'audio' && entity.entity.tag != 'menu' && entity.coords.length > 2"> 
                <moka-edit-content :element="entity.entity"/>
            </div>

            <!-- icon settings -->
            <moka-icons v-if="entity.entity.tag ==='icon'" :icon="entity.entity.content" v-model="entity.entity.content"/>

            <!-- Link && Anchor -->
            
            <div class="flex flex-col my-1" v-if="entity.entity.tag === 'icon'">
                <label>Link</label>
                <input class="dark" type="text" v-model="entity.entity.link"/>
                <label>Anchor</label>
                <input class="dark" type="text" v-model="entity.entity.anchor"/>
            </div>
            
            <!-- slider -->

            <moka-slider v-if="entity.entity.tag === 'slider'" :slider="entity.entity.element"/>
            <!-- tailwind classes -->
            <!--<button class="success w-full my-2" @click="tailwind=!tailwind">Customize</button>-->

            <!-- grid style (columns and gap settings) -->
            <!--<div v-if="entity.entity.type==='grid' && entity.entity.blocks.length > 1"  class="mb-2 flex flex-col">
                
                <div>
                    Columns Gap
                    <select v-model="grid_gap" class="mb-2">
                        <option v-for="(gap,i) in grid_gaps" :value="gap">{{gap}}</option>
                    </select>
                </div>
                <moka-customize-grid :cols="entity.entity.blocks.length" :stile="entity.entity.style" @grid="set_style"/>
            </div>-->

            
             <!-- CUSTOMIZE BUTTON => tailwind classes button -->
            <div class="w-full m-auto mt-2 text-center font-thin ">
                <div class="text-xl w-12 m-auto h-12 bg-gray-900 hover:bg-green-400 border-transparent border rounded-full flex flex-col text-gray-300 font-black animate-pulse cursor-pointer" @click="tailwind=!tailwind,$emit('disabled')">
                <div class="m-auto text-sm">M O K A</div>
                </div>
                <div class="text-gray-500 text-xs mt-1 font-hairline" @click="tailwind=!tailwind,$emit('disabled')">Customize</div>
            </div>
        </div>
        <div v-else class="p-2 overflow-y-auto">
                Select an element
            
        </div>
        <transition>
            <div class="z-max" v-if="entity && entity.entity && tailwind">
                {{ entity.entity.css }}
                <moka-tailwind 
                    v-if="!entity.entity.css.hasOwnProperty('css')" 
                    :id="tailwindID"
                    :selected="entity" 
                    :breakpoint="breakpoint"
                    @classe="setCSS" 
                    @stile="set_style"
                    :classe="entity.entity.css" 
                    @close="tailwind=!tailwind,$emit('disabled')"/>
                
                <moka-tailwind 
                    v-if="entity.entity.css.hasOwnProperty('css')" 
                    :id="tailwindID"
                    :selected="entity" 
                    :breakpoint="breakpoint"
                    @classe="setCSS" 
                    @stile="set_style"
                    :classe="entity.entity.css.css" 
                    @close="tailwind=!tailwind,$emit('disabled')"/>
            </div>
        </transition>   

        <!--
        <div style="transform:translate(-100%,-50%);top:50%;" class="fixed w-8 h-8 pt-1 pl-1 cursor-pointer border-t border-b border-l border-gray-700 shadow-lg bg-gray-800 text-white transform">
            <i class="material-icons text-xl" @click="$emit('close')">close</i>
            
        </div>
        -->
        <transition name="fade">
            <div class="nuxpresso-modal z-max bg-gray-800 rounded-lg" :data="isRichText">
                <moka-text-editor v-if="editor"  v-model="entity.entity.content" @close="editor=!editor"/>
            </div>
        </transition>

        
        <!-- SAVE AS REUSABLE -->
        <transition name="fade">
            <div v-if="saveAsReusable" class="nuxpresso-modal rounded w-full md:w-1/4 p-4 flex flex-col bg-white z-50">
                <i class="material-icons absolute top-0 right-0 cursor-pointer" @click="saveAsReusable=!saveAsReusable">close</i>
                <h4>Reusable Component</h4>
                <div>Do you want to add the current block to the reusable components ?</div>
                <label>Name*</label>
                <input type="text" v-model="newReusableComponent.name"/>
                <label>Category</label>
                <select v-model="newReusableComponent.category">
                    <option value="component">component</option>
                    <option value="widget">widget</option>
                    <option value="template">template</option>
                    <option value="page">page</option>
                    <option value="slider">slider</option>
                    <option value="gallery">gallery</option> 
                </select>
                <label>Description</label>
                <textarea v-model="newReusableComponent.description"/>
                <button @click="saveNewBlock" class="my-2">Save</button>
            </div>
        </transition>
    </div>
</template>

<script>
import MokaImagePlaceholder from '@/components/editor/moka.editor.image.placeholder'
import MokaCustomizeGrid from '@/components/editor/moka.customize.grid'
import MokaTextEditor from '@/components/editor/moka.text.editor'
import MokaEditContent from '@/components/editor/moka.edit.content'
import MokaMenus from '@/components/editor/moka.menus'
import MokaEditorSlider from '@/components/editor/moka.editor.slider'
import MokaTailwind from '@/components/editor/tailwind.class.helper'//moka.customize.tailwind'
import MokaIcons from '@/components/editor/moka.customize.icon'
import MokaTw from '@/components/editor/moka.tailwind'
import fonts from '@/plugins/icons'
import { mapState } from 'vuex'
export default {
    components: {  MokaCustomizeGrid , MokaTextEditor , MokaTailwind , MokaEditContent , MokaMenus, MokaEditorSlider, MokaIcons, MokaImagePlaceholder , MokaTw },
    data:()=>({
        settings: false,
        breakpoint:'md',
        confirmModal: false,
        confirm:false,
        editor:false,
        media: false,
        slider_settings: true,
        tailwind: false,
        tailwindID: 0,
        fontFamily:'Barlow Condensed',
        init: false,
        entity: null,
        loop: false,
        articleID: null,
        grid_settings:[],
        grid_gaps: [ '' , '1' , '2' , '3' , '4' , '5' , '6' , '8', '10' , '12', '16', '20', '24', '32', '40', '48', '56', '64' ],
        grid_gap:'',
        grid_columns:1,
        entity_copied: null,
        stile: '',
        saveAsReusable: false,
        newReusableComponent: {
            name: 'New reusable component',
            description: 'A new reusable component',
            category: 'component'
        },
        grid_cols:3,
        grid_tot:100,
        col_1 : 50,
        col_2 : 50,
        entities : [ 'Body', 'Block' , 'Container' , 'Element' , 'Block' , 'Container' , 'Element' , 'Element'],

        printScreen: null,
    }),
    props: [ 'id'],
    watch:{
        id(){
            this.tailwindID = this.$randomID()
        },
        loop(v){
            this.$attrs.component.loop = v
            this.$attrs.component.json.loop = v
            this.entity.entity.loop = v
        },
        tailwind(v){
            this.tailwindID = this.$randomID()
            !v ? this.$emit('disabled') : null
        }, 
        grid_columns(v){
            if ( v < this.entity.entity.blocks.length ){
                this.entity.entity.css.container = 'flex flex-col md:grid md:grid-cols-' + v
            }
        },
        grid_gap(v){
            let container_css = this.entity.entity.css.container.split(' ')
            let classes = container_css.map ( (cl,index) => {
                if ( cl.indexOf('gap-') > -1 ){
                    return ''
                } else {
                    return cl
                } 
                
            })
            let gap = v ? ' gap-' + v : ''
            this.entity.entity.css.container = this.$clean(classes.join(' ') + gap ) 
        },
        fontFamily(font){
             
            document.querySelector('#content').style.fontFamily = font
            this.$attrs.component.json.blocks[0].block.style = 'font-family:\"' + font + '\"'
        },
        articleID(id){
            this.$http.get('articles/' + id ).then ( response=> {
                this.entity.entity['article'] = response.data
            })
        }
    },
    computed:{
        ...mapState ( ['moka'] ),
        component(){
            this.entity = this.$attrs.element
            this.entity.entity ? this.entity.entity.hasOwnProperty('cols') ? this.grid_columns = this.entity.entity.cols : 0 : null
            this.isRichText
            this.grid_settings = []
        },
        isRichText(){
            return
            if ( this.entity.entity && this.entity.entity.element === 'p'){
                this.editor = true
            }
        }
    },
    methods:{
        mobile(bp){
            return bp === this.breakpoint ? 'nuxpresso-icon-circle' : ''
        },
        test(css){
            document.querySelector('#content').style.fontFamily = 'Amethysta'
            console.log ( css )
        },
        setCSS(css){
            console.log ( css )
            !this.entity.entity.css.hasOwnProperty('css') ?
                this.entity.entity.css = css :
                    this.entity.entity.css.css = css
        },
        set_css(css){
            this.entity.entity.css = css
        },
        set_style(stile,extra){
            if ( stile )
                this.entity.entity.style = stile
            if ( extra ){
                this.entity.entity.css.container = this.entity.entity.css.container + ' ' + extra
            }    
        },
        set_image(img){
            this.entity.entity.image = img
        },
        entity_copy(){
            this.entity_copied = Object.assign ( {} , this.entity.entity )
            this.entity_copied.id = this.$randomID()
        },
        entity_duplicate(){
            let master = this.$attrs.component.json.blocks[this.entity.coords[0]]
            let obj = {}
            obj = Object.assign ( {} , this.entity.entity )
            obj.id = this.$randomID()
            let blocks = []
            obj.blocks.forEach ( block => {
                let bb = {}
                bb = Object.assign ( {} , block )
                bb.id = this.$randomID()
                blocks.push ( bb )
            })
            obj.blocks = blocks
            master.blocks.push(obj)
            master.cols++
            master.css.container = 'flex flex-col md:grid md:grid-cols-' + master.blocks.length
            return
        },
        entity_paste(){
            if ( this.entity_copied ){
                
                let obj = Object.assign ( {} , this.entity_copied )
                obj.id = this.$randomID()
                this.entity.entity.blocks.push ( obj )
            }
        }, 
        entity_delete(){
            let coords = this.entity.coords

            if ( coords && this.confirm ){
                if ( coords.length === 2 ){
                    console.log ( 'removing container ')
                    let master = this.$attrs.component.json.blocks[coords[0]]
                    master.blocks.splice ( coords[1] , 1)
                    master.cols--
                    master.css.container = 'flex flex-col md:grid md:grid-cols-' + master.blocks.length
                    return 
                } else {
                    this.$emit ( 'delete' )
                    this.confirm = false
                }
            }  
        },
        tag(){
            return this.entity.entity.element != 'image' ? 'input' : 
                    false
        },
        saveNewBlock(){
            let comp =  {
                name: this.newReusableComponent.name,
                description: this.newReusableComponent.description,
                image: null,
                image_uri: null,
                category: this.newReusableComponent.category,
                json : {    
                    id: null,
                    css: '',
                    image: null,
                    tag: 'document',
                    blocks: [
                        this.entity.entity
                    ]
                }
            }
            this.saveAsReusable = false
            this.$emit('saveblock',comp)
        }
         
    },
    mounted(){
    }
}
</script>

<style>
.editfields > div > input , .editfields > div > textarea , .editfields > div > select {
    background: black;
}
</style>