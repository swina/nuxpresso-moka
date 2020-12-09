<template>
    <div 
        v-if="doc"
        :level="$attrs.level"  
        :class="'p-2 relative ' + classe(doc.css)" :style="doc.style + ' ' +  background(doc)" >
        
        <template v-for="(block,b) in doc.blocks">
            
            <moka-element
                v-if="block && !block.hasOwnProperty('blocks') || block.hasOwnProperty('items')"
                :key="block.id"
                :element="block" 
                :coords="[b]"
                :develop="true"
                @selected="setCurrent(block),$store.dispatch('setCurrent',block),$store.dispatch('selected',block.id)"
                @customize="customize"
                @copy="$emit('copy')"
                @animation="$emit('animations')"
                @delete="$emit('delete')" 
                @editinline="setCurrent(block),edit"/> 

            <moka-container
                :key="block.id"
                :component="$attrs.component"
                :top="false"
                :coords="coords"
                :slide="$attrs.slide" 
                :index="b"
                :level="parseInt($attrs.level)+1" 
                :zi="$attrs.zi + parseInt($attrs.level)"
                v-if="block && block.hasOwnProperty('blocks') && !block.hasOwnProperty('items')  && !block.hasOwnProperty('slider')" 
                :doc="block"
                @copy="$emit('copy')"/>

            <moka-container
                :key="block.id"
                :component="$attrs.component"
                :top="false"
                :coords="coords"
                :slide="$attrs.slide" 
                :index="b"
                :level="parseInt($attrs.level)+1" 
                :zi="$attrs.zi + parseInt($attrs.level)"
                v-if="block && block.hasOwnProperty('slider')" 
                :doc="block.blocks[0]"/>
        </template>
        
        <div :class="'absolute transform border border-dashed top-0 left-0 bottom-0 right-0 z-' + zindex + ' scale-x-' + (108-(parseInt($attrs.level))) + ' ' + active(doc.id,doc)" @click="setCurrent(doc)" v-if="doc && !doc.hasOwnProperty('items')">
            <!--{{ $attrs.level }} {{ $attrs.index }}-->
            <span v-if="doc.hasOwnProperty('loop') && doc.loop" class="text-xs"><i class="material-icons">article</i> Article Grid</span>
            <div class="h-2 w-2 absolute top-0 right-0 bg-black rounded-full -m-1"></div>
            <div class="h-2 w-2 absolute top-0 left-0 bg-black rounded-full -m-1"></div>
            <div class="h-2 w-2 absolute bottom-0 right-0 bg-black rounded-full -m-1"></div>
            <div class="h-2 w-2 absolute bottom-0 left-0 bg-black rounded-full -m-1"></div>
            <div v-if="doc.id===moka.selected" class="z-2xtop absolute top-0 left-0 ml-4 p-1 -mt-3  h-6 w-20 bg-gray-800 text-gray-300 text-xs rounded-2xl items-center flex flex-row justify-around">
                <i class="transform scale-100 material-icons text-sm " v-if="doc.icon">{{doc.icon}}</i>
                <i class="transform scale-100 material-icons text-sm" v-if="!doc.icon">select_all</i>
                <i v-if="doc.type==='flex'" class="material-icons hover:text-blue-500 text-sm leading-4" @click="$store.dispatch('setAction','addcomponent')">add</i>
                <i v-if="doc.tag==='form'" class="material-icons hover:text-blue-500 text-sm leading-4" @click="$store.dispatch('setAction','formsetting')">settings</i>
                <i class="material-icons hover:text-blue-500 text-sm leading-4 " @click="$store.dispatch('setAction','customize')" title="Customize">brush</i>
                <i class="material-icons hover:text-blue-500 text-sm leading-4 " @click="$store.dispatch('setAction','delete')" title="Customize">delete</i>
            </div>
            <span v-if="doc.hasOwnProperty('slider')">SLIDER</span>
            <div v-if="doc.type==='grid' && this.$attrs.level < 3" class="opacity-100 hover:opacity-100 border absolute left-0 top-0 -mx-5 text-black flex flex-col" style="top:50%;transform:translateY(-50%)">
                <i class="material-icons hover:bg-blue-200 text-gray-700 " @click="move(true)">expand_less</i>
                <i class="material-icons hover:bg-blue-200 text-gray-700" @click="move(false)">expand_more</i>
            </div>
        </div>
        
    </div>

</template>

