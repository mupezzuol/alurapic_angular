// Ambiente -> DESENVOLVIMENTO -> ng serve
export const environment = {
  production: false,
  ApiUrl: 'http://localhost:3000'
};


/*

* Tudo que consta dentro dessa constante 'environment' é de acordo com o ambiente ele mudará;
* Para configuar devemos mexer em um arquivo chamado 'angular.json' e modificar as configurações dos nomes dos arquivos que serão chamados,
segue abaixo os exemplos de como fazer isso.

BUILD PROD:
- ng build --prod
- ng build --configuration production

BUILD HOMO/QA:
- ng build --configuration homo


ARQUIVO DE CONFIG -> angular.json

SEGUE ABAIXO ESTILO DE CONFIGURAÇÃO:
"configurations": {
  
  "production": {
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.prod.ts"
      }
    ],
    "optimization": true,
    "outputHashing": "all",
    "sourceMap": false,
    "extractCss": true,
    "namedChunks": false,
    "aot": true,
    "extractLicenses": true,
    "vendorChunk": false,
    "buildOptimizer": true
  },

  "homo": {
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.homo.ts"
      }
    ],
    "optimization": true,
    "outputHashing": "all",
    "sourceMap": false,
    "extractCss": true,
    "namedChunks": false,
    "aot": true,
    "extractLicenses": true,
    "vendorChunk": false,
    "buildOptimizer": true
  }
}

*/

