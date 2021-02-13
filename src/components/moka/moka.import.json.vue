<template>
    <div class="flex flex-col p-4">
        <div class="text-xl">Import Component</div>
        <i class="material-icons absolute top-0 right-0 m-1" @click="$emit('close')">close</i>
        <div v-if="loaded">
            <div v-if="!isLibrary" class="flex flex-col p-2">
                <img :src="json.image_uri" v-if="json.image_uri" class="h-32 w-32 m-auto object-cover object-top"/>
                <label>Name*</label>
                <input type="text" class="w-full dark" v-model="json.name"/>
                <label>Category</label>
                <select class="w-full dark" v-model="json.category">
                    <option value="element">element</option>
                    <option value="component">component</option>
                    <option value="widget">widget</option>
                    <option value="template">template</option>
                    <option value="page">page</option>
                    <option value="slider">slider</option>
                    <option value="gallery">gallery</option> 
                </select>
                <label>Description</label>
                <textarea class="dark w-full" v-model="json.description"/>
                <button @click="saveImported" class="mt-2 success">Save</button>

            </div>
            <div v-else class="flex flex-col">
                <p>You are importing a library => {{ json[0].category }}
                <br>
                Blocks : {{ json.length }}
                </p>
                <button class="warning" @click="importLibrary">Import Library</button>
                <div v-if="loadedComponent">{{loadedComponent}}</div>
            </div>
        </div>
        <div class="flex text-white relative text-center p-2" v-if="!loaded">
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
        loaded: false,
        loadedComponent:''
    }),
    methods:{
        loadTextFromFile(ev) {
            const file = ev.target.files[0];
            const reader = new FileReader();

            reader.onload = e => { 
                //this.json = Object.assign ( {} , JSON.parse(JSON.stringify(e.target.result)) ) //e.target.result //JSON.parse(Object.assign(JSON.parse(e.target.result)))
                this.json = e.target.result //JSON.parse ( JSON.stringify(e.target.result) )
                this.json = JSON.parse(this.json) 
                this.json.map ( (comp,index) => {
                    //comp = JSON.parse(comp)
                    comp.image && comp.image.url ? comp.image_uri = comp.image.url : null
                    comp.image = null
                    this.json[index] = comp
                })  

                this.json.length > 1 ?
                    this.isLibrary = true :
                        this.isLibrary = false
                
                this.json.length === 1 ?
                    this.json = this.json[0] : null
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
        },
        importLibrary(){
            let n = 1
            this.json.forEach ( component => {
                this.$http.post ( 'components' , component ).then ( result => {
                    console.log ( result )
                    n++
                    this.loadedComponent = component.name
                    if ( n >= this.json.length ){
                        this.$store.dispatch ( 'loadComponents' )
                        this.$store.dispatch('message','Component uploaded successfully' )
                        this.loadedComponent = 'Blocks loaded successfully !'
                    }
                }).catch ( error => {
                    console.log ( error )
                    this.$store.dispatch('message','An error occured. Check your console log' )
                })
            })
            
        }
        
    }
}
</script>