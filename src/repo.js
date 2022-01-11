/**
 * Пока все храним в localStore
 */
class Ls {
    save(key, data) {
        localStorage.setItem(key, JSON.stringify(data))
    }
    load(key) {
        return JSON.parse(localStorage.getItem(key))
    }
    remove(key) {
        localStorage.removeItem(key)
    }
}

/**
 * Работа с файлами (csv, json)
 */
class File {
    read(el, dataCb) {
        const cb = () => {
            let file = el.files[0]
            let reader = new FileReader()
            reader.readAsText(file)
            reader.onload = (e) => {
                el.removeEventListener('change', cb)
                let data = e.target.result
                // csv
                data = data.split("\n").map(x => x.trim().split(','))
                dataCb(data)
            }
        }
        el.addEventListener('change', cb)
        el.click()
    }
    write(filename, data) {
        // csv
        data = data.map(row => row.join(',')).join("\r\n")

        let element = document.createElement('a')
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data))
        element.setAttribute('download', filename)
        element.style.display = 'none'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }
}

/**
 * Контроль постоянного хранения данных
 */
class PersistManager {
    batchSaveUsers(el) {
        let file = new File()
        let ls = new Ls()

        file.read(el, (data) => {
            data = data.map(x => {
                return {id: x[0], uuid: x[1], name: x[2], roles: ['User']}
            })
            ls.save('users', data)
        })
    }
    batchLoadUsers(filename) {
        let file = new File()

        let users = (new Users()).getAll()
        users = users.map(x => [x.id, x.uuid, x.name])
        file.write(filename, users)
    }
    clearUsers() {
        (new Ls()).remove('users')
    }
    addUser(user) {
        // let users = (new Users()).getAll()
        // user.roles = ['User']
        // user.id = users.length + 1
        // users[users.length] = user
        // (new Ls()).save('users', users)
    }

    batchSaveVotings(el) {
        let file = new File()
        let ls = new Ls()

        file.read(el, (data) => {
            data = data.map(x => {
                return {id: x[0], name: x[1], type: x[2], start: x[3], end: x[4]}
            })
            ls.save('votings', data)
        })
    }
    batchLoadVotings(filename) {
        let file = new File()

        let users = (new Votings()).getAll()
        users = users.map(x => [x.id, x.name, x.type, x.start, x.end])
        file.write(filename, users)
    }
    clearVotings() {
        (new Ls()).remove('votings')
    }
}

class Users {
    getAll() {
        return (new Ls()).load('users') || [
            {id: 1, name: 'Никифоров Петр Викторович', roles: ['User', 'Candidate'], uuid: '63a026fc-cf34-4cbb-ab25-f03d03800ee1'},
            {id: 2, name: 'Иванов Максим Дмитриевич', roles: ['User'], uuid: '27cf669b-ad6d-4e32-b6ce-b3f74f6315e5'},
            {id: 3, name: 'Садалов Николай Евгеньевич', roles: ['Moderator'], uuid: '77c2337b-4fae-47c2-9b6e-b36a4a5f0285'},
            {id: 4, name: 'Кузнецова Наталья Сергеевна', roles: ['Admin'], uuid: 'f0a8280f-cf59-4807-87a0-cd6e78a5f1bd'},
        ]
    }
    suspend() {}
    getById() {}
    deleteById() {}
}

class Votings {
    getAll() {
        return (new Ls()).load('votings') || [
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
    suspend() {}
    getById() {}
    deleteById() {}

    getByCandidate(id) {
        return [this.getAll()[1]]
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
    getTypes,
    PersistManager,
}