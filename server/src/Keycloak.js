import Keycloak from 'keycloak-connect';

const config = {
    realm: "react-app",
    serverUrl: "http://localhost:8080/",
    bearerOnly: true,
    clientId: "app-backend",
    realmPublicKey: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApwGevzUGP555SMHPKbDlZFAjbyzH9EIEq4JJa7qH5tm4tCUZJBIDfroZClrkPpDJ32ZP+j+Pv4aLLVZx//v3ungrxKZVO7SIZjaO/qt6a1CDzjRhRMR/wxWZiqpfxEvzCfScNR9DmzfatSip9Z8jgEzaFk3TXin49F0BPCsbqG/f2DXmwbGKoaM8Eh0+2WaD4OnlmTB04AJVmaKx23z30imtf+0nCu+gcoLGKzZkVH2lZOXqXIP66xTGwuN981Hl5j52I0XDXZaU3xlfdp1agLNQcHd7M7TeyzHS3xVmusJbzDacktptg21JF7+9FEFLTw9youRH6eEwKaqxRsX0qwIDAQAB"
}

const keycloak = new Keycloak({}, config)

export default keycloak
