<template>
<div class="fixed overflow-y-auto border-l top-0 right-0 w-1/3 z-2xtop h-screen bg-white p-1 flex flex-col">
    <i class="material-icons z-2xtop absolute top-0 right-0 m-1" @click="$emit('close')">close</i>
    <div v-if="mokacomponents" class="mb-10 flex flex-row flex-wrap justify-around p-4">
        
        <template v-for="(template,index) in mokacomponents">
            <div class="w-1/2 flex flex-col mb-4 cursor-pointer relative p-1 justify-center items-center" @click="$emit('add',template.id)" :title="template.name">
                <span class="text-sm p-1">{{ template.name.substring(0,20) }}</span>
                <div v-if="template.image && template.image.url" :style="'background-image:url(' + $imageURL(template.image) + ')'" class="h-24 w-full bg-center bg-no-repeat bg-contain shadow" ></div>
                <div v-if="template.image_uri"  :style="'background-image:url(' + template.image_uri + ')'" class="h-24 w-full bg-center bg-no-repeat bg-contain shadow" ></div>
                
                <div v-if="!template.image && !template.image_uri" class="h-24 w-full shadow flex flex-col items-center"><img class="w-16 m-auto opacity-50" src="img/logo.png"/></div>
            </div>
        </template>
    </div>
    <div class="fixed bottom-0 w-1/3 border-t bg-white p-2 flex flex-row justify-around items-center text-center">
        <i class="material-icons mx-2 text-2xl" @click="prev">chevron_left</i>
        <select v-model="filter">
            <option v-for="cat in $categories()" :value="cat">{{ cat }}</option>
        </select>
        <i class="material-icons" @click="search=!search">search</i>
        <i class="material-icons mx-2 text-2xl" @click="next">chevron_right</i>
    </div>
    <transition name="fade">
        <div v-if="search" class="fixed z-2xtop bottom-0 mb-10 w-1/3 bg-white p-2 flex flex-row flex-wrap">
             <button class="mr-2 mt-1 capitalize w-24 border hover:bg-blue-400 hover:text-white border-blue-400 bg-white text-blue-400 focus:bg-gray-600 focus:text-white focus:outline-none rounded-none" @click="start=0,tags=''">all</button>
            <template v-for="tipo in moka.elements.types.types">
                <button class="mr-2 mt-1 capitalize w-24 border hover:bg-blue-400 hover:text-white border-blue-400 bg-white text-blue-400 focus:bg-gray-600 focus:text-white focus:outline-none rounded-none" @click="tags=tipo">{{ tipo }}</button>
            </template>
        </div>
    </transition>
</div>
</template>

<script>
import componentsQry from '@/apollo/components.preview.gql'
import { mapState } from 'vuex' 
export default {
    name: 'NuxpressoMokaTemplates',
    props:['templates'],
    data:()=>({
        start: 0,
        limit: 8,
        filter: 'widget',
        tags: '',
        search: false,
        categories: [
            'component',
            'slider',
            'widget',
            'page',
            'template',
            'archive',
            'starred'
        ]
    }),
    computed: {
        ...mapState ( ['moka'] ),
        /*categories(){
            let arr = this.$arrayGroup ( this.mokacomponents , 'category' , 'id' )
            return arr.keys
        },
        mokatemplates(){
            //this.start = 0
            //this.limit = 8
            return this.mokacomponents.filter(comp=>{ return comp.category === this.filter || comp.tags === this.filter } )
        }
        */
    },
    watch:{
        filter(v){
            this.tags = ''
            this.search = false
        },
    },
    methods: {
        next(){
            //if ( this.start < ( this.mokatemplates.length - this.limit ) ){
                this.start += this.limit
            //}
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
            variables(){
                return this.tags ?
                {
                    category: this.filter,
                    type: this.tags,
                    start: this.start,
                    limit: this.limit
                } :
                {
                    category: this.filter,
                    start: this.start,
                    limit: this.limit
                } 
            },
            update: data => data.components
        }
    }
}
</script>