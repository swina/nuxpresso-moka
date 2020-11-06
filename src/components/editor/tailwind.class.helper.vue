<template>
    <div class="w-1/5 fixed top-0 right-0 border-l mt-12 p-1 shadow bg-gray-400 z-max text-black text-left text-sm overflow-y-auto h-full">
        <div class="flex flex-col text-left overflow-y-auto" :pippo="importCSS">
            
            <div class="text-xl mb-1 font-black cursor-pointer" @click="$emit('close')">S T Y L E R <i class="material-icons">close</i></div>
            <div class="cursor-pointer p-1">
                <!-- GRID SETTINGS -->
                <div v-if="$attrs.selected.entity.element==='grid' && $attrs.selected.entity.blocks.length > 0" class="w-full p-1 mb-1 bg-gray-600 text-white" @click="toggle('grid-')">Columns </div>
                <transition>
                    <div v-if="colorCtx==='grid-'" class="mb-4">
                        <moka-customize-grid :cols="$attrs.selected.entity.blocks.length" :stile="$attrs.selected.entity.style" @set="setTW" @stile="stile"/>
                        <!--
                        <div class="mt-2">
                        Align Items
                            <select v-model="twCss.itemsAlign" @change="updateCSS()">
                                <option value="">not set</option>
                                <option v-for="align in itemsAlign" :value="align.value">{{align.label}}</option>
                            </select>
                        </div>
                        -->
                    </div>
                </transition>

                <!-- POSITION && Z-INDEX SETTINGS -->
                <div class="w-full p-1 mb-1 bg-gray-600 text-white" @click="toggle('pos-')">Position &amp; Align</div>
                <transition>
                    <div class="mb-2 flex flex-col" v-if="colorCtx==='pos-'">
                         <!--<input type="checkbox" v-model="paddingType[padd.toLowerCase()]"/>{{ padd }}-->
                        <label>X Axis</label>
                        <moka-position axis="x" :position="twCss.positionx" @set="setTW"/>
                        <label>Y Axis</label>
                        <moka-position axis="y" :position="twCss.positiony" @set="setTW"/>

                        <moka-tw-justify 
                            v-if="$attrs.selected.coords.length===2" 
                            :css="currentCss"
                            v-model="justifyItems"/>
                        
                       
                        <label class="my-2">Position</label>
                        <select v-model="position">
                            <option value="">not set</option>
                            <option value="relative">relative</option>
                            <option value="absolute">absolute</option>
                            <option value="fixed">fixed</option>
                        </select>
                        <label class="my-2">Level</label>
                        <input type="range" min="0" max="10" v-model="zindex"/>
                        <label class="my-2">Opacity</label>
                        <input type="range" min="0" max="100" step="25" v-model="opacity">
                    </div>
                </transition>

                 <!-- WIDTH SETTINGS -->
                <div class="w-full p-1 mb-1 bg-gray-600 text-white" @click="toggle('w-')">Width </div>
                <transition>
                    <div v-if="colorCtx==='w-'" class="flex flex-col mb-2 w-3/4">
                        Width
                        <select class="w-full" v-model="width">
                            <option v-for="w in widths" :value="w.value">{{w.label}}</option>
                        </select>

                        <moka-widths :css="currentCss" v-model="width"/>
                    </div>
                </transition>

                <!-- HEIGHT SETTINGS -->
                <div class="w-full p-1 mb-1 bg-gray-600 text-white" @click="toggle('h-')">Height </div>
                <transition> 
                    <div v-if="colorCtx==='h-'" class="flex flex-col w-3/4 mb-2">
                        Height
                        <!--<input class="w-full" type="range" min="0" :max="widths.length-1" step="1" v-model="width"/>-->
                        <!--<div :class="twCss.width + ' font-light border border-dashed pl-1'">
                            
                            <span v-if="width < 0">Not set</span>
                            <span v-else>sample text</span>
                        </div>-->
                        <select class="w-full" v-model="height">
                            <option v-for="h in heights" :value="h.value">{{h.label}}</option>
                        </select>
                    </div>
                </transition>

                <!-- TEXT SETTINGS -->
                <div class="w-full p-1 mb-1 bg-gray-600 text-white" @click="toggle('text-')">Text </div>
                <transition>
                    <div v-if="colorCtx==='text-'" class="mb-4">
                        <!--<nuxpresso-color :color="twCss.text" :context="colorCtx" @color="setTWColor"/>-->
                        <div class="flex flex-row">
                            <div class="mr-2">
                                Color 
                                <div :class="'mb-1 w-8 h-8 border-2 ' + twCss.text.replace('text','bg')" @click="colors=!colors,text_over=false"></div>
                            </div>
                            <div>
                                Over 
                                <div :class="'mb-1 w-8 h-8 border-2 ' + twCss.textOver.replace('hover:text','bg').replace('hover:','')" @click="colors=!colors,text_over=true"></div>
                            </div>
                        </div>

                        Size {{sizes[textSize]}}<br/>
                        <input type="range" min="0" :max="sizes.length-1" v-model="textSize" class="w-full"/><br/>
                        Align
                        <div class="flex flex-row text-black">
                            <i :class="'material-icons mr-2 text-black ' + getTextAlign('text-left')" @click="textAlign='text-left'">format_align_left</i>
                            <i :class="'material-icons mr-2  ' + getTextAlign('text-center')" @click="textAlign='text-center'">format_align_center</i>
                            <i :class="'material-icons mr-2  ' + getTextAlign('text-right')" @click="textAlign='text-right'">format_align_right</i>
                        </div>
                        Font
                        <div class="flex flex-col my-1">
                            <div class="flex flex-row flex-wrap mb-1 text-black">
                                <i :class="'material-icons nuxpresso-icon-btn text-black mr-2 ' + getFont('bold')" @click="font.bold?font.bold='':font.  bold='font-bold'" title="bold">format_bold</i>
                                <i :class="'material-icons nuxpresso-icon-btn text-black mr-2 ' + getFont('italic')" @click="font.italic?font.italic='':font.italic='italic'" title="italic">format_italic</i>
                                <i :class="'material-icons nuxpresso-icon-btn text-black mr-2 ' + getFont('underline')" @click="font.underline?font.underline='':font.underline='underline'" title="underline">format_underlined</i>
                                <i :class="'material-icons nuxpresso-icon-btn text-black mr-2 ' + getFont('black')" @click="font.black?font.black='':font.black='font-black'" title="font black">title</i>
                            </div>
                            <div class="flex flex-row flex-wrap mb-1">
                                <i :class="'material-icons nuxpresso-icon-btn text-black mr-2 ' + getFont('uppercase')" @click="font.transform?font.transform='':font.transform='uppercase'" title="uppercase">arrow_upward</i>
                                <i :class="'material-icons nuxpresso-icon-btn text-black mr-2 ' + getFont('lowercase')" @click="font.transform?font.transform='':font.transform='lowercase'" title="lowercase">arrow_downward</i>
                                <i :class="'material-icons nuxpresso-icon-btn text-black mr-2 ' + getFont('capitalize')" @click="font.transform?font.transform='':font.transform='capitalize'" title="capitalize">text_fields</i>
                                <i class="material-icons nuxpresso-icon-btn text-black mr-2" @click="font.bold='',font.italic='',font.black='',font.underline='',font.transform=''" title="Reset">undo</i>
                            </div>
                            
                        </div>
                        <div class="flex flex-col">
                            Line Height
                            <input type="range" min="0" max="15" v-model="lineHeight">
                        </div>
                        <!--<div :class="'bg-white ' + twCss.bg + ' ' + sizes[textSize] + ' ' + twCss.text + ' ' + Object.values(font).join(' ')">Sample text</div>-->
                    </div> 
                </transition>

                <!-- BACKGROUND SETTINGS -->
                <div class="w-full p-1 mb-1 bg-gray-600 text-white" @click="toggle('bg-')">Background </div>
                <transition>
                    
                    <div v-if="colorCtx==='bg-'" class="mb-1 flex flex-col">
                        <div class="flex flex-row">
                            <div class="flex flex-col mr-2">
                                Color 
                                <div :class="'w-8 h-8 border-2 ' + twCss.bg" @click="colors=!colors,bg_over=false"></div>
                                <!--<nuxpresso-color :color="twCss.bg" :context="colorCtx" @color="setTWColor"/>--> 
                            </div>
                            <div class="flex flex-col">
                                Over 
                                <div :class="'w-8 h-8 border-2 ' + twCss.bgOver.replace('hover:','')" @click="colors=!colors,bg_over=true"></div>
                            </div>
                        </div>
                        <div class="flex flex-col w-3/4 my-2">
                            <div>Opacity</div>
                            <input type="range" min="0" max="100" step="25" v-model="bg_opacity">
                        </div>
                        <div class="flex flex-row flex-wrap w-full my-2">
                            <div class="w-1/2">
                                <div>Size</div>
                                <select v-model="twCss.bgSize" @change="updateCSS()">
                                    <option value=""></option>
                                    <option value="bg-auto">auto</option>
                                    <option value="bg-cover">cover</option>
                                    <option value="bg-contain">contain</option>
                                </select>
                            </div>
                            <div class="w-1/2">
                                <div>Position</div>
                                <select v-model="twCss.bgPosition" @change="updateCSS()">
                                    <option value=""></option>
                                    <option value="bg-center">center </option>
                                    <option value="bg-top">top</option>
                                    <option value="bg-right">right</option>
                                    <option value="bg-bottom">bottom</option>
                                    <option value="bg-left">left</option>
                                    <option value="bg-right-top">right top</option>
                                    <option value="bg-right-bottom">right bottom</option>
                                    <option value="bg-left-top">left top</option>
                                    <option value="bg-left-bottom">left bottom</option>
                                </select>
                            </div>
                            <div class="w-1/2">
                                <div>Repeat</div>
                                <select v-model="twCss.bgRepeat" @change="updateCSS()">
                                    <option value=""></option>
                                    <option value="bg-repeat">repeat </option>
                                    <option value="bg-no-repeat">no repeat</option>
                                    <option value="bg-repeat-x">repeat x</option>
                                    <option value="bg-repeat-y">repeat y</option>
                                    <option value="bg-repeat-round">round</option>
                                    <option value="bg-repeat-space">space</option>
                                </select>
                            </div>
                            <div class="w-1/2">
                                <div>Attachment</div>
                                <select v-model="twCss.bgAttachment" @change="updateCSS()">
                                    <option value=""></option>
                                    <option value="bg-fixed">fixed</option>
                                    <option value="bg-local">local</option>
                                    <option value="bg-scroll">scroll</option>
                                </select>
                            </div>
                            <div class="w-1/2">
                                <div>Clip</div>
                                <select v-model="twCss.bgClip" @change="updateCSS()">
                                    <option value=""></option>
                                    <option value="bg-clip-border">border</option>
                                    <option value="bg-clip-padding">padding</option>
                                    <option value="bg-clip-content">content</option>
                                    <option value="bg-clip-text">text</option>
                                </select>
                            </div>
                        </div>
                    </div>    
                </transition>

                <!-- GRADIENT -->
                <div class="w-full p-1 mb-1 bg-gray-600 text-white" @click="toggle('gradient-')">Gradient </div>
                <transition>
                    <div v-if="colorCtx==='gradient-'" class="mb-1 flex flex-col">
                        <moka-gradient :gradient="twCss.gradient" :from="twCss.from" :to="twCss.to" :via="twCss.via" @gradient="setGradient"/>
                    </div>
                </transition>
            
                

                <!-- PADDING SETTINGS -->
                <div class="w-full p-1 mb-1 bg-gray-600 text-white" @click="toggle('p-')">Padding</div>
                <transition>
                    <div class="mb-1" v-if="colorCtx==='p-'">
                        All sides <input type="range" min="0" :max="pixels.length" v-model="padding"/>
                        <!--<div :class="twCss.padding + ' border border-dashed'">Sample text</div>-->
                        <div class="flex flex-col w-full p-1">
                            <div><input type="range" min="0" :max="pixels.length-1" v-model="paddingTop"/> Top</div>
                            <div><input type="range" min="0" :max="pixels.length-1" v-model="paddingRight"/> Right</div>
                            <div><input type="range" min="0" :max="pixels.length-1" v-model="paddingBottom"/> Bottom</div>
                            <div><input type="range" min="0" :max="pixels.length-1" v-model="paddingLeft"/> Left</div>
                        </div>
                         <!--<input type="checkbox" v-model="paddingType[padd.toLowerCase()]"/>{{ padd }}-->

                    </div>
                </transition>

                <!-- MARGIN SETTINGS -->
                <div class="w-full p-1 mb-1 bg-gray-600 text-white" @click="toggle('m-')">Margins </div>
                <transition>
                    <div class="mb-1" v-if="colorCtx==='m-'">
                        All sides <input type="range" min="0" :max="pixels.length" v-model="margin"/>
                        <!--<div :class="twCss.margin + ' border border-dashed'">Sample text</div>-->
                        <div v-if="!parseInt(margin)" class="flex flex-col w-full p-1">
                            <div><input type="range" min="0" :max="pixels.length-1" v-model="marginTop"/> Top {{marginTop}}</div>
                            <div><input type="range" min="0" :max="pixels.length-1" v-model="marginRight"/> Right</div>
                            <div><input type="range" min="0" :max="pixels.length-1" v-model="marginBottom"/> Bottom</div>
                            <div><input type="range" min="0" :max="pixels.length-1" v-model="marginLeft"/> Left</div>
                        </div>
                        <input type="checkbox" v-model="marginAuto"> Auto
                    </div>
                </transition>

                 <!-- BORDER SETTINGS -->
                <div class="w-full p-1 mb-1 bg-gray-600 text-white" @click="toggle('border-')">Border </div>
                <transition>
                    <div v-if="colorCtx==='border-'" class="flex flex-col mb-2">
                        <!--
                        <div class="flex flex-row cursor-pointer">
                            <div :class="'w-8 h-8 bg-gray-600 mr-1 ' + setBorder('') + ' ' + borderType + ' ' + twCss.border" @click="currentBorder=borders.all"></div>
                            <div :class="'w-8 h-8 bg-gray-200 mr-1 ' + setBorder('t') + ' '  + borderType + ' ' + twCss.border" @click="currentBorder=borders.top"></div>
                            <div :class="'w-8 h-8 bg-gray-200 mr-1 ' + setBorder('r') + ' '  + borderType + ' ' + twCss.border" @click="currentBorder=borders.right"></div>
                            <div :class="'w-8 h-8 bg-gray-200 mr-1 ' + setBorder('b') + ' '  + borderType + ' ' + twCss.border" @click="currentBorder=borders.bottom"></div>
                            <div :class="'w-8 h-8 bg-gray-200 mr-1 ' + setBorder('l') + ' '  + borderType + ' ' + twCss.border" @click="currentBorder=borders.left"></div>
                        </div>
                        --->
                        Border size<br/>
                        <!--<input type="range" min="0" max="4" v-model="border" class="w-3/4"/>-->
                        <div>
                            <input type="range" min="0" :max="borders.length-1" v-model="border"/> all sides
                        </div>
                        <!--<div :class="twCss.bo + ' border border-dashed'">Sample text</div>-->
                        <div v-if="!parseInt(border)" class="flex flex-col w-3/4">
                            <div><input type="range" min="0" :max="borders.length-1" v-model="borderTop"/> Top</div>
                            <div><input type="range" min="0" :max="borders.length-1" v-model="borderRight"/> Right</div>
                            <div><input type="range" min="0" :max="borders.length-1" v-model="borderBottom"/> Bottom</div>
                            <div><input type="range" min="0" :max="borders.length-1" v-model="borderLeft"/> Left</div>
                        </div>

                        <div>
                            Color <div :class="'w-8 h-8 border-2 ' + twCss.borderColor.replace('border','bg')" @click="colors=!colors"></div> 
                            <!--{{ twCss.border.split('-') ? twCss.border.split('-')[1] : 'default' }}-->
                        </div>
                        Border type
                        <select v-model="twCss.borderType">
                            <option value="">solid</option>
                            <option value="border-dashed">dashed</option>
                            <option value="border-dotted">dotted</option>
                            <option value="border-double">double</option>
                        </select>
                        <!--
                        <div>
                            <input type="radio" name="borderType" v-model="borderType" value=""> Solid
                        </div>
                        <div>
                            <input type="radio" name="borderType" v-model="borderType" value="border-dashed"> Dashed
                        </div>
                        <div>
                            <input type="radio" name="borderType" v-model="borderType" value="border-dotted"> Dotted 
                        </div>
                        <div>
                            <input type="radio" name="borderType" v-model="borderType" value="border-double"> Double 
                        </div>
                        -->
                        
                    </div>
                </transition>  

               

                

                <div class="w-full p-1 mb-1 bg-gray-600 text-white" @click="toggle('extra-')">Extras </div>
                <transition>
                    <div v-if="colorCtx==='extra-'" class="flex flex-col mb-2">
                        <div class="flex flex-row mb-1">
                            <div class="w-1/4">Shadow </div>
                            <select v-model="twCss.shadow" @change="updateCSS">
                                <option value=""></option>
                                <option value="shadow">normal</option>
                                <option value="shadow-xs">extra small</option>
                                <option value="shadow-sm">small</option>
                                <option value="shadow-md">medium</option>
                                <option value="shadow-lg">large</option>
                                <option value="shadow-xl">extra large</option>
                                <option value="shadow-2xl">extra large x 2</option>
                            </select>
                        </div>
                        <div class="flex flex-row">
                            <div class="w-1/4">Rounded</div>
                            <select v-model="twCss.rounded" @change="updateCSS">
                                <option value=""></option>
                                <option value="rounded">normal</option>
                                <option value="rounded-md">medium</option>
                                <option value="rounded-lg">large</option>
                                <option value="rounded-full">full</option>
                            </select>
                        </div>

                        <div class="flex flex-row">
                            <div class="w-1/4">Animation</div>
                            <select v-model="twCss.animation" @change="updateCSS">
                                <option value="">no animation</option>
                                <option value="animation-1">Fade</option>
                                <option value="animation-2">Slide</option>
                                <option value="animation-3">Flip 1</option>
                                <option value="animation-4">Flip 2</option>
                                <option value="animation-5">Tilt In</option>
                                <option value="animation-6">Roll In</option>
                            </select>
                        </div>
                    </div>
                </transition>
            </div>

            <!-- GRID SETTINGS -->
            <!--
                <div class="w-full p-1 mb-1 bg-gray-600 text-white" @click="colorCtx='grid-'" v-if="this.$attrs.selected.type.includes('grid')">Grid</div>
                <transition name="fade"> 
                    <div v-if="colorCtx==='grid-'" class="flex flex-col w-3/4">
                        Grid Gap {{twCss.gridgap}}
                        <select class="w-full" v-model="gridgap">
                            <option v-for="g in gridgaps" :value="g.value">{{g.label}}</option>
                        </select>
                    </div>
                </transition>   
            -->
            <div class="text-xs"></div>
            <div class="text-xs">{{ allCss }}</div>
            <div class="flex w-full flex-col mb-8 p-1">
                <div class="flex flex-row">
                    <button class="success mr-2 sm p-1" @click="save">Save</button> 
                    <button @click="$emit('close')" class="sm p-1">Close</button>
                    <!--<div @click="editCss=!editCss" class="mb-1"><i class="material-icons text-sm text-gray-200 cursor-pointer" title="Edit CSS">edit</i> Custom</div>-->
                </div>
                Custom CSS
                <textarea v-model="editedCss" class="w-full text-black mb-8"/>
                <!--<div class="text-light text-red-400 mb-8">(Click Save to retain custom classes)</div>-->
            </div>

            
            <transition v-if="colors" name="slidedown">
                <nuxpresso-admin-palette v-if="colors" :css="currentCss" @close="colors=!colors" @color="setColor"/>
            </transition>

            <transition name="fade">
                <nuxpresso-media v-if="media" @close="media=!media" @newimage="setImage"/> 
            </transition>
            
            
        </div>
    </div>
