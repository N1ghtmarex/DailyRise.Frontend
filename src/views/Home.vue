<template>
    {{ test }}
</template>

<script>
import WebApp from '@twa-dev/sdk';


export default {
    components: {
    },
    data() {
        return {
            test: WebApp.initData
        }
    },
    methods: {
    },
}
</script>