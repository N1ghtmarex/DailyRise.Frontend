<template>
    <div class="challenge-card">
        <div class="card-data" @click="() => { $router.push(`/challenge/${challenge.id}`) }">
            <img class="card-banner" src="../../public/imgs/card-banner.png"></img>
            <div class="card-content">
                <div class="card-title">{{ challenge.name }}</div>
                <div class="card-date">
                    {{ (new Date(Date.parse(challenge.startDate)).toLocaleString('ru-RU').split(',')[0]) }} — {{ (new Date(Date.parse(challenge.endDate)).toLocaleString('ru-RU').split(',')[0]) }}
                </div>
            </div>
        </div>
        <div class="card-footer">
            <div class="author">
                <img class="avatar" :src="challenge.author.photoUrl">
                <div class="author-data">
                    <div class="name">{{ challenge.author.firstname ?? '' }} {{ challenge.author.lastname ?? '' }}</div>
                    <div class="username">{{ `${challenge.author.username ? `@${challenge.author.username}` : ''}` }}</div>
                </div>
            </div>
            <div class="progress" v-if="isJoined">
                <div class="passed-days">{{ getPassedDays }}</div>
                <span>/</span>
                <div class="total-days">{{ getTotalDays }}</div>
                <span>Дней</span>
            </div>
            <button class="join" v-else @click="enterChallenge()">Присоединиться</button>
        </div>
    </div>
</template>

<script>
import axios from '@/plugins/axios';



export default {
    props: ['challenge', 'joined', 'showCheckin'],
    components: {
    },
    data() {
        return {
            isJoined: this.joined
        }
    },
    methods: {
        async enterChallenge() {
            this.$emit('showLoading', true);
            try {
                const response = await axios.put(`/api/user-challenge/accept/${this.challenge.id}`);

                if (response.status == 200) {
                    this.isJoined = true;
                }

                this.$router.go(0);
            }
            catch {

            }
            finally {
                this.$emit('showLoading', false);
            }
        },
        async checkIn() {
            this.$emit('showLoading', true);

            try {
                const response = await axios.post('/api/user-challenge/check-in', {
                    userId: localStorage.getItem('userId'),
                    challengeId: this.challenge.id
                })

                this.$router.go(0);

                this.$emit('showPopup', {
                    message: 'Выполнение успешно отмечено!',
                    type: 'success'
                });
            }
            catch(e) {
                this.$emit('showPopup', {
                    message: e.response != undefined ? e.response.data.Message : `Возникла непредвиденная ошибка (${e})`,
                    type: 'error'
                });
            }
            finally {
                this.$emit('showLoading', false);
            }
        }
    },
    computed: {
        getPassedDays() {
            const start = new Date(this.challenge.startDate);
            const today = new Date();

            const passedDays = Math.ceil((today - start) / (1000 * 60 * 60 * 24));
            const totalDays = this.getTotalDays;

            return  passedDays > totalDays ? totalDays : passedDays;
            

        },
        getTotalDays() {
            const start = new Date(this.challenge.startDate);
            const end = new Date(this.challenge.endDate);

            return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        }
    }
}
</script>