<template>
    <div class="flex flex-col">
        Order Items 
        <select class="dark" v-model="selected" @change="$emit('input',selected)">
            <option value="">not set</option>
            <option v-for="just in options" :value="just">{{ just.split('-')[1] }}</option>
        </select>
        <input type="checkbox" v-model="responsive"> Apply only to responsive
    </div>
</template>

<script>
export default {
    data:()=>({
        selected: '',
        options:  [
            'order-first',
            'order-last',
            'order-none'
        ],
        responsive: false
    }),
    props: [ 'css' ],
    watch:{
        selected(v){
            let css = v
            this.$emit('input',v)
            this.$emit ( 'css' , v )
        },
        responsive(v){
            if ( this.selected ){
                if ( v ){
                    this.$emit('input',this.selected + ' md:order-none')
                    this.$emit('css',this.selected)
                    this.$emit('css','md:order-none')
                } else {
                    this.$emit('input',this.selected)
                    this.$emit('css',this.selected)
                }
            }
        }
    },
    mounted(){
        if ( !this.css.length ) return
        let classes = this.css.split(' ')
        classes.forEach ( cl => {
            if ( this.options.indexOf ( cl ) > -1 ){
                this.selected = cl
                this.$emit('input',cl)
                this.$emit('css',cl)
                return
            }
            if ( cl.indexOf('md:') > -1 ){
                this.responsive = true
                this.$emit ( 'css' , cl )
            }
        })
    }

}
</script>