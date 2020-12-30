<template>
    <div class="p-4">
        <h3>Settings</h3>
        <div class="flex flex-row justify-around">
            <div class="flex flex-col p-2 w-full md:w-1/2 text-base">
                <h3>BODY Settings</h3>
                <label class="font-bold">Text</label>
                <moka-color attr="textcolor" v-model="moka.settings.body_color" :css="moka.settings.body_color"/>
                <label class="font-bold">Background</label>
                <moka-bgcolor attr="bgcolor" v-model="moka.settings.body_bg" :css="moka.settings.body_bg"/>
            </div>
            <div class="flex flex-col p-2 w-full md:w-1/2">
                <h3>BLOCKS Types</h3>
                <select v-if="moka" v-model="currentType" multiple class="h-32 w-full" readonly>
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
            </div>
            <div class="flex flex-col p-2 w-full md:w-1/2">
                <h3>FONTS</h3>
                <select v-if="moka" v-model="currentFont" multiple class="h-32 w-full" readonly>
                    <option v-for="(font,index) in moka.elements.types.fonts" :value="index">{{font}}</option>
                </select>
                <div class="flex flex-row my-1">
                    <input type="text" class="w-4/5" v-model="new_font" placeholder="set the webfont name"/>
                    <button class="ml-2 sm"  @click="moka.elements.types.fonts.push(new_font)">Add</button>
                    <button v-if="currentFont.length" class="ml-2 sm danger" @click="removeFont()">Remove</button>
                </div>
                <div class="text-xs">
                    Input the google font name: i.e. Lora, Montserrat, PT+Sans (you can specify also specific attributes like Monteserrat:400italic )
                </div>
                <button @click="saveTypes">Save</button>
            </div>
            <!--<moka-user/>-->
            <!--<div class="flex flex-col">
                <h3>Create MOKAStudio User</h3>
                <label>Username</label>
                <input type="text" v-model="newUser.username"/>
                <label>Email</label>
                <input type="email" v-model="newUser.email"/>
                <label>Password</label>
                <input type="password" v-model="newUser.password"/>
                <label>Confirm</label>
                <input type="password" v-model="newUser.confirm"/>
                <button v-if="newUser.confirm === newUser.password">Create</button>
                <div class="text-xs text-red-700" v-if="newUser.confirm != newUser.password">Passwords must match</div>
            </div>-->
        </div>
    </div>
</template>

<script>
import settingsQry from '@/apollo/settings.gql'
import MokaUser from '@/components/settings/user'
import MokaColor from '@/components/editor/tailwind/tailwind.color'
import MokaBgcolor from '@/components/editor/tailwind/tailwind.bgcolor'
import { mapState } from 'vuex'
export default {
    name: 'NuxpressoSettings',
    components: { MokaUser , MokaColor , MokaBgcolor },
    data:()=>({
        types: null,
        new_type:'',
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
        ...mapState ( ['moka'] )

    },
    
    methods:{
        removeTypes(){
            this.currentType.forEach ( index => {
                this.moka.elements.types.types.splice ( index ,1 )
            })
        },
        saveTypes(){
            //let data = this.types.split('\n')
            //this.moka.elements.types = {
            //    types : data
            //}
            this.moka.elements.types.types.sort()
            
            this.$http.put ( 'elements' , this.moka.elements ).then ( response=>{
                console.log ( response )
            }).catch ( error => {
                console.log ( error )
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