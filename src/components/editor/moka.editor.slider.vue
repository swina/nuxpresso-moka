<template>
    <div>
        <div class="flex flex-col my-2" :data="init">
            <label>Delay (0 = no autoplay)</label>
            <input type="number" min="0" max="100000" v-model="slider.slider.delay"/>
            <label>Navigation</label>
            <input type="checkbox" v-model="slider.slider.navigation.enable"/>
            <label>Dots</label>
            <input type="checkbox" v-model="slider.slider.dots.enable"/>
            <!--
            <label>Animation</label>
            <select v-model="slider.slider.animation">
                <option value="">no animation</option>
                <option value="animation-1">Fade</option>
                <option value="animation-2">Slide</option>
                <option value="animation-3">Flip 1</option>
                <option value="animation-4">Flip 2</option>
                <option value="animation-5">Tilt In</option>
                <option value="animation-6">Roll In</option>

            </select>
            -->
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