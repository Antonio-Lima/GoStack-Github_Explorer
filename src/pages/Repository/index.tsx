import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'

import Api from '../../services/api';

import { Header, RepositoryInfo, Issues } from './styles';

let logoImg = "https://xesque.rocketseat.dev/platform/1587379765556-attachment.svg";

interface Repository {
    full_name: string;
    description: string;
    stargazers_count: number;
    forsks_count: number;
    open_issues_count: number;
    owner: {
        login: string;
        avatar_url: string;
    };
}

interface Issue {
    id: number;
    title: string;
    html_url: string;
    user: {
        login: string;
    }
}

const Repository: React.FC = () => {
    const [repository, setRespository] = useState<Repository | null >(null);
    const [issues, setIssues] = useState<Issue[]>([]);

    const path = useParams();
    console.log(path.repository);

    useEffect(() => {
        Api.get(`repos/${path?.params}`).then(response => {
            setRespository(response.data);
        })
        Api.get(`repos/${path?.params}/issues`).then(response => {
            setIssues(response.data);
        })
        
        // Apenas para exemplo de como seria usando o async e await

        // async function loadData(): Promise<void> {
        //     try {
        //         const [repository, issues] = await Promise.all([
        //             Api.get(`repos/${path.repository}`),
        //             Api.get(`repos/${path.repository}/issues`)
        //         ])

        //         console.log(repository);
        //         console.log(issues);    
        //     } catch (error) {
        //        console.log('Não foi possível solicitar o repositório. Tente novamente mais tarde.');
        //     }
        // }

        // loadData();

    }, [path?.params]);

    return (
        <>
            <Header>
                <img src={logoImg} alt="Github_explorer" />
                <Link to="/">
                    <FiChevronsLeft size={16} />
                    Voltar
                </Link>
            </Header>

            {repository && (
                <RepositoryInfo>
                    <header>
                        <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                    </header>
                    <ul>
                        <li>
                            <strong>{repository.stargazers_count}</strong>
                            <span>Stars</span>
                        </li>
                        <li>
                            <strong>{repository.forsks_count}</strong>
                            <span>Forks</span>
                        </li>
                        <li>
                            <strong>{repository.open_issues_count}</strong>
                            <span>Issues abertas</span>
                        </li>
                    </ul>
                </RepositoryInfo>
            )}

            {issues.length > 0 && (
                <Issues>
                    {issues.map(issue => (
                        <Link key={issue.id} to={issue.html_url}>
                            <div>
                                <strong>{issue.user.login}</strong>
                                <p>{issue.title}</p>
                            </div>
                            <FiChevronsRight size={20}></FiChevronsRight>
                        </Link>
                    ))}
                </Issues>
            )}
        </>
    )
}

export default Repository;