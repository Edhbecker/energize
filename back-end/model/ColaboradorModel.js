import { Sequelize } from "sequelize";
import banco from "../banco.js";

export default banco.define("colaborador", {
    idcolaborador: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nascimento: {
        type: Sequelize.DATE,
        allowNull: false
    },
    salario: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    casado: {
        type: Sequelize.BOOLEAN,
        defaultValue: null
    },
    filhos: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    observacoes: {
        type: Sequelize.STRING,
        defaultValue: null
    }
});
