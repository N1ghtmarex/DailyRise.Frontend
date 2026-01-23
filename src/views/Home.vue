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
        <ChallengeCard v-if="filter == 'all'" v-for="item in challenges.items" 
            :challenge="item" :joined="item.joined">
        </ChallengeCard>
        <ChallengeCard v-if="filter == 'my'" v-for="item in userChallenges.items" 
        :challenge="item.challenge" :joined="true"></ChallengeCard>
    </div>
</template>

<script>
import ChallengeCard from '@/components/ChallengeCard.vue';
import axios from '@/plugins/axios';


export default {
    components: {
        ChallengeCard,
    },
    data() {
        return {
            challenges: [],
            userChallenges: [],
            filter: 'all',
        }
    },
    methods: {
    },
    async mounted() {
        var response = await axios.get('/api/user-challenge');

        this.userChallenges = response.data;

        response = await axios.get('/api/challenge');

        this.challenges = response.data;
        this.challenges.items.forEach((item) => {
            if (this.userChallenges.items.some(x => x.challenge.id == item.id)) {
                item.joined = true;
            }
            else {
                item.joined = false;
            }
        })
    }
}
</script>