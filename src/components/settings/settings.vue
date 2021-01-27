<template>
    <div class="p-4">
        <h3>Settings</h3>
        <div class="flex flex-row text-sm cursor-pointer">
            <template v-for="t in tabs">
                <div @click="tab=t.tag" :class="tab===t.tag?'py-1 px-2 bg-blue-400 text-white capitalize':'py-1 px-2 bg-white text-blue-400 focus:outline-none border capitalize'">{{t.label}}</div>    
            </template>
            <!--
            <div @click="tab='website'" :class="tab==='website'?'py-1 px-2 bg-blue-400 text-white':'py-1 px-2 bg-white text-blue-400 focus:outline-none border'">Website</div>
            <div @click="tab='moka'" :class="tab==='moka'?'py-1 px-2 bg-blue-400 text-white':'py-1 px-2 bg-white text-blue-400 border'">MOKAStudio</div>-->
        </div>
        <div class="flex flex-col justify-around">
            
            <div v-if="tab==='website'" class="border relative pb-8">
                <h5 class="bg-gray-700 text-gray-200 p-1">Website settings (nuxpresso-nuxt)</h5>
                <div class="flex flex-row p-2 w-full text-base">
                        
                    <div class="w-1/2 flex flex-col">
                        <label class="font-bold">SEO Title (default)</label>
                        <input type="text" v-model="moka.settings.seo_title"/>
                        <label class="font-bold">SEO Description (default)</label>
                        <textarea v-model="moka.settings.seo_description" class="w-3/4"/>
                        <!--<label class="font-bold">Google Analytics Code</label>
                        <input type="text" v-model="moka.settings.google_analytics"/>
                        <div class="text-xs">Leave blank to not apply</div>-->
                        
                        
                        <label class="font-bold">Read More text</label>
                        <input type="text" v-model="moka.settings.read_more"/>
                    </div>
                    <div class="w-1/2">
                        <label class="font-bold">Layout settings</label>
                        <div class="bg-gray-200 rounded p-2 text-center cursor-pointer">
                            Colors<br>
                            <div class="flex flex-row justify-around">
                                <div class="flex flex-col cursor-pointer">
                                    <label class="font-bold">Text</label>
                                    <moka-color attr="textcolor" v-model="moka.settings.body_color" :css="moka.settings.body_color"/>
                                </div>
                                <div class="flex flex-col">
                                    <label class="font-bold cursor-pointer">Background</label>
                                    <moka-bgcolor attr="bgcolor" v-model="moka.settings.body_bg" :css="moka.settings.body_bg"/>    
                                </div>
                            </div>
                        </div>                    
                        
                        <div class="bg-gray-200 my-2 rounded p-2 text-center cursor-pointer">
                            Darkmode colors<br>
                            <div class="flex flex-row justify-around">
                                <div class="flex flex-col">
                                    <label class="font-bold">Text</label>
                                    <moka-color attr="textcolor" v-model="moka.settings.darkmode_color" :css="moka.settings.darkmode_color"/>
                                </div>
                                <div class="flex flex-col">
                                    <label class="font-bold cursor-pointer">Background</label>
                                    <moka-bgcolor attr="bgcolor" v-model="moka.settings.darkmode_bg" :css="moka.settings.darkmode_bg"/>    
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="flex flex-col">
                            <label class="font-bold">Enable Darkmode</label>
                            <input type="checkbox" v-model="moka.settings.darkmode"/>
                            <label class="font-bold">Enable Breadcrumb</label>
                            <input type="checkbox" v-model="moka.settings.breadcrumb"/>
                            <label class="font-bold">Enable Scrolltop</label>
                            <input type="checkbox" v-model="moka.settings.scrolltop"/>
                        </div>
                    </div>
                </div>
                <button class="absolute bottom-0 right-0 m-2" @click="saveSettings">Save</button>
            </div>
            <div v-if="tab==='moka'" class="border">
                <h5 class="bg-gray-700 text-gray-200 p-1">MOKAStudio settings</h5>
                    <div class="flex flex-row">
                    <div class="flex flex-col p-2 w-full md:w-1/2">
                        <label class="font-bold">Block Types</label>
                        <select v-if="moka && moka.elements.types" v-model="currentType" multiple class="h-32 w-full" readonly>
                            <option v-for="(tipo,index) in moka.elements.types.types" :value="index">{{tipo}}</option>
                        </select>
                        <div class="flex flex-row my-1">
                            <input type="text" v-model="new_type" placeholder="footer,header,content"/>
                            <button class="ml-2 sm"  @click="moka.elements.types.types.push(new_type)">Add</button>
                            <button v-if="currentType.length" class="ml-2 sm danger" @click="removeTypes()">Remove</button>
                        </div>
                        <div class="text-xs">
                            Input values that can help to find/define your components like footer, header, call to action , etc
                        </div>
                        <button @click="saveTypes">Save</button>
                        <label class="font-bold">Colors palette</label>
                        <div class="flex flex-col">
                        <template v-for="color in colors">
                            <div class="flex flex-row mb-1">
                            <template v-for="n in 9">
                                <div :title="color + ' ' + (n*100)":class="'border w-6 h-6 rounded-full mr-2 bg-' + color + '-' + (n*100)"></div>
                            </template>
                            </div>
                        </template>
                        </div>
                    </div>
                    <div class="flex flex-col p-2 w-full md:w-1/2">
                        <label class="font-bold">Fonts</label>
                        <select v-if="moka" v-model="currentFont" multiple class="h-32 w-full" readonly>
                            <!-- <option v-for="(font,index) in moka.elements.types.fonts" :value="index">{{font}}</option> -->
                            <option v-for="(font,index) in moka.fonts" :value="index">{{font}}</option>
                        </select>
                        <!--<div class="flex flex-row my-1">
                            <input type="text" class="w-4/5" v-model="new_font" placeholder="set the webfont name"/>
                            <button class="ml-2 sm"  @click="moka.elements.types.fonts.push(new_font)">Add</button>
                            <button v-if="currentFont.length" class="ml-2 sm danger" @click="removeFont()">Remove</button>
                        </div>-->
                        <div class="text-xs">
                            To add fonts you need to update the environment variable VUE_APP_FONT_FAMILIES listing the fonts by name separated by the | character.
                            
                        </div>
                        <!--<button @click="saveTypes">Save</button>-->
                    </div>
                </div>
            </div>
            <div v-if="tab==='elements'" class="border">
                <h5 class="bg-gray-700 text-gray-200 p-1">Blocks Elements</h5>
                <moka-settings-elements/>
            </div>
        </div>
    </div>
