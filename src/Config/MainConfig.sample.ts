
/** Общие настройки приложения */
export const common = {
    env: 'dev', // Тип окружения
    nameApp: 'db_proxy', // Имя приложения // показываем
    host: '127.0.0.1', // Внутренний host на котором стартует noda слушается обращение к API
    port: 9000, // порт на котором будет работать нода
    host_public: 'https://larastory.ru', // Публичный host балансер к которому идет обращение с фронта
}

export const cfDbProxy = { // Knex mysql
    client: "mysql2",
    connection: {
        host: "localhost",
        user: "root",
        password: "*",
        database: "*"
    },
    pool: { "min": 0, "max": 7 },
    acquireConnectionTimeout: 60000
};

export const cfDbMaster = { // Knex mysql
    client: "mysql2",
    connection: {
        host: "localhost",
        user: "root",
        password: "*",
        database: "*1"
    },
    pool: { "min": 0, "max": 7 },
    acquireConnectionTimeout: 60000
};

export const cfDbLog = { // Knex mysql
    client: "mysql2",
    connection: {
        host: "localhost",
        user: "root",
        password: "*",
        database: "*1"
    },
    pool: { "min": 0, "max": 7 },
    acquireConnectionTimeout: 60000
};

/** Предпочтение при чтении */
export const cfPref = {
    '10.100.0.1':['110.10.50.1:3036'], // от : куда
    '10.100.0.2':['110.10.50.2:3039', '110.10.50.2:3040']
}

/** логирование данных */
export const cfLogChange = {
    connect:'ws://127.0.0.1:3030',
    logBuffer:{log1:'packet_log1',log2:'packet_log2'}, // Предполагается запись в dbProxy - не обязательный параметр
    logConnect:cfDbLog,
    table:[
        // from=таблица -кто тригерит, to=таблица куда, id=идентификатор таблицы,col какие поля, type = список/один
        // левая таблица должна присутствовать колонкой в правой
        {from:'item', to:'item', where:['item_id'], col:['item_id']}, // товары
        {from:'item', to:'order', where:['item_id'], alias:'price', col:['price'], 'type':'val'}, // при изменении товара изменить заказ
        {from:'order', to:'order', where:['order_id'], col:['item_id','delivery']}, // заказ
        {from:'order_char', to:'order', where:['order_id'], col:['key_id', 'val_id'], type:'list'}, // товары
        {from:'order_char', to:'order_char', where:['order_id'], col:['key_id', 'val_id'], type:'list'}, // товары
    ]
}

/** События для отправки */
export const сfHook = {
    error:'https://'
}

export const cfDb = [
    { // Knex mysql
        client: "mysql2",
        connection: {
            host: "localhost",
            user: "root",
            password: "*",
            database: "*1"
        },
        pool: { "min": 0, "max": 7 },
        acquireConnectionTimeout: 60000
    },
    { // Knex mysql
        client: "mysql2",
        connection: {
            host: "localhost",
            user: "root",
            password: "*",
            database: "*2"
        },
        pool: { "min": 0, "max": 7 },
        acquireConnectionTimeout: 60000
    },
    { // Knex mysql
        client: "mysql2",
        connection: {
            host: "localhost",
            user: "root",
            password: "*",
            database: "*3"
        },
        pool: { "min": 0, "max": 7 },
        acquireConnectionTimeout: 60000
    },
]