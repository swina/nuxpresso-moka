<template>
    <moka-modal
        buttons="save"
        @close="$emit('close')"
        @click_0="$emit('close')"
        @click_1="$emit('save')">
        <div slot="title">Save</div>
        <div slot="content">
            <h5>Save before to close ?</h5>
        </div>
    </moka-modal>
</template>