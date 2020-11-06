<template>
    <div>
        <div v-if="$attrs.axis==='x'" class="flex flex-row text-center w-full items-center justify-center">
            <i :class="'material-icons nuxpresso-icon-circle cursor-pointer text-black'">chevron_left</i>
            <input type="range" :min="-pixels.length+1" :max="pixels.length-1" v-model="posX" class="mx-2">
            <i class="material-icons nuxpresso-icon-circle cursor-pointer text-black">chevron_right</i>
        </div>
        <div v-if="$attrs.axis==='x'" class="w-full text-center">{{posX}}</div>
        <div v-if="$attrs.axis==='y'" class="flex flex-row text-center w-full items-center justify-center">
            <i class="material-icons nuxpresso-icon-circle cursor-pointer text-black" @click="posY > -pixels.length+1 ? posY-- : null">expand_less</i>
            <input type="range" :min="-pixels.length+1" :max="pixels.length-1" v-model="posY" class="mx-2">
            <i class="material-icons nuxpresso-icon-circle cursor-pointer text-black" @click="posY < pixels.length-1 ? posY++ : null">expand_more</i>
            
        </div>
            <div  v-if="$attrs.axis==='y'" class="w-full text-center">{{posY}}</div>
    </div>
</template>

<script>
export default {
    data:()=>({
        posX: 0,
        posY:0,
        marginLeft: 0,
        pixels : [ 1 , 4 , 8 , 12 , 16 , 20 , 24 , 32 , 40 , 48, 64 , 80 , 96 , 128 , 160 , 192 , 224 , 256 ],
        css: '',
        axisScope: {
            x : 'l',
            y : 't'
        },
        scope:''
    }),
    props: [ 'position' ],
    mounted(){
        if ( this.position ){
            let value =  this.position.split('-')[this.position.split('-').length-1]
            this.scope = this.axisScope[this.$attrs.axis]
            if ( this.$attrs.axis === 'x' )
                
                this.position ? this.posX = this.pixels.indexOf ( parseInt(value)*4 )  : this.posX = 0
            if ( this.$attrs.axis === 'y' )
                this.position ? this.posY = this.pixels.indexOf ( parseInt(value)*4 ) : this.posY = 0
            
            if ( this.position.charAt(0,1) === '-' ){
                this.$attrs.axis === 'x' ? this.posX = -this.posX : this.posY = -this.posY
            }
        } 
        
    },
    watch:{
        posX(v){
            if ( v === 0 ) { 
                this.$emit ( 'set' , [ 'positionx' , '' ] )
                return
            }
            let p = -v
            let axis
            v < 0 ? p = -v : p = v
            v < 0 ?  axis = '-translate-x-' : axis = 'translate-x-'
            parseInt(p) ? this.css = axis + this.pixels[p]/4 : this.css = ''
            this.$emit ( 'set' , ['position' + this.$attrs.axis ,this.css] )
            this.$emit ( 'set' , ['transform' , 'transform'])
        },
        posY(v){
            if ( v === 0 ) { 
                this.$emit ( 'set' , [ 'positiony' , '' ] )
                return
            }
            let p = -v
            let axis
            v < 0 ? p = -v : p = v
            v < 0 ?  axis = '-translate-y-' : axis = 'translate-y-'
            parseInt(p) ? this.css = axis + this.pixels[p]/4 : this.css = ''
            this.$emit ( 'set' , ['position' + this.$attrs.axis ,this.css] )
            this.$emit ( 'set' , ['transform' , 'transform'])
        },
    },
}
</script>