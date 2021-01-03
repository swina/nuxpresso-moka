<template>
    <div>
        <div class="flex flex-col text-sm my-2 bg-gray-200 rounded p-1" :data="init">
            <div class="flex flex-row my-1 p-1 border-b">
                <input type="number" min="0" max="100000" title="set 0 for autoplay" v-model="slider.slider.delay"/>
                <label class="ml-2">Autoplay Timer secs (0 = no autoplay)</label>
            </div>
            <div class="flex flex-row my-1 p-1" title="add navigation icons">
                <input type="checkbox" v-model="slider.slider.navigation.enable"/>
                <label class="ml-2">Navigation</label>
            </div>
            <div class="flex flex-row items-center justify-between my-1 p-1 border-b">
                <label>Icons</label>
                <div class="flex flex-row my-2"  title="click select navigation icons">
                    <i class="material-icons border border-dashed text-xl mx-2" 
                    @click="iconSelect=!iconSelect,icon=slider.slider.navigation.icons[0],iconIndex=0">{{ slider.slider.navigation.icons[0]}}</i>
                    <i class="material-icons border border-dashed text-xl" @click="iconSelect=!iconSelect,icon=slider.slider.navigation.icons[1],iconIndex=1">{{ slider.slider.navigation.icons[1]}}</i>
                </div>
                <div class="text-sm" title="navigation icons color">
                    <moka-color attr="textcolor" v-model="slider.slider.navigation.css" :css="slider.slider.navigation.css"/>
                </div>
            </div>
            <div class="flex flex-row my-1 p-1 border-b" title="show navigation icons only on mouseover">
                <input type="checkbox" v-model="slider.slider.navigation.hover"/>
                <label class="ml-2">Navigation onmouseover</label>
            </div>
            
            <div class="flex flex-row items-center justify-between my-1 p-1 border-b" title="add navigation dots">
                <div>
                    <input type="checkbox" v-model="slider.slider.dots.enable"/>
                    <label class="ml-2">Dots</label>
                </div>
                <moka-color class="text-sm" attr="textcolor" v-model="slider.slider.dots.css" :css="slider.slider.dots.css" title="navigation dots color"/> 
                <!--<input type="text" v-model="slider.slider.dots.css" placeholder="class"/>-->
            </div>


            <div class="flex flex-row my-1 p-1" title="add slider buttons">
                <input type="checkbox" v-model="slider.slider.buttons"/>
                <label class="ml-2">Slides buttons <span class="text-xs">(not available on mobile)</span></label>
            </div>
            <div class="flex flex-row items-center justify-between my-1 p-1 text-sm">
                <div>
                    <label class="mx-2">Buttons position</label>
                    <select v-model="slider.slider.buttons_position">
                        <option value="top-0">top</option>
                        <option value="bottom-0">bottom</option>
                    </select>
                </div>
                <div class="text-sm" title="button background color">
                    <span class="font-bold">Btn Background</span>
                    <moka-bgcolor attr="bgcolor" v-model="slider.slider.buttons_css" :css="slider.slider.buttons_css"/>
                </div>
                <div class="text-sm" title="button text color">
                    <span class="font-bold">Btn Text</span>
                    <moka-color attr="textcolor" v-model="slider.slider.buttons_text" :css="slider.slider.buttons_text"/>
                </div>
                <!--<input type="text" v-model="slider.slider.buttons_css" placeholder="class"/>-->
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
import MokaColor from '@/components/editor/tailwind/tailwind.color'
import MokaBgcolor from '@/components/editor/tailwind/tailwind.bgcolor'
import { mapState } from 'vuex'
export default {
    name: 'MokaSliderSettings',
    components: { MokaSelectIcon , MokaColor , MokaBgcolor },
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