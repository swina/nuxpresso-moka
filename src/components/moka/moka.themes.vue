<template>
    <div class="p-4">
        <h3 class="">Themes Marketplace</h3>
        <template v-for="theme in themes">
            <div class="grid grid-cols-3" :key="theme.id">
                <div class="flex flex-col border-t-8 border-gray-600 relative text-sm items-center border justify-center p-2">
                    <div class="font-bold">{{ theme.name }}</div>
                    <div>{{ $moment ( theme.updated_at ) }}</div>
                    <div class="absolute top-0 right-0">
                        <div v-if="theme.premium" class="orange">PREMIUM</div>
                        <div v-else class="bg-lime-400 px-1">FREE</div>
                    </div>
                    <img :src="getPreview(theme.featured.url,false)" class="cursor-pointer w-24 shadow-xl my-2 hover:scale-125 scale-100 transform"  @click="themeUnzip(theme),current=theme" title="Info about this theme"/>
                    <div class="flex flex-row mt-2 text-gray-600">
                        <i class="material-icons text-3xl mx-2" @click="themeUnzip(theme),current=theme" title="Info about this theme">remove_red_eyes</i>
                        <i class="material-icons text-3xl mx-2" @click="info(theme.attachment),current=theme" title="Import theme">download</i>
                    </div>
                </div>
            </div>
        </template>
        <transition name="slideleft">
        <div v-if="current" class="fixed bg-gray-200 top-0 left-0 w-screen min-h-screen p-6  text-sm items-center flex justify-center ">
            <i class="material-icons absolute top-0 right-0 m-4 text-gray-500 text-4xl"  @click="current = null">close</i>
            <div class="absolute top-0 right-0 mt-6 mr-16">
                <button class="success" @click="createUri()">Import</button>
                <button class="orange ml-2" @click="createUri(),download=!download">Download</button>
                </div>
            <div class="absolute top-0 left-0 mx-4 my-4">
                <h4>Theme: <span class="font-bold">{{ current.name }}</span></h4>
                <div class="grid grid-cols-3 gap-12">
                <div>Author: {{ current.author || 'nuxpresso' }}</div>
                <div>Date: {{ $moment(current.updated_at) }} </div>
                <div>Download: <span v-if="!current.premium">Free</span><span v-else>YES</span></div>
                </div>
            </div>
            
            <div class="absolute h-4/5 bg-white mx-4 mt-16 overflow-y-auto overflow-x-hidden grid grid-cols-3 gap-10">
                <template v-for="(entry,index) in zipInfo">
                    <div title="Preview" class="cursor-pointer p-4 mb-4 items-center flex flex-col" @click="setPreview(entry)">
                        <div><span class="capitalize">{{ entry.category }}</span> - <span class="font-bold">{{ entry.name }}</span><br/>
                        </div>
                        <img v-if="entry.image_uri" class="w-full shadow-xl" :src="getPreview(entry.image_uri,true,entry)"/>
                    </div>
                </template>
            </div>
        </div>
        </transition>
        <transition name="fade">
            <div class="absolute top-0 left-0 h-screen min-h-screen w-screen bg-white" v-if="preview">
                <moka-preview :category="category" :doc="doc" v-if="!doc.hasOwnProperty('slider')" @close="preview=!preview" :dashboard="true"/>
                <moka-slider v-if="doc.hasOwnProperty('slider')" :embeded="true" :doc="doc" @close="preview=!preview"/>
            </div>
        </transition>
        <transition name="fade">
            <div class="nuxpresso-modal z-2xtop shadow p-4" v-if="download">
                <i class="material-icons absolute top-0 right-0 m-1" @click="download=!download">close</i>
                <h5>Download Theme : {{ current.name }}</h5>
                <input type="text" v-model="filename"/>.<input type="text" readonly class="w-8 mr-2" value="json"/>
                <vue-blob-json-csv
                    file-type="json"
                    :file-name="filename"
                    :data="saveThemes"
                >
                
                <button @click="saveThemes=[]">Download</button>     
                </vue-blob-json-csv>
            </div>
        </transition>
    </div>
</template>

