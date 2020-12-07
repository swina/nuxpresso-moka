<template>
    <div :class="' object-fit cursor-pointer flex flex-col justify-center items-center relative m-auto'">
        <img v-if="$attrs.image" :src="$attrs.image.previewUrl||$attrs.image.url" :class="'m-auto mb-2 ' + size" @click="$emit('media')"/>
        <div v-if="$attrs.image" class="w-full text-xs">
            {{ $attrs.image.name}} {{ Math.round(parseFloat($attrs.image.size),2) }} Kb
        </div>
        <button v-if="!$attrs.image" @click="$emit('media')">Add Image</button>
        <button v-else @click="$emit('noimage')">Remove</button>
    </div>
</template>

<script>
export default {
    name: 'NuxpressoImagePlaceHolder',
    computed:{
        size(){
            return this.$attrs.size ?
            this.$attrs.size === 'xs' ? 'h-12 w-20 ' : 
                this.$attrs.size === 'sm' ? 'h-20 w-30 ' : 
                    this.$attrs.size === 'md' ? 'h-32 ' : 'h-32 ' : 'h-32 '
        },
    },
    methods:{
        imageSize(img){
            if ( parseFloat(img.size) < 1000 ){
                return img.size + ' 0.' + parseInt(img.size) + ' Kb'
            } else {
                Math.round ( parseFloat(img.size)/1000 , 2 ) + ' Kb'
            }
        }
    }
}
</script>