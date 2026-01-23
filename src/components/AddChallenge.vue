<template>
    <div class="modal" @click.self="showModal = false">
        <div class="modal-card">
            <h2 style="margin-top:0">Новый челлендж</h2>

            <div class="input-group">
                <label>Название</label>
                <input v-model="challengeToCreate.name" placeholder="Укажите название испытания" />
            </div>

            <div class="input-group">
                <label>Описание</label>
                <input v-model="challengeToCreate.description" placeholder="Здесь можно описать суть испытания" />
            </div>

            <div class="input-group">
                <label>Дата начала</label>
                <VueDatePicker v-model="challengeToCreate.startDate" class="date-picker"></VueDatePicker>
            </div>

            <div class="input-group">
                <label>Дата окончания</label>
                <VueDatePicker v-model="challengeToCreate.endDate" class="date-picker"></VueDatePicker>
            </div>

            <button class="modal-create" @click="handleCreateClick()">Создать</button>
            <button class="modal-cancel secondary" @click="$emit('close')">Отмена</button>
        </div>
    </div>
</template>

<script>
import axios from '@/plugins/axios';
import WebApp from '@twa-dev/sdk';
import { VueDatePicker } from '@vuepic/vue-datepicker';


export default {
    emits: ['close'],
    components: {
        VueDatePicker
    },
    data() {
        return {
            challengeToCreate: {}
        }
    },
    methods: {
        async handleCreateClick() {
            const response = await axios.post('/api/challenge', this.challengeToCreate);
        }
    },
}
</script>