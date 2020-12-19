<template>
    <div class="p-4 relative bg-white" v-if="files">
        <div class="grid grid-cols-3 grid-flow-row items-center" style="grid-template-columns:1fr .2fr .2fr;">
            <h3 class="">Media</h3> 
            <button @click="uploadFile=!uploadFile">Upload</button>
            <div class="text-right">
                <i class="material-icons cursor-pointer text-xl" title="Refresh" @click="refresh()">cached</i>
            </div>
            <!--<a href="#" @click="gallery=!gallery" class="text-right"><i class="material-icons" v-if="!gallery">grid_on</i><i class="material-icons" v-if="gallery">list</i></a>-->
        </div>
        <!--<div class="bg-gray-200 h-full border-1 rounded-lg shadow p-8 relative overflow-y-auto">-->
        <i v-if="$attrs.modal" class="material-icons absolute top-0 right-0" @click="$emit('close')">highlight_off</i>
        <div class="flex flex-wrap border rounded p-4">
            <template v-for="(file,n) in files">
                <div class="md:w-1/4 lg:w-2/12 px-2 bg-white text-xs cursor-pointer mb-2" @click="setImage(file),selected=file" :title="file.name" >
                    <div :class="'mb-1 overflow-hidden border-4 border-transparent ' + active(file)">
                        <div class="relative pt-32 bg-gray-700 ">
                            <div class="flex items-center text-center h-full justify-center absolute h-48 top-0 left-0 right-0 bottom-0">
                                <img v-if="file.previewUrl" class="w-auto h-auto block m-auto" :src="file.previewUrl"/>
                                <img v-else class="w-auto h-auto block m-auto" :src="file.url"/>
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
                    <button>Delete</button>
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
            <div class="nuxpresso-modal w-1/2 shadow border rounded p-4" v-if="uploadFile">
                <moka-upload @uploaded="refresh()" @close="uploadFile=!uploadFile"/>
            </div>
        </transition>
         <transition name="fade">
            <div class="nuxpresso-modal z-top w-2/3 shadow-xl border rounded p-4" v-if="edit">
                <moka-edit-media :img="selected" @close="edit=!edit"/>
            </div>
        </transition>
    </div>
</template>

<script>
import MokaUpload from '@/components/media/media.upload'
import MokaEditMedia from '@/components/media/media.edit'
import uploadQry from '@/apollo/upload.gql'
import { mapState } from 'vuex'
export default {
    name: 'NuxpMedia',
    components: { MokaUpload , MokaEditMedia },
    data:()=>({
        selected:null,
        start: 0,
        limit: 12,
        gallery: true,
        uploadFile: false,
        edit: false
    }),
    computed:{
        ...mapState ( ['moka'] ),
        media(){
            return this.files
        }
       
    },
    methods:{
        active(item){
            return this.selected ? parseInt(this.selected.id) === parseInt(item.id) ? 'border-blue-500' : '' : ''
        },
        setImage(image){
            this.$emit ('newimage', image )
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
            this.$apollo.queries.files.refetch()
        }
    },
    /*
    mounted(){
        if ( window.localStorage.getItem('nuxpresso-jwt') ){
            this.$http.defaults.headers.common = {
                'Authorization': window.localStorage.getItem('nuxpresso-jwt')
            }   
            console.log ( this.$http.defaults )
        }
    },
    */
    apollo: {
        files: {
            query: uploadQry,
            variables(){
                return { limit : this.limit , start: this.start }
            },
            update: data => data.files
        }
    }
}
</script>