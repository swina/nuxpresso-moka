<template>
    <div>
        <div class="flex flex-col my-2" :data="init">
            <div class="flex flex-row my-1 p-1">
            <input type="number" min="0" max="100000" v-model="slider.slider.delay"/>
            <label class="ml-2">Autoplay Timer secs (0 = no autoplay)</label>
            </div>
            <div class="flex flex-row my-1 p-1">
                <input type="checkbox" v-model="slider.slider.navigation.enable"/>
                <label class="ml-2">Navigation</label>
            </div>
            <div class="flex flex-row my-1 p-1">
                <label>Icons</label>
                <div class="flex flex-row my-2">
                    <i class="material-icons border border-dashed text-xl mx-2" 
                    @click="iconSelect=!iconSelect,icon=slider.slider.navigation.icons[0],iconIndex=0">{{ slider.slider.navigation.icons[0]}}</i>
                    <i class="material-icons border border-dashed text-xl" @click="iconSelect=!iconSelect,icon=slider.slider.navigation.icons[1],iconIndex=1">{{ slider.slider.navigation.icons[1]}}</i>
                </div>
            </div>
            <div class="flex flex-row my-1 p-1">
                <input type="checkbox" v-model="slider.slider.navigation.hover"/>
                <label class="ml-2">Navigation onmouseover</label>
            </div>
            <div class="flex flex-row my-1 p-1">
                <input type="checkbox" v-model="slider.slider.dots.enable"/>
                <label class="ml-2">Dots</label>
            </div>
            <div class="flex flex-row my-1 p-1">
                <input type="checkbox" v-model="slider.slider.buttons"/>
                <label class="ml-2">Slides buttons <span class="text-xs">(not available on mobile)</span></label>
            </div>
            <div class="flex flex-row my-1 p-1">
                <select v-model="slider.slider.buttons_position">
                    <option value="top-0">top</option>
                    <option value="bottom-0">bottom</option>
                </select>

                <label class="mx-2">Buttons position</label>
                <input type="text" v-model="slider.slider.buttons_css" placeholder="class"/>
            </div>
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