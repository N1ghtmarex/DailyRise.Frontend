<template>
    <div class="tabs">
        <div class="tab" :class="filter == 'all' ? 'active' : ''" @click="filter = 'all'">
            <p>Все испытания</p>
        </div>
        <div class="tab" :class="filter == 'my' ? 'active' : ''" @click="filter = 'my'">
            <p>Мои</p>
        </div>
    </div>
    <div class="challenge-container">
        <div class="challenge-card" v-if="filter == 'all'" v-for="challenge in challenges.items">
            <div class="challenge-header">
                <div class="title">
                    <h3 class="name">{{ challenge.name }}</h3>
                    <p class="description">{{ challenge.description }}</p>
                </div>
            </div>

            <div class="progress-wrapper">
                <div class="progress-container">
                    <div class="days-progress">
                        <span class="days">День {{ Math.round((new Date(new Date() - Date.parse(challenge.startDate))) / (1000 * 60 * 60 * 24)) + 1 }} из {{ Math.round((new Date(Date.parse(challenge.endDate)) - new Date(Date.parse(challenge.startDate))) / (1000 * 60 * 60 * 24)) }}</span>
                        <span class="days-percent">
                            {{ 
                            Math.round((Math.round((new Date(new Date() - Date.parse(challenge.startDate))) / (1000 * 60 * 60 * 24)) + 1) /
                             (Math.round((new Date(Date.parse(challenge.endDate)) - new Date(Date.parse(challenge.startDate))) / (1000 * 60 * 60 * 24)))) * 100
                            }}%
                        </span>
                    </div>
                    <div class="progress">
                        <div class="progress-bar" :style="`width: ${Math.round((Math.round((new Date(new Date() - Date.parse(challenge.startDate))) / (1000 * 60 * 60 * 24)) + 1) /
                             (Math.round((new Date(Date.parse(challenge.endDate)) - new Date(Date.parse(challenge.startDate))) / (1000 * 60 * 60 * 24)))) * 100}%`"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="challenge-card" v-if="filter == 'my'" v-for="item in userChallenges.items">
            <div class="challenge-header">
                <div class="title">
                    <h3 class="name">{{ item.challenge.name }}</h3>
                    <p class="description">{{ item.challenge.description }}</p>
                </div>
            </div>

            <div class="progress-wrapper">
                <div class="progress-container">
                    <div class="days-progress">
                        <span class="days">День {{ Math.round((new Date(new Date() - Date.parse(item.challenge.startDate))) / (1000 * 60 * 60 * 24)) + 1 }} из {{ Math.round((new Date(Date.parse(item.challenge.endDate)) - new Date(Date.parse(item.challenge.startDate))) / (1000 * 60 * 60 * 24)) }}</span>
                        <span class="days-percent">
                            {{ 
                            Math.round((Math.round((new Date(new Date() - Date.parse(item.challenge.startDate))) / (1000 * 60 * 60 * 24)) + 1) /
                             (Math.round((new Date(Date.parse(item.challenge.endDate)) - new Date(Date.parse(item.challenge.startDate))) / (1000 * 60 * 60 * 24)))) * 100
                            }}%
                        </span>
                    </div>
                    <div class="progress">
                        <div class="progress-bar" :style="`width: ${Math.round((Math.round((new Date(new Date() - Date.parse(item.challenge.startDate))) / (1000 * 60 * 60 * 24)) + 1) /
                             (Math.round((new Date(Date.parse(item.challenge.endDate)) - new Date(Date.parse(item.challenge.startDate))) / (1000 * 60 * 60 * 24)))) * 100}%`"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/plugins/axios';


export default {
    components: {
    },
    data() {
        return {
            challenges: {},
            userChallenges: {},
            filter: 'all',
        }
    },
    methods: {
    },
    async mounted() {
        var response = await axios.get('/api/challenge');

        this.challenges = response.data;

        response = await axios.get('/api/user-challenge');

        this.userChallenges = response.data;
    }
}
</script>