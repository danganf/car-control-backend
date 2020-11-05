'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vehicle_fuel', { 
		fuel_id: {
			allowNull: false,
			type: Sequelize.UUID,
			primaryKey: true,
			references: {
                model: 'fuel',
                key: 'id'
            }
		},
		vehicle_id: {
			allowNull: false,
			type: Sequelize.UUID,
			primaryKey: true,
			references: {
                model: 'vehicle',
				key: 'id',
				onDelete: 'CASCADE'
            }
		},
		size: {
			allowNull: true,
			type: Sequelize.DECIMAL(10.2),
		},
		created_at: {
			allowNull: false,
			type: Sequelize.DATE,
			defaultValue: new Date(),
		},
		updated_at: {
			allowNull: false,
			type: Sequelize.DATE,
			defaultValue: new Date(),
		},
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('vehicle_fuel');
  }
};
