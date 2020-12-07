<template>
    <div class="flex flex-col">
        Opacity
        <input type="range" min="0" max="100" step="25" v-model="model"/>
    </div>
</template>

<script>
export default {
    name: 'MokaTailwindOpacity',
    data:()=>({
        model: '100',
        opacities: [
            'opacity-0',
            'opacity-25',
            'opacity-50',
            'opacity-75',
            'opacity-100'
        ]
    }),
    props: [ 'css' ],
    computed:{
        prefix(){
            return this.$attrs.attr === 'textopacity' ? 
                'text-' : 
                    this.$attrs.attr === 'borderopacity' ?
                        'border-' : 'bg-'
        }
    },
    watch:{
        model(v){
            this.$emit('input', this.prefix + 'opacity-' + v)
            this.$emit('css',this.prefix + 'opacity-' + v)
        }
    },
    
    mounted(){
        if ( !this.css.length ) return
        let classes = this.css.split(' ')
        classes.forEach ( cl => {
            this.opacities.forEach ( op => {
                if ( cl.indexOf ( op ) > -1 ){
                    this.model = op.split('-')[1]
                    console.log ( op , this.model )
                    this.$emit('input', cl )
                    this.$emit('css', cl )
                    return
                }
            })
        })
    }
}
</script>