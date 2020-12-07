<template>
    <div
        :id="id"
        @dragover.prevent
        @drop.prevent="drop">
        <slot/>
    </div>
</template>

<script>
export default {
    props: ['id'],
    methods:{
        drop: e => {

            const box_id = e.dataTransfer.getData ( 'box_id' )
            console.log ( box_id )
            const box = document.getElementById ( box_id )
            box.style.display = 'block'
            e.target.appendChild ( box )
        }
    }
}
</script>