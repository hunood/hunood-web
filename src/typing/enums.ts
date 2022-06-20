enum Languages {
    PortuguesBr = "pt_br",
    English = "en",
    Spanish = "es"
}
enum EtapaOnboarding {
    CADASTRO_USUARIO = 0,
    CADASTRO_EMPRESA = 1,
    VERIFICACAO_CODIGO_EMAIL = 2,
    COMPLETO = 3,
    ALTERACAO_SENHA_NOVO_USUARIO = 4,
    VALIDACAO_DADOS_NOVO_USUARIO = 5,
}

enum TipoUsuario {
    ADMINISTRADOR = "Administrador",
    COLABORADOR = "Colaborador"
}

enum SituacaoUsuario {
    ATIVO = "Ativo",
    INATIVO = "Inativo"
}

enum Generos {
    MASCULINO = "Masculino",
    FEMININO = "Feminino",
    OMITIDO = "Omitir",
    OUTRO = "Outro"
}

enum TratarComo {
    ELE = "Masculino / Ele / Senhor",
    ELA = "Feminino / Ela / Senhora"
}

enum TiposTelefone {
    FIXO = "Telefone",
    CELULAR = "Celular",
    WHATSAPP = "WhatsApp",
    CELULAR_WHATS = "Celular e WhatsApp"
}

enum Estados {
    AC = "Acre",
    AL = "Alagoas",
    AP = "Amapá",
    AM = "Amazonas",
    BA = "Bahia",
    CE = "Ceará",
    DF = "Distrito Federal",
    ES = "Espirito Santo",
    GO = "Goias",
    MA = "Maranhão",
    MT = "Mato Grosso",
    MS = "Mato Grosso do Sul",
    MG = "Minas Gerais",
    PA = "Pará",
    PB = "Paraíba",
    PR = "Paraná",
    PE = "Pernambuco",
    PI = "Piauí",
    RJ = "Rio de Janeiro",
    RN = "Rio Grande do Norte",
    RS = "Rio Grande do Sul",
    RO = "Rondônia",
    RR = "Roraima",
    SC = "Santa Catarina",
    SP = "São Paulo",
    SE = "Sergipe",
    TO = "Tocantins"
}

enum TipoProduto {
    PERECIVEL = "Perecível",
    IMPERECIVEL = "Imperecível"
}

enum Acao {
    ENTRADA = "Entrada",
    SAIDA = "Saída"
}

export {
    TipoUsuario,
    EtapaOnboarding,
    TiposTelefone,
    Estados,
    Generos,
    Languages,
    TratarComo,
    SituacaoUsuario,
    TipoProduto,
    Acao
};