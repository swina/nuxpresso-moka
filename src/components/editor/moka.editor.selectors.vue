<template>
<!-- MAIN CONTAINER -->
<div class="w-full h-auto p-10 top-0 left-0 border relative">
    <div class="absolute top-0 left-0 flex flex-row">
        <i class="material-icons" @click="tree=!tree">account_tree</i>
        <i class="material-icons ml-2" @click="setCurrent([0],doc)">web</i>
    </div>
    <div :class="doc.css + ' p-1 border-2 border-transparent ' + activeDoc(doc.id)" :style="stile(doc) + ' ' + background(doc)" id="content">
        <!-- 1st level - BLOCKS LOOP -->
        
        <draggable v-model="doc.blocks">
            <div block v-for="(block,b) in doc.blocks" :class="'relative ' + responsive(block.css.css) + ' ' + block.css.container" :style="stile(block) + background(block)" :key="block.id" :ref="block.id">
                    <!-- 2nd level - BLOCKS LOOP --->
                    <draggable v-model="block.blocks" container v-for="(row,r) in block.blocks" :class="'relative z-3 flex flex-col h-full ' + responsive(row.css)" :style="stile(row) + background(row)" :key="row.id" :ref="row.id">
                        <!-- BLOCKS ELEMENTS LOOP -->
                        <draggable v-model="row.blocks">
                            <!--<div v-for="(element,e) in row.blocks" class="relative z-4" v-if="!row.hasOwnProperty('slider')" :key="element.id" >
                             -->   
                                <moka-element  
                                    :key="element.id"
                                    data-trigger="scroller"
                                    :element="element"
                                    v-for="(element,e) in row.blocks" 
                                    v-if="element.type!='grid' && element.type != 'flex' && !row.hasOwnProperty('slider')" 
                                    :coords="[b,r,e]"
                                    :develop="true"
                                    @selected="setCurrent([b,r,e],element)"
                                    @customize="customize=!customize"
                                    @animation="animations=!animations"
                                    @delete="confirmModal=!confirmModal"
                                    @editinline="editContent=!editContent"/>

                                <!-- BLOCK ELEMENT IS A GRID/CONTAINER -->
                                
                                <div v-model="element.blocks" v-else :class="'mt-4 relative ' + responsive(element.css.css) + ' ' + element.css.container">
                                    
                                    <moka-element  
                                        :key="el.id"
                                        :element="el"
                                        v-for="(el,i) in element.blocks" 
                                        v-if="!el.hasOwnProperty('blocks')" 
                                        :coords="[b,r,i]"
                                        :develop="true"
                                        @selected="setCurrent([b,r,e,i],el)"
                                        @customize="customize=!customize"
                                        @animation="animations=!animations"
                                        @delete="confirmModal=!confirmModal"
                                        @editinline="editContent=!editContent"/>

                                    <div v-if="element.type!='flex'" v-model="element.blocks" subcontainer v-for="(subrow,s) in element.blocks" :class="'relative  ' + responsive(subrow.css)" :style="stile(subrow) + background(subrow)" :key="subrow.id">
                                        <draggable v-model="subrow.blocks">
                                            <moka-element 
                                                :key="subelement.id"
                                                :element="subelement" 
                                                v-if="subelement.type!='grid'" 
                                                v-for="(subelement,n) in subrow.blocks"
                                                :coords="[b,r,e,s,n]"
                                                :develop="true"
                                                @selected="setCurrent([b,r,e,s,n],subelement)"
                                                @customize="customize=!customize"
                                                @animation="animations=!animations"
                                                @delete="confirmModal=!confirmModal"
                                                @editinline="editContent=!editContent"/>
                                        </draggable>
                                        <!--
                                        <draggable v-if="subrow.hasOwnProperty('blocks')" v-model="element.blocks" v-for="(subelement,n) in subrow.blocks" :key="subelement.id">
                                            
                                            <moka-element 
                                                :element="subelement" 
                                                v-if="subelement.type!='grid'" 
                                                :coords="[b,r,e,s,n]"
                                                :develop="true"
                                                @selected="setCurrent([b,r,e,s,n],subelement)"
                                                @customize="customize=!customize"
                                                @animation="animations=!animations"
                                                @delete="confirmModal=!confirmModal"
                                                @editinline="editContent=!editContent"/>
                                            
                                        </draggable>
                                        -->
                                        <div :class="'absolute transform scale-y-110 scale-x-105 border border-red-500 border-dashed z-5 top-0 left-0 bottom-0 right-0 ' + active(subrow.id)" @click="setCurrent([b,r,e,s],subrow)">
                                            <i class="absolute top-0 right-0 material-icons nuxpresso-icon-circle text-sm text-black -mt-4">select_all</i>
                                        </div>
                                       
                                    </div>
                                     <div :class="'absolute transform scale-y-107 scale-x-106 border border-blue-600  border-dashed z-4 top-0 left-0 bottom-0 right-0 ' + active(element.id)" @click="setCurrent([b,r,e],element)">
                                        <i class="absolute top-0 right-0 transform scale-100 material-icons nuxpresso-icon-circle text-sm text-black -mt-4">view_columns</i>
                                    </div> 
                                </div>
                                
                            <!--</div>-->
                        </draggable>
                        <div :class="'absolute transform scale-y-104 scale-x-104 border border-red-500 border-dashed z-3 w-full border-2 top-0 left-0 bottom-0 right-0 ' + active(row.id)" @click="setCurrent([b,r],row)">
                            <i class="absolute top-0 right-0 material-icons nuxpresso-icon-circle text-sm text-black -mt-4">select_all</i>
                        </div>
                    </draggable>
                
                    <!-- SLIDER BLOCK -->
                    <moka-slider v-if="block.hasOwnProperty('slider')" :embeded="true" :doc="block"/>   
                    <div :class="'absolute transform scale-y-105 scale-x-105 border border-blue-600  border-dashed z-2 top-0 left-0 bottom-0 right-0 ' + active(block.id)" @click="setCurrent([b],block)">
                        <i class="absolute top-0 right-0 transform scale-100 material-icons nuxpresso-icon-circle text-sm text-black -mt-4">view_columns</i>
                    </div>  
            </div>  
        </draggable>
    </div>

    <!-- entity position array and info status bar -->
            <div editorstatus class="fixed bottom-0 left-0 p-1 border-t w-full flex flex-row items-center text-sm bg-white z-max uppercase divide-x divide-gray-400">
                        
                <div v-if="current && current.entity" class="pl-1">
                    <span v-if="current.entity.type">{{ current.entity.type }}</span>
                    <i class="material-icons text-sm mx-2" v-if="current.entity.icon">{{current.entity.icon}}</i>
                    <span v-else>CONTAINER <i class="material-icons text-sm mx-2">select_all</i></span> {{current.coords}}
                    <span class="mx-8">{{ current.entity.id }}</span>
                    <span>Mobile Breakpoint <span class="lowercase font-bold">{{ breakpoint }}</span></span>
                    CSS 
                    <input v-if="!current.entity.css.hasOwnProperty('css')" type="text" class="ml-2 w-64" v-model="current.entity.css"/>
                    <input v-else type="text" class="ml-2 w-64" v-model="current.entity.css.css"/>
                    
                </div>
                <div v-else>COMPONENT</div>
            </div>
    <!--
    <div :class="'absolute border-2 border-green-600  border-dashed z-1 top-0 left-0 bottom-0 right-0 ' + activeDoc(doc.id)" @click="setCurrent([],doc)">
        <i class="absolute z-top top-0 right-0 transform scale-100 material-icons nuxpresso-icon-circle text-sm text-black -mt-4">web</i>
    </div>
    --> 
    <div v-if="current && current.entity" class="fixed bottom-0 left-0 p-1">{{ current.entity.tag }} <i class="material-icons">{{ current.entity.icon }}</i></div>

    <transition name="slideright">
        <moka-right-toolbar 
            :current="current"
            :component="doc" 
            @tree="tree=!tree"
            @customize="customize=!customize"
            @animations="animations=!animations"
            @reusable="$emit('reusable',current)"
            @copy="$emit('copy',current)"
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
        <div v-if="customize" :class="'fixed w-1/5 bg-gray-800 z-top text-xs text-gray-500 shadow-lg min-h-screen top-0 ' + customizePos" ref="aContainer">
            <moka-customize
                class="overflow-u-auto"
                :id="customizerID"
                :element="current"
                :component="moka.component"
                @media="media=!media"
                @close="customize=!customize"
                @switch="customizeSwitch=!customizeSwitch"/>
        </div>
    </transition>

    <!-- EDIT CONTENT INLINE -->
    <transition name="fade">
        <div v-if="editContent && current && current.entity && current.entity.type != 'image' && current.entity.type != 'video'" draggable="true" class="nuxpresso-modal w-1/2 border shadow-lg text-sm z-top">
            <div class="bg-gray-700 text-white p-1">Edit</div>
            <div class="p-4">
                <i class="material-icons absolute top-0 right-0 mt-1 text-white mr-1 cursor-pointer" @click="editContent=!editContent">close</i>
                
                <!-- html element -->
                <textarea class="w-full text-base" v-if="current && current.entity.type === 'element' && current.entity.element != 'p'" v-model="current.entity.content"></textarea>
                
                <!-- rich text element -->
                <moka-text-editor v-if="current && current.entity.tag === 'element' && current.entity.element === 'p'"  v-model="current.entity.content" @close="editContent=!editContent"/>

                <moka-edit-icon v-if="current && current.entity.tag === 'icon'" v-model="current.entity.content"/>

                <moka-edit-menu v-if="current && current.entity.tag === 'menu'" :menu="current.entity" @menu="setMenuItems"/>
            </div>
        </div>
        <!-- image element -->
        <div v-if="editContent && current && current.entity && (current.entity.type === 'image'||current.entity.type==='video')" draggable="true" class="nuxpresso-modal h-4/5 w-10/12 border shadow-lg text-sm z-top">
            <moka-edit-media class="z-max" v-if="editContent && current && (current.entity.type === 'image'||current.entity.type==='video')" @newimage="setImage" :modal="true" @close="editContent=!editContent"/>
        </div>
    </transition>
    <transition name="fade">
        <div class="nuxpresso-modal bg-white border shadow p-4 z-max" v-if="confirmModal">
            <h5>Delete this object ?</h5>
            <button @click="confirm=false,confirmModal=!confirmModal">No</button>
            <button class="ml-2 danger" @click="confirm=true,confirmModal=!confirmModal,removeElement()">Yes, delete</button>
        </div>  
    </transition>
    <!-- ANIMATION -->
    <transition name="slideleft">
        <div v-if="animations && current && current.entity" class="fixed z-top w-1/5 text-sm left-0 bottom-0 p-2 bg-gray-800 text-gray-500 flex flex-col">
            <i class="material-icons absolute top-0 right-0 m-1" @click="animations=!animations">close</i>
            <label>Animation</label>
            <select class="dark" v-model="current.entity.gsap.animation" @change="animate(current.entity,current.entity.id)">
                <option value="">none</option>
                <option v-for="(ani,i) in gsapAnimations.gsapEffects" :value="ani.replace('-','')"><span class="capitalize">{{ ani.replace('-' , ' ')}}</span></option>
            </select>
            <label>Easing</label>
            <select class="dark" v-model="current.entity.gsap.ease">
                <option value="">none</option>
                <option v-for="(ease,i) in gsapAnimations.gsapEase" :value="ease"><span class="capitalize">{{ ease.replace('.out','')}}</span></option>
            </select>
            <label>Duration</label>
            <input class="dark" type="number" min=".1" max="100" step=".1" v-model="current.entity.gsap.duration"/>
            <label>Delay</label>
            <input class="dark" type="number" min="0" max="100" step=".1" v-model="current.entity.gsap.delay"/>
            <h1 ref="aniDemo" class="text-gray-300 m-auto p-10">DEMO</h1>
            <a href="#" @click="animate()">Run</a>
        </div>
    </transition> 
    <!-- MEDIA --->
    <transition name="fade">
        <div v-if="media" draggable="true" class="nuxpresso-modal h-4/5 w-10/12 border shadow-lg text-sm z-top rounded-lg">
            <moka-edit-media class="z-max" @newimage="setImage" :modal="true" @close="media=!media"/>
        </div>
    </transition>

    <!-- TREE -->
    <transition name="slideright">
        <div v-if="tree" class="fixed h-screen top-0 right-0 w-2/12 border-l shadow bg-white p-2 z-top overflow-y-auto">
            <div class="relative w-full">
                <moka-tree :doc="doc" @close="tree=!tree" @treeselect="treeselect"/>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
