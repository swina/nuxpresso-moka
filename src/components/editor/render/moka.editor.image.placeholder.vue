<template>
    <div :class="' object-fit cursor-pointer flex flex-col justify-center items-center relative m-auto'">
        <img v-if="$attrs.image && ( $attrs.image.ext === '.svg' || $attrs.image.ext === '.webm' || $attrs.image.ext === '.mp4')" :src="$imagePreviewURL($attrs.image)"  
        :class="'m-auto mb-2 ' + size" @click="$emit('media')"/>
        <!--<i class="material-icons text-5xl" v-if="editor && editor.current && editor.current.type==='video'">movie</i>-->
        <i class="material-icons text-5xl" v-if="editor && editor.current && editor.current.type==='audio'">audiotrack</i>
        <div v-if="$attrs.image" class="w-full text-xs">
            {{ $attrs.image.name}} <span v-if="$attrs.image.size">{{ Math.round(parseFloat($attrs.image.size),2) }} Kb</span>
        </div>
        <button v-if="!$attrs.image" @click="$emit('media')">Select Media</button>
        <button v-if="$attrs.image && $attrs.image.url" @click="$emit('noimage')">Remove</button>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'MokaImagePlaceHolder',
    data:()=>({
        mediaURL: ''
    }),
    watch:{
        mediaURL(v){
            let image = {
                url : v
            }
            this.$attrs.image = image
        }
    },
    computed:{
        ...mapState ( [ 'editor' ]),
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