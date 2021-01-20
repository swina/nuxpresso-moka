<template>
    <div class="p-2 flex flex-col" :data="dataload">
        <div class="grid grid-cols-3 grid-flow-row items-center" style="grid-template-columns:1fr 2fr 1fr;">
            <h3 class="">Blocks <span v-if="filter||$attrs.filter"><span class="capitalize">{{ $attrs.filter || filter }}s</span></span></h3> 
            <div class="flex justify-center">
                <button @click="create=!create" class="mr-2">Create New</button>
                <button @click="importJSON=!importJSON" class="mr-2">Import</button>
                <button @click="exportComponent=!exportComponent" class="mr-2">Export Category</button>
                <button v-if="moka.library.length" @click="exportLibrary=!exportLibrary">Export Selected [{{moka.library.length}}]</button>
            </div> 
            <div class="flex flex-row justify-end">
                <i class="material-icons" @click="refresh">refresh</i>
                <i class="material-icons" v-if="!gallery" @click="gallery=!gallery">grid_on</i>
                <i class="material-icons" v-if="gallery" @click="gallery=!gallery">list</i>
            </div>
        </div>
        <div v-if="moka.elements" class="py-2 flex flex-row flex-wrap">
            <button class="mr-2 mt-1 capitalize w-24 border hover:bg-blue-400 hover:text-white border-blue-400 focus:bg-gray-600 focus:text-white focus:outline-none bg-white text-blue-400 rounded-none" @click="type='',types=false">all</button>
            <button v-if="$attrs.filter!='slider'" class="mr-2 mt-1 capitalize w-24 border hover:bg-blue-400 hover:text-white border-blue-400 focus:bg-gray-600 focus:text-white focus:outline-none bg-white text-blue-400 rounded-none" @click="types=!types,type=''"><i class="material-icons">filter_alt</i></button>
            <transition name="fade">
                <div v-if="types && $attrs.filter!='slider'">
                    <template v-for="tipo in moka.elements.types.types">
                        <button class="mr-2 mt-1 capitalize w-24 border hover:bg-blue-400 hover:text-white border-blue-400 bg-white text-blue-400 focus:bg-gray-600 focus:text-white focus:outline-none rounded-none" @click="type=tipo">{{ tipo }}</button>
                    </template>
                </div>
            </transition>
        </div>
        <!--
        <moka-table v-if="!gallery" ctx="components"  @component="setComponent" @message="message" @remove="remove"/>
        -->
        <moka-gallery 
            :gallery="gallery"
            :filter="$attrs.filter||filter" 
            :type="type"
            @component="setComponent" 
            @preview="setPreview"  
            @remove="remove" 
            @duplicate="duplicate"/>

        <transition name="fade">
            <div class="nuxpresso-modal w-1/3 bg-gray-800 text-gray-500 p-4 flex flex-col text-sm" v-if="create">
                <i class="material-icons absolute top-0 right-0 cursor-pointer" @click="create=!create">close</i>
                <h4>New component</h4>
                <label>Name*</label>
                <input class="w-full dark" type="text" v-model="newComponent.name"/>
                <label>Category</label>
                <select class="w-full dark" v-model="newComponent.category">
                    <option value="component">component</option>
                    <option value="widget">widget</option>
                    <option value="template">template</option>
                    <option value="page">page</option>
                    <option value="slider">slider</option>
                    <option value="gallery">gallery</option> 
                </select>
                <label>Description</label>
                <textarea class="w-full dark" v-model="newComponent.description"/>
                <button @click="saveNewComponent" class="my-2">Save</button>
            </div>
        </transition>
        <transition name="fade">
            <div class="absolute top-0 left-0 min-h-screen w-screen bg-white" v-if="preview">
                
                <moka-preview :category="component.category" :doc="doc" v-if="!doc.hasOwnProperty('slider')" @close="preview=!preview" :dashboard="true"/>

                <moka-slider v-if="doc.hasOwnProperty('slider')" :embeded="true" :doc="doc" @close="preview=!preview"/>
                <!--<i v-if="doc.hasOwnProperty('slider')" class="absolute top-0 right-0 m-1 z-top material-icons nuxpresso-icon-circle text-black" title="Close" @click="preview=!preview">close</i>-->
            </div>
        </transition>
        <transition name="fade">
            <div v-if="importJSON" class="nuxpresso-modal w-full md:w-1/3 bg-gray-800 rounded border-4 border-gray-500  shadow-xl p-2 text-gray-600 text-sm">
                <moka-upload @close="importJSON=!importJSON"/>
            </div>
        </transition>
        
        <!-- EXPORT COMPONENT -->
        <transition name="fade">
            <div v-if="exportComponent" class="nuxpresso-modal w-full  border-4 border-gray-500 md:w-1/3 bg-gray-800 rounded shadow-xl p-2 text-gray-600 text-sm z-2xtop">
                <i class="material-icons absolute top-0 right-0 m-1 cursor-pointer" @click="exportComponent=!exportComponent">close</i>
                <h4>Export Category</h4>
                <div>
                    <label>Save as</label><br/>
                    <input class="dark" type="text" v-model="filename"/>.json
                </div>
                <vue-blob-json-csv
                    file-type="json"
                    :file-name="filename"
                    :data="blocks_dump"
                    
                >
                <button class="my-2 success" @click="exportComponent=!exportComponent">Download Library</button>
                Blocks: {{ blocks_dump.length }}
                </vue-blob-json-csv>
            </div>
        </transition>
        <!-- EXPORT COMPONENT -->
        <transition name="fade">
            <div v-if="exportLibrary && moka.library.length" class="nuxpresso-modal w-full  border-4 border-gray-500 md:w-1/3 bg-gray-800 rounded shadow-xl p-2 text-gray-600 text-sm z-2xtop">
                <i class="material-icons absolute top-0 right-0 m-1 cursor-pointer" @click="exportLibrary=!exportLibrary">close</i>
                <h4>Export Selected</h4>
                <div class="w-full flex flex-row">
                    <select size="10" class="w-3/4 h-32" v-model="libraryComponent">
                        <option v-for="(block,index) in moka.library" :value="index">{{ block.category }} - {{ block.name }}</option>
                    </select>
                    <div class="text-center w-1/4">
                        <button @click="moka.library.splice(libraryComponent,1)">Remove</button>
                    </div>
                </div>
                <div>
                    <label>Save as</label><br/>
                    <input class="dark" type="text" v-model="filename"/>.json
                </div>
                <vue-blob-json-csv
                    file-type="json"
                    :file-name="filename"
                    :data="moka.library"
                >
                <button class="my-2 success" @click="exportComponent=!exportComponent">Download Library</button>
                Blocks: {{ moka.library.length }}
                </vue-blob-json-csv>
            </div>
        </transition>
    </div>
