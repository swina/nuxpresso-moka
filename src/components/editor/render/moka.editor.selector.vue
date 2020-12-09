<template>
<!-- MAIN CONTAINER -->
<div class="w-full h-auto pb-10 mb-10 top-0 left-0 relative" data="init">
    
    <div v-if="$attrs.category!='element'">
        
        <div :class="doc.css + ' relative p-4 text-black '" :style="stile(doc,true) + ' ' + background(doc)" id="content">
            <template v-for="(block,b) in doc.blocks">
                
                <moka-container 
                    :key="block.id" 
                    :doc="block"
                    :component="doc" 
                    :level="b"
                    :index="b"
                    :slide="false"
                    :top="true" 
                    :pos="[0,b]"
                    :coords="[0,b]" 
                    :zi="b+1"
                    :dropdown="dropdownView"
                    @copy="copy"
                    @selected="selected"
                    @customize="customize" 
                    @animations="animation=!animation"
                    @edit="edit"/>
            
            </template>
        </div>
        
    </div> 
    <!--- ELEMENTS EDITOR -->
    <div v-else>
         <moka-element  
            :key="element.id"
            data-trigger="scroller"
            :element="element"
            v-for="(element,e) in doc.blocks" 
            v-if="element.type!='grid' && element.type != 'flex' && !doc.hasOwnProperty('slider')" 
            :coords="[e]"
            :develop="true"
            @selected="selected"
            @customize="customize"
            @animation="animations=!animations"
            @delete="confirmModal=!confirmModal"
            @edit="editContent=!editContent"/>
    </div>
    
    <!-- STATUS BAR -->
    <div editorstatus class="fixed bg-gray-300 z-top bottom-0 left-0 p-1 border-t w-full flex flex-row items-center text-sm bg-white z-max uppercase divide-x divide-gray-400">
        <div v-if="editor.current" class="pl-1 w-full flex flex-row items-center">
            
            <span v-if="editor.current.type">{{ editor.current.type }}</span>
            <!--<i v-if="moka.current" class="material-icons" @click="swap(false)">expand_less</i>
            <i v-if="moka.current" class="material-icons" @click="swap(true)">expand_more</i>
            -->
            <i class="material-icons text-sm mx-2" v-if="editor.current.icon">{{editor.current.icon}}</i>
            <span v-else>CONTAINER <i class="material-icons text-sm mx-2">select_all</i></span>
            <span class="mx-8"># {{ editor.current.id }}</span>
            <span>Mobile Breakpoint <span class="lowercase font-bold mr-2">{{ breakpoint }}</span></span>
            <span class="capitalize">CSS class</span>
            
            <input v-if="!editor.current.css.hasOwnProperty('css')" type="text" class="ml-2 w-5/12" v-model="editor.current.css"/>
            <input v-else type="text" class="ml-2 w-5/12" v-model="editor.current.css.css"/>
            <i class="material-icons moka-icon-circle ml-2" title="Edit CSS classes" @click="editCSS=!editCSS">edit</i>
            
            
        </div>
        <div v-else>COMPONENT</div>
    </div>
    
    <transition name="fade">
        <div class="z-xtop fixed bg-gray-800 text-gray-400 bottom-0 right-0 w-3/12 p-2 border shadow bg-white" v-if="editCSS">
            <i class="material-icons absolute top-0 right-0 m-1" @click="editCSS=!editCSS">close</i>
            <div>CSS</div>
            <textarea v-if="!editor.current.css.hasOwnProperty('css')" class="dark w-full h-64 text-gray-400" v-model="editor.current.css"/>
            <textarea v-else class="dark w-full h-64 text-gray-400 outline-none border-none" v-model="editor.current.css.css"/>
        </div>
    </transition>
    <div v-if="current && current.entity" class="fixed bottom-0 left-0 p-1">{{ current.tag }} <i class="material-icons">{{ current.icon }}</i></div>

    <!-- RIGHT VERTICAL TOOLBAR -->
    <transition name="slideright">
        <moka-side-bar 
            :current="editor.current"
            :component="doc" 
            @tree="tree=!tree"
            @customize="customize=!customize"
            @edit="$emit('edit',current)"
            @animations="animations=!animations"
            @reusable="$emit('reusable',current)"
            @copy="copy"
            @paste="$emit('paste')"
            @duplicate="$emit('duplicate',current)"
            @preview="$emit('preview')"
            @slider="$emit('slider')"
            @save="$emit('save')"
            @saveblock="$emit('saveblock',current)"
            @import="$emit('import')"
            @delete="confirmModal=!confirmModal"/>
    </transition>
   
    <transition name="fade">
        <div v-if="editor.action==='customize'" :class="'fixed right-0 top-0 w-1/5 z-2xtop min-h-screen bg-gray-800 text-xs text-gray-500 ' + customizePos" ref="aContainer">
             <moka-customize-drawer
                :position="customizeSwitch"
                class=""
                :id="customizerID"
                :element="editor.current"
                :component="moka.component"
                @media="media=!media"
                @close="$store.dispatch('setAction',null)"
                @switch="customizeSwitch=!customizeSwitch"
                @dropwdown="dropdown"/>
                <!--customizeElement-->
        </div>
    </transition>

    <!-- EDIT CONTENT INLINE -->
    <transition name="fade">
        <div v-if="editor.action==='edit' && editor.current && editor.current.type != 'image' && editor.current.type != 'video' && editor.current.tag != 'menu'" draggable="true" class="nuxpresso-modal w-1/2 border shadow-lg text-sm z-top">
            <div class="bg-gray-700 text-white p-1 flex items-center">Edit <i class="material-icons ml-2 absolute right-0 mr-8 text-sm" title="Customize" @click="$store.dispatch('setAction','customize')">brush</i><i class="material-icons absolute  right-0  text-white mr-1 cursor-pointer" @click="$store.dispatch('setAction',null),editContent=!editContent">close</i></div>
            <div class="p-4">
                
                
                <!-- html element -->
                <textarea class="w-full text-base" v-if="editor.current && ( editor.current.type === 'element' || editor.current.element === 'button' ) && editor.current.element != 'p'" v-model="editor.current.content"></textarea>
                
                <!-- rich text element -->
                <moka-text-editor v-if="editor.current && editor.current.tag === 'element' && editor.current.element === 'p'"  v-model="editor.current.content" @close="editContent=!editContent"/>

                <moka-edit-icon v-if="editor.current && editor.current.tag === 'icon'" v-model="editor.current.content"/>

                
                
            </div>
            
        </div>
        <div class="fixed left-0 top-0 w-1/5 z-2xtop min-h-screen bg-gray-800" v-if="editor.action==='edit' && editor.current && editor.current.tag === 'menu'">
                <i class="material-icons absolute top-0 right-0 mt-1 text-white mr-1 cursor-pointer" @click="editContent=!editContent,$store.dispatch('setAction',null)">close</i>
                <moka-edit-menu  :menu="editor.current" @menu="setMenuItems"/>
        </div>
        <!-- image element -->
        <div v-if="editor.action === 'edit' && editor.current && (editor.current.type === 'image'||editor.current.type==='video')" class="nuxpresso-modal md:h-3/5 m-auto md:w-full lg:w-10/12 border shadow-lg text-sm z-top">
            <moka-edit-media class="z-top" @newimage="setImage" :modal="true" @close="editContent=!editContent,$store.dispatch('setAction',null)"/>
        </div>
    </transition>
    <!-- FORM SETTINGS -->
    <transition name="fade">
        <div v-if="editor.action==='formsetting'" class="nuxpresso-modal w-full md:w-1/4 z-2xtop p-2 bg-white rounded-l shadow border">
            <i class="material-icons absolute right-0 m-1" @click="$store.dispatch('setAction',null)">close</i>
            <h4>Form settings</h4>
            <div class="flex flex-col">
                <label>Action</label>
                <input type="text" v-model="editor.current.action"/>
                <label>Success message</label>
                <input type="text" v-model="editor.current.success"/>
                <label>Redirect to</label>
                <input type="text" v-model="editor.current.redirect"/>
                <label>Error message</label>
                <input type="text" v-model="editor.current.error"/>
            </div>
        </div>
    </transition>
    <!-- DELETE OBJECT MODAL -->
    <transition name="fade">
        <div class="nuxpresso-modal bg-white border shadow p-4 z-top" v-if="confirmModal||editor.action==='delete'">
            <h5>Delete this object ?</h5>
            <button @click="confirm=false,confirmModal=false,$store.dispatch('setAction',null)">No</button>
            <button class="ml-2 danger" @click="confirm=true,confirmModal=!confirmModal,removeElement()">Yes, delete</button>
        </div>  
    </transition>
    <!-- ANIMATION -->
    <transition name="slideleft">
        <div v-if="animations && editor.current" class="fixed z-top w-1/5 text-sm left-0 bottom-0 p-2 bg-gray-800 text-gray-500 flex flex-col">
            
            <i class="material-icons absolute top-0 right-0 m-1" @click="animations=!animations">close</i>
            <moka-animation :key="editor.current.id" v-model="editor.current" :element="editor.current" @close="animations=!animations"/>
        </div>
    </transition> 
    <!-- MEDIA --->
    <transition name="fade">
        <div v-if="media" draggable="true" class="nuxpresso-modal h-4/5 w-10/12 border shadow-lg text-sm z-2xtop rounded-lg">
            <moka-edit-media class="z-max" @newimage="setImage" :modal="true" @close="media=!media"/>
        </div>
    </transition>

    <!-- TREE -->
    <transition name="slideright">
        <div v-if="tree" class="fixed h-screen top-0 right-0 w-3/12 border-l shadow bg-white p-2 z-2xtop overflow-y-auto">
            <div class="relative w-full">
                <moka-tree :doc="editor.current && editor.current.hasOwnProperty('blocks')?editor.current:doc" @close="tree=!tree" @treeselect="treeselect"/>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
