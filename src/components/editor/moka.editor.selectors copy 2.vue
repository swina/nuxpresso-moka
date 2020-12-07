<template>
<!-- MAIN CONTAINER -->
<div class="w-full h-auto p-10 top-0 left-0 relative">
    <div class="absolute top-0 left-0 w-full flex flex-row -mt-4" @click="setCurrent(null,doc)">
        <i class="material-icons ml-2" @click="setCurrent(null,doc)">web</i>
    </div>

    <div v-if="$attrs.category!='element'">
        <div :class="doc.css + ' p-1 border-2 border-transparent '" :style="stile(doc,true) + ' ' + background(doc)" id="content">
            <!-- 1st level - BLOCKS LOOP -->
            
            <draggable v-model="doc.blocks">
                <div block v-model="block.blocks" v-for="(block,b) in doc.blocks" :class="'relative ' + responsive(block.css.css) + ' ' + block.css.container" :style="stile(block) + background(block)" :key="block.id" :ref="block.id">
                        
                        <!-- 2nd level - BLOCKS LOOP --->
                        <div v-model="block.blocks" v-for="(row,r) in block.blocks" :class="'relative z-3 flex h-full ' + responsive(row.css) " :style="stile(row) + background(row)" :key="row.id" :ref="row.id">
                            <!-- BLOCKS ELEMENTS LOOP -->
                            
                                    <draggable v-for="(element,e) in row.blocks" v-model="row.blocks">
                                           
                                        <moka-element  
                                            :key="element.id"
                                            data-trigger="scroller"
                                            :element="element"
                                            v-if="element.type!='grid' && element.type != 'flex' && !row.hasOwnProperty('slider')" 
                                            :coords="[b,r,e]"
                                            :develop="true"
                                            @selected="setCurrent([b,r,e],element)"
                                            @customize="customize=!customize"
                                            @animation="animations=!animations"
                                            @delete="confirmModal=!confirmModal"
                                            @editinline="editContent=!editContent"/>
                                        

                                        <!--<div  v-for="(element,e) in row.blocks" :key="element.id" flexelement v-if="element.type==='flex'"  :class="'mt-4 relative text-white ' + responsive(element.css.css) + ' ' + element.css.container" :style="background(element)">-->
                                        
                                        
                                            <moka-flex :key="element.id"  :doc="doc" :blocks="element" :coords="[b,r,e]" v-if="element.type==='flex'" @selected="setCurrentSub" @swap="swap"
                                            @customize="customize=!customize"
                                            @delete="confirmModal=!confirmModal" @editinline="editContent=!editContent"/>
                                            
                                            <!--
                                            <span v-if="element.blocks.length === 0 && element.type!='grid'" @click="setCurrent([b,r,e],element),$emit('reusable',current)" class="z-top">Add an element</span>
                                            
                                            <moka-element  
                                                :key="el.id"
                                                :element="el"
                                                v-for="(el,i) in element.blocks" 
                                                v-if="!el.hasOwnProperty('blocks') && el.type!='grid'" 
                                                :coords="[b,r,i]"
                                                :develop="true"
                                                @selected="setCurrent([b,r,e,i],el)"
                                                @customize="customize=!customize"
                                                @animation="animations=!animations"
                                                @delete="confirmModal=!confirmModal"
                                                @editinline="editContent=!editContent"/>
                                            <div :class="'absolute transform scale-y-102 scale-x-102 border border-orange-600 w-full top-0 left-0 bottom-0 right-0 border-dashed z-4 ' + active(element.id)" style="min-height:1.4rem;" @click="setCurrent([b,r,e],element)">
                                                <div class="bg-gray-800 rounded-xl absolute top-0 right-0 -mt-4">
                                                    <i class="material-icons nuxpresso-icon-circle text-sm z-top" @click="swap([b,r,e],false)">expand_less</i>
                                                    <i class="material-icons nuxpresso-icon-circle text-sm z-top" @click="swap([b,r,e],true)">expand_more</i>
                                                    <i class="material-icons nuxpresso-icon-circle text-sm z-top">highlight_alt</i>
                                                </div>
                                            </div> 
                                            -->
                                        <!--</div>-->
                                        <!--/.FLEX ELEMENT -->

                                        <!-- GRID ELEMENT -->
                                        <!--
                                        <div v-for="(element,e) in row.blocks" v-if="element.type==='grid'" :class="'relative  ' + responsive(element.css.container) + ' ' + responsive(element.css.css)" :style="stile(element) + background(element)" :key="element.id">
                                        <div v-for="(element,e) in row.blocks" v-if="element.type==='grid'" :key="element.id">        
                                        -->

                                            <moka-grid :key="element.id" v-if="element.type==='grid'" :blocks="element" :coords="[b,r,e]" @selected="setCurrentSub"/>

                                            <!--    
                                            <div v-for="(subrow,s) in element.blocks" :class="subrow.css + ' relative p-2 '">
                                                <div>
                                                    <moka-element 
                                                        :key="subelement.id"
                                                        :element="subelement"
                                                        v-if="subelement"
                                                        v-for="(subelement,n) in subrow.blocks"
                                                        :coords="[b,r,e,s,n]"
                                                        :develop="true"
                                                        @selected="setCurrent([b,r,e,s,n],subelement)"
                                                        @customize="customize=!customize"
                                                        @animation="animations=!animations"
                                                        @delete="confirmModal=!confirmModal"
                                                        @editinline="editContent=!editContent"/>
                                                    <div :class="'absolute transform scale-y-108 scale-x-103 border border-red-500 border-dashed z-5 top-0 left-0 bottom-0 right-0 ' + active(subrow.id) + ' border-2'" @click="setCurrent([b,r,e,s],subrow)">
                                                        <i class="absolute top-0 right-0 material-icons  nuxpresso-icon-circle text-sm -mt-4">select_all</i>
                                                    </div> 

                                                </div>
                                                
                                                
                                            </div>
                                                
                                            <div :class="'absolute transform scale-y-110 scale-x-105 border-blue-500 border-2 border-dashed z-4 top-0 left-0 bottom-0 right-0 ' + active(element.id)" @click="setCurrent([b,r,e],element)">
                                                <i class="absolute top-0 right-0 material-icons nuxpresso-icon-circle text-sm -mt-4">view_columns</i>
                                            </div>
                                            -->
                                        <!--</div>-->
                                        <!-- /. GRID ELEMENT -->
                                    </draggable>    
                            <div :class="'absolute transform scale-y-104 scale-x-104 border border-red-500 border-dashed z-3 w-full top-0 left-0 bottom-0 right-0 ' + active(row.id)" @click="setCurrent([b,r],row)">
                                <i class="absolute top-0 right-0 material-icons nuxpresso-icon-circle text-sm -mt-4 z-top" @click="switchFlex(row.css)">select_all</i>
                            </div>
                        </div>
                    
                        <!-- SLIDER BLOCK -->
                        <moka-slider v-if="block.hasOwnProperty('slider')" :develop="true" :embeded="true" :doc="block" :editor="true"/>   
                        
                        <div :class="'absolute transform scale-y-110 py-1 scale-x-107 border-2 border-blue-600  border-dashed z-2 top-0 left-0 bottom-0 right-0 ' + active(block.id)" @click="setCurrent([b],block)">
                            <i class="absolute top-0 right-0 transform scale-100 material-icons nuxpresso-icon-circle text-sm -mt-4">view_column</i>
                        </div>  
                </div>  
            </draggable>
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
            @selected="setCurrent([e],element)"
            @customize="customize=!customize"
            @animation="animations=!animations"
            @delete="confirmModal=!confirmModal"
            @editinline="editContent=!editContent"/>
    </div>

    <!-- STATUS BAR -->
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
    

    <div v-if="current && current.entity" class="fixed bottom-0 left-0 p-1">{{ current.entity.tag }} <i class="material-icons">{{ current.entity.icon }}</i></div>

    <!-- RIGHT VERTICAL TOOLBAR -->
    <transition name="slideright">
        <moka-right-toolbar 
            :current="current"
            :component="doc" 
            @tree="tree=!tree"
            @customize="customize=!customize"
            @animations="animations=!animations"
            @reusable="$emit('reusable',current)"
            @copy="$emit('copy',current),$store.dispatch('message','Element copied')"
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
                :position="customizeSwitch"
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
        <div v-if="editContent && current && current.entity && current.entity.type != 'image' && current.entity.type != 'video' && current.entity.tag != 'menu'" draggable="true" class="nuxpresso-modal w-1/2 border shadow-lg text-sm z-top">
            <div class="bg-gray-700 text-white p-1">Edit</div>
            <div class="p-4">
                
                <i class="material-icons absolute top-0 right-0 mt-1 text-white mr-1 cursor-pointer" @click="editContent=!editContent">close</i>
                
                <!-- html element -->
                <textarea class="w-full text-base" v-if="current && ( current.entity.type === 'element' || current.entity.element === 'button' ) && current.entity.element != 'p'" v-model="current.entity.content"></textarea>
                
                <!-- rich text element -->
                <moka-text-editor v-if="current && current.entity.tag === 'element' && current.entity.element === 'p'"  v-model="current.entity.content" @close="editContent=!editContent"/>

                <moka-edit-icon v-if="current && current.entity.tag === 'icon'" v-model="current.entity.content"/>

                
            </div>
            
        </div>
        <div class="fixed left-0 top-0 w-1/5 z-top min-h-screen bg-gray-800" v-if="editContent && current && current.entity &&current.entity.tag === 'menu'">
                <i class="material-icons absolute top-0 right-0 mt-1 text-white mr-1 cursor-pointer" @click="editContent=!editContent">close</i>
                <moka-edit-menu v-if="current && current.entity.tag === 'menu'" :menu="current.entity" @menu="setMenuItems"/>
            
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
            <moka-animation :key="current.entity.id" v-model="current" :element="current" @close="animations=!animations"/>
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
import MokaFlex from '@/components/editor/moka.editor.flex'
import MokaGrid from '@/components/editor/moka.editor.grid'
import MokaElement from '@/components/editor/moka.editor.element'
import MokaSlider from '@/components/editor/moka.preview.slider'
import MokaRightToolbar from '@/components/editor/moka.editor.right.toolbar'
import MokaTextEditor from '@/components/editor/moka.text.editor'
import MokaEditIcon from '@/components/editor/moka.customize.icon'
import MokaEditMenu from '@/components/editor/moka.menus'
import MokaEditMedia from '@/components/media/media'
import MokaCustomize from '@/components/editor/moka.editor.customize'
import MokaTree from '@/components/editor/moka.tree'
import MokaAnimation from '@/components/editor/moka.animation'
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
        MokaFlex,
        MokaGrid,
        MokaCustomize,
        MokaSlider ,
        MokaElement,
        MokaRightToolbar,
        MokaTextEditor,
        MokaEditIcon,
        MokaEditMenu,
        MokaEditMedia,
        MokaAnimation,
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
        swap ( flag ){
            let coord = this.current.coords
            console.log ( 'i am swapping' , this.current.coords )
            if ( !flag ){
                if ( coord[2] > 0) {
                    console.log ( 'swapping up')
                    this.arraySwap ( 
                        this.doc.blocks[coord[0]].blocks[coord[1]].blocks,
                        coord[2],
                        coord[2]-1
                    )
                }
            } else {
                if ( coord[2] < this.doc.blocks[coord[0]].blocks[coord[1]].blocks.length-1){
                    this.arraySwap (
                        this.doc.blocks[coord[0]].blocks[coord[1]].blocks,
                        coord[2],
                        coord[2]+1
                    )
                }
            }
        },
        /*
        swap ( coord , down ){
            console.log ( coord , down  )
            if ( !down ){
                if ( coord[2] > 0) {
                    this.arraySwap ( 
                        this.doc.blocks[coord[0]].blocks[coord[1]].blocks,
                        coord[2],
                        coord[2]-1
                    )
                }
            } else {
                if ( coord[2] < this.doc.blocks[coord[0]].blocks[coord[1]].blocks.length-1){
                    this.arraySwap (
                        this.doc.blocks[coord[0]].blocks[coord[1]].blocks,
                        coord[2],
                        coord[2]+1
                    )
                }
            }
        },
        */
        arraySwap ( arr , from , to ){
            return arr.splice(from, 1, arr.splice(to, 1, arr[from])[0]);
        },
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
        setCurrentSub(coords,element){
            this.setCurrent ( coords ,element)
        },
        treeselect(coords,element){
            this.setCurrent ( coords , element )
        },
        setMenuItems(items){
            this.current.entity.items = items
        },
        responsive(css){
            return css// this.$clean ( this.$cssResponsive ( css ) )
        },
        stile(block,doc){
            let stile = ''
            if ( block.hasOwnProperty('fontFamily')){
                stile += 'font-family:\"' + block.fontFamily + '\"; '
            }
            return block.hasOwnProperty('style') ? block.style + stile : stile
        },
        background(block){
            return block.hasOwnProperty('image') ?
                block.image && block.image.url ? 
                    block.image.previewUrl ? 
                        ' background-image:url(' + block.image.previewUrl + ');background-size:cover;background-repeat:no-repeat;' :
                            ' background-image:url(' + block.image.url + ');' : ''  : ''        
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
                                        coo.length === 4 ?
                                            this.doc.blocks[this.current.coords[0]].blocks[this.current.coords[1]].blocks[coo[2]].blocks.splice(coo[3],1) : 
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
        window.addEventListener("keydown", e => {
            if ( e.altKey && e.code === 'KeyB' ){
                !this.doc.hasOwnProperty('slider') ?
                    vm.$emit('preview') :
                        vm.$emit('slider')
            }
            if ( e.altKey && e.code === 'KeyM' ){
                if ( this.current && this.current.coords ){
                    this.customize =! this.customize
                }
            }
            if ( e.altKey && e.code === 'KeyA' ){
                if ( this.current && this.current.coords ){
                    this.animations =! this.animations
                }
            }
            if ( e.altKey && e.code === 'KeyC' ){
                if ( this.current && this.current.coords ){
                    this.$store.dispatch('message','Element copied')
                    this.$emit('copy',this.current)
                }
            }
            if ( e.altKey && e.code === 'KeyV' ){
                if ( this.current && this.current.coords ){
                    this.$emit('paste')
                }
            }
            if ( e.altKey && e.code === 'KeyD' ){
                if ( this.current && this.current.coords ){
                    this.$emit('duplicate',this.current)
                }
            }
            if ( e.altKey && e.code === 'KeyR' ){
                if ( this.current && this.current.coords ){
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
