<template>
    <div class="p-2 grid grid-cols-2 grid-rows-1 h-full gap-5 bg-gray-300 rounded" v-if="image">
        <div class="flex flex-col justify-center p-1 bg-gray-800 h-auto w-full bg-contain bg-no-repeat bg-top" :style="'background-image:url(' +
         $imageURL(image) + ')'">
            <i v-if="image.mime.indexOf('image') < 0" class="material-icons text-gray-400 m-auto text-10xl">insert_drive_file</i>
            <!-- <img :src="image.url" class="h-full w-auto"/> -->
        </div>
        <div class="flex flex-col p-2">
            <label>File</label>
            <input class="w-full" type="text" readonly :value="image.name"/>
            <label>Caption</label>
            <input class="w-full" type="text" v-model="image.caption"/>
            <label>Alternative text</label>
            <input class="w-full" type="text" v-model="image.alternativeText"/>
            <label>URL</label>
            <input class="w-full" type="text" readonly v-model="image.url"/>
            <div class="w-full text-right mt-4">
                <button class="danger mr-2" @click="$emit('delete')">Delete</button>
                <button class="bg-gray-100 text-black mr-2" @click="$emit('close')">Close</button>
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