<template>
    <div class="flex flex-col">
        Flex direction 
        <select class="dark" v-model="selected" @change="$emit('input',selected)">
            <option value="">not set</option>
            <option v-for="just in options" :value="just">{{ just.split('-')[1] }}</option>
        </select>
    </div>
</template>

<script>
export default {
    data:()=>({
        selected: '',
        options:  [
            'flex-col',
            'flex-row',
            'flex-none',
        ],
    }),
    props: [ 'css' ],
    watch:{
        selected(v){
            this.$emit('input',v)
            this.$emit('css' , v + ' ')
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
        })
    }

}
</script>