<template>
    <div class="w-full flex flex-col text-xs p-4">
        <button @click="grid=null">Grids</button>
        Click on a template to select a grid 
        <template v-for="min in max">
            <span v-if="grid===min || !grid">Grid {{ min }} cols</span>
            <div v-if="!grid" :class="'gap-1 w-full items-center h-10 mb-1 grid md:grid-cols-' + min" @click="grid=min,selected=null">
                
                <div v-for="n in min" class="cursor-pointer border border-dashed text-center bg-blue-200 rounded">
                     {{ n }} / {{ min }}
                </div>
            </div>
        </template>
        <div v-if="grid ">
            Column Spans for grid {{ grid }} cols. Click on a grid template to select.
            <!--<div :class="'gap-1 grid grid-cols-' + grid">
            <template v-for="n in grid">
                <div  class="border border-dashed text-center bg-blue-200 rounded">
                     {{ n }} / {{ grid }}
                </div>
            </template>
            </div>-->
                
                <div v-for="span in spans[grid]">
                    <div :class="'w-full my-2 gap-1 grid grid-cols-' + grid">
                        <div v-for="sp in span" :class="'cursor-pointer font-bold border border-dashed text-center bg-purple-200 rounded col-span-' + sp" @click="selected=span">
                            {{ sp }}
                        </div>
                    </div>
                </div>

                <div v-if="selected">GRID SELECTED</div>
                <div v-if="selected" :class="'w-full my-4 gap-1 grid grid-cols-' + grid">
                    <div v-for="col in selected" :class="'cursor-pointer font-bold border border-dashed text-center bg-orange-500 rounded col-span-' + col">
                        {{ col }}
                    </div>
                </div>
                <div v-if="selected && $attrs.filter" class="flex flex-col">

                    <div><span class="font-bold">HTML </span>(responsive breakpoint added): <br/>
                        <textarea class="w-1/2 h-32" style="font-family:monospace" :value="container" />
                    </div>
                    <!--
                    <div>
                    <span class="font-bold">Children elements classes</span>
                    </div>
                    
                    <template v-for="(block,n) in obj.blocks">
                        <div>{{n+1}}. {{ block.css.container }}</div>
                    </template>
                    -->
                    
                </div>
                <button v-if="selected" @click="$emit('grid',obj)">OK</button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'MokaGrids',
    data:()=>({
        grid: null,
        selected:null,
        min: 1,
        max: 6,
        spans: {
            "1" : [ [1] ],
            "2" : [ [1 , 1] ],
            "3" : [ [1,1,1] , [1,2] , [2,1] ],
            "4" : [ [1,1,1,1], [2,2] , [1,3] , [1,1,2] , [1,2,1] , [ 2 , 1 , 1] , [ 3,1 ] ] ,
            "5" : [ [1,1,1,1,1],[1,1,1,2] , [1,1,3] , [1,4] , [1,1,2,1] , [1,2,1,1] , [ 1, 3 ,1] , [ 2,1,1,1] , [3,1,1] , [3,2] , [4,1] ],
            "6" : [ [1,1,1,1,1,1],[1,1,1,1,2] , [1,1,1,3] , [1,1,4] , [1,5] , [1,1,1,2,1] , [1,1,2,1,1] , [1,1,3,1] , [1,2,1,1,1] , [1,3,1,1] , [1,4,1] , [2,1,1,1,1] , [3,1,1,1] , [4,1,1] , [5,1] ]
        },
        obj: null
    }),
    computed:{
        ...mapState(['moka']),
        schema(){
            return this.moka.elements.moka
        },
        container(){
            if ( !this.obj ) return ''
            let html = ''
            html += '<div class="' + this.obj.css.container + '">\n'
            this.obj.blocks.forEach ( block => {
                html += '\t<div class="' + this.$clean(block.css.container.replace('flex flex-col','').replace('md:col-span-1','')) + '"></div>\n'
            })
            html += '</div>'
            return html
        }
    },
    watch:{
        selected(v){
            if ( v ){
                let schema = !this.$attrs.loop ? this.schema.containers[0] : this.schema.containers.filter ( container => container.label === 'Articles Grid' )[0]
                console.log ( schema )
                let obj = JSON.parse( JSON.stringify(schema) ) //JSON.parse(JSON.stringify(this.schema.containers[0]))
                obj.blocks = []
                obj.id = this.$randomID()
                obj.css.container = "grid md:grid-rows-1 md:grid-cols-" + this.grid +  " grid-cols-1"
                obj.css.css = ''
                this.$attrs.loop ? obj.label = 'Articles Grid' : null
                obj.cols = parseInt(this.grid)
                for ( var n = 0 ; n < v.length ; n++ ) {
                    let column = JSON.parse(JSON.stringify(this.schema.containers[1]))
                    column.blocks = []
                    column.css.container = 'flex flex-col md:col-span-' + v[n]
                    column.id = this.$randomID()
                    //let content = JSON.parse(JSON.stringify(this.schema.text[2]))
                    //content.id = this.$randomID()
                    //column.blocks.push ( content )
                    obj.blocks.push ( column )
                }
                this.obj = obj
            }
        }
    }
}
</script>