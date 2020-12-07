<template>
    <div class="flex flex-col">
        <moka-customize-grid :cols="cols" :stile="editor.current.style" @grid="set_style"/>
        <button @click="addCol" class="m-auto mt-2">Add column</button>
    </div>
</template>

<script>
import MokaCustomizeGrid from '@/components/editor/tailwind/tailwind.grid.customize'
import { mapState } from 'vuex'
export default {
    components: { MokaCustomizeGrid },

    data:()=>({
        classe:'', 
        cols:0,
        /*       
        gap : 0,
        grid_gaps: [ '' , '1' , '2' , '3' , '4' , '5' , '6' , '8', '10' , '12', '16', '20', '24', '32', '40', '48', '56', '64' ],
        */
    }),
    computed:{
        ...mapState ( ['editor'] )
    },
    props: [ 'css' , 'stile' ],
    mounted(){
        this.cols = this.$attrs.entity.blocks.length
        /*
        this.classe = this.$attrs.entity.css.css
        if ( !this.classe ) return
        let classi = this.classe.split ( ' ' )
        classi.forEach ( cl => {
            if ( this.css.indexOf ( 'gap-') > -1 ){
                this.gap = this.grid_gaps.indexOf(cl.split('-')[1])
                this.$emit ( 'input' , 'gap-' + this.gap )
            }
        })
        */
    },
    watch: {
        /*gap(v){
            v ? this.$emit('input','gap-' + this.grid_gaps[parseInt(v)]) : this.$emit('input','')
        }
        */
    },
    methods: {
        addCol(){
            console.log ( this.$attrs.entity )
            let column = this.$flex()
            this.$attrs.entity.blocks.push ( column )
            this.cols++
            this.$attrs.entity.css.container = "flex flex-col md:grid md:grid-cols-" + this.cols
        },
        set_style ( stile ){
            this.$emit ( 'stile' , stile )
        },

    }    
}
</script>