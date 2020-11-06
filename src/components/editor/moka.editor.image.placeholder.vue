<template>
    <div :class="' object-fit cursor-pointer flex flex-col items-center relative m-auto'">
        <img v-if="$attrs.image" :src="$attrs.image.previewUrl||$attrs.image.url" class="m-auto mb-2" @click="$emit('media')"/>
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
                this.$attrs.size === 'sm' ? 'h-20 w-24 ' : 
                    this.$attrs.size === 'md' ? 'h-32 ' : 'h-32 ' : 'h-32 '
        }
    }
}
</script>