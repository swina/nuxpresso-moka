<template>
    <div class="flex flex-col p-4">
        <div class="text-xl">Import Component</div>
        <i class="material-icons absolute top-0 right-0 m-1" @click="$emit('close')">close</i>
        <div v-if="loaded" class="flex flex-col p-2">
            <img :src="json.image_uri" v-if="json.image_uri" class="h-32 w-32 m-auto object-cover object-top"/>
            <label>Name*</label>
            <input type="text" class="dark" v-model="json.name"/>
            <label>Category</label>
            <select class="dark" v-model="json.category">
                <option value="element">element</option>
                <option value="component">component</option>
                <option value="widget">widget</option>
                <option value="template">template</option>
                <option value="page">page</option>
                <option value="slider">slider</option>
                <option value="gallery">gallery</option> 
            </select>
            <label>Description</label>
            <textarea class="dark" v-model="json.description"/>
            <button @click="saveImported" class="mt-2 success">Save</button>
        </div>
        <div class="flex text-white relative text-center p-2">
            <input type="file" class="absolute top-0 left-0 right-0 bottom-0 opacity-0" @change="loadTextFromFile"/>
            <button class="w-full warning">Upload Component</button>
        </div>
    </div>
</template>

<script>
export default {
    data:()=>({
        files: [],
        json: null,
        loaded: false
    }),
    methods:{
        loadTextFromFile(ev) {
            const file = ev.target.files[0];
            const reader = new FileReader();

            reader.onload = e => { 
                this.json = JSON.parse(Object.assign(JSON.parse(e.target.result)))

                console.log ( 'NAME: ' , this.json.name )
                console.log ( 'Description: ' , this.json.description) 
                console.log ( 'JSON IS => '  , this.json.json )
                this.loaded = true
            }
            reader.readAsText(file)
            
        },
        saveImported(){
            this.$http.post ( 'components' , this.json ).then ( result => {
                this.$store.dispatch ( 'loadComponents' )
                this.$store.dispatch('message','Component uploaded successfully' )
                this.$emit('close')
            }).catch ( error => {
                console.log ( error )
                this.$store.dispatch('message','An error occured. Check your console log' )
            })
            return null
        }
        
    }
}
</script>