import MokaElement from '@/components/editor/render/moka.editor.element'
import MokaTextEditor from '@/components/editor/render/moka.text.editor'
import MokaEditIcon from '@/components/editor/render/moka.customize.icon'
import MokaEditMenu from '@/components/editor/render/moka.menus'
import MokaEditMedia from '@/components/media/media'
import MokaTree from '@/components/editor/render/moka.tree.draggable'
import MokaAnimation from '@/components/editor/render/moka.animation'
import MokaContainer from '@/components/editor/render/moka.editor.container'
import MokaSideBar from '@/components/editor/render/moka.editor.side.toolbar'
import MokaCustomizeDrawer from '@/components/editor/render/moka.editor.customize.drawer'
import draggable from 'vuedraggable'
import gsap from 'gsap'
import gsapEffects from '@/plugins/animations'
import { mapState } from 'vuex'

export default {
    name: 'MokaEditorSelectors',
    data:()=>({
        customizerID: 0,
        customizePos: 'right-0',
        customizeSwitch: false,
        dropdownView: false,
        confirm: false,
        confirmModal: false,
        printScreen: null,
        current: null,
        toolbar: false, 
        customize: false,
        editContent: false,
        editCSS: false,
        animations:false,
        media: false,
        breakpoint: 'md',
        tree: false
    }),
    components: { 
        MokaElement,
        MokaTextEditor,
        MokaEditIcon,
        MokaEditMenu,
        MokaEditMedia,
        MokaAnimation,
        MokaContainer,
        MokaSideBar,
        MokaCustomizeDrawer,
        MokaTree,
        draggable
    },
    props: [ 'doc' , 'component' ],
    
    computed: {
        ...mapState ( ['moka','editor'] ),
        init(){
            this.current = this.editor.current
            return true
        },
        entity(){
            if ( this.current && this.current.entity ){
                return this.current.entity.tag
            }
        },
        gsapAnimations(){
            return gsapEffects
        },
        coords(){
            return this.current.coords
        }
    },
    watch: {
        component(c){
            return null
        },
        customizeElement(flag){
            console.log ( 'customize=>' , flag )
        },
        customizeSwitch(v){
            v ? this.customizePos = 'left-0' : this.customizePos = 'right-0'
        },
        moka:()=>{
            handler:(old,obj)=>{
                console.log ( obj )
                this.current = obj.current
            }
            deep: true
        },
        editor:()=>{
            handler:(old,obj)=>{
                console.log ( obj )
                this.current = obj.current
            }
            deep: true
        }

    },
    methods: {
        dropdown(v){
            this.dropdownView = v
            console.log(this.dropdownView)
        },
        edit(block){
            this.$emit ( 'edit' , block )
        },
        copy(block){
            console.log ( 'copied element=>' , block )
            this.$emit ( 'copy' , block )
        },
        selected(el){
            console.log ( 'current =>' , el.type , el.id)
            this.current = el 
            this.$store.dispatch('current',el)
        },
        isFlex(css){
            if ( !css ) {
                this.current.entity.css += ' flex-col'
                return
            }
            if ( css.indexOf('flex-col') < 0 && css.indexOf('flex-row') < 0 ){
                this.current.entity.css += ' flex-col'
            }
        },
        switchFlex(css){
            if ( css.indexOf('flex-col') < 0 ){
                this.current.entity.css += ' flex-col'
            } else {
                this.current.entity.css = this.current.entity.css.replace('flex-col','')
            }
        },
        keyUp(event){
            console.log ( event )
        },
        setImage(img){
            this.current = this.editor.current
            this.editor.current.image = img
            this.current.image = img
            this.$store.dispatch('setCurrent', this.current)
        },
        activeDoc(id){
            if ( this.moka && this.moka.selected ) {
                return this.moka.selected === id ? ' border-2 border-dashed border-gray-400 ' : ''
            } else {
                return ' '
            }
        },
        active(id){
            if ( this.moka && this.moka.selected ) {
                return this.moka.selected === id ? 'opacity-100' : 'opacity-0 hover:opacity-100'
            } else {
                return 'opacity-0 hover:opacity-100 '
            }
        },
        setCurrent ( element ){
            console.log ( element )
            if ( !element ) return 
            this.customizerID = this.$randomID()
            this.current.entity = element
            console.log ( element )
            
            !element.hasOwnProperty('gsap') ? 
                this.current.entity.gsap = {
                    animation: '',
                    duration: .7,
                    ease: '',
                    delay:0
                } : null
            this.$store.dispatch('selected',element.id),
            this.$store.dispatch('current' , this.current )
            this.toolbar = true
        },
        setCurrentSub(coords,element){
            this.$store.dispatch('selected',element.id)
            this.setCurrent ( coords ,element)
        },
        treeselect(coords,el){
            let level = coords
            level.push ( this.$attrs.index )
            this.$store.dispatch( 'selected' , el.id )
            this.$store.dispatch('setLevel',level)
            this.$store.dispatch ( 'setCurrent' , el )
            this.selected ( el )
            /*
            let level = coords
            this.current = el
            //level.push ( this.$attrs.index )
            this.$store.dispatch( 'selected' , el.id )
            //this.$store.dispatch('setLevel',level)
            //this.$store.dispatch('setCurrent',el)
            this.$store.dispatch ( 'setCurrent' , el )
            this.selected(el)
            */
        },
        setMenuItems(items){
            this.editor.current.items = items
        },
        responsive(css){
            return css// this.$clean ( this.$cssResponsive ( css ) )
        },
        stile(block,doc){
            if ( !block ) return 
            let stile = ''
            if ( block.hasOwnProperty('fontFamily')){
                stile += 'font-family:\"' + block.fontFamily + '\"; '
            }
            return block.hasOwnProperty('style') ? block.style + stile : stile
        },
        background(block){
            if ( !block ) return 
            return block.hasOwnProperty('image') ?
                block.image && block.image.url ? 
                    block.image.previewUrl ? 
                        ' background-image:url(' + block.image.previewUrl + ');background-size:cover;background-repeat:no-repeat;' :
                            ' background-image:url(' + block.image.url + ');' : ''  : ''        
        },
        removeElement(){
            this.$emit ( 'delete' )
            this.$store.dispatch('setAction',null)
            this.confirmModal = false
            return
        },
        printSave(){
            this.print().then (()=>{
                this.$emit('save',this.printScreen)
                this.$emit('close')
            })
        },
        async print() {
            let el , options
            el = document.querySelector('#content')
            options = { type: "dataURL" , useCORS: true , scale: 0.50 }
            let screenshot = await this.$html2canvas(el, options)
            this.printScreen = screenshot
            this.$emit('save',screenshot)
        },
        animate(){
            console.log ( this.current.entity.gsap )
            if ( this.current.entity.gsap && this.current.entity.gsap.animation ){
                gsap.effects[this.current.entity.gsap.animation]( this.$refs['aniDemo'] ,{
                    trigger: this.$refs['aniDemo'],
                    duration: parseFloat(this.current.entity.gsap.duration) ,
                    ease: this.current.entity.gsap.ease,
                    delay: parseFloat(this.current.entity.gsap.delay)

                }) 
            }
            
        }
    },
    mounted(){  
        let vm = this
        this.current = this.moka.current
        window.addEventListener("keydown", e => {
            if ( e.altKey && e.code === 'KeyB' ){
                !this.doc.hasOwnProperty('slider') ?
                    vm.$emit('preview') :
                        vm.$emit('slider')
            }
            if ( e.altKey && e.code === 'KeyM' ){
                if ( this.editor.current  ){
                    this.$store.dispatch('setAction','customize')
                    this.$emit('customize')
                    this.customize =! this.customize
                }
            }
            if ( e.altKey && e.code === 'KeyW' ){
                if ( this.editor.current  ){
                    this.$emit('edit',this.current)
                }
            }
            if ( e.altKey && e.code === 'KeyA' ){
                if ( this.editor.current  ){
                    this.animations =! this.animations
                }
            }
            if ( e.altKey && e.code === 'KeyC' ){
                if ( this.editor.current ){
                    this.$store.dispatch('message','Element copied')
                    this.$emit('copy',this.editor.current)
                }
            }
            if ( e.altKey && e.code === 'KeyV' ){
                if ( this.editor.current  ){
                    this.$emit('paste')
                }
            }
            if ( e.altKey && e.code === 'KeyD' ){
                if ( this.current  ){
                    this.$emit('duplicate',this.current)
                }
            }
            if ( e.altKey && e.code === 'KeyR' ){
                if ( this.moka.current  ){
                    this.confirmModal =! this.confirmModal
                }
            }
            if ( e.altKey && e.code === 'KeyT' ){
                this.tree =! this.tree
            }
            if ( e.altKey && e.code === 'KeyI' ){
                if ( this.current ){
                    this.$emit('reusable',this.current)
                }
            }
            if ( e.altKey && e.code === 'KeyS' ){
                this.$emit('save')
            }
        })

    }

}
</script>
