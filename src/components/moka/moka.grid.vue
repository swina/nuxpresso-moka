<template>

<div class="grid grid-rows-pancake p-4">
    <div>TOOLBAR</div>
    {{ doc.css }}

    <div :class="doc.css">
        <moka-container 
            :id="block.id" 
            :key="block.id" 
            v-for="block in doc.blocks" :class="blockClass(block)" :style="blockStyle(block)">
            <template v-for="box in block.blocks">
                <moka-box :id="box.id"
                    draggable="true"
                    :class="blockClass(box) + ' relative'"
                    :style="blockStyle(box)">
                    <template v-for="flex in box.blocks">
                        {{ flex.type }}
                        <moka-container
                            v-model="flex.blocks"
                            :id="flex.id"
                            :class="blockClass(flex)">
                            <template v-for="element in flex.blocks">
                                <moka-box
                                    :id="element.id"
                                    draggable="true">
                                    <moka-element
                                        :element="element"
                                        v-if="element.type != 'flex'"/>
                                        
                                    {{ element.type }}
                                    <moka-container v-if="element.type === 'flex'"
                                        :id="element.id"
                                        :class="blockClass(element)">
                                        <template v-for="el in element.blocks">
                                            <moka-box
                                                :id="el.id"
                                                draggable="true">
                                                <moka-element
                                                    :element="el"
                                                    v-if="el.type != 'flex'"/>
                                            </moka-box>
                                        </template>
                                    </moka-container>
                                </moka-box>
                            </template>
                        </moka-container>
                    </template>
                </moka-box>
            </template>
        </moka-container>
    </div>
    <!--
    <div class="flex flex-row justify-around">
        
        <moka-container id="block-1" class="h-screen border w-1/4">
            <moka-box id="box-1" :draggable="true">
                <h1>TEST 1</h1>
            </moka-box> 
        </moka-container>

        <moka-container id="block-2" class="h-screen border w-1/4">
            <moka-box id="box-2" :draggable="true">
                <h1>TEST 2</h1>
            </moka-box> 
        </moka-container>
        
   
    </div>
    -->
    <div>STATUS BAR</div>
</div>
</template>

<script>
import draggable from 'vuedraggable'
import MokaElement from '@/components/editor/moka.editor.element'
import MokaHtmlSelector from '@/components/moka/moka.grid.selector'
import MokaContainer from '@/components/moka/moka.container'
import MokaBox from '@/components/moka/moka.box'
import { mapState } from 'vuex'
export default {
    name: 'MokaHtml',
    components: { draggable , MokaElement , MokaHtmlSelector , MokaContainer , MokaBox },
    computed: {
        ...mapState ( ['moka']),
        loadComponent(){
            //this.component = this.moka.components.filter ( comp => { return comp.id === 26 })[0]
            //this.doc = this.component.json
            return true
        }
    },
    data:()=>({
        pippo:[
            'CIAO',
            'ARRIVEDERCI'
        ],
        cells: [],
        component: null,
        doc: {"id":"moka-hk79p","css":"","tag":"document","image":null,"blocks":[{"id":"moka-n8flu","css":{"css":" h-screen bg-cover bg-center bg-no-repeat ","container":"flex flex-col md:grid md:grid-cols-1"},"tag":"container","cols":1,"gsap":{"ease":"","delay":0,"duration":0.7,"animation":""},"icon":"view_column","link":"","rows":[],"type":"grid","image":{"id":"18","ext":".jpg","url":"https://res.cloudinary.com/moodgiver/image/upload/v1602628617/coffee_690417_1280_a89b649dc5.jpg","name":"coffee-690417_1280.jpg","size":125,"width":1280,"height":864,"caption":"","formats":{"thumbnail":{"ext":".jpg","url":"https://res.cloudinary.com/moodgiver/image/upload/v1602628618/thumbnail_coffee_690417_1280_a89b649dc5.jpg","hash":"thumbnail_coffee_690417_1280_a89b649dc5","mime":"image/jpeg","name":"thumbnail_coffee-690417_1280.jpg","path":null,"size":2.81,"width":231,"height":156,"provider_metadata":{"public_id":"thumbnail_coffee_690417_1280_a89b649dc5","resource_type":"image"}}},"__typename":"UploadFile","previewUrl":null,"alternativeText":""},"label":"Columns","style":"","blocks":[{"id":"moka-hn2is","css":" flex flex-col bg-cover bg-center bg-no-repeat h-screen ","tag":"blocks","gsap":{"ease":"back","delay":null,"duration":"1.2","animation":""},"link":"","type":"flex","image":null,"style":"","blocks":[{"id":"moka-2y45a","css":{"css":" m-5 h-10","container":"flex flex-col md:grid md:grid-cols-2"},"tag":"container","cols":2,"gsap":{"ease":"","delay":0,"duration":0.7,"animation":""},"icon":"view_column","link":"","rows":[],"type":"grid","image":null,"label":"Columns","style":"","blocks":[{"id":"moka-ocafi","css":"flex flex-col","tag":"blocks","gsap":{"ease":"expo","delay":null,"duration":"3","animation":"flipx"},"link":"","type":"flex","image":null,"style":"","blocks":[{"id":"moka-87pnj","css":" text-gray-500 text-7xl font-bold -b-2 ","tag":"element","gsap":{"ease":"elastic","delay":0,"duration":"1.8","animation":"flipx"},"icon":"text_format","link":"","type":"element","label":"Text","style":"","content":"N U X P R E S S O","element":"div"}],"content":"","elemend":"div"},{"id":"moka-mxk7d","css":"flex flex-col","tag":"blocks","gsap":{"ease":null,"delay":null,"duration":null,"animation":null},"link":"","type":"flex","image":null,"style":"","blocks":[{"id":"moka-liw46","css":{"css":" text-gray-500 hover:text-teal-500 ","align":"justify-start","submenu":"","container":"flex flex-col md:flex md:flex-row"},"tag":"menu","gsap":{"ease":"","delay":0,"duration":0.7,"animation":""},"icon":"menu","type":"horizontal","items":[{"link":"/","label":"Home","title":"Link"},{"id":"moka-zwgkm","link":"#","label":"Pages Demo","title":"","submenu":[{"id":"moka-0e8q4","link":"articles/green-gray-homepage","label":"Homepage 1"}]}],"label":"Horizontal Menu","blocks":[],"element":"menu","submenu":null,"responsive":false}],"content":"","elemend":"div"}],"content":"","element":"grid"},{"id":"moka-uj7p9","css":{"css":" flex-col mt-6 h-4/5 items-center justify-center ","container":"flex"},"tag":"container","gsap":{"ease":"expo","delay":0,"duration":"2.4","animation":""},"icon":"highlight_alt","link":"","rows":[],"type":"flex","image":null,"label":"Flexbox","style":"","blocks":[{"id":"moka-glp29","css":" text-9xl ","tag":"element","gsap":{"ease":"","delay":0,"duration":0.7,"animation":"scalein"},"icon":"subject","link":"","type":"element","label":"Rich Text","style":"","blocks":[],"content":"<p><span style=\"color: rgb(160, 174, 192);\">Modern</span><span style=\"color: rgb(226, 232, 240);\">Creative</span><strong style=\"color: rgb(197, 48, 48);\">Free</strong></p>","element":"p"},{"id":"moka-g95mm","css":" mt-10 text-red-800 text-10xl ","tag":"icon","gsap":{"ease":"back","delay":0,"duration":"2.4","animation":"flipy"},"icon":"crop_original","link":"","type":"media","label":"Icon","style":"","blocks":[],"content":"favorite","element":"icon"}],"content":"","element":"div"}],"content":"","elemend":"div"}],"content":"","element":"grid"},{"id":"moka-s739e","css":{"css":"","container":"flex flex-col md:grid md:grid-cols-1"},"tag":"container","cols":"1","gsap":{"ease":"","delay":0,"duration":0.7,"animation":""},"icon":"view_column","link":"","rows":[],"type":"grid","image":null,"label":"Columns","style":"","blocks":[{"id":"moka-sydb3","css":"flex flex-col h-screen justify-center ","tag":"blocks","gsap":{"ease":null,"delay":null,"duration":null,"animation":null},"link":"","type":"flex","image":{"id":"67","ext":".mp4","url":"https://res.cloudinary.com/moodgiver/video/upload/v1605113364/freeski_1_60ce699520.mp4","name":"freeski-1.mp4","size":23040.25,"width":null,"height":null,"caption":"","formats":null,"__typename":"UploadFile","previewUrl":"http://res.cloudinary.com/moodgiver/video/upload/c_scale,dl_200,vs_6,w_250/freeski_1_60ce699520.gif","alternativeText":""},"style":"","blocks":[{"id":"moka-igbxs","css":{"css":"","container":"flex flex-col md:grid md:grid-cols-2"},"tag":"container","cols":2,"icon":"view_column","link":"","rows":[],"type":"grid","image":null,"label":"Columns","style":"","blocks":[{"id":"moka-zjupv","css":{"css":" justify-around  ","container":"flex"},"tag":"blocks","gsap":{"ease":null,"delay":null,"duration":null,"animation":null},"link":"","type":"flex","image":null,"style":"","blocks":[{"id":"moka-h37jo","css":"w-20 h-20 rounded-full bg-pink-600 ","tag":"input","gsap":{"ease":"elastic","delay":"2","duration":"3","animation":"slidetop"},"icon":"smart_button","link":"#","type":"button","label":"Button","style":"","action":"","content":"button","element":"button","required":false},{"id":"moka-khu2b","css":"w-20 h-20 rounded-full bg-pink-600 ","tag":"input","gsap":{"ease":"elastic","delay":"2","duration":"3","animation":"slidedown"},"icon":"smart_button","link":"#","type":"button","label":"Button","style":"","action":"","content":"button","element":"button","required":false},{"id":"moka-k6km8","css":"","tag":"element","icon":"text_format","link":"","type":"element","label":"Text","style":"","content":"Some text","element":"div"}],"content":"","elemend":"div"},{"id":"moka-6vxcu","css":{"css":"flex-col","container":"flex"},"tag":"blocks","gsap":{"ease":null,"delay":null,"duration":null,"animation":null},"link":"","type":"flex","image":null,"style":"","blocks":[{"id":"moka-ka1td","css":"","tag":"element","icon":"title","link":"","type":"element","label":"Heading","level":4,"style":"","content":"Heading 1","element":"h"},{"id":"moka-84bcy","css":"","tag":"element","gsap":{"ease":"","delay":0,"duration":0.7,"animation":""},"icon":"title","link":"","type":"element","label":"Heading","level":"1","style":"","content":"Heading 1","element":"h"},{"id":"moka-j175t","css":"","tag":"element","icon":"text_format","link":"","type":"element","label":"Text","style":"","content":"Some text","element":"div"},{"id":"moka-lx6g0","css":{"css":"","container":"flex"},"tag":"container","icon":"highlight_alt","link":"","rows":[],"type":"flex","image":null,"label":"Flexbox","style":"","blocks":[{"id":"moka-2ewzq","css":"","tag":"element","icon":"text_format","link":"","type":"element","label":"Text","style":"","content":"Some text","element":"div"}],"content":"","element":"div"}],"content":"","elemend":"div"}],"content":"","element":"grid"}],"content":"","elemend":"div"}],"content":"","element":"grid"}]},
        current:{
            coords: null,
            entity: null
        }
      
    }),
    methods:{
        blockStyle(el){
            let stile = el.style 
            /*
            el.hasOwnProperty('image') && el.image ?
                stile += ' background-image:url(' + el.image.url + ');' :
                    el.image && el.image.previewUrl ?
                        stile += ' background-image:url(' + el.image.previewUrl + ');' : ''
                    */
            return stile

        },
        blockClass(el){
            let classe =  el.css.hasOwnProperty('css') ?
                    Object.values(el.css).join('') :
                        el.css
            classe += ' border'
            return classe
        },
        switchFlex(css){
            if ( css.indexOf('flex-col') < 0 ){
                this.current.entity.css += ' flex-col'
            } else {
                this.current.entity.css = this.current.entity.css.replace('flex-col','')
            }
        },
        setCurrent ( coords , element ){
            this.customizerID = this.$randomID()
            //this.customize = false
            this.current.coords = coords
            this.current.entity = element
            !element.hasOwnProperty('gsap') ? 
                this.current.entity.gsap = {
                    animation: '',
                    duration: .7,
                    ease: '',
                    delay:0
                } : null
            this.$store.dispatch('selected',element.id),
            this.$store.dispatch('current' , this.current )
            this.toolbar = true
        },
        active(id){
            if ( this.moka.selected === id ){
                console.log ( this.moka.selected , id )
                return 'border-opacity-100'
            } else {
                return 'border-opacity-0'
            }
        },
        addCell(n){
            this.cells.indexOf( n ) > -1 ? 
                this.cells.splice ( this.cells.indexOf ( n ) , 1 )
                    : this.cells.push ( n )
        }
    }
}
</script>