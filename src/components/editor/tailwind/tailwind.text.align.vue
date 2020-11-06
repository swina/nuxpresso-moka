<template>
    <div class="flex flex-col">
        Align 
        <select class="dark"  v-model="model">
            <option value=""></option>
            <option v-for="opt in options" :value="opt">{{opt.split('-')[1]}}</option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'MokaTailwindTextSize',
    data:()=>({
        model: '', 
        options : [ 'text-left' , 'text-center' , 'text-right' , 'text-justify' ]
    }),
    props:['css'],
    watch:{
        model(v){
            v.length ? this.$emit ( 'input' , v ) : this.$emit('input','')
        }
    },
    mounted(){
        if ( !this.css ) return
        let classi = this.css.split(' ')
        this.model = ''
        classi.forEach ( cl => {
            this.options.forEach ( op => {
                if ( cl.indexOf( op ) > -1 ){
                    this.model = cl
                    console.log ( this.model , op )
                    this.$emit('input',this.model)
                    return 
                }
            })
        })
    }
}
</script>