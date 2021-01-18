<template>
    <div :class="size + ' object-fit bg-gray-600 cursor-pointer flex flex-col items-center relative m-auto'">
        <img v-if="$attrs.image" :src="$imageURL($attrs.image)" class="m-auto w-100"/>
        <div class="absolute top-0 right-0 z-10 p-1">
            <i v-if="!$attrs.image" class="material-icons bg-white rounded p-1 text-black text-base hover:bg-blue-300" @click="$emit('media')">add</i>
            <i v-if="$attrs.image" class="material-icons bg-white rounded p-1 text-black text-base hover:bg-blue-300" 
            @click="$emit('noimage')">delete</i>

        </div>
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