</template>

<script>
import MokaTable from '@/components/table'
import MokaGallery from '@/components/moka/moka.gallery'
import MokaPreview from '@/components/editor/preview/moka.preview'
import MokaSlider from '@/components/editor/preview/moka.slider'
import MokaUpload from '@/components/moka/moka.import.json'
import blocksExport from '@/apollo/components.export.gql'
import { mapState } from 'vuex'
export default {
    name: 'MokaComponents',
    components: { MokaTable , MokaGallery , MokaPreview , MokaSlider, MokaUpload },
    data:()=>({
        create:false,
        importJSON:false,
        component: null,
        exportComponent: false,
        exportLibrary: false,
        newComponent: {
            category:'component',
            name: 'New component',
            description: 'A new Moka component'
        },
        allObjects: null,
        doc: null,
        preview: false,
        filter:'widget',
        gallery: true,
        objects: null,
        types: false,
        type: '',
        filename: '',
        libraryComponent: null
    }),
    /*watch:{
        type(v){
            if ( v ){
                this.objects = this.filter ? this.moka.components.filter(comp=>{ 
                    return comp.category === this.filter } ) : this.moka.components
                this.objects = this.objects.filter ( obj => { return obj.tags === v } )
            } else {
                this.objects = this.allObjects
                this.objects = this.filter ? this.moka.components.filter(comp=>{ 
                    return comp.category === this.filter } ) : this.moka.components
            }
        }
    },*/
    mounted(){
        this.user.dashboard_filter && this.user.dashboard === 'MokaList' ? 
                this.filter = this.user.dashboard_filter : 
                    this.$store.dispatch ( 'dashboard_filter' , this.filter )
    },
    computed:{
        ...mapState ( ['moka','user'] ),
        exportJSON(){
            let json = {
                objects : []
            }
            this.objects.forEach ( obj => {
                json.objects.push ( obj )
            })
            //this.$store.dispatch('loading')
            return json.objects
        },
        
        dataload (){
            
            
            if ( this.moka.components ){
                this.$attrs.filter ?
                    this.$store.dispatch ( 'filter' , this.$attrs.filter ) :
                        this.filter = 'widget'

                this.moka.filter ? this.filter = this.moka.filter : this.filter = 'widget'
                
                this.objects = this.filter ? this.moka.components.filter(comp=>{ 
                    return comp.category === this.filter } ) : this.moka.components
            }    
            this.filename = this.$attrs.filter
            return true
        }
    },
    methods: {
        refresh(){
            //this.$store.dispatch('loading',true)
            this.$store.dispatch ( 'loadComponents' ).then ( () => {
                this.$store.dispatch ( 'loading' , false )
            })
        },
        setComponent(component){
            this.$store.dispatch ( 'loadComponent' , component )
            this.$store.dispatch ( 'loadMedia' )
            this.$router.push ( '/moka' )
            //this.$router.push('/editor')
        },
        setPreview ( component ){
            this.doc = component.json
            this.component = component
            this.preview =! this.preview
        },
        saveAsReusable(component){
            this.loading = true
            
        },
        duplicate(comp){
            let component = Object.assign ( {} , comp )
            component.id = this.$randomID()
            component.blocks_id = null
            component.name = comp.name + ' COPY'
            this.$http.post ( 'components' , component ).then ( result => {
                this.$store.dispatch('loadComponents')
                this.$store.dispatch('message','Component copied')
                this.loading = false
            }).catch ( error => {
                this.$store.dispatch('message','An error occured. Check you console log.')
                console.log ( error )
                this.loading = false
            })
        },
        saveNewComponent(){
            this.create = false
            let component = {
                name: this.newComponent.name,
                description: this.newComponent.description,
                category: this.newComponent.category,
                enabled: true,
                json: {
                    id: null,
                    css: '',
                    image: null,
                    tag: 'document',
                    blocks: [
                        this.$grid(1)
                    ]
                }
            }
            
            this.newComponent.category === 'slider' ?
                component.json['slider'] = {
                    "animation" : "",
                    "delay" : 0,
                    "navigation": {
                    "enable" : false,
                    "icons" : ["chevron_left","chevron_right"],
                    "css" : ""
                    },
                    "dots": {
                    "enable" : false,
                    "css":""
                    }
                } : null
            this.$http.post ( 'components' , component ).then ( result => {
                this.$store.dispatch('loadComponents')
                this.$store.dispatch('message','New component saved')
                console.log ( result )
                this.loading = false
            }).catch ( error => {
                this.$store.dispatch('message','An error occured. Check you console log.')
                console.log ( error )
                this.loading = false
            })
            return null
        },
        remove(id,index){
            this.loading = true
            this.$http.delete ( 'components/' + id ).then ( response => {
                this.$store.dispatch ( 'loadComponents' )
                this.$store.dispatch('message','Component has been deleted')
                this.loading = false
            }).catch ( error => {
                this.loading = false
                this.$store.dispatch('message','An error occured')
            })
        },
        message(message){
            this.$emit('message',message)
        }
    },
    apollo:{
        blocks_dump : {
            query: blocksExport,
            variables(){
                return {
                    category : this.filter
                }
            },
            update: data => data.components
        }
    }
}
</script>