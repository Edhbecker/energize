
import { Sequelize } from "sequelize";
import banco from "../banco.js";

export default banco.define("usuario", {
    idusuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: true // null para login social
    },
    provider: {
        type: Sequelize.ENUM('local', 'google', 'apple'),
        defaultValue: 'local'
    },
    provider_id: {
        type: Sequelize.STRING,
        allowNull: true
    },
    role: {
        type: Sequelize.ENUM('admin', 'user'),
        defaultValue: 'user'
    },
    avatar: {
        type: Sequelize.STRING,
        allowNull: true
    },
    ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
});
