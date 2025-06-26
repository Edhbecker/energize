
import { Sequelize } from "sequelize";
import banco from "../banco.js";

export default banco.define("produto", {
    idproduto: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    imagem: {
        type: Sequelize.STRING,
        allowNull: false
    },
    disponivel: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    categoria: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
    }
});
