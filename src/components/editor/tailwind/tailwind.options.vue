<template>
    <div class="flex flex-col">
        <span class="capitalize">{{$attrs.title||$attrs.attr}}</span> 
        <select class="w-full dark" v-model="selected" @change="$emit('input',selected)">
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
            this.$emit('input', this.$attrs.required ? this.$attrs.required + ' ' + v : v)
            this.$emit('css', this.$attrs.required ? this.$attrs.required + ' ' + v : v)
        }
    },
    methods:{
        option(opt){
            if ( opt.charAt(0) === '-' ){
                return '-' + opt.split('-')[opt.split('-').length-1]
            } 
            return opt.split('-')[opt.split('-').length-1]
        }
    },
    mounted(){
        if ( !this.css.length ) return
        let classes = this.css.split(' ')
        classes.forEach ( cl => {
            if ( this.options.indexOf ( cl ) > -1 ){
                this.selected = cl
                this.$emit('input',this.$attrs.required ? this.$attrs.required + ' ' + cl : cl)
                this.$emit('css', this.$attrs.required ? this.$attrs.required + ' ' + cl : cl)
                return
            }
        })
    }

}
</script>