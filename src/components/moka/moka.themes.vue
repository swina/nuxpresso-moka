<template>
    <div class="p-4">
        <h3 class="">Themes Kit</h3>
        <div v-if="!zipInfo" class="p-10">
            <blockquote>With Themes Kit you can import a set of selected pages, templates, blocks and images created by nuxpresso and ready to use in your projects.<br/><br/>
            You can download Themes Kit from nuxpresso website<br/>
            <small>Images are copyright free.</small>
            </blockquote>
            <div class="w-full text-center">
            <button class="success text-xl p-2 px-4 rounded m-auto" @click="importTheme=!importTheme,zipInfo=null">Import</button>
            </div>
        </div>
        <transition name="fade">
            <div v-if="importTheme" class="nuxpresso-modal w-1/3 p-4">
                <h5>Import Theme</h5>
                <input type="file" class="absolute top-0 left-0 right-0 bottom-0 opacity-0" @change="loadThemeFromFile"/>
                <button class="w-full warning">Select File</button>
                
            </div>
        </transition>   
        
        <div class="mt-4" v-if="zipInfo && ( enabled || enableTest )">
            <template v-for="theme in zipInfo">
                
                <div class="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-5" :key="theme.id" v-if="theme.favorite">
                    <div class="flex flex-col border-t-8 border-gray-600 relative text-sm items-center border justify-center p-2">
                        <div class="font-bold">{{ themeName.split('.')[0] }}</div>
                        <div>{{ $moment ( theme.updated_at ) }}</div>
                        <div class="absolute top-0 right-0">
                            <div v-if="theme.premium" class="orange">PREMIUM</div>
                            <div v-else class="bg-lime-400 px-1">FREE</div>
                        </div>
                        
                        <img :src="entryImage(theme.image_uri)" class="cursor-pointer w-full h-48 object-cover object-left-top shadow-xl my-2 hover:scale-125 scale-100 transform"  @click="themeElements=!themeElements" title="Info about this theme"/>
                        <i class="material-icons text-3xl" @click="themeElements=!themeElements" title="Info about this theme">preview</i>
                        <!--
                        <div class="flex flex-row mt-2 text-gray-600">
                            <i class="material-icons text-3xl" @click="themeUnzip(theme),current=true" title="Info about this theme">remove_red_eyes</i>
                            <a :href="nuxpressoUrl + 'uploads/'+ theme.attachment.hash + theme.attachment.ext" target="_blank" download><i class="material-icons text-3xl mx-2" title="Import theme">download</i></a>
                        </div>
                        -->
                    </div>
                    
                </div>
            </template>
            <transition name="slideleft">
                <div v-if="themeElements" class="fixed bg-gray-200 top-0 left-0 w-screen min-h-screen p-6  text-sm items-center flex justify-center ">
                    <i class="material-icons absolute top-0 right-0 m-4 text-gray-500 text-4xl"  @click="themeElements=!themeElements">close</i>
                    <h4 class="absolute top-0 left-0 m-4">Theme Blocks</h4>
                    <div class="absolute top-0 right-0 mt-6 mr-16">
                        <button class="success" @click="importThemeZip()">Save</button>
                    </div>
                    <div class="absolute h-4/5 p-2 bg-white mx-4 overflow-y-auto overflow-x-hidden">
                        <div class="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-10">
                            <template v-for="(entry,index) in zipInfo">
                                <div title="Preview" class="cursor-pointer border h-1/3 mb-4 items-center flex flex-col" @click="setPreview(entry)">
                                    <div class="bg-gray-200 w-full px-1"><span class="capitalize">{{ entry.category }}</span> - <span class="font-bold">{{ entry.name }}</span><br/>
                                    </div>
                                    
                                    <img v-if="entry.image_uri" class="m-1 w-full shadow object-cover object-left-top" style="max-height:12rem" :src="entryImage(entry.image_uri,index)" :title="entry.image_uri.replace('/uploads/','')"/>
                                </div>
                            </template>
                        </div>
                        <div class="font-bold">Images</div>
                        <div class="flex flex-row flex-wrap">
                        <template v-for="image in zipImages">
                            <img :src="image.uri" class="m-1 h-20 w-24 float-md-left shadow object-contain" :title="image.image.replace('/uploads/','')"/>
                        </template>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="fade">
            <div class="absolute top-0 left-0 h-screen min-h-screen w-screen bg-white" v-if="preview">
                <moka-preview :category="category" :doc="doc" v-if="!doc.hasOwnProperty('slider')" @close="preview=!preview" :dashboard="true"/>
                <moka-slider v-if="doc.hasOwnProperty('slider')" :embeded="true" :doc="doc" @close="preview=!preview"/>
            </div>
        </transition>
         
    </div>
</template>

