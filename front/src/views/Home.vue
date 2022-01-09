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
        let votings = new repo.Votings()
        this.votings = votings.getAll()
    },
    data() {
        return {
            filter: 'Все',
            votings: [],
        }
    },
}
</script>