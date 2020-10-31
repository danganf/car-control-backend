'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vehicle', { 
		id: {
			allowNull: false,
			primaryKey: true,
			type: Sequelize.UUID,
		},
		user_id: {
			allowNull: false,
			type: Sequelize.UUID,
			references: {
                model: 'user',
                key: 'id'
            }
		},
		type_id: {
			allowNull: false,
			type: Sequelize.UUID,
			references: {
                model: 'type_vehicle',
                key: 'id'
            }
		},
		manufacture_id: {
			allowNull: false,
			type: Sequelize.UUID,
			references: {
                model: 'manufacture',
                key: 'id'
            }
		},
		fuel_id: {
			allowNull: false,
			type: Sequelize.UUID,
			references: {
                model: 'fuel',
                key: 'id'
            }
		},
		template: {
			allowNull: true,
			type: Sequelize.STRING(50),
		},
		year: {
			allowNull: true,
			type: Sequelize.INTEGER,
		},
		odometer: {
			allowNull: true,
			type: Sequelize.INTEGER,
		},
		chassi: {
			allowNull: true,
			type: Sequelize.STRING(50),
		},
		renavam: {
			allowNull: true,
			type: Sequelize.STRING(80),
		},
		obs: {
			allowNull: true,
			type: Sequelize.STRING(150),
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
    },
    {
        uniqueKeys: {
          unique_vehicle: {
            customIndex: true,
            fields: ["user_id","type_id","manufacture_id"]
          }
        }
    }
	);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('vehicle');
  }
};
