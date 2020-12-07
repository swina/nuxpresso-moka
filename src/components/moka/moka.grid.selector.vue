<template>
    <div v-if="$attrs.develop" :class="'absolute border-2 border-' + $attrs.color + '-500 border-dashed top-0 left-0 bottom-0 right-0 z-' + $attrs.index + ' ' + active(el.id,el.css) + ' bg-transparent'" @click="$store.dispatch('selected',el.id),$emit('selected')">
        <div v-if="el.id===moka.selected" class="absolute top-0 left-0 -mt-6 h-6 bg-gray-800 text-gray-300 text-xs rounded-2xl items-center flex flex-row">
            <i class="material-icons text-sm text-gray-600 leading-4 ml-2" @click="toolbar=!toolbar">{{ el.icon }}</i>
            <i class="material-icons text-sm text-gray-600 hover:text-blue-500 leading-4 mr-2" @click="toolbar=!toolbar" v-if="!toolbar">arrow_right</i>
            <i class="material-icons text-sm text-gray-600 hover:text-blue-500 leading-4 mr-2" @click="toolbar=!toolbar" v-if="toolbar">arrow_left</i>
            <transition name="fade">
                <div v-if="toolbar" class="flex flex-row items-center">
                <i class="material-icons hover:text-blue-500 text-sm leading-4 mx-2" @click="$emit('editinline')">edit</i>
                <i class="material-icons hover:text-blue-500 text-sm leading-4 mx-2" @click="$emit('customize'),toolbar=!toolbar">brush</i>
                <i class="material-icons hover:text-blue-500 text-sm leading-4 mx-2" @click="$emit('copy')">content_copy</i>
                <i class="material-icons hover:text-blue-500 text-sm leading-4 mx-2" @click="$emit('animation')">motion_photos_on</i>
                <i class="material-icons hover:text-blue-500 text-sm leading-4 mx-2" @click="$emit('delete')">delete</i>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'MokaHtmlSelector',
    data:()=>({
        toolbar: false
    }),
    props: [ 'el' ],
    computed:{
        ...mapState ( ['moka'] )
    },
    methods:{
        active ( id ){
            
            if ( id === this.moka.selected ){
                return ' opacity-100 bg-transparent '
            }
            return ' opacity-0 hover:opacity-100 bg-transparent '
        }
    }

}
</script>