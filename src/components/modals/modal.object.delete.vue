<template>
    <moka-modal
        buttons="delete"
        @close="$emit('close')"
        @click_0="$emit('close')"
        @click_1="$emit('delete')">
        <div slot="title">Delete object</div>
        <div slot="content">
            <h5>Confirm to delete the object ?</h5>
        </div>
    </moka-modal>
</template>