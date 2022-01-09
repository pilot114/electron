/**
 * Пока все храним в localStore
 */
class ls {
    save(key, data) {
        localStorage.setItem(key, JSON.stringify(data))
    }
    load(key) {
        return localStorage.getItem(key)
    }
}

class Users {
    getAll() {
        return [
            {id: 1, name: 'Petr', roles: ['User', 'Candidate']},
            {id: 2, name: 'Ivan', roles: ['User']},
            {id: 3, name: 'Nikola', roles: ['Moderator']},
            {id: 4, name: 'Ivonna', roles: ['Admin']},
        ]
    }
    add() {}
    suspend() {}
    batchAdd() {}
    getById() {}
    deleteById() {}
}

class Votings {
    getAll() {
        return [
            {
                id: 1, name: 'Кто президент?', type: 'За кандидата', start: '10.01.2021', end: '20.05.2021',
                total: 1000, count: 900,
                choices: [
                    {id: 1, name: 'Petr', count: 120, percent: 13.33},
                    {id: 2, name: 'Ivan', count: 510, percent: 56.66},
                    {id: 3, name: 'Ivonna', count: 270, percent: 30},
                ]
            },
            {
                id: 2, name: 'Кто круче?', type: 'Перечисление', start: '10.01.2021', end: '20.05.2021',
                total: 500, count: 200,
                choices: [
                    {id: 1, name: 'Альянс', count: 120, percent: 13.33},
                    {id: 2, name: 'Орда', count: 510, percent: 56.66},
                ]
            },
        ]
    }
    add() {}
    suspend() {}
    batchAdd() {}
    getById() {}
    deleteById() {}

    getByCandidate(id) {
        return [
            {id: 2, name: 'Кто круче?', type: 'Перечисление', start: '10.01.2021', end: '20.05.2021',
                choice: 'Орда', choice_date:'11.01.2021'
            },
        ]
    }
    getByVoter(id) {
        return [this.getAll()[0]]
    }
}

function getTypes() {
    return [
        { key: 'За кандидата', text: 'За кандидата', value: 'За кандидата' },
        { key: 'Перечисление', text: 'Перечисление', value: 'Перечисление' },
    ]
}

export default {
    Users,
    Votings,
    getTypes
}