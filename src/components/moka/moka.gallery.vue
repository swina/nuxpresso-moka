<template>
    <div v-if="init">
        <div v-if="$attrs.gallery" class="moka-components-gallery flex flex-col md:grid md:grid-cols-4 md:grid-flow-cols md:gap-8 w-full items-start justify-start cursor-pointer object-fit" style="grid-auto-rows: .5fr;">
            <moka-loading v-if="!objects"/>
            <!--<div v-if="!objects" class="nuxpresso-modal border-none shadow-none p-1">
                <i class="material-icons animate-spin  text-5xl text-gray-600">bubble_chart</i>
            </div>-->
            <div v-for="(comp,c) in objects" class="mb-2 text-sm border  shadow-lg rounded-lg justify-center flex flex-col h-full" :title="comp.description">
                <div class="flex-1 relative object-cover ">
                    <div class="px-1 bg-gray-700 text-gray-300 w-full rounded-tl rounded-tr  flex flex-row items-center">
                        {{comp.name}}
                    </div>
                    
                    <div class="h-48 bg-contain bg-center bg-no-repeat" v-if="comp.image_uri || comp.image" :style="'background-image:url(' + background(comp) + ')'" title="Click to preview" @click="selectComponent(comp.id,'preview')">
                    </div> 
                    <!--<div class="h-48 bg-contain bg-center bg-no-repeat" v-if="comp.image && comp.image.url" :style="'background-image:url(' + comp.image.url + ')'" title="Click to preview" @click="selectComponent(comp.id,'preview')">   
                    </div>-->
                    
                    <div v-else class="h-48" title="Click to preview" @click="$emit('preview',comp)"></div>
                    
                    <div class="px-1 absolute bottom-0 rounded-br rounded-bl bg-gray-300 items-center flex flex-row w-full text-left text-xs justify-between">
                        <div>{{$moment(comp.updated_at)}}</div>
                        <i class="ml-2 material-icons text-gray-500 hover:text-blue-500" title="Delete" @click="index=c,current=comp.id,confirmModal=!confirmModal">delete</i>
                        <i class="ml-2 material-icons text-gray-500 hover:text-blue-500" title="Duplicate" @click="selectComponent(comp.id,'duplicate')">file_copy</i>
                        <i class="material-icons xs ml-2 text-gray-500 hover:text-blue-500" title="Preview" @click="selectComponent(comp.id,'preview')">preview</i>
                        <i class="material-icons xs ml-2 text-gray-500 hover:text-blue-500" title="Edit" @click="selectComponent(comp.id,'component')">edit</i>
                    </div>
                </div>
            </div>
        </div>    
        <moka-table v-if="!$attrs.gallery" :components="objects" ctx="components" @component="selectComponentTable" />


        <transition name="fade">
            <div class="nuxpresso-modal bg-white border shadow p-4 z-max" v-if="confirmModal">
                <h5>Delete this object ?</h5>
                <button @click="confirm=false,confirmModal=!confirmModal">No</button>
                <button class="ml-2 danger" @click="confirm=true,confirmModal=!confirmModal,$emit('remove',current)">Yes, delete</button>
            </div>  
        </transition>
    </div>
</template>

<script>
import componentsQry from '@/apollo/components.filter.gql'
import MokaTable from '@/components/table'

import { mapState } from 'vuex'
export default {
    name: 'MokaBlocksGallery',
    components: { MokaTable },
    data:()=>({
        confirm: false,
        confirmModal: false,
        current: null,
        index: null,
        objects: null,
        components: null
    }),
    props: ['filter','type'],
    computed:{
        ...mapState ( ['moka'] ),
        init(){
            //let blocks = require ('../../assets/blocks/' + this.filter + '.json')
            //console.log ( blocks )
            this.objects = this.blocks
            this.$store.dispatch('setBlocks',this.blocks)
            return true
        }
    },
    mounted(){
        this.$apollo.queries.blocks.refetch()
        this.objects = this.blocks
    },
    watch:{
        type(v){
            v ? this.objects = this.blocks.filter ( comp => { return comp.tags === v } ) 
                : this.objects = this.blocks
        },
        filter(v){
            this.objects = null
        }
    },
    methods:{
        selectComponent(id,action){
            this.$http.get('components/' + id ).then ( result => {
                this.$emit(action,result.data)
            })
        },
        selectComponentTable(comp){
            this.selectComponent ( comp.id , 'component' )
        },
        background(comp){
            let image = ''
            comp.image && comp.image.url ? image = comp.image.url :
                comp.image_uri ? image = comp.image_uri : ''
            return image ? image : ''
        },
        removeElement(){
            if ( this.current && this.confirm ){
                this.$attrs.components.splice(this.index,1)
                this.$emit ( 'remove' , this.current )
                
            }
        }
    },
    apollo: {
        blocks: {
            fetchPolicy:'no-cache',
            query: componentsQry,
            variables(){
                return { category : this.filter }
            },
            update: data => data.components ,
            watchLoading(isLoading){
                this.$store.dispatch ( 'loading' , isLoading )
            }
        }
    }
}
</script>