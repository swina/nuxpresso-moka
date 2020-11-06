<template>
    <div class="p-2 flex flex-col">
        <div class="grid grid-cols-2 grid-flow-row items-center" style="grid-template-columns:1fr .2fr .6fr .2fr;">
            <h3 class="">Articles</h3> 
            <button @click="create=!create">Create New</button>
            <div class="text-right">Category 
                <select v-model="filter">
                    <option v-for="category in moka.categories" :value="category.id">{{ category.name }}</option>
                </select>
            </div>
            <!--<a href="#" @click="gallery=!gallery" class="text-right"><i class="material-icons" v-if="!gallery">grid_on</i><i class="material-icons" v-if="gallery">list</i></a> -->
        </div>
            <table class="w-full border text-sm text-left p-1" v-if="!editor">
                <thead class="bg-gray-200">
                    <template v-for="(col,c) in columns">
                        <th class="text-left p-2">{{ col.label }}</th>
                    </template>
                    <th>Template</th>

                    <th>Type</th>
                </thead>
                <tr v-for="(article,a) in articles" class="cursor-pointer hover:bg-gray-100 p-1 border-b-2" @click="articleSlug=article.id,editor=!editor">
                    <template v-for="(col,c) in columns">
                        <td class="p-2">
                            <span v-if="col.field!='updated_at'">{{ article[col.field] }}</span>
                            <span v-else>{{ $moment ( article[col.field].split('T')[0] ) }}</span>
                        </td>
                    </template>
                    <td><span v-if="article.component">{{ article.component.name }}</span></td>
                    <td>
                        <span v-if="article.component">
                        {{ article.component.category}}
                        
                        </span>

                    </td>
                    <!--<td><i class="material-icons text-sm" @click="articleSlug=article.id,editor=!editor">edit</i></td>-->
                </tr>    
            </table>

            <transition name="fade">
                <div class="flex flex-row border-t p-1">
                    <section class="w-4/5 container relative text-sm" v-if="currentArticle && editor">
                        
                        <label>Title <span class="text-gray-400">#{{ currentArticle.id }}</span></label>
                        <input type="text" class="w-full text-2xl" v-model="currentArticle.title"/>
                        <label>Slug </label>
                        <input type="text" class="w-full text-2xl" v-model="currentArticle.slug" @blur="slugify()"/>
                        <label>Content</label>
                        <div class="flex flex-col">
                            <moka-text-editor v-model="currentArticle.content" :embeded="true"/>
                            <!--
                            <client-only>
                                <quill-editor
                                    class="mt-2"
                                    ref="editor"
                                    id="editor"
                                    v-model="currentArticle.content"
                                    :options="editorOptions"
                                    @blur="onEditorBlur($event)"
                                    @focus="onEditorFocus($event)"
                                    @ready="onEditorReady($event)"
                                />
                                <div id="customToolbar" class="p-1 border-r border-b border-l">
                                    <span class="text-xs">Nuxpresso</span>
                                    <i class="material-icons text-sm nuxpresso-icon-btn" title="add image" @click="addImage">image</i>
                                    <i class="material-icons text-sm nuxpresso-icon-btn" title="add widget" @click="addWidget">widgets</i>
                                </div>
                            </client-only>
                            -->
                            <label>Excerpt</label>
                            <textarea class="text-sm" v-model="currentArticle.excerpt"></textarea>
                        </div>

                    </section>
                
                
                    <div class="w-1/5 ml-1 shadow p-2 text-sm bg-gray-200" v-if="currentArticle && editor">
                        <button class="warning mr-2" @click="editor=!editor">Close</button>
                        <button class="success" @click="save">Save</button>    
                        <div class="flex flex-col mt-6">
                            <div class="mb-2 flex flex-col">
                                Template
                                <select v-model="currentArticle.component">
                                    <option v-if="template.enabled" v-for="(template,t) in templates" :value="template.id"> {{ template.name }} </option>
                                </select>
                            </div>
                            <div class="mb-2 flex flex-col">
                                Category
                                <select v-model="currentArticle.categories" multiple>
                                    <option v-for="(category,c) in categories" :value="category"> {{ category.name }} </option>
                                </select>
                            </div>
                            <div><input type="checkbox" v-model="currentArticle.homepage"/> Homepage</div>
                            <div>
                                <moka-image-placeholder class="w-full" :image="currentArticle.image" @click="media=!media" @media="media=!media,editorImage=false" @noimage="currentArticle.image=null"/>
                            </div>
                            
                            <label>Tags</label>
                            <textarea v-model="currentArticle.tags" class="h-32 w-full text-xs"></textarea>
                            <div class="text-xs text-gray-300">Set a tag per line</div>
                            <div class="flex flex-col">
                                <div class="text-xl">SEO</div>
                                <label>Title</label>
                                <input type="text" v-model="currentArticle.SEO.title"/>
                                <label>Description</label>
                                <textarea class="text-sm" v-model="currentArticle.SEO.description"/>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </transition>
            <transition name="fade">
                <div v-if="media" class="fixed top-0 left-0 m-auto rounded-lg bg-white">
                    <moka-media :modal="true" @close="media=false" @newimage="setImage"/>
                </div>
            </transition>
            <div class="fixed top-0 bg-black bg-opacity-50 left-0 z-max h-screen w-screen flex flex-col justify-center items-center" v-if="loading">
                <div class="flex  lds-ring" v-if="loading"><div></div><div></div><div></div><div></div></div>
            </div>
            <!--
            <transition name="fade">
                <div v-if="widgets" class="fixed top-0 left-0 m-auto z-40 rounded-lg bg-white">
                    <nuxpresso-widgets @close="widgets=false" @widget="setWidget"/>
                </div>
            </transition>
            -->
    </div>
