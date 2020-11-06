<template>
<div>
    <div class="w-full fixed top-0 right-0 left-0 bottom-0 flex flex-row bg-gray-200" v-if="$attrs.component && hasblocks && !preview">
        <div class="w-full overflow-y-auto">
           
            <div :class="'relative mt-2 mx-2 p-2 cursor-pointer'">
                <div class="absolute top-0 left-0 bottom-0 right-0 z-top" v-if="disable"></div>
                <div :class="'bg-gray-500 p-1 rounded-tl-lg rounded-tr-lg grid grid-cols-3 items-center relative cursor-pointer z-top '  + activeDocHead($attrs.component.id)" title="Select component body"  @click="current.coords=[],current.entity=doc,$store.dispatch('selected',$attrs.component.id)">
                    <div class="flex flex-row items-center">
                        <i class="material-icons text-red-500" @click="$router.push('dashboard')" title="Close">fiber_manual_record</i>
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
                        <i class="material-icons hover:text-blue-500 mr-2" @click="importReusable=!importReusable,reusable=!reusable" title="Import component">system_update_alt</i>
                        <i class="material-icons hover:text-blue-500 mr-2" v-if="$attrs.component && $attrs.component.category!='slider'" title="Preview" @click="preview=!preview,disable=false">preview</i> 
                        <i class="material-icons hover:text-blue-500 mr-2" v-if="$attrs.component && $attrs.component.category==='slider'" title="Preview" @click="slider=!slider,disable=false">preview</i>
                        <i class="material-icons hover:text-blue-500 mr-2" v-if="doc.hasOwnProperty('slider')" title="Slider Settings" @click="sliderSettings=!sliderSettings,disable=false">settings</i>
                    </div>
                </div>
                
                <!--<i class="material-icons moka-icons absolute box-border text-xl left-0 -mt-8 ml-1 mb-8" @click="current.coords=null,current.entity=doc,$store.dispatch('selected',$attrs.component.id)" title="Select component body">web</i>-->

                <div :class="'border box-border rounded-bl rounded-br shadow ' + activeDoc($attrs.component.id)">
                

                <moka-editor-selectors 
                    :doc="doc"
                    :component="current"
                    :develop="true"
                    @save="save" 
                    @preview="preview=!preview"
                    @slider="slider=!slider,disable=false"
                    @animations="animations=!animations"
                    @reusable="reusableElement"
                    @import="importReusable=!importReusable,reusable=!reusable"
                    @edit="editContent=!editContent"
                    @copy="copyElement"
                    @paste="pasteElement"
                    @duplicate="duplicateElement"
                    @saveblock="saveBlock"
                    @delete="removeElement"/>    
                
                <!--<div :class="doc.css + ' p-8 h-full ' " :style="stile(doc) + ' ' + background(doc)">
                <draggable v-model="doc.blocks" class="grid gap-4">
                    <div v-for="(block,index) in doc.blocks" :class="'relative ' + Object.values(block.css).join(' ')" :style="stile(block) + background(block)" :id="block.id">

                        <div container v-if="!block.hasOwnProperty('slider')" v-for="(row,r) in block.blocks" :class="'z-4 relative flex ' + row.css" :style="stile(row) + background(row)">
                        
                                <draggable v-model="row.blocks" class="grid gap-4">
                        
                                    <div v-for="(element,e) in row.blocks" class="relative z-5">

                                        <moka-element :key="'el_' + r + e" 
                                            :element="element" 
                                            v-if="element.tag!='container'" 
                                            class="z-5"
                                            :coords="[index,r,e]"
                                            :current="current" 
                                            :develop="true"
                                            @duplicate="duplicateElement(element,[index,r,e])"
                                            @delete="removeElement"
                                            @selected="selectElement(element,[index,r,e]),allCss=element.css"
                                            @editelement="customizebar=!customizebar"
                                            @editinline="editContent=!editContent"
                                            />

                                        <moka-editor-blocks v-else :blocks="element" :coords="[index,r,e]" @selected="sub"/>
                                    
                                    </div>

                        
                                </draggable>  
                                <div :class="'z-4 -m-2 moka-editor-selector ' + active(row.id,row.css)" @click="$store.dispatch('selected',row.id),selectElement(row,[index,r]),allCss=row.css">
                                    <div class="moka-editor-tag">
                                        <i class="material-icons moka-icons" @click="customizebar=!customizebar">select_all</i>
                                        
                                    </div>
                                </div>
                            </div>
                        <div :class="'moka-editor-selector-block z-2 h-full ' + active(block.id)" @click="$store.dispatch('selected',block.id),selectElement(block,[index]),allCss=block.css.css">
                            <div class="moka-editor-tag">
                                <i v-if="block.hasOwnProperty('slider')" class="material-icons moka-icons" @click="customizebar=!customizebar">collections</i>
                                <i v-else class="material-icons moka-icons" @click="customizebar=!customizebar">view_columns</i>
                            </div>
                        </div>
                        <div v-if="block.hasOwnProperty('slider')" class="text-center text-sm">
                            <label>[slider] <span class="font-bold">{{block.name}}</span></label>
                            <img :src="block.image_uri" class="h-1/5 m-auto"/>
                        </div>
                    </div>
                </draggable>
                </div>-->
               
                </div>
            </div>
                
            
            <div class="opacity-100 hover:opacity-100 text-center pb-6 mb-6" title="Add block">
                <i class="material-icons moka-icons nuxpresso-icon-circle" @click="grids=!grids">add</i><!--addBlock=true,reusable=!reusable-->
                <div class="text-gray-500 text-sm">Add block</div>
            </div>
        </div>
        <!--
        <transition name="slideright">
            <div v-if="!customizebar && current && current.entity" style="transform:translateY(-50%);top:50%;" class="absolute top-0 z-top right-0 w-10 p-1 cursor-pointer border shadow-lg rounded-tl-lg rounded-bl-lg bg-gray-600 transform flex flex-col">
                <i class="material-icons nuxpresso-icon-btn text-black mb-2" @click="customizebar=!customizebar" title="Edit component">edit</i>
                <i v-if="current.coords.length === 2 || current.coords.length === 4" class="material-icons nuxpresso-icon-btn text-black mb-2" @click="reusable=!reusable" title="Add component">add</i>
                
                <i v-if="current.coords && current.coords.length === 3" class="material-icons nuxpresso-icon-btn text-black mb-2" @click="copyElement" title="Copy element">content_copy</i>
                <i v-if="copiedElement" class="material-icons nuxpresso-icon-btn text-black mb-2" @click="pasteElement" title="Paste element">content_paste</i>
                <i class="material-icons nuxpresso-icon-btn text-black mb-2" @click="duplicateElement(current.entity,current.coords)" title="Duplicate element">file_copy</i>
                <i class="material-icons nuxpresso-icon-btn text-black mb-2" v-if="current.entity.tag==='container'" @click="saveBlockAsComponent=!saveBlockAsComponent" title="Save block as component">save</i>
                <i class="material-icons nuxpresso-icon-btn text-black mb-2" @click="animations=!animations" title="Animation">motion_photos_on</i>
                
                <i class="material-icons nuxpresso-icon-btn text-black mb-2" v-if="$attrs.component && $attrs.component.category!='slider'" title="Preview" @click="preview=!preview,disable=false">preview</i> 
                <i class="material-icons nuxpresso-icon-btn text-black mb-2" v-if="$attrs.component && $attrs.component.category==='slider'" title="Preview" @click="slider=!slider,disable=false">preview</i>
                <i class="material-icons nuxpresso-icon-btn text-black" @click="removeElement" title="Delete element">delete</i>
                
            </div>
        </transition>
        -->
        <transition name="slideright">
            <div v-if="customizebar" class="fixed w-1/5 bg-gray-800 text-gray-500 text-xs z-top  shadow-lg min-h-screen right-0 top-0">
                
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
        
        <!--<div class="fixed bottom-0 right-0 z-top" v-if="current && current.entity && current.entity.id === moka.selected">
            <i class="material-icons p-1" @click="position=!position">pan_tool</i>
            <div class="mb-2 flex flex-col text-xs bg-white border rounded p-2" v-if="position">
                        
                    <label>X Axis</label>
                    <moka-position axis="x" :position="twCss.positionx" @set="setTW"/>
                    <label>Y Axis</label>
                    <moka-position axis="y" :position="twCss.positiony" @set="setTW"/>
                    <label class="my-2">Level</label>
                    <input type="range" min="0" max="10" v-model="zindex"/>
            </div>
        </div>
        -->
    </div>

    <!-- COMPONENT SETTINGS -->
    <transition name="slideleft">
        <div class="fixed left-0 top-0 mt-12 ml-4 flex flex-col shadow-lg p-4 bg-white" v-if="settings">
            <i class="material-icons absolute right-0 mr-2" @click="settings=!settings">close</i>
            <label class="font-bold">Name</label>
            <input type="text" v-model="$attrs.component.name"/> 
            <label class="font-bold">Description</label>
            <textarea v-model="$attrs.component.description"></textarea>
            <label class="font-bold ">Category</label>
            <select v-model="$attrs.component.category">
                <option value="component">component</option>
                <option value="widget">widget</option>
                <option value="template">template</option>
                <option value="page">page</option>
                <option value="slider">slider</option>
                <option value="gallery">gallery</option>
            </select>
            <label>Loop</label>
            <input type="checkbox" v-model="$attrs.component.loop"/>
            <select v-model="$attrs.component.loop_type">
                <option value="articles">articles</option>
                <option value="last">last articles</option>
                <option value="category">articles category</option>
                <option value="tag">articles tag</option>
            </select>
            </select>

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
                    <option v-for="font in moka.fonts" :value="font">{{font}}</option>
                    <!--
                    <option value="Barlow Condensed">Default</option>
                    <option value="Abel">Abel</option>
                    <option value="Alice">Alice</option>
                    <option value="Amethysta">Amethysta</option>
                    <option value="Arima Madurai">Arima Madurai</option>
                    -->
                </select>
            </div>
        </div>
    </transition>

    <!-- EDIT CONTENT INLINE -->
    <transition name="fade">
        <div v-if="editContent" class="nuxpresso-modal w-1/2 p-4 border shadow-lg text-sm">
            <i class="material-icons absolute top-0 right-0 cursor-pointer" @click="editContent=!editContent">close</i>
            <textarea class="w-full text-base" v-if="current && current.entity.tag === 'element' && current.entity.element != 'p'" v-model="current.entity.content"></textarea>
            <moka-text-editor v-if="current && current.entity.tag === 'element' && current.entity.element === 'p'"  v-model="current.entity.content" @close="editConntent=!editContent"/>
        </div>
    </transition>

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
        <div v-if="saveBlockAsComponent" class="nuxpresso-modal rounded w-full md:w-1/4 p-4 flex flex-col bg-white z-50">
            <i class="material-icons absolute top-0 right-0 cursor-pointer" @click="saveBlockAsComponent=!saveBlockAsComponent">close</i>
            <h4>Save Block As Component</h4>
            <label>Name*</label>
            <input type="text" v-model="newComponent.name"/>
            <label>Category</label>
            <select v-model="newComponent.category">
                <option value="component">component</option>
                <option value="widget">widget</option>
                <option value="template">template</option>
                <option value="page">page</option>
                <option value="slider">slider</option>
                <option value="gallery">gallery</option> 
            </select>
            <label>Description</label>
            <textarea v-model="newComponent.description"/>
            <button @click="saveBlockAsNewComponent" class="my-2">Save</button>
        </div>
    </transition>

    <!-- REUSABLE COMPONENTS PICKER -->
    <transition name="slidedown">
        <moka-reusable v-if="reusable" :importReusable="importReusable" :newblock="addBlock" @close="reusable=!reusable" @add="addReusable" @importreusable="addComponent"/>
    </transition>

    <!-- PREVIEW -->
    <transition name="fade">
        <div class="absolute top-0 left-0 min-h-screen w-screen bg-white" v-if="preview">
            <moka-editor-preview :doc="doc" @save="save" :loop="$attrs.component.loop_type" :develop="true" @close="preview=!preview"/>
        </div>
    </transition>

    <!-- SLIDER SETTINGS -->
    <transition name="fade">
        <div v-if="sliderSettings" class="nuxpresso-modal w-1/3 p-2 border rounded shadow-lg">
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
        <div class="absolute z-max top-0 left-0 min-h-screen w-screen bg-white" v-if="slider">
            <moka-slider v-if="doc.hasOwnProperty('slider')" @save="save" :develop="true" :embeded="true" :doc="doc" @close="slider=!slider"/>
            <!--<moka-slider :doc="doc" :embeded="true" @save="save" @close="slider=!slider"/>-->
        </div>
    </transition>

    <!-- GRID SETTINGS -->
    <transition name="fade">
        <div class="nuxpresso-modal text-xs p-4 z-50 w-1/3 border" v-if="grids">
            <i class="material-icons moka-icons absolute right-0 top-0" @click="grids=!grids">close</i>
            <h3>Columns</h3>
            <div class="flex flex-col">
                Number of cols<br/>
                <input type="number" min="1" max="12" v-model="grid.cols"/> 
                <!--
                Number of elements<br/>
                <input type="number" min="1" v-model="grid.rows"/> 
                -->
                <button class="my-2" @click="createGrid(grid.cols)">OK</button>
            </div>
        </div>
    </transition>

