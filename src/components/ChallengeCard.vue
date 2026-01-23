<template>
    <div class="challenge-card">
        <h3>{{ challenge.name }}</h3>
        <p>{{ challenge.description }}</p>
        <div class="dates">
            {{ (new Date(Date.parse(challenge.startDate)).toLocaleString('ru-RU').split(',')[0]) }} — {{ (new Date(Date.parse(challenge.endDate)).toLocaleString('ru-RU').split(',')[0]) }}
        </div>

        <div class="progress">
            <div class="progress-bar" :style="{ width: Math.round((Math.round((new Date(new Date() - Date.parse(challenge.startDate))) / (1000 * 60 * 60 * 24)) + 1) /
                            (Math.round((new Date(Date.parse(challenge.endDate)) - new Date(Date.parse(challenge.startDate))) / (1000 * 60 * 60 * 24)))) * 100 + '%' }">
            </div>
        </div>

        <div class="card-actions">
            <button v-if="!isJoined" class="btn secondary" @click="enterChallenge()">Вступить</button>
        </div>
      </div>
</template>

<script>
import axios from '@/plugins/axios';



export default {
    props: ['challenge', 'joined'],
    components: {
    },
    data() {
        return {
            isJoined: this.joined
        }
    },
    methods: {
        async enterChallenge() {
            const response = await axios.put(`/api/user-challenge/accept/${this.challenge.id}`);

            if (response.status == 200) {
                this.isJoined = true;
            }

            console.log(response);
        }
    }
}
</script>