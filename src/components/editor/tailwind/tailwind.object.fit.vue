<template>
    <div class="flex flex-col">
        <label>Type</label>
        <select v-model="model" class="dark">
            <option value=""></option>
            <option v-for="opt in options" :value="opt">{{opt.split('-')[1]}}</option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'MokaTailwindObjectFit',
    data:()=>({
        model:'',
        options: [
            'object-contain',
            'object-cover',
            'object-fill',
            'object-none',
            'object-scale-down'
        ]
    }),
    props: ['css'],
    mounted(){
        if ( !this.css.length  ) return
        let classi = this.css.split(' ')
        classi.forEach ( cl => {
            this.options.forEach ( opt => {
                if ( cl === opt ){
                    this.model = opt
                    this.$emit ( 'input' , opt )
                    this.$emit ( 'css' , opt ) 
                }
            })
        })
    },
    watch:{
        model(v){
            this.$emit ( 'input' , v )
            this.$emit ( 'css' , v )
        }
    }
}
</script>