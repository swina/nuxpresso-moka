<template>
    <div class="flex flex-col">
        Width 
        <select v-model="model" @change="$emit('input',model)">
            <option value="">not set</option>
            <option v-for="opt in options" :value="opt.value">{{ opt.label }}</option>
        </select>
    </div>
</template>

<script>
export default {
    data:()=>({
        model: '',
        options: [ 
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
    }),
    props: [ 'css' ],
    mounted(){
        if ( !this.css.length ) return
        let classes = this.css.split(' ')
        classes.forEach ( cl => {
            if ( this.options.indexOf ( cl ) > -1 ){
                this.model = cl
                return
            }
        })
    }

}
</script>