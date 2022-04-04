import React, { useState, FormEvent } from 'react';
import { FiChevronsRight } from 'react-icons/fi';
import Api from '../../services/api';

import { Title, Form, Repositories, Error } from './styles';

interface Repository {
    full_name: string;
    owner: {
        login: string;
        avatar_url: string;
    };
    description: string;
}

let logoImg = "https://xesque.rocketseat.dev/platform/1587379765556-attachment.svg";

const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('');
    const [inputError, setInputError] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>([]);

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        if (!newRepo) {
            setInputError('Digite o autor/nome do repositório');
            return;
        }

        try { 
            const response = await Api.get<Repository>(`repos/${newRepo}`);

            const repository = response.data;

            setRepositories([...repositories, repository]);
            setNewRepo('');
            setInputError('');
        } catch (err) {
            setInputError('Erro na busca por esse repositório');
        }
    }

    return (
        <>
            <img 
                src={logoImg}
                alt="github_explorer" />
            <Title>Explore repositórios no Github</Title>
            <Form hasError={!!inputError} onSubmit={handleAddRepository}>
                <input 
                    type="text"
                    value={newRepo}
                    onChange={(e) => setNewRepo(e.target.value)}
                    placeholder="Digite o nome do repositório" 
                />
                <button type="submit">Pesquisar</button>
            </Form>

            { inputError &&  <Error>{inputError}</Error>}
            

            <Repositories>
                {repositories.map(repository => (
                    <a key={repository.full_name} href="teste">
                        <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                        <FiChevronsRight></FiChevronsRight>
                    </a>
                ))}
                
            </Repositories>
        </>
    )
}

export default Dashboard;