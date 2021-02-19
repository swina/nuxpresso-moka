// NOT USED //
import Vue from 'vue'

const twVariants = [
    { 
        variant: 'bgcolor',
        selector: 'color',
        label: 'background color' ,
        values: [ 'bg-' , 'hover:bg']
    },
    {   variant: 'textcolor',
        selector: 'color',
        label: 'text color',
        values: ['text-transparent','text-white','text-blank','hover:text-']
    },
    {
        variant: 'text',
        selector: 'select',
        label: 'text',
        values: [ 'text-xs' , 'text-sm' , '' , 'text-lg' , 'text-xl' , 'text-2xl' , 'text-3xl' , 'text-4xl' , 'text-5xl' ]
    },
    {
        variant: 'textalign',
        selector: 'select',
        label: 'text align',
        values: [ 'text-left' , 'text-center' , 'text-right' ]
    },
    {   variant: 'fontweight',
        selector: 'select',
        label: 'text format',  
        values: [ 'font-bold','font-black','italic','underline','capitalize','uppercase','lowercase']
    },
    {   variant: 'margin',
        selector: 'range',
        label: 'margin',
        values: [ '-1' , '-2' , '-3' , '-4' , '-5' , '-6' , '-8', '-10' , '-12', '-16', '-20', '-24', '-32', '-40', '-48', '-56', '-64' ]
    },
    {
        variant: 'padding',
        selector: 'range',
        label: 'padding',
        values: [ '-1' , '-2' , '-3' , '-4' , '-5' , '-6' , '-8', '-10' , '-12', '-16', '-20', '-24', '-32', '-40', '-48', '-56', '-64' ]
    },
    { 
        variant: 'width',
        selector: 'select',
        label: 'width',
        values: [ '' , 'w-1/5' , 'w-1/4' , 'w-1/3' , 'w-2/5' , 'w-1/2' ,'w-3/5' , 'w-2/3' , 'w-3/4' , 'w-4/5' , 'w-full' , 'w-screen' , 'w-auto' ]
    },
    {   
        variant: 'height',
        selector: 'select',
        label: 'height',
        values: [ '' , 'h-0' , 'h-1' , 'h-2' , 'h-3' , 'h-4' , 'h-5' , 'h-6' , 'h-8' , 'h-10', 'h-12', 'h-16', 'h-20', 'h-24', 'h-32', 'h-40', 'h-48', 'h-56', 'h-64' , 'h-auto' , 'h-full' , 'h-screen' ],
    },
    {   
        variant: 'border',
        selector: 'range',
        label:'border',
        values: [ -1 , '' , '-2' , '-4' , '8' ]
    },
    {   
        variant: 'shadow',
        selector: 'select',
        label: 'shadow',
        values: [ 'shadow-xs' , 'shadow-xm' , 'shadow' , 'shadow-md' , 'shadow-lg' , 'shadow-xl' , 'shadow-2xl' ]
    },
    {
        variant: 'shadowtype',
        selector: 'select',
        label: 'shadow type' ,
        values : [ 'shadow-inner' , 'shadow-outline' , 'shadow-none' ]
    },
    {
        variant: 'rounded',
        selector: 'select',
        label: 'rounded',
        values: [ '','rounded-sm' , 'rounded' , 'rounded-md' , 'rounded-lg' , 'rounded-full' ] 
    }
]

