<template>
<div :class="$attrs.filter?'':'nuxpresso-modal z-2xtop h-screen w-screen bg-black bg-opacity-75'">
    
    <div class="p-4 relative h-full bg-white" :class="$attrs.filter?'':'mt-8'" v-if="files">
        <i v-if="$attrs.filter" class="material-icons absolute right-0 top-0 m-1" @click="$emit('close')">close</i>
        <div class="grid grid-cols-4 grid-flow-row items-center">
            <h3 class="">Media <span class="text-xs">[{{total}} files]</span></h3> 
            <div class="col-span-2">
                <button @click="uploadFile=!uploadFile">Upload</button>
                <label class="ml-2">Import from URL</label>
                <input type="text" class="w-3/5" v-model="imageURL"/>
            </div>
            
            <div class="text-right text-sm">
                Search <input type="text" v-model="search" placeholder="search" class="mr-2"/>
                <i class="material-icons cursor-pointer text-xl" title="Refresh" @click="refresh()">cached</i>
            </div>
            <!--<a href="#" @click="gallery=!gallery" class="text-right"><i class="material-icons" v-if="!gallery">grid_on</i><i class="material-icons" v-if="gallery">list</i></a>-->
        </div>
        <!--<div class="bg-gray-200 h-full border-1 rounded-lg shadow p-8 relative overflow-y-auto">-->
        <i v-if="$attrs.modal" class="material-icons absolute top-0 right-0" @click="$emit('close')">highlight_off</i>
        <div class="flex flex-wrap border rounded p-4 h-3/4 overflow-y-auto">
            <template v-for="(file,n) in files">
                <div class="md:w-1/4 lg:w-2/12 px-2 bg-white text-xs cursor-pointer mb-2"  @click="setImage(file),selected=file" :title="file.name" >
                    <div :class="'mb-1 overflow-hidden border-4 border-transparent ' + active(file)">
                        <div class="relative pt-32 bg-gray-700 ">
                            <div class="flex items-center text-center h-full justify-center absolute h-48 top-0 left-0 right-0 bottom-0">
                                
                                <img v-if="file.mime.includes('image')" :src="$imageURL(file)" class="w-auto h-auto block m-auto"/>

                                <i v-if="!file.mime.includes('image')" class="material-icons text-gray-400 text-5xl">insert_drive_file</i>

                                <!--
                                <img v-if="file.previewUrl" class="w-auto h-auto block m-auto" :src="file.previewUrl"/>
                                
                                <img v-if="file.url.inclides('http') && file.url && file.mime.indexOf('image') > -1" class="w-auto h-auto block m-auto" :src="file.formats && file.formats.thumbnail?file.formats.thumbnail.url:file.url"/>


                                <i v-if="file.mime.indexOf('image') < 0" class="material-icons text-gray-400 text-5xl">insert_drive_file</i>-->
                            </div>
                        </div>
                    </div>
                    {{file.name.split('.')[0].substring(0,30)}}
                    <br/>
                    {{file.width}}x{{file.height}} - {{file.size}}KB <span class="px-1 bg-gray-300 text-black rounded uppercase">{{file.ext.replace('.','')}}</span>
                </div>
            </template>
        </div>
        <div class="w-full text-center my-4 grid grid-cols-3 grid-cols-auto">
            <div class="text-left">
                <span class="text-sm" v-if="selected">{{ selected.name }} 
                    <button @click="$store.dispatch('setAction','deleteMedia')">Delete</button>
                    <button class="ml-2" @click="edit=!edit">Edit</button>
                </span>
            </div>
            <div>
                
                <i @click="prev" v-if="start > 0" class="material-icons mr-2 text-3xl cursor-pointer">chevron_left</i>
                <i v-if="start < 1" class="material-icons mr-2 text-3xl text-gray-300">chevron_left</i>
                <i @click="next" class="material-icons text-3xl cursor-pointer">chevron_right</i>
                
            </div> 
            <!--<div><button @click="uploadFile=!uploadFile">Upload</button></div>-->
        </div>
        <!--</div>-->
        <transition name="fade">
            <div class="nuxpresso-modal w-2/3 shadow border rounded p-4" v-if="uploadFile">
                <moka-upload @uploaded="refresh(),uploadFile=!uploadFile" @close="uploadFile=!uploadFile"/>
            </div>
        </transition>
         <transition name="fade">
            <div class="nuxpresso-modal z-2xtop w-2/3  h-2/3 shadow-xl border rounded p-2" v-if="edit">
                <moka-edit-media :img="selected" @close="edit=!edit" @delete="$store.dispatch('setAction','deleteMedia')"/>
            </div>
        </transition>
        <transition name="fade">
            <div v-if="selectThumbnail" class="nuxpresso-modal w-3/4 p-2 z-2xtop max-h-screen">
                <i class="material-icons absolute right-0 top-0 m-1" @click="selectThumbnail=!selectThumbnail">close</i>
                <p>This image has a different formats. Select one.</p>
                <div class="flex flex-row text-xs">
                    <div class="w-1/2 p-2">
                        <img :src="$imageURL(selectedImage)" class="border w-full object-fit" @click="assignImg('')"/>
                        {{ selectedImage.width}} x {{ selectedImage.height}} - 
                        {{ selectedImage.size }} KB
                    </div>
                    <div class="w-1/2 p-2">
                        <div v-if="Object.keys(selectedImage.formats)" class="flex flex-row flex-wrap">
                            <template v-for="format in Object.keys(selectedImage.formats)">
                                <div>
                                <img  :src="$imageURL(selectedImage.formats[format])" class="border w-24 h-auto" @click="assignImg(selectedImage.formats[format])"/>
                                {{ selectedImage.formats[format].width}} x {{ selectedImage.formats[format].height}} - 
                                {{ selectedImage.formats[format].size }} KB
                                </div>
                            </template>

                        </div>
                        <div v-else>
                        <img :src="$imageURL(selectedImage)" class="border w-full h-auto" @click="assignImg('thumb')"/>
                        {{ selectedImage.formats.thumbnail.width}} x {{ selectedImage.formats.thumbnail.height}} - 
                        {{ selectedImage.formats.thumbnail.size }} KB
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- DELETE OBJECT MODAL -->
        <transition name="fade">
            <div class="nuxpresso-modal bg-white border shadow p-4 z-2xtop" v-if="editor && editor.action==='deleteMedia'">
                <h5>Delete this object ?</h5>
                <button @click="$store.dispatch('setAction',null)">No</button>
                <button class="ml-2 danger" @click="deleteMedia">Yes, delete</button>
            </div>  
        </transition>
        <!-- IMAGE FROM URL -->
        <transition name="fade">
            <moka-modal
                v-if="imageURL"
                @close="imageURL=''"
                @click_0="imageURL=''"
                @click_1="setImageByURL()">
                <div slot="title">Image URL</div>
                <div slot="content">
                    <img :src="imageURL" class="w-64"/>
                    <div v-if="editor.current && editor.current.image">{{ editor.current.image.width }} x {{ editor.current.image.height }} <span class="px-1 bg-gray-300 text-black rounded uppercase">{{ editor.current.image.ext}}</span></div>
                </div>
            </moka-modal>    
        </transition>

    </div>
    </div>
