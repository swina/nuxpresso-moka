<template>
    <div class="flex flex-col">
        Padding
        <template v-for="padd in keys">
            <div class="flex flex-row">
                <input type="range" min="-1" :max="pixels.length-1" v-model="padd.value"/>{{ padd.label}}
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'MokaTailwindPadding',
    data:()=>({
        model:'',
        padding:'',
        keys: [
            { label: 'all'  , attr: 'p-', value: -1 },
            { label: 'top'  ,attr: 'pt-', value: -1 },
            { label: 'bottom',attr: 'pb-', value: -1 },
            { label: 'left',attr: 'pl-', value: -1 },
            { label: 'right', attr: 'pr-', value: -1 }
        ],
        pixels : [ 1 , 4 , 8 , 12 , 16 , 20 , 24 , 32 , 40 , 48, 64 , 80 , 96 , 128 , 160 , 192 , 224 , 256 ]
    }),
    props: ['css'],
    mounted(){
        if ( !this.css.length ) return
        let padding = ''
        let classi = this.css.split(' ')
        classi.forEach ( cl => {
            this.keys.forEach ( (k,index) => {
                if ( cl.indexOf ( k.attr ) > -1 ){
                    this.model = k
                    this.keys[index].value = this.pixels.indexOf ( parseInt(cl.split('-')[1])*4 )
                    
                }
            })
        })    
    },
    watch:{
        keys:{
            handler(old,padding){
                let classe = ''
                this.keys.forEach ( k => {
                    if ( parseInt(k.value) > -1 ){
                        parseInt(k.value) < 4 ?
                            parseInt(k.value) === 0 ?
                                classe += k.attr + 1 + ' ' : 
                                    classe += k.attr + k.value + ' ' :
                                        classe += k.attr + this.pixels[parseInt(k.value)]/4 + ' '
                    }
                })
                this.padding = this.$clean(classe)
                this.$emit('input',this.$clean(this.padding))
                this.$emit('css',this.$clean(this.padding))
            },
            deep: true
        }
    }
}
</script>