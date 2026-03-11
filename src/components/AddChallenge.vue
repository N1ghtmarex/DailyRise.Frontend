<template>
    <div class="modal" @click.self="showModal = false">
        <div class="modal-card">
            <h2 style="margin-top:0">Новый челлендж</h2>

            <div class="input-group">
                <label>Название</label>
                <input v-model="challengeToCreate.name" placeholder="Читать книгу" />
            </div>

            <div class="input-group">
                <label>Описание</label>
                <input v-model="challengeToCreate.description" placeholder="Читать 30 страниц книги каждый день" />
            </div>

            <div class="input-group">
                <label>Дата начала</label>
                <VueDatePicker v-model="challengeToCreate.startDate" class="date-picker" :formats="{ input: 'dd.MM.yyyy - HH:mm' }"></VueDatePicker>
            </div>

            <div class="date-range-buttons">
                <button @click="() => { 
                        challengeToCreate.startDate != undefined 
                        ? challengeToCreate.endDate = new Date(new Date().setDate(challengeToCreate.startDate.getDate() + 1)) 
                        : this.$emit('showPopup', { message: 'Сначала укажите дату начала!', type: 'error'}); 
                    }"
                >1 день</button>
                <button @click="() => { 
                        challengeToCreate.startDate != undefined 
                        ? challengeToCreate.endDate = new Date(new Date().setDate(challengeToCreate.startDate.getDate() + 3)) 
                        : this.$emit('showPopup', { message: 'Сначала укажите дату начала!', type: 'error'}); 
                    }"
                >3 дня</button>
                <button @click="() => { 
                        challengeToCreate.startDate != undefined 
                        ? challengeToCreate.endDate = new Date(new Date().setDate(challengeToCreate.startDate.getDate() + 7)) 
                        : this.$emit('showPopup', { message: 'Сначала укажите дату начала!', type: 'error'}); 
                    }"
                >7 дней</button>
            </div>

            <div class="input-group">
                <label>Дата окончания</label>
                <VueDatePicker v-model="challengeToCreate.endDate" class="date-picker" :formats="{ input: 'dd.MM.yyyy - HH:mm' }"></VueDatePicker>
            </div>

            <button class="modal-create" @click="handleCreateClick()">Создать</button>
            <button class="modal-cancel secondary" @click="$emit('close')">Отмена</button>
        </div>
    </div>
</template>

<script>
import axios from '@/plugins/axios';
import { VueDatePicker } from '@vuepic/vue-datepicker';


export default {
    emits: ['close', 'showLoading', 'showPopup'],
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
            this.$emit('showLoading', true);
            try {
                const response = await axios.post('/api/challenge', this.challengeToCreate)
                if (response.status == 200) {
                    this.$emit('showPopup', {
                        message: 'Испытание успешно создано!',
                        type: 'success'
                    })
                }

                this.$router.go(0);
                
            } catch(e) {
                this.$emit('showPopup', {
                    message: 'Ошибка при добавлении испытания',
                    type: 'error'
                });
            }
            finally {
                this.$emit('showLoading', false);
            }
        }
    },
}
</script>