<template>
    <div class="p-2 grid grid-cols-2">
        <div class="flex flex-col justify-center p-1">
            <img :src="image.url"/>
        </div>
        <div class="flex flex-col p-2">
            <label>File</label>
            <input type="text" readonly :value="image.name"/>
            <label>Caption</label>
            <input type="text" v-model="image.caption"/>
            <label>Alternative text</label>
            <input type="text" v-model="image.alternativeText"/>
            <div class="text-right my-2">
                <button class="danger mr-2" @click="$emit('close')">Close</button>
                <button @click="save">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MokaEditMedia',
    data:()=>({
        image: null
    }),
    props: [ 'img' ],
    methods:{
        save(){
            
            this.$http.post('upload?id=' + this.image.id , this.image ).then ( response => {
                console.log ( response )
            })
        }
    },
    mounted(){
        this.$http.get('upload/files/' + this.img.id).then ( response => {
            this.image = response.data
        })
    }
}
</script>