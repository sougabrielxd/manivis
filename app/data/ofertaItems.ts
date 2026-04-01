/**
 * Dados dos cards da seção "O que oferecemos".
 * Discriminated union: hasModal determina se o card abre modal.
 * Cards com hasModal:false são autoexplicativos — sem conteúdo extra.
 */

export type OfertaIconKey = 'recycle' | 'zap' | 'leaf' | 'bug' | 'clipboard';

export type OfertaModalSection = {
  title: string;
  items: string[];
};

type OfertaBase = {
  id: string;
  icon: OfertaIconKey;
  label: string;
};

export type OfertaSimple = OfertaBase & { hasModal: false };

export type OfertaWithModal = OfertaBase & {
  hasModal: true;
  modal: {
    title: string;
    description: string;
    sections?: OfertaModalSection[];
  };
};

export type OfertaItem = OfertaSimple | OfertaWithModal;

export const OFERTA_ITEMS: OfertaItem[] = [
  {
    id: 'gestao',
    icon: 'recycle',
    label: 'Gestão, tratamento e reaproveitamento da manipueira',
    hasModal: true,
    modal: {
      title: 'Gestão e reaproveitamento da manipueira',
      description:
        'Processo completo de gestão da manipueira — do diagnóstico à implementação de soluções de tratamento e reaproveitamento, adaptadas ao porte de cada unidade produtiva.',
      sections: [
        {
          title: 'Diagnóstico e planejamento',
          items: [
            'Análise das características da manipueira gerada na unidade',
            'Mapeamento do volume e frequência de descarte',
            'Levantamento de conformidade com a legislação ambiental',
          ],
        },
        {
          title: 'Soluções de tratamento',
          items: [
            'Sistemas adaptados ao porte da unidade produtiva',
            'Redução da carga poluidora antes do descarte ou reaproveitamento',
            'Implantação de biodigestores e lagoas de estabilização',
          ],
        },
        {
          title: 'Reaproveitamento',
          items: [
            'Conversão da manipueira em biofertilizante e bioinseticida',
            'Geração de energia a partir do biogás produzido',
            'Redução de custos operacionais e impacto ambiental',
          ],
        },
      ],
    },
  },
  {
    id: 'biogas',
    icon: 'zap',
    label: 'Geração de energia por meio de biogás',
    hasModal: true,
    modal: {
      title: 'Geração de energia por biogás',
      description:
        'A manipueira possui alto potencial energético. Por meio da biodigestão anaeróbica, é possível gerar biogás para uso na própria unidade produtiva ou na comunidade local.',
      sections: [
        {
          title: 'Como funciona',
          items: [
            'A manipueira é inserida em biodigestores que promovem decomposição anaeróbica',
            'O processo gera biogás (principalmente metano) utilizável como combustível',
            'O digestato produzido pode ser reaproveitado como biofertilizante líquido',
          ],
        },
        {
          title: 'Benefícios',
          items: [
            'Redução do custo energético da unidade produtiva',
            'Aproveitamento de um resíduo antes descartado como poluente',
            'Contribuição para a redução das emissões de metano na atmosfera',
          ],
        },
      ],
    },
  },
  {
    id: 'biofertilizante',
    icon: 'leaf',
    label: 'Biofertilizantes',
    hasModal: false,
  },
  {
    id: 'bioinseticida',
    icon: 'bug',
    label: 'Bioinseticidas',
    hasModal: false,
  },
  {
    id: 'consultoria',
    icon: 'clipboard',
    label: 'Consultoria e acompanhamento técnico para melhor desempenho da lavoura de mandioca',
    hasModal: true,
    modal: {
      title: 'Consultoria e acompanhamento técnico',
      description:
        'Consultoria especializada para casas de farinha, cooperativas e produtores rurais que buscam melhorar o desempenho produtivo e a conformidade ambiental de suas operações.',
      sections: [
        {
          title: 'Áreas de atuação',
          items: [
            'Diagnóstico técnico e ambiental da unidade produtiva',
            'Orientação sobre legislação ambiental aplicável à manipueira',
            'Planejamento de adequação para regularização junto aos órgãos competentes',
          ],
        },
        {
          title: 'Acompanhamento contínuo',
          items: [
            'Monitoramento dos resultados ao longo da implantação',
            'Suporte técnico para ajustes e melhorias contínuas',
            'Capacitação da equipe local para operação sustentável',
          ],
        },
      ],
    },
  },
];
