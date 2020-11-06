<template>
    <div class="flex flex-row">
        <div class="mr-2">
            Color 
            <div :class="'mb-1 w-8 h-8 border-2 rounded-full ' + color.replace('text','bg')" @click="palette=!palette,is_over=false"></div>
        </div>
        <div>
            Over 
            <div :class="'mb-1 w-8 h-8 border-2 rounded-full ' + color_over.replace('hover:text','bg').replace('hover:','')" @click="palette=!palette,is_over=true"></div>
        </div>
        <palette v-if="palette" @color="setColor" @close="palette=!palette"/>
    </div>
</template>

<script>
import palette from '@/components/palette'
export default {
    name: 'MokaTailwindColor',
    components: { palette },
    data:()=>({
        palette: false,
        is_over: false,
        color:'',
        color_over: '',
        colors : [
            'bg-white',
            'bg-black', 
            'bg-transparent', 
            'bg-gray', 
            'bg-red', 
            'bg-orange', 
            'bg-yellow', 
            'bg-green', 
            'bg-teal', 
            'bg-blue', 
            'bg-indigo',
            'bg-purple',
            'bg-pink',
            'hover:bg-white',
            'hover:bg-black', 
            'hover:bg-transparent', 
            'hover:bg-gray', 
            'hover:bg-red', 
            'hover:bg-orange', 
            'hover:bg-yellow', 
            'hover:bg-green', 
            'hover:bg-teal', 
            'hover:bg-blue', 
            'hover:bg-indigo',
            'hover:bg-purple',
            'hover:bg-pink', 
            'text-white',
            'text-black', 
            'text-transparent', 
            'text-gray', 
            'text-red', 
            'text-orange', 
            'text-yellow', 
            'text-green', 
            'text-teal', 
            'text-blue', 
            'text-indigo',
            'text-purple',
            'text-pink',
            'hover:text-white',
            'hover:text-black', 
            'hover:text-transparent', 
            'hover:text-gray', 
            'hover:text-red', 
            'hover:text-orange', 
            'hover:text-yellow', 
            'hover:text-green', 
            'hover:text-teal', 
            'hover:text-blue', 
            'hover:text-indigo',
            'hover:text-purple',
            'hover:text-pink'
            ]

    }),
    props: ['css','attr'],
    computed:{
        context(){
            return this.$attr === 'bg-color' ? 'bg-' : 'text-'
        }
    },
    methods:{
        setColor ( color , tone ){
            let c = this.context
            tone ? c += color + '-' + tone : c += color
            !this.is_over ?
                this.color = c : this.color_over = 'hover:' + c
        }
    },
    mounted(){
        if ( !this.css.length ) return
        let classes = this.css.split(' ')
        classes.forEach ( cl => {
            this.colors.forEach ( color => {
                if ( cl.indexOf ( color ) ){
                    if ( cl.indexOf('hover') ){
                        this.color_over = cl
                    } else {
                        this.color = cl
                    }
                }
            })

        })
    }
}
</script>