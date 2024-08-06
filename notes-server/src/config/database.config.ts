export default () => ({
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost/nestjs_notes',
  },
});
