<template>
<div class="fixed overflow-y-auto border-l top-0 right-0 w-1/3 z-2xtop h-screen bg-white p-1 flex flex-col">
    <i class="material-icons z-2xtop absolute top-0 right-0 m-1" @click="$emit('close')">close</i>
    <div v-if="mokacomponents" class="mb-10 flex flex-row flex-wrap justify-around p-4">
        
        <template v-for="(template,index) in mokatemplates">
            <div class="w-1/2 flex flex-col mb-4 cursor-pointer relative p-1 justify-center items-center" v-if="index>=start && index < (start+limit)" @click="$emit('add',template.id)">
                <span v-if="!template.image_uri || !template.image" class="text-sm p-1">{{ template.name }}</span>
                <div v-if="template.image && template.image.url" :style="'background-image:url(' + $imageURL(template.image) + ')'" class="h-24 w-full bg-center bg-no-repeat bg-contain shadow" :title="template.name"></div>
            </div>
        </template>
    </div>
    <div class="fixed bottom-0 w-1/3 border-t bg-white p-2 flex flex-row justify-around items-center text-center">
        <i class="material-icons mx-2 text-2xl" @click="prev">chevron_left</i>
        <select v-model="filter">
            <option v-for="cat in categories" :value="cat">{{ cat }}</option>
        </select>
        <i class="material-icons" @click="search=!search">search</i>
        <i class="material-icons mx-2 text-2xl" @click="next">chevron_right</i>
    </div>
    <transition name="fade">
        <div v-if="search" class="fixed z-2xtop bottom-0 mb-10 w-1/3 bg-white p-2 flex flex-row flex-wrap">
             <button class="mr-2 mt-1 capitalize w-24 border hover:bg-blue-400 hover:text-white border-blue-400 bg-white text-blue-400 focus:bg-gray-600 focus:text-white focus:outline-none rounded-none" @click="filter='widget'">all</button>
            <template v-for="tipo in moka.elements.types.types">
                <button class="mr-2 mt-1 capitalize w-24 border hover:bg-blue-400 hover:text-white border-blue-400 bg-white text-blue-400 focus:bg-gray-600 focus:text-white focus:outline-none rounded-none" @click="filter=tipo">{{ tipo }}</button>
            </template>
        </div>
    </transition>
</div>
</template>

<script>
import componentsQry from '@/apollo/components.gql'
import { mapState } from 'vuex'
export default {
    name: 'NuxpressoMokaTemplates',
    props:['templates'],
    data:()=>({
        start: 0,
        limit: 12,
        filter: 'widget',
        search: false
    }),
    computed: {
        ...mapState ( ['moka'] ),
        categories(){
            let arr = this.$arrayGroup ( this.mokacomponents , 'category' , 'id' )
            return arr.keys
        },
        mokatemplates(){
            this.start = 0
            this.limit = 12
            return this.mokacomponents.filter(comp=>{ return comp.category === this.filter || comp.tags === this.filter } )
        }
    },
    methods: {
        next(){
            if ( this.start < ( this.mokatemplates.length - this.limit ) ){
                this.start += this.limit
            }
        },
        prev(){
            if ( this.start > 0 ){
                this.start -= this.limit
            }
            
        }
    },
    apollo:{
        mokacomponents: {
            query: componentsQry,
            update: data => data.components
        }
    }
}
</script>