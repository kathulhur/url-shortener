export default () => ({
    port: parseInt(process.env.port, 10) || 3000,
    baseUrl: process.env.BASE_URL,
    database: {
        database_uri: process.env.DATABASE_URI
    }
})