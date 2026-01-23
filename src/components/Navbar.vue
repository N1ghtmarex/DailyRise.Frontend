<template>
    <nav>
        <button :class="this.$route.name == 'Home' ? 'active' : ''" @click="this.$router.push('/')">🏆<br>Вызовы</button>
        <button :class="this.$route.name == 'Test' ? 'active' : ''" @click="this.$router.push('/test')">👥<br>Друзья</button>
        <button>👤<br>Профиль</button>
    </nav>
</template>

<script>

export default {
    components: {
    },
    data() {
    },
}
</script>