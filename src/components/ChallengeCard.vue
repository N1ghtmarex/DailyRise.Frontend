<template>
    <div class="challenge-card">
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
</template>

<script>


export default {
    props: ['challenge'],
    components: {
    },
    data() {
        return {
        }
    },
}
</script>