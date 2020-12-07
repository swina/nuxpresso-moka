<template>
    <div class="p-2 flex flex-col" :data="dataload">
        <div class="grid grid-cols-3 grid-flow-row items-center" style="grid-template-columns:1fr 2fr 1fr;">
            <h3 class="">Mokas <span v-if="filter||$attrs.filter"><span class="capitalize">{{ filter||$attrs.filter }}s</span></span></h3> 
            <div class="flex justify-center">
                <button @click="create=!create" class="mr-2">Create New</button>
                <button @click="importJSON=!importJSON">Import</button>
            </div>
            <!--<div class="text-right">Filter by 
                <select v-model="filter">
                    <option value="">All</option>
                    <option value="component">component</option>
                    <option value="widget">widget</option>
                    <option value="template">template</option>
                    <option value="page">page</option>
                    <option value="slider">slider</option>
                    <option value="gallery">gallery</option> 
                </select>
            </div>-->
            <a href="#" @click="gallery=!gallery" class="text-right"><i class="material-icons" v-if="!gallery">grid_on</i><i class="material-icons" v-if="gallery">list</i></a> 
        </div>
        <moka-table v-if="!gallery" ctx="components" :components="objects" @component="setComponent" @message="message" @remove="remove"/>
        <moka-gallery v-else :components="objects" @component="setComponent" @preview="setPreview"  @remove="remove"/>
        <transition name="fade">
            <div class="nuxpresso-modal w-1/3 bg-gray-800 text-gray-500 p-4 flex flex-col text-sm" v-if="create">
                <i class="material-icons absolute top-0 right-0 cursor-pointer" @click="create=!create">close</i>
                <h4>New component</h4>
                <label>Name*</label>
                <input class="dark" type="text" v-model="newComponent.name"/>
                <label>Category</label>
                <select class="dark" v-model="newComponent.category">
                    <option value="component">component</option>
                    <option value="widget">widget</option>
                    <option value="template">template</option>
                    <option value="page">page</option>
                    <option value="slider">slider</option>
                    <option value="gallery">gallery</option> 
                </select>
                <label>Description</label>
                <textarea class="dark" v-model="newComponent.description"/>
                <button @click="saveNewComponent" class="my-2">Save</button>
            </div>
        </transition>
        <transition name="fade">
            <div class="absolute top-0 left-0 min-h-screen w-screen bg-white" v-if="preview">
                <moka-preview :category="component.category" :doc="doc" v-if="!doc.hasOwnProperty('slider')" @close="preview=!preview"/>
                <moka-slider v-if="doc.hasOwnProperty('slider')" :embeded="true" :doc="doc" @close="preview=!preview"/>
                <!--<i v-if="doc.hasOwnProperty('slider')" class="absolute top-0 right-0 m-1 z-top material-icons nuxpresso-icon-circle text-black" title="Close" @click="preview=!preview">close</i>-->
            </div>
        </transition>
        <transition name="fade">
            <div v-if="importJSON" class="nuxpresso-modal w-full md:w-1/3 bg-gray-800 rounded-xl shadow-xl p-2 text-gray-600 text-sm">
                <moka-upload @close="importJSON=!importJSON"/>
            </div>
        </transition>
    </div>
</template>

<script>
import MokaTable from '@/components/table'
import MokaGallery from '@/components/moka/moka.gallery'
import MokaPreview from '@/components/editor/preview/moka.preview'
import MokaSlider from '@/components/editor/preview/moka.preview.slider'
import MokaUpload from '@/components/moka/moka.import.json'
import { mapState } from 'vuex'
export default {
    name: 'MokaComponents',
    components: { MokaTable , MokaGallery , MokaPreview , MokaSlider, MokaUpload },
    data:()=>({
        create:false,
        importJSON:false,
        component: null,
        newComponent: {
            category:'component',
            name: 'New component',
            description: 'A new Moka component'
        },
        doc: null,
        preview: false,
        filter:'page',
        gallery: true,
        objects: null
    }),
    computed:{
        ...mapState ( ['moka'] ),
        dataload (){
            if ( this.moka.components ){
                this.$attrs.filter ?
                    this.$store.dispatch ( 'filter' , this.$attrs.filter ) :
                        this.filter = 'page'

                this.moka.filter ? this.filter = this.moka.filter : this.filter = 'page'
                this.objects = this.filter ? this.moka.components.filter(comp=>{ 
                    return comp.category === this.filter } ) : this.moka.components
            }    
            return true
        }
    },
    methods: {
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
            console.log ( 'new component' , component )    
            this.$http.post ( 'components' , component ).then ( result => {
                this.$store.dispatch('loadComponents')
                this.$emit('message','New component saved')
                console.log ( result )
                this.loading = false
            }).catch ( error => {
                this.$emit('message','An error occured. Check you console log.')
                console.log ( error )
                this.loading = false
            })
            return null
        },
        remove(id){
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
    }
}
</script>