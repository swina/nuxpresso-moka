<template>
    <div>
        <div class="flex flex-col my-2" :data="init">
            <label>Delay (0 = no autoplay)</label>
            <input type="number" min="0" max="100000" v-model="slider.slider.delay"/>
            <label>Navigation</label>
            <input type="checkbox" v-model="slider.slider.navigation.enable"/>
            <label>Icons</label>
            <div class="flex flex-row my-2">
                <i class="material-icons border text-xl mx-2" 
                    @click="iconSelect=!iconSelect,icon=slider.slider.navigation.icons[0],iconIndex=0">{{ slider.slider.navigation.icons[0]}}</i>
                <i class="material-icons border text-xl" @click="iconSelect=!iconSelect,icon=slider.slider.navigation.icons[1],iconIndex=1">{{ slider.slider.navigation.icons[1]}}</i>
            </div>
            <label>Navigation onmouseover</label>
            <input type="checkbox" v-model="slider.slider.navigation.hover"/>
            <label>Dots</label>
            <input type="checkbox" v-model="slider.slider.dots.enable"/>
        </div>
        <div class="nuxpresso-modal w-full p-2" v-if="icon">
            <i class="material-icons absolute top-0 right-0 m-1" @click="icon=!icon">close</i>
            <moka-select-icon v-model="slider.slider.navigation.icons[iconIndex]" />
        </div>
    </div>
</template>

<script>
import MokaSelectIcon from '@/components/editor/render/moka.customize.icon'
import { mapState } from 'vuex'
export default {
    name: 'MokaSliderSettings',
    components: { MokaSelectIcon },
    data:()=>({ 
        iconSelect: false,
        icon: null,
        iconIndex: null,
        slider: null,
    }),
    computed:{
        ...mapState ( ['moka'] ),

        init(){
            this.slider = this.$attrs.slider
        }
    },
    methods: {
        setIcon(icon){
            this.slider.slider.navigation.icons[this.iconIndex] = icon
        }
    }
}
</script>