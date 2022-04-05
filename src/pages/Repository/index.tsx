import React, { useEffect } from 'react';
import { useMatch, Link } from 'react-router-dom';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'

import Api from '../../services/api';

import { Header, RepositoryInfo, Issues } from './styles';

let logoImg = "https://xesque.rocketseat.dev/platform/1587379765556-attachment.svg";

const Repository: React.FC = () => {
    const path = useMatch("/repositories/*",);
    console.log(path?.params)

    useEffect(() => {
        Api.get(`repos/${path?.params}`).then(response => {
            console.log(response.data)
        })


    }, []);

    return (
        <>
            <Header>
                <img src={logoImg} alt="Github_explorer" />
                <Link to="/">
                    <FiChevronsLeft size={16} />
                    Voltar
                </Link>
            </Header>
            <RepositoryInfo>
                <header>
                    <img src="https://avatars.githubusercontent.com/u/51841398?v=4" alt="Usuario" />
                    <div>
                        <strong>repositório</strong>
                        <p>Descricao</p>
                    </div>
                </header>
                <ul>
                    <li>
                        <strong>1800</strong>
                        <span>Stars</span>
                    </li>
                    <li>
                        <strong>1800</strong>
                        <span>Forks</span>
                    </li>
                    <li>
                        <strong>1800</strong>
                        <span>Issues abertas</span>
                    </li>
                </ul>
            </RepositoryInfo>

            <Issues>
                <Link key="teste" to="/">
                    <div>
                        <strong>repository.full_name</strong>
                        <p>repository.description</p>
                    </div>
                    <FiChevronsRight size={20}></FiChevronsRight>
                </Link>
            </Issues>
        </>
    )
}

export default Repository;