<template>
    <div class="flex flex-col" :data="init">
        <i class="material-icons m-auto p-2 border" v-if="$attrs.value">{{ $attrs.value }}</i>
        Icon Category
        <input type="text" v-model="search" @keyup="iconSearch" placeholder="search icon"/>
        <select v-if="!search"  v-model="groupicon">
            <option v-for="(group,i) in Object.keys(moka.icons)" :value="group">{{ group }}</option>
        </select> 
        <div class="flex flex-row flex-wrap overflow-y-auto" style="height:10rem;min-height:10rem;max-height:10rem" v-if="!search && groupicon">
            <i v-for="(icon,n) in moka.icons[groupicon]" class="flex flex-row flex-wrap material-icons cursor-pointer m-2" @click="$emit('input',icon)">{{ icon }}</i>
        </div>
        <div v-if="search.length > 2 && searchIcons" class="flex flex-row flex-wrap overflow-y-auto" style="height:10rem;min-height:10rem;max-height:10rem">
            <i v-for="(icon,n) in searchIcons" class="flex flex-row flex-wrap material-icons cursor-pointer m-2" @click="$emit('input',icon)">{{ icon }}</i>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'MokaSelectIcon',
    data:()=>({
        groupicon:'',
        allIcons: null,
        search: '',
        searchIcons: null
    }),
    computed:{
        ...mapState( ['moka'] ),
        init(){
            this.allIcons = Object.values(this.moka.icons).join(',').split(',')
        }
    },
    watch:{
        search(v){
            this.iconSearch()
        }
    },
    methods:{
        iconSearch(){
            if ( this.search.length > 1 ){
                this.searchIcons = this.allIcons.filter( icon => icon.indexOf( this.search ) > -1 )
            }
        }
    }
}
</script>
