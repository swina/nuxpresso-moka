<template>
    <div class="grid grid-cols-4 grid-flow-cols gap-8 w-full items-start justify-start cursor-pointer object-fit" style="grid-auto-rows: .5fr;">
        <div v-if="comp.enabled" v-for="(comp,c) in $attrs.components" class="mb-2 text-sm border  shadow-lg rounded-lg justify-center flex flex-col h-full" :title="comp.description">
            <div class="flex-1 relative object-cover ">
                <div class="bg-gray-400 w-full p-1 rounded-tl rounded-tr font-bold flex flex-row items-center">
                    {{comp.name}}
                    <div class="absolute right-0 mt-2 mr-1">
                        <i class="material-icons xs ml-2 hover:text-blue-500" @click="$emit('preview',comp)">preview</i>
                        <i class="material-icons xs ml-2 hover:text-blue-500" @click="$emit('component',comp)">edit</i>
                    </div>
                </div>
                <div class="relative pt-64 bg-gray-100">
                    <div class="flex items-center text-center h-full justify-center absolute h-64 top-0 object-contain left-0 right-0 bottom-0">
                        <img :src="comp.image_uri" v-if="comp.image_uri" style="max-height:100%" class="w-auto h-auto block m-auto" @click="$emit('preview',comp)"/>
                        <!--<img src="../assets/no-image.png" v-if="!comp.image_uri" @click="$emit('preview',comp)"/>-->
                    </div>
                </div>
                <div class="p-1 absolute bottom-0 bg-gray-300 items-center flex flex-row w-full text-left text-xs">
                        Category: <span class="font-bold">{{comp.category}}</span>
                        <button class="xs p-0">Delete</button>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    methods:{
        background(comp){
            return comp.image_uri ? 'background-image: url(' + comp.image_uri + ');background-size:cover;background-position:center center;background-repeat: no-repeat;' : ''
        }
    }
}
</script>