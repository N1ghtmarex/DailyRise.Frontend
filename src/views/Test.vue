<template>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            user: {},
        }
    },
    methods: {
    },
    mounted() {
        this.user = localStorage.getItem("user");
    }
}
</script>