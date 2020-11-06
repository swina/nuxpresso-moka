<template>
    <div>
        Gradient
        <div class="flex flex-row justify-between">
            <div>
                From  
                <div :class="'mb-1 w-8 h-8 border-2 rounded-full ' + color('from')" @click="getColor('from')"></div>
            </div>
            <div>
                Via
                <div :class="'mb-1 w-8 h-8 border-2 rounded-full ' + color('via')" @click="getColor('via')"></div>    
            </div>
            <div>
                To
                <div :class="'mb-1 w-8 h-8 border-2 rounded-full ' + color('to')" @click="getColor('to')"></div>
            </div>
        </div>
        Direction                            
        <select v-model="direction">
            <option v-for="(dr,index) in directions" :value="index" :key="dr.label">{{dr.label}}</option>
        </select>
        <div :class="'w-full border my-1 h-10 ' + directions[direction].value + ' ' + Object.values ( twgradient ).join( ' ' )"></div>
        <transition name="slidedown">
            <moka-colors v-if="palette" css="" @close="palette=!palette" @color="setColor"/>
        </transition>
    </div>
</template>

<script>

import MokaColors from '@/components/palette'
export default {
    components: { MokaColors },
    data:()=>({
        twgradient: {
            gradient: '',
            direction: 0,
            from: '',
            via: '',
            to: '',
        },
        direction: 0,
        directions : [
            { label: 'none'         , value: ''                     },
            { label: 'Top'          , value: 'bg-gradient-to-t'     },
            { label: 'Top Right'    , value: 'bg-gradient-to-tr'    },
            { label: 'Right'        , value: 'bg-gradient-to-r'     },
            { label: 'Bottom Right' , value: 'bg-gradient-to-br'    },
            { label: 'Bottom'       , value: 'bg-gradient-to-b'     },
            { label: 'Bottom Left'  , value: 'bg-gradient-to-bl'    },
            { label: 'Left'         , value: 'bg-gradient-to-l'     },
            { label: 'Top Left'     , value: 'bg-gradient-to-tl'    }
        ],
        palette: false,
        currentCss: '',
        target: null
    }),
    props: ['gradient','from','to','via'],
    mounted(){
        this.twgradient.gradient = this.gradient
        this.twgradient.from = this.from
        this.twgradient.to = this.to
        this.twgradient.via = this.via
        this.directions.forEach ( (values,index) => {
            if ( this.gradient === values.value ) { this.direction = index }
        })
        //this.twgradient.from = this.twgradient.from ? this.twgradient.from.replace('bg','from') : ''
        //this.twgradient.to = this.twgradient.to ? this.twgradient.to.replace('bg','to') : ''
        //this.twgradient.via = this.twgradient.via ? this.twgradient.via.replace('bg','via') : ''
    },
    watch:{
        direction(v){
            if ( !v )  { 
                this.$emit ( 'gradient' , {
                    direction: 0,
                    gradient: '',
                    from: '',
                    to: '',
                    via: ''
                })
                return
            }
            this.twgradient.gradient = this.directions[v].value
            this.$emit ( 'gradient' , this.twgradient )
            this.$emit ( 'input' , this.twgradient )
            //this.$emit ( 'set' , ['width' , v] )
        },
        twgradient:{
            handler(v){
                if ( this.direction ){
                    this.twgradient.gradient = this.directions[this.direction].value
                    this.$emit ( 'gradient' , this.twgradient )
                this.$emit ( 'input' , this.twgradient )
                }
            },
            deep: true
        }
    },
    methods:{
        color(attr){
            return this.twgradient[attr] ? this.twgradient[attr].replace(attr,'bg') : ''
        },
        getColor(mode){
            this.target = mode
            this.palette =! this.palette
        },
        setColor(color,tone){
            this.palette = false
            console.log ( color , tone )
            if ( color ){
                let t = tone ? '-' + tone : ''
                
                    this.target === 'from' ? this.twgradient[this.target] = 'from-' + color + t :
                        this.target === 'to' ? this.twgradient[this.target] = 'to-' + color + t : 
                            this.target === 'via' ? this.twgradient[this.target] = 'via-' + color + t : '' 

                this.twgradient.gradient = this.directions[this.direction].value
                this.$emit ( 'gradient' , this.twgradient )
                this.$emit ( 'input' , this.twgradient )
            }

        }
    }
}
</script>