const db = require('../../models');

const deleteUserPlant = async (userId, userPlantId) => {
  const userPlant = await db.UserPlant.findOne({
    where: { id: userPlantId, user_id: userId },
  });

  if (!userPlant) {
    throw new Error('User-Plant association not found');
  }

  await userPlant.destroy();
  return { message: 'User-Plant association deleted successfully' };
};

module.exports = deleteUserPlant;
