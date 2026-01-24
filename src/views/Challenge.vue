<template>
    <div class="challenge-container">
        <ChallengeCard v-if="challenge != null && joined != null" @show-loading="this.$emit('showLoading', $event)" @show-popup="this.$emit('showPopup', $event)"
        :challenge="challenge" :joined="joined" :showCheckin="showCheckin"></ChallengeCard>
    </div>
    <div class="participants" v-if="users.length > 0">
        Участники
        <div class="user-card" v-for="user in users">
            <div class="user-info">
                <div class="avatar">
                    <img :src="user.photoUrl">
                </div>
                <div class="user-bio">
                    <div class="name">
                        {{ user.firstname }} {{ user.lastname }}
                    </div>
                    <div class="username">{{ user.username ? `@${user.username}` : '' }}</div>
                </div>
            </div>
            <div class="complete-progress">
                Выполнений: {{ getCompleteCount(user.id) }}
            </div>
        </div>
    </div>
</template>

<script>
import ChallengeCard from '@/components/ChallengeCard.vue';
import axios from '@/plugins/axios';

export default {
    emits: ['showLoading', 'showPopup'],
    components: {
        ChallengeCard
    },
    data() {
        return {
            challenge: null,
            users: [],
            joined: null,
            showCheckin: false,
            checkIns: [],
        }
    },
    methods: {
        getCompleteCount(userId) {
            return this.checkIns.filter(x => x.userChallengeBind.user.id == userId).length;
        }
    },
    async mounted() {
        this.$emit('showLoading', true);
        try {
            var response = await axios.get(`/api/challenge/${this.$route.params.id}`);

            this.challenge = response.data;

            response = await axios.get(`/api/user-challenge/${this.challenge.id}/users`);

            this.users = response.data.items;

            this.joined = this.users.some(x => x.id == localStorage.getItem('userId'));

            response = await axios.get(`/api/user-challenge/check-in?ChallengeId=${this.challenge.id}`);

            this.checkIns = response.data;

            this.showCheckin = this.joined && !this.checkIns.some(x => x.userChallengeBind.user.id == localStorage.getItem('userId') && new Date(Date.parse(this.checkIns[0].checkInDate)).toLocaleString('ru-RU').split(',')[0] == new Date().toLocaleString('ru-RU').split(',')[0]);
        }
        finally {
            this.$emit('showLoading', false);
        }
    }
}
</script>