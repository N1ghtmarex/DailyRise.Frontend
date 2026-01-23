<template>
    <div class="challenge-card">
        <h3>{{ challenge.name }}</h3>
        <p>{{ challenge.description }}</p>
        <div class="dates">
            {{ (new Date(Date.parse(challenge.startDate)).toLocaleString('ru-RU').split(',')[0]) }} — {{ (new Date(Date.parse(challenge.endDate)).toLocaleString('ru-RU').split(',')[0]) }}
        </div>

        <div class="progress">
            <div class="progress-bar" :style="{ width: progressPercent + '%' }"></div>
        </div>

        <div class="card-actions">
            <button v-if="!isJoined" class="btn secondary" @click="enterChallenge()">Вступить</button>
            <div class="author">
                <img class="avatar" :src="challenge.author.photoUrl">
                <div class="author-data">
                    <div class="name">{{ challenge.author.firstname ?? '' }} {{ challenge.author.lastname ?? '' }}</div>
                    <div class="username">{{ `${challenge.author.username ? `@${challenge.author.username}` : ''}` }}</div>
                </div>
            </div>
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
    },
    computed: {
        progressPercent() {
            const start = new Date(this.challenge.startDate)
            const end = new Date(this.challenge.endDate)
            const today = new Date()

            if (today < start) return 0
            if (today > end) return 100

            const totalDays =
            Math.ceil((end - start) / (1000 * 60 * 60 * 24))

            const passedDays =
            Math.ceil((today - start) / (1000 * 60 * 60 * 24))

            return Math.min(
            Math.round((passedDays / totalDays) * 100),
            100
            )
        }
    }
}
</script>