<template>
    <div class="flex flex-col">
        <!--<moka-customize-grid :cols="cols" :stile="editor.current.style" @grid="set_style"/>-->
        <div :class="'h-10 bg-gray-600 border-2 border-dashed items-center grid grid-cols-' + cols" :style="st">
            <div v-for="col in cols" class="p-1 flex flex-row border border-yellow-200 border-dashed ">
                {{grid_settings[col-1]}}fr
            </div>
        </div>
        <div v-for="n in cols">
            Col {{n}} <input type="range" min="1" max="10" step="0.05" :name="'col_' + (n-1)" v-model="grid_settings[n-1]" @change="update_style"/>
        </div>
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
        grid_settings:[1,1],
        st:''
    }),
    computed:{
        ...mapState ( ['editor'] )
    },
    props: [ 'css' , 'stile' ],
    mounted(){
        this.st = this.stile
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
        st(v){
            this.grid_style()
        }
        /*gap(v){
            v ? this.$emit('input','gap-' + this.grid_gaps[parseInt(v)]) : this.$emit('input','')
        }
        */
    },
    methods: {
        addCol(){
            let column = this.$flex()
            this.$attrs.entity.blocks.push ( column )
            this.cols++
            this.$attrs.entity.css.container = "flex flex-col md:grid md:grid-cols-" + this.cols
        },
        grid_style(){
            if ( this.$attrs.entity.style ){
                this.grid_settings = []
                let values =this.$attrs.entity.style.split(':')[1]
                values = this.$clean(values.replace(';',''))
                values = values.replaceAll('fr','').split(' ')
                values.forEach ( (v,index) => {
                    if ( !v ) values.splice(index,1)
                })
                console.log ( values )
                this.grid_settings = values
                //return this.$attrs.entity.style
                //this.grid_settings = values.split(' ')
            }
        },
        update_style(){
            let str = 'grid-template-columns:'
            this.grid_settings.forEach ( v => {
                str += v + 'fr '
            })
            str +=';' 
            this.st = str
            this.$emit( 'stile' , str )
        },
        set_style ( stile ){
            this.$emit ( 'stile' , stile )
        },

    }    
}
</script>