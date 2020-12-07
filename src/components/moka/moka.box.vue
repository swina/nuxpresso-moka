<template>
    <div
        :id="id"
        :draggable="draggable"
        @dragstart="dragStart"
        @dragover.stop>
        <slot/>
    </div>
</template>

<script>
export default {
    props: [ 'id' , 'draggable' ],
    methods: {
        dragStart: e => {
            console.log ( 'dragging ')
            const target = e.target 
            e.dataTransfer.setData('box_id',target.id)
            //setTimeout ( () => {
            //    target.style.display = "none"
            //},0)
        }
    }
}
</script>