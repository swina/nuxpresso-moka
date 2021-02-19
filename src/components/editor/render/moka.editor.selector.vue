<template>
<!-- MAIN CONTAINER -->
<div class="w-full h-auto pb-10 mb-10 top-0 left-0 relative" data="init">
    
    <div v-if="$attrs.category!='element' && $attrs.category != 'slider'" >
          
        <div :class="'relative border-4 border-dashed p-4 text-black ' + docCss" :style="stile(doc,true) + ' ' + background(doc)" id="content">
            <template v-for="(block,b) in doc.blocks">
                
                <moka-container 
                    v-if="!block.hasOwnProperty('slider')"
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
                
                <div v-if="block.hasOwnProperty('slider')" class="border p-1">
                    <div class="p-2 bg-gray-300">SLIDER <button class="danger" @click="removeSlider(block)">Remove</button></div>
                    <moka-editor-selectors 
                        :doc="block"
                        :component="current"
                        :develop="true"
                        category="slider"
                        :root="true"
                        />  
                </div>
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
            v-if="$attrs.category != 'slider' && element.type!='grid' && element.type != 'flex' && !doc.hasOwnProperty('slider')" 
            :coords="[e]"
            :develop="true"
            @selected="selected"
            @customize="customize"
            @animation="animations=!animations"
            @delete="confirmModal=!confirmModal"
            @edit="editContent=!editContent"/>
        
        <!-- SLIDER -->
        <div v-if="$attrs.category === 'slider'" :data="getSlider">
            <div class="flex flex-row items-center p-1">
                <i title="Slider settings" class="material-icons mx-2" @click="$store.dispatch('setCurrent',doc),$store.dispatch('setAction','slidersettings')">settings</i>
                <button class="mx-2" @click="addSlide()">Add slide</button>
                <button class="danger mx-2" v-if="!slideDelete && slideIndex > -1" @click="slideDelete=!slideDelete">Delete slide</button>
                <button class="danger" v-if="slideDelete" @click="doc.blocks.splice(slideIndex,1),slideIndex=0,slideDelete=!slideDelete">Confirm to delete this slide?</button>
                <button class="rounded-none mx-2" v-if="currentSlide" @click="$emit('duplicate',editor.current)">Duplicate</button>
            </div>
            
                <draggable :list="doc.blocks" class="flex flex-row mb-4">
                    <div v-for="(slide,index) in doc.blocks" :class="'w-auto px-1 h-8 border justify-center items-center flex flex-col mr-4 ' + slideSelected(index)" @click="slideDelete=false,currentSlide=slide,slideIndex=index,$store.dispatch('setCurrent',slide),$store.dispatch('selected',slide.id)">
                        {{ 'Slide ' + (index+1) }}
                    </div>
                </draggable>
                <label class="text-sm">Slide title </label> 
                <input type="text" class="my-1" v-model="doc.blocks[slideIndex].name"/>
            <div v-if="currentSlide" :class="doc.css + ' relative border-2 border-dashed p-4 text-black '" :style="stile(doc,true) + ' ' + background(doc)" id="content">
            
                <moka-container
                    :key="currentSlide.id" 
                    :doc="currentSlide"
                    :component="doc" 
                    level="0"
                    index="0"
                    :slide="true"
                    :top="true" 
                    :pos="[0,0]"
                    :coords="[0,0]" 
                    zi="1"
                    :dropdown="dropdownView"
                    @copy="copy"
                    @selected="selected"
                    @customize="customize" 
                    @animations="animation=!animation"
                    @edit="edit"/>
            
            </div>
        </div>
    </div>
    
    <!-- STATUS BAR -->
    <div editorstatus class="fixed bg-gray-300 z-top bottom-0 left-0 p-1 border-t w-full flex flex-row items-center text-sm bg-white z-max uppercase h-10 divide-x divide-gray-400">
        <i class="material-icons text-gray-800 hover:bg-black hover:text-blue-400 mx-2" @click="help=!help" title="Hotkeys">keyboard</i>
        <div v-if="editor.current" class="pl-1 w-full flex flex-row items-center">
            

            <span v-if="editor.current.type">{{ editor.current.tag }}</span> 
            <!--<i v-if="moka.current" class="material-icons" @click="swap(false)">expand_less</i>
            <i v-if="moka.current" class="material-icons" @click="swap(true)">expand_more</i>
            -->
            <i class="material-icons text-sm mx-2" v-if="editor.current.icon">{{editor.current.icon}}</i>
            <span v-else>CONTAINER <i class="material-icons text-sm mx-2">select_all</i></span>
            <span class="mx-8"># {{ editor.current.id }}</span>
            <span>Mobile Breakpoint <span class="lowercase font-bold mr-2">{{ breakpoint }}</span></span>
            <span class="capitalize">CSS class</span>
            
            <input v-if="!editor.current.css.hasOwnProperty('css')" type="text" class="ml-2 64" v-model="editor.current.css"/>
            
            <input v-else type="text" class="ml-2 w-64" v-model="editor.current.css.css"/>

            <i class="material-icons moka-icon-circle ml-2" title="Edit CSS classes" @click="editCSS=!editCSS">edit</i>

            <i class="material-icons moka-icon-circle ml-2" title="Customize" @click="$store.dispatch('setAction','customize')">brush</i>
            
            
        </div>
        
    </div>
    <!-- edit CSS -->
    <transition name="fade">
        <div class="z-xtop fixed bg-gray-800 text-gray-400 bottom-0 right-0 w-3/12 p-2 border shadow bg-white" v-if="editCSS">
            <i class="material-icons absolute top-0 right-0 m-1" @click="editCSS=!editCSS">close</i>
            <div>CSS</div>
            <textarea v-if="!editor.current.css.hasOwnProperty('css')" class="dark w-full h-32 text-gray-400" v-model="editor.current.css"/>
            <textarea v-else class="dark w-full h-32 text-gray-400 outline-none border-none" v-model="editor.current.css.css"/>
            <div v-if="editor.current.css.hasOwnProperty('css')">Container CSS</div>
            <textarea v-if="editor.current.css.hasOwnProperty('css')" class="dark w-full h-32 text-gray-400" v-model="editor.current.css.container"/>

            <div>Style</div>
            <textarea class="dark w-full h-32 text-gray-400" v-model="editor.current.style"/>
        </div>
    </transition>
    <div v-if="current && current.entity" class="fixed bottom-0 left-0 p-1">{{ current.tag }} <i class="material-icons">{{ current.icon }}</i></div>

    <!-- TOOLBAR -->
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
            @delete="confirmModal=!confirmModal"
            @help="help=!help"/>
    </transition>

    <!-- Customizer -->
    <transition name="fade">
        <div v-if="editor.action==='customize'" :class="'fixed right-0 top-0 w-1/5 z-2xtop min-h-screen bg-gray-100 text-xs text-gray-800 ' + customizePos" ref="aContainer">
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
        </div>
    </transition>

    <!-- EDIT CONTENT INLINE -->
    <transition name="fade">
        <div v-if="editor.action==='edit' && editor.current && editor.current.type != 'image' && editor.current.type != 'video' && editor.current.type != 'audio' && editor.current.tag != 'menu'" draggable="true" :class="'border shadow-lg text-sm z-2xtop ' + isFullScreen"> 

            <div class="bg-gray-700 text-white p-1 flex items-center">Edit 
                <i class="material-icons ml-2 absolute right-0 mr-12 text-sm" title="Customize" @click="$store.dispatch('setAction','customize')">brush</i>
                <i class="material-icons absolute  right-0  text-white mr-6 cursor-pointer" @click="fullscreen=!fullscreen" :title="fullscreen?'close fullscreen':'fullscreen'">{{fullscreen?'close_fullscreen':'fullscreen'}}</i>
                <i class="material-icons absolute  right-0  text-white mr-1 cursor-pointer" @click="$store.dispatch('setAction',null),editContent=!editContent">close</i></div>
            <div class="p-4">
                
                
                <!-- html element -->
                <textarea class="w-full text-base" v-if="editor.current && ( editor.current.type === 'element' || editor.current.element === 'button' ) && editor.current.element != 'p'" v-model="editor.current.content"></textarea>
                
                <!-- rich text element -->
                <moka-text-editor v-if="editor.current && editor.current.tag === 'element' && editor.current.element === 'p'"  v-model="editor.current.content" @close="editContent=!editContent"/>

                <moka-edit-icon v-if="editor.current && ( editor.current.tag === 'icon' || editor.current.tag === 'icon_bt')" v-model="editor.current.content"/>

                
                
            </div>
            
        </div>
        <!-- menu editor -->
        <div class="fixed left-0 top-0 w-1/5 z-2xtop min-h-screen bg-gray-800" v-if="editor.action==='edit' && editor.current && editor.current.tag === 'menu'">
            
            <i class="material-icons absolute top-0 right-0 mt-1 mr-1 cursor-pointer" 
            @click="editContent=!editContent,$store.dispatch('setAction',null)">close</i>
            
            <moka-edit-menu  :menu="editor.current" @menu="setMenuItems"/>
        </div>

        <!-- image element -->
        <div v-if="editor.action === 'edit' && editor.current && (editor.current.type === 'image'||editor.current.type==='video' || editor.current.type === 'audio')" class="nuxpresso-modal md:h-3/5 m-auto md:w-full lg:w-10/12 border shadow-lg text-sm z-top">

            <div class="m-auto p-10 flex flex-col" v-if="editor.current && editor.current.element === 'iframe'" >
                <label>{{editor.current.label}} - Video ID</label>
                <input type="text" class="w-3/4 text-base"v-model="editor.current.content"/>
                <button @click="editor.action = null">OK</button>
            </div>

                
            <moka-edit-media v-if="editor.current.element!='iframe'" class="z-top" @newimage="setImage" :modal="true" @close="editContent=!editContent,$store.dispatch('setAction',null)"/>
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
        <div class="nuxpresso-modal bg-white border shadow p-4 z-2xtop" v-if="confirmModal||editor.action==='delete'">
            <h5>Delete this object ?</h5>
            <button @click="confirm=false,confirmModal=false,$store.dispatch('setAction',null)">No</button>
            <button class="ml-2 danger" @click="confirm=true,confirmModal=!confirmModal,removeElement()">Yes, delete</button>
        </div>  
    </transition>
    <!-- ANIMATION -->
    <transition name="slideleft">
        <div v-if="animations && editor.current" class="fixed z-2xtop w-1/5 text-sm left-0 bottom-0 p-2 flex flex-col bg-white">
            
            <i class="material-icons absolute top-0 right-0" @click="animations=!animations">close</i>

            <moka-animation :key="editor.current.id" v-model="editor.current" :element="editor.current" @close="animations=!animations"/>
        </div>
    </transition> 

    <!-- MEDIA --->
    <transition name="fade">
        <div v-if="media" draggable="true" class="nuxpresso-modal h-screen w-screen border shadow-lg text-sm z-2xtop rounded-lg">
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

    <!--HOTKEYS-->
    <transition name="fade">
        <div class="fixed z-2xtop top-0 left-0 w-1/4 bg-white" v-if="help">
            <moka-hotkeys @close="help=!help"/>
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
import MokaHotkeys from '@/components/editor/render/moka.hotkeys'
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
        fullscreen: false,
        editCSS: false,
        animations:false,
        media: false,
        breakpoint: 'md',
        tree: false,
        copiedCSS: '',
        currentSlide: null,
        slideIndex: 0,
        slideDelete: false,
        help: false,
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
        MokaHotkeys,
        draggable
    },
    props: [ 'doc' , 'component' ],
    
    computed: {
        ...mapState ( ['moka','editor'] ),
        init(){
            this.current = this.editor.current

            return true
        },
        docCss(){
            return this.doc.id === this.moka.selected ? 'border-orange-300' : ''
        },
        isFullScreen(){
            return this.fullscreen ? 'fixed w-screen h-screen bg-white z-2xtop top-0 left-0' : 'nuxpresso-modal w-full md:w-3/4 lg:w-2/3'
        },
        getSlider(){
            if ( this.doc.hasOwnProperty('slider') ){
                this.currentSlide = this.doc.blocks[0]
            }
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
            ////console.log ( 'customize=>' , flag )
        },
        customizeSwitch(v){
            v ? this.customizePos = 'left-0' : this.customizePos = 'right-0'
        },
        moka:()=>{
            handler:(old,obj)=>{
                //////console.log ( obj )
                this.current = obj.current
            }
            deep: true
        },
        editor:()=>{
            handler:(old,obj)=>{
                //console.log ( obj )
                this.current = obj.current
            }
            deep: true
        }

    },
    methods: {
        addSlide(){
            this.doc.blocks.push ( this.$grid(1) )
        },
        slideSelected(index){
            return this.currentSlide && index === this.slideIndex ?
                'bg-blue-500 text-white' : ''
                        
        },
        dropdown(v){
            this.dropdownView = v
            //console.log(this.dropdownView)
        },
        edit(block){
            this.$emit ( 'edit' , block )
        },
        copy(block){
            //console.log ( 'copied element=>' , block )
            this.$emit ( 'copy' , block )
        },
        selected(el){
            //console.log ( 'current =>' , el.type , el.id)
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
            //console.log ( event )
        },
        
        setImage(img){
            if ( this.editor.current.type === 'file' ){
                this.editor.current.link = img.url
                this.editor.current.image = {}
                this.editor.current.image.size = img.size
                this.editor.current.image.name = img.name
                this.current = this.editor.current
                this.$store.dispatch('setCurrent', this.current)
                return
            }
            this.current = this.editor.current
            this.editor.current.image = img
            this.current.image = img
            this.selectThumbnail = false
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
            //console.log ( element )
            if ( !element ) return 
            this.customizerID = this.$randomID()
            this.current.entity = element
            //console.log ( element )
            
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
            //console.log ( this.current.entity.gsap )
            if ( this.current.entity.gsap && this.current.entity.gsap.animation ){
                gsap.effects[this.current.entity.gsap.animation]( this.$refs['aniDemo'] ,{
                    trigger: this.$refs['aniDemo'],
                    duration: parseFloat(this.current.entity.gsap.duration) ,
                    ease: this.current.entity.gsap.ease,
                    delay: parseFloat(this.current.entity.gsap.delay)

                }) 
            }
            
        },
        removeSlider(block){
            this.$store.dispatch('setCurrent',block)
            this.$store.dispatch('selected',block.id)
            this.removeElement()
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
           
             if ( e.altKey && e.code === 'Keyspace' ){
                !this.doc.hasOwnProperty('slider') ?
                    vm.$emit('preview') :
                        vm.$emit('slider')
            }
            if ( e.altKey && e.code === 'KeyZ' ){
                if ( this.editor.current  ){
                    this.$store.dispatch('setAction','customize')
                    this.$emit('customize')
                    this.customize =! this.customize
                }
            }
            if ( e.altKey && e.code === 'KeyW' ){
                if ( this.editor.current  ){
                    this.$store.dispatch('setAction','edit')
                    this.$emit('edit',this.current)
                }
            }
            if ( e.altKey && e.code === 'KeyA' ){
                if ( this.editor.current  ){
                    this.animations =! this.animations
                }
            }
            if ( e.altKey && e.code === 'KeyG' ){
                if ( this.editor.current  ){
                    this.editor.current.css.hasOwnProperty('css') ?
                        this.copiedCSS = this.editor.current.css.css :
                            this.copiedCSS = this.editor.current.css
                }
            }
            if ( e.altKey && e.code === 'KeyH' ){
                if ( this.editor.current  && this.copiedCSS ){
                    this.editor.current.css.hasOwnProperty('css') ?
                        this.editor.current.css.css = this.copiedCSS :  
                            this.editor.current.css = this.copiedCSS
                }
            }
            if ( e.altKey && e.code === 'KeyC' ){
                console.log ( 'copy element ...')
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
                if ( this.editor.current  ){
                    this.$emit('duplicate',this.editor.current)
                }
            }

            if ( e.altKey && e.code === 'KeyQ' ){
                if ( this.editor.current && this.editor.current.type === 'flex'  ){
                    this.$store.dispatch ( 'setAction' , 'addcomponent' )
                }
            }
            if ( e.altKey && e.code === 'KeyO' ){
                if ( this.editor.current ){
                    this.$store.dispatch ( 'setAction' , 'snapshot' )
                }
            }
            if ( e.altKey && e.code === 'KeyR' ){
                if ( this.editor.current  ){
                    this.confirmModal =! this.confirmModal
                }
            }
            if ( e.altKey && e.code === 'KeyT' ){
                this.tree =! this.tree
            }
            if ( e.altKey && e.code === 'KeyI' ){
                this.$store.dispatch ( 'setAction' , 'addcomponent' )
            }
            if ( e.altKey && e.code === 'KeyU' ){
                this.$store.dispatch ( 'setAction' , 'addreusable' )
            }
            if ( e.altKey && e.code === 'KeyS' ){
                this.$emit('save')
            }
        })

    }

}
</script>
