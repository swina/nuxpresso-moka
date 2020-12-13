import Vue from 'vue'
import _ from 'lodash'
import store from '../store'

const categories = [ 'page' ,  'template' , 'widget' , 'slider' , 'component' , 'element' , 'archive' , 'starred']
const pixels = [ 1 , 4 , 8 , 12 , 16 , 20 , 24 , 32 , 40 , 48, 64 , 80 , 96 , 128 , 160 , 192 , 224 , 256 ]
const pixelsAttrs = {
    'p' : 'padding' ,
    'pt' : 'paddingTop' ,
    'pr' : 'paddingRight' ,
    'pb' : 'paddingBottom' ,
    'pl' : 'paddingLeft',
    m : 'margin',
    mt: 'marginTop',
    mr: 'marginRight',
    mb: 'marginBottom',
    ml: 'marginLeft' 
}

const textSizes = [ '','text-xs' , 'text-sm' , 'text-base' , 'text-lg' , 'text-xl' , 'text-2xl' , 'text-3xl' , 'text-4xl' , 'text-5xl' , 'text-6xl' , 'text-7xl' , 'text-8xl' , 'text-9xl' , 'text-10xl' , 'text-20xl']


/*
const justifyItemsAttrs = [
    'justify-center' , 'justify-start' , 'justify-end' , 'justify-auto' , 'justify-stretch'
]

const bgColorAttrs = { 
    'bg-white'    : 'text' , 
    'bg-black'    : 'text' , 
    'bg-transparent' : 'text' , 
    'bg-gray'     : 'text' , 
    'bg-red'      : 'text' , 
    'bg-orange'   : 'text' , 
    'bg-yellow'   : 'text' , 
    'bg-green'    : 'text' , 
    'bg-teal'     : 'text' , 
    'bg-blue'     : 'text' , 
    'bg-indigo'   : 'text' ,
    'bg-purple'   : 'text' ,
    'bg-pink'     : 'text' 
}

const bgOverColorAttrs = { 
    'hover:bg-white'    : 'text' , 
    'hover:bg-black'    : 'text' , 
    'hover:bg-transparent' : 'text' , 
    'hover:bg-gray'     : 'text' , 
    'hover:bg-red'      : 'text' , 
    'hover:bg-orange'   : 'text' , 
    'hover:bg-yellow'   : 'text' , 
    'hover:bg-green'    : 'text' , 
    'hover:bg-teal'     : 'text' , 
    'hover:bg-blue'     : 'text' , 
    'hover:bg-indigo'   : 'text' ,
    'hover:bg-purple'   : 'text' ,
    'hover:bg-pink'     : 'text' 
} 

const bgSizeAttrs = {
    'bg-auto'   : 'bgSize',
    'bg-cover'  : 'bgSize',
    'bg-contain': 'bgSize'
}

const bgPositionAttrs = {
    'bg-center' : 'bgPosition',
    "bg-top"    : 'bgPosition',
    "bg-right"  : 'bgPosition',
    "bg-bottom" : 'bgPosition',
    "bg-left"   : 'bgPosition',
    "bg-right-top": 'bgPosition',
    "bg-right-bottom": 'bgPosition',
    "bg-left-top": 'bgPosition',
    "bg-left-bottom": 'bgPosition'
}

const bgRepeatAttrs = {
    "bg-repeat" : 'bgRepeat',
    "bg-no-repeat": 'bgRepeat',
    "bg-repeat-x": 'bgRepeat',
    "bg-repeat-y": 'bgRepeat',
    "bg-repeat-round": 'bgRepeat',
    "bg-repeat-space": 'bgRepeat'
}

const bgAttachmentAttrs = {
    "bg-fixed" : 'bgAttachment',
    "bg-local"  : 'bgAttachment',
    "bg-scroll" : 'bgAttachment'
}

const bgClipAttrs = {
    "bg-clip-border" : 'bgClip',
    "bg-clip-padding": 'bgClip',
    "bg-clip-content": 'bgClip',
    "bg-clip-text": 'bgClip'
}

const textColors = [ '' , 'text-white' , 'text-black' , 'text-transparent' , 'text-gray' , 'text-red' , 'text-orange' , 'text-yellow' , 'text-green' , 'text-teal' , 'text-blue' , 'text-indigo' , 'text-purple' , 'text-pink' ]

const textColorAttrs = { 
    'text-white'    : 'text' , 
    'text-black'    : 'text' , 
    'text-transparent' : 'text' , 
    'text-gray'     : 'text' , 
    'text-red'      : 'text' , 
    'text-orange'   : 'text' , 
    'text-yellow'   : 'text' , 
    'text-green'    : 'text' , 
    'text-teal'     : 'text' , 
    'text-blue'     : 'text' , 
    'text-indigo'   : 'text' ,
    'text-purple'   : 'text' ,
    'text-pink'     : 'text' 
}

const textOverColorAttrs = { 
    'hover:text-white'    : 'text' , 
    'hover:text-black'    : 'text' , 
    'hover:text-transparent' : 'text' , 
    'hover:text-gray'     : 'text' , 
    'hover:text-red'      : 'text' , 
    'hover:text-orange'   : 'text' , 
    'hover:text-yellow'   : 'text' , 
    'hover:text-green'    : 'text' , 
    'hover:text-teal'     : 'text' , 
    'hover:text-blue'     : 'text' , 
    'hover:text-indigo'   : 'text' ,
    'hover:text-purple'   : 'text' ,
    'hover:text-pink'     : 'text' 
} 


const textAttrs = {
    text : 'textsize'
}

const textAlignAttrs = {
    'text-left' : 'textAlign',
    'text-center' : 'textAlign',
    'text-right' : 'textAlign'
}

const borderSizes = [ null , '' , '2' , '4' , '8' ]

const borderAttrs = {
    'border' : 'border',
    'border-t' : 'borderTop',
    'border-r' : 'borderRight',
    'border-b' : 'borderBottom',
    'border-l' : 'borderLeft'
}

const borderColorAttrs = { 
    'border-white'    : 'borderColor' , 
    'border-black'    : 'borderColor' , 
    'border-transparent' : 'text' , 
    'border-gray'     : 'text' , 
    'border-red'      : 'text' , 
    'border-orange'   : 'text' , 
    'border-yellow'   : 'text' , 
    'border-green'    : 'text' , 
    'border-teal'     : 'text' , 
    'border-blue'     : 'text' , 
    'border-indigo'   : 'text' ,
    'border-purple'   : 'text' ,
    'border-pink'     : 'text' 
}

const borderTypeAttrs = {
    'border-dashed' : 'borderType',
    'border-dotted' : 'borderType',
    'border-double' : 'borderType'
}

const widthAttrs = {
    'w' : 'width'
}

function cssFound(css,str){
    if ( css.indexOf( str ) > -1 ) return true
    return false
}
*/

