import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::question.question', ({ strapi }) => ({
  async getRandomQuestions(ctx) {
    try {
      const { categorie, niveau, limit } = ctx.query;

      if (!categorie || !niveau) {
        return ctx.badRequest('Catégorie et niveau sont requis.');
      }

      // On convertit la limite et on s'assure que c'est un nombre raisonnable
      let amount = limit ? parseInt(limit as string) : 10;
      if (isNaN(amount) || amount <= 0) amount = 10;

      // 1. On récupère les IDs des questions PUBLIÉES uniquement
      const allEntities = await strapi.db.query('api::question.question').findMany({
        where: {
          categorie: (categorie as string).toLowerCase(),
          niveau: (niveau as string).toLowerCase(),
          publishedAt: { $notNull: true },
        },
        select: ['id'],
      });

      if (allEntities.length === 0) return { data: [] };

      // 2. On mélange et on prend le nombre demandé
      const shuffledIds = allEntities
        .map((e) => e.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, amount);

      // 3. On récupère les données complètes pour ces IDs précis
      const finalQuestions = await strapi.db.query('api::question.question').findMany({
        where: {
          id: { $in: shuffledIds },
        },
      });

      return { data: finalQuestions };
    } catch (err) {
      return ctx.internalServerError('Erreur lors du tirage aléatoire.');
    }
  },
}));