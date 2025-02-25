/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PORT: number;
    readonly VITE_HOST: string;
    readonly VITE_BASE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
