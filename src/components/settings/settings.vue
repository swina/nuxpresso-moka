<template>
    <div class="p-4">
        <h3>Settings</h3>
        <div class="flex flex-row justify-around">
            <div class="flex flex-col w-full md:w-1/3">
                <h3>MOKAS</h3>
                <label>Types</label>
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
            <div class="w-1/2"></div>
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
import { mapState } from 'vuex'
export default {
    name: 'NuxpressoSettings',
    components: { MokaUser },
    data:()=>({
        types: null,
        new_type:'',
        currentType: [],
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