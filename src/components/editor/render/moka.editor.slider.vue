<template>
    <div>
        <div class="flex flex-col my-2" :data="init">
            <label>Delay (0 = no autoplay)</label>
            <input type="number" min="0" max="100000" v-model="slider.slider.delay"/>
            <label>Navigation</label>
            <input type="checkbox" v-model="slider.slider.navigation.enable"/>
            <label>Dots</label>
            <input type="checkbox" v-model="slider.slider.dots.enable"/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data:()=>({ 
        slider: null,
    }),
    computed:{
        ...mapState ( ['moka'] ),

        init(){
            this.slider = this.$attrs.slider
        }
    },
}
</script>