<script>
import JSZip from 'jszip'
import MokaPreview from '@/components/editor/preview/moka.preview'
import MokaSlider from '@/components/editor/preview/moka.slider'
import axios from 'axios'
export default {
    name: 'MokaThemeImport',
    components: {
        MokaPreview, MokaSlider
    },
    data:()=>({
        current: null,
        current_zip: '',
        zipInfo: null,
        zipImages: [],
        doc: null,
        category: null,
        preview: false,
        themes: null,
        saveThemes : [],
        filename: 'Nuxpresso Theme',
        download: false
    }),
    mounted(){
         this.getThemes()
            /*
            const libraries = require.context(
                '@/assets/themes',
                true,
                /^.*\.json$/
            )
            let themesList = libraries.keys().map ( file => {
                return file.replace('./' , '')
            })
            return themesList
            */
        
    },
    methods:{
        async getThemes(){
            //const themes = await axios.get ( process.env.VUE_APP_API_URL + 'themes' )
            this.zipImages = []
            /*axios({
                url: 'http://localhost:8080/uploads/themes.zip',
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin' : '*'
                },
            }).then ( response => {
                if (response.status === 200 || response.status === 0) {
                    return Promise.resolve(response.data);
                } else {
                    return Promise.reject(new Error(response.statusText));
                }
            }).then ( data => {
                this.themes = data 
            })
            */
           
            axios({
                url: '/uploads/themes.zip',
                    method: 'GET',
                    responseType: 'blob'
            }).then ( response => {
                if (response.status === 200 || response.status === 0) {
                    return Promise.resolve(response.data);
                } else {
                    return Promise.reject(new Error(response.statusText));
                }
            }).then ( JSZip.loadAsync ).then ( (zip) => {
                console.log ( zip.files )
                zip.forEach ( (relativePath,entry) => {
                    if ( entry ){
                        if ( entry && entry.name.endsWith('json') ){
                            zip.file(entry.name).async('string').then(function(content) {
                                //console.log ( JSON.parse(content) )
                                //vm.zipInfo = JSON.parse(content)
                                //console.log ( this.zipInfo )
                                return JSON.parse(content)
                            }).then ( json => {
                                //this.zipInfo = json
                                this.themes = json
                                //this.saveThemes = []
                            });
                        } else {
                            //this.zipImages.push ( entry )
                        }
                    }
                    //console.log ( entry )
                    //this.zipInfo.push ( entry )
                })
            }).catch ( error => {
                console.log ( error )
            })
            
            //this.themes = themes.data
            
        },
        themeUnzip(theme){
            if ( this.current_zip === theme.attachment.hash ) return 
            axios({
                url: '/uploads/test.zip', //+ theme.attachment.hash + theme.attachment.ext,
                    method: 'GET',
                    responseType: 'blob'
            }).then ( response => {
                if (response.status === 200 || response.status === 0) {
                    return Promise.resolve(response.data);
                } else {
                    return Promise.reject(new Error(response.statusText));
                }
            }).then ( JSZip.loadAsync ).then ( (zip) => {
                console.log ( zip.files )
                zip.forEach ( (relativePath,entry) => {
                    if ( entry ){
                        if ( entry && entry.name.endsWith('json') ){
                            zip.file(entry.name).async('string').then(function(content) {
                                //console.log ( JSON.parse(content) )
                                //vm.zipInfo = JSON.parse(content)
                                //console.log ( this.zipInfo )
                                return JSON.parse(content)
                            }).then ( json => {
                                this.zipInfo = json
                                this.saveThemes = []
                            });
                        } else {
                            this.zipImages.push ( entry )
                        }
                    }
                    //console.log ( entry )
                    //this.zipInfo.push ( entry )
                })
            }).catch ( error => {
                console.log ( error )
            })
        },
        info(theme){
            //let json = require ( '@/assets/themes/' + theme )
            let vm = this
            //axios.get ( process.env.VUE_APP_API_URL + 'uploads/' + theme ).then ( file =>{
                //console.log ( file )
                //this.zipInfo = file.data
            //})
            //this.zipInfo = json
            //ZIP FILES
            this.zipImages = []
            fetch (  process.env.VUE_APP_API_URL +  theme.url.substring(1) )
            .then(function (response) {                       // 2) filter on 200 OK
                if (response.status === 200 || response.status === 0) {
                    return Promise.resolve(response.blob());
                } else {
                    return Promise.reject(new Error(response.statusText));
                }
            }).then ( JSZip.loadAsync ).then ( (zip) => {
                console.log ( zip.files )
                zip.forEach ( (relativePath,entry) => {
                    if ( entry.name.endsWith('json') ){
                        zip.file(entry.name).async('string').then(function(content) {
                            //console.log ( JSON.parse(content) )
                            //vm.zipInfo = JSON.parse(content)
                            //console.log ( this.zipInfo )
                            return JSON.parse(content)
                        }).then ( json => {
                            this.zipInfo = json
                            this.saveThemes = []
                        });
                    } else {
                        this.zipImages.push ( entry )
                    }
                    //console.log ( entry )
                    //this.zipInfo.push ( entry )
                })
            })
            
        },
        getPreview(image,uri,entry){
            let img = image.split('/')
            let preview = process.env.VUE_APP_API_URL + image.substring(1) //require ( '@/assets/themes/' + img[img.length-1] )
            if ( preview ) {
                /*
                axios.get ( process.env.VUE_APP_API_URL + image.substring(1) ).then ( resp => {
                    console.log ( resp )
                }).catch ( err => {
                    console.log ( image , ' not found')
                })
                */
               
                return preview
            }
            return ''
        },
        createUri ( ){
            this.zipInfo.forEach ( entry =>{
                console.log ( entry )
                async function getUri(entry) {
                    let blob = await fetch(process.env.VUE_APP_API_URL + entry.image_uri.substring(1) ).then(r => r.blob());
                    let dataUrl = await new Promise(resolve => {
                        let reader = new FileReader();
                        reader.onload = () => resolve(reader.result);
                        reader.readAsDataURL(blob);
                    });
                    let saveTheme = Object.assign({},entry)
                    saveTheme.image_uri = dataUrl
                    return saveTheme
                    //console.log ( dataUrl )
                    // now do something with `dataUrl`
                };
                getUri(entry).then ( result => {
                    console.log ( result )
                    this.saveThemes.push ( result )
                })
                //this.saveThemes.push ( uri )
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