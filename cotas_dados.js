// Dados importados dos sócios e cotas com direito a voucher
const COTAS_IMPORTADAS = [
  {
    "id": "cota-1",
    "data_aquisicao": "2026-09-29",
    "nome_socio": "KALINKA DE SOUZA RAPOSO",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-2",
    "data_aquisicao": "2026-09-05",
    "nome_socio": "AMANDA MOTA SILVA",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-3",
    "data_aquisicao": "2026-08-28",
    "nome_socio": "ANTONIA TATIANE CAMARGO",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-4",
    "data_aquisicao": "2026-08-26",
    "nome_socio": "EDUARDO DIAS DA SILVA",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-5",
    "data_aquisicao": "2026-08-22",
    "nome_socio": "FLAVIO ROBERTO PRAXEDES FRANCA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-6",
    "data_aquisicao": "2026-08-21",
    "nome_socio": "CARLOS ROBERTO PAIXÃO PINHEIRO",
    "produto": "LUXO MASTER OURO 1º / 2º / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-7",
    "data_aquisicao": "2026-08-21",
    "nome_socio": "CARLOS ROBERTO PAIXÃO PINHEIRO",
    "produto": "LUXO MASTER OURO 1º / 2º / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-8",
    "data_aquisicao": "2026-08-16",
    "nome_socio": "VANESSA DE AMORIM RIBEIRO PIOVESAN",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-9",
    "data_aquisicao": "2026-08-15",
    "nome_socio": "ANA CLAUDIA DE JESUS",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-10",
    "data_aquisicao": "2026-08-14",
    "nome_socio": "HENRIQUE FRANCISCO DA SILVA JUNIOR",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-11",
    "data_aquisicao": "2026-08-13",
    "nome_socio": "ROGERIO MESQUITA DA SILVA",
    "produto": "LUXO PRATA 4º / 5º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-12",
    "data_aquisicao": "2026-08-06",
    "nome_socio": "DESIREE RODRIGUES DA VEIGA",
    "produto": "LUXO PRATA 4º / 5º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-13",
    "data_aquisicao": "2026-08-06",
    "nome_socio": "DESIREE RODRIGUES DA VEIGA",
    "produto": "LUXO PRATA 4º / 5º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-14",
    "data_aquisicao": "2026-07-28",
    "nome_socio": "MELISSA BRANDAO MACHADO",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-15",
    "data_aquisicao": "2026-07-25",
    "nome_socio": "LAÍS FRAGA KAUSS",
    "produto": "LUXO MASTER PRATA 1º / 2º / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-16",
    "data_aquisicao": "2026-07-25",
    "nome_socio": "CASSIO COUTINHO DE OLIVEIRA",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-17",
    "data_aquisicao": "2026-07-25",
    "nome_socio": "JOSE VIRGILIO LIMA",
    "produto": "LUXO MASTER PRATA 1º / 2º / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-18",
    "data_aquisicao": "2026-07-24",
    "nome_socio": "RAFAELA HELLEN BARBOSA DOS SANTOS DORE",
    "produto": "LUXO MASTER PRATA 1º / 2º / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-19",
    "data_aquisicao": "2026-07-23",
    "nome_socio": "JOSE BATISTA DOS SANTOS FREIRE",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-20",
    "data_aquisicao": "2026-07-23",
    "nome_socio": "RAFAELA HELLEN BARBOSA DOS SANTOS DORE",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-21",
    "data_aquisicao": "2026-07-23",
    "nome_socio": "GIULIANO MARCELO VARIS",
    "produto": "LUXO MASTER PRATA 1º / 2º / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-22",
    "data_aquisicao": "2026-07-22",
    "nome_socio": "KEVLEMN SOUSA GOUVEIA NOBREGA",
    "produto": "LUXO MASTER PRATA 1º / 2º / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-23",
    "data_aquisicao": "2026-07-21",
    "nome_socio": "CLAUDIO DANIEL ALBERTI",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-24",
    "data_aquisicao": "2026-07-20",
    "nome_socio": "GUTEMBERGUE LOPES DANTAS",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-25",
    "data_aquisicao": "2026-07-20",
    "nome_socio": "OZANEIDE CAVALCANTI DE MELO",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-26",
    "data_aquisicao": "2026-07-19",
    "nome_socio": "MARIA AUXILIADORA RAMOS",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-27",
    "data_aquisicao": "2026-07-19",
    "nome_socio": "CARLOS ASSUMPCAO TSCHURTSCHENTHALER",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-28",
    "data_aquisicao": "2026-07-18",
    "nome_socio": "JAILSON BLASIUS FERNANDES",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-29",
    "data_aquisicao": "2026-07-18",
    "nome_socio": "ADILSON AFONSO TAVARES",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-30",
    "data_aquisicao": "2026-07-18",
    "nome_socio": "TERESA CRISTINA GARCIA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-31",
    "data_aquisicao": "2026-07-16",
    "nome_socio": "JHONATAN DOS SANTOS FERREIRA",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-32",
    "data_aquisicao": "2026-07-12",
    "nome_socio": "DIEGO DUTRA ZONTINI",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-33",
    "data_aquisicao": "2026-07-10",
    "nome_socio": "JONES ALAN PAES DOS SANTOS",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-34",
    "data_aquisicao": "2026-07-09",
    "nome_socio": "DANIEL AUGUSTO CORRÊA",
    "produto": "VILLAMOR PRATA 5º / 6º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-35",
    "data_aquisicao": "2026-06-23",
    "nome_socio": "OSMAR GILNEI GONCALVES DE QUADROS",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-36",
    "data_aquisicao": "2026-06-14",
    "nome_socio": "MAURO ZONZINI",
    "produto": "BANGALO LUXURY OURO",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-37",
    "data_aquisicao": "2026-06-13",
    "nome_socio": "GILSON RAUL TOLEDO",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-38",
    "data_aquisicao": "2026-06-06",
    "nome_socio": "LAIS FERREIRA DA SILVA",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-39",
    "data_aquisicao": "2026-06-20",
    "nome_socio": "JESSIANA SOARES DA SILVA COSTA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-40",
    "data_aquisicao": "2026-05-18",
    "nome_socio": "JAILSON BLASIUS FERNANDES",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-41",
    "data_aquisicao": "2026-05-15",
    "nome_socio": "CARLOS ASSUMPCAO TSCHURTSCHENTHALER",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-42",
    "data_aquisicao": "2026-05-08",
    "nome_socio": "FABIANO TEIXEIRA AZEVEDO",
    "produto": "LUXO MASTER PRATA 1º / 2º / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-43",
    "data_aquisicao": "2026-05-08",
    "nome_socio": "FABIANO TEIXEIRA AZEVEDO",
    "produto": "LUXO MASTER PRATA 1º / 2º / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-44",
    "data_aquisicao": "2026-05-03",
    "nome_socio": "RODRIGO MITTELSTADT",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-45",
    "data_aquisicao": "2026-05-03",
    "nome_socio": "SERGIO LUIZ SILVA DE ARAÚJO",
    "produto": "LUXO MASTER PRATA 1º / 2º / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-46",
    "data_aquisicao": "2026-04-30",
    "nome_socio": "JEFFERSON HENRIQUE DE MELO",
    "produto": "LUXO MASTER PRATA 1º / 2º / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-47",
    "data_aquisicao": "2026-04-26",
    "nome_socio": "VOLNEY JOSUE SILVEIRA DA SILVA",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-48",
    "data_aquisicao": "2026-04-26",
    "nome_socio": "RICARDO DATHEIN",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-49",
    "data_aquisicao": "2026-04-20",
    "nome_socio": "JOSIELLY CRISTINE PETERS",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-50",
    "data_aquisicao": "2026-04-18",
    "nome_socio": "JULIO CESAR LOPES GOMES",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-51",
    "data_aquisicao": "2026-04-05",
    "nome_socio": "EDUARDO NASCIMENTO PAIVA",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-52",
    "data_aquisicao": "2026-04-05",
    "nome_socio": "JOSIEL RIBEIRO DOS SANTOS",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-53",
    "data_aquisicao": "2026-04-04",
    "nome_socio": "AGRINALDO ARAUJO JUNIOR",
    "produto": "LUXO MASTER PRATA 1º / 2º / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-54",
    "data_aquisicao": "2026-04-04",
    "nome_socio": "PERCIVAL HENRIQUES DE SOUZA NETO",
    "produto": "LUXO DIAMANTE 4º / 5º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-55",
    "data_aquisicao": "2026-04-02",
    "nome_socio": "AGRINALDO ARAUJO JUNIOR",
    "produto": "VILLAMOR PRATA 1°/ 2° / 3º / 4º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-56",
    "data_aquisicao": "2026-03-28",
    "nome_socio": "MARCELLO CLAUDIO DUARTE KLEIN TEIXEIRA",
    "produto": "LUXO PRATA 4º / 5º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-57",
    "data_aquisicao": "2026-03-28",
    "nome_socio": "OLDAIR BARCHI JUNIOR",
    "produto": "LUXO PRATA 4º / 5º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-58",
    "data_aquisicao": "2026-03-23",
    "nome_socio": "AMANDA SOUZA PEREIRA DA SILVA",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-59",
    "data_aquisicao": "2026-03-21",
    "nome_socio": "RAMON FERNANDES DE ANDRADE",
    "produto": "VILLAMOR PRATA 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-60",
    "data_aquisicao": "2026-03-19",
    "nome_socio": "NILSON LUZ CANGUSSU",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-61",
    "data_aquisicao": "2026-03-17",
    "nome_socio": "RAFAEL JOSE LOPES DE SANTANA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-62",
    "data_aquisicao": "2026-03-13",
    "nome_socio": "MAURICIO CAMARA DOS SANTOS",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-63",
    "data_aquisicao": "2026-03-07",
    "nome_socio": "TAMIRES FELICIANO NEPOMUCENO",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-64",
    "data_aquisicao": "2026-03-07",
    "nome_socio": "TAMIRES FELICIANO NEPOMUCENO",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-65",
    "data_aquisicao": "2026-03-07",
    "nome_socio": "PAULO THOMAZ DO ESPIRITO SANTO",
    "produto": "VILLAMOR OURO 5º / 6º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-66",
    "data_aquisicao": "2026-03-03",
    "nome_socio": "PAULO SERGIO DE LAZZARI",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-67",
    "data_aquisicao": "2026-02-24",
    "nome_socio": "KATIA ALINE DE OLIVEIRA",
    "produto": "VILLAMOR PRATA T",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-68",
    "data_aquisicao": "2026-02-22",
    "nome_socio": "CARLOS AUGUSTO SIMOES DO ROSARIO",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-69",
    "data_aquisicao": "2026-02-20",
    "nome_socio": "JOÃO BATISTA JUNIOR",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-70",
    "data_aquisicao": "2026-02-18",
    "nome_socio": "PAULO HENRIQUE DE OLIVEIRA",
    "produto": "VILLAMOR PRATA 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-71",
    "data_aquisicao": "2026-02-27",
    "nome_socio": "BI FINANCE CONSULTORIA LTDA",
    "produto": "VILLAMOR OURO 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-72",
    "data_aquisicao": "2026-01-31",
    "nome_socio": "ZILMEDSON DE ARAUJO SARAIVA",
    "produto": "LUXO MASTER PRATA 1º / 2º / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-73",
    "data_aquisicao": "2026-01-29",
    "nome_socio": "ZILMEDSON DE ARAUJO SARAIVA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-74",
    "data_aquisicao": "2026-01-29",
    "nome_socio": "PAULO HENRIQUE GONÇALVES DOS MARES GUIA",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-75",
    "data_aquisicao": "2026-01-20",
    "nome_socio": "ELIZABETH RODRIGUES REIS",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-76",
    "data_aquisicao": "2026-01-19",
    "nome_socio": "KAROLINE FERNANDES SIQUEIRA CAMPOS",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-77",
    "data_aquisicao": "2026-01-18",
    "nome_socio": "ROBERTO GALISA CORDEIRO",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-78",
    "data_aquisicao": "2026-01-14",
    "nome_socio": "WESLEY FARIA DE SOUZA",
    "produto": "LUXO MASTER PRATA 1º / 2º / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-79",
    "data_aquisicao": "2026-01-14",
    "nome_socio": "WESLEY FARIA DE SOUZA",
    "produto": "LUXO MASTER PRATA 1º / 2º / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-80",
    "data_aquisicao": "2026-01-09",
    "nome_socio": "ROSANA RAMOS DOS SANTOS",
    "produto": "LUXO BRONZE T",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-81",
    "data_aquisicao": "2026-01-09",
    "nome_socio": "ANDRES CHRISTOPHER MEDVEDOVSKY",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-82",
    "data_aquisicao": "2026-01-05",
    "nome_socio": "MIRANISE SANTOS GUIMARÃES FONSECA",
    "produto": "VILLAMOR PRATA 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-83",
    "data_aquisicao": "2026-01-05",
    "nome_socio": "ODUWALDO ANDRADE E SILVA",
    "produto": "LUXO OURO T",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-84",
    "data_aquisicao": "2026-01-02",
    "nome_socio": "ANDRE LUIZ PAIXAO DE ARAUJO",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-85",
    "data_aquisicao": "2026-01-02",
    "nome_socio": "CLEYSON RAMOS DE BARROS",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-86",
    "data_aquisicao": "2025-12-16",
    "nome_socio": "ANDREA SUSANA MILBRATZ BOEIRA",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-87",
    "data_aquisicao": "2025-12-12",
    "nome_socio": "JOSE MARCIANO AUGUSTO DOS SANTOS",
    "produto": "LUXO MASTER PRATA 1º / 2º / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-88",
    "data_aquisicao": "2025-12-12",
    "nome_socio": "RENATO COSMO GARCIA",
    "produto": "VILLAMOR OURO 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-89",
    "data_aquisicao": "2025-12-12",
    "nome_socio": "RENATO COSMO GARCIA",
    "produto": "VILLAMOR OURO 1°/ 2° / 3º / 4º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-90",
    "data_aquisicao": "2025-12-10",
    "nome_socio": "UBIRACI SALGADO DA SILVA JUNIOR",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-91",
    "data_aquisicao": "2025-12-10",
    "nome_socio": "TIAGO BATISTA DA SILVA",
    "produto": "LUXO MASTER PRATA 1º / 2º / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-92",
    "data_aquisicao": "2025-12-01",
    "nome_socio": "MARCIO RODRIGUES CERQUEIRA",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-93",
    "data_aquisicao": "2025-11-25",
    "nome_socio": "EVALDO MACHADO JUNIOR",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 3,
    "voucher_codigo": null
  },
  {
    "id": "cota-94",
    "data_aquisicao": "2025-11-25",
    "nome_socio": "EVALDO MACHADO JUNIOR",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 3,
    "voucher_codigo": null
  },
  {
    "id": "cota-95",
    "data_aquisicao": "2025-11-25",
    "nome_socio": "EVALDO MACHADO JUNIOR",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 3,
    "total_cotas": 3,
    "voucher_codigo": null
  },
  {
    "id": "cota-96",
    "data_aquisicao": "2025-11-14",
    "nome_socio": "HIROSHI SUGIYA",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-97",
    "data_aquisicao": "2025-11-25",
    "nome_socio": "SERGIO DAUTO DE OLIVEIRA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-98",
    "data_aquisicao": "2025-11-02",
    "nome_socio": "CARLOS VANDRE KERBER DE FREITAS",
    "produto": "LUXO PRATA T",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-99",
    "data_aquisicao": "2025-11-02",
    "nome_socio": "CARLOS VANDRE KERBER DE FREITAS",
    "produto": "LUXO PRATA T",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-100",
    "data_aquisicao": "2025-10-30",
    "nome_socio": "JOSE DIONISIO JUNIOR",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-101",
    "data_aquisicao": "2025-10-30",
    "nome_socio": "RITA SIBELLY CAETANO LOPES DE OLIVEIRA",
    "produto": "LUXO OURO 4º / 5º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-102",
    "data_aquisicao": "2025-10-30",
    "nome_socio": "MAICEL ANESIO TITTO",
    "produto": "LUXO PRATA T",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-103",
    "data_aquisicao": "2025-10-29",
    "nome_socio": "VALDECI RODRIGUES RAPOSO",
    "produto": "LUXO MASTER PRATA 1º / 2º / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-104",
    "data_aquisicao": "2025-10-29",
    "nome_socio": "VALDECI RODRIGUES RAPOSO",
    "produto": "LUXO MASTER PRATA 1º / 2º / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-105",
    "data_aquisicao": "2025-10-28",
    "nome_socio": "ISABEL FERREIRA NEO NETA",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-106",
    "data_aquisicao": "2025-10-28",
    "nome_socio": "ANTONIO DONATO",
    "produto": "LUXO BRONZE 4º / 5º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-107",
    "data_aquisicao": "2025-10-25",
    "nome_socio": "PAULO PORTO DE CARVALHO JUNIOR",
    "produto": "LUXO MASTER PRATA 1º / 2º / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-108",
    "data_aquisicao": "2025-10-25",
    "nome_socio": "PAULO PORTO DE CARVALHO JUNIOR",
    "produto": "LUXO MASTER PRATA 1º / 2º / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-109",
    "data_aquisicao": "2025-10-18",
    "nome_socio": "ROSANA RAMOS DOS SANTOS",
    "produto": "LUXO BRONZE T",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-110",
    "data_aquisicao": "2025-10-16",
    "nome_socio": "RENATO NEWTON RAMLOW",
    "produto": "LUXO MASTER PRATA 1º / 2º / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-111",
    "data_aquisicao": "2025-10-16",
    "nome_socio": "RENATO NEWTON RAMLOW",
    "produto": "LUXO MASTER PRATA 1º / 2º / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-112",
    "data_aquisicao": "2025-10-16",
    "nome_socio": "DECIO DE SOUZA FELIX",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-113",
    "data_aquisicao": "2025-10-14",
    "nome_socio": "JOSE IRAN DA SILVA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-114",
    "data_aquisicao": "2025-10-13",
    "nome_socio": "MARIA DE FATIMA FERREIRA RODRIGUES",
    "produto": "LUXO MASTER PRATA 1º / 2º / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-115",
    "data_aquisicao": "2025-10-13",
    "nome_socio": "MARIA DE FATIMA FERREIRA RODRIGUES",
    "produto": "LUXO MASTER PRATA 1º / 2º / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-116",
    "data_aquisicao": "2025-10-06",
    "nome_socio": "VICTOR SBISA BREMER",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-117",
    "data_aquisicao": "2025-10-04",
    "nome_socio": "NAYARA ROCHA DE ANDRADE",
    "produto": "VILLAMOR PRATA 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-118",
    "data_aquisicao": "2025-10-04",
    "nome_socio": "FREDERICO CESAR DOS SANTOS MACHADO JUNIOR",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-119",
    "data_aquisicao": "2025-10-02",
    "nome_socio": "JOSE RODRIGUES FERREIRA JUNIOR",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-120",
    "data_aquisicao": "2025-09-20",
    "nome_socio": "REGINALDO PARNOW ENNES",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-121",
    "data_aquisicao": "2025-09-19",
    "nome_socio": "ARTHA ASSESSORIA EMPRESARIAL LTDA",
    "produto": "LUXO DIAMANTE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-122",
    "data_aquisicao": "2025-09-19",
    "nome_socio": "MANOELA CRISTINA VIEIRA DO NASCIMENTO",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-123",
    "data_aquisicao": "2025-09-19",
    "nome_socio": "RAPHAEL DOUGLAS VIEIRA",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-124",
    "data_aquisicao": "2025-09-13",
    "nome_socio": "GRAZIELE KELLY DA SILVA SOUZA",
    "produto": "LUXO MASTER PRATA 1º / 2º / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-125",
    "data_aquisicao": "2025-09-11",
    "nome_socio": "LUIZ ARTHUR BRAYNER FERRAZ",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-126",
    "data_aquisicao": "2025-09-09",
    "nome_socio": "ESTELA RIBAS FEREZIN",
    "produto": "LUXO MASTER PRATA 1º / 2º / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-127",
    "data_aquisicao": "2025-09-06",
    "nome_socio": "SIMERY CONCEIÇÃO CONSTANCIO PESTANA",
    "produto": "LUXO PRATA 4º / 5º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-128",
    "data_aquisicao": "2025-09-06",
    "nome_socio": "SIMERY CONCEIÇÃO CONSTANCIO PESTANA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-129",
    "data_aquisicao": "2025-09-05",
    "nome_socio": "ALEXANDRE ROCHA DUARTE",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-130",
    "data_aquisicao": "2025-09-04",
    "nome_socio": "HELY DIOGENES DE FREITAS DIAS",
    "produto": "VILLAMOR OURO 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-131",
    "data_aquisicao": "2025-09-02",
    "nome_socio": "MONIQUIELY DA SILVA VENÂNCIO",
    "produto": "VILLAMOR BRONZE 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-132",
    "data_aquisicao": "2025-09-02",
    "nome_socio": "MONIQUIELY DA SILVA VENÂNCIO",
    "produto": "VILLAMOR BRONZE 1°/ 2° / 3º / 4º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-133",
    "data_aquisicao": "2025-08-29",
    "nome_socio": "ADRIANO CICERO DOS SANTOS",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-134",
    "data_aquisicao": "2025-08-23",
    "nome_socio": "LUIZ ANTONIO DA SILVA PAZZE",
    "produto": "VILLAMOR OURO 5º / 6º",
    "cota_ordem": 1,
    "total_cotas": 3,
    "voucher_codigo": null
  },
  {
    "id": "cota-135",
    "data_aquisicao": "2025-08-06",
    "nome_socio": "MARCIO ADRIANO SOLERA",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-136",
    "data_aquisicao": "2025-07-28",
    "nome_socio": "RAUL HERNANDEZ TABARES",
    "produto": "VILLAMOR OURO 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-137",
    "data_aquisicao": "2025-07-27",
    "nome_socio": "TARCISIO PEDRO ALAPENHA RIBEIRO",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-138",
    "data_aquisicao": "2025-07-26",
    "nome_socio": "SERGIO JOSE LINO DE MENDONÇA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-139",
    "data_aquisicao": "2025-07-26",
    "nome_socio": "DAUTRO ROGERIO RIBEIRO DOS SANTOS",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-140",
    "data_aquisicao": "2025-07-24",
    "nome_socio": "CARLOS EDUARDO REIS VIANNA JUNIOR",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-141",
    "data_aquisicao": "2025-07-10",
    "nome_socio": "MARCOS LUIZ RIBEIRO",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-142",
    "data_aquisicao": "2025-07-08",
    "nome_socio": "GERALDO QUEIROZ TOSCANO DE MELO JUNIOR",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-143",
    "data_aquisicao": "2025-07-09",
    "nome_socio": "EUDES DOS SANTOS MENDES",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-144",
    "data_aquisicao": "2025-07-07",
    "nome_socio": "THIAGO DA SILVA SANTANA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-145",
    "data_aquisicao": "2025-06-28",
    "nome_socio": "THIAGO DE LIMA ARAUJO",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-146",
    "data_aquisicao": "2025-06-28",
    "nome_socio": "EDMILSON FRANCISCO DO NASCIMENTO",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-147",
    "data_aquisicao": "2025-06-15",
    "nome_socio": "ANTONIO ALBERTO MONTEIRO DE SOUZA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-148",
    "data_aquisicao": "2025-06-14",
    "nome_socio": "EMMANUEL DO NASCIMENTO SILVA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-149",
    "data_aquisicao": "2025-06-14",
    "nome_socio": "CLAUDIO DANIEL ALBERTI",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-150",
    "data_aquisicao": "2025-06-13",
    "nome_socio": "CICERA ROSIANE CORREIA LIMA",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-151",
    "data_aquisicao": "2025-06-13",
    "nome_socio": "GUILHERME SIDNEY RABELO MASS",
    "produto": "LUXO OURO 4º / 5º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-152",
    "data_aquisicao": "2025-06-16",
    "nome_socio": "EULER BRENTINI",
    "produto": "VILLAMOR PRATA T",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-153",
    "data_aquisicao": "2025-06-10",
    "nome_socio": "MARCELO MUNIZ DE ANDRADE",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-154",
    "data_aquisicao": "2025-06-10",
    "nome_socio": "CECILIA MARIA FANK",
    "produto": "LUXO PRATA T",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-155",
    "data_aquisicao": "2025-06-10",
    "nome_socio": "CECILIA MARIA FANK",
    "produto": "VILLAMOR PRATA 1°/ 2° / 3º / 4º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-156",
    "data_aquisicao": "2025-06-10",
    "nome_socio": "MARCELO ARNT BRITO",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-157",
    "data_aquisicao": "2025-06-10",
    "nome_socio": "MARCELO ARNT BRITO",
    "produto": "LUXO PRATA T",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-158",
    "data_aquisicao": "2025-06-09",
    "nome_socio": "CARLOS ALBERTO ABUJAMRA",
    "produto": "VILLAMOR PRATA 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-159",
    "data_aquisicao": "2025-06-08",
    "nome_socio": "ESLI MORAIS DOS SANTOS REIS",
    "produto": "VILLAMOR BRONZE 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-160",
    "data_aquisicao": "2025-06-09",
    "nome_socio": "HELIO MARANGONI ALVES",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-161",
    "data_aquisicao": "2025-06-09",
    "nome_socio": "LUIS ALBERTO ALVES BARROS DE LIMA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-162",
    "data_aquisicao": "2025-06-09",
    "nome_socio": "LUIZ ANTONIO DA SILVA PAZZE",
    "produto": "VILLAMOR PRATA 1°/ 2° / 3º / 4º",
    "cota_ordem": 2,
    "total_cotas": 3,
    "voucher_codigo": null
  },
  {
    "id": "cota-163",
    "data_aquisicao": "2025-06-09",
    "nome_socio": "LUIZ ANTONIO DA SILVA PAZZE",
    "produto": "VILLAMOR PRATA 1°/ 2° / 3º / 4º",
    "cota_ordem": 3,
    "total_cotas": 3,
    "voucher_codigo": null
  },
  {
    "id": "cota-164",
    "data_aquisicao": "2025-06-09",
    "nome_socio": "SERGIO HENRIQUE MOREIRA PENHA",
    "produto": "LUXO PRATA 4º / 5º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-165",
    "data_aquisicao": "2025-06-09",
    "nome_socio": "PAULO ROBERTO LISBOA DE PAULA",
    "produto": "LUXO PRATA 4º / 5º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-166",
    "data_aquisicao": "2025-06-06",
    "nome_socio": "JOSE LUIS BALBINO",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-167",
    "data_aquisicao": "2025-06-06",
    "nome_socio": "PAULO EDUARDO DE CASTRO BARBOSA",
    "produto": "VILLAMOR PRATA 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-168",
    "data_aquisicao": "2025-06-12",
    "nome_socio": "SILMARA GONÇALVES XAVIER",
    "produto": "VILLAMOR PRATA 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-169",
    "data_aquisicao": "2025-06-06",
    "nome_socio": "CLARA RAPHAELLY NOGUEIRA BATISTA MARTINS",
    "produto": "LUXO PRATA 4º / 5º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-170",
    "data_aquisicao": "2025-06-05",
    "nome_socio": "MANCIO MENDES TEIXEIRA",
    "produto": "LUXO PRATA 4º / 5º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-171",
    "data_aquisicao": "2025-06-05",
    "nome_socio": "EDUARDO EUSTAQUIO PEREIRA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-172",
    "data_aquisicao": "2025-06-05",
    "nome_socio": "MARYONNE FEITOSA CRUZ BARRETO",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-173",
    "data_aquisicao": "2025-06-04",
    "nome_socio": "GARBAN & ARAUJO NEGOCIOS IMOBILIARIOS LTDA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-174",
    "data_aquisicao": "2025-06-03",
    "nome_socio": "EDER RICARDO SCHROEDER",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-175",
    "data_aquisicao": "2025-05-31",
    "nome_socio": "GUTEMBERGUE LOPES DANTAS",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-176",
    "data_aquisicao": "2025-05-31",
    "nome_socio": "PAULA NOGUEIRA DO RÊGO",
    "produto": "VILLAMOR PRATA 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-177",
    "data_aquisicao": "2025-05-29",
    "nome_socio": "DANIEL FERNANDO SILVA ROCHA",
    "produto": "LUXO PRATA 4º / 5º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-178",
    "data_aquisicao": "2025-05-29",
    "nome_socio": "GEOVANE OLIVEIRA LIMA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-179",
    "data_aquisicao": "2025-05-29",
    "nome_socio": "RENI ALVES DE AZEVEDO",
    "produto": "LUXO PRATA 4º / 5º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-180",
    "data_aquisicao": "2025-05-23",
    "nome_socio": "RENATO LUCENA DO NASCIMENTO JUNIOR",
    "produto": "VILLAMOR PRATA 5º / 6º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-181",
    "data_aquisicao": "2025-05-23",
    "nome_socio": "ALEXANDRE PORTO BONOW",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-182",
    "data_aquisicao": "2025-05-23",
    "nome_socio": "RICARDO ALEXANDRE GOMES DO REGO",
    "produto": "LUXO PRATA T",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-183",
    "data_aquisicao": "2025-05-23",
    "nome_socio": "CRISTINA DE ARRUDA COELHO VASCONCELLOS",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-184",
    "data_aquisicao": "2025-05-23",
    "nome_socio": "THIAGO MOREIRA VIEIRA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-185",
    "data_aquisicao": "2025-05-23",
    "nome_socio": "MARCILIO FERREIRA DOS REIS",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-186",
    "data_aquisicao": "2025-05-22",
    "nome_socio": "LUAN ROCHA PRATES",
    "produto": "LUXO OURO 4º / 5º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-187",
    "data_aquisicao": "2025-05-21",
    "nome_socio": "DAVID MOTA",
    "produto": "VILLAMOR OURO 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-188",
    "data_aquisicao": "2025-05-20",
    "nome_socio": "ADILSON CESAR MOREIRA PEREIRA",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-189",
    "data_aquisicao": "2025-05-19",
    "nome_socio": "ELTON BATISTA CORREA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-190",
    "data_aquisicao": "2025-05-19",
    "nome_socio": "FELIPE CABRERA RIBEIRO DA COSTA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-191",
    "data_aquisicao": "2025-05-18",
    "nome_socio": "LEANDRO FONDACARO",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-192",
    "data_aquisicao": "2025-05-17",
    "nome_socio": "ALCINEIDE ANGELICA DE MESQUITA",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-193",
    "data_aquisicao": "2025-05-19",
    "nome_socio": "LUIS FERNANDO GIOVANNETTI LAURENTI",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-194",
    "data_aquisicao": "2025-05-15",
    "nome_socio": "JOSÉ CARLOS ALVES SILVEIRA",
    "produto": "VILLAMOR PRATA 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-195",
    "data_aquisicao": "2025-05-13",
    "nome_socio": "EDUARDO FERRAZ",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-196",
    "data_aquisicao": "2025-05-13",
    "nome_socio": "ROMERO DE FREITAS VENTURA",
    "produto": "LUXO PRATA T",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-197",
    "data_aquisicao": "2025-05-13",
    "nome_socio": "JOSÉ CARLOS LOPES",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-198",
    "data_aquisicao": "2025-05-10",
    "nome_socio": "IVAN CARLOS CATUNDA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-199",
    "data_aquisicao": "2025-05-13",
    "nome_socio": "SILVIO MARTINS DE SOUZA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-200",
    "data_aquisicao": "2025-05-13",
    "nome_socio": "ADRIANA ROSA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-201",
    "data_aquisicao": "2025-05-09",
    "nome_socio": "JOSENILSON CUNHA DE OLIVEIRA",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-202",
    "data_aquisicao": "2025-05-09",
    "nome_socio": "LUCILO DOS SANTOS VAREJÃO",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-203",
    "data_aquisicao": "2025-05-07",
    "nome_socio": "FRANCISCO ALDENISIO ALVES DE ALMEIDA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-204",
    "data_aquisicao": "2025-04-29",
    "nome_socio": "RONALDO FERNANDES",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-205",
    "data_aquisicao": "2025-02-05",
    "nome_socio": "MATHEUS ANTONIUS VELOSO CAMELO",
    "produto": "VILLAMOR DIAMANTE T",
    "cota_ordem": 1,
    "total_cotas": 10,
    "voucher_codigo": null
  },
  {
    "id": "cota-206",
    "data_aquisicao": "2025-04-23",
    "nome_socio": "HELIO FERREIRA DIAS",
    "produto": "VILLAMOR DIAMANTE T",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-207",
    "data_aquisicao": "2025-04-22",
    "nome_socio": "F JOSE JUNIOR LTDA",
    "produto": "LUXO PRATA 4º / 5º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-208",
    "data_aquisicao": "2025-04-21",
    "nome_socio": "RENATO VITAL DOS SANTOS JUNIOR",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-209",
    "data_aquisicao": "2025-04-21",
    "nome_socio": "RENATO VITAL DOS SANTOS JUNIOR",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-210",
    "data_aquisicao": "2025-04-19",
    "nome_socio": "DANIEL TRENTINI FARIAS DA ROSA",
    "produto": "LUXO OURO T",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-211",
    "data_aquisicao": "2025-04-19",
    "nome_socio": "DANIEL TRENTINI FARIAS DA ROSA",
    "produto": "LUXO OURO T",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-212",
    "data_aquisicao": "2025-04-19",
    "nome_socio": "WILFREDO NUNEZ CARDENAS",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-213",
    "data_aquisicao": "2025-04-17",
    "nome_socio": "ANTONIO ALVES CORDEIRO NETO",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-214",
    "data_aquisicao": "2025-04-15",
    "nome_socio": "MARA REGINA SATURNINO",
    "produto": "VILLAMOR PRATA T",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-215",
    "data_aquisicao": "2025-04-15",
    "nome_socio": "MARA REGINA SATURNINO",
    "produto": "VILLAMOR PRATA T",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-216",
    "data_aquisicao": "2025-04-14",
    "nome_socio": "MARCOS FERREIRA MACEDO",
    "produto": "LUXO PRATA T",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-217",
    "data_aquisicao": "2025-04-11",
    "nome_socio": "ANGELA AUXILIADORA DE MOURA SOUZA",
    "produto": "LUXO PRATA 4º / 5º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-218",
    "data_aquisicao": "2025-04-06",
    "nome_socio": "FABIO ALVES RODRIGUES",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-219",
    "data_aquisicao": "2025-04-05",
    "nome_socio": "MTROCHA PARTICIPACAO SOCIETARIA LTDA",
    "produto": "VILLAMOR DIAMANTE 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-220",
    "data_aquisicao": "2025-04-04",
    "nome_socio": "OLAVO CESAR GUIDES PINHEIRO",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-221",
    "data_aquisicao": "2025-04-04",
    "nome_socio": "LENISE VARGAS FLORES DA SILVA",
    "produto": "VILLAMOR PRATA 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-222",
    "data_aquisicao": "2025-04-04",
    "nome_socio": "RAYMUNDO DA CONCEIÇÃO FILHO",
    "produto": "VILLAMOR PRATA 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-223",
    "data_aquisicao": "2025-04-04",
    "nome_socio": "PAULO DO ESPIRITO SANTO",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-224",
    "data_aquisicao": "2025-04-04",
    "nome_socio": "PAULO DO ESPIRITO SANTO",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-225",
    "data_aquisicao": "2025-04-03",
    "nome_socio": "KATIELLE PEREIRA MARTINS DA SILVA",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-226",
    "data_aquisicao": "2025-04-03",
    "nome_socio": "LUIZ DA SILVA",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-227",
    "data_aquisicao": "2025-04-03",
    "nome_socio": "ADRIANA CRISTINA DIAS DE OLIVEIRA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-228",
    "data_aquisicao": "2025-04-02",
    "nome_socio": "VALDIR JESUS DOS SANTOS",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-229",
    "data_aquisicao": "2025-04-02",
    "nome_socio": "MAURICIO CRIPPA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-230",
    "data_aquisicao": "2025-04-01",
    "nome_socio": "WANDERLEY HIROITI DELATERRA YWAMOTO",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-231",
    "data_aquisicao": "2025-04-01",
    "nome_socio": "JOÃO CARLOS KAIO FRAGA",
    "produto": "LUXO PRATA 4º / 5º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-232",
    "data_aquisicao": "2025-04-01",
    "nome_socio": "ANTONIO DEFANTI JUNIOR",
    "produto": "LUXO PRATA 4º / 5º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-233",
    "data_aquisicao": "2025-03-28",
    "nome_socio": "SAMUEL ROMAN DE TOLEDO",
    "produto": "VILLAMOR OURO 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-234",
    "data_aquisicao": "2025-03-28",
    "nome_socio": "TIAGO SOUZA LIMA",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-235",
    "data_aquisicao": "2025-03-28",
    "nome_socio": "TIAGO SOUZA LIMA",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-236",
    "data_aquisicao": "2025-03-28",
    "nome_socio": "DENERVAL DIAS DA SILVA JUNIOR",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-237",
    "data_aquisicao": "2025-03-27",
    "nome_socio": "VANESSA GOMES DA SILVA",
    "produto": "LUXO PRATA 4º / 5º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-238",
    "data_aquisicao": "2025-03-27",
    "nome_socio": "ELISANGELA MOTA SOARES SILVA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-239",
    "data_aquisicao": "2025-03-27",
    "nome_socio": "CARLOS ROBERTO PACHECO",
    "produto": "LUXO OURO 4º / 5º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-240",
    "data_aquisicao": "2025-03-25",
    "nome_socio": "CARLOS AUGUSTO FERNANDES DE SOUZA",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-241",
    "data_aquisicao": "2025-03-22",
    "nome_socio": "MTROCHA PARTICIPACAO SOCIETARIA LTDA",
    "produto": "LUXO DIAMANTE 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-242",
    "data_aquisicao": "2025-03-17",
    "nome_socio": "FLAVIO DE OLIVEIRA E SILVA",
    "produto": "VILLAMOR DIAMANTE 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-243",
    "data_aquisicao": "2025-03-16",
    "nome_socio": "ANDRE CASTELO BRANCO GOMES",
    "produto": "LUXO PRATA 4º / 5º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-244",
    "data_aquisicao": "2025-03-16",
    "nome_socio": "ALISON MORAIS DE SOUZA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-245",
    "data_aquisicao": "2025-03-15",
    "nome_socio": "FABIANO WERNNER DE SOUZA CORREIA",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-246",
    "data_aquisicao": "2025-03-10",
    "nome_socio": "SUENIA BURITY DE ASSIS",
    "produto": "LUXO OURO 4º / 5º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-247",
    "data_aquisicao": "2025-03-09",
    "nome_socio": "ELIANE MACHADO SABINO",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-248",
    "data_aquisicao": "2025-03-09",
    "nome_socio": "RONALDO LOPES COELHO",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-249",
    "data_aquisicao": "2025-03-06",
    "nome_socio": "TOBIAS DEZORDI PEREIRA",
    "produto": "LUXO PREMIUM PRATA 4º / 5º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-250",
    "data_aquisicao": "2025-03-05",
    "nome_socio": "MONICA LEITE CABRAL MONTEIRO",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-251",
    "data_aquisicao": "2025-03-05",
    "nome_socio": "MANUEL ALEXANDRE FILIPE MONTEIRO",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-252",
    "data_aquisicao": "2025-03-03",
    "nome_socio": "JANAINA DOS SANTOS SILVANO",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-253",
    "data_aquisicao": "2025-02-28",
    "nome_socio": "PAULO AMERICO MAIA DE VASCONCELOS",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-254",
    "data_aquisicao": "2025-02-28",
    "nome_socio": "MANOEL REIS DE OLIVEIRA",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-255",
    "data_aquisicao": "2025-02-27",
    "nome_socio": "VITOR YUKI DOURADO HORITA",
    "produto": "VILLAMOR OURO 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-256",
    "data_aquisicao": "2025-02-22",
    "nome_socio": "WAGNER PINTO LIMA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-257",
    "data_aquisicao": "2025-02-22",
    "nome_socio": "WAGNER PINTO LIMA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-258",
    "data_aquisicao": "2025-02-18",
    "nome_socio": "SCARLET COUTINHO MARTINS",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-259",
    "data_aquisicao": "2025-02-17",
    "nome_socio": "THIAGO LEITE DE MELO",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-260",
    "data_aquisicao": "2025-02-16",
    "nome_socio": "ANA CELMA FONSECA ARAUJO MENDES",
    "produto": "VILLAMOR PRATA 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-261",
    "data_aquisicao": "2025-02-14",
    "nome_socio": "S & S ADMINISTRADORA DE BENS LTDA",
    "produto": "VILLAMOR DIAMANTE 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-262",
    "data_aquisicao": "2025-02-05",
    "nome_socio": "MATHEUS ANTONIUS VELOSO CAMELO",
    "produto": "LUXO PREMIUM DIAMANTE 4º / 5º",
    "cota_ordem": 2,
    "total_cotas": 10,
    "voucher_codigo": null
  },
  {
    "id": "cota-263",
    "data_aquisicao": "2025-02-05",
    "nome_socio": "MATHEUS ANTONIUS VELOSO CAMELO",
    "produto": "LUXO DIAMANTE 1° / 2° / 3º",
    "cota_ordem": 3,
    "total_cotas": 10,
    "voucher_codigo": null
  },
  {
    "id": "cota-264",
    "data_aquisicao": "2025-02-05",
    "nome_socio": "MATHEUS ANTONIUS VELOSO CAMELO",
    "produto": "LUXO DIAMANTE T",
    "cota_ordem": 4,
    "total_cotas": 10,
    "voucher_codigo": null
  },
  {
    "id": "cota-265",
    "data_aquisicao": "2025-02-10",
    "nome_socio": "MEIBERTH NAZARET PALACIOS SOTO",
    "produto": "BANGALO LUXURY DIAMANTE",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-266",
    "data_aquisicao": "2025-02-09",
    "nome_socio": "LEANDRO CESAR SOCCOL",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-267",
    "data_aquisicao": "2025-02-09",
    "nome_socio": "SILVIA FERNANDES PINTO",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-268",
    "data_aquisicao": "2025-02-08",
    "nome_socio": "DJEANE DO SOCORRO SILVA DOS SANTOS",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-269",
    "data_aquisicao": "2025-02-08",
    "nome_socio": "DJEANE DO SOCORRO SILVA DOS SANTOS",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-270",
    "data_aquisicao": "2025-02-07",
    "nome_socio": "ANTONIO CEZAR SOUZA SALES",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-271",
    "data_aquisicao": "2025-01-18",
    "nome_socio": "ANTONIO CEZAR SOUZA SALES",
    "produto": "LUXO PRATA 4º / 5º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-272",
    "data_aquisicao": "2025-02-05",
    "nome_socio": "MATHEUS ANTONIUS VELOSO CAMELO",
    "produto": "BANGALO LUXURY DIAMANTE",
    "cota_ordem": 5,
    "total_cotas": 10,
    "voucher_codigo": null
  },
  {
    "id": "cota-273",
    "data_aquisicao": "2025-02-05",
    "nome_socio": "MATHEUS ANTONIUS VELOSO CAMELO",
    "produto": "VILLAMOR DIAMANTE 5º / 6º",
    "cota_ordem": 6,
    "total_cotas": 10,
    "voucher_codigo": null
  },
  {
    "id": "cota-274",
    "data_aquisicao": "2025-02-05",
    "nome_socio": "MATHEUS ANTONIUS VELOSO CAMELO",
    "produto": "VILLAMOR PREMIUM DIAMANTE 1°/ 2° / 3º / 4º",
    "cota_ordem": 7,
    "total_cotas": 10,
    "voucher_codigo": null
  },
  {
    "id": "cota-275",
    "data_aquisicao": "2025-02-05",
    "nome_socio": "MATHEUS ANTONIUS VELOSO CAMELO",
    "produto": "LUXO DIAMANTE 4º / 5º",
    "cota_ordem": 8,
    "total_cotas": 10,
    "voucher_codigo": null
  },
  {
    "id": "cota-276",
    "data_aquisicao": "2025-02-05",
    "nome_socio": "MATHEUS ANTONIUS VELOSO CAMELO",
    "produto": "LUXO DIAMANTE 1° / 2° / 3º",
    "cota_ordem": 9,
    "total_cotas": 10,
    "voucher_codigo": null
  },
  {
    "id": "cota-277",
    "data_aquisicao": "2025-02-05",
    "nome_socio": "MATHEUS ANTONIUS VELOSO CAMELO",
    "produto": "LUXO PREMIUM DIAMANTE T",
    "cota_ordem": 10,
    "total_cotas": 10,
    "voucher_codigo": null
  },
  {
    "id": "cota-278",
    "data_aquisicao": "2025-02-01",
    "nome_socio": "MAURO DAL ZOT DUTRA",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-279",
    "data_aquisicao": "2025-01-31",
    "nome_socio": "GLEICY KELLY MARQUES DE MENDONÇA MARINHO",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-280",
    "data_aquisicao": "2025-01-31",
    "nome_socio": "GLEICY KELLY MARQUES DE MENDONÇA MARINHO",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-281",
    "data_aquisicao": "2025-01-28",
    "nome_socio": "ANA PAULA LARA DE ANDRADE FERREIRA",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-282",
    "data_aquisicao": "2025-01-25",
    "nome_socio": "HENRIQUE ALVES DOS SANTOS",
    "produto": "VILLAMOR OURO 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-283",
    "data_aquisicao": "2025-01-24",
    "nome_socio": "UBIRATAN ARARIPE DE SOUZA COSTA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-284",
    "data_aquisicao": "2025-01-17",
    "nome_socio": "FRANCISCO CANINDE DANTAS",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-285",
    "data_aquisicao": "2025-01-16",
    "nome_socio": "NATALIA CAROLINE SILVA NERY",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-286",
    "data_aquisicao": "2025-01-15",
    "nome_socio": "NATALIA CAROLINE SILVA NERY",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-287",
    "data_aquisicao": "2025-01-15",
    "nome_socio": "ESTELA RIBAS FEREZIN",
    "produto": "LUXO PRATA T",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-288",
    "data_aquisicao": "2025-01-16",
    "nome_socio": "JAIME RODRIGO MARQUES DA SILVA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-289",
    "data_aquisicao": "2025-01-12",
    "nome_socio": "JANE GRACIELLE DE LIMA SILVA",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-290",
    "data_aquisicao": "2025-01-09",
    "nome_socio": "FABRICIO APARECIDO SOUZA SOARES",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-291",
    "data_aquisicao": "2025-01-09",
    "nome_socio": "FABRICIO APARECIDO SOUZA SOARES",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-292",
    "data_aquisicao": "2025-01-02",
    "nome_socio": "DOUGLAS ORTIZ",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-293",
    "data_aquisicao": "2024-12-30",
    "nome_socio": "AIRTON MATRICARDI",
    "produto": "VILLAMOR PRATA T",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-294",
    "data_aquisicao": "2024-12-13",
    "nome_socio": "HARLEY REGINALDO GOMES",
    "produto": "VILLAMOR PRATA 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-295",
    "data_aquisicao": "2024-12-12",
    "nome_socio": "VIVIANE CRISTINA MOSMAN",
    "produto": "VILLAMOR PRATA 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-296",
    "data_aquisicao": "2024-12-12",
    "nome_socio": "LUIZ ROBERTO DE FRANÇA",
    "produto": "LUXO DIAMANTE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-297",
    "data_aquisicao": "2024-12-12",
    "nome_socio": "ELAINE DURVAL SILVA DO NASCIMENTO",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-298",
    "data_aquisicao": "2024-12-05",
    "nome_socio": "TATIANA SPINA ABA MACHADO",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-299",
    "data_aquisicao": "2024-12-03",
    "nome_socio": "KELVENY JOSE VIRAES MACIEL",
    "produto": "VILLAMOR PRATA 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-300",
    "data_aquisicao": "2024-11-28",
    "nome_socio": "MARCO ANTONIO MARTINS SIQUEIRA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 13,
    "voucher_codigo": null
  },
  {
    "id": "cota-301",
    "data_aquisicao": "2024-11-28",
    "nome_socio": "MARCO ANTONIO MARTINS SIQUEIRA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 13,
    "voucher_codigo": null
  },
  {
    "id": "cota-302",
    "data_aquisicao": "2024-11-28",
    "nome_socio": "MARCO ANTONIO MARTINS SIQUEIRA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 3,
    "total_cotas": 13,
    "voucher_codigo": null
  },
  {
    "id": "cota-303",
    "data_aquisicao": "2024-11-28",
    "nome_socio": "MARCO ANTONIO MARTINS SIQUEIRA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 4,
    "total_cotas": 13,
    "voucher_codigo": null
  },
  {
    "id": "cota-304",
    "data_aquisicao": "2024-11-28",
    "nome_socio": "MARCO ANTONIO MARTINS SIQUEIRA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 5,
    "total_cotas": 13,
    "voucher_codigo": null
  },
  {
    "id": "cota-305",
    "data_aquisicao": "2024-11-28",
    "nome_socio": "MARCO ANTONIO MARTINS SIQUEIRA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 6,
    "total_cotas": 13,
    "voucher_codigo": null
  },
  {
    "id": "cota-306",
    "data_aquisicao": "2024-11-28",
    "nome_socio": "MARCO ANTONIO MARTINS SIQUEIRA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 7,
    "total_cotas": 13,
    "voucher_codigo": null
  },
  {
    "id": "cota-307",
    "data_aquisicao": "2024-11-28",
    "nome_socio": "MARCO ANTONIO MARTINS SIQUEIRA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 8,
    "total_cotas": 13,
    "voucher_codigo": null
  },
  {
    "id": "cota-308",
    "data_aquisicao": "2024-11-28",
    "nome_socio": "MARCO ANTONIO MARTINS SIQUEIRA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 9,
    "total_cotas": 13,
    "voucher_codigo": null
  },
  {
    "id": "cota-309",
    "data_aquisicao": "2024-11-28",
    "nome_socio": "MARCO ANTONIO MARTINS SIQUEIRA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 10,
    "total_cotas": 13,
    "voucher_codigo": null
  },
  {
    "id": "cota-310",
    "data_aquisicao": "2024-11-28",
    "nome_socio": "MARCO ANTONIO MARTINS SIQUEIRA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 11,
    "total_cotas": 13,
    "voucher_codigo": null
  },
  {
    "id": "cota-311",
    "data_aquisicao": "2024-11-28",
    "nome_socio": "MARCO ANTONIO MARTINS SIQUEIRA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 12,
    "total_cotas": 13,
    "voucher_codigo": null
  },
  {
    "id": "cota-312",
    "data_aquisicao": "2024-11-28",
    "nome_socio": "MARCO ANTONIO MARTINS SIQUEIRA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 13,
    "total_cotas": 13,
    "voucher_codigo": null
  },
  {
    "id": "cota-313",
    "data_aquisicao": "2024-11-25",
    "nome_socio": "NIVALDO ALBERTO DE MORAIS JUNIOR",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-314",
    "data_aquisicao": "2024-11-25",
    "nome_socio": "ALVARO TADEU PAES FIUZA FILHO",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-315",
    "data_aquisicao": "2024-11-24",
    "nome_socio": "ANTONIO ALEXANDRE PEREIRA JUNIOR",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-316",
    "data_aquisicao": "2024-11-22",
    "nome_socio": "LUIZ ANTONIO MOSSUN IABIKU FILHO",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-317",
    "data_aquisicao": "2024-11-21",
    "nome_socio": "GUSTAVO HERRMANN DE MASCARENHAS",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-318",
    "data_aquisicao": "2024-11-19",
    "nome_socio": "FRANCIMULLER FURTADO DO NASCIMENTO",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-319",
    "data_aquisicao": "2024-11-18",
    "nome_socio": "MARCIO CRISTIANO LIMA GOMES",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-320",
    "data_aquisicao": "2024-11-18",
    "nome_socio": "ALEX DE FIGUEIREDO PIMENTA",
    "produto": "VILLAMOR OURO 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-321",
    "data_aquisicao": "2024-11-16",
    "nome_socio": "WELLINGTON SANTOS DA SILVA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-322",
    "data_aquisicao": "2024-11-16",
    "nome_socio": "GABRIELA CORREIA WANDERLEY",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-323",
    "data_aquisicao": "2024-11-11",
    "nome_socio": "DANIELLA LELIA FERREIRA MENDES CASTRO",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-324",
    "data_aquisicao": "2024-11-05",
    "nome_socio": "SAULO RODRIGUES TORRES",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-325",
    "data_aquisicao": "2024-11-04",
    "nome_socio": "IVETE RICKEN DOMICIANO",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-326",
    "data_aquisicao": "2024-11-04",
    "nome_socio": "IVETE RICKEN DOMICIANO",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-327",
    "data_aquisicao": "2024-11-02",
    "nome_socio": "ROBERTO LUIS DOS SANTOS",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-328",
    "data_aquisicao": "2024-11-02",
    "nome_socio": "RENATO DE OLIVEIRA DIOGO",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-329",
    "data_aquisicao": "2024-11-02",
    "nome_socio": "LUCIANA LEAL LIMA DOS SANTOS",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-330",
    "data_aquisicao": "2024-11-02",
    "nome_socio": "KEVLEMN SOUSA GOUVEIA NOBREGA",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-331",
    "data_aquisicao": "2024-11-02",
    "nome_socio": "LUCIANA LEAL LIMA DOS SANTOS",
    "produto": "LUXO PRATA T",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-332",
    "data_aquisicao": "2024-11-02",
    "nome_socio": "MARIA ELISABETE MARCICO DA COSTA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-333",
    "data_aquisicao": "2024-11-02",
    "nome_socio": "LUIS ROBERTO FERRAZ FLORINDO",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-334",
    "data_aquisicao": "2024-11-02",
    "nome_socio": "SECUNDINO DOS SANTOS RAMIRES CORREIA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-335",
    "data_aquisicao": "2024-11-02",
    "nome_socio": "ROBERTO LUIS DOS SANTOS",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-336",
    "data_aquisicao": "2024-10-30",
    "nome_socio": "LUIZ PAULO DE MELLO GOMES DA COSTA",
    "produto": "VILLAMOR PRATA 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-337",
    "data_aquisicao": "2024-10-28",
    "nome_socio": "BARBARA NOLASCO DE OLIVEIRA",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-338",
    "data_aquisicao": "2024-10-28",
    "nome_socio": "ADELVAN MENESES COSTA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-339",
    "data_aquisicao": "2024-10-28",
    "nome_socio": "FABIO BUNZEN ROMÃO",
    "produto": "VILLAMOR OURO 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-340",
    "data_aquisicao": "2024-10-28",
    "nome_socio": "MARIA ELISABETE MARCICO DA COSTA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-341",
    "data_aquisicao": "2024-10-24",
    "nome_socio": "FRANCIANA PEQUENO DA SILVA",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-342",
    "data_aquisicao": "2024-10-24",
    "nome_socio": "CRISTIANE DAMACENO DE SOUZA VOLPINI",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-343",
    "data_aquisicao": "2024-10-23",
    "nome_socio": "ANA PAULA PEDROSO VENANCIO DA SILVA",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-344",
    "data_aquisicao": "2024-10-22",
    "nome_socio": "ALESSANDRO CARRER GONDIM",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-345",
    "data_aquisicao": "2024-10-19",
    "nome_socio": "MARIO AUGUSTO PACHECO",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-346",
    "data_aquisicao": "2024-10-09",
    "nome_socio": "MANOEL CAETANO DE MOURA NETO",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-347",
    "data_aquisicao": "2024-10-02",
    "nome_socio": "PRISCILA APARECIDA CORRÊA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-348",
    "data_aquisicao": "2024-10-02",
    "nome_socio": "PRISCILA APARECIDA CORRÊA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-349",
    "data_aquisicao": "2024-10-04",
    "nome_socio": "LUIS ROBERTO FERRAZ FLORINDO",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-350",
    "data_aquisicao": "2024-10-04",
    "nome_socio": "HADANN MOURA PIRES",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-351",
    "data_aquisicao": "2024-10-03",
    "nome_socio": "CARLOS AMERICO GONÇALVES LEINIG",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-352",
    "data_aquisicao": "2024-09-27",
    "nome_socio": "RONALDO FERNANDES",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-353",
    "data_aquisicao": "2024-09-25",
    "nome_socio": "BRUNO DE ARAUJO GOMES",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-354",
    "data_aquisicao": "2024-09-25",
    "nome_socio": "JOSE MARIA ALVES DE SA",
    "produto": "VILLAMOR PRATA 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-355",
    "data_aquisicao": "2024-09-21",
    "nome_socio": "BRUNA CAROLINE FERNANDES ANDRIA",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-356",
    "data_aquisicao": "2024-09-20",
    "nome_socio": "JOEL PINHEIRO BEZERRA",
    "produto": "VILLAMOR PRATA T",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-357",
    "data_aquisicao": "2024-09-19",
    "nome_socio": "MIGUEL HENRIQUE DOS SANTOS",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-358",
    "data_aquisicao": "2024-09-18",
    "nome_socio": "LARISSA LUCENA VASCONCELOS",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-359",
    "data_aquisicao": "2024-09-17",
    "nome_socio": "IRIS GABRIELLE DE LIMA LIRA",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-360",
    "data_aquisicao": "2024-09-17",
    "nome_socio": "MARIA CARMEM GATIS DAMORIM",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-361",
    "data_aquisicao": "2024-09-14",
    "nome_socio": "ANDRESSA CRISTINA PESSOA DE OLIVEIRA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-362",
    "data_aquisicao": "2024-09-12",
    "nome_socio": "ANDRE RODRIGUES CORREA",
    "produto": "LUXO PRATA T",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-363",
    "data_aquisicao": "2024-09-06",
    "nome_socio": "ALEXANDER ANDRE DE SOUZA VIEIRA",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-364",
    "data_aquisicao": "2024-09-06",
    "nome_socio": "ALEXANDER ANDRE DE SOUZA VIEIRA",
    "produto": "VILLAMOR PRATA T",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-365",
    "data_aquisicao": "2024-09-05",
    "nome_socio": "VALERIA GOMES DA SILVA",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-366",
    "data_aquisicao": "2024-09-05",
    "nome_socio": "ARTHUR CESAR TAVARES CAVALCANTI ALBUQUERQUE",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-367",
    "data_aquisicao": "2024-09-01",
    "nome_socio": "LUCILENE LUIZA DOS SANTOS LIMA",
    "produto": "LUXO PRATA T",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-368",
    "data_aquisicao": "2024-08-30",
    "nome_socio": "HARLEY MENEZES MORAES",
    "produto": "LUXO OURO T",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-369",
    "data_aquisicao": "2024-08-30",
    "nome_socio": "SILVIO GABRIEL FREIRE",
    "produto": "VILLAMOR PRATA T",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-370",
    "data_aquisicao": "2024-08-28",
    "nome_socio": "CINTIA VANESSA SOARES MONTEIRO",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-371",
    "data_aquisicao": "2024-08-28",
    "nome_socio": "ALEX LEONARDO DE OLIVEIRA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-372",
    "data_aquisicao": "2024-08-23",
    "nome_socio": "BRUNA FERREIRA VICENTE DA SILVA",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-373",
    "data_aquisicao": "2024-04-10",
    "nome_socio": "REYNALDO FABBRI",
    "produto": "LUXO DIAMANTE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-374",
    "data_aquisicao": "2024-08-17",
    "nome_socio": "LUCIANA DE ARAUJO SILVA",
    "produto": "LUXO PRATA T",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-375",
    "data_aquisicao": "2024-08-06",
    "nome_socio": "FABIO MARQUES ANDRADE BARBOSA",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-376",
    "data_aquisicao": "2024-08-02",
    "nome_socio": "PAULA REGINA COUTINHO DE BORBA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-377",
    "data_aquisicao": "2024-07-30",
    "nome_socio": "DIANA SOUTO SILVA",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-378",
    "data_aquisicao": "2024-07-29",
    "nome_socio": "CAMELOHAESBAERT GESTAO PATRIMONIAL LTDA",
    "produto": "LUXO OURO T",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-379",
    "data_aquisicao": "2024-07-29",
    "nome_socio": "CAMELOHAESBAERT GESTAO PATRIMONIAL LTDA",
    "produto": "VILLAMOR OURO T",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-380",
    "data_aquisicao": "2024-07-29",
    "nome_socio": "RICARDO AUGUSTO BEZERRA DE ALMEIDA",
    "produto": "VILLAMOR PRATA T",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-381",
    "data_aquisicao": "2024-07-26",
    "nome_socio": "GABRIEL CHAVES OLIVEIRA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-382",
    "data_aquisicao": "2024-07-24",
    "nome_socio": "JOSE OSCAR FERREIRA GOMES",
    "produto": "LUXO PRATA T",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-383",
    "data_aquisicao": "2024-07-24",
    "nome_socio": "JULIO CEZAR ARAUJO DA SILVA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-384",
    "data_aquisicao": "2024-07-20",
    "nome_socio": "JUDSON ELDER DOS SANTOS",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-385",
    "data_aquisicao": "2024-07-13",
    "nome_socio": "JOSE ADINAN ORTOLAN",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-386",
    "data_aquisicao": "2024-07-13",
    "nome_socio": "LUCIANO CARNEIRO DE CAMPOS COSTA",
    "produto": "LUXO PRATA T",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-387",
    "data_aquisicao": "2024-07-13",
    "nome_socio": "CREMILDA RIBEIRO DOS SANTOS",
    "produto": "LUXO DIAMANTE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-388",
    "data_aquisicao": "2024-07-12",
    "nome_socio": "HERICA TROCADO VALENTE",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-389",
    "data_aquisicao": "2024-07-19",
    "nome_socio": "NUSBAUM E SAMARTIN EMPREENDIMENTO LTDA",
    "produto": "LUXO DIAMANTE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-390",
    "data_aquisicao": "2024-07-09",
    "nome_socio": "GRACE KELLY DANTAS DO SANTOS VON KAVLIN",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-391",
    "data_aquisicao": "2024-07-05",
    "nome_socio": "FABIANO ANDERSON DE PAULA",
    "produto": "VILLAMOR DIAMANTE 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-392",
    "data_aquisicao": "2024-07-02",
    "nome_socio": "BRUNO BARBOSA BERNARDO DA SILVA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-393",
    "data_aquisicao": "2024-06-30",
    "nome_socio": "ALESSANDRO RODRIGUES REIS",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-394",
    "data_aquisicao": "2024-06-30",
    "nome_socio": "ERICK DE JESUS ANDRADE",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-395",
    "data_aquisicao": "2024-06-30",
    "nome_socio": "WESCLY SANTANA LIMA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-396",
    "data_aquisicao": "2024-06-27",
    "nome_socio": "LESSANDRO RODRIGUES RECHE DOS SANTOS",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-397",
    "data_aquisicao": "2024-06-26",
    "nome_socio": "LUCIANO ALASMAR",
    "produto": "LUXO DIAMANTE T",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-398",
    "data_aquisicao": "2024-06-26",
    "nome_socio": "RODRIGO CORREIA DE LIMA NADIA",
    "produto": "VILLAMOR PRATA T",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-399",
    "data_aquisicao": "2024-06-26",
    "nome_socio": "RODRIGO CORREIA DE LIMA NADIA",
    "produto": "VILLAMOR PRATA T",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-400",
    "data_aquisicao": "2024-06-26",
    "nome_socio": "RICARDO LOPES DANIEL",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-401",
    "data_aquisicao": "2024-06-26",
    "nome_socio": "JUAN HERIBERTO KEMPEN",
    "produto": "VILLAMOR PRATA 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-402",
    "data_aquisicao": "2024-06-26",
    "nome_socio": "JOSE DOMICIO DA SILVA",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-403",
    "data_aquisicao": "2024-06-24",
    "nome_socio": "JULIO CESAR FONSECA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-404",
    "data_aquisicao": "2024-06-26",
    "nome_socio": "DILSON KOSSOSKI",
    "produto": "LUXO PRATA T",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-405",
    "data_aquisicao": "2024-06-26",
    "nome_socio": "DILSON KOSSOSKI",
    "produto": "LUXO PRATA T",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-406",
    "data_aquisicao": "2024-06-28",
    "nome_socio": "DANIEL MARIO DOS SANTOS",
    "produto": "VILLAMOR PRATA 1°/ 2° / 3º / 4º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-407",
    "data_aquisicao": "2024-06-28",
    "nome_socio": "ANDREA ALBERNAZ DOS SANTOS",
    "produto": "VILLAMOR PRATA T",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-408",
    "data_aquisicao": "2024-06-26",
    "nome_socio": "DANILO DOS SANTOS CABRAL",
    "produto": "LUXO BRONZE 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-409",
    "data_aquisicao": "2024-06-27",
    "nome_socio": "ALEXSANDRO QUEIROZ DE OLIVEIRA",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-410",
    "data_aquisicao": "2024-06-17",
    "nome_socio": "DIANA CLEILA DE OLIVEIRA CAMPOS",
    "produto": "LUXO OURO T",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-411",
    "data_aquisicao": "2024-06-15",
    "nome_socio": "SELMO HENRIQUE DE ARAUJO",
    "produto": "VILLAMOR PRATA T",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-412",
    "data_aquisicao": "2024-06-28",
    "nome_socio": "GERALDO QUEIROZ TOSCANO DE MELO JUNIOR",
    "produto": "LUXO PRATA T",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-413",
    "data_aquisicao": "2024-06-03",
    "nome_socio": "SILVIO ATTILA LYRA ACCIOLY",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-414",
    "data_aquisicao": "2024-06-03",
    "nome_socio": "REJANE LACORTE ANTONIAZZI MERCATELLI",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-415",
    "data_aquisicao": "2024-06-03",
    "nome_socio": "REJANE LACORTE ANTONIAZZI MERCATELLI",
    "produto": "LUXO PRATA 1° / 2° / 3º",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-416",
    "data_aquisicao": "2024-06-03",
    "nome_socio": "ALDO VIRGINIO DONATO",
    "produto": "LUXO OURO 1° / 2° / 3º",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-417",
    "data_aquisicao": "2024-06-03",
    "nome_socio": "NAIR LUCINDA LUCENA DONATO",
    "produto": "VILLAMOR OURO T",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-418",
    "data_aquisicao": "2024-06-03",
    "nome_socio": "FABIO PEREIRA DA SILVA",
    "produto": "LUXO BRONZE T",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-419",
    "data_aquisicao": "2024-06-04",
    "nome_socio": "SILVIO HENRIQUE BARBOSA PEIXINHO",
    "produto": "LUXO PRATA T",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-420",
    "data_aquisicao": "2024-05-22",
    "nome_socio": "LUCIANO CARNEIRO DE CAMPOS COSTA",
    "produto": "LUXO PRATA T",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-421",
    "data_aquisicao": "2024-02-16",
    "nome_socio": "TEREZA APARECIDA OLIVEIRA MARTINS",
    "produto": "Luxo Prata 1/2/3",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-422",
    "data_aquisicao": "2024-02-16",
    "nome_socio": "SILMARA GONÇALVES XAVIER",
    "produto": "Luxo Prata 1/2/3",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-423",
    "data_aquisicao": "2024-02-13",
    "nome_socio": "AROLDO JOSE DE LIMA",
    "produto": "Villamor Prata T/3",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-424",
    "data_aquisicao": "2024-01-11",
    "nome_socio": "CATARINA DE SOUZA VASCONCELOS",
    "produto": "Villamor Prata 1°/2°",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-425",
    "data_aquisicao": "2024-01-01",
    "nome_socio": "CHRISTINE JEAN-MAIRET",
    "produto": "Luxo Prata 1/2/3",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-426",
    "data_aquisicao": "2024-01-01",
    "nome_socio": "CHRISTINE JEAN-MAIRET",
    "produto": "Luxo Prata 1/2/3",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-427",
    "data_aquisicao": "2023-10-18",
    "nome_socio": "REYNALDO FABBRI",
    "produto": "Villamor Premium Diamante 3°",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-428",
    "data_aquisicao": "2023-08-31",
    "nome_socio": "JUSSARA CORTINAZ DE SOUZA",
    "produto": "Luxo Prata T/4/5/6",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-429",
    "data_aquisicao": "2023-07-20",
    "nome_socio": "GOODWILL IMOVEIS E PARTICIPACOES LTDA",
    "produto": "Luxo Prata 1/2/3",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-430",
    "data_aquisicao": "2023-05-12",
    "nome_socio": "JANAINA SOUZA DOS SANTOS",
    "produto": "Luxo Prata T/4/5/6",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-431",
    "data_aquisicao": "2023-03-17",
    "nome_socio": "MURILLO AMORIM DA SILVA",
    "produto": "Luxo Prata 1/2/3",
    "cota_ordem": 1,
    "total_cotas": 1,
    "voucher_codigo": null
  },
  {
    "id": "cota-432",
    "data_aquisicao": "2023-03-03",
    "nome_socio": "BERTILO SCHLICKMANN",
    "produto": "Villamor Prata T/3",
    "cota_ordem": 1,
    "total_cotas": 2,
    "voucher_codigo": null
  },
  {
    "id": "cota-433",
    "data_aquisicao": "2023-03-03",
    "nome_socio": "BERTILO SCHLICKMANN",
    "produto": "Villamor Prata T/3",
    "cota_ordem": 2,
    "total_cotas": 2,
    "voucher_codigo": null
  }
];
