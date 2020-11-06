<template>
    
    <!--<div class="nuxpresso-modal rounded w-full md:w-1/3 p-4 flex flex-col overflow-y-auto" v-if="menus">
        <i class="material-icons absolute top-0 right-0 cursor-pointer" @click="$emit('close')">close</i>
        <h4>Menus</h4>
        <div  class="w-full flex flex-row flex-wrap p-2 justify-between">
            <div v-for="(component,c) in menus" class="flex flex-col p-2">
                <div class="hover:bg-blue-200 hover:text-black flex-auto flex flex-col justify-center  p-1 text-center text-xs w-24 h-24 cursor-pointer" @click="$emit('add',component)">
                    <i class="material-icons text-blue-800">menu</i>
                    <div class="leading-4">{{ component.name }}</div>
                </div>
            </div>
        </div>
    </div>
    -->
    <div v-if="menu" class="w-full z-max bg-white overflow-y-auto h-auto mb-2 border shadow">
        <div class="flex flex-col items-center cursor-pointer bg-gray-100 p-1 my-1">
           
            <div class="flex flex-row">
                <span class="font-bold" @click="showItems=!showItems">Menu Items</span> 
                <i class="material-icons nuxpresso-icon-circle text-xs ml-2 mr-4" @click="addItem">add</i>
            </div>
        </div>
        <transition name="fade">
            <draggable v-model="items">
                <div v-for="(item,i) in items" class="flex flex-col text-sm cursor-pointer pb-1" v-if="showItems">
                    <div class="bg-gray-400 p-1 flex flex-col" @click="currentIndex<0||currentIndex!=i?currentIndex=i:currentIndex=-1">{{ item.label }}</div>
                    <transition name="fade"> 
                        <div class="bg-gray-200 p-1 flex flex-col mb-1" v-if="currentIndex===i">
                            
                            <input type="text" v-model="items[i].label" @focus="currentFocus=i"/>
                            <div v-if="currentFocus===i" class="flex flex-col">
                                <label>URL</label>
                                <input type="text" v-model="items[i].link" @focus="currentFocus=i"/>
                                <label>Page</label>
                                <select v-model="items[i].link" @focus="currentFocus=i">
                                    <option v-for="(opt,o) in moka.articles" :value="'articles/' + opt.slug">{{ opt.title }}</option>
                                </select>
                            </div>
                            <a href="#" class="text-xs" @click="items.splice(i,1)">Remove</a><a href="#" class="text-xs" @click="addSubMenu(i)">Add Submenu</a>
                        </div>
                    </transition>
                    <div v-if="item.submenu && currentIndex===i" v-for="(sub,s) in item.submenu">
                        <div  @click="subIndex<0||subIndex!=s?subIndex=s:subIndex=-1" class="ml-2 border p-1 bg-gray-300 mb-1">
                        {{ sub.label}}
                        </div>
                        <transition name="fade">
                        <div class="bg-gray-100 ml-3 mr-1 flex flex-col mb-1" v-if="subIndex===s">
                            
                            <input type="text" v-model="items[i].submenu[s].label" @input="subIndex=-1,subIndex=s"/>
                            <div class="flex flex-col">
                                <label>URL</label>
                                <input type="text" v-model="items[i].submenu[s].link"/>
                                <label>Page</label>
                                <select v-model="items[i].submenu[s].link">
                                    <option v-for="(opt,o) in moka.articles" :value="'articles/' + opt.slug">{{ opt.title }}</option>
                                </select>
                            </div>
                            <a href="#" class="text-xs" @click="items[currentIndex].submenu.splice(s,1),subIndex=-1,subIndex=s">Remove</a>
                        </div>
                    </transition>
                    </div>
                </div>
            </draggable>
        </transition>
         <div class="flex flex-col w-full mt-2 p-1">
                <div class="flex flex-row">
                    <input type="checkbox" v-model="menu.responsive"/> Responsive
                </div>
                <div class="flex flex-row mt-2">
                    Orientation
                    <select v-model="menu.type" class="ml-2">
                        <option value="horizontal">Horizontal</option>
                        <option value="vertical">Vertical</option>
                    </select>
                </div>
                <div class="flex flex-row mt-2">
                    Position
                    <select v-model="menu.css.align" class="ml-2">
                        <option value="justify-start">left</option>
                        <option value="justify-center">center</option>
                        <option value="justify-end">right</option>
                    </select>
                </div>
            </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import { mapState } from 'vuex'
export default {
    name: 'NuxpAdminReusableMenus',
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
        
        /*menu(){
            console.log ( this.moka.articles )
            this.items = this.$attrs.menu.items
            return true
        },
        */
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
                title: ''
            })
        },
        addSubMenu(i){
            !this.items[i].submenu ? this.items[i].submenu = [] : null
            this.items[i].submenu.push ( {
                label: 'submenu item #' + parseInt(this.items[i].submenu.length+1),
                link: '#'
            })
            this.currentIndex = -1
            this.currentIndex = i
        },
        setAlign(){
            
        }
    }
}
</script>