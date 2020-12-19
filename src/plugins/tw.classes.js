const values = [0,0.5,1,1.5,2,2.5,3,3.5,4,5,6,7,8,9,10,11,12,14,16,20,24,28,32,36,40,44,48,52,56,60,64,72,80,96]
const pixels = [ 1 , 4 , 8 , 12 , 16 , 20 , 24 , 32 , 40 , 48, 64 , 80 , 96 , 128 , 160 , 192 , 224 , 256 ]

function setClass ( prefix , negative ){
    let arr = []
    if ( negative ){
        let neg = pixels
        neg.slice().reverse().forEach ( v => {
            arr.push ( '-' + prefix + '-' + parseInt(v/4) )
        })
        arr.push(' ')
    }
    pixels.forEach ( v => {
        arr.push ( prefix + '-' + parseInt(v/4) )
    })
    
    return arr
}

function setOpacity ( prefix ){
    let arr = []
    for ( var n=0 ; n < 5 ; n++ ){
        arr.push ( prefix + '-' + (n*25) )
    }
    return arr
}
var classes = {
    semantics:['article','aside','details','figcaption','figure','footer','header','main','mark','nav','section','summary','time'],
    textSize: [
        'text-xs' , 
        'text-sm' , 
        'text-base' , 
        'text-lg' , 
        'text-xl' , 
        'text-2xl' , 
        'text-3xl' , 
        'text-4xl' , 
        'text-5xl' , 
        'text-6xl' , 
        'text-7xl' , 
        'text-8xl' , 
        'text-9xl' , 
        'text-10xl' , 
        'text-20xl'
    ],
    textAlign: [
        'text-left',
        'text-center',
        'text-right',
        'text-justify'
    ],
    textlineheight: [
        'leading-none',
        'leading-tight',
        'leading-snug',
        'leading-normal',
        'leading-relaxed',
        'leading-loose'
    ],
    textOpacity: setOpacity('text-opacity'),
    fontfamily: [
        'Barlow Condensed',
        'Abel',
        'Alice',
        'Alegreya',
        'Amethysta',
        'Nunito Sans',
        'Roboto',
        'Quattrocento'
    ],
    bgOpacity: setOpacity('bg-opacity'),
    flexdirection : [ 'flex-col' , 'flex-row' , 'flex-col-reverse' , 'flex-row-reverse' ],
    flexorder:[
        'order-first',
        'order-last',
        'order-none'
    ],
    flexwrap: [
        'flex-wrap',
        'flex-nowrap',
        'flex-wrap-reverse'
    ],
    flexgrow: [
        'flex-grow',
        'flex-grow-0',
    ],
    flexshrink: [
        'flex-shrink',
        'flex-shrink-0'
    ],
    zindex: [
        'z-auto',
        'z-0',
        'z-1',
        'z-2',
        'z-3',
        'z-4',
        'z-5',
        'z-6',
        'z-7',
        'z-8',
        'z-9',
        'z-10',
        'z-20',
        'z-30',
        'z-40',
        'z-50',
        'z-max',
        'z-top',
        'z-2xtop'
    ],
    gridgap: [ 
        'gap-1' , 
        'gap-2' , 
        'gap-3' , 
        'gap-4' , 
        'gap-5' , 
        'gap-6' , 
        'gap-8', 
        'gap-10' , 
        'gap-12', 
        'gap-16', 
        'gap-20', 
        'gap-24', 
        'gap-32', 
        'gap-40', 
        'gap-48', 
        'gap-56', 
        'gap-64' 
    ],
    alignitems: [
        'items-start',
        'items-center',
        'items-end',
        'items-baseline',
        'items-stretch'
    ],
    aligncontent: [
        'content-start',
        'content-center',
        'content-end',
        'content-between',
        'content-around',
        'content-evenly'
    ],
    alignself: [
        'self-auto',
        'self-start',
        'self-center',
        'self-end',
        'self-stretch'
    ],
    justifycontent: [
        'justify-start',
        'justify-center',
        'justify-end',
        'justify-between',
        'justify-around',
        'justify-evenly'
    ],
    justifyitems: [
        'justify-items-auto',
        'justify-items-start',
        'justify-items-center',
        'justify-items-end',
        'justify-items-stretch',
    ],
    justifyself: [
        'justify-self-auto',
        'justify-self-start',
        'justify-self-center',
        'justify-self-end',
        'justify-self-stretch',
    ],
    border: [
        'border',
        'border-2',
        'border-4',
        'border-8'
    ],
    borderTop: [
        'border-t',
        'border-t-2',
        'border-t-4',
        'border-t-8'
    ],
    borderLeft: [
        'border-l',
        'border-l-2',
        'border-l-4',
        'border-l-8'
    ],
    borderRight: [
        'border-r',
        'border-r-2',
        'border-r-4',
        'border-r-8'
    ],
    borderBottom: [
        'border-b',
        'border-b-2',
        'border-b-4',
        'border-b-8'
    ],
    borderOpacity: setOpacity('border-opacity'),
    padding: setClass('p'),
    paddingTop: setClass('pt'),
    paddingBottom: setClass('pb'),
    paddingLeft: setClass('pl'),
    paddingRight: setClass('pr'),
    margin: setClass('m',true),
    marginTop: setClass('mt',true),
    marginBottom: setClass('mb',true),
    marginLeft: setClass('ml',true),
    marginRight: setClass('mr',true),
    mauto:['m-auto'],
    borderType:[
        'border-solid',
        'border-dashed',
        'border-dotted',
        'border-double',
        'border-none'
    ],
    positionelement: [
        'static',
        'fixed',
        'absolute',
        'relative',
        'sticky'
    ],
    objectfit: [
        'object-contain',
        'object-cover',
        'object-fill',
        'object-none',
        'object-scale'
    ],
    rotate : [
        'rotate-0',
        'rotate-1',
        'rotate-2',
        'rotate-3',
        'rotate-6',
        'rotate-12',
        'rotate-45',
        'rotate-90',
        'rotate-180',
        '-rotate-0',
        '-rotate-1',
        '-rotate-2',
        '-rotate-3',
        '-rotate-6',
        '-rotate-12',
        '-rotate-45',
        '-rotate-90',
        '-rotate-180',
    ],
    skewX: [
        'skew-x-0',
        'skew-x-1',
        'skew-x-2',
        'skew-x-3',	
        'skew-x-6',
        'skew-x-12',
        '-skew-x-0',
        '-skew-x-1',
        '-skew-x-2',
        '-skew-x-3',	
        '-skew-x-6',
        '-skew-x-12',
    ],
    skewY: [
        'skew-y-0',
        'skew-y-1',
        'skew-y-2',
        'skew-y-3',	
        'skew-y-6',
        'skew-y-12',
        '-skew-y-0',
        '-skew-y-1',
        '-skew-y-2',
        '-skew-y-3',	
        '-skew-y-6',
        '-skew-y-12',
    ],
    rounded: [
        'rounded-none',
        'rounded-sm',
        'rounded',
        'rounded-md',
        'rounded-lg',
        'rounded-xl',
        'rounded-2xl',
        'rounded-3xl',
        'rounded-full'
    ],
    shadow: [
        'shadow',
        'shadow-xs',
        'shadow-sm',
        'shadow-md',
        'shadow-lg',
        'shadow-xl',
        'shadow-2xl'
    ],
    clipPath: [
        'clip-path-angle-left', 
        'clip-path-angle-right',
        'clip-path-arrow-left' , 
        'clip-path-arrow-right'  ,
        'clip-path-triangle' , 
        'clip-path-circle' , 
        'clip-path-tag-down'  , 
        'clip-path-trapezoid-left'  , 
        'clip-path-trapezoid-right'  , 
        'clip-path-rombus'  , 
        'clip-path-parallelogram' ,
        'clip-path-frame' ,  
        'clip-path-cross' ,
        'clip-path-stairs' ,
        'clip-path-stairs-2' 
    ]

}

export default classes