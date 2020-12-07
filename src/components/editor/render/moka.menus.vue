<template>
    <div v-if="menu" class="w-full z-max bg-gray-800 text-white overflow-y-auto h-full mb-2 shadow">
        <div class="flex flex-col items-center cursor-pointer p-1 my-1">
           
            <div class="flex flex-row items-center">
                <span class="font-bold" @click="showItems=!showItems">Menu Items</span> 
                <button class="xs ml-2" @click="addItem">Add</button>
                <i class="material-icons nuxpresso-icon-circle text-xs ml-2 mr-4" @click="addItem">add</i>
            </div>
        </div>
        <transition name="fade">
            <div class="absolute bg-gray-800 text-gray-200 overflow-y-auto h-full w-full p-1">
            <draggable v-model="items" class="relative">
                <div v-for="(item,i) in items" class="flex flex-col text-sm cursor-pointer pb-1" v-if="showItems">
                    <div class="bg-gray-600 p-1 flex flex-col" @click="currentIndex<0||currentIndex!=i?currentIndex=i:currentIndex=-1">{{ item.label }}</div>
                    <transition> 
                        <div class="bg-gray-800 p-1 flex flex-col mb-1" v-if="currentIndex===i">
                            
                            <input class="dark" type="text" v-model="items[i].label" @focus="currentFocus=i"/>
                            <div v-if="currentFocus===i" class="flex flex-col">
                                <label>URL</label>
                                <input class="dark" type="text" v-model="items[i].link" @focus="currentFocus=i"/>
                                <label>Page</label>
                                <select class="dark" v-model="items[i].link" @focus="currentFocus=i">
                                    <option v-for="(opt,o) in articles" :value="'/articles/' + opt.slug">{{ opt.title }}</option>
                                </select>
                            </div>
                            <a href="#" class="text-xs" @click="items.splice(i,1)">Remove</a><a href="#" class="text-xs" @click="addSubMenu(i)">Add Submenu</a>
                        </div>
                    </transition>
                    <div v-if="item.submenu && currentIndex===i" v-for="(sub,s) in item.submenu">
                        <div  @click="subIndex<0||subIndex!=s?subIndex=s:subIndex=-1" class="ml-2 border p-1 bg-gray-700 mb-1">
                        {{ sub.label}}
                        </div>
                        <transition name="fade">
                        <div class="bg-gray-800 ml-3 mr-1 flex flex-col mb-1" v-if="subIndex===s">
                            
                            <input class="dark" type="text" v-model="items[i].submenu[s].label" @input="subIndex=-1,subIndex=s"/>
                            <div class="flex flex-col">
                                <label>URL</label>
                                <input class="dark" type="text" v-model="items[i].submenu[s].link"/>
                                <label>Page</label>
                                <select class="dark" v-model="items[i].submenu[s].link">
                                    <option v-for="(opt,o) in articles" :value="'/articles/' + opt.slug">{{ opt.title }}</option>
                                </select>
                            </div>
                            <a href="#" class="text-xs" @click="items[currentIndex].submenu.splice(s,1),subIndex=-1,subIndex=s">Remove</a>
                        </div>
                    </transition>
                    </div>
                </div>
            </draggable>
                <div class="flex flex-col">
                    
                    <div class="text-sm">
                        Submenu CSS
                        <textarea class="dark w-full" v-model="menu.css.submenu"></textarea>
                    </div>
                </div>
                <div class="flex flex-col">
                    <div class="flex flex-row">
                        <input type="checkbox" v-model="menu.responsive"/> Responsive
                    </div>
                    <div  v-if="menu.responsive" class="text-sm">
                        CSS Responsive
                        <textarea class="dark w-full" v-model="menu.css.responsive"></textarea>
                    </div>
                    <span class="text-xs">Max 1 responsive menu x page</span>
                </div>
                <div class="flex flex-col mt-2">
                    Orientation
                    <select v-model="menu.type" class="dark">
                        <option value="horizontal">Horizontal</option>
                        <option value="vertical">Vertical</option>
                    </select>
                </div>
                <div class="flex flex-col mt-2">
                    Position
                    <select v-model="menu.css.align" class="dark">
                        <option value="justify-start">left</option>
                        <option value="justify-center">center</option>
                        <option value="justify-end">right</option>
                    </select>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import queryArticles from '@/apollo/articles-admin.gql'
import draggable from 'vuedraggable'
import { mapState } from 'vuex'
export default {
    name: 'MokaMenuEditor',
    components: { draggable },
    data:()=>({
        currentIndex: -1,
        currentFocus: -1,
        subIndex: -1,
        showItems: true,
        items: null,
        menuAlign: ''
    }),
    props: [ 'menu' ],
    computed:{
        ...mapState ( ['moka'] ),
        
    },
    mounted(){
        this.items = this.menu.items
    },
    watch: {
        items(v){
            this.$emit('menu',this.items)
        }
    },
    methods:{
        addItem(){
            this.items.push ( {
                label: 'new item',
                link: '#',
                title: '',
                id: this.$randomID()
            })
        },
        addSubMenu(i){
            !this.items[i].submenu ? this.items[i].submenu = [] : null
            this.items[i].submenu.push ( {
                label: 'submenu item #' + parseInt(this.items[i].submenu.length+1),
                link: '#',
                id: this.$randomID()
            })
            this.currentIndex = -1
            this.currentIndex = i
        },
        setAlign(){
            
        }
    },
    apollo: {
        articles : {
            query: queryArticles,
            update: data => data.articles.sort( (a,b) => a.title - b.title ) 
        }
    }
}
</script>