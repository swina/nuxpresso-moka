<template>
    <div v-if="user" class="p-4">
        <h3>Transfer to Production</h3>
        <div class="flex flex-row">
            <button class="rounded-none bg-white text-blue-300 mr-2" @click="start=0,limit=10,mode='articles'">Articles</button> 
            <button class="rounded-none bg-white text-blue-300 mr-2" @click="start=0,limit=10,mode='components'">Components</button>
            <button class="rounded-none bg-white text-blue-300 mr-2" @click="start=0,limit=16,mode='upload'">Media</button>
        </div>
        <div class="flex flex-row">
            <div class="w-1/2 p-2">
                <h4 class="bg-blue-200 p-1">Staging</h4>
                <div>SERVER: localhost</div>

                <div v-if="mode==='articles'">
                    <div class="font-bold">Articles</div>
                    <draggable tag="div" :list="moka.articles" :group="{ name: 'articles', pull: 'clone', put: false }" class="flex flex-col">
                        <template v-for="(article,index) in moka.articles">
                            <div v-if="index >= start && index < (start+limit)" class="text-sm p-1 mb-1 border shadow cursor-pointer" title="double click to transfer"   @dblclick="origin=article,confirm=!confirm">{{index+1}} - <span class="mr-4">{{ $moment(article.updated_at)}}</span> {{article.title}}</div>
                            
                        </template> 
                    
                    </draggable>
                    <!--<select size="10" class="w-64">
                        <option v-for="article in moka.articles" :value="article"  @dblclick="origin=article,confirm=!confirm">{{ article.title }}</option>
                    </select>-->
                </div>

                <div v-if="mode==='components'">
                    <div class="font-bold">Components</div>
                    <select size="10" class="w-64">
                        <option v-for="option in moka.components" :value="option"  @dblclick="origin=option,confirm=!confirm">{{ option.name }}</option>
                    </select>
                </div>

                <div v-if="files && mode==='upload'">
                    <div class="font-bold">Media <span class="text-xs">Drag&Drop to server</span></div>
                    <draggable tag="div" :list="files" :group="{ name: 'media', pull: 'clone', put: false }" class="flex flex-row flex-wrap justify-center">
                        <template v-for="file in files">
                            <div v-model="files" class="flex items-center text-center justify-center w-24 h-24 mr-2 mb-2 cursor-move">
                                <img :src="file.url" v-if="file.mime.split('/')[0]==='image'" class="w-24 h-24 object-cover border"/>
                                <img :src="file.previewUrl" v-if="file.mime.split('/')[0]==='video'" class="w-24 h-24 object-cover border"/> 
                                <div v-if="file.mime.split('/')[0]!='image' && file.mime.split('/')[0]!='video'" class="text-xs border h-24 w-24">{{ file.name }}</div>
                            </div>
                        </template>
                        
                    </draggable>
                   
                </div>
                 <div class="w-full flex justify-around">
                            <i @click="prev" v-if="start > 0" class="material-icons mr-2 text-3xl cursor-pointer">chevron_left</i>
                            <i v-if="start < 1" class="material-icons mr-2 text-3xl text-gray-300">chevron_left</i>
                            <i @click="next" class="material-icons text-3xl cursor-pointer">chevron_right</i>
                            
                        </div>
            </div>
            <div class="w-1/2 p-2">
                <h4 class="bg-purple-500 p-1">Production</h4>
                <draggable :list="trash" group="removed">SERVER: {{ user.production.url }}</draggable>
                <div v-if="production && mode==='articles'">
                    <div class="font-bold">Articles</div>
                    <draggable :list="serverArticles" group="articles" class="flex flex-col" @add="onEndArticle">
                        <template v-for="(article,index) in articlesRemote">
                            <div class="text-sm p-1 mb-1 border shadow cursor-pointer">{{index+1}} - <span class="mr-4">{{ $moment(article.updated_at)}}</span> {{article.title}}</div>
                            
                        </template> 
                    </draggable>
                    <!--<select multiple size="10" class="w-64">
                        <option v-for="article in articles" :value="article">{{ article.title }}</option>
                    </select>-->
                </div>
                <div v-if="components && mode==='components'">
                    <div class="font-bold">Components</div>
                    <select size="10" class="w-64">
                        <option v-for="option in blocks" :value="option">{{ option.name }}</option>
                    </select>
                </div>
                <div v-if="files && mode==='upload'">
                    <div class="font-bold">Media <span class="text-xs">Dblclick to remove image</span></div>
                    <draggable :list="serverMedia" group="media"  style="min-height:5rem" class="flex flex-row flex-wrap bg-gray-300 p-2">
                      
                        <template v-for="(file,index) in serverMedia">
                            <div v-model="files" class="flex items-center text-center justify-center w-24 h-24 mr-2 mb-2" @dblclick="serverMedia.splice(index,1)">
                                <img :src="file.url" v-if="file.mime.split('/')[0]==='image'" class="w-24 h-24 object-cover border"/>
                                <img :src="file.previewUrl" v-if="file.mime.split('/')[0]==='video'" class="w-24 h-24 object-cover border"/> 
                                <div v-if="file.mime.split('/')[0]!='image' && file.mime.split('/')[0]!='video'" class="text-xs border h-24 w-24">{{ file.name }}</div>
                            </div>
                        </template>
                    
                    </draggable>
                    <button @click="transferMedia" v-if="serverMedia.length">Transfer</button>
                </div>
            </div>
        </div>
        <div v-if="confirm" class="nuxpresso-modal w-1/3 bg-white z-2xtop p-2 flex flex-col shadow">
            <h4>Confirm transfer</h4>
            {{ origin.name || origin.title }}
            <div class="my-2">
                <button class="float-left mr-2 danger" @click="confirm=!confirm">Close</button>
                <button class="success" @click="transfer(mode,origin)">Yes</button>
            </div>
            <div v-if="message">{{ message }} <button class="warning" @click="updateArticle=true">YES</button></div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import uploadQry from '@/apollo/upload.gql'
import articlesQry from '@/apollo/articles.gql'
import axios from 'axios'
import draggable from 'vuedraggable'
export default {
    name: 'MokaStaging',
    components: { draggable },
    data:()=>({
        articles: null,
        articlesRemote: null,
        blocks: null,
        origin:null,
        mode: '',
        confirm: false,
        start: 0,
        limit:15,
        serverArticles:[],
        serverMedia:[],
        trash:[],
        message: '',
        updateArticle: false
    }),
    computed:{
        ...mapState ( ['moka','user']),
        dragOptions() {
            return {
                animation: 0,
                group: "description",
                disabled: !this.editable,
                ghostClass: "ghost"
            }
        },
        master(){
            return this.user.production.url
        },
        production(){
            return this.remote.get ( this.user.production.url + 'articles' ).then ( response => {
                this.articlesRemote = response.data//this.moka.articles
                return true// response.data
            })
        },
        components(){
            return this.remote.get ( this.user.production.url + 'components' ).then ( response => {
                this.blocks = response.data
                return true //response.data
            })
        },
        remote(){
            return axios
        }
    },
    watch:{
        updateArticle(v){
            if ( v ){
                this.update ( this.mode  , this.origin )
                this.message = ''
                this.updateArticle = false
            }
        }
    },
    methods: {
        next(){
            this.start = this.start + this.limit
        },
        prev(){
            this.start = this.start - this.limit
        },
        onEndArticle(event){
            this.origin = this.serverArticles[this.serverArticles.length-1] 
            this.confirm = true
            
        },
        transferMedia (){
            this.serverMedia.forEach ( media => {
                media['Upload']  = { status: true }
                this.remote.post ( this.master + 'upload' , media ,{
                headers:{
                    'Authorization': window.localStorage.getItem('nuxpresso-production-jwt')
                }
                }).then ( response => {
                    console.log ( response )
                }).catch ( error => {
                    console.log ( error )
                })
            })
        },
        save(target,origin){
            this.confirm = false
            origin.updated_at = this.$moment( new Date , 'YYYY-MM-DD HH:mm:ss')
            this.remote.post ( this.master + target , origin ,{
                headers:{
                    'Authorization': window.localStorage.getItem('nuxpresso-production-jwt')
                }
            }).then ( response => {
                    this.$store.dispatch('message','Data transferred correctly')
                    console.log ( response )
                    
                    this.mode === 'components' ? 
                        this.blocks.push ( response.data ) :
                            this.articles.push ( response.data )
            }).catch ( error => {
                console.log ( error )
            })
        },
        update(target,origin){
            this.remote.put ( this.master + target + '/' + origin.id , origin ,{
                headers:{
                    'Authorization': window.localStorage.getItem('nuxpresso-production-jwt')
                }
            }).then ( response => {
                    this.$store.dispatch('message','Data transferred correctly')
                    this.confirm = false
                    
            }).catch ( error => {
                console.log ( error )
            })
        },
        transfer(scope,origin){
            if ( this.mode === 'components' ){
                origin.blocks_id = origin.json.id
                this.save ( this.mode , origin )
            } else {
                this.$http.get('articles/' + origin.id ).then ( response=>{
                    let article = response.data
                    let art = this.articles.filter ( a => a.slug === article.slug )[0]
                    if ( art ){
                        
                        this.origin = article
                        this.origin.id = art.id 
                        this.origin.SEO = art.SEO
                        this.origin.SEO.title = article.title
                        this.origin.SEO.description = article.description 
                        this.message = 'An article is present in production with the same slug. Do you want to update the remote article?'
                    } else {
                        this.save ( this.mode , article )
                    }
                    
                    //this.save ( this.mode , origin )
                })
            }
            
        }
    },
    mounted(){
        this.remote.post ( this.master + 'auth/local' , {
            identifier: 'nuxpresso',
            password: 'password'
        } ).then(response => {
          // Handle success.
          console.log ( response )
          let authenticated = {
              user : response.data.user,
              jwt : response.data.jwt
          }
          window.localStorage.setItem ( 'nuxpresso-production-jwt' , "Bearer " + response.data.jwt )
          this.remote.headers = {
            'Authorization': window.localStorage.getItem('nuxpresso-production-jwt')
            }
        })
        .catch(error => {
          console.log ( error )
          
      });
    },
    apollo: {
        files: {
            query: uploadQry,
            variables(){
                return { limit : this.limit , start: this.start }
            },
            update: data => data.files
        },
        articles: {
            query: articlesQry,
            variables(){
                return { limit : this.limit , start: this.start }
            },
            update: data => data.articles
        }
    }

}
</script>