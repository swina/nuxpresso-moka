<template>
    <div>
        {{ setting }}
    </div>
</template>

<script>
import settingsQry from '@/apollo/settings.gql'
export default {
    name: 'NuxpressoSettings',
    apollo: {
        setting: {
            prefetch: true,
            query: settingsQry,
            update: data => data.setting
        }
    }
}
</script>