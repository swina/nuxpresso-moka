<template>
    <div class="p-2 flex flex-col">
        <div class="grid grid-cols-2 grid-flow-row items-center" style="grid-template-columns:1fr .2fr .6fr .2fr;">
            <h3 class="">
                <i class="material-icons" v-if="editor" @click="editor=!editor">chevron_left</i>
                Articles
            </h3> 
            <button @click="createPage=!createPage">Create New</button>
            <div class="text-right">Category 
                <select v-model="filter">
                    <option value="">all</option>
                    <option v-for="category in moka.categories" :value="category.name">{{ category.name }}</option>
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

                    <th>Preview</th>
                    <th></th>
                </thead>
                <tr v-for="(article,a) in articles" class="cursor-pointer hover:bg-gray-100 p-1 border-b-2" @click="articleSlug=article.id,editor=!editor" v-if="isCategory(article)">
                    <template v-for="(col,c) in columns">
                        <td class="p-2">
                            <span v-if="col.field!='updated_at'">
                                <span v-if="col.field!='categories'">{{ article[col.field] }}</span>
                                <span v-else>{{ category(article[col.field]) }}</span>
                            </span>
                            <span v-else>{{ $moment ( article[col.field].split('T')[0] ) }}</span>
                        </td>
                    </template>
                    <td><span v-if="article.component">{{ article.component.name }}</span></td>
                    <td class="w-20">
                        <!--<span v-if="article.component">
                        {{ article.component.category}}
                        
                        </span>-->
                        <div v-if="article.component && article.component.image_uri" :style="'background-image:url(' + article.component.image_uri + ')'" class="h-12 bg-auto bg-no-repeat bg-cover"></div>
                    </td>
                    <td></td>
                    <!--<td><i class="material-icons text-sm" @click="articleSlug=article.id,editor=!editor">edit</i></td>-->
                </tr>    
            </table>
            <div class="flex flex-row justify-around text-center" v-if="!editor">
                <i class="material-icons mx-2 text-2xl" @click="prev">chevron_left</i>
                <i class="material-icons mx-2 text-2xl" @click="next">chevron_right</i>
            </div>
            <transition name="fade">
                <div v-if="currentArticle && editor" class="flex flex-row border-t p-1">
                    <section class="w-4/5 container relative text-sm" v-if="currentArticle && editor">
                        
                        <label>Title <span class="text-gray-400">#{{ currentArticle.id }}</span></label>
                        <input type="text" class="w-full text-2xl" v-model="currentArticle.title"/>
                        <label>Slug </label>
                        <input type="text" class="w-full text-2xl" v-model="currentArticle.slug" @blur="slugify()"/>
                        <label>Content</label>
                        <div class="flex flex-col">
                            <moka-text-editor v-model="currentArticle.content" :embeded="true"/>

                            <label>Excerpt</label>
                            <textarea class="text-sm" v-model="currentArticle.excerpt"></textarea>
                        </div>

                    </section>
                
                
                    <div class="w-1/5 ml-1 shadow p-2 text-sm bg-gray-200" v-if="currentArticle && editor">
                        <button class="warning mr-2" @click="editor=!editor">Close</button>
                        <button class="success" @click="save">Save</button>    
                        <div class="flex flex-col mt-6">
                            <div class="mb-2 flex flex-col">
                                Template <a href="#" @click="selectTemplate=!selectTemplate">View</a>
                                <select v-model="currentArticle.component" @change="checkTemplate">
                                    <option value="0">default</option>
                                    <option v-if="template.enabled" v-for="(template,t) in templates" :value="template.id"> {{ template.name }} </option>
                                </select>
                                <div v-if="currentArticle.component" :style="'background-image:url(' + templateImage + ')'" class="h-24 bg-auto bg-no-repeat bg-cover"></div>
                            </div>
                            <div class="mb-2 flex flex-col">
                                Category
                                <select v-model="currentArticle.categories" multiple>
                                    <option v-for="(category,c) in categories" :value="category"> {{ category.name }} </option>
                                </select>
                            </div>
                            <div><input type="checkbox" v-model="currentArticle.homepage"/> Homepage</div>
                            <div class="flex h-48">
                                <moka-image-placeholder :image="currentArticle.image" @click="media=!media" size="sm" @media="media=!media,editorImage=false" @noimage="currentArticle.image=null"/>
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

            <transition name="fade">
                <div v-if="selectTemplate" class="nuxpresso-modal w-4/5 p-2 border rounded bg-white">
                    <i class="material-icons absolute top-0 right-0 m-2" @click="selectTemplate=!selectTemplate">close</i>
                    <moka-templates :templates="templates" @set="setTemplate" @close="selectTemplate=!selectTemplate"/>
                </div>
            </transition>
            <transition name="fade">
                <div v-if="createPage" class="nuxpresso-modal border w-1/3 h-1/3 bg-white p-2 rounded shadow">
                    <div class="flex flex-col">
                        <label>Title</label>
                        <input type="text" v-model="newArticle.title"/>
                        <div class="my-2">
                            <button class="bg-gray-300 mr-2" @click="createPage=!createPage">Cancel</button>
                            <button class="success" @click="create">Create</button>
                        </div>
                    </div>
                </div>
            </transition>
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
import MokaTemplates from '@/components/articles/moka.articles.templates'
import MokaMedia from '@/components/media/media'
import { mapState } from 'vuex'
var self = this

