<template>
    <div :data="init">
        <!-- material icons -->
        <div v-if="$attrs.tag==='icon'" class="flex flex-col">
            <i class="material-icons m-auto p-2 border" v-if="$attrs.value">{{ $attrs.value }}</i>
            <div class="text-xs text-center">{{ $attrs.value }}</div>
            <input type="text" class="w-full" v-model="search" @keyup="iconSearch" placeholder="search icon"/>
            Icon Category
            <select class="w-full" v-if="!search"  v-model="groupicon">
                <option v-for="(group,i) in Object.keys(moka.icons)" :value="group">{{ group }}</option>
            </select> 
            <div class="flex flex-row flex-wrap overflow-y-auto" style="height:10rem;min-height:10rem;max-height:10rem" v-if="!search && groupicon">
                <i v-for="(icon,n) in moka.icons[groupicon]" class="flex flex-row flex-wrap material-icons cursor-pointer m-2" @click="$emit('input',icon)">{{ icon }}</i>
            </div>
            <div v-if="search.length > 2 && searchIcons" class="flex flex-row flex-wrap overflow-y-auto" style="height:10rem;min-height:10rem;max-height:10rem">
                <i v-for="(icon,n) in searchIcons" class="flex flex-row flex-wrap material-icons cursor-pointer m-2" @click="$emit('input',icon)">{{ icon }}</i>
            </div>
        </div> 
        <!-- bootstrap icons -->
        <div v-if="$attrs.tag === 'icon_bt'" class="flex flex-col">
            
            <div class="flex flex-row">
            <input type="text" placeholder="search icon" v-model="bt_icon_search"/>
                <i class="bi-caret-left-fill" @click="bt_start=bt_start-100" v-if="bt_start>0"></i>
                <i class="bi-caret-right-fill" @click="bt_start=bt_start+100"></i>
            </div>
            <div class="flex mt-2 h-48 flex-row px-1 bg-white items-start flex-wrap overflow-y-auto" style="" v-if="bt_icons">
                <template v-for="icon in bt_icons_found">
                    <i :class="'bi-' + icon + ' text-xl m-1 float-left'" :title="icon" @click="$emit('input',icon)"></i>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import booticons from '@/plugins/bootstrap.icons'
export default {
    name: 'MokaSelectIcon',
    data:()=>({
        groupicon:'',
        allIcons: null,
        search: '',
        searchIcons: null,
        bt_icons: null,
        bt_icon_search:'',
        bt_icons_found:null,
        bt_start: 0
    }),
    mounted(){
        this.bt_icons = booticons
        this.bt_icon_search = this.$attrs.value 
        this.populateIcons()
    },
    computed:{
        ...mapState( ['moka'] ),
        init(){
            this.allIcons = Object.values(this.moka.icons).join(',').split(',')
        }
    },
    watch:{
        search(v){
            this.iconSearch()
        },
        bt_icon_search(v){
            if ( v ){
                this.bt_icons_found = this.bt_icons.filter ( icon => icon.includes(v) )
            } else {
                this.bt_start = 0 
                this.populateIcons()
            }
        },
        bt_start(v){
            this.populateIcons()
        }
    },
    methods:{
        populateIcons(){
            this.bt_icons_found = []
            for ( var n = this.bt_start ; n < (this.bt_start+100) ; n++){
                this.bt_icons_found.push ( this.bt_icons[n] )
            }
        },
        iconSearch(){
            if ( this.search.length > 1 ){
                this.searchIcons = this.allIcons.filter( icon => icon.indexOf( this.search ) > -1 )
            }
        }
    }
}
</script>
