<template>
    <div class="p-2 flex flex-col" :data="objects">
        <div class="grid grid-cols-3 grid-flow-row items-center" style="grid-template-columns:1fr .2fr .6fr .2fr;">
            <h3 class="">Mokas <span v-if="filter||$attrs.filter"><span class="capitalize">{{ filter||$attrs.filter }}s</span></span></h3> 
            <button @click="create=!create">Create New</button>
            <div class="text-right">Filter by 
                <select v-model="filter">
                    <option value="">All</option>
                    <option value="component">component</option>
                    <option value="widget">widget</option>
                    <option value="template">template</option>
                    <option value="page">page</option>
                    <option value="slider">slider</option>
                    <option value="gallery">gallery</option> 
                </select>
            </div>
            <a href="#" @click="gallery=!gallery" class="text-right"><i class="material-icons" v-if="!gallery">grid_on</i><i class="material-icons" v-if="gallery">list</i></a> 
        </div>
        <moka-table v-if="!gallery" ctx="components" :components="objects" @component="setComponent" @message="message"/>
        <moka-gallery v-else :components="objects" @component="setComponent" @preview="setPreview"/>
        <transition name="fade">
            <div class="nuxpresso-modal w-1/3 bg-white p-4 flex flex-col text-sm" v-if="create">
                <i class="material-icons absolute top-0 right-0 cursor-pointer" @click="create=!create">close</i>
                <h4>New component</h4>
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
                <button @click="saveNewComponent" class="my-2">Save</button>
            </div>
        </transition>
        <transition name="fade">
            <div class="absolute top-0 left-0 min-h-screen w-screen bg-white" v-if="preview">
                <moka-preview :doc="doc" v-if="!doc.hasOwnProperty('slider')" @close="preview=!preview"/>
                <moka-slider v-if="doc.hasOwnProperty('slider')" :embeded="true" :doc="doc" @close="preview=!preview"/>
                <!--<i v-if="doc.hasOwnProperty('slider')" class="absolute top-0 right-0 m-1 z-top material-icons nuxpresso-icon-circle text-black" title="Close" @click="preview=!preview">close</i>-->
            </div>
        </transition>
    </div>
</template>

<script>
import MokaTable from '@/components/table'
import MokaGallery from '@/components/moka/moka.gallery'
import MokaPreview from '@/components/editor/moka.preview'
import MokaSlider from '@/components/editor/moka.preview.slider'

import { mapState } from 'vuex'
export default {
    name: 'MokaComponents',
    components: { MokaTable , MokaGallery , MokaPreview , MokaSlider },
    data:()=>({
        create:false,
        newComponent: {
            category:'component',
            name: 'New component',
            description: 'A new Moka component'
        },
        doc: null,
        preview: false,
        filter:'page',
        gallery: true
    }),
    computed:{
        ...mapState ( ['moka'] ),
        objects (){
            if ( this.moka.components ){
                this.$attrs.filter ?
                    this.$store.dispatch ( 'filter' , this.$attrs.filter ) :
                        this.filter = 'page'

                this.moka.filter ? this.filter = this.moka.filter : this.filter = 'page'
                return this.filter ? this.moka.components.filter(comp=>{ 
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
        message(message){
            this.$emit('message',message)
        }
    }
}
</script>