</div>
</template>

<script>
import MokaElement from '@/components/editor/moka.editor.element'
import MokaCustomize from '@/components/editor/moka.editor.customize'
import MokaReusable from '@/components/editor/moka.reusable'
import MokaEditorMedia from '@/components/media/media'
import MokaEditorBlocks from '@/components/editor/moka.editor.blocks.loop'
import MokaEditorPreview from '@/components/editor/moka.preview'
import MokaTextEditor from '@/components/editor/moka.text.editor'
import MokaSlider from '@/components/editor/moka.preview.slider'
import MokaPosition from '@/components/editor/tailwind.position'
import MokaEditorSlider from '@/components/editor/moka.editor.slider'
import MokaEditorSelectors from '@/components/editor/moka.editor.selectors'

import { mapState } from 'vuex'
import draggable from 'vuedraggable'

import gsapEffects from '@/plugins/animations'

export default {
    name: 'MokaEditor',
    components: { MokaElement , MokaCustomize , MokaEditorMedia , MokaReusable , MokaEditorBlocks, MokaEditorPreview , MokaSlider , MokaPosition, MokaTextEditor , MokaEditorSlider , MokaEditorSelectors ,  draggable },
    data:()=>({
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
        current:{
            row: null,
            col: null,
            el: null,
            slot: null,
            entity: null,
            coords: null,
        },
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
        saveBlockAsComponent: false,
        copiedElement: null,
        newComponent: {
            name: 'A new component',
            description: 'A new component by MOKA',
            category: '',
            enabled: true
        }
    }),
    computed:{
        ...mapState ( ['moka'] ),
        hasblocks(){
            if ( !this.$attrs.component ) this.$router.push('dashboard')
            this.doc = this.$attrs.component.json
            this.doc.id = this.$randomID()
            this.mycomponent = this.$attrs.component
            return true
        },
        gsapAnimations(){
            return gsapEffects
        }
    },
    methods:{
        saveBlock(block){
            this.current = block
            this.saveBlockAsComponent = true
        },
        reusableElement(current){
            this.current = current 
            this.reusable = true
        },
        copyElement(current){
            let element = {}
            element = Object.assign( {} , current.entity )
            element.id = this.$randomID()
            this.copiedElement = element
            this.current = current
        },
        setAnimation(){
            this.current.entity['animation'] = this.animation
        },
        setTW(scope){
            this.twCss[scope[0]] = scope[1]
            this.current.entity.css.hasOwnProperty('container') ? 
                this.current.entity.css.css = this.$clean ( Object.values( this.twCss ).join ( ' ' ) ) :
                    this.current.entity.css = this.$clean ( Object.values( this.twCss ).join ( ' ' ) )
        },
        mobile(bp){
            return bp === this.breakpoint ? 'nuxpresso-icon-circle' : ''
        },
        activeDocHead(id){
            if ( id === this.moka.selected ){
                return 'bg-gray-700 text-gray-200'
            }
            return 'bg-gray-500 text-gray-700'
        },
        activeDoc(id){
            if ( id === this.moka.selected ){
                return ' moka-editor-active border-dashed border-indigo-500 bg-white border-4'
            }
            return ' border-transparent bg-white'
            
        },
        active(id,css){
            let translate = ''
            
            if ( id === this.moka.selected ){
                return ' moka-editor-active' + translate
            }
            return translate
            
        },
        stile(block){
            return block.hasOwnProperty('style') ? block.style : ''
        },
        background(block){
            return block.hasOwnProperty('image') ?
                block.image ? 
                    ' background-image:url(' + block.image.url + ');' : '' : ''
        },
        setPosition(){
            this.allCss = ''
            let css, classi
            this.current.entity.css.hasOwnProperty('container') ? css = this.current.entity.css.css : css = this.current.entity.css
            if ( css.length ){
                classi = css.split( ' ' )
                classi.forEach ( (classe,index) => {
                    if ( classe ){
                        let deserialize = this.$cssDeserialize(classe)
                        if ( deserialize ) {
                            this.twCss[classe] = classe
                            deserialize.length === 2 ?
                                this.twCss[deserialize[0]] = deserialize[1] :
                                    this.twCss[classe] = classe

                        } else {
                            this.twCss[this.$clean(classe)] = classe
                        }
                    }

                })    
            }
        },
        selectElement(element,coords){
            this.customize = false
            this.current.entity = element
            this.current.coords = coords
            this.twCss = {}
            this.animation = this.current.entity.hasOwnProperty('animation') ? this.current.entity.animation : ''
            this.setPosition()
        },
        duplicateBlock(block,coords){
            let master = this.doc.blocks[coords[0]]
            let obj = {}
            master.blocks.push ( this.$unique ( block ))
            return
            /*
            obj = Object.assign ( {} , block )
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
            */
        },
        duplicateElement(current){
            let coords = current.coords
            if ( coords.length === 3 || coords.length === 5 ){
                let obj = {}
                obj = Object.assign ( {} , current.entity )
                if ( current.coords.length === 3 ){
                    obj.id = this.$randomID()
                    let clone = this.$unique(obj)
                    this.doc.blocks[coords[0]].blocks[coords[1]].blocks.splice ( coords[2] , 0 , clone )
                } else {
                    obj.id = this.$randomID()
                    let clone = this.$unique(obj)
                    this.doc.blocks[coords[0]].blocks[coords[1]].blocks[coords[2]].blocks[coords[3]].blocks.splice ( coords[4] , 0 , clone )
                }
                return
            }
            if ( current.coords.length === 2 ){
                this.duplicateBlock ( current.entity , current.coords )
                return
            }
            if ( current.coords.length === 1 ){
                let obj = {}
                obj = Object.assign ( {} , current.entity )
                let clone = this.$unique ( obj )
                this.doc.blocks.splice ( current.coords[0],0,clone )
                return
            }
        },
        createGrid(cols){
            this.doc.blocks.push ( this.$grid (cols) )
            this.current.coords = [ this.doc.blocks.length -1 , 0 ]
            this.current.entity = this.doc.blocks[this.current.coords[0]].blocks[this.current.coords[1]]
            this.grids = false
            this.reusable = true
        },
        addReusable(obj){
            this.reusable = false
            let coords = this.current.coords
            let component = {}
            component = Object.assign( {} , obj )
            component.id = this.$randomID()
            if ( !this.addBlock ){
                if ( coords.length === 1 ){
                    let pos = this.doc.blocks[coords[0]].blocks.length-1
                    this.doc.blocks[coords[0]].blocks[pos].blocks.push ( component )
                    this.current.coords = [coords[0],pos,this.doc.blocks[coords[0]].blocks[pos].blocks.length-1]
                }
                if ( coords.length === 2 ){
                    this.doc.blocks[coords[0]].blocks[coords[1]].blocks.push ( component )
                    this.current.coords = [coords[0],coords[1],this.doc.blocks[coords[0]].blocks[coords[1]].blocks.length-1]
                }
                if ( coords.length === 3 ){
                        console.log ( 'flex => ' , this.doc.blocks[coords[0]].blocks[coords[1]].blocks[coords[2]] )
                        this.doc.blocks[coords[0]].blocks[coords[1]].blocks[coords[2]].blocks.push ( component )
                    }
                if ( coords.length > 3 ){
                    this.doc.blocks[coords[0]].blocks[coords[1]].blocks[coords[2]].blocks[coords[3]].blocks.push ( component )
                    
                }
                /*
                if ( coords.length > 4 ){
                    this.doc.blocks[coords[0]].blocks[coords[1]].blocks[coords[2]].blocks[coords[3]].blocks.push ( component )
                    this.current.coords = [coords[0],coords[1],coords[2],coords[3],this.doc.blocks[coords[0]].blocks[coords[1]].blocks[coords[2]].blocks[coords[3]].blocks.length-1]
                }
                */

                this.current.entity = component 
                //obj.type === 'image' || obj.type === 'video' ? this.media = true : null  
                /*
                if ( coords.length === 1 ){
                    this.doc.blocks[coords[0]].blocks[this.doc.blocks[coords[0]].length-1].push ( component )
                }
                */
                /*

                    this.current.entity.hasOwnProperty('blocks') ? 
                        this.current.entity.blocks.push( component ) : 
                            this.current.entity.blocks = [ component ]
                    this.current.coords = this.current.coords.length-1
                    this.current.entity = component
                */
                    
            } else {
                this.doc.blocks.push ( this.$unique(component) )
                this.addBlock = false
            } 
          
        },
        addComponent(component){
            let comp = {}
            comp = Object.assign ({} , component.json )
            comp.id = this.$randomID()
            let master = this.doc
            let coords = this.moka.current.coords
            if ( component.category != 'slider' ){
                let clone = this.$unique ( comp.blocks[0] )
                if ( coords.length < 2 ){
                    master.blocks.push ( clone )
                } else {
                    if ( coords.length === 2 ){
                        master.blocks[coords[0]].blocks[coords[1]].blocks.push ( clone )
                    }
                    if ( coords.length === 3 ){
                        console.log ( 'flex => ' , master.blocks[coords[0]].blocks[coords[1]].blocks[coords[2]] )
                        master.blocks[coords[0]].blocks[coords[1]].blocks[coords[2]].blocks.push ( clone )
                    }
                }
            } else {
                comp.name = component.name
                comp.id = this.$randomID()
                let clone = this.$unique(comp)
                clone.image_uri = component.image_uri
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
            let coo = this.current.coords
            this.current.entity = null
            this.current && this.current.coords ?

                this.current.coords.length === 1 ? 
                    this.doc.blocks.splice(this.current.coords[0],1) : 
                        this.current.coords.length === 2 ? 
                            this.doc.blocks[this.current.coords[0]].blocks.splice(this.current.coords[1],1) :
                                this.current.coords.length === 3 ? 
                                    this.doc.blocks[this.current.coords[0]].blocks[this.current.coords[1]].blocks.splice(this.current.coords[2],1) : 
                                        this.current.coords.length === 4 ?
                                            this.doc.blocks[coo[0]].blocks[coo[1]].blocks[coo[2]].blocks.splice(coo[3],1):
                                                this.current.coords.length === 5 ? this.doc.blocks[coo[0]].blocks[coo[1]].blocks[coo[2]].blocks[coo[3]].blocks.splice(coo[4],1) : null : null
        },
        _copyElement(){
            let element = {}
            element = Object.assign( {} , this.current.entity )
            element.id = this.$randomID()
            this.copiedElement = element
        },
        pasteElement(){
            let coords = this.current && this.current.coords ? this.current.coords : null
            let obj = Object.assign ( {} , this.copiedElement )
            obj.id = this.$randomID()
            coords ?
                coords.length === 2 || coords.length === 3 ?
                    this.doc.blocks[coords[0]].blocks[coords[1]].blocks.push ( obj ) : 
                    coords.length === 4 ?
                        this.doc.blocks[coords[0]].blocks[coords[1]].blocks[coords[2]].blocks.push ( obj )  : null : null 
        },
        setImage(img){
            let image = img ? this.$cleanImage(img) : null
            this.current.entity.image = image
            this.media =! this.media           
        },
        save(screenshot){
            this.mycomponent.image_uri = screenshot
            this.$emit('save')
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
            options = { type: "dataURL" , useCORS: true , scale: 0.50 }
            let screenshot = await this.$html2canvas(el, options)
            //this.printScreen = screenshot
            return screenshot
        }, 
        sub(element,coords){
            this.customize = false
            this.current.entity = element
            this.current.coords = coords
        },
        saveBlockAsNewComponent(block){
            
            this.loading = true
            if ( this.current.coords.length === 1 ){
                let newComponent = {}
                newComponent = Object.assign( {}, this.$attrs.component)
                let block = {}
                block = this.current.entity
                newComponent.json.blocks = [ block ]
                newComponent.name = this.newComponent.name
                newComponent.description = this.newComponent.description
                newComponent.category = this.newComponent.category
                newComponent.enabled = true
                this.saveBlockAsComponent = false
                this.$emit('saveasreusable', newComponent)
                return null
               
            }
            this.saveBlockAsComponent = false
            return null
        }
        
    },
    watch:{
        editContent(v){
            if ( v && this.current && this.current.entity.type === 'image' ){
                this.editContent = false
                this.media = true
            }
        },
        fontFamily(font){
            document.querySelector('#content').style.fontFamily = font
            this.doc.fontFamily = font
            //this.$attrs.component.json.blocks[0].block.style = 'font-family:\"' + font + '\"'
        },
    }
}
</script>