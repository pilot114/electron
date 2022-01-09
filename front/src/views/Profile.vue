<template>
    <div>
        <h3>
            Мои голосования (избиратель)
        </h3>
        <sui-table celled>
            <sui-table-header>
                <sui-table-row>
                    <sui-table-header-cell>ID</sui-table-header-cell>
                    <sui-table-header-cell>Название</sui-table-header-cell>
                    <sui-table-header-cell>Тип</sui-table-header-cell>
                    <sui-table-header-cell>Выбор</sui-table-header-cell>
                    <sui-table-header-cell>Дата выбора</sui-table-header-cell>
                    <sui-table-header-cell>Период</sui-table-header-cell>
                    <sui-table-header-cell>Действия</sui-table-header-cell>
                </sui-table-row>
            </sui-table-header>

            <sui-table-body>
                <sui-table-row v-for="voting in byCandidate">
                    <sui-table-cell>{{ voting.id }}</sui-table-cell>
                    <sui-table-cell>{{ voting.name }}</sui-table-cell>
                    <sui-table-cell>{{ voting.type }}</sui-table-cell>
                    <sui-table-cell>{{ voting.choice }}</sui-table-cell>
                    <sui-table-cell>{{ voting.choice_date }}</sui-table-cell>
                    <sui-table-cell>{{ voting.start }} - {{ voting.end }}</sui-table-cell>

                    <sui-table-cell>
                        <sui-button icon="sync" size="mini" color="orange" content=" Отозвать голос" />
                    </sui-table-cell>
                </sui-table-row>
            </sui-table-body>
        </sui-table>

        <h3>
            Мои голосования (кандидат)
        </h3>
        <VotingsWithStats :votings="byVoter"/>

    </div>
</template>

<script>
import repo from '../repo.js'
import VotingsWithStats from "../components/VotingsWithStats";

export default {
    components: {VotingsWithStats},
    created() {
        let id = this.$root.user.id

        let votings = new repo.Votings()
        this.byCandidate = votings.getByCandidate(id)
        this.byVoter = votings.getByVoter(id)

        this.types = repo.getTypes()
    },
    data() {
        return {
            byCandidate: [],
            byVoter: [],
            types: [],
        }
    },
}
</script>