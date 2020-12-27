const twgroups = [
    { label: 'grid' , filter: ['grid'] , components: [
        { name: 'MokaGrid' , attr: 'grid'  },
        { name: 'MokaOptions' , attr: 'gridgap' , title: 'grid gap'}
    ]},
    { label: 'flex' ,  components: [
        { name: 'MokaOptions' , attr: 'flexdirection' , title: 'direction'},
        { name: 'MokaOptions' , attr: 'flexwrap' , title: 'wrap'},
        { name: 'MokaOptions' , attr: 'flexgrow' , title: 'grow'},
        { name: 'MokaOptions' , attr: 'flexshrink' , title: 'shrink'},
        { name: 'MokaOptions' , attr: 'flexorder' , title: 'order'}
    ]},
    {
        label: 'box align' , filter: ['grid','flex'] , components: [
            { name: 'MokaOptions' , attr: 'alignitems' , title: 'Align items' },
            { name: 'MokaOptions' , attr: 'aligncontent' , title: 'Align content' },
            { name: 'MokaOptions' , attr: 'alignself' , title: 'Align self' },
        ]
    },
    {
        label: 'box justify' , filter: ['grid','flex'] , components: [
            { name: 'MokaOptions' , attr: 'justifycontent' , title: 'Justify content' },
            { name: 'MokaOptions' , attr: 'justifyitems' , title: 'Justify items' },
            { name: 'MokaOptions' , attr: 'justifyself' , title: 'justify self' },
        ]
    },
    { label: 'position', components : [ 
        { name: 'MokaOptions' , attr: 'positionelement' , title: 'position' },
        { name: 'MokaCheckbox' , attr: 'positionTop' , title: 'top' , css: 'float-left'},
        { name: 'MokaCheckbox' , attr: 'positionLeft' , title: 'left' , css: 'float-left' },
        { name: 'MokaCheckbox' , attr: 'positionBottom' , title: 'bottom' , css: 'float-left' },
        { name: 'MokaCheckbox' , attr: 'positionRight' , title: 'right' , css: 'float-none' },
        { name: 'MokaPosition' , attr: 'position' },
        { name: 'MokaRange' , attr: 'zindex' , title: 'z index'},
        { name: 'MokaOptions' , attr: 'objectfit' , title: 'Object fit' }
    ]},
    { label: 'dimension' , components: [ 
        { name: 'MokaWidths' , attr: 'width' },
        { name: 'MokaHeights' , attr: 'height' } 
    ]},
    { label: 'text' , components: [ 
        { name: 'MokaColor' , attr: 'textcolor' }, 
        { name: 'MokaRange' , attr: 'textSize' , title: 'size' },
        { name: 'MokaOptions' , attr: 'textAlign' , title: 'Align' },
        { name: 'MokaOptions' , attr: 'fontWeight' , title: 'weight' },
        { name: 'MokaButton' , attr: 'italic' , title : 'italic' , icon: 'format_italic' , css: 'float-left'},
        { name: 'MokaButton' , attr: 'underline' , title : 'underline' , icon: 'format_underline' , css: 'float-left'},
        { name: 'MokaButton' , attr: 'uppercase' , title : 'uppercase' , icon: 'arrow_upward', css: 'float-left'},
        { name: 'MokaButton' , attr: 'lowercase' , title : 'lowercase' , icon: 'arrow_downward', css: 'float-left'},
        { name: 'MokaButton' , attr: 'capitalize' , title : 'capitalize' , icon: 'text_fields' , css: 'float-none'},
        { name: 'MokaOptions' , attr: 'textSpacing' , title: 'letter spacing' },
        { name: 'MokaOptions' , attr: 'textlineheight' , title: 'line height'},
        { name: 'MokaTextFont' , attr: 'textfont' },
        { name: 'MokaRange' , attr: 'textOpacity' , title: 'opacity' }
    ]},
    { label: 'background' , components: [ 
        { name: 'MokaBgcolor' , attr: 'bgcolor'},
        { name: 'MokaGradient' , attr: 'gradient' },
        { name: 'MokaBgPosition' , attr: 'bgposition' },
        { name: 'MokaRange' , attr: 'bgOpacity' , title: 'opacity' }
    ]},
    { label: 'padding', components : [ 
        { name: 'MokaRange' , attr: 'padding' , title: 'all'},
        { name: 'MokaRange' , attr: 'paddingTop' , title: 'top'},
        { name: 'MokaRange' , attr: 'paddingBottom' , title: 'bottom'},
        { name: 'MokaRange' , attr: 'paddingLeft' , title: 'left'},
        { name: 'MokaRange' , attr: 'paddingRight' , title: 'right'},
    ] }, 
    { label: 'margin', components : [ 
        { name: 'MokaRange' , attr: 'margin' , title: 'all' , negative: true},
        { name: 'MokaRange' , attr: 'marginTop' , title: 'top', negative: true},
        { name: 'MokaRange' , attr: 'marginBottom' , title: 'bottom', negative: true},
        { name: 'MokaRange' , attr: 'marginLeft' , title: 'left', negative: true},
        { name: 'MokaRange' , attr: 'marginRight' , title: 'right', negative: true},
        { name: 'MokaCheckbox' , attr: 'mauto' , title: 'auto' }

    ] },
    { label: 'border', components : [ 
        { name: 'MokaRange' , attr: 'border' , title: 'all' },
        { name: 'MokaRange' , attr: 'borderTop' , title: 'top' },
        { name: 'MokaRange' , attr: 'borderRight' , title: 'right' },
        { name: 'MokaRange' , attr: 'borderBottom' , title: 'bottom' },
        { name: 'MokaRange' , attr: 'borderLeft' , title: 'left' },
        { name: 'MokaBorderColor' , attr: 'bordercolor' },
        { name: 'MokaOptions' , attr: 'borderType' },
        { name: 'MokaRange' , attr: 'borderOpacity' , title: 'opacity' }
    ]},
    { label: 'rounded / shadow', components : [ 
        { name: 'MokaOptions' , attr: 'rounded' },
        { name: 'MokaOptions' , attr: 'shadow' }, 
    ]},
    { label: 'CSS Animation', components : [ 
        { name: 'MokaOptions' , attr: 'animation' , title: 'animation'}
    ]},
    { label: 'transform', components : [ 
        { name: 'MokaOptions' , attr: 'skewX' , required: 'transform' , title: 'Skew X' },
        { name: 'MokaOptions' , attr: 'skewY' , required: 'transform' , title: 'Skew Y' },
        { name: 'MokaOptions' , attr: 'rotate' , required: 'transform' },
        { name: 'MokaOptions' , attr: 'clipPath' , required: 'transform' , title: 'clip path'},
    ]}, 
    { label: 'html semantic' , components : [
        { name: 'MokaOptions' , attr: 'semantics' , title: 'semantic tag'}
    ]}  

]

export default twgroups