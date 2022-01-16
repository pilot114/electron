<template>
    <div>
        <sui-form>
            <sui-form-fields grouped>
                <h3> {{ vote.name }} ({{ vote.id }}) </h3>
                <label>Выберите один из вариантов:</label>
                <sui-form-field v-for="choice in vote.choices">
                    <sui-checkbox radio :label="choice.name" value="1" />
                </sui-form-field>
            </sui-form-fields>
            <sui-button
                toggle
                content="Проголосовать"
                disabled
            />
            <transition name="fade">
                <sui-message
                    header="Спасибо!"
                    content="Ваш голос учтён. Отозвать голос можно в профиле пользователя"
                    dismissable
                />
            </transition>
        </sui-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            vote: {
                id: '63654716-df90-44e2-ad83-de9a18ba38b0',
                name: 'Выбор старосты',
                choices: [
                    {name:'Кузнецов Артём Александрович', id:'5d55fd8d-4653-47d6-89e4-4c1057b4b84f', count:74, percent: 50},
                    {name:'Морозова Лидия Артёмовна', id:'3654716-df90-44e2-ad83-de9a18ba38b0', count:14, percent: 20},
                    {name:'Большакова Милана Андреевна', id:'9058bdbf-db0c-48cc-b2c6-4bb0568ee85d', count:22, percent: 30},
                ]
            },
        }
    },
}
</script>