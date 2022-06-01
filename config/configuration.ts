export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    base_url: process.env.BASE_URL,
    database: {
        database_uri: process.env.DATABASE_URI
    }
})