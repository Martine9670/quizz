export default {
  routes: [
    {
      method: 'GET',
      path: '/questions/random',
      handler: 'question.getRandomQuestions',
      config: {
        auth: false,
      },
    },
  ],
};