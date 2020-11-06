<template>
    <div class="flex flex-col">
        <i class="material-icons m-auto p-2 border" v-if="$attrs.value">{{ $attrs.value }}</i>
        Icon Category
        <select v-model="groupicon">
            <option v-for="(group,i) in Object.keys(moka.icons)" :value="group">{{ group }}</option>
        </select> 
        <div class="flex flex-row flex-wrap overflow-y-auto" style="height:10rem;min-height:10rem;max-height:10rem" v-if="groupicon">
            <i v-for="(icon,n) in moka.icons[groupicon]" class="flex flex-row flex-wrap material-icons cursor-pointer m-2" @click="$emit('input',icon)">{{ icon }}</i>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data:()=>({
        groupicon:''
    }),
    computed:{
        ...mapState( ['moka'] )
    }
}
</script>