<script>
import JSZip from 'jszip'
import MokaPreview from '@/components/editor/preview/moka.preview'
import MokaSlider from '@/components/editor/preview/moka.slider'
import axios from 'axios'
import { mapState } from 'vuex'
export default {
    name: 'MokaThemeImport',
    components: {
        MokaPreview, MokaSlider
    },
    data:()=>({
        themeName: 'Import',
        importTheme: false,
        themeElements: false,
        enableTest: true,
        current: null,
        current_zip: '',
        zipInfo: null,
        zipImages: [],
        zipUploadImages: [],
        doc: null,
        category: null,
        preview: false,
        //themes: null,
        saveThemes : [],
        filename: 'Nuxpresso Theme',
        download: false
    }),
    computed: {
        ...mapState ( ['themes'] ),
        enabled(){
            return process.env.VUE_APP_NUXPRESSO_THEMES
        },
        nuxpressoUrl(){
            return process.env.VUE_APP_NUXPRESSO_URL
        }
        
    },
    methods:{
        entryImage ( name , entry = -1){
            let preview = require('@/assets/no-image.png')
            
            this.zipImages.forEach ( img => {
                return img.image === name ? preview = img : null
            })
            
            return preview ? preview.uri : ''
        },
        loadThemeFromFile(ev){
            this.themeName = ev.target.files[0].name
            const file = ev.target.files[0];
            let vm = this
            JSZip.loadAsync( file ).then ( zip => {
                zip.forEach ( (relativePath,entry) => {
                    if ( entry ){
                        if ( entry && entry.name.endsWith('json') ){
                            zip.file(entry.name).async('string').then(function(content) {
                                return JSON.parse(content)
                            }).then ( json => {
                                json.forEach( block => {
                                    delete block.autosave
                                })
                                this.zipInfo = json
                                this.saveThemes = []
                            });
                        } else {
                            //put images url in array, to use to export as data uri
                            zip.file(entry.name).async("blob").then ( function ( content ) {
                                async function getUri(content,entry){
                                    let dataUrl = await new Promise(resolve => {
                                        let reader = new FileReader();

                                        reader.onload = () => resolve(reader.result);
                                        //!entry.name.endsWith('svg')  ?
                                            reader.readAsDataURL(content) //:
                                        //        reader.readAsText(content)
                                    });
                                    let ext = entry.name.split ( '.' )
                                    ext = ext[ext.length-1]
                                    !entry.name.endsWith('svg') ?
                                        dataUrl = dataUrl.replace('application/octet-stream','image/'+ ext) :
                                            dataUrl = dataUrl.replace('application/octet-stream','image/svg+xml') 
                                    return dataUrl
                                }
                                getUri(content,entry).then ( data_uri => {
                                    return {
                                        image: '/uploads/' + entry.name,
                                        uri: data_uri
                                    }
                                }).then ( image => {
                                    vm.zipImages.push ( image )
                                    
                                })
                           });
                        }
                    }
                })
                this.importTheme = false
            })
        },
        themeUnzip(theme){
            if ( this.current_zip === theme.attachment.hash ) return 
            this.zipImages = []
            //this.$store.dispatch ( 'loadTheme' , theme.attachment.hash + theme.attachment.ext )
            this.current = this.themes.theme
            return 
            //this function extract the theme's remote zip files info using jszip package
            //result is added to zipInfo that contains all the theme blocks
            //(vue is using the proxy here to solve CORS problems)
            axios({
                url: '/uploads/' + theme.attachment.hash + theme.attachment.ext,
                    method: 'GET',
                    responseType: 'blob'
            }).then ( response => {
                if (response.status === 200 || response.status === 0) {
                    return Promise.resolve(response.data);
                } else {
                    return Promise.reject(new Error(response.statusText));
                }
            }).then ( JSZip.loadAsync ).then ( (zip) => {
                zip.forEach ( (relativePath,entry) => {
                    if ( entry ){
                        if ( entry && entry.name.endsWith('json') ){
                            zip.file(entry.name).async('string').then(function(content) {
                                return JSON.parse(content)
                            }).then ( json => {
                                this.zipInfo = json
                                this.saveThemes = []
                            });
                        } else {
                            //put images url in array, to use to export as data uri
                            this.zipImages.push ( entry )
                        }
                    }
                })
            }).catch ( error => {
                console.log ( error )
            })
        },
        getPreview(image,uri,entry){
            let img = image.split('/')
            let preview = process.env.VUE_APP_NUXPRESSO_URL + image.substring(1)
            if ( preview ) {
                return preview
            }
            return ''
        },
        importThemeZip(){
            this.zipInfo.forEach ( block => {
                let image = this.entryImage ( block.image_uri)
                let obj = Object.assign ( {} , block )
                obj.image_uri = image
                this.$http.post ( 'components' , obj ).then ( response => {
                    console.log ( 'Imported Block => ' , block.name )
                }).catch ( error => {
                    console.log ( error )
                })
                
            })
            this.$message ( 'Theme Kit imported ')
            
        },
        createUri ( ){
            //this function populate the saveThemes array to download
            //images are converted to data uri 
            //you can disable this option with the environment variable VUE_APP_NUXPRESSO_THEMES=false
            this.themes.theme.forEach ( entry =>{
                console.log ( entry )
                async function getUri(entry) {
                    let blob = await axios.get( entry.image_uri , {responseType:'blob'} ).then(r => r.data );
                    let dataUrl = await new Promise(resolve => {
                            let reader = new FileReader();
                            reader.onload = () => resolve(reader.result);
                            reader.readAsDataURL(blob);
                        });
                    console.log ( dataUrl )
                    let saveTheme = Object.assign({},entry)
                    saveTheme.image_uri = dataUrl
                    return saveTheme
                };
                getUri(entry).then ( result => {
                    console.log ( result )
                    delete result.autosave
                    this.saveThemes.push ( result )
                })
            })
        },
        setPreview(block){
            this.doc = block.json
            this.category = block.category 
            this.preview = true
        }
    }
}
</script>