</template>

<script>
import NuxpressoAdminPalette from '@/components/palette'
import NuxpressoColor from '@/components/color'
import MokaCustomizeGrid from '@/components/editor/tailwind.grid'
import MokaWidths from '@/components/editor/tailwind.width'
import MokaGradient from '@/components/editor/tailwind.gradient'
import MokaPosition from '@/components/editor/tailwind.position'
import MokaTwJustify from '@/components/editor/tailwind.justify'
export default {
    name: 'MokaTailwindClassHelper',
    components: { NuxpressoAdminPalette , NuxpressoColor , MokaPosition , MokaCustomizeGrid , MokaGradient , MokaTwJustify , MokaWidths },
    data:()=>({
        rand: '',
        currentImage: null,
        media: false,
        colors: false,
        colorCtx: '',
        bg_over: false,
        bg_opacity: 100,
        opacity:  100,
        currentCss: '',
        pixels: [ 1 , 4 , 8 , 12 , 16 , 20 , 24 , 32 , 40 , 48, 64 , 80 , 96 , 128 , 160 , 192 , 224 , 256 ],
        gridgap: '',
        itemsAlign : [
            { label: 'center'   , value: 'items-center' } , 
            { label: 'start'    , value: 'items-start' } , 
            { label: 'end'      , value: 'items-end' } , 
            { label: 'baseline' , value: 'items-baseline'} , 
            { label: 'shrink'   , value: 'items-shrink'}
        ],
        gridgaps: [
            { label: 'not set' , value: '' },
            { label: '0' , value: 'gap-0' } , 
            { label: '1' , value: 'gap-1' } , 
            { label: '2' , value: 'gap-2' } , 
            { label: '3' , value: 'gap-3' } , 
            { label: '4' , value: 'gap-4' } , 
            { label: '5' , value: 'gap-5' } , 
            { label: '6' , value: 'gap-6' } , 
            { label: '8' , value: 'gap-8' } , 
            { label: '10', value: 'gap-10'}, 
            { label: '12', value: 'gap-12'} , 
            { label: '16', value: 'gap-16'} , 
            { label: '20', value: 'gap-20'} ,
        ],
        sizes : [ '','text-xs' , 'text-sm' , 'text-base' , 'text-lg' , 'text-xl' , 'text-2xl' , 'text-3xl' , 'text-4xl' , 'text-5xl' , 'text-6xl' , 'text-7xl' , 'text-8xl' , 'text-9xl' , 'text-10xl' , 'text-20xl'],
        aligns: [ 'text-left' , 'text-center' , 'text-right' ],
        textHover: '',
        text_over: false,
        textSize: 0,
        textAlign: '',
        lineHeight: 0,
        fontType: ['','font-bold','font-black'],
        fontTransform: ['italic','underline','capitalize','uppercase','lowercase'],
        font: {
            bold: '',
            black: '',
            italic: '',
            underline: '',
            transform:''
        },
        borders: {
            all : '',
            top: 't',
            right: 'r',
            bottom: 'b',
            left: 'l'
        },
        borderTypes : ['','border-dashed','border-dotted'],
        currentBorder: '',
        border: 0,
        isBorder: '',
        borderColor: '',
        borderTop: 0,
        borderRight: 0,
        borderBottom: 0,
        borderLeft: 0,
        borderType:'',
        borderSides: {
            all: '',
            top: '',
            right: '',
            bottom: '',
            left: ''
        },
        borderSize: '',
        justifyItems: '',
        padding: 0,
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingType: {
            all: '',
            top: '',
            right: '',
            bottom: '',
            left: ''
        },
        margin: 0,
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginType: {
            all: '',
            top: '',
            right: '',
            bottom: '',
            left: ''
        },
        marginAuto: '',
        width: '',
        widths: [ 
            { label: 'not set' , value: '' },
            { label: 'auto' , value: 'w-auto' } ,
            { label: '8%' , value: 'w-1/12'} , 
            { label: '16%' , value: 'w-1/6'} , 
            { label: '20%' , value: 'w-1/5' },
            { label: '25%' , value: 'w-1/4'}, 
            { label: '33%' , value: 'w-1/3'} , 
            { label: '40%' , value: 'w-2/5'} , 
            { label: '50%' , value: 'w-1/2'} , 
            { label: '60%' , value: 'w-3/5'} , 
            { label: '66%' , value: 'w-2/3'} ,
            { label: '75%' , value: 'w-3/4'} , 
            { label: '80%' , value: 'w-4/5'} ,
            { label: '83%' , value: 'w-5/6'} , 
            { label: '90%' , value: 'w-11/12'} , 
            { label: '100%', value: 'w-full'} ,
            { label: 'screen', value: 'w-screen'} 
        ],
        height: '',
        heights: [
            { label: 'not set' , value: '' },
            { label: 'auto', value: 'h-auto' }, 
            { label: '0' , value: 'h-0' } , 
            { label: '1' , value: 'h-1' } , 
            { label: '2' , value: 'h-2' } , 
            { label: '3' , value: 'h-3' } , 
            { label: '4' , value: 'h-4' } , 
            { label: '5' , value: 'h-5' } , 
            { label: '6' , value: 'h-6' } , 
            { label: '8' , value: 'h-8' } , 
            { label: '10', value: 'h-10'}, 
            { label: '12', value: 'h-12'} , 
            { label: '16', value: 'h-16'} , 
            { label: '20', value: 'h-20'} ,
            { label: '24', value: 'h-24'} , 
            { label: '32', value: 'h-32'} , 
            { label: '40', value: 'h-40'} , 
            { label: '48', value: 'h-48'} , 
            { label: '56', value: 'h-56'} , 
            { label: '64', value: 'h-64'} , 
            { label: '20%' , value: 'h-1/5'},
            { label: '25%' , value: 'h-1/4' },
            { label: '33%' , value: 'h-1/3' },
            { label: '50%' , value: 'h-1/2' },
            { label: '66%' , value: 'h-2/3' },
            { label: '75%' , value: 'h-3/4' },
            { label: '80%' , value: 'h-4/5' },
            { label: 'full',value: 'h-full' } , 
            { label: 'screen' , value: 'h-screen' }
        ],
        borders: [ null , '' , '2' , '4' , '8' ],
        shadow: '',
        rounded: '',
        modal: '',
        extras: {
            shadow: '',
            modal: '',
            rounded: ''
        },
        
        twCss :{
            itemsAlign: '',
            text: '',
            textOver: '',
            textSize: '',
            textAlign: '',
            font:'',
            bg: '',
            bgOver: '',
            bgSize: 'bg-cover',
            bgPosition:'bg-center',
            bgRepeat: 'bg-no-repeat',
            bgClip: '',
            gradient: '',
            from: '',
            via: '',
            to:'',
            border: '',
            borderSize: '',
            borderType: '',
            borderColor: '',
            padding:'',
            margin: '',
            positionx: '',
            positiony: '',
            transform: '',
            zindex: '',
            width: '',
            other: '',
            extra: '',
            gridgap: ''
        },
        zindex:0,
        position:'',
        init: true,
        editCss: false,
        editedCss: '',
        allCss: null,
        tailwind:null,
        classe: {}
    }),
    
    props: [ 'id' ], 
    computed:{
        importCSS(){
            if ( this.init ){
                if ( this.$attrs.classe ){
                    let cl = this.$attrs.classe.split(' ')
                    cl.forEach ( key => {
                        if ( key ){
                            this.classe[key] = key
                        }
                    })
                    if ( this.classe ){
                        this.$serialize(this.classe )
                    }
                }
                this.init = false
                this.parentCSS()
            }
        },
        bp(){
            return '' //this.$attrs.breakpoint ? this.$attrs.breakpoint + ':' : ''
        }
    },
    watch:{
        id(v){
            this.parentCSS()
            this.init = true
        },
        /*
        twCss:{
            handler(old){
                this.updateCSS()
            },
            deep: true
        },
        */
        zindex(v){
            this.twCss.zindex = 'z-' + v
            this.updateCSS()
        },
        textSize(v){
            this.twCss.textSize = this.sizes[v]
            this.updateCSS()
        },
        textAlign(v){
            this.twCss.textAlign = v
            this.updateCSS()
        },
        lineHeight(v){
            parseInt(v) > 2 ?
                this.twCss.lineHeight = 'leading-' + v : this.twCss.lineHeight= ''
            this.updateCSS()
        },
        justifyItems(v){
            this.twCss.justifyItems = v
            this.updateCSS()
        },
        border(v){
            /*
            let borders = [ '0' , '' , '-2' , '-4' , '-8' ]
            v > 0 ? this.borderSize =  borders[v] : ''
            v > 0 ? this.isBorder = 'border' : ''
            v > 0 ? !this.borders ? this.setBorder('') : null : ''
            this.twCss.borderSize = 'border' + this.borderSize
            this.updateCSS()
            */
        },
        borderType(v){
            this.twCss.borderType = v ? v : ''
        },
        borderColor(v){
            this.twCss.borderColor = v ? v : ''
        },
        
        font(v){
            this.updateCSS()
        },
        padding(v){
            console.log ( 'padding=>' , v )
            let value = this.pixels[parseInt(v)]/4
            this.paddingType.all = parseInt(v) ? this.bp + 'p-' + value : ''
            
            this.updateCSS()
        },
        paddingTop(v){
            let value = this.pixels[v]/4
            this.paddingType.top = parseInt(v) ? this.bp + 'pt-' + value : ''
            this.updateCSS()
        },
        paddingRight(v){
            let value = this.pixels[v]/4
            this.paddingType.right = parseInt(v) ? this.bp + 'pr-' + value : ''
            this.updateCSS()
        },
        paddingBottom(v){
            let value = this.pixels[v]/4
            this.paddingType.bottom = parseInt(v) ? this.bp + 'pb-' + value : ''
            this.updateCSS()
        },
        paddingLeft(v){
            let value = this.pixels[v]/4
            this.paddingType.left = parseInt(v) ? this.bp + 'pl-' + value : ''
            this.updateCSS()
        },
        margin(v){
            let value = this.pixels[parseInt(v)]/4
            this.marginType.all = parseInt(v) ? this.bp + 'p-' + value : ''
            if ( v ){
                this.marginType.top = ''
                this.marginType.right = ''
                this.marginType.bottom = ''
                this.marginType.left = ''
            }
            this.updateCSS()

        },
        marginTop(v){
            console.log ( v )
            let value = this.pixels[v]/4
            this.marginType.top = parseInt(v) ? this.bp + 'mt-' + value : ''
            this.updateCSS()
        },
        marginRight(v){
            let value = this.pixels[v]/4
            this.marginType.right = parseInt(v) ? this.bp + 'mr-' + value : ''
            this.updateCSS()
        },
        marginBottom(v){
            let value = this.pixels[v]/4
            this.marginType.bottom = parseInt(v) ? this.bp + 'mb-' + value : ''
            this.updateCSS()
        },
        marginLeft(v){
            let value = this.pixels[v]/4
            this.marginType.left = parseInt(v) ? this.bp + 'ml-' + value : ''
            this.updateCSS()
        },
        marginAuto(v){
            this.marginAuto = v
            this.updateCSS()
        },

        border(v){
            this.twCss.border = parseInt(v) ? v < 2 ? 'border' : 'border-' + this.borders[v] : ''
            this.borderSides.all = parseInt(v) ? v < 2 ? 'border' : 'border-' + this.borders[v] : ''
            if ( v > 0 ){
                this.borderSides.top = ''
                this.borderSides.right = ''
                this.borderSides.bottom = ''
                this.borderSides.left = ''
            }
            this.updateCSS()

        },
        borderTop(v){
            console.log ( v )
            this.borderSides.top = parseInt(v) ? v < 2 ? 'border-t' : 'border-t-' + this.borders[v] : ''
            this.updateCSS()
        },
        borderRight(v){
            this.borderSides.right = parseInt(v) ? v < 2  ? 'border-r' : 'border-r-' + this.borders[v] : ''
            this.updateCSS()
        },
        borderBottom(v){
            this.borderSides.bottom = parseInt(v) ? v < 2  ? 'border-b' : 'border-b-' + this.borders[v] : ''
            this.updateCSS()
        },
        borderLeft(v){
            this.borderSides.left = parseInt(v) ? v < 2 ? 'border-l' : 'border-l-' + this.borders[v] : ''
            this.updateCSS()
        },


        width(v){
            this.twCss.width = v
                //v != '0' && v > 0 ? 'w-' + this.widths[v] : ''
            this.updateCSS()
        },

        height(v){
            this.twCss.height = v
            this.updateCSS()
        },
        /*
        shadow(v){
            v ? this.extras.shadow = v : this.extras.shadow = ''
            this.updateCSS()
        },
        rounded(v){
            v ? this.extras.rounded = v : this.extras.rounded = ''
            this.updateCSS()
        },
        */
        modal(v){
            v ? this.extras.modal = 'nuxpresso-modal' : this.extras.shadow = ''
            this.updateCSS()
        },
        editedCss(v){
            this.$emit ( 'classe' , v )
        },
        gridgap(v){
            this.twCss.gridgap = v
            this.updateCSS()
        },
        bg_opacity(v){
            this.twCss.bg_opacity = v ? 'bg-opacity-' + v : ''
            this.updateCSS()
        },
        opacity(v){
            console.log ( v )
            this.twCss.opacity = v ? 'opacity-' + v : ''
            this.updateCSS()
        },
        position(v){
            this.twCss.position = v
            this.updateCSS()
        }
        
    },
    methods: {
        stile(stile){
            this.$emit('stile',stile)
        },
        setTW(scope){
            this.twCss[scope[0]] = scope[1]
            this.updateCSS()
        },
        setGradient(gradient){
            this.twCss.gradient = gradient.gradient
            this.twCss.from = gradient.from
            this.twCss.to = gradient.to
            this.twCss.via = gradient.via
            this.updateCSS()
        },
        toggle(what){
            this.colorCtx === what ? this.colorCtx = '' : this.colorCtx = what
        },
         parentCSS(){
            console.log ( 'classe changed' )
            let css
            this.allCss = this.$attrs.classe
            
            let classi = this.allCss.split( ' ' )
            classi.forEach ( classe => {
                let deserialize = this.$cssDeserialize(classe)
                if ( deserialize ) {
                    deserialize.length === 2 ?
                        this.twCss[deserialize[0]] = deserialize[1] :
                            this[deserialize[0]] = deserialize[1]
                    this.allCss = this.allCss.replace ( classe , '' )
                }
            })
            if ( this.$attrs.classe && this.$attrs.classe.length > 1 ){
                css = this.$attrs.classe.split(' ')
                
                css.forEach ( (c,index) => {
                    if ( c ){
                        //if ( c.indexOf ('hover:text-') > -1 ){
                        //    this.textHover = c
                        //    this.twCss.textOver = c
                        //    this.allCss = this.allCss.replace(c,'')
                        //}
                        
                        if ( c.indexOf ( 'bg-opacity-') > -1 ){
                            this.bg_opacity = c.split('-')[2]
                            this.allCss = this.allCss.replace(c,'')
                        }
                        
                        if ( c.indexOf('gap') > -1  ){
                            this.gridgap = c
                            this.allCss = this.allCss.replace(c,'')
                        }
                        if ( c.indexOf ( 'shadow' ) > -1 ){
                            this.extras.shadow = c
                            this.shadow = c
                            this.allCss = this.allCss.replace(c,'')
                        }
                        if ( c.indexOf ( 'rounded' ) > -1 ){
                            this.extras.rounded = c
                            this.rounded = c
                            this.allCss = this.allCss.replace(c,'')
                        }
                        if ( c.indexOf ( 'nuxpresso-modal') > -1 ){
                            this.extras.modal = c
                            this.modal = true
                            this.allCss = this.allCss.replace(c,'')
                        }
                        if ( this.sizes.includes( c ) ){
                            this.twCss.textSize = c
                            this.textSize = this.sizes.indexOf(c)
                            this.allCss = this.allCss.replace(c,'')
                        }
                        if ( this.aligns.includes ( c ) ){
                            this.twCss.textAlign = c
                            this.textAlign = c
                            this.allCss = this.allCss.replace(c,'')
                        } 
                        /*
                        if (  ['text-black','text-white','text-transparent'].includes(c) ){
                            this.twCss.text = c 
                            this.text = c
                            this.allCss = this.allCss.replace(c,'')
                        }
                        */
                        if ( this.borderTypes.includes(c) ){
                            this.twCss.borderType = c
                            this.borderType = c
                            this.allCss = this.allCss.replace(c,'')
                        }
                        
                        if ( this.fontTransform.includes(c) ){
                            this.font[c] = c
                            this.allCss = this.allCss.replace(c,'')    
                        }

                        if ( this.fontType.includes(c) ){
                            c.split('-').length > 1 ?
                                this.font[c.split('-')[1]] = c : this.font[c] = c
                            this.allCss = this.allCss.replace(c,'')    
                        }
                        /*
                        if ( c === 'border' ){
                            this.border = 1
                            this.allCss = this.allCss.replace(c,'')
                        }
                        if ( c.indexOf('border-') > -1 ){
                            if ( c.indexOf('border-t') > -1 ){
                                if ( c.split('-').length < 3 ){
                                        this.borderTop = 1
                                    } else {
                                        this.borderTop = c.split('-')[2]
                                    }
                                    this.allCss = this.allCss.replace(c,'')
                                }
                            if ( c.indexOf('border-r') > -1 ){
                                if ( c.split('-').length < 3 ){
                                    this.borderRight = 1
                                } else {
                                    this.borderRight = c.split('-')[2]
                                }
                                this.allCss = this.allCss.replace(c,'')
                            }
                            if ( c.indexOf('border-b') > -1 ){
                                if ( c.split('-').length < 3 ){
                                    this.borderBottom = 1
                                } else {
                                    this.borderBottom = c.split('-')[2]
                                }
                                this.allCss = this.allCss.replace(c,'')
                            }                        
                            if ( c.indexOf('border-l') > -1 ){
                                if ( c.split('-').length < 3 ){
                                    this.borderLeft = 1
                                } else {
                                    this.borderLeft = c.split('-')[2]
                                }
                                this.allCss = this.allCss.replace(c,'')
                            }
                            if ( c.indexOf('border-black') > -1 && c.indexOf('border-white') > -1) {
                                this.borderColor = c
                                this.allCss = this.allCss.replace(c,'')
                            } else {
                                if ( c.split('-').length < 3 ){
                                    console.log ( c )
                                    this.border = this.borders.indexOf(c.split('-')[1])
                                } else {
                                    this.borderColor = c
                                }
                                this.allCss = this.allCss.replace(c,'')
                            }
                        }

                        */
                        /*
                        if ( c.indexOf('text') > -1 ){
                            let t = c.split('-')
                            
                            if ( t.length === 3 ){
                                this.twCss.text = c
                                this.allCss = this.allCss.replace(c,'')
                            }
                        }
                        */
                       /*
                        if ( c.indexOf('bg') === 0 ){
                            this.twCss.bg = c
                            this.allCss = this.allCss.replace(c,'')
                        }
                        if ( c.indexOf('hover:bg') === 0 ){
                            this.twCss.bgOver = c
                            this.allCss = this.allCss.replace(c,'')
                        }
                        */
                        /*
                        if ( c.indexOf('p-') > -1 ){
                            this.padding = (c.split('-')[1]/4)+1
                            this.allCss = this.allCss.replace(c,'')
                        }
                        */

                       /*
                        if ( c.indexOf('pt-') > -1 ){
                            this.paddingTop = (c.split('-')[1]/4)+1
                            this.allCss = this.allCss.replace(c,'')
                        }
                        if ( c.indexOf('pr-') > -1 ){
                            this.paddingRight = (c.split('-')[1]/4)+1
                            this.allCss = this.allCss.replace(c,'')
                        }
                        if ( c.indexOf('pb-') > -1 ){
                            this.paddingBottom = (c.split('-')[1]/4)+1
                            this.allCss = this.allCss.replace(c,'')
                        }
                        if ( c.indexOf('pl-') > -1 ){
                            this.paddingLeft = (c.split('-')[1]/4)+1
                            this.allCss = this.allCss.replace(c,'')
                        }

                        if ( c.indexOf('bg') === 0 ){
                            this.twCss.bg = c
                            this.allCss = this.allCss.replace(c,'')
                        }
                        if ( c.indexOf('hover:bg') === 0 ){
                            this.twCss.bgOver = c
                            this.allCss = this.allCss.replace(c,'')
                        }
                        */
                        /*
                        if ( c.indexOf('m-') > -1 ){
                            this.margin = (c.split('-')[1]/4)+1
                            this.allCss = this.allCss.replace(c,'')
                        }
                        if ( c.indexOf('mt-') > -1 ){
                            this.marginTop = (c.split('-')[1]/4)+1
                            this.allCss = this.allCss.replace(c,'')
                        }
                        if ( c.indexOf('mr-') > -1 ){
                            this.marginRight = (c.split('-')[1]/4)+1
                            this.allCss = this.allCss.replace(c,'')
                        }
                        if ( c.indexOf('mb-') > -1 ){
                            this.marginBottom = (c.split('-')[1]/4)+1
                            this.allCss = this.allCss.replace(c,'')
                        }
                        if ( c.indexOf('ml-') > -1 ){
                            this.margingLeft = (c.split('-')[1]/4)+1
                            this.allCss = this.allCss.replace(c,'')
                        }
                        */
                        if ( c.indexOf('-ml-') === 0 ){
                            this.twCss.positionx = c
                            this.allCss = this.allCss.replace(c,'')
                        }
                        if ( c.indexOf('-mt-') === 0 ){
                            this.twCss.positiony = c
                            this.allCss = this.allCss.replace(c,'')
                        }
                        if ( c.indexOf ( 'm-auto') > -1 ){
                            this.marginAuto = true
                            this.margin = 0
                            this.marginTop = 0
                            this.marginRight = 0
                            this.marginBottom = 0
                            this.marginLeft = 0
                            this.allCss = this.allCss.replace(c,'')
                        }

                        if ( c.indexOf( this.$attrs.breakpoint + ':w-') === 0){
                            this.width = c
                            this.allCss = this.allCss.replace(c,'')
                        }

                        if ( c.indexOf('h-') > -1){
                            this.height = c
                            this.allCss = this.allCss.replace(c,'')
                        }
                    }
                })
                console.log ( this.allCss )
                this.$attrs.hasimage ? this.currentImage = this.$attrs.hasimage : this.currentImage = null
                this.updateCSS()
            }
        },
        getTextAlign(textAlign){
           return this.twCss.textAlign === textAlign ? 'border' : ''
        },
        setColor(color,tone){
            this.colors = false
            if ( this.colorCtx != 'border-' ){
                if ( color ){
                    let t = tone ? '-' + tone : ''
                    this.bg_over || this.text_over ?
                        this.twCss[this.colorCtx.replace('-','')+'Over'] = 'hover:' + this.colorCtx + color + t :    
                            this.twCss[this.colorCtx.replace('-','')] = this.colorCtx + color + t
                } else {
                    this.twCss[this.colorCtx.replace('-','')] = ''
                }
            } else {
                if ( color ){
                    let t = tone ? '-' + tone : ''
                    this.borderColor = 'border-' + color + t
                    this.twCss['borderColor'] = 'border-' + color + t
                }
            }
            this.updateCSS()
        },
        setTWColor(color){
            console.log ( color )
            this.twCss[this.colorCtx.replace('-','')] = color
        },
        setBorder(what){
            /*
            let borders = [ '0' , '' , '-2' , '-4' , '-8' ]
            let b= what ? '-' + what : ''
            if ( what === this.currentBorder ){
                if ( this.border ){
                    this.twCss.borderSize = 'border'  + b + borders[this.border]
                    return 'border' + b +  borders[this.border]
                }
            }
            this.updateCSS()
            */
        },
        getFont(what){
            this.updateCSS()
            return this.font[what] === 'font-' + what || this.font[what] === what || this.font.transform === what ? 'bg-blue-500' : ''
        },
        updateCSS(){
            this.currentCss = Object.values ( this.twCss ).join(' ')
            this.twCss.other = this.allCss
            //let padding = Object.values(this.paddingType).join(' ') //.replace(/\s\s+/g, ' ')
            //this.twCss.padding = parseInt(this.padding) ? 'p-' + this.padding : padding
            //let margin = Object.values(this.marginType).join(' ') ///.replace(/\s\s+/g, ' ')
            this.twCss.padding = Object.values ( this.paddingType ).join (' ')
            this.twCss.margin = Object.values(this.marginType).join(' ')
            //this.twCss.margin = parseInt(this.margin) ? 'm-' + this.margin : margin
            this.twCss.font = Object.values(this.font).join(' ')
            this.twCss.extra = Object.values(this.extras).join(' ')
            this.twCss.border = Object.values(this.borderSides).join(' ')
            this.marginAuto ? this.twCss.margin = 'm-auto ' + this.twCss.margin : null
            this.$emit ( 'classe' , Object.values ( this.twCss ).join(' ').replace(/\s\s+/g, ' ').replace(/\s\s+/g, 'md:') )
            this.editedCss =  Object.values ( this.twCss ).join(' ').replace(/\s\s+/g, ' ')
        },
        save(){
            this.updateCSS()
            this.$emit('save')
        },
        setImage(img){
            this.currentImage = img
            this.$emit('image',img)
        }

    }
}
</script>

<!--
<style>
.tailwind-editor > div > * {
    font-family: monospace;
    font-size:1rem;
    font-weight:100;
    color:#cecece;
}
</style>
-->