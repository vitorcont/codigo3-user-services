[![Quality gate](https://conti-server.com.br/sonarqube/api/project_badges/quality_gate?project=vitorcont_codigo3-user-services_AYyAB5tv5KutpObFMwcN&token=sqb_51b01a58671d3dd6358a82e9d5e59bf6971e119a)](https://conti-server.com.br/sonarqube/dashboard?id=vitorcont_codigo3-user-services_AYyAB5tv5KutpObFMwcN)

[![Quality gate](https://conti-server.com.br/sonarqube/api/project_badges/quality_gate?project=vitorcont_codigo3-user-services_AYyAB5tv5KutpObFMwcN&token=sqb_51b01a58671d3dd6358a82e9d5e59bf6971e119a)](https://conti-server.com.br/sonarqube/dashboard?id=vitorcont_codigo3-user-services_AYyAB5tv5KutpObFMwcN)


# Código 3 - Projeto de Finalização de curso

### Priorização no deslocamento de veículos de emergência utilizando a infraestrutura conectada de grandes centros urbanos

Este projeto explora de como se pode utilizar artifícios de integração a infraestrutura de grandes centros urbanos para dar suporte ao atendimento de veículos de emergência utilizando metodologias como traffic preemption de base, e assim trazendo mais segurança aos ocupantes e agilidade no atendimento de emergências, no mesmo será discutido a arquitetura do sistema e os resultados alcançados.


## Micro-serviço de usuários

Este repositório se diz a respeito do micro-serviço de usuários, o mesmo tem como objetivo disponibilizar a interface de contrato / a API para alguns serviços voltados ao usuário, onde a recorrência de requisições será baixa, ela contém as interfaces de: CRUD de usuarios, Autenticação, visualização de viagens e CRUD de Controladores de tráfego

Para sua publicação é gerado um artefato e o mesmo é inserido em um container para que seja hospedado utilizando a ferramenta Docker [Docker]. Sua publicação pode ser acessada utilizando o link a seguir:
https://conti-server.com.br/codigo3/user-services/



### Tecnologias e Protocolos

O Serviço foi desenvolvido utilizando os padrões de API RESTful e sua comunicação é feita utilizando os protocolos Hyper Text Transfer Protocol Secure (HTTPS), a linguagem Javascript associado ao ambiente de execução NodeJS e a framework  NestJS, está framework tem como princípio a modularização das interfaces, facilitando a quebra em micro-serviços. Além disso, seu banco de dados foi criado utilizando o gerenciador Postgres.


### Documentação
* Figma:
https://www.figma.com/file/llFPMapbh4zxdQCRs2CEvj/C%C3%B3digo-3?type=design&mode=design&t=QoY2S1gHeXr9jOOG-1


* Miro:
https://miro.com/app/board/uXjVMVdjNnE=/?share_link_id=782556678524

* Artigo:
https://docs.google.com/document/d/1bvdlZlaoFWG22HTAyyba0nRyTfcnaeWr/edit?usp=sharing&ouid=104143320451161642725&rtpof=true&sd=true

* Apresentação:
https://www.canva.com/design/DAFzNkOs5BQ/0KWGG-q07jDja5nDEO_xAw/edit?utm_content=DAFzNkOs5BQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

## Autor

Vítor Ferrara Conti
