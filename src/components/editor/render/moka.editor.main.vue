<template>
<div>
    <div :class="'top-0 right-0 left-0 bottom-0 flex mx-2 mb-20 flex-row '" v-if="$attrs.component && hasblocks && !preview">
        <transition name="slideright">
        <div class="w-full overflow-y-auto overflow-x-hidden">
            
            <!-- MAIN CONTAINER -->
            <div :class="'relative mt-2 mx-2 p-2 cursor-pointer'">
                <div :class="'main absolute top-0 left-0 bottom-0 right-0 z-max mb-4 '" v-if="disable"></div>

                <!-- TOP BAR -->
                <div :class="'fixed z-xtop top-0 left-0 bg-gray-500 p-1 grid grid-cols-3 items-center w-full m-auto cursor-pointer'" title="Select component body">
                    <div class="flex flex-row items-center">
                        <i class="material-icons text-red-500" @click="checkAutosave()" title="Close">fiber_manual_record</i>
                        <i class="material-icons text-yellow-500" title="Select document" @click="$store.dispatch('setCurrent',doc),$store.dispatch('selected',doc.id)">fiber_manual_record</i>
                        <i class="material-icons text-green-500" @click="preview=!preview" title="preview">fiber_manual_record</i>
                        <div class="text-sm ml-4">
                            {{ $attrs.component.name }}
                            <span class="capitalize ml-2">- {{$attrs.component.category}}</span> [#{{$attrs.component.id}}]
                        </div>
                        <i class="material-icons hover:text-blue-500 ml-2" title="Settings" @click="settings=!settings">settings</i>
                    </div>
                    <div class="text-center font-black" style="">M O K A</div>
                    <div class="absolute right-0 mr-2 flex flex-row items-center">
                        <i class="material-icons hover:text-blue-500 mr-2" @click="saveComponent" title="Save">save</i>

                        <i class="material-icons hover:text-blue-500 mr-2" @click="$emit('savecopy')" title="Duplicate component">file_copy</i>
                        
                        <i :class="'material-icons hover:text-blue-500 mr-2 ' + hasPages()" @click="createPage=!createPage" :title="'Create a page/article'">web</i>

                        <i class="material-icons hover:text-blue-500 mr-2" @click="$store.dispatch('setAction','addreusable')" title="Import component">system_update_alt</i>
                        
                        <i class="material-icons hover:text-blue-500 mr-2" @click="$store.dispatch('loading'),exportComponent=!exportComponent" title="Export component">backup</i>
                        <i class="material-icons hover:text-blue-500 mr-2" v-if="$attrs.component && $attrs.component.category!='slider'" title="Preview" @click="preview=!preview,disable=false">remove_red_eye</i> 
                        <i class="material-icons hover:text-blue-500 mr-2" v-if="$attrs.component && $attrs.component.category==='slider'" title="Preview" @click="slider=!slider,disable=false">remove_red_eye</i>
                        <i class="material-icons hover:text-blue-500 mr-2" v-if="doc.hasOwnProperty('slider')" title="Slider Settings" @click="sliderSettings=!sliderSettings,disable=false">settings</i>
                    </div>
                </div>
                
                <!-- BLOCKS MAIN EDITOR -->
                <div class="pb-10 mt-4 mb-10 mx-5">
                  
                    <moka-editor-selectors 
                        :doc="doc"
                        :component="current"
                        :parent="$attrs.component"
                        :develop="true"
                        :category="$attrs.component.category"
                        :root="true"
                        @slidersettings="sliderSettings=!sliderSettings"
                        @save="saveComponent" 
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
                
            <!-- BOTTOM RIGHT BUTTONS ( Add block, add reusable, preview ) -->
            <div class="fixed bottom-0 right-0 opacity-100 hover:opacity-100 text-gray-300 mr-6 mb-12 z-top">
                    Document 
                    <!-- CLEAR SELECTION -->
                    <i class="material-icons moka-icons nuxpresso-icon-circle text-gray-300 ml-2" @click="$store.dispatch('setCurrent',doc),$store.dispatch('selected',doc.id)"
 title="Select document">border_clear</i>


                    <!-- ADD EMPTY BLOCK (GRID) -->
                    <i v-if="editor.current && editor.current.tag==='document'" class="material-icons moka-icons nuxpresso-icon-circle text-gray-300 ml-2" @click="grids=!grids" title="Add block">add</i>

                    <!-- IMPORT A BLOCK -->
                    <i v-if="editor.current && editor.current.tag==='document'" class="material-icons moka-icons nuxpresso-icon-circle text-gray-300 ml-2" @click="$store.dispatch('setAction','addreusable'),addBlock=true" title="Add reusable block">widgets</i>
                    
                    <!-- PREVIEW DOCUMENT -->
                    <i class="material-icons moka-icons nuxpresso-icon-circle text-gray-300 ml-2" v-if="$attrs.component && $attrs.component.category!='slider'" title="Preview" @click="preview=!preview,disable=false">remove_red_eye</i> 

                    <!-- PREVIEW SLIDER -->
                    <i class="material-icons nuxpresso-icon-circle ml-2 text-gray-300 bg-green-400 " v-if="$attrs.component && $attrs.component.category==='slider'" title="Preview" @click="slider=!slider,disable=false">remove_red_eye</i>
                    
                    <!-- SAVE DOCUMENT -->
                    <i class="material-icons moka-icons nuxpresso-icon-circle text-gray-300 ml-2" @click="saveComponent"
 title="Save document">save</i>
                    
                
            </div>

        </div>
        </transition>
    </div>

    <!-- COMPONENT SETTINGS -->
    <transition name="slideleft">
        <div class="fixed w-1/4 left-0 top-0 mt-8 flex flex-col shadow-lg p-2 pt-4 bg-white z-2xtop text-base" v-if="settings">
            <div class="p-2 bg-gray-200 rounded">
                <i class="material-icons absolute top-0 right-0 text-xl text-gray-400" @click="settings=!settings">close</i>
                <label class="font-bold">Name</label>
                <input class="w-full" type="text" v-model="$attrs.component.name"/> 
                <label class="font-bold">Description</label>
                <textarea class="w-full" v-model="$attrs.component.description"></textarea>

                <!-- Category -->
                <label class="font-bold ">Category</label>
                <select class="w-full" v-model="$attrs.component.category">
                    <option :key="category" v-for="category in $categories()">{{ category }}</option>
                </select>
                
                <label class="font-bold">Type <i class="material-icons" @click="addType=!addType">add</i></label>
                
                <!-- ADD A NEW TYPE (TAG) -->
                <input class="w-full" v-if="addType" v-model="newType" @change="saveNewType"/>
                
                <!-- TAGS -->
                <select class="w-full" v-model="$attrs.component.tags">
                    <option value=""></option>
                    <option :key="tipo" v-for="tipo in moka.elements.types.types" :value="tipo">{{ tipo }}</option>
                </select>

                <!-- BODY SETTINGS -->
                <div class="bg-gray-300 w-full my-1 p-1 font-bold cursor-pointer" @click="bodySettings=!bodySettings">Body settings <i class="material-icons">expand_more</i></div>
                <div v-if="bodySettings" class="flex flex-col p-2 w-full bg-white  text-base cursor-pointer">
                    <label class="font-bold">Body settings</label>
                    <div class="flex flex-row w-full text-sm">
                        <div class="mr-6">
                            <label class="font-bold">Text</label>
                            <moka-color attr="textcolor" v-model="doc.body_color" :css="doc.body_color"/>
                        </div>
                        <div>
                            <label class="font-bold">Background</label>
                            <moka-bgcolor attr="bgcolor" v-model="doc.body_bg" :css="doc.body_bg"/>
                        </div>
                    </div>
                </div>
                <!-- Font settings -->
                <div v-if="bodySettings">
                    <label class="font-bold">Font</label>
                    <select class="w-full" v-model="fontFamily">
                        <option value="Arial">sans</option>
                        <option value="serif">serif</option>
                        <option v-for="gfont in moka.elements.types.fonts">{{gfont}}</option>
                        <option v-for="font in moka.fonts" :value="font">{{font}}</option>
                        
                    </select>
                </div>    

                <div class="bg-gray-300 w-full cursor-pointer my-1 p-1 font-bold" @click="templateSettings=!templateSettings" v-if="$attrs.component.category === 'template'">Template settings <i class="material-icons">expand_more</i></div>
                <!-- DOC IS A TEMPLATE : template settings -->
                <div class="flex flex-col text-sm bg-white p-1" v-if="templateSettings">
                    <label class="font-bold">Default template</label>
                    <div class="text-xs text-gray-600"><input type="checkbox" v-model="$attrs.component.default"/> (apply to articles with no template)</div>
                
                    <div class="my-1">
                        <input type="checkbox" v-model="$attrs.component.loop"/>
                        <span class="font-bold">Loop </span>
                    </div>
                    <div class="flex flex-col" v-if="$attrs.component.loop">
                        <select class="w-full" v-model="$attrs.component.loop_type">
                            <option value="">all</option>
                            <option value="articles">articles</option>
                            <option :key="opt.slug" v-for="opt in moka.categories" :value="opt.slug">articles/category/{{opt.name}}</option>
                        </select>
                        <div class="my-1">
                            <input type="checkbox" v-model="$attrs.component.loop_pagination"/>
                            <label class="font-bold">Pagination</label> 
                        </div>
                        <div>Articles per page</div>
                        <input class="w-full" type="number" min="1" max="100" v-model="$attrs.component.loop_limit"/>
                    </div>
                </div>

                
                <div class="grid grid-cols-2 gap-2 p-1">
                    <!-- mobile breakpoint -->
                    <label class="font-bold">Mobile breakpoint </label>
                    <div class="flex flex-row cursor-pointer items-center" title="Set mobile responsive breakpoint">
                        <i :class="'material-icons moka-icons text-sm p-1 mr-2 ' + mobile('md')" @click="breakpoint='md'">phone_iphone</i>
                        <i :class="'material-icons moka-icons text-sm p-1 mr-2 ' + mobile('lg')" @click="breakpoint='lg'">tablet</i>
                        <i :class="'material-icons moka-icons text-sm p-1 mr-2 ' + mobile('xl')" @click="breakpoint='xl'">laptop_mac</i>
                    </div>
                    
                </div>
            </div>
        </div>
    </transition>

    
    <!-- SAVE AS COMPONENT -->
    <transition name="fade">
        <div v-if="saveBlockAsComponent" class="nuxpresso-modal rounded w-full md:w-1/3 p-2 flex flex-col bg-white z-2xtop border-t-8 border-gray-700 ">
            <i class="material-icons absolute top-0 right-0 cursor-pointer" @click="saveBlockAsComponent=!saveBlockAsComponent">close</i>
            
            <h4>Save Block As Reusable</h4>
            
            <div class="flex flex-col bg-gray-300 p-2 rounded">
                <label>Name*</label>
                <input class="w-full" type="text" v-model="newComponent.name"/>
                <label>Category</label>
                <select class="w-full" v-model="newComponent.category">
                    <option v-for="category in $categories()">{{ category }}</option>
                </select>
                <label>Type</label>
                <select class="w-full" v-model="newComponent.tags">
                    <option value=""></option>
                    <option v-for="tipo in moka.elements.types.types" :value="tipo">{{ tipo }}</option>
                </select>
                <label>Description</label>
                <textarea class="w-full" v-model="newComponent.description"/>
                <button @click="saveBlockAsNewComponent" class="my-2">Save</button>
            </div>
        </div>
    </transition>

    <!-- EXPORT COMPONENT -->
    <transition name="fade">
        <div v-if="exportComponent" class="nuxpresso-modal rounded w-full md:w-1/4  p-4 flex flex-col bg-white z-2xtop border-t-8 border-gray-700 ">
            <i class="material-icons absolute top-0 right-0 cursor-pointer" @click="exportComponent=!exportComponent">close</i>

            <h4>Export Component</h4>
            <div class="flex flex-col bg-gray-300 p-2 rounded">
            <vue-blob-json-csv
                file-type="json"
                :file-name="$attrs.component.name"
                :data="[exportJSON]"
                confirm="Do you want to download it?"
            >
            <button class="my-2">Download {{$attrs.component.name}}</button>
            </vue-blob-json-csv>
            </div>
        </div>
    </transition>

    <!-- ADD NEW BLOCK -->
    <transition name="fade">
        <div class="nuxpresso-modal text-xs p-4 z-2xtop w-3/4 overflow-y-auto border" v-if="grids">
            <i class="material-icons absolute right-0 top-0" @click="grids=!grids">close</i>
            <moka-grids @grid="addGrid"/>
            <!--
            <h3>Columns</h3>
            <div class="flex flex-col">
                Number of cols<br/>
                <input type="number" min="1" max="12" v-model="grid.cols"/> 
                <button class="my-2" @click="createGridNew">OK</button>
            </div>-->
        </div>
    </transition>

    <!-- ELEMENTS / REUSABLE COMPONENTS PICKER -->
    <transition name="slidedown">
        <!-- add new element -->
        <moka-reusable-elements v-if="editor.action==='addcomponent'" 
            :importReusable="false" 
            :newblock="false" 
            @grid="addGrid"
            @close="reusable=false,addBlock=false,$store.dispatch('setAction',null)" 
            @add="addReusable" 
            @importreusable="addReusable"/>
        <!-- replace current element -->

        <moka-reusable-elements v-if="editor.action==='replaceelement'" 
            :importReusable="false" 
            :newblock="false" 
            @close="reusable=false,addBlock=false,$store.dispatch('setAction',null)" 
            @add="replaceElement" 
            @importreusable="replaceElement"/>

        <!-- add reusable block -->
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
        <div :class="'absolute top-0 left-0 min-h-screen w-screen bg-white ' + body_settings" v-if="preview">
            <moka-editor-preview :category="$attrs.component.category" :doc="doc"  @save="saveprint" :loop="$attrs.component.loop_type" :develop="false" @close="preview=!preview" @html="viewhtml"/>

        </div>
    </transition>

    <!-- SLIDER SETTINGS -->
    <transition name="fade">
        <div v-if="editor.action === 'slidersettings'" class="nuxpresso-modal w-1/2 lg:w-1/2 xl:w-1/3 p-2 bg-white z-2xtop border-t-8 border-gray-700 rounded shadow-lg">
            <i class="material-icons absolute top-0 right-0 cursor-pointer" @click="$store.dispatch('setAction',null)">close</i>
            <h4>Slider Settings</h4>
            <div class="p-2">
                <moka-editor-slider v-if="doc.hasOwnProperty('slider')" :slider="doc"/>
                <moka-editor-slider v-if="!doc.hasOwnProperty('slider') && editor.current && editor.current.hasOwnProperty('slider')" :slider="editor.current"/>
            </div>
        </div>
    </transition>

    <!-- SLIDER PREVIEW-->
    <transition name="fade">
        <div class="absolute z-2xtop top-0 left-0 min-h-screen w-screen bg-white" v-if="slider">
            <moka-slider v-if="doc.hasOwnProperty('slider')" @save="saveprint" :develop="true" :embeded="true" :doc="doc" @close="slider=!slider"/>
        </div>
    </transition>

    <!-- CREATE IMAGE OF SELECTED BLOCK (Ctrl + o )-->
    <transition name="fade">
        <div :class="'nuxpresso-modal moka-block-preview w-full z-2xtop p-2 '" v-if="editor && ( editor.action==='snapshot') && ( editor.current.type==='flex' || editor.current.type === 'grid')">
            <div class="flex flex-row absolute top-0 right-0 mt-1 justify-end">
                <i class="material-icons moka-icon-circle mr-2" @click="printElement(editor.current.id)" v-if="!snapshot">camera_enhance</i>
                <i class="material-icons moka-icon-circle mr-2" @click="$store.dispatch('setAction',null)">close</i>
            </div>
            <moka-editor-preview v-if="!snapshot" :class="'w-full ' + editor.current.css.css + ' ' + editor.current.css.container" :category="$attrs.component.category" :doc="editor.current"  @save="printElement(editor.current.id)" :loop="false" :develop="false" @close="$store.dispatch('setAction',null)"/>
            <a ref="blockprint" v-if="snapshot" id="saveSnapshot" :href="snapshot" :download="$attrs.component.name" @click="$store.dispatch('setAction',null)"><img class="m-auto border border-dashed" :src="snapshot"/></a>
        </div>
    </transition>


    <!-- create a CMS page -->
    <transition name="fade">
        <div v-if="createPage" class="nuxpresso-modal z-2xtop border-t-8 border-gray-700 w-1/3 bg-white p-2 rounded shadow">
            <i class="material-icons absolute top-0 right-0 m-1" @click="createPage=!createPage">close</i>
            <h5>Create CMS Article</h5>
            <!-- <div class="text-orange-500 text-sm font-bold" v-if="hasPages && articles">This document is used as template by {{articles.length}} page/s</div> -->
            <div class="flex flex-col bg-gray-300 p-2 rounded">
            <div class="text-sm">This block/document will be linked to a new page.</div>
            <div class="flex flex-col">
                <label>Title</label>
                <input class="w-full" type="text" v-model="page.title"/>
                <label>Category</label>
                <select class="w-full" v-model="page.categories">
                    <option value=""></option>
                    <option v-for="(category,c) in moka.categories" :value="category"> {{ category.name }} </option>
                </select>
                <label>SEO Title</label>
                <input class="w-full" type="text" v-model="page.SEO.title"/>
                <label>SEO Description</label>
                <textarea class="w-full" v-model="page.SEO.description"/>
                <div class="my-2">
                    <button class="bg-gray-400 text-black mr-2" @click="createPage=!createPage">Cancel</button>
                    <button class="success" @click="createPage=false,$emit('createpage',page)">Create</button>
                </div>
            </div>
            </div>
        </div>
    </transition>
    <!-- HTML -->
    <transition name="fade">
        <div v-if="html" class="nuxpresso-modal w-3/4 p-4">
            <i class="material-icons absolute top-0 right-0 m-1" @click="html=null">close</i>
            <h4>HTML</h4>
            <textarea v-model="html" style="font-family:monospace" class="w-full h-64"/>
        </div>
    </transition>

    <transition name="fade">
        <moka-loading v-if="moka.loading"/>
    </transition>

    <transition name="fade">
        <div class="nuxpresso-modal z-2xtop w-1/3 p-4 flex flex-col" v-if="endEditor">
            <p>Save before to close ?</p>
            <div class="mt-4 flex flex-row justify-center">
                <button class="danger mr-2" @click="$store.dispatch('setAction',null),$router.push('dashboard')">Close</button>
                <button class="success" @click="$emit('save'),$store.dispatch('setAction',null),$router.push('dashboard')">Save</button>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
import qryPageTemplate from '@/apollo/articles-template_id.gql'
import MokaReusableElements from '@/components/editor/render/moka.reusable'
import MokaReusable from '@/components/editor/render/moka.reusable.preview'
import MokaEditorPreview from '@/components/editor/preview/moka.preview'
import MokaSlider from '@/components/editor/preview/moka.slider'
import MokaEditorSlider from '@/components/editor/render/moka.editor.slider'
import MokaEditorSelectors from '@/components/editor/render/moka.editor.selector'
import MokaGrids from '@/components/editor/render/moka.grids'
import MokaColor from '@/components/editor/tailwind/tailwind.color'
import MokaBgcolor from '@/components/editor/tailwind/tailwind.bgcolor'
import { mapState } from 'vuex'
import jp from 'jsonpath'

export default {
    name: 'MokaEditor',
    components: { 
        MokaReusableElements,
        MokaReusable , 
        MokaEditorPreview , 
        MokaSlider , 
        MokaEditorSlider , 
        MokaEditorSelectors ,
        MokaGrids,
        MokaColor,
        MokaBgcolor
    },
    data:()=>({
        addType: false,
        newType: '',
        //customizebar: false,
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
        exportComponent: false,
        saveBlockAsComponent: false,
        copiedElement: null,
        newComponent: {
            name: 'A new component',
            description: 'A new component by MOKA',
            category: '',
            enabled: true,
            tags: ''
        },
        snapshot: null,
        html: null,
        createPage: false,
        page: {
            title: 'new page',
            categories: [],
            template_id: '',
            SEO: {
                title: 'new page',
                description: 'A SEO description '
            }
        },
        bodySettings: false,
        templateSettings: false,
        timer: null,
        endEditor: false
    }),
    apollo: {
        articles : {
            query: qryPageTemplate,
            variables(){
                return {
                    template_id : this.$attrs.component.blocks_id
                }
            },
            update: data => data.articles
            
        }
    },
    computed:{
        ...mapState ( ['moka','editor'] ),
        //body settings in preview mode
        devMode(){
             if ( typeof webpackHotUpdate === 'undefined' ) {
                 
                 return false
             }
             return true
        },
        body_settings(){
            return this.preview ?
                this.doc.body_bg  + ' ' + this.doc.body_color :
                    'w-full bg-white'
        },
        //export blocks as JSON file 
        exportJSON(){
            let json = JSON.parse(JSON.stringify(this.$attrs.component))
            delete json.id
            //this.$store.dispatch('loading')
            return JSON.stringify(json)
        },
        //check if loaded component has blocks
        hasblocks(){
            if ( !this.$attrs.component ) this.$router.push('dashboard')
            this.doc = this.$attrs.component.json
            this.doc.id ? null : this.doc.id = this.$randomID()
            this.page.template_id = this.$attrs.component.blocks_id
            this.page.component = this.$attrs.component.id
            this.page.blocks = this.$attrs.component
            this.mycomponent = this.$attrs.component
            
            
            return true
        },
        
        //import elements schema
        schema(){
            return this.moka.elements.moka
        },
        
    },
    methods:{
        //add a grid as new block
        addGrid(grid){
            this.editor.current.blocks.push ( grid )
            //this.doc.blocks.push ( grid )
            this.grids = false
        },
        saveComponent(){
            if ( !this.devMode ){
                this.$store.dispatch('message','This option is available only in development mode')
                return 
            }
            if ( this.articles ){
                let inUseTemplate = this.articles.filter ( article => { 
                    console.log ( article.component.id )
                    return parseInt(article.component.id) === parseInt(this.$attrs.component.id)
                })
                if ( inUseTemplate ){
                    console.log ( 'savingPage ...')
                    inUseTemplate.forEach ( templ => {
                        templ.blocks = this.$attrs.component
                        this.$http.put ( 'articles/' + templ.id , templ ).then ( response => {
                            console.log ( 'update article ' , templ.title )
                        })
                    })
                    this.$emit('save')
                    //inUseTemplate[0].blocks = this.$attrs.component
                    //let updateArticle = inUseTemplate[0]
                    //this.$http.put ( 'articles/' + updateArticle.id , updateArticle ).then ( response => {
                    //    this.$emit('save')
                    //})
                } else {
                    this.$emit('save')
                }
            } else {
                this.$emit('save')
            }
        },
        hasPages(){
            let css = 'text-red-500'
            return ''
                //this.articles.length === 1 ?
                    //this.$store.dispatch ( 'message' , 'This block is used as template by ' + this.articles[0].title + ' article') : 
                        //this.$store.dispatch ( 'message' , 'This block is used as template by ' + this.articles.length + ' articles' ) : css = ''
            //return css
        },
        //save new elements type
        saveNewType(){
            this.moka.elements.types.types.push ( this.newType )
            this.$http.put ( 'elements' , this.moka.elements )
            this.newType = ''
            this.addType = false
        },
        //edit inline
        editInline(block){
            this.current = this.moka.current
            this.editContent = true
        },
        //save curren selected block
        saveBlock(block){
            this.current = block
            this.saveBlockAsComponent = true
        },
        //open reusable blocks selection
        reusableElement(current){
            this.reusable = true
        },
        //copy current element
        copyElement(current){
            delete current.parent
            let element = {}
            //element = Object.assign( {} , current )
            element = JSON.parse(JSON.stringify(this.editor.current))
            element = this.$clone ( element )
            element.id = this.$randomID()
            window.localStorage.setItem('nuxpresso-clipboard', JSON.stringify(element))
            this.copiedElement = element
            this.current = element
            this.$store.dispatch('message','Element copied')
        },
        //remove current element
        removeElement(){
            this.$findNode ( this.editor.current.id , this.doc , true  )
        },
        //paste current copied element
        pasteElement(){
            let clipboard = JSON.parse(window.localStorage.getItem('nuxpresso-clipboard'))
            //console.log ( clipboard )
            //console.log ( this.copiedElement.id )
            this.copiedElement = clipboard
            this.copiedElement.id = this.$randomID()
            let pastedElement = Object.assign ({}, this.copiedElement )
            pastedElement.id = this.$randomID()
            console.log ( pastedElement )
            this.addReusable ( pastedElement )
        },
        //duplicate current element
        duplicateElement(current){
            
            delete this.editor.current.parent    
            var parent = jp.parent ( this.$attrs.component , '$..blocks[?(@.id=="' + current.id + '")]' )
            let i 
            if ( parent ){
                parent.forEach ( (p,index) => {
                    if ( p.id === current.id ){
                        i = index
                    }
                })
                let el = JSON.parse(JSON.stringify(this.editor.current))
                let obj = this.$clone ( el )
                obj.id = this.$randomID()
                parent.splice ( i+1 , 0 , obj )
                this.$message ( 'Element duplicated')
            }
            /*
            let el = JSON.parse(JSON.stringify(this.editor.current))
            let obj = this.$clone ( el )
            obj.id = this.$randomID()
            this.$findNode ( this.editor.current.id , this.moka.component.json )
            this.editor.parent.blocks.push ( obj )
            delete this.editor.current.parent
            */
        },

        //replace a basic HTML element (not containers)
        replaceElement(component){
            //console.log ( component )
            component.id = this.$randomID()
            let obj = JSON.parse(JSON.stringify(component))
            this.editor.current = obj 
            this.editor.parent[0][this.editor.parent[1]] = obj
            //console.log ( obj )
            delete obj.parent
            this.$store.dispatch('selected',obj.id)
            this.$store.dispatch('setCurrent',obj)
            this.$store.dispatch ( 'setAction' , null )
            this.$store.dispatch( 'setParent' , null )
        },
        // return current breakpoint (sm/md/lg)
        mobile(bp){
            return bp === this.breakpoint ? 'nuxpresso-icon-circle' : ''
        },
        // Add a new block to the component as a grid
        createGridNew(){
            let obj = JSON.parse(JSON.stringify(this.schema.containers[0]))
            obj['blocks'] = []
            obj.id = this.$randomID()
            //obj.css.container = "flex flex-col md:grid md:grid-cols-" + this.grid.cols
            obj.css.container = "grid md:grid-rows-1 md:grid-cols-" + this.grid.cols +  " grid-cols-1"  
            obj.css.css = ''
            obj.cols = parseInt(this.grid.cols)
            let content 
           //console.log ( obj.cols )
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
            //console.log ( obj )
            this.grids = false
        },
        addMultipleBlocks(reusable){
            reusable.json.blocks.forEach ( block => {
                //console.log ('multiple blocks=>' , block )
                let obj = { json: { blocks: [ block ] }}
                this.addReusable( obj )
            })
        },
        addObject(obj){
            this.reusable = false
            let component = {}
            let json , imported
            //console.log ( 'importing ... ' , obj )
            if ( obj.hasOwnProperty ( 'json' ) ){
                if ( !obj.json.hasOwnProperty('slider' ) ) {
                    imported = obj.json.blocks[0]
                    component = this.$clone(imported)
                } else {
                    imported = obj.json
                    component = this.$clone(imported)
                    console.log ( 'slider => ' , component )
                }            
            } else {
                imported = obj
                component = this.$clone(imported)
            }
            if ( component ){
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
                target.blocks.push ( component )
                this.addBlock = false
                //this.copiedElement = null
                this.$store.dispatch('setAction',null)
            }
        },
        //add a reusable block (copied element or selected from the list)
        addReusable(id){
            //console.log ( id )
            if ( typeof id != 'object' ){
                this.$http.get('components/' + id ).then ( resp => {
                    let obj = resp.data
                    if ( !obj ) {
                        this.$store.dispatch('message','No objects in the clipboard')
                        return 
                    }
                    this.addObject ( obj )
                })
            } else {
                this.addObject ( id )
            }
        },
        //add an HTML element
        addComponent(component){
            let comp = {}
            comp = Object.assign ({} , component.json )
            comp.id = this.$randomID()
            let master = this.$getDoc ( this.doc , this.current.coords)
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
        //save screenshot of blocks
        save(screenshot){
            if ( screenshot ){
                this.mycomponent.image = screenshot
                this.mycomponent.image_uri = screenshot.url
                    //!screenshot.url.includes('http') ? 
                        //process.env.VUE_APP_API_URL + screenshot.url.replace('/','') : 
                            //screenshot.url
            }
            this.$emit('save')
        },
        //screenshot print
        saveprint(){
            if ( !this.devMode ){
                this.$store.dispatch('message','This option is available only in development mode')
                return
            }
            this.print()
        },
        //print action
        async print(block='content') {
            if ( !this.devMode ){
                this.$store.dispatch('message','This option is available only in development mode')
                return
            }
            let el , options
            el = document.querySelector('#' + block)
            if (!el){
                document.querySelector(block)
            }
            options = { type: "dataURL" , useCORS: true , scale: 0.50 }
            let screenshot = await this.$html2canvas(el, options)
            if ( this.$attrs.component.image && this.$attrs.component.image.id ){
                this.$http.delete('/upload/files/' + this.$attrs.component.image.id ).then ( resp => {
                    //console.log ( resp )
                })
            }
            this.srcToFile ( screenshot ,  'moka-preview-' + this.$attrs.component.name + '.jpg' , 'image/jpg' ).then ( resp => { 
                //console.log ( 'src to file => ' , resp )
                let formData = new FormData()
                formData.append("files", resp )
                this.$http.post("/upload", 
                    formData ,
                    {   
                        headers: {
                            "Content-Type": "multipart/form-data"
                        },
                }).then ( response => {
                    screenshot = response.data[0]
                    this.save(screenshot)
                    return screenshot
                }).catch ( error => {
                    this.$store.dispatch ( 'message' , 'An error occured. Check your console log')
                    //console.log ( error )
                })
            })
            
        }, 
        async srcToFile(src, fileName, mimeType){
            return (fetch(src)
                .then(function(res){return res.arrayBuffer();})
                .then(function(buf){return new File([buf], fileName, {type:mimeType});})
            );
        },
        //print an element (Ctrl+o)
        async printElement(id) {
            let el , options
            //console.log ( id )
            el = document.querySelector('.moka-block-preview')
            el = el.querySelector('#content')
            //console.log ( el )
            options = { type: "dataURL" , useCORS: true , scale: .70 }
            this.snapshot = await this.$html2canvas(el, options)
            this.$store.dispatch('message','Click on the image to download')
        }, 
        //save a block as a reusable one
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
            this.saveBlockAsComponent = false
            this.$emit('saveasreusable', newComponent)
            return null
        },
        viewhtml(html){
            
            this.html = this.$beautify ( html.replaceAll('<!---->','').replaceAll('[object Object]','') )
        },
        checkAutosave(){
            this.endEditor = true
        }
    },
    watch:{
        preview(v){
            return v ? this.$store.dispatch('message','Alt+x to close - Alt+s to save with printscreen') : null
        },
        fontFamily(font){
            document.querySelector('#content').style.fontFamily = font
            this.doc.fontFamily = font
        },
    },
    mounted(){
        let vm = this
        this.timer = window.setInterval (()=>{
            
            let blocks = {
                blocks: vm.doc,
                lastUpdate: new Date()
            }
            let data = {
                autosave:  blocks
            }
            vm.$http.put ( 'components/' + vm.$attrs.component.id , data ).catch( error => {
                this.$message ( 'Error during autosave' )
            })
            vm.$store.dispatch ( 'autoSave' , blocks )
            window.localStorage.setItem('nuxpresso-autosave',JSON.stringify(blocks))
        }, 60000*5 )
    },
    beforeDestroy(){
        window.clearInterval(this.timer)
    }
}
</script>