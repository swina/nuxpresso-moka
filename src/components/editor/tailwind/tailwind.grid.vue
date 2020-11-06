<template>
    <div>
        <div>
            Columns Gap
            <select v-model="gap" class="dark mb-2">
                <option v-for="g in grid_gaps" :value="g" :key="g">{{g}}</option>
            </select>
        </div>
        <moka-customize-grid :cols="cols" :stile="$attrs.entity.style" @grid="set_style"/>
    </div>
</template>

<script>
import MokaCustomizeGrid from '@/components/editor/moka.customize.grid'
export default {
    components: { MokaCustomizeGrid },

    data:()=>({
        classe:'', 
        cols:0,       
        gap : 0,
        grid_gaps: [ '' , '1' , '2' , '3' , '4' , '5' , '6' , '8', '10' , '12', '16', '20', '24', '32', '40', '48', '56', '64' ],
    }),
    props: [ 'css' , 'stile' ],
    mounted(){
        this.cols = this.$attrs.entity.blocks.length
        this.classe = this.$attrs.entity.css.css
        if ( !this.classe ) return
        let classi = this.classe.split ( ' ' )
        classi.forEach ( cl => {
            if ( this.css.indexOf ( 'gap-') > -1 ){
                this.gap = this.grid_gaps.indexOf(cl.split('-')[1])
                this.$emit ( 'input' , 'gap-' + this.gap )
            }
        })
    },
    watch: {
        gap(v){
            v ? this.$emit('input','gap-' + this.grid_gaps[parseInt(v)]) : this.$emit('input','')
        }
    },
    methods: {
        set_style ( stile ){
            this.$emit ( 'stile' , stile )
        },

    }    
}
</script>