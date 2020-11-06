<template>
    <div>
        {{ $attrs.context === 'text-' ? 'Text color' : 'Background' }}
        <div class="flex flex-row cursor-pointer" :data="colorize">
            <div class="flex flex-col mr-2">
                <div>Color</div>
                <div :class="'mb-2 w-8 h-8 border-2 ' + color.replace('text','bg')" @click="isover=false,current=color,colors=!colors"></div>
            </div>
            <div class="flex flex-col">
                <div>Over</div>
                
                <div :class="'mb-2 w-8 h-8 border-2 ' + over.replace('text','bg')" @click="isover=true,current=over,colors=!colors"></div>
                
            </div>
            <transition v-if="colors" name="slidedown">
                
                <nuxpresso-admin-palette v-if="colors" :css="current" @close="colors=!colors" @color="setColor"/>
            </transition>
        </div>
    </div>
</template>

<script>
import NuxpressoAdminPalette from '@/components/palette'
export default {
    name: 'NuxpTailwindColor',
    components: { NuxpressoAdminPalette },
    data:()=>({
        twcolors : [ 'black' , 'white' , 'gray' , 'red', 'orange' , 'yellow' , 'green' , 'teal' , 'blue' , 'indigo' , 'purple' , 'pink' ],
        colors: false,
        color: '',
        over: '',
        isover: false,
        current: ''
    }),
    computed:{
        colorize(){
            let css = this.$attrs.color ? this.$attrs.color.split(' ') : ''
            if ( css ){
                this.color = ''
                this.over = ''
                css.forEach ( c => {
                    if ( c.indexOf('hover:' + this.$attrs.context) > -1 ){
                        if ( c.split('-').length > 1 ){
                            if ( this.twcolors.includes ( c.split('-')[1] ) ){
                                this.over = c.split(':')[1]
                            }
                        }
                    } else {
                        if ( c.split('-').length > 1 ){
                            if ( this.twcolors.includes ( c.split('-')[1] ) ){
                                this.color = c
                            }
                        }
                    }
                })
            }
            return
        },
        sendColor(color){
            if ( this.$attrs.context ){
                let css = this.$attrs.context + color
                console.log ( css )
            } 
        }
    },
    methods:{
        setColor(color,tone){
            let c = this.$attrs.context
            c += tone ? color + '-' + tone : color
            this.isover ? this.over = c : this.color = c
            this.colors = false
            
            let css =  this.over ? this.color + ' hover:'  + this.over : this.color
            this.$emit ( 'color' , css )

        }
    }
}
</script>

