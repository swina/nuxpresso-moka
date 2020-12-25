<template>
    <div class="flex flex-col md:grid md:grid-cols-4 md:grid-flow-cols md:gap-8 w-full items-start justify-start cursor-pointer object-fit" style="grid-auto-rows: .5fr;">
        
        <div v-if="comp.enabled" v-for="(comp,c) in $attrs.components" class="mb-2 text-sm border  shadow-lg rounded-lg justify-center flex flex-col h-full" :title="comp.description">
            <div class="flex-1 relative object-cover ">
                <div class="px-1 bg-gray-700 text-gray-300 w-full rounded-tl rounded-tr  flex flex-row items-center">
                    {{comp.name}}
                </div>
                
                <div class="h-48 bg-contain bg-center bg-no-repeat" v-if="comp.image_uri" :style="'background-image:url(' + comp.image_uri + ')'" title="Click to preview" @click="$emit('preview',comp)">
                </div>
                
                <div v-else class="h-48" title="Click to preview" @click="$emit('preview',comp)"></div>
                
                <div class="px-1 absolute bottom-0 rounded-br rounded-bl bg-gray-300 items-center flex flex-row w-full text-left text-xs justify-between">
                    <div>{{$moment(comp.updated_at)}}</div>
                    <i class="ml-2 material-icons text-gray-500 hover:text-blue-500" title="Delete" @click="index=c,current=comp.id,confirmModal=!confirmModal">delete</i>
                    <i class="ml-2 material-icons text-gray-500 hover:text-blue-500" title="Duplicate" @click="$emit('duplicate',comp)">file_copy</i>
                    <i class="material-icons xs ml-2 text-gray-500 hover:text-blue-500" title="Preview" @click="$emit('preview',comp)">preview</i>
                        <i class="material-icons xs ml-2 text-gray-500 hover:text-blue-500" title="Edit" @click="$emit('component',comp)">edit</i>
                </div>
            </div>
        </div>
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
import { mapState } from 'vuex'
export default {
    name: 'MokaComponentsGallery',
    data:()=>({
        confirm: false,
        confirmModal: false,
        current: null,
        index: null
    }),
    computed:{
        ...mapState ( ['moka'] )
    },
    methods:{
        background(comp){
            return comp.image_uri ? 'background-image: url(' + comp.image_uri + ');background-size:cover;background-position:center center;background-repeat: no-repeat;' : ''
        },
        removeElement(){
            if ( this.current && this.confirm ){
                this.$emit ( 'remove' , this.current )
                
            }
        }
    }
}
</script>