</template>

<script>
import MokaUpload from '@/components/media/media.upload'
import MokaEditMedia from '@/components/media/media.edit'
import uploadQry from '@/apollo/upload.gql'
import { mapState } from 'vuex'
export default {
    name: 'MokaMedia',
    components: { MokaUpload , MokaEditMedia },
    data:()=>({
        selected:null,
        search:'',
        start: 0,
        limit: 12,
        gallery: true,
        uploadFile: false,
        edit: false,
        selectThumbnail: false,
        selectedImage: null,
        total:0,
        imageURL: '',
        extImage: null

    }),
    computed:{
        ...mapState ( ['moka','editor'] ),
        media(){
            
            return this.files
        }
       
    },
    methods:{
        active(item){
            return this.selected ? parseInt(this.selected.id) === parseInt(item.id) ? 'border-blue-500' : '' : ''
        },
        getImageURL(image){
            let url = ''
            image.mime.includes('image') ?
                image.previewUrl ? 
                    image.previewUrl.includes('http') ? 
                        url = image.previewUrl : 
                            url = process.env.VUE_APP_API_URL + image.previewUrl.replace('/','') :
                                image.url.includes('http') ? url = image.url : 
                                    url = process.env.VUE_APP_API_URL + image.url.replace('/','') :
                                        url = false
            return url

        },
        setImage(img){
            if ( this.$attrs.filter && this.$attrs.filter === 'manager') { 
                this.edit = true
                return
            } else {
                if ( img.formats && img.formats.thumbnail ){
                    this.selectThumbnail = true
                    this.selectedImage= img
                } else {
                    this.selectedImage = img
                    this.assignImg()
                }
            }
        },
        setImageByURL(){
            var imgURL = new Image();
            imgURL.src = this.imageURL;
            let name = this.imageURL.split('.')
            name = name[name.length-1]
            let width, height
            imgURL.onload = ()=> { 
                this.extImage = {
                    url : this.imageURL,
                    size: null,
                    width: imgURL.width,
                    height: imgURL.height,
                    ext: name                
                }
                console.log ( imgURL )
                this.$emit('newimage', this.extImage )
                this.$emit('close')
            }
            
        },
        assignImg(image){
           
            let img = Object.assign({},this.selectedImage)
            if ( image === 'thumb' ){
                img.url = this.selectedImage.formats.thumbnail.url
                img.size = this.selectedImage.formats.thumbnail.size
                img.width = this.selectedImage.formats.thumbnail.width
                img.height = this.selectedImage.formats.thumbnail.height
            } 
            this.selectedImage = null
            this.$emit ('newimage', img )
            this.$emit( 'close' )
        },
        next(){
            this.selected=null
            this.start = this.start + this.limit
        },
        prev(){
            this.selected=null
            this.start = this.start - this.limit
        },
        refresh(){
            this.total++
            this.$apollo.queries.files.refetch()
        },
        deleteMedia (){
            this.$http.delete ( 'upload/files/' +  this.selected.id ).then ( resp => {
                this.total--
                this.selected = null
                this.edit = false
                this.$store.dispatch('setAction',null)
                this.$apollo.queries.files.refetch()
            })
        }
    },
    
    mounted(){
        this.$http.get ( 'upload/files/count?' ).then ( response => {
            this.total = response.data
        })
        if ( this.editor.current.image && this.editor.current.image.url.includes('http') ){
                this.imageURL = this.editor.current.image.url
        }
    },
    
    apollo: {
        files: {
            query: uploadQry,
            variables(){
                return { 
                    limit : this.search.length < 3 ? this.limit : -1, 
                    start: this.search.length < 3 ? this.start : 0 ,
                    search: this.search
                }
            },
            update: data => data.files
        }
    }
}
</script>