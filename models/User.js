module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        no_hp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: { // Nama kolom di dalam tabel
            type: DataTypes.DATE,
            allowNull: false,
            field: 'created_at',
        },
        updatedAt: { // Nama kolom di dalam tabel
            type: DataTypes.DATE,
            allowNull: false,
            field: 'updated_at'
        },
    },
    {
        tableName: 'users',
        timestamps: true 
    });

    return User;
}
