<template>
    <div>
        <sui-dropdown
            placeholder="Тип"
            selection
            :options="[
                { key: 'Все', text: 'Все', value: 'Все' },
                { key: 'Активные', text: 'Активные', value: 'Активные' },
                { key: 'Прошедшие', text: 'Прошедшие', value: 'Прошедшие' },
            ]"
            v-model="filter"
        />

        <sui-divider />

        <VotingsWithStats :votings="votings" isPublic/>
    </div>
</template>

<script>
import repo from '../repo.js'
import VotingsWithStats from "../components/VotingsWithStats";

export default {
    components: {VotingsWithStats},
    created() {
        let votings = (new repo.Votings()).getAll()

        votings[0].id = 'a00b6207a9083af7cc'
        votings[0].count = 75
        votings[0].total = 126
        votings[0].choices = [
            {name:'Кузнецов Артём Александрович', id:'5d55fd8d-4653-47d6-89e4-4c1057b4b84f', count:74, percent: 50},
            {name:'Морозова Лидия Артёмовна', id:'3654716-df90-44e2-ad83-de9a18ba38b0', count:14, percent: 20},
            {name:'Большакова Милана Андреевна', id:'9058bdbf-db0c-48cc-b2c6-4bb0568ee85d', count:22, percent: 30},
        ];

        votings[1].id = '45by45jyv4w5jy5685'
        votings[1].name = 'Выбор руководителя студ.отряда'
        votings[1].count = 2100
        votings[1].total = 2345
        votings[1].choices = [
            {name:'Андреев Егор Макарович', id:'2d827902-c9f7-4e7b-ae83-938503e61d62', count:1400, percent: 66},
            {name:'Леонов Андрей Артёмович', id:'2bfb0946-9653-49e8-b183-41b69165a034', count:700, percent: 33},
        ];

        votings.pop()

        this.votings = votings
    },
    data() {
        return {
            filter: 'Все',
            votings: [],
        }
    },
}
</script>