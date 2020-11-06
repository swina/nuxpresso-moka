<template>
    <div class="flex flex-col">
        Size {{ options[model] }}
        <input type="range" min="0" :max="options.length-1" v-model="model"/>
    </div>
</template>

<script>
export default {
    name: 'MokaTailwindTextSize',
    data:()=>({
        model: 0, 
        options : [ '','text-xs' , 'text-sm' , 'text-base' , 'text-lg' , 'text-xl' , 'text-2xl' , 'text-3xl' , 'text-4xl' , 'text-5xl' , 'text-6xl' , 'text-7xl' , 'text-8xl' , 'text-9xl' , 'text-10xl' , 'text-20xl']
    }),
    props:['css'],
    watch:{
        model(v){
            v ?
                this.$emit ( 'input' , this.$clean(this.options[v]) ) : this.$emit('input','')
        }
    },
    mounted(){
        if ( !this.css ) return
        let classi = this.css.split(' ')
        classi.forEach ( cl => {
            if ( cl.length ){
                this.options.forEach ( (op,index) => {
                    if ( cl === op ){
                        this.model = index
                        this.$emit('input',' ' + this.options[index])
                        return
                    }
                })
            }
        })
    }
}
</script>