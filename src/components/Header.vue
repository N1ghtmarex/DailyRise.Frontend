<template>
    <header v-if="!showAddChallenge">
        <div class="user">
        <div class="avatar"><img :src="user.photo_url"></div>
        <div class="user-data">
            <div class="firstname">{{ user.first_name }}</div>
            <div class="username">@{{ user.username }}</div>
        </div>
        </div>
        <button @click="() => { showAddChallenge = !showAddChallenge }">+ Челлендж</button>
    </header>

    <Teleport to="body">
    <AddChallenge
        v-if="showAddChallenge"
        @close="showAddChallenge = false"
        @show-loading="$emit('showLoading', $event)" @show-popup="$emit('showPopup', $event)"
    />
    </Teleport>
</template>

<script>
import axios from '@/plugins/axios';
import WebApp from '@twa-dev/sdk';
import AddChallenge from './AddChallenge.vue';

export default {
    emits: ['showPopup', 'showLoading'],
    components: {
        AddChallenge,
    },
    data() {
        return {
            user: {},
            showAddChallenge: false,
        }
    },
    methods: {
    },
    async mounted() {
        this.initData = WebApp.initData != '' ? WebApp.initData : "user=%7B%22id%22%3A483488422%2C%22first_name%22%3A%22%D0%90%D0%BD%D0%B4%D1%80%D0%B5%D0%B9%22%2C%22last_name%22%3A%22%D0%A8%D0%B5%D0%B2%D0%B5%D0%BB%D1%91%D0%B2%22%2C%22username%22%3A%22ntmrr%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FcnWomYdeVHO0rNxazQeTbgkF5hK9C_u5Z2XOrKaaGr4.svg%22%7D&chat_instance=6545883833657540382&chat_type=sender&auth_date=1769165084&signature=u0_UzRj75lRlc77qfE8r-p6OHgGH5D1YGj9v46PG8FrJpLCytzRJuRaoABXkO89tqkQAldBDk6vumv4RBcJHCQ&hash=481d359cda3320ed7a0b4216495c2124abb6ab82bbba57bbc00441f6a6643d81";
        localStorage.setItem("initData", this.initData);
        try {
            var response = await axios.get("/api/user/telegram");

            if (response.status == 200) {
                this.user = response.data;
                localStorage.setItem("userTelegramId", this.user.id);
            }

            response = await axios.get(`/api/user/${this.user.id}`);

            localStorage.setItem("userId", response.data.id);
        }
        catch {
            await axios.post('/api/user', {
                username: this.user.username,
                firstname: this.user.first_name,
                lastname: this.user.last_name,
                photoUrl: this.user.photo_url,
                telegramId: this.user.id
            });
        }
    }
}
</script>