/**
 * Conteúdo dos modais da secção Problemas — estrutura estável para cards + diálogo.
 * Todos os pontos informativos originais são preservados; organização em secções.
 */

export type ProblemModalSection = {
  title: string;
  items: string[];
};

export type ProblemIconKey = 'water' | 'soil' | 'air' | 'health';

export type ProblemModalContent = {
  id: string;
  icon: ProblemIconKey;
  title: string;
  summary: string;
  /** Frase de entrada (contexto), sem substituir o detalhe técnico */
  contextIntro: string;
  sections: ProblemModalSection[];
};

export const PROBLEM_MODALS: ProblemModalContent[] = [
  {
    id: 'agua',
    icon: 'water',
    title: 'Contaminação da água',
    summary:
      'A manipueira descartada em rios e açudes pode comprometer a qualidade da água e afetar a vida aquática.',
    contextIntro:
      'A manipueira, quando lançada em rios e açudes sem tratamento adequado, pode gerar impactos significativos na qualidade da água e nos ecossistemas aquáticos.',
    sections: [
      {
        title: 'Impactos físicos e químicos na água',
        items: [
          'Aumentar a DQO (demanda química de oxigênio)',
          'Reduzir o oxigênio dissolvido na água',
          'Gerar impacto poluidor comparável ao de grandes cargas de esgoto urbano',
        ],
      },
      {
        title: 'Impactos biológicos e no ecossistema',
        items: [
          'Causar morte de peixes e organismos aquáticos',
          'Provocar eutrofização, com proliferação descontrolada de algas e cianobactérias',
        ],
      },
    ],
  },
  {
    id: 'solo',
    icon: 'soil',
    title: 'Contaminação do solo',
    summary:
      'Quando descartada sem controle, a manipueira pode degradar o solo e comprometer sua fertilidade natural.',
    contextIntro:
      'A manipueira, quando descartada sem controle no solo, pode alterar a química e a biologia do terreno e comprometer o uso agrícola.',
    sections: [
      {
        title: 'Microbiota e fertilidade',
        items: [
          'Alteração da microbiota do solo',
          'Redução da fertilidade natural',
        ],
      },
      {
        title: 'Plantas e áreas degradadas',
        items: [
          'Toxicidade para plantas, especialmente devido ao cianeto',
          'Formação de áreas improdutivas e degradadas',
        ],
      },
    ],
  },
  {
    id: 'ar',
    icon: 'air',
    title: 'Qualidade do ar',
    summary:
      'Durante a decomposição, a manipueira pode liberar gases tóxicos, provocar odores fortes e reduzir a qualidade do ar.',
    contextIntro:
      'Na decomposição da manipueira, a liberação de gases e compostos voláteis pode afetar a qualidade do ar e o conforto nas proximidades das unidades de processamento.',
    sections: [
      {
        title: 'Gases, odores e emissões',
        items: [
          'Liberação de gases tóxicos, principalmente ácido cianídrico (HCN)',
          'Emissão de odores fortes e desagradáveis',
          'Formação de gases como amônia (NH₃), metano (CH₄) e gás sulfídrico (H₂S)',
          'Contribuição para o efeito estufa devido à emissão de metano',
        ],
      },
      {
        title: 'Ambiente local e comunidades',
        items: [
          'Redução da qualidade do ar em áreas próximas às casas de farinha',
          'Desconforto ambiental e perda de qualidade de vida nas comunidades rurais',
        ],
      },
    ],
  },
  {
    id: 'saude',
    icon: 'health',
    title: 'Saúde pública',
    summary:
      'O descarte inadequado da manipueira também pode gerar riscos à saúde humana e animal.',
    contextIntro:
      'O descarte inadequado da manipueira pode expor pessoas, animais e comunidades a riscos sanitários e ambientais acoplados.',
    sections: [
      {
        title: 'Exposição e sintomas',
        items: [
          'Risco de intoxicação por cianeto (HCN)',
          'Sintomas como tontura, náuseas e dificuldade respiratória',
          'Problemas respiratórios causados pela inalação de gases tóxicos',
          'Irritação nos olhos, pele e vias respiratórias',
        ],
      },
      {
        title: 'Água, vetores e transmissão',
        items: [
          'Contaminação de fontes de água, favorecendo doenças de veiculação hídrica',
          'Proliferação de insetos e vetores, como moscas e mosquitos',
        ],
      },
      {
        title: 'Animais e qualidade de vida',
        items: [
          'Risco para animais domésticos e de produção, incluindo intoxicação e morte',
          'Impactos indiretos na qualidade de vida e nas condições sanitárias de comunidades rurais',
        ],
      },
    ],
  },
];
