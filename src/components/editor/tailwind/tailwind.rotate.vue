<template>
    <div class="flex flex-col">
        Rotate 
        <select class="dark" v-model="selected" @change="$emit('input',selected)">
            <option value="">not set</option>
            <option v-for="opt in options" :value="opt">{{ option(opt) }}</option>
        </select>
    </div>
</template>

<script>
import classes from '@/plugins/tw.classes'
export default {
    data:()=>({
        selected: '',
    }),
    computed:{
        options(){
            return classes[this.$attrs.attr]
        }
    },
    props: [ 'css' ],
    watch:{
        selected(v){
            this.$emit('input','transform ' + v)
            this.$emit('css',v)
        }
    },
    methods:{
        option(opt){
            if ( opt.charAt(0) === '-' ){
                return '-' + opt.split('-')[2]
            } 
            return opt.split('-')[1]
        }
    },
    mounted(){
        if ( !this.css.length ) return
        let classes = this.css.split(' ')
        classes.forEach ( cl => {
            if ( this.options.indexOf ( cl ) > -1 ){
                this.selected = cl
                this.$emit('input','transform ' + cl)
                this.$emit('css',cl)
                return
            }
        })
    }

}
</script>