export default {
    name: 'MokaArticles',
    components: { MokaTextEditor , MokaImagePlaceholder , MokaMedia , MokaTemplates },
    computed : { 
        ...mapState ( ['moka' ] ),
        templates (){
            return this.moka.components.filter(comp=>{ return comp.category === 'template' || comp.category === 'page' } )
        },
        templateImage(){
            if ( !this.currentArticle.component ) return ''
            return this.templates.filter ( templ => { return templ.id === this.currentArticle.component } )[0].image_uri
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
            selectTemplate: false,
            media: false,
            widgets: false,
            start: 0,
            limit: 10,
            columns: [
                { field: 'id' , label: '#' },
                { field: 'title' , label: 'Title' },
                { field: 'categories' , label: 'Category'},
                { field: 'slug' , label: 'Slug' },
                { field: 'homepage' , label: 'Homepage' },
                { field: 'lang' , label: 'Language' },
                { field: 'updated_at' , label: 'Updated'}
            ],
            createPage: false,
            newArticle: {
                title: 'A new page',
                SEO: {
                    title: '',
                    description: 'A new nuxpresso page'
                }
            }
            
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
        articles(data){
            this.$store.dispatch ( 'loadArticles' , data )
        }
    },
    methods:{
        slugify(){
            console.log ( 'slugify ...' , this.$slugify(this.currentArticle.slug) )
            return this.currentArticle.slug = this.$slugify(this.currentArticle.slug)
        },
        isCategory(article){
            if ( !this.filter ) return true
            console.log ( article.categories.length )
            if ( article.categories.length ){
                console.log ( article.categories[0].name , this.filter )
                if ( article.categories[0].name === this.filter ){
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        },
        category(cat){
            return cat.map(c => { return c.name} ).join(',')
        },
        setTemplate(id){
            this.currentArticle.component = parseInt(id)
            this.selectTemplate =! this.selectTemplate
        },
        checkTemplate(){
            if ( this.currentArticle.component === '0' ){
                let template = this.templates.filter ( templ => {
                    return templ.default 
                })[0].id
                this.currentArticle.component = template
            }
        },
        save(){
            let vm = this
            vm.currentArticle.id = parseInt(vm.currentArticle.id)
            this.$http.put ( 'articles/' + vm.currentArticle.id , vm.currentArticle ).then ( response => {
                //vm.currentArticle = response.data
                console.log ( response )
                this.$store.dispatch('message','Article has been saved successfully')
                this.$apollo.queries.articles.refetch()
            }).catch ( error => {
                vm.$emit('message','An error occurred. Check you console log')
                console.log ( error )
            })
            
        },
        create(){
            this.$http.post ( 'articles' , this.newArticle ).then ( response => {
                this.$store.dispatch('message','Article has been created successfully')
                this.$apollo.queries.articles.refetch()
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
        next(){
            this.start += this.limit
        },
        prev(){
            if ( this.start > 0 ){
                this.start -= this.limit
            }
            
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