<template>
    <div class="text-sm" isopen>
            <h4>Popup settings</h4>
            <div class="flex flex-col text-sm">
                <div class="flex flex-col">
                    <label>Position</label>
                    <select v-model="editor.current.popup.position">
                        <option value="">center</option>
                        <option value="-top">top</option>
                        <option value="-bottom">bottom</option>
                    </select>
                </div>
                <div class="flex flex-row">
                    <input type="checkbox" v-model="editor.current.popup.close" class="mr-2"><label>Close icon</label>
                </div>
                <div v-if="editor.current.popup.close" class="bg-gray-200 p-2">
                    <div class="grid grid-cols-2">
                        <div class="flex flex-col">
                            <label class="font-bold cursor-pointer">Icon color</label>
                            <moka-color attr="textcolor" v-model="editor.current.popup.css.close_color" :css="editor.current.popup.css.close_color"/>
                        </div>
                        <div class="flex flex-col">
                            <label class="font-bold">Size</label>
                            <select v-model="editor.current.popup.css.close_size">
                                <option v-for="size in textSizes" :value="size">{{ size.replace('text-','') }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row my-2">
                    <input type="checkbox" v-model="editor.current.popup.modal" class="mr-2"><label>Modal</label>
                </div>
                <div v-if="editor.current.popup.modal" class="bg-gray-200 p-2">
                    <div class="grid grid-cols-2">
                        <div class="flex flex-col">
                            <label class="font-bold cursor-pointer">Modal Background</label>
                            <moka-bgcolor attr="bgcolor" v-model="editor.current.popup.css.modal_background" :css="editor.current.popup.css.modal_background"/>
                        </div>
                        <div class="flex flex-col">
                            Opacity
                            <input type="range" min="0" max="100" step="25" class="w-full" v-model="editor.current.popup.css.modal_opacity"/>    
                        </div>
                    </div>
                    </div>
                </div>
                <label>Trigger name</label>
                <input class="w-full sm" type="text" v-model="editor.current.popup.trigger"/>
                <div class="flex flex-row">
                    <input type="checkbox" v-model="editor.current.popup.cookie" class="mr-2"><label>Cookie disable</label>
                </div>
                <div v-if="editor.current.popup.cookie" class="grid grid-cols-2 gap-3">
                    <div>
                        <label>Cookie Name</label>
                        <input class="w-full sm" type="text" v-model="editor.current.popup.cookie_name"/>
                    </div>
                    <div>
                        <label>Cookie expires (days)</label>
                        <input class="w-full sm" type="number" min="0" max="100" v-model="editor.current.popup.cookie_expires"/>
                    </div>
                </div>
                <label>Delay secs. <i>(show after)</i></label>
                <input class="w-full sm p-0 pl-1" type="number" min="0" max="100" v-model="editor.current.popup.delay"/>
                
                <button class="success m-auto w-12 my-2" @click="$store.dispatch('setAction',null)">OK</button>
            </div>
    </div>
</template>
<script>
import MokaColor from '@/components/editor/tailwind/tailwind.color'
import MokaBgcolor from '@/components/editor/tailwind/tailwind.bgcolor'
import classes from '@/plugins/tw.classes'
import { mapState } from 'vuex'
export default {
    name: 'MokaPopupSettings',
    data:()=>({
        textSizes: null
    }),
    props:[ 'id' ],
    components: {
        MokaColor , MokaBgcolor
    },
    computed: {
        ...mapState ( [ 'editor' ] ),
        isopen(){
            this.id != this.editor.current.id ? this.$store.dispatch('setAction',null) : null
            return null
        }
    },
    mounted(){
        this.textSizes = classes.textSize
    }
}
</script>