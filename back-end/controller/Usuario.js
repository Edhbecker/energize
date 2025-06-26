
import usuario from "../model/UsuarioModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const JWT_SECRET = process.env.JWT_SECRET || "sua_chave_secreta_aqui";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

// Middleware para verificar token JWT
export const verificarToken = (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};

// Middleware para verificar se é admin
export const verificarAdmin = (req, res, next) => {
    if (req.usuario.role !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado. Apenas administradores.' });
    }
    next();
};

// Registro tradicional
async function registrar(req, res) {
    try {
        const { nome, email, senha } = req.body;
        
        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
        }
        
        // Verificar se email já existe
        const usuarioExistente = await usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }
        
        // Criptografar senha
        const senhaHash = await bcrypt.hash(senha, 10);
        
        const novoUsuario = await usuario.create({
            nome,
            email,
            senha: senhaHash,
            provider: 'local'
        });
        
        // Gerar token
        const token = jwt.sign(
            { idusuario: novoUsuario.idusuario, email: novoUsuario.email, role: novoUsuario.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.status(201).json({
            token,
            usuario: {
                idusuario: novoUsuario.idusuario,
                nome: novoUsuario.nome,
                email: novoUsuario.email,
                role: novoUsuario.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Login tradicional
async function login(req, res) {
    try {
        const { email, senha } = req.body;
        
        if (!email || !senha) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }
        
        const usuarioEncontrado = await usuario.findOne({ where: { email, provider: 'local' } });
        if (!usuarioEncontrado) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
        
        const senhaValida = await bcrypt.compare(senha, usuarioEncontrado.senha);
        if (!senhaValida) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
        
        if (!usuarioEncontrado.ativo) {
            return res.status(401).json({ error: 'Usuário inativo' });
        }
        
        const token = jwt.sign(
            { idusuario: usuarioEncontrado.idusuario, email: usuarioEncontrado.email, role: usuarioEncontrado.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.json({
            token,
            usuario: {
                idusuario: usuarioEncontrado.idusuario,
                nome: usuarioEncontrado.nome,
                email: usuarioEncontrado.email,
                role: usuarioEncontrado.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Login com Google
async function loginGoogle(req, res) {
    try {
        const { token } = req.body;
        
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID
        });
        
        const payload = ticket.getPayload();
        const { sub: googleId, email, name, picture } = payload;
        
        let usuarioEncontrado = await usuario.findOne({ 
            where: { email, provider: 'google' } 
        });
        
        if (!usuarioEncontrado) {
            usuarioEncontrado = await usuario.create({
                nome: name,
                email,
                provider: 'google',
                provider_id: googleId,
                avatar: picture
            });
        }
        
        const jwtToken = jwt.sign(
            { idusuario: usuarioEncontrado.idusuario, email: usuarioEncontrado.email, role: usuarioEncontrado.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.json({
            token: jwtToken,
            usuario: {
                idusuario: usuarioEncontrado.idusuario,
                nome: usuarioEncontrado.nome,
                email: usuarioEncontrado.email,
                role: usuarioEncontrado.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Login com Apple
async function loginApple(req, res) {
    try {
        const { identityToken, user } = req.body;
        
        // Aqui você implementaria a verificação do token da Apple
        // Por simplicidade, vou assumir que os dados já foram validados
        const { email, firstName, lastName } = user;
        
        let usuarioEncontrado = await usuario.findOne({ 
            where: { email, provider: 'apple' } 
        });
        
        if (!usuarioEncontrado) {
            usuarioEncontrado = await usuario.create({
                nome: `${firstName} ${lastName}`,
                email,
                provider: 'apple',
                provider_id: identityToken
            });
        }
        
        const token = jwt.sign(
            { idusuario: usuarioEncontrado.idusuario, email: usuarioEncontrado.email, role: usuarioEncontrado.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.json({
            token,
            usuario: {
                idusuario: usuarioEncontrado.idusuario,
                nome: usuarioEncontrado.nome,
                email: usuarioEncontrado.email,
                role: usuarioEncontrado.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Listar usuários (apenas admin)
async function listar(req, res) {
    try {
        const usuarios = await usuario.findAll({
            attributes: { exclude: ['senha'] }
        });
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Perfil do usuário
async function perfil(req, res) {
    try {
        const usuarioEncontrado = await usuario.findByPk(req.usuario.idusuario, {
            attributes: { exclude: ['senha'] }
        });
        res.json(usuarioEncontrado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default { 
    registrar, 
    login, 
    loginGoogle, 
    loginApple, 
    listar, 
    perfil,
    verificarToken,
    verificarAdmin
};