<script>
import MokaElement from '@/components/editor/render/moka.editor.element'
import MokaSlider from '@/components/editor/preview/moka.slider'
import { mapState } from 'vuex'
export default {
    name: 'MokaContainer',
    components: { MokaElement , MokaSlider },
    props: [ 'doc' , 'coords' ,'pos' ],
    data:()=>({
        position: null
    }),
    computed:{
        ...mapState(['moka','editor']),
        zindex(){
            return this.$attrs.level < 1 ? 'auto' : this.$attrs.level < 2 ? 1 : 
                this.$attrs.level //    this.$attrs.zi
        },
        
    },
    methods:{
        classe(css){
            let cl = css.hasOwnProperty('css') ? css.css + ' ' + css.container : css
            cl.replace('z-','')
            return cl
        },
        setCurrent(el){ 
            let level = this.coords
            level.push ( this.$attrs.index )
            this.$store.dispatch( 'selected' , el.id )
            this.$store.dispatch('setLevel',level)
            this.$store.dispatch ( 'setCurrent' , el )
            this.$emit('selected',el)
        },
        
        setCurrentElement (el){
            this.$store.dispatch( 'selected' , el.id )
            this.$emit ( 'selected' , el )
        },
        
        arraySwap ( arr , from , to ){
            return arr.splice(from, 1, arr.splice(to, 1, arr[from])[0]);
        },
        move(flag){
            let coord = []
            coord = coord.concat(this.coords)
            coord.push ( this.$attrs.index )
            console.log ( coord )
            let test = Object.assign({} , this.$attrs.component)
            !this.$attrs.top ?
                console.log ( test , coord , test.blocks[coord[1]].blocks[0] ) :
                    console.log ( this.$attrs.index , test.blocks[this.$attrs.index] ) 
            let arr
            !this.$attrs.top ?
                arr = test.blocks[coord[1]].blocks[0].blocks :
                    arr = test.blocks 
            
            //console.log ( arr , coord[coord.length-1] , coord[coord.length-1]-1 )
            let source = arr[coord[coord.length-1]]
            let pos = coord[coord.length-1]
            if ( flag ){
                if ( pos > 0 ){     
                    arr.splice(pos-1,0,source)
                    arr.splice(pos+1,1)
                }
            } else {
                console.log ( pos , arr.length-1 )
                if ( pos < arr.length-1 ){
                    arr.splice(pos,1,arr.splice(pos+1, 1, arr[pos])[0])
                    
                }
            }
            !this.$attrs.top ?
                        test.blocks[coord[1]].blocks[0].blocks = arr :
                            test.blocks = arr
            //test.blocks[coord[0]].blocks[coord[1]].blocks = arr
            //test.blocks[coord[1]].blocks[0].blocks = arr
            console.log ( arr , test )
            return
            
            
        },
        blocksLen(obj,coord){
            let o = this.doc
            let len = 0
            coord.forEach ( index => {
                if ( o.hasOwnProperty ( 'blocks' ) ){
                    o = o.blocks
                    if ( o.length ) len = o.length
                    o = getObj (o,index)
                }
            })
            return len

            function getObj(obj,index){
                return obj[index]
            }
        },
        customize(){
            console.log ( 'element customize')
            this.$emit('customize')
        },
        edit(block){
            this.$store.dispatch( 'selected' , block.id )
            this.$store.dispatch ( 'current' , block )
            this.$emit('selected',block)
            this.$emit('edit',block)
        },
        active(id,doc){
            if ( !doc ) return 
            let color = 'border-blue-500 '
            doc && !doc.hasOwnProperty('type') ? color = 'border-red-500 ' : null
            doc.type === 'flex' ?
                color = 'border-red-500 ' : ' '
            if ( this.moka && this.moka.selected ) {
                return this.moka.selected === id ? color + 'opacity-100' : color + 'opacity-0 hover:opacity-100'
            } else {
                return color + 'opacity-0 hover:opacity-100 '
            }
        },
        stile(block,doc){
            if ( !block || !doc ) return 
            let stile = ''
            if ( block.hasOwnProperty('fontFamily')){
                stile += 'font-family:\"' + block.fontFamily + '\"; '
            }
            return block.hasOwnProperty('style') ? block.style + stile : stile
        },
        background(block){
            if ( !block ) return 
            return block.hasOwnProperty('image') ?
                block.image && block.image.url ? 
                    block.image.previewUrl ? 
                        ' background-image:url(' + block.image.previewUrl + ');background-size:cover;background-repeat:no-repeat;' :
                            ' background-image:url(' + block.image.url + ');' : ''  : ''        
        },
    }

}
</script>