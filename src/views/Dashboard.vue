<template>
    <div class="flex flex-row w-full" :data="init">
        <nav class="w-2/12 fixed min-h-screen bg-gray-800 text-white flex flex-col cursor-pointer">
            <div class="flex flex-row items-center justify-center">
                <img src="../assets/layers.png" class="h-10 w-10 mr-2"/> 
                <div class="mr-2">N U X P R E S S O</div>
            </div>
            <template v-if="menu && menu.items" v-for="item in menu.items">
                 <div v-if="item.component" class="flex flex-row items-center py-1 font-thin text-sm p-2 hover:bg-gray-700" @click="section=item.component,label=item.label">
                    <i v-if="item.icon" class="material-icons mr-2">{{ item.icon }}</i> {{ item.label }}
                 </div>
                 <div v-else class="flex flex-row items-center py-1 font-thin text-sm p-2 hover:bg-gray-700" @click="label=item.label">
                    <i v-if="item.icon" class="material-icons mr-2">{{ item.icon }}</i> {{ item.label }}
                 </div>
                 <transition name="fade">
                 <div v-if="item.hasOwnProperty('items') && label===item.label">
                    <template v-for="sub in item.items">
                        <div class="flex flex-row items-center py-1 pl-10 font-thin text-sm p-2 hover:bg-gray-700" @click="section=sub.component,filter=sub.filter">
                            {{ sub.label }}
                        </div>
                    </template>
                 </div>
                 </transition>

            </template>
            <!--
            <div class="flex flex-row items-center py-1 font-thin text-sm p-2 hover:bg-gray-700" @click="section='MokaHome'"><i class="material-icons mr-2">home</i> Home</div>
            <div class="flex flex-row items-center py-1 font-thin text-sm p-2 hover:bg-gray-700" @click="section='MokaArticles'"><i class="material-icons mr-2">article</i> Articles</div>
            <div class="flex flex-row items-center py-1 font-thin text-sm p-2 hover:bg-gray-700" @click="section='MokaList',filter=''"><i class="material-icons mr-2">widgets</i> Mokas</div>
            <div class="py-1 font-thin text-sm p-2 pl-10 hover:bg-gray-700" @click="section='MokaList',filter='page'">Pages</div>
            <div class="py-1 font-thin text-sm p-2 pl-10 hover:bg-gray-700" @click="section='MokaList',filter='template'">Templates</div>
            <div class="py-1 font-thin text-sm p-2 pl-10 hover:bg-gray-700" @click="section='MokaList',filter='widget'">Widgets</div>
            <div class="py-1 font-thin text-sm p-2 pl-10 hover:bg-gray-700" @click="section='MokaList',filter='slider'">Sliders</div>
            <div class="py-1 font-thin text-sm p-2 pl-10 hover:bg-gray-700" @click="section='MokaList',filter='element'">Elements</div>
            <div class="py-1 font-thin text-sm p-2 pl-10 hover:bg-gray-700" @click="section='MokaList',filter='component'">Components</div>
            <div class="py-1 font-thin text-sm p-2 pl-10 hover:bg-gray-700" @click="section='MokaList',filter='archive'">Archive</div>
            <div class="py-1 font-thin text-sm p-2 pl-10 hover:bg-gray-700" @click="section='MokaList',filter='starred'">Starred</div>
            <div class="flex flex-row items-center py-1 font-thin text-sm p-2 hover:bg-gray-700" @click="section='MokaMedia'"><i class="material-icons mr-2">photo</i> Media</div> 
            <div class="flex flex-row items-center py-1 font-thin text-sm p-2 hover:bg-gray-700" @click="section='MokaSettings'"><i class="material-icons mr-2">settings</i> Settings</div> 
            -->
            <div class="absolute w-full bottom-0 m-auto mb-2 text-center font-thin ">
                <!--<img alt="Vue logo" class="m-auto w-16" src="../assets/new-logo.png">-->
                <div class="text-xl w-16 m-auto h-16 bg-gray-900 hover:border-gray-200 border-transparent border rounded-full flex flex-col text-gray-300 font-black animate-pulse cursor-pointer" @click="$router.push('/')">
                <div class="m-auto">M O K A</div>
                </div>
                <div class="text-gray-500 text-xs mt-1 font-hairline">S T U D I O</div>
            </div>
           
        </nav>
        <div class="w-full flex flex-row">
            <div class="w-2/12"></div>
            <div class="w-10/12">
                <component :is="component" :component="component" :filter="filter"/>
            </div>
        </div>
    </div>
</template>

<script>
import MokaList from '@/components/moka/moka.list'
//import MokaTest from '@/components/moka/moka.components'
import MokaArticles from '@/components/articles/moka.articles'
import MokaMedia from '@/components/media/media'
//import MokaGrid from '@/components/moka/moka.grid'
import articlesQry from '@/apollo/articles.gql'
import categoriesQry from '@/apollo/categories.gql'
import MokaHome from '@/views/Home'
import MokaSettings from '@/components/settings/settings'
import MokaStage from '@/components/settings/stage'
import MokaDeploy from '@/components/settings/deploy'
import { mapState } from 'vuex'
import menu from '@/plugins/app'

export default {
    components: {
        MokaList,  MokaArticles, MokaMedia,  MokaHome , MokaSettings, MokaStage, MokaDeploy
    },
    data:()=>({
        label: '',
        section: '',
        component: '',
        filter: '',
        menu: null
    }),
    computed:{
        ...mapState ( [ 'user'] ),
        init(){
            this.section = this.user.dashboard
            this.menu = menu
            return true
        },
        
    },
    watch:{
        section(v){
            this.$store.dispatch('dashboard',v)
            this.component = v
        },
        articles(data){
            this.$store.dispatch ( 'loadArticles' , data )
        },
        categories(data){
            this.$store.dispatch ( 'loadCategories' , data )
        }
    },
    mounted(){
        console.log ( menu )
        this.menu = menu
        //this.section = 'MokaHome'
    },
    apollo:{
        articles:{
            query: articlesQry
        },
        categories:{
            query: categoriesQry
        }
    }
}
</script>