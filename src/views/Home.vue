<template>
    <div class="challenge-container">
        <ChallengeCard v-for="item in userChallenges.items" 
        :challenge="item.challenge" :joined="true"></ChallengeCard>
    </div>

    <div class="add-challenge" @click="() => { showAddChallenge = !showAddChallenge }">
        <div class="icon">+</div>
        <div class="title">Добавить челлендж</div>
    </div>

    <Teleport to="body">
    <AddChallenge
        v-if="showAddChallenge"
        @close="showAddChallenge = false"
        @show-loading="$emit('showLoading', $event)" @show-popup="$emit('showPopup', $event)"
    />
    </Teleport>
</template>

<script>
import ChallengeCard from '@/components/ChallengeCard.vue';
import AddChallenge from '@/components/AddChallenge.vue';
import axios from '@/plugins/axios';


export default {
    emits: ['close', 'showLoading', 'showPopup'],
    components: {
        ChallengeCard,
        AddChallenge,
    },
    data() {
        return {
            challenges: [],
            userChallenges: [],
            filter: 'all',
            showAddChallenge: false,
        }
    },
    methods: {
    },
    async mounted() {
        this.$emit('showLoading', true);

        try {
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
        catch {

            
        }
        finally {
            this.$emit('showLoading', false);
        }
    }
}
</script>