</template>

<script>
import settingsQry from '@/apollo/settings.gql'
import MokaUser from '@/components/settings/user'
import MokaColor from '@/components/editor/tailwind/tailwind.color'
import MokaBgcolor from '@/components/editor/tailwind/tailwind.bgcolor'
import MokaSettingsElements from '@/components/settings/elements'
import { mapState } from 'vuex'
import classes from '@/plugins/tw.classes'

export default {
    name: 'NuxpressoSettings',
    components: { MokaUser , MokaColor , MokaBgcolor , MokaSettingsElements},
    data:()=>({
        tabs: [
            { label: 'Website' , tag: 'website' },
            { label: 'MOKAStudio' , tag: 'moka' },
            { label: 'Block Elements' , tag: 'elements'}
        ],
        tab: 'website',
        types: null,
        new_type:'',
        currentColor: '',
        currentType: [],
        currentFont: [],
        new_font:'',
        newUser: {
            username: '',
            email: '',
            pasword: '',
            confirm: ''
        }
    }),
    computed: {
        ...mapState ( ['moka'] ),
        colors(){
            return this.mokacolors()
        }
    },
    
    methods:{
        mokacolors(){
            return classes.colors
        },
        removeTypes(){
            this.currentType.forEach ( index => {
                this.moka.elements.types.types.splice ( index ,1 )
            })
        },
        saveTypes(){
            this.moka.elements.types.types.sort()
            this.$http.put ( 'elements' , this.moka.elements ).then ( response=>{
                this.$store.dispatch('message','Settings saved')
            }).catch ( error => {
                console.log ( error )
            })
            
        },
        saveSettings(){
            this.$http.put ( 'settings' , this.moka.settings ).then ( response => {
                this.$store.dispatch('message','Settings saved')
            })
        }
    },
    apollo: {
        setting: {
            prefetch: true,
            query: settingsQry,
            update: data => data.setting
        }
    }
}
</script>