import MokaElement from '@/components/editor/moka.editor.element'
import MokaSlider from '@/components/editor/moka.preview.slider'
import MokaRightToolbar from '@/components/editor/moka.editor.right.toolbar'
import MokaTextEditor from '@/components/editor/moka.text.editor'
import MokaEditIcon from '@/components/editor/moka.customize.icon'
import MokaEditMenu from '@/components/editor/moka.menus'
import MokaEditMedia from '@/components/media/media'
import MokaCustomize from '@/components/editor/moka.editor.customize'
import MokaTree from '@/components/editor/moka.tree'

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
        confirm: false,
        confirmModal: false,
        printScreen: null,
        current: {
            coords: [],
            entity: null
        },
        toolbar: false, 
        customize: false,
        editContent: false,
        animations:false,
        media: false,
        breakpoint: 'md',
        tree: false
    }),
    components: { 
        MokaCustomize,
        MokaSlider ,
        MokaElement,
        MokaRightToolbar,
        MokaTextEditor,
        MokaEditIcon,
        MokaEditMenu,
        MokaEditMedia,
        MokaTree,
        draggable
    },
    props: [ 'doc' , 'component' ],
    
    computed: {
        ...mapState ( ['moka'] ),
        entity(){
            if ( this.current && this.current.entity ){
                return this.current.entity.tag
            }
        },
        gsapAnimations(){
            
            return gsapEffects
        }
    },
    watch: {
        component(c){
            return null
        },
        customizeSwitch(v){
            v ? this.customizePos = 'left-0' : this.customizePos = 'right-0'
        }
    },
    methods: {
        //setAnimation(){
        //    this.current.entity['animation'] = this.animation
        //},
        setImage(img){
            this.current.entity.image = img
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
        setCurrent ( coords , element ){
            this.customizerID = this.$randomID()
            //this.customize = false
            this.current.coords = coords
            this.current.entity = element
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
        treeselect(coords,element){
            this.setCurrent ( coords , element )
        },
        setMenuItems(items){
            this.current.entity.items = items
        },
        responsive(css){
            return this.$clean ( this.$cssResponsive ( css ) )
        },
        stile(block){
            return block.hasOwnProperty('style') ? block.style : ''
        },
        background(block){
            return block.hasOwnProperty('image') ?
                block.image ? 
                    ' background-image:url(' + block.image.url + ');' : '' : ''
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
                                        this.current.coords.length === 5 ? this.doc.blocks[coo[0]].blocks[coo[1]].blocks[coo[2]].blocks[coo[3]].blocks.splice(coo[4],1) : null : null
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
            let vm = this
            gsap.effects[this.current.entity.gsap.animation]( this.$refs['aniDemo'] ,{
                trigger: this.$refs['aniDemo'],
                duration: parseFloat(this.current.entity.gsap.duration) ,
                ease: this.current.entity.gsap.ease,
                delay: parseFloat(this.current.entity.gsap.delay)

            }) 
            /*
            ScrollTrigger.create({
                id: id,
                start: "top center",
                trigger: this.$refs[this.current.entity.id],
                toggleActions: "restart pause restart none",
                animation: ani
            });
            */
            
        }
    },
    mounted(){
        /*
        this.doc.blocks.forEach ( block => {
            if ( block.hasOwnProperty('animation') && block.animation ){
                this.animate(block, block.id)
            }
            block.blocks.forEach ( container => {
                if ( container.hasOwnProperty('animation') && container.animation ){
                    this.animate ( container , container.id )
                }
            })
        })
        */
    }

}
</script>
