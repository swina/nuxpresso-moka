<template>
    <div>
        <div>
            Columns Gap
            <select v-model="gap" class="mb-2">
                <option v-for="g in grid_gaps" :value="g" :key="g">{{g}}</option>
            </select>
        </div>
        <moka-customize-grid :cols="cols" :stile="stile" @grid="set_style"/>
    </div>
</template>

<script>
import MokaCustomizeGrid from '@/components/editor/moka.customize.grid'
export default {
    components: { MokaCustomizeGrid },

    data:()=>({
        gap : 0,
        grid_gaps: [ '' , '1' , '2' , '3' , '4' , '5' , '6' , '8', '10' , '12', '16', '20', '24', '32', '40', '48', '56', '64' ],
    }),
    props: [ 'cols' , 'stile' ],
    mounted(){
        this.cols ? this.gap = this.cols : null
    },
    watch: {
        gap(v){
            v ? this.$emit('set',['gridgap' , 'gap-' + this.grid_gaps[parseInt(v)] ]) : this.$emit('set',['gridgap',''])
        }
    },
    methods: {
        set_style ( stile ){
            this.$emit ( 'stile' , stile )
        },

    }    
}
</script>