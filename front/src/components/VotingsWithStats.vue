<template>
    <sui-table celled>
        <sui-table-header>
            <sui-table-row>
                <sui-table-header-cell>ID</sui-table-header-cell>
                <sui-table-header-cell>Название</sui-table-header-cell>
                <sui-table-header-cell>Период</sui-table-header-cell>
                <sui-table-header-cell>Прогресс</sui-table-header-cell>
            </sui-table-row>
        </sui-table-header>

        <sui-table-body>
            <sui-table-row v-for="voting in votings">
                <sui-table-cell>{{ voting.id }}</sui-table-cell>
                <sui-table-cell>{{ voting.name }}</sui-table-cell>
                <sui-table-cell>{{ voting.start }} - {{ voting.end }}</sui-table-cell>

                <sui-table-cell>

                    <sui-table
                        basic="very"
                        celled
                        collapsing
                    >
                        <sui-table-header>
                            <sui-table-row>
                                <sui-table-header-cell>Вариант</sui-table-header-cell>
                                <sui-table-header-cell>Проголосовало</sui-table-header-cell>
                                <sui-table-header-cell>Процент</sui-table-header-cell>
                            </sui-table-row>
                        </sui-table-header>

                        <sui-table-body>
                            <sui-table-row v-for="choice in voting.choices">
                                <sui-table-cell>
                                    <h4 is="sui-header">
                                        <sui-header-content>
                                            {{ choice.name }}
                                            <sui-header-subheader>
                                                {{ choice.id }}
                                            </sui-header-subheader>
                                        </sui-header-content>
                                    </h4>
                                </sui-table-cell>
                                <sui-table-cell>
                                    {{ choice.count }}
                                </sui-table-cell>
                                <sui-table-cell>
                                    {{ choice.percent }} %
                                </sui-table-cell>
                            </sui-table-row>
                        </sui-table-body>
                    </sui-table>

                    <sui-divider />

                    <sui-progress :percent="calcPercent(voting)" :label="label(voting)" />
                </sui-table-cell>
            </sui-table-row>
        </sui-table-body>
    </sui-table>
</template>

<script>

export default {
    name: "VotingsWithStats",
    props: {
        votings: Array,
        isPublic: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            chartConfig: {
                key: 'name',
                value: 'hours',
                color: {scheme: 'schemeTableau10'},
                radius: {inner: 80}
            }
        }
    },
    methods: {
        label(voting) {
            if (!voting.total) {
                return 'Нет данных'
            }
            return `Явка ${this.calcPercent(voting)}% (из ${voting.total} участников)`
        },
        calcPercent(voting) {
            return (voting.count / (voting.total / 100)) || 100
        }
    }
}
</script>