const  variants = {
    bg : [ 'bg-' ],
    textcolor   : [ 'text-','hover:text-' , 'text-black' , 'text-white' , 'text-transparent' ],
    text   : [ 'text-xs' , 'text-sm' , '' , 'text-lg' , 'text-xl' , 'text-2xl' , 'text-3xl' , 'text-4xl' , 'text-5xl' ],
    textalign  : [ 'text-left' , 'text-center' , 'text-right' ],
    fontweight  : [ 'font-bold','font-black','italic','underline','capitalize','uppercase','lowercase'],
    padding: [ '' , 'pt-' , 'pr-' , 'pb-' , 'pl-' , 'p-'],
    paddingsize: [''],

    margin: [  'mt' , 'mr' , 'mb' , 'ml' ,  'm' , 'mx' , 'my' , 'm-auto' ],
    marginlabels: [ 'top' , 'right' , 'bottom' , 'left' , 'all' , 'x-axis' , 'y-axis' , 'auto' ],
    marginsize: [ '-1' , '-2' , '-3' , '-4' , '-5' , '-6' , '-8', '-10' , '-12', '-16', '-20', '-24', '-32', '-40', '-48', '-56', '-64' ],
    
    width: [ '' , 'w-1/5' , 'w-1/4' , 'w-1/3' , 'w-2/5' , 'w-1/2' ,'w-3/5' , 'w-2/3' , 'w-3/4' , 'w-4/5' , 'w-full' , 'w-screen' , 'w-auto' ],
    height: [ '' , 'h-0' , 'h-1' , 'h-2' , 'h-3' , 'h-4' , 'h-5' , 'h-6' , 'h-8' , 'h-10', 'h-12', 'h-16', 'h-20', 'h-24', 'h-32', 'h-40', 'h-48', 'h-56', 'h-64' , 'h-auto' , 'h-full' , 'h-screen' ],

    border: [ '' , 'border-t' , 'border-r' , 'border-b' , 'border-l' , 'border' , 'border-' ],
    bordersize: [ '' , '-2' , '-4' , '8' ],
    shadow: [ 'shadow-xs' , 'shadow-xm' , 'shadow' , 'shadow-md' , 'shadow-lg' , 'shadow-xl' , 'shadow-2xl' ],
    shadowtype : [ 'shadow-inner' , 'shadow-outline' , 'shadow-none' ],
    rounded: [ 'rounded' ]
}


function cssVariant ( str='' ){
    return str.split('-').length 
}


export default {
    install: function (Vue) {
        Vue.prototype.$variants = ()=>{
            return twVariants
        }

        Vue.prototype.$cssVariant = ( str = '' )=>{
            if ( !str ) return ''
        }

        Vue.prototype.$variantLabel = ( str = '' , pos = 0 )=>{
            return variants[str+'labels'][pos]
        }
        Vue.prototype.$cssSerialize = function ( str = '' ){
            if ( !str ) return ''
            let variant_2, value
            switch (cssVariant(str)){
                case 2:
                    variant_2 = str.split('-')[0] 
                    value = str.split('-')[1]
                    break
                case 3:
                    value = str.split('-')[2]
                    variant_2 = str.split('-')[1]
                    break
                default:
                    null
            } 
            
            //console.log ( cssVariant(str) , '=>variant_2=> ' , variant_2 )
            let obj = {}

            Object.keys(variants).forEach( group => {
                variants[group].forEach ( (variant,index) => {
                    if ( variant === str ){ 
                        obj = {
                            group: group,
                            index: index,
                            sizes: variants[group],
                            variant: variant,
                            subindex: null,
                            max: variants[group].length,
                            label: variants[group+'labels']?variants[group+'labels'][index]:''
                        }
                        variant_2 = null
                        /*
                        if ( variants[group+'size'] && value ){
                            console.log ( group+'size', value )
                            obj.subindex = variants[group+'size'].indexOf('-' + value)
                            variant_2 = null 
                        }
                        console.log ( obj )
                        return obj
                       */
                    }
                })
            })
            return obj
            /*
             if ( variant_2 && variant_2 === variant ){
                        obj = {
                            group: group,
                            index: index,
                            variant: variant_2,
                            max: variants[group].length,
                            label: variants[group+'labels'][index]
                        }
                        if ( variants[group+'size'] && value ){
                            console.log ( variants[group+'size'], value , variants[group+'size'].indexOf('-' + value))
                            obj.subindex = variants[group+'size'].indexOf('-' + value)
                            obj.sizes = variants[group+'size']
                            obj.max = variants[group+'size'].length
                        }
                        return obj
                    }*/
            
        }
   }
}