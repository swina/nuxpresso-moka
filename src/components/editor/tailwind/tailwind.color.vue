<template>
    <div class="flex flex-row">
        <div class="mr-2">
            Color 
            <div :class="'mb-1 w-8 h-8 border-2 rounded-full ' + color[attr].replace('text','bg')" @click="palette=!palette,is_over=false"></div>
        </div>
        <div>
            Over 
            <div :class="'mb-1 w-8 h-8 border-2 rounded-full ' + color[attr+'_over'].replace('hover:text','bg').replace('hover:','')" @click="palette=!palette,is_over=true"></div>
        </div>
        
        <palette v-if="palette" @color="setColor" @close="palette=!palette"/>
    </div>
</template>

<script>
import classes from '@/plugins/tw.classes'
import palette from '@/components/palette'
export default {
    name: 'MokaTailwindColor',
    components: { palette },
    data:()=>({
        allCss: null,
        palette: false,
        is_over: false,
        color:{
            textcolor: '',
            textcolor_over: ''
        },
        color_over: '',
        
    }),
    props: ['css','attr'],
    computed:{
        colors(){
            return classes[this.attr]    
        },
        context(){
            return this.attr === 'bgcolor' ? 'bg-' : 'text-'
        }
    },
    methods:{
        setColor ( color , tone ){
            let c = this.context
            if ( color ){
                tone ? c += color + '-' + tone : c += color
                !this.is_over ?
                    this.color[this.attr] = c : this.color[this.attr + '_over']= 'hover:' + c
            } else {
                !this.is_over ?
                    this.color[this.attr] = '' : this.color[this.attr + '_over']= ''
            }

            this.$emit('input', Object.values(this.color).join(' ') + ' ' )
            this.$emit('css', Object.values(this.color).join(' ') + ' ')
            this.palette = false
        },
        update(css){
            if ( !css.length ) return
            this.allCss = css
            let classes = this.allCss.split(' ')
            classes.forEach ( cl => {
                this.colors.forEach ( color => {
                    if ( cl.indexOf ( color ) ){
                        if ( cl.indexOf('hover') ){
                            this.allCss = this.allCss.replace(cl,'')
                            this.color[this.attr+'_over'] = cl
                            this.$emit('css',cl)
                        } else {
                            this.allCss = this.allCss.replace(cl,'')
                            this.color[this.attr] = cl
                            this.$emit('css',cl)
                        }
                    }
                })

            })
        }
    },
    
    mounted(){
        if ( !this.css || !this.css.length ) return
        this.allCss = this.css
        let classes = this.allCss.split(' ')
        classes.forEach ( cl => {
            this.colors.forEach ( color => {
                if ( cl.indexOf ( color ) > -1 ){
                    if ( cl.indexOf('hover') > -1 ){
                        this.color[this.attr+'_over'] = cl
                        this.$emit('css',cl)
                    } else {
                        this.allCss = this.allCss.replace(cl,'')
                        this.color[this.attr] = cl
                        this.$emit('css',cl)
                    }
                }
            })

        })
        this.$emit('input', Object.values(this.color).join(' ') )
    }
}
</script>