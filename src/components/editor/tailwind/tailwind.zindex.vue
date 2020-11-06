<template>
    <div class="flex flex-col">
        <label>Level</label>
        <input type="range" min="0" :max="zindexes.length-1" v-model="zindex"/> {{ zindexes[zindex].split('-')[1] }}
    </div>
</template>

<script>
export default {
    name: 'MokaTailwindZIndex',
    data:()=>({
        zindex: 0,
        zcss: '',
        zindexes: [
            'z-auto',
            'z-0',
            'z-1',
            'z-2',
            'z-3',
            'z-4',
            'z-5',
            'z-6',
            'z-7',
            'z-8',
            'z-9',
            'z-10',
            'z-20',
            'z-30',
            'z-40',
            'z-50',
            'z-max',
            'z-top'
        ]
    }),
    props: ['css'],
    mounted(){
        if ( !this.css ) return 
        let classi = this.css.split(' ')
        classi.forEach ( cl => {
            this.zindexes.forEach ( (zi,index) => {
                if ( cl.indexOf ( zi ) > -1 ){
                    this.zindex = index
                    this.zcss = zi
                    this.$emit ( 'input' , zi )
                    this.$emit ( 'css' , zi )
                }
            })
        })
    },
    watch:{
        zindex(v){
            this.$emit( 'input' , this.zindexes[this.zindex] )
            this.$emit( 'css' , this.zindexes[this.zindex] )
        }
    }
}
</script>