</template>

<script>
import queryArticles from '@/apollo/articles-admin.gql'
import queryArticleSlug from '@/apollo/articles-slug.gql'
import MokaTextEditor from '@/components/editor/moka.text.editor'
import MokaImagePlaceholder from '@/components/editor/moka.editor.image.placeholder'
import MokaMedia from '@/components/media/media'
import { mapState } from 'vuex'
var self = this

export default {
    name: 'MokaArticles',
    components: { MokaTextEditor , MokaImagePlaceholder , MokaMedia },
    computed : { 
        ...mapState ( ['moka' ] ),
        templates (){
            return this.moka.components.filter(comp=>{ return comp.category === 'template' || comp.category === 'page' } )
        },
        categories(){
            return this.moka.categories
        }
    },
    data:()=>({
            loading: false,
            filter: '',
            editor: false,
            slug:'',
            articleSlug: null,
            currentArticle: null,
            currentImage: null,
            editorImage: true,
            media: false,
            widgets: false,
            start: 0,
            limit: 10,
            columns: [
                { field: 'id' , label: '#' },
                { field: 'title' , label: 'Title' },
                { field: 'slug' , label: 'Slug' },
                { field: 'homepage' , label: 'Homepage' },
                { field: 'lang' , label: 'Language' },
                { field: 'updated_at' , label: 'Updated'}
            ],
            
    }),
    apollo:{
        articles: {
            prefetch: true,
            query: queryArticles,
            variables(){
                return {
                    limit: parseInt(this.limit),
                    start: parseInt(this.start)
                }
            },
            update: data => data.articles 
        }  
    },
    watch:{
        articleSlug(id){
            console.log  ( id )
            this.$http.get ( 'articles/' + id ).then ( response => {
                console.log ( response )
                this.currentArticle = response.data
                this.slug = this.currentArticle.slug 
            })
        },
        
    },
    methods:{
        slugify(){
            console.log ( 'slugify ...' , this.$slugify(this.currentArticle.slug) )
            return this.currentArticle.slug = this.$slugify(this.currentArticle.slug)
        },
        save(){
            let vm = this
            vm.currentArticle.id = parseInt(vm.currentArticle.id)
            
            this.$http.put ( 'articles/' + vm.currentArticle.id , vm.currentArticle ).then ( response => {
                //vm.currentArticle = response.data
                console.log ( response )
                this.$store.dispatch('message','Article has been saved successfully')
                vm.$emit('message','Article has been saved successfully')
            }).catch ( error => {
                vm.$emit('message','An error occurred. Check you console log')
                console.log ( error )
            })
            
        },
        addImage(){
            this.currentImage = null
            this.editorImage = true
            this.media = true 
        },
        addWidget(){
            this.widgets = true
        },
        setImage(img){
            console.log ( img )
            if ( this.editorImage ){
                this.$refs['editor'].quill.focus()
                let range = this.$refs['editor'].quill.getSelection();
                range ? 
                    this.$refs['editor'].quill.insertEmbed(range.index, 'image', img.url ) :
                        this.$emit('message','Set a position in the editor to place the image')
            } else {
                this.currentArticle.image = this.$cleanImage(img)
            }
        }, 
        setWidget(widget){
            this.$refs['editor'].quill.focus()
            let range = this.$refs['editor'].quill.getSelection();
            let shortcode = '[[nuxpresso-widget id=' + widget.id + ']]'
            range ? 
                this.$refs['editor'].quill.insertText(range.index, shortcode ) :
                    this.$emit('message','Set a position in the editor to place the widget')
        },
        onEditorBlur(editor) {
            console.log('editor blur!', editor)
        },
        onEditorFocus(editor) {
            console.log('editor focus!', editor)
        },
        onEditorReady(editor) {
            if ( process.client ){
                //document.querySelector('[data-toggle="tooltip"]').tooltip()
            }
            console.log('editor ready!', editor)
        }
    }    
}
</script>

<style>
#editor > .ql-container > .ql-editor {
    min-height:20rem;
}
#editor > .ql-toolbar {
    background: #f0f0f0;
}
</style>