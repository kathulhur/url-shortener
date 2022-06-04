export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    apiVersion: process.env.API_VERSION,
    baseUrl: process.env.BASE_URL,
    database: {
        databaseUri: process.env.DATABASE_URI
    }
})