function randomID(){
    return 'moka-' + Math.random().toString(36).substr(2, 5)
}

function findNode(id,currentNode ,remove){
    if (id == currentNode.id) {
        return currentNode;
    } else {
        var node = null
        for(var index in currentNode.blocks){
            
            node = currentNode.blocks[index];
            
            if(node.id === id){
                remove ? currentNode.blocks.splice(index,1) : null
                node.parent = currentNode
                store.dispatch ( 'setParent' , currentNode )
                return node;
            }
            findNode(id, node , remove );
        }
        return node

    }
}

function clone(currentNode){
        var node = null
        for(var index in currentNode.blocks){
            
            node = currentNode.blocks[index];
            node.id = randomID()
            return clone(node);
        }
        return node
}


function getObj(obj,index){
    return obj[index]
}


export default {
    install: function (Vue) {
        
        Vue.prototype.$categories = ()=>{
            return categories
        }

        Vue.prototype.$findNode= (id, currentNode , remove = false) => {
            return findNode(id, currentNode , remove );
        }
        Vue.prototype.$copy = ( obj ) => {
            if ( !obj ) return
            let o = JSON.parse(JSON.stringify(obj))
            let newObj = clone(o)
            return newObj
        }

        Vue.prototype.$getDoc = ( obj , coord )=> {
            console.log ( obj , coord )
            let o = obj
            let len = 0
            coord.forEach ( index => {
                if ( o.hasOwnProperty ( 'blocks' ) ){
                    o = o.blocks
                    if ( o.length ) len = o.length
                    o = getObj (o,index)
                }
            })
            return o
        }
        Vue.prototype.$grid = (cols=1)=>{
                let grid = {
                    "css": {
                        "css": "",
                        "container": "flex flex-col md:grid md:grid-cols-" + cols
                    },
                    "cols" : cols,
                    "tag": "container",
                    "icon": "view_column",
                    "link": "",
                    "rows": [],
                    "type": "grid",
                    "image": null,
                    "label": "Columns",
                    "style": "",
                    "blocks": [],
                    "content": "",
                    "element": "grid",
                    "id": 'moka-' + Math.random().toString(36).substr(2, 5)
                }
                for ( var n = 0 ; n < cols ; n++ ){
                    let block = null
                    block = { 
                        "id": 'moka-' + Math.random().toString(36).substr(2, 5),
                        "blocks": [
                            {
                                "css": "",
                                "tag": "element",
                                "icon": "text_format",
                                "link": "",
                                "type": "element",
                                "label": "Text",
                                "style": "",
                                "content": "Some text",
                                "element": "div" ,
                                "id": 'moka-' + Math.random().toString(36).substr(2, 5)
                            }
                        ],
                        "image": null,
                        "css": {
                            css: "flex-col",
                            container: "flex"
                        },
                        "style": "",
                        "tag": "blocks",
                        "type": "flex",
                        "icon" : "select_all",
                        "link" : "",
                        "content" :"",
                        "element" : "div",
                        "gsap" : { "animation" : null , "ease" : null , "duration" : null , "delay" : null }
                    }
                    grid.blocks.push ( block )
                }
                return grid
            }

           
        Vue.prototype.$flex = ()=>{
            let flex = { 
                "id": 'moka-' + Math.random().toString(36).substr(2, 5),
                "blocks": [
                    {
                        "css": "",
                        "tag": "element",
                        "icon": "text_format",
                        "link": "",
                        "type": "element",
                        "label": "Text",
                        "style": "",
                        "content": "Some text",
                        "element": "div" ,
                        "id": 'moka-' + Math.random().toString(36).substr(2, 5)
                    }
                ],
                "image": null,
                "css": {
                    css: "flex-col",
                    container: "flex"
                },
                "style": "",
                "tag": "blocks",
                "type": "flex",
                "link" : "",
                "content" :"",
                "elemend" : "div",
                "gsap" : { "animation" : null , "ease" : null , "duration" : null , "delay" : null }
            }
            return flex
        }
        /* 
        Vue.prototype.$hasCss = ( css , arr ) => {
            let classe = css.split(' ')
            classe.forEach ( cl => {
                arr.forEach ( (a,index) => {
                    if ( cl.indexOf ( a ) > -1 ){
                        return index
                    }
                })
            })
            return ''
        }
        Vue.prototype.$serialize = ( obj ) => {
            if ( !obj ) return ''
            let cl = Object.values(obj)
            console.log ( cl )
        }

        Vue.prototype.$cssDeserialize = ( css  ) => {
            if ( cssFound(css,'leading') ){
                console.log ('found leading' , css.split('-')[1])
                return [ 'lineHeight' , css.split('-')[1] , true ]
            }
            if ( cssFound(css,'relative') || cssFound(css,'absolute') || cssFound(css,'fixed') ){
                return [ 'position' , css , true]
            }

            if ( css.indexOf('animation') > -1 ){
                return [ 'animation', css , true]
            }


            if ( css.indexOf( 'z' ) > -1 ){
                return [ 'zindex' , css.split('-')[1] , true]
            }
            if ( css.indexOf ( 'gap') > -1 ){
                return [ 'gridgap' , css ]
            }
            if ( css.indexOf ( 'transform') > -1 ){
                return [ 'transform' , css ]
            }
            if ( css.indexOf ( 'translate-x') > -1 ){
                return [ 'positionx' , css ]
            }
            
            if ( css.indexOf ( '-translate-x') > -1 ){
                return [ 'positionx' , css ]
            }
            
            if ( css.indexOf ( 'translate-y') > -1 ){
                return [ 'positiony' , css ]
            }
            
            if ( css.indexOf ( '-translate-y') > -1 ){
                return [ 'positiony' , css ]
            }

            if ( css.indexOf('bg-gradient-to') > -1 ){
                return [ 'gradient' , css ]
            }

            if ( css.indexOf('from-') > -1 ){
                return [ 'from' , css    ]
            }

            if ( css.indexOf('to-') > -1 ){
                return [ 'to' , css  ]
            }

            if ( css.indexOf('via-') > -1 ){
                return [ 'via' , css   ]
            }

            if ( css.indexOf ( 'text-left') > -1 ){
                return [ 'textAlign' , 0 , true]
            } 
            if ( css.indexOf ( 'text-center' ) > -1){
                return [ 'textAlign' , 1 , true ]
            }
            if ( css.indexOf ( 'text-right' ) > -1){
                return [ 'textAlign' , 2 , true ]
            }

            if ( css.indexOf ( 'opacity-') > -1 && css.indexOf('bg-opacity-') < 0){
                return [ 'opacity' , css.split('-')[1] , true ]
            }
            

            if ( justifyItemsAttrs[css] ){
                return [ 'justifyItems' , css ]
            }

            let key = css.split('-').length === 2 ? css.split('-')[0] : css.split('-')[0] + '-' + css.split('-')[1] 
            let val = css.split('-').length === 2 ? css.split('-')[1] : css.split('-')[2]

            //find values of margin and padding to get a value for the slider
            if ( pixelsAttrs[key] ){
                let value = pixels.indexOf ( parseInt(css.split('-')[1])*4 )
                return [ pixelsAttrs[key] , pixels.indexOf ( parseInt(val)*4 ) ,true ]
            }
            
            // text-size
            if ( textAttrs[key] && css.split('-').length === 2 ){
                return [ 'textsize' , textSizes.indexOf ( css )]
            }

            // border
            if ( borderAttrs[key] ){
                //found border check if is a side border
                if ( css.indexOf('border-black') < 0 && css.indexOf('border-white') < 0 ){
                    if ( css.split('-').length > 2 ){
                        key += '-' + css.split('-')[1]
                        val = css.split('-')[2]
                    }
                    return [ borderAttrs[key] , borderSizes.indexOf(val) , false ]
                } else {
                    return [ 'borderColor' , css , true ]
                }
            }

            //border color
            if ( borderColorAttrs[key] ){
                return [ 'borderColor' , css ,true ]
            }

            // border type
            if ( borderTypeAttrs[key] ){
                return [ 'borderType' , css ]
            }

            // text-color
            if ( textColorAttrs[key] ){
                return [ 'text' , key + '-' + val ]
            }

            // text over color
            if ( textOverColorAttrs[key] ){
                return [ 'textOver' , key + '-' + val ]
            }

            //background color
            if ( bgColorAttrs[key] ){
                return [ 'bg' , key + '-' + val ]
            }

            // background over
            if ( bgOverColorAttrs[key] ){
                return [ 'bgOver' , key + '-' + val ]
            }

            // background size
            if ( bgSizeAttrs[css] ){
                return [ 'bgSize' , css ]
            }

            // background position
            if ( bgPositionAttrs[css] ){
                return [ 'bgPosition' , css ]
            }

            // background attachment
            if ( bgAttachmentAttrs[css] ){
                return [ 'bgAttachment' , css ]
            }

            if ( bgRepeatAttrs[css] ){
                return [ 'bgRepeat' , css ]
            }

            if ( bgClipAttrs[css] ){
                return [ 'bgClip' , css ]
            }

            if ( widthAttrs[key] ){
                return [ 'width' , css , true ]
            }


            



            return false
        }
        */
        Vue.prototype.$cssResponsive = ( classe = '') => {
            if ( typeof classe === 'object' ) classe = classe.css
            if ( !classe || typeof classe === 'undefined' )  return ''
            let allCss = classe.split(' ')
            let responsiveCss = ''
            allCss.forEach ( css => {   
                let key = css.split('-')[0]
                let val = css.split('-')[1]
                if (  pixelsAttrs[key] ){
                    let value = pixels.indexOf ( parseInt(css.split('-')[1])*4 )
                    let rval = value > 5 ? pixels[value-5]/4 : 1
                    responsiveCss += ' ' + key + '-' + parseInt(rval) + ' md:' + css
                } else {
                    if ( textSizes.indexOf ( css ) > -1 ){
                        let i = textSizes.indexOf ( css )
                        let rvalue = i > 2 ? textSizes[i-2] : textSizes[i]
                        responsiveCss += ' ' + rvalue + ' md:' + css 
                    } else {
                        if ( css.indexOf('translate') > -1 ){
                            responsiveCss  += ' md:' + css
                        } else {
                            responsiveCss += ' ' + css
                        }
                    }
                    if ( css.indexOf ( 'z-') ){
                        responsiveCss += ' '
                    }
                }
            })
            return responsiveCss
            
        }

        Vue.prototype.$unique = ( component = null ) => {
            if ( !component ) return false
            let obj = Object.assign( {} , component )
            obj.id = randomID()
            if ( !obj.hasOwnProperty('blocks') ) return obj
            let objblocks = []
            obj.blocks.forEach ( block => {
                if ( block.hasOwnProperty('blocks') ){
                    let bb = Object.assign({},block)
                    bb.id = randomID()
                    bb.blocks = []
                    block.blocks.forEach ( element => {
                        let el = {}
                        el = Object.assign ( {} , element )
                        el.id = randomID()
                        bb.blocks.push ( el )
                    })
                    objblocks.push ( bb )
                } else {
                    let bb = {}
                    bb = Object.assign ( {} , block )
                    bb.id = randomID()
                    objblocks.push ( bb )
                }
            })
            obj.blocks = objblocks
            console.log ( 'cloned => ' , clone ( component ) )
            return obj
        }
    }
}