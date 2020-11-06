<template>
    <div class="flex flex-col">
        Clip path  
        <select class="dark" v-model="model" @change="$emit('input', 'transform ' + model),$emit('css','transform ' + model)">
            <option value="">not set</option>
            <option v-for="opt in options" :value="opt.value">{{ opt.label }}</option>
        </select>
    </div>
</template>

<script>
export default {
    data:()=>({
        model: '',
        options: [
            { label: 'angle left', value: 'clip-path-angle-left' }, 
            { label: 'angle right' , value: 'clip-path-angle-right' } ,
            { label: 'arrow left', value: 'clip-path-arrow-left' }, 
            { label: 'arrow right' , value: 'clip-path-arrow-right' } ,
            { label: 'triangle' , value: 'clip-path-triangle' }, 
            { label: 'circle' , value: 'clip-path-circle' }, 
            { label: 'tag' , value: 'clip-path-tag-down' } , 
            { label: 'trapezoid left' , value: 'clip-path-trapezoid-left' } , 
            { label: 'trapezoid right' , value: 'clip-path-trapezoid-right' } , 
            { label: 'rombus' , value: 'clip-path-rombus' } , 
            { label: 'parallelogram' , value: 'clip-path-parallelogram' },
            { label: 'frame' , value: 'clip-path-frame' },  
            { label: 'cross' , value: 'clip-path-cross' },
            { label: 'stairs' , value: 'clip-path-stairs' },
            { label: 'stairs 2' , value: 'clip-path-stairs-2' }
        ],
    }),
    props: [ 'css' ],
    mounted(){
        if ( !this.css.length ) return
        let classes = this.css.split(' ')
        classes.forEach ( cl => {
            this.options.forEach ( opt => {
                if ( cl.indexOf ( opt.value ) > -1 ){
                    if ( opt.value ){
                        this.model = opt.value
                        this.$emit('input', 'transform ' + opt.value)
                        this.$emit('css',opt.value)
                    }
                }
            })
        })
    }

}
</script>