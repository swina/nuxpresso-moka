<template>
<div>
    <div class="w-full top-0 right-0 left-0 bottom-0 flex mx-2 mb-20 flex-row bg-white" v-if="$attrs.component && hasblocks && !preview">
        <div class="w-full overflow-y-auto overflow-x-hidden">
            
            <!-- MAIN CONTAINER -->
            <div :class="'relative mt-2 mx-2 p-2 cursor-pointer'">
                <div class="absolute top-0 left-0 bottom-0 right-0 z-max mb-4 " v-if="disable"></div>
                <!-- TOP BAR -->
                <div :class="'fixed z-xtop top-0 left-0 bg-gray-500 p-1 grid grid-cols-3 items-center w-full m-auto cursor-pointer'" title="Select component body" @click="$store.dispatch('selected',$attrs.component.id)">
                    <div class="flex flex-row items-center">
                        <i class="material-icons text-red-500" @click="$store.dispatch('setAction',null),$router.push('dashboard')" title="Close">fiber_manual_record</i>
                        <i class="material-icons text-yellow-500" title="Select component">fiber_manual_record</i>
                        <i class="material-icons text-green-500" @click="preview=!preview" title="preview">fiber_manual_record</i>
                        <div class="text-sm ml-4">
                            {{ $attrs.component.name }}
                            <span class="capitalize ml-2">- {{$attrs.component.category}}</span> [#{{$attrs.component.id}}]
                        </div>
                        <i class="material-icons hover:text-blue-500 ml-2" title="Settings" @click="settings=!settings">settings</i>
                    </div>
                    <div class="text-center font-black" style="">M O K A</div>
                    <div class="absolute right-0 mr-2 flex flex-row items-center">
                        <i class="material-icons hover:text-blue-500 mr-2" @click="$emit('save')" title="Save">save</i>
                        <i class="material-icons hover:text-blue-500 mr-2" @click="$emit('savecopy')" title="Duplicate component">file_copy</i>
                        <i class="material-icons hover:text-blue-500 mr-2" @click="$store.dispatch('setAction','addreusable')" title="Import component">system_update_alt</i>
                        <i class="material-icons hover:text-blue-500 mr-2" @click="$store.dispatch('loading'),exportComponent=!exportComponent" title="Export component">backup</i>
                        <i class="material-icons hover:text-blue-500 mr-2" v-if="$attrs.component && $attrs.component.category!='slider'" title="Preview" @click="preview=!preview,disable=false">preview</i> 
                        <i class="material-icons hover:text-blue-500 mr-2" v-if="$attrs.component && $attrs.component.category==='slider'" title="Preview" @click="slider=!slider,disable=false">preview</i>
                        <i class="material-icons hover:text-blue-500 mr-2" v-if="doc.hasOwnProperty('slider')" title="Slider Settings" @click="sliderSettings=!sliderSettings,disable=false">settings</i>
                    </div>
                </div>
                
                <!-- BLOCKS EDITOR -->
                <div class="pb-10 mt-4 mb-10 mx-5">
                  
                    <moka-editor-selectors 
                        
                        :doc="doc"
                        :component="current"
                        :develop="true"
                        :category="$attrs.component.category"
                        :root="true"
                        @save="save" 
                        @preview="preview=!preview"
                        @slider="slider=!slider,disable=false"
                        @animations="animations=!animations"
                        @edit="editInline"
                        @copy="copyElement"
                        @paste="pasteElement"
                        @duplicate="duplicateElement"
                        @saveblock="saveBlock"
                        @delete="removeElement"/>    
               
                </div>
            </div>
                
            <!-- ADD BLOCK BUTTON -->
            <div class="fixed bottom-0 right-0 opacity-100 hover:opacity-100 pb-6 mr-6 mb-6 z-top ">
                
                    <i class="material-icons moka-icons nuxpresso-icon-circle ml-2" @click="grids=!grids" title="Add block">add</i><!--addBlock=true,reusable=!reusable-->
                    <!--<div class="text-xs text-gray-400">Add block</div>-->
                    <i class="material-icons moka-icons nuxpresso-icon-circle ml-2" @click="$store.dispatch('setAction','addreusable'),addBlock=true" title="Add Moka">widgets</i>
                    <i class="material-icons moka-icons nuxpresso-icon-circle ml-2" v-if="$attrs.component && $attrs.component.category!='slider'" title="Preview" @click="preview=!preview,disable=false">remove_red_eye</i> 
                    <i class="material-icons moka-icons nuxpresso-icon-circle ml-2" v-if="$attrs.component && $attrs.component.category==='slider'" title="Preview" @click="slider=!slider,disable=false">remove_red_eye</i>
                    
                
            </div>
        </div>
      

        <!-- TAILWIND DRAWER -->
        <transition name="slideright">
            <div customizebar v-if="customizebar" class="z-2xtop fixed w-1/5 bg-gray-800 text-gray-500 text-xs shadow-lg min-h-screen right-0 top-0">
                
                <moka-customize 
                    class="overflow-y-auto"
                    :component="$attrs.component" 
                    :element="current"
                    :settings="settings"
                    @close="customizebar=!customizebar,disable=false"
                    @disabled="disable=!disable"
                    @media="media=!media"
                    @delete="removeElement"
                    @paste="pasteElement"
                    @save="save"
                    @saveblock="saveBlockAsComponent=!saveBlockAsComponent"
                    @sliderpreview="slider!=slider"
                    @addreusable="reusable=!reusable"/>

            </div>
        </transition>
       
    </div>

    <!-- COMPONENT SETTINGS -->
    <transition name="slideleft">
        <div class="fixed left-0 top-0 mt-12 flex flex-col shadow-lg p-4 bg-white z-2xtop text-base" v-if="settings">
            <i class="material-icons absolute right-0 mr-2" @click="settings=!settings">close</i>
            <label class="font-bold">Name</label>
            <input type="text" v-model="$attrs.component.name"/> 
            <label class="font-bold">Description</label>
            <textarea v-model="$attrs.component.description"></textarea>
            <label class="font-bold ">Category</label>
            <select v-model="$attrs.component.category">
                <option v-for="category in $categories()">{{ category }}</option>
                <!--
                <option value="element">element</option>
                <option value="component">component</option>
                <option value="widget">widget</option>
                <option value="template">template</option>
                <option value="page">page</option>
                <option value="slider">slider</option>
                <option value="gallery">gallery</option>-->
            </select>
            
            <label class="font-bold">Type <i class="material-icons" @click="addType=!addType">add</i></label>
            
            <input v-if="addType" v-model="newType" @change="saveNewType"/>
            
            <select v-model="$attrs.component.tags">
                <option value=""></option>
                <option v-for="tipo in moka.elements.types.types" :value="tipo">{{ tipo }}</option>
            </select>
            <!--
            <label class="font-bold">Tags</label>
            <textarea v-model="$attrs.component.tags"/>
            -->
            <div class="flex flex-col text-sm" v-if="$attrs.component.category === 'template'">
                <label class="font-bold">Default template</label>
                <div class="text-xs text-gray-600"><input type="checkbox" v-model="$attrs.component.default"/> (apply to articles with no template)</div>
            
                <label class="font-bold">Loop 
                <input type="checkbox" v-model="$attrs.component.loop"/></label>
                <div class="flex flex-col" v-if="$attrs.component.loop">
                    <select v-model="$attrs.component.loop_type">
                        <option value="">all</option>
                        <option value="articles">articles</option>
                        <option v-for="opt in moka.categories" :value="opt.slug">articles/category/{{opt.name}}</option>
                    </select>
                    <label class="font-bold">Pagination <input type="checkbox" v-model="$attrs.component.loop_pagination"/></label>
                    <div>Articles per page</div>
                    <input type="number" min="1" max="100" v-model="$attrs.component.loop_limit"/>
                </div>
            </div>

            <!-- mobile breakpoint -->
            <div class="grid grid-cols-2 gap-2 p-1">
                <label class="font-bold">Mobile breakpoint </label>
                <div class="flex flex-row cursor-pointer items-center" title="Set mobile responsive breakpoint">
                    <i :class="'material-icons moka-icons text-sm p-1 mr-2 ' + mobile('md')" @click="breakpoint='md'">phone_iphone</i>
                    <i :class="'material-icons moka-icons text-sm p-1 mr-2 ' + mobile('lg')" @click="breakpoint='lg'">tablet</i>
                    <i :class="'material-icons moka-icons text-sm p-1 mr-2 ' + mobile('xl')" @click="breakpoint='xl'">laptop_mac</i>
                </div>
                <label class="font-bold">Font</label>
                <select v-model="fontFamily">
                    <option value="Arial">sans</option>
                    <option value="serif">serif</option>
                    <option v-for="gfont in moka.elements.types.fonts">{{gfont}}</option>
                    <option v-for="font in moka.fonts" :value="font">{{font}}</option>
                    
                </select>
            </div>
        </div>
    </transition>

    <!-- EDIT CONTENT INLINE -->
    <!--
    <transition name="fade">
        <div v-if="editContent && ( current.tag === 'element' || current.tag === 'button')" class="nuxpresso-modal w-1/2 p-4 border shadow-lg text-sm">
            <i class="material-icons absolute top-0 right-0 cursor-pointer" @click="editContent=!editContent">close</i>
            <i class="material-icons">{{current.icon}}</i>
            <textarea class="w-full text-base" 
                v-if="current && (current.tag === 'element' || current.element ==='button') && current.element != 'p'" v-model="current.content"></textarea>
            <moka-text-editor v-if="current && current.tag === 'element' && current.element === 'p'"  v-model="current.content" @close="editConntent=!editContent"/>
        </div>
        <div class="fixed left-0 top-0 w-1/5 z-top min-h-screen bg-gray-800" v-if="editContent && current && current.tag === 'menu'">
                <i class="material-icons absolute top-0 right-0 mt-1 text-white mr-1 cursor-pointer" @click="editContent=!editContent">close</i>
                <moka-edit-menu v-if="current && current.tag === 'menu'" :menu="current" @menu="setMenuItems"/>
            
        </div>
    </transition>
    -->
    <!-- ANIMATION -->
    <transition name="fade">
        <div v-if="animations && current && current.entity" class="fixed bottom-0 right-0 p-2 bg-white border flex flex-col">
            <label>Animation</label>
            <select v-model="animation" @change="setAnimation">
                <option value="">none</option>
                <option v-for="(ani,i) in gsapAnimations" :value="ani.replace('-','')"><span class="capitalize">{{ ani.replace('-' , ' ')}}</span></option>
            </select>
        </div>
    </transition>

    <!-- MEDIA BROWSER -->
    <transition name="fade">
        <moka-editor-media :modal="true" class="z-top" v-if="media" @newimage="setImage" @close="media=!media"/>
    </transition>

    <!-- SAVE AS COMPONENT -->
    <transition name="fade">
        <div v-if="saveBlockAsComponent" class="nuxpresso-modal rounded w-full md:w-1/4 p-4 flex flex-col bg-white z-2xtop">
            <i class="material-icons absolute top-0 right-0 cursor-pointer" @click="saveBlockAsComponent=!saveBlockAsComponent">close</i>
            <h4>Save Block As Component</h4>
            <label>Name*</label>
            <input type="text" v-model="newComponent.name"/>
            <label>Category</label>
            <select v-model="newComponent.category">
                <option v-for="category in $categories()">{{ category }}</option>
            </select>
            <label>Description</label>
            <textarea v-model="newComponent.description"/>
            <button @click="saveBlockAsNewComponent" class="my-2">Save</button>
        </div>
    </transition>

    <!-- EXPORT COMPONENT -->
    <transition name="fade">
        <div v-if="exportComponent" class="nuxpresso-modal rounded w-full md:w-1/4  p-4 flex flex-col bg-white z-2xtop">
            <i class="material-icons absolute top-0 right-0 cursor-pointer" @click="exportComponent=!exportComponent">close</i>
            <h4>Export Component</h4>
            <vue-blob-json-csv
                file-type="json"
                :file-name="$attrs.component.name"
                :data="[exportJSON]"
                confirm="Do you want to download it?"
            >
            <button class="my-2">Download {{$attrs.component.name}}</button>
            </vue-blob-json-csv>
        </div>
    </transition>

    <!-- ADD BLOCK -->
    <transition name="fade">
        <div class="nuxpresso-modal text-xs p-4 z-2xtop w-1/3 border" v-if="grids">
            <i class="material-icons absolute right-0 top-0" @click="grids=!grids">close</i>
            <h3>Columns</h3>
            <div class="flex flex-col">
                Number of cols<br/>
                <input type="number" min="1" max="12" v-model="grid.cols"/> 
                <button class="my-2" @click="createGridNew">OK</button>
            </div>
        </div>
    </transition>
    <!-- REUSABLE COMPONENTS PICKER -->
    <transition name="slidedown">
        <moka-reusable-elements v-if="editor.action==='addcomponent'" 
            :importReusable="false" 
            :newblock="false" 
            @close="reusable=false,addBlock=false,$store.dispatch('setAction',null)" 
            @add="addReusable" 
            @importreusable="addReusable"/>
        
        <moka-reusable v-if="editor.action==='addreusable'" 
            :importReusable="true" 
            :newblock="addBlock" 
            @close="reusable=false,$store.dispatch('setAction',null)" 
            @add="addReusable" 
            @importreusable="addReusable"/>
        
        <!--@add="addReusable"-->
    </transition>

    <!-- PREVIEW -->
    <transition name="fade">
        <div class="absolute top-0 left-0 min-h-screen w-screen bg-white" v-if="preview">
            <moka-editor-preview :category="$attrs.component.category" :doc="doc"  @save="saveprint" :loop="$attrs.component.loop_type" :develop="false" @close="preview=!preview"/>

        </div>
    </transition>

    <!-- SLIDER SETTINGS -->
    <transition name="fade">
        <div v-if="sliderSettings" class="nuxpresso-modal w-1/3 p-2 bg-white z-2xtop border rounded shadow-lg">
            <i class="material-icons absolute top-0 right-0 cursor-pointer" @click="sliderSettings=!sliderSettings">close</i>
            <h4>Slider Settings</h4>
            <div class="p-2">
                <moka-editor-slider v-if="doc.hasOwnProperty('slider')" :slider="doc"/>
                <moka-editor-slider v-if="!doc.hasOwnProperty('slider') && current && current.entity && current.entity.hasOwnProperty('slider')" :slider="current.entity"/>
            </div>
        </div>
    </transition>

    <!-- SLIDER PREVIEW-->
    <transition name="fade">
        <div class="absolute z-2xtop top-0 left-0 min-h-screen w-screen bg-white" v-if="slider">
            <moka-slider v-if="doc.hasOwnProperty('slider')" @save="saveprint" :develop="true" :embeded="true" :doc="doc" @close="slider=!slider"/>
            <!--<moka-slider :doc="doc" :embeded="true" @save="save" @close="slider=!slider"/>-->
        </div>
    </transition>

    <transition name="fade">
        <div :class="'nuxpresso-modal moka-block-preview w-full z-2xtop p-2 '" v-if="editor && ( editor.action==='snapshot') && ( editor.current.type==='flex' || editor.current.type === 'grid')">
             <moka-editor-preview v-if="!snapshot" :class="'w-full ' + editor.current.css.css + ' ' + editor.current.css.container" :category="$attrs.component.category" :doc="editor.current"  @save="printElement(editor.current.id)" :loop="false" :develop="false" @close="$store.dispatch('setAction',null)"/>
             <a ref="blockprint" v-if="snapshot" id="saveSnapshot" :href="snapshot" :download="$attrs.component.name" @click="$store.dispatch('setAction',null)"><img class="m-auto" :src="snapshot"/></a>
        </div>
    </transition>
</div>
</template>

<script>
import MokaReusableElements from '@/components/editor/render/moka.reusable'
import MokaReusable from '@/components/editor/render/moka.reusable.preview'
import MokaEditorMedia from '@/components/media/media'
import MokaEditorPreview from '@/components/editor/preview/moka.preview'
import MokaTextEditor from '@/components/editor/render/moka.text.editor'
import MokaSlider from '@/components/editor/preview/moka.slider'
import MokaEditorSlider from '@/components/editor/render/moka.editor.slider'
import MokaEditorSelectors from '@/components/editor/render/moka.editor.selector'
import MokaEditMenu from '@/components/editor/render/moka.menus'
import { mapState } from 'vuex'
import draggable from 'vuedraggable'
import gsapEffects from '@/plugins/animations'

export default {
    name: 'MokaEditor',
    components: { 
        MokaEditorMedia , 
        MokaReusableElements,
        MokaReusable , 
        MokaEditorPreview , 
        MokaSlider , 
        MokaTextEditor , 
        MokaEditorSlider , 
        MokaEditorSelectors ,
        MokaEditMenu, 
        draggable 
    },
    data:()=>({
        addType: false,
        newType: '',
        customizebar: false,
        disable: false,
        addBlock:false,
        editContent: false,
        sliderSettings: false,
        animations: false,
        animation: '',
        breakpoint: 'md',
        fontFamily: 'Barlow Condensed',
        doc: null,
        current: null,
        importReusable: false,
        reusable: false,
        customize: false,
        media:false,
        settings: false,
        preview: false,
        slider: false,
        grids: false,
        grid: {
            cols: 1
        },
        mycomponent: null,
        printScreen: null,
        position: false,
        twCss: {
            positionx:'',
            positiony:'',
            zindex:''
        },
        zindex:0,
        allCss: '',
        exportComponent: false,
        saveBlockAsComponent: false,
        copiedElement: null,
        newComponent: {
            name: 'A new component',
            description: 'A new component by MOKA',
            category: '',
            enabled: true
        },
        snapshot: null
    }),
   
    computed:{
        ...mapState ( ['moka','editor'] ),
        exportJSON(){
            let json = JSON.parse(JSON.stringify(this.$attrs.component))
            delete json.id
            this.$store.dispatch('loading')
            return JSON.stringify(json)
        },
        hasblocks(){
            if ( !this.$attrs.component ) this.$router.push('dashboard')
            this.doc = this.$attrs.component.json
            this.doc.id ? null : this.doc.id = this.$randomID()
            this.mycomponent = this.$attrs.component
            return true
        },
        gsapAnimations(){
            return gsapEffects
        },
        setCurrent(){
            this.current = this.moka.current
            return true
        },
        schema(){
            return this.moka.elements.moka
        },
        
    },
    methods:{
        saveNewType(){
            this.moka.elements.types.types.push ( this.newType )
            this.$http.put ( 'elements' , this.moka.elements )
            this.newType = ''
            this.addType = false
        },
        editInline(block){
            this.current = this.moka.current
            this.editContent = true
        },
        saveBlock(block){
            this.current = block
            this.saveBlockAsComponent = true
        },
        reusableElement(current){
            this.reusable = true
        },
        copyElement(current){
            let element = {}
            element = Object.assign( {} , current )
            element.id = this.$randomID()
            this.copiedElement = element
            this.current = current
            this.$store.dispatch('message','Element copied')
        },
        duplicateElement(current){
            delete this.editor.current.parent 
            let el = JSON.parse(JSON.stringify(this.editor.current))
            let o = this.$copy ( this.editor.current )
            this.$findNode ( el.id , this.moka.component.json )
            let obj = this.$unique(el)
            this.editor.parent.blocks.push ( obj )
            delete this.editor.current.parent
            if ( this.editor.parent.type === 'grid' ){
                let parent = this.editor.parent
                let cols = parseInt(parent.cols) + 1
                parent.css.container = parent.css.container.replace('grid-cols-' + parent.cols,'grid-cols-'+cols)
                parent.cols = parseInt(parent.cols) + 1
                this.$store.dispatch('setParent',parent)
            }
        },
        setAnimation(){
            this.current.entity['animation'] = this.animation
        },
       
        setMenuItems(items){
            this.current.items = items
        },
        mobile(bp){
            return bp === this.breakpoint ? 'nuxpresso-icon-circle' : ''
        },
     
        active(id,css){
            let translate = ''
            
            if ( id === this.moka.selected ){
                return ' moka-editor-active' + translate
            }
            return translate
            
        },
        stile(block){
            if ( !block ) return
            return block.hasOwnProperty('style') ? block.style : ''
        },
        background(block){
            if ( !block ) return 
            return block.hasOwnProperty('image') ?
                block.image ? 
                    ' background-image:url(' + block.image.url + ');' : '' : ''
        },
        duplicateBlock(block,coords){
            let master = this.doc.blocks[coords[0]]
            let obj = {}
            if ( block.hasOwnProperty('blocks') ){
                master.blocks.push ( this.$unique ( block ))
            }
            return
           
        },
        
        createGridNew(){
            let obj = JSON.parse(JSON.stringify(this.schema.containers[0]))
            obj['blocks'] = []
            obj.id = this.$randomID()
            obj.css.container = "flex flex-col md:grid md:grid-cols-" + this.grid.cols
            obj.css.css = ''
            obj.cols = parseInt(this.grid.cols)
            let content 
            console.log ( obj.cols )
            for ( var n = 0 ; n < parseInt(this.grid.cols) ; n++ ){
                content = JSON.parse(JSON.stringify(this.schema.text[2]))
                content.id = this.$randomID()
                let el = {
                    id: this.$randomID(),
                    blocks: [ content ],
                    image: null,
                    css: {
                        css: 'flex-col',
                        container: 'flex'
                    },
                    style: '',
                    type:'flex',
                    tag:'blocks'
                }
                obj.blocks[n] = el
            }
            this.doc.blocks.push ( obj )
            console.log ( obj )
            this.grids = false
        },
        addReusable(obj){
            this.reusable = false
            let component , json , imported
            if ( obj.hasOwnProperty ( 'json' ) ){
                if ( obj.category != 'slider' ){
                    imported = obj.json.blocks[0]
                } else {
                    imported = obj.json
                }            
                json = this.$unique ( imported )
                component = JSON.parse(JSON.stringify(json))
            } else {
                json = this.$unique ( obj )
                component = JSON.parse(JSON.stringify(json))
            }
            component['gsap'] = {
                animation: '',
                ease: '',
                duration: 0,
                delay:0
            }
            
            component.id = this.$randomID()
            let target = this.editor.current
            if ( !target || this.addBlock ){
                target = this.doc
            }
            console.log ( 'component => ' , component )
            target.blocks.push ( component )
            this.addBlock = false
            this.$store.dispatch('setAction',null)
        },
        addComponent(component){
            let comp = {}
            comp = Object.assign ({} , component.json )
            comp.id = this.$randomID()
            let master = this.$getDoc ( this.doc , this.current.coords)

            console.log ( comp )

            if ( component.category != 'slider' ){
                let clone = comp
                if ( comp.tag === 'document' ){
                    clone = comp.blocks[0]
                }
                if ( component.hasOwnProperty ( 'blocks' ) ){
                    clone = this.$unique ( comp )
                }
                master.blocks.push ( clone )
            }
            
            this.importReusable = false
            this.reusable = false
        },
        addNewBlock(){
            this.doc.blocks.push ( block )
            this.$store.dispatch('loadComponent',this.$attrs.component) 
            this.doc = this.moka.component.json
        },
        removeElement(){
            this.$findNode ( this.editor.current.id , this.doc , true  )
        },
        pasteElement(){
            this.addReusable ( this.copiedElement )
            /*
            let master = this.moka.current
            let clone = Object.assign ( {} , this.copiedElement )
            clone.gsap = Object.assign ( {} , this.copiedElement.gsap )
            clone.id = this.$randomID()
            clone.hasOwnProperty ( 'blocks' ) ?
                clone = this.$unique ( clone ) :
                    null
            master.blocks.push ( clone ) 
            this.current = clone
            this.$store.dispatch ( 'current' , master )
            */
       },
        setImage(img){
            let image = img ? this.$cleanImage(img) : null
            this.current.image = image
            this.media =! this.media           
        },
        save(screenshot){
            this.mycomponent.image_uri = screenshot
            this.$emit('save')
        },
        saveprint(){
            this.print()
        },
        saveblock(block){
            this.print(block.json.blocks[0].id).then ( screenshot => {
                
                block.image_uri = screenshot
                this.$emit('saveasreusable',block)
            })
            
        },
        async print(block='content') {
            let el , options
            el = document.querySelector('#' + block)
            if (!el){
                document.querySelector(block)
            }
            options = { type: "dataURL" , useCORS: true , scale: 0.50 }
            let screenshot = await this.$html2canvas(el, options)
            //this.printScreen = screenshot
            this.save(screenshot)
            return screenshot
        }, 
        async printElement(id) {
            let el , options
            console.log ( id )
            el = document.querySelector('.moka-block-preview')
            el = el.querySelector('#content')
            console.log ( el )
            options = { type: "dataURL" , useCORS: true , scale: .70 }
            this.snapshot = await this.$html2canvas(el, options)
            this.$store.dispatch('message','Click on the image to download')
            
        }, 
        sub(element,coords){
            this.customize = false
            this.current.entity = element
            this.current.coords = coords
        },
        saveBlockAsNewComponent(){
            let id = this.$randomID()
            let newComponent = {
                blocks_id : id,
                name: this.newComponent.name,
                description: this.newComponent.description,
                category: this.newComponent.category,
                enabled: true,
                json: {
                        blocks : [ this.editor.current ],
                        css: '',
                        id: id,
                        image: null,
                        tag: 'document'
                },
                loop: null,
                loop_limit: null,
                loop_type: null                
            }
            
                /*
                let newComponent = {}
                newComponent = {
                    json: {
                        blocks : [ this.editor.current ]
                    },
                    name : this.newComponent.name,
                    description : this.newComponent.description,
                    category : this.newComponent.category,
                    enabled : true
                }
            */
            this.saveBlockAsComponent = false
            this.$emit('saveasreusable', newComponent)
            return null
               
            //}
            //this.saveBlockAsComponent = false
            //return null
        }
        
    },
    watch:{
        preview(v){
            return v ? this.$store.dispatch('message','Alt+x to close - Alt+s to save with printscreen') : null
        },
        editContent(v){
            if ( v && this.current && this.current.type === 'image' ){
                this.editContent = false
                this.media = true
            }
        },
        fontFamily(font){
            document.querySelector('#content').style.fontFamily = font
            this.doc.fontFamily = font
        },
    },
    
}
</script>