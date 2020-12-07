<template>
    <div class="w-screen relative">
        <div class="w-full" v-if="!preview">
            <moka-editor v-if="component" 
                :component="component" 
                :blocks="component.json" 
                @save="save"  
                @savecopy="saveAsNew=!saveAsNew" 
                @preview="preview=!preview" 
                @saveasreusable="saveAsReusable"/>
        </div>

        
        <transition name="fade">
        <div v-if="saveAsNew" class="nuxpresso-modal rounded w-full md:w-1/4 p-4 flex flex-col bg-white z-50">
            <i class="material-icons absolute top-0 right-0 cursor-pointer" @click="saveAsNew=!saveAsNew">close</i>
            <h4>Duplicate</h4>
            <label>Name*</label>
            <input type="text" v-model="newComponent.name"/>
            <label>Category</label>
            <select v-model="newComponent.category">
                <option value="element">element</option>
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
            <div v-if="preview" class="fixed top-0 left-0 h-screen m-auto w-screen z-max bg-white border shadow overflow-x-hidden overflow-y-auto">
                <moka-preview v-if="component" :category="component.category" :blocks="component.json.blocks" @close="preview=!preview" @save="savePrint"/>
            </div>
        </transition>
        <div class="fixed top-0 bg-black bg-opacity-50 left-0 z-max h-screen w-screen flex flex-col justify-center items-center" v-if="loading">
            <div class="flex  lds-ring" v-if="loading || moka.loading"><div></div><div></div><div></div><div></div></div>
        </div>
    </div>
</template>

<script>
//import MokaEditor from '@/components/editor/moka.editor'
import MokaEditor from '@/components/editor/render/moka.editor.main'
import MokaPreview from '@/components/editor/moka.preview'
import { mapState } from 'vuex'
export default {
    components: { MokaEditor, MokaPreview  },
    data:()=>({
        loading: false,
        component: null,
        preview: false,
        highlight: false,
        message: '',
        saveAsNew: false,
        newComponent: {
            name: 'A new component',
            description: 'A new component created with Moka',
            category: 'component'
        },
    }),
    computed: {
        ...mapState ( ['moka'] )
    },
    mounted(){
        this.component = this.$store.getters.component
        this.$http.get('upload/files').then ( response => {
            this.$store.dispatch ( 'loadMedia' , response.data )
        })
    },
    methods: {
        save(){
            this.loading = true
            this.$http.put ( 'components/' + this.component.id , this.component ).then ( result => {
                this.$store.dispatch('loadComponents')
                this.$emit('message','Component saved')
                this.loading = false
            }).catch ( error => {
                this.$emit('message','An error occured. Check you console log.')
                console.log ( error )
                this.loading = false
            })
        },
        saveAsReusable(component){
            this.loading = true
            this.$http.post ( 'components' , component ).then ( result => {
                this.$store.dispatch('loadComponents')
                this.$emit('message','New reusable component saved')
                this.loading = false
            }).catch ( error => {
                this.$emit('message','An error occured. Check you console log.')
                console.log ( error )
                this.loading = false
            })
            return null
        },
        savePrint(screenshot){
            this.component.image_uri = screenshot
            this.save()
        },
        saveNewComponent(){
            this.loading = true
            let newComponent = Object.assign({},this.component)
            newComponent.name = this.newComponent.name
            newComponent.description = this.newComponent.description
            newComponent.category = this.newComponent.category
            this.$http.post ( 'components' , newComponent ).then ( response => {
                this.message = 'Component created'
                this.$store.dispatch ( 'loadComponents' )
                this.loading = false
            }).catch ( error => {
                this.message = 'An error occured.'
                console.log ( error )
                this.loading = false
            })
            return null
        },
        

    }
}
</script>