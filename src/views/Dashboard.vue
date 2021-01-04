<template>
    <div class="flex flex-row w-full" :data="init">
        
        <!-- DASHBOARD MAIN MENU -->
        <nav class="w-2/12 fixed min-h-screen bg-gray-800 text-white flex flex-col cursor-pointer">
            <div class="flex flex-row items-center justify-center">
                <img src="../assets/layers.png" class="h-10 w-10 mr-2"/> 
                <div class="mr-2">N U X P R E S S O</div>
            </div>

            <!-- MENU DEFINED IN @/plugins/app.js -->
            <template v-if="menu && menu.items" v-for="item in menu.items">
                 <div :key="item.label" v-if="item.component" :class="'flex flex-row items-center py-1 font-thin text-sm p-2 hover:bg-gray-700 ' + activeItem(item.component)" @click="section=item.component,label=item.label,filter=item.filter,$store.dispatch('dashboard_filter','')">
                    <i v-if="item.icon" class="material-icons mr-2">{{ item.icon }}</i> {{ item.label }}
                 </div>
                 <div v-else :key="item.label" class="flex flex-row items-center py-1 font-thin text-sm p-2 hover:bg-gray-700" @click="label=item.label">
                    <i v-if="item.icon" class="material-icons mr-2">{{ item.icon }}</i> {{ item.label }}
                 </div>
                 <transition name="fade">
                 <div v-if="item.hasOwnProperty('items') && ( label===item.label || user.dashboard === item.component)">
                    <template v-for="sub in item.items">
                        <div :key="sub.label" :class="'flex flex-row items-center py-1 pl-10 font-thin text-sm p-2 hover:bg-gray-700 ' + active(sub.filter)" @click="section=sub.component,filter=sub.filter,$store.dispatch('dashboard_filter',filter)">
                            {{ sub.label }}
                        </div>
                    </template>
                 </div>
                 </transition>

            </template>

            <!-- LOGOUT -->
            <div class="flex flex-row items-center py-1 font-thin text-sm p-2 hover:bg-gray-700" @click="$router.push('logout')">
                <i class="material-icons mr-2">lock_open</i> Logout
            </div>

            <!-- LOGO -->
            <div class="absolute w-full bottom-0 m-auto mb-2 text-center font-thin ">
                <div class="text-xl w-16 m-auto h-16 bg-gray-900 hover:border-gray-200 border-transparent border rounded-full flex flex-col text-gray-300 font-black animate-pulse cursor-pointer" @click="$router.push('/')">
                <div class="m-auto">M O K A</div>
                </div>
                <div class="text-gray-500 text-xs mt-1 font-hairline">S T U D I O</div>
            </div>
           
        </nav>

        <!-- LOAD COMPONENT -->
        <div class="w-full flex flex-row">
            <div class="w-2/12"></div>
            <div class="w-10/12">
                <!-- <component v-if="moka.components" :is="component" :component="component" :filter="filter"/> -->
                <component :is="component" :component="component" :filter="filter"/>
                <div v-if="moka.loading">
                    <div class="fixed bottom-0 left-0 shadow z-2xtop w-2/12 p-2 bg-blue-300 text-sm">Loading data ...</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import MokaList from '@/components/moka/moka.list'
import MokaArticles from '@/components/articles/moka.articles'
import MokaMedia from '@/components/media/media'
import articlesQry from '@/apollo/articles.gql'
import categoriesQry from '@/apollo/categories.gql'
import MokaHome from '@/views/Home'
import MokaSettings from '@/components/settings/settings'
import MokaStage from '@/components/settings/stage'
import MokaDeploy from '@/components/settings/deploy'
import MokaGrid from '@/components/editor/render/moka.grids'
import { mapState } from 'vuex'
import menu from '@/plugins/app'

export default {
    name: 'MokaDashboard',
    components: {
        MokaList,  MokaArticles, MokaMedia,  MokaHome , MokaSettings, MokaStage, MokaDeploy , MokaGrid
    },
    data:()=>({
        label: '',
        section: '',
        component: '',
        filter: '',
        menu: null
    }),
    computed:{
        ...mapState ( [ 'moka' , 'user'] ),
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
    beforeMount(){
      //this.$store.dispatch('loadComponents')
      this.$store.dispatch('loadElements')
      //this.$store.dispatch('loadMedia')
    },
    methods:{
        activeItem(component){
            return component === this.user.dashboard && !this.user.dashboard_filter ? 'bg-gray-600' : ''
        },
        active(filter){
            return filter === this.user.dashboard_filter ? 'bg-gray-600' : ''
        }
    },
    apollo:{
        articles:{
            query: articlesQry
        },
        categories:{
            query: categoriesQry
        },
    }
}
</script>