<template>
    <div class="flex flex-col">
        <template v-for="opt in options">
            <div class="flex flex row">
                <input class="w-3/4" type="range" min="0" :max="size.length-1" v-model="opt.value">
                <label class="capitalize">{{ opt.label }}</label>
            </div>    
        </template>
    </div>
</template>
<script>
export default {
    name: 'MokaTailwindBorder',
    data:()=>({
        model:'',
        size: [ '' , 1 , 2 , 4 , 8 ],
        options: [
            { label: 'all' , prefix: 'border' , attr: '|' , value: 0 },
            { label: 'top' , prefix: 'border-t' , attr: '|t' , value: 0 },
            { label: 'bottom' , prefix: 'border-b' , attr: '|b' , value: 0 },
            { label: 'left' , prefix: 'border-l' , attr: '|l' , value: 0 },
            { label: 'right' , prefix: 'border-r' , attr: '|r' , value: 0 },
        ],
        color: ''
    }),
    props: ['css'],
    methods:{
        getBorder(cl,param){
            this.options.forEach ( (opt,index) => {
                console.log ( cl , opt.attr  )
                if ( cl === opt ){
                    this.options[index].value = 1 
                    return
                } else {
                    if ( cl.indexOf(opt.attr) > -1 ){
                        if ( cl.split('-').length > 1 ){
                            this.options[index].value = this.size.indexOf(parseInt(cl.split('-')[1]))
                            this.$emit('input',opt.prefix+this.options[index].value)
                            this.$emit('css',opt.prefix+this.options[index].value)
                            return
                        } else {
                            if ( cl === '|' ){
                                this.options[index].value = 1
                            } else {
                                this.options[index].value = this.size.indexOf(parseInt(cl.replace('|','')))
                            }
                            this.$emit('input',opt.prefix+this.options[index].value)
                            this.$emit('css',opt.prefix+this.options[index].value)
                            return
                        }
                    }
                }
            })
        }
    },
    mounted(){
        console.clear()
        if ( !this.css ) return 
        let classi = this.css.split ( ' ' )
        let borders = classi.filter ( classe => {
            return classe.indexOf('border') > -1  
        })
        let bb = []
        borders.forEach ((b,index) => {
            if ( b.split('-').length > 0 && b.split('-')[1].length < 2 ){
                bb.push(b.replace('border-','|'))
            }
        })
        bb.forEach ( (cl,index ) => {
            this.getBorder ( cl , borders[index] )
        })

    },
    watch:{
        options:{
            handler(old,changed){
                let cl = ''
                changed.forEach ( border => {
                    if ( border.value > 1 ){
                        cl += ' ' + border.prefix + '-' + this.size[parseInt(border.value)] + ' '
                    } else {
                        if ( parseInt(border.value) === 1 ){
                           cl += ' ' + border.prefix  + ' '
                        }
                    }
                })
                this.$emit ( 'input' , cl )
                this.$emit ( 'css' , cl )
            },
            deep: true
        }
    }
}
</script>