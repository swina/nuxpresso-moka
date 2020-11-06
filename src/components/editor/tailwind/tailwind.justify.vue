<template>
    <div class="flex flex-col">
        
        Justify Items 
        <select class="dark" v-model="justify" @change="$emit('input',justify)">
            <option value="">not set</option>
            <option v-for="just in options" :value="just">{{ just.split('-')[1] }}</option>
        </select>
    </div>
</template>

<script>
export default {
    data:()=>({
        justify: '',
        options: [
            'justify-start',
            'justify-center',
            'justify-end'
        ]
    }),
    props: [ 'css' ],
    watch:{
        justify(v){
            this.$emit('input',v)
        }
    },
    mounted(){
        if ( !this.css.length ) return
        let classes = this.css.split(' ')
        classes.forEach ( cl => {
            if ( this.options.indexOf ( cl ) > -1 ){
                this.justify = cl
                this.$emit('input',cl)
                return
            }
        })
    }

}
</script>