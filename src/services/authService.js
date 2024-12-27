import supabase from "../config/dbConfig.js";
import bcrypt from 'bcryptjs';

const authenticateUser = async (userName, password) => {
    const { data, error} = await supabase
        .from('users')
        .select('*')
        .eq('nome', userName)
        .single();

    if(error || !data ) {
        throw new Error('Usuário não encontrado');
    }

    const currentDate = new Date();
    const passwordExpireDate = new Date(data.password_expire)

    if (currentDate > passwordExpireDate) {
        throw new Error('A senha expirou. Por favor, redefina sua senha.');
    }

    const isPasswordValid = await bcrypt.compare(password, data.password);

    if(!isPasswordValid) {
        throw new Error('Senha incorreta.');
    }

    const user = {
        user_id: data.user_id,
        nome: data.nome,
        tipo: data.tipo,
        cargo: data.cargo,
    }

    return user;
}

export default authenticateUser;