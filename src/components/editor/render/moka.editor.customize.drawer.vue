<template>
    <div :data="component" class="w-full relative h-screen overflow-y-auto mb-2 p-1 shadow">
        <div v-if="$attrs.element && entity && entity.entity" class="absolute top-0 left-0 overflow-y-auto h-auto w-full p-1 z-2xtop h-screen">
            
            <div class="bg-teal-700 text-white flex flex-row items-center p-1 shadow relative p-1">
                <div class="flex flex-row items-center" @dblclick="$emit('switch')">
                    
                    <div>
                        <span v-if="entity.entity.tag!='menu'">{{ entity.entity.type }}</span>
                        <span v-else>Menu <span v-if="customizeDropdown">Dropdown</span></span>
                    </div>
                    <i class="material-icons text-sm ml-2">{{entity.entity.icon}}</i> 
                </div>
                <div class="flex-1 absolute right-0 mt-2">
                    <i class="material-icons mr-2" @click="$emit('switch')" v-if="!$attrs.position">first_page</i>
                    <i class="material-icons mr-2" @click="$emit('switch')" v-else>last_page</i> 
                    <i class="material-icons mr-2" @click="$emit('close')">close</i>
                </div>
            </div>
            <moka-tw 
                v-if="entity && entity.entity.tag!='menu' && !entity.entity.css.hasOwnProperty('css')" 
                :css="entity.entity.css" 
                :entity="entity.entity"
                :key="entity.entity.id"
                :columns="false"
                @stile="set_style"
                @css="setCSS"/>
            
            <moka-tw 
                v-if="entity && entity.entity.tag !='menu' && entity.entity.css.hasOwnProperty('css')" 
                :css="entity.entity.css.css" 
                :entity="entity.entity"
                :key="entity.entity.id"
                :columns="true"
                @stile="set_style"
                @css="setCSS"/>

            <moka-tw 
                v-if="entity && entity.entity.tag ==='menu'" 
                :css="!customizeDropdown?entity.entity.css.css:entity.entity.css.submenu" 
                :allCss="!customizeDropdown?entity.entity.css.css:entity.entity.css.submenu"
                :entity="entity.entity"
                :key="entity.entity.id"
                :columns="true"
                :submenu="customizeDropdown"
                @stile="set_style"
                @css="setCSS"/>
            <!--
            <moka-tw 
                v-if="entity && entity.entity.tag ==='menu' && customizeDropdown" 
                :css="entity.entity.css.submenu" 
                :entity="entity.entity"
                :key="$randomID()"
                :columns="true"
                :submenu="true"
                @stile="set_style"
                @css="setCSSSubmenu"/>
            -->
            
            <transition name="fade">
                <div class="w-full mr-1 bg-white border shadow p-4 z-max" v-if="confirmModal">
                    <h5>Delete this object ?</h5>
                    <button @click="confirm=false,confirmModal=!confirmModal">No</button>
                    <button class="ml-2 danger" @click="confirm=true,confirmModal=!confirmModal,entity_delete()">Yes, delete</button>
                </div>  
            </transition>

            <moka-edit-content 
                :entity="entity" 
                :element="entity.entity" 
                :component="$attrs.component"
                @media="$emit('media')"/>
            <!--
            <div class="flex flex-col mt-2">
                <label>HTML Semantic</label>
                <select class="dark" v-model="entity.entity.semantic">
                    <option value=""></option>
                    <option v-for="semantic in semantics" :value="semantic">{{ semantic }}</option>
                </select>
            </div>
            -->
            <!-- customize dropdown to be fixed -->
            <!--
            <div v-if="entity && entity.entity.tag === 'menu'"><button   @click="customizeDropdown=!customizeDropdown" class="flex flex-row items-center justify-center w-full mt-1">
                <i class="material-icons">brush</i><span v-if="!customizeDropdown">Customize dropdown menu</span>
                <span v-else>Customize main menu</span></button></div>
            {{ customizeDropdown }}
            <moka-slider v-if="entity.entity.tag === 'slider'" :slider="entity.entity.element"/>
            -->

        </div>
        
        <!--
        <transition name="fade">
            <div class="nuxpresso-modal z-max bg-gray-800 rounded-lg" :data="isRichText">
                <moka-text-editor v-if="editor"  v-model="entity.entity.content" @close="editor=!editor"/>
            </div>
        </transition>
        -->
        
        <!-- SAVE AS REUSABLE -->
        <!--
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
        -->
    </div>
</template>

<script>
//import MokaImagePlaceholder from '@/components/editor/render/moka.editor.image.placeholder'
//import MokaCustomizeGrid from '@/components/editor/moka.customize.grid'
//import MokaTextEditor from '@/components/editor/moka.text.editor'
import MokaEditContent from '@/components/editor/render/moka.edit.content'
//import MokaIcons from '@/components/editor/render/moka.customize.icon'
import MokaTw from '@/components/editor/render/moka.tailwind'
import fonts from '@/plugins/icons'
import { mapState } from 'vuex'
export default {
    name: 'MokaCustomizer',
    components: {  
        //MokaCustomizeGrid , 
        //MokaTextEditor , 
        MokaEditContent , 
        //MokaIcons, 
        //MokaImagePlaceholder , 
        MokaTw 
    },
    data:()=>({
        customizeDropdown: false,
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
        entity: {
            entity: null
        },
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
        stile(v){
            this.entity.entity.style = v
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
            this.entity.entity = this.$attrs.element
            //this.entity.entity = this.moka.current 
            this.entity.entity.tag === 'blocks' ? this.entity.entity.type = 'flex' : null
            this.entity.entity.tag === 'blocks' ? this.entity.entity.icon = 'select_all' : null
            this.entity.entity ? this.entity.entity.hasOwnProperty('cols') ? this.grid_columns = this.entity.entity.cols : 0 : null
            this.isRichText
            !this.entity.entity.css.hasOwnProperty('css') ?
                this.entity.entity.css = this.$clean(this.entity.entity.css , 'md:' ) :
                    this.entity.entity.css.css = this.$clean(this.entity.entity.css.css , 'md:' ) 
            this.entity.entity.type === 'video' ?
                !this.entity.entity.hasOwnProperty('options') ?
                    this.entity.entity.options = {
                        autoplay: true,
                        loop: true,
                        controls: true
                    } : null : null
            this.grid_settings = []
            this.stile = this.$attrs.element.style
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
        },
        setCSS(css){
            !this.entity.entity.css.hasOwnProperty('css') ?
                this.entity.entity.css = css :
                    this.entity.entity.css.css = css
            this.$store.dispatch('current',this.entity.entity)
        },
        setCSSSubmenu(css){
            console.log ('submenu',css )
            this.entity.entity.css.submenu = css
            this.$store.dispatch('current',this.entity.entity)
        },
        set_css(css){
            this.entity.entity.css = css
        },
        set_style(stile,extra){
            this.entity.entity.style = this.$clean(stile)
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