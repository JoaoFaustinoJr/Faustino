/* v30 — reflexões ampliadas, fontes e protagonismo das orações próprias */
(() => {
  const HILDEGARDA_LETTER = "https://www.vatican.va/content/benedict-xvi/pt/apost_letters/documents/hf_ben-xvi_apl_20121007_ildegarda-bingen.html";
  const HILDEGARDA_AUDIENCE = "https://www.vatican.va/content/benedict-xvi/pt/audiences/2010/documents/hf_ben-xvi_aud_20100908.html";
  const CATECHISM_PROVIDENCE = "https://www.vatican.va/archive/cathechism_po/index_new/p1s2c1_198-421_po.html";
  const CATECHISM_HEALING = "https://www.vatican.va/archive/cathechism_po/index_new/p2s2cap1_1420-1532_po.html";
  const SALVIFICI_DOLORIS = "https://www.vatican.va/content/john-paul-ii/pt/apost_letters/1984/documents/hf_jp-ii_apl_11021984_salvifici-doloris.html";
  const LAUDATO_SI = "https://www.vatican.va/content/francesco/pt/encyclicals/documents/papa-francesco_20150524_enciclica-laudato-si.html";

  const expandedPT = [
    {
      text: "A sabedoria cristã não é apenas acumular conhecimentos, mas aprender a olhar a vida a partir de Deus. A Palavra ilumina nossas escolhas e nos ensina a reconhecer o que conduz à verdade, à caridade e ao bem. Ao proclamar Santa Hildegarda Doutora da Igreja, Bento XVI destacou nela uma admirável harmonia entre doutrina e vida cotidiana, alimentada por raízes bíblicas, litúrgicas e patrísticas e pela tradição beneditina. Sua inteligência não a afastava da humildade; ao contrário, quanto mais contemplava a grandeza da criação e os mistérios da fé, mais reconhecia que toda verdadeira sabedoria tem sua origem em Deus. Neste primeiro dia, peçamos não simplesmente respostas rápidas, mas um coração capaz de discernir. Que nossas decisões, palavras, projetos e relações sejam examinados à luz do Evangelho. A sabedoria que vem do alto não nos torna superiores aos outros: torna-nos mais disponíveis para escutar, servir e escolher aquilo que aproxima de Cristo.",
      keep: "A verdadeira sabedoria nos ensina a escolher com Deus, e não apenas a escolher depressa.",
      sources: [["Bento XVI · Carta Apostólica sobre Santa Hildegarda (2012)", HILDEGARDA_LETTER]]
    },
    {
      text: "A luz de Deus não elimina todas as dificuldades do caminho, mas impede que caminhemos sem direção. O salmista chama a Palavra de lâmpada para os pés porque ela ilumina o passo possível de hoje, mesmo quando ainda não enxergamos toda a estrada. Santa Hildegarda viveu profundamente essa atitude de discernimento. Bento XVI recordou que suas experiências espirituais não foram tratadas como autoridade isolada: ela buscou o discernimento da Igreja e permaneceu vinculada à fé recebida. Isso nos oferece um critério muito atual. Nem toda impressão interior é necessariamente vontade de Deus; por isso, o cristão confronta seus desejos com o Evangelho, com a oração, com a consciência bem formada e com a comunhão eclesial. Peçamos a graça de reconhecer as sombras que confundem nossa vida — medo, orgulho, ressentimento, precipitação — e de permitir que a luz de Cristo alcance justamente esses lugares. Discernir é aprender a preferir a verdade mesmo quando ela exige conversão.",
      keep: "A luz de Cristo não serve apenas para consolar; serve também para mostrar o caminho da conversão.",
      sources: [["Bento XVI · Audiência Geral sobre Santa Hildegarda (8 set. 2010)", HILDEGARDA_AUDIENCE]]
    },
    {
      text: "Confiar na Providência não significa acreditar que tudo acontecerá como desejamos, nem permanecer passivos diante das responsabilidades. O Catecismo ensina que a criação caminha para a sua perfeição sob a ação providente de Deus e que Ele conduz a história sem destruir a liberdade humana. Por isso, a confiança cristã é ativa: rezamos, discernimos, trabalhamos e, ao mesmo tempo, reconhecemos que nem tudo está sob nosso controle. Santa Hildegarda buscou a vontade de Deus em meio a decisões exigentes, mudanças, enfermidades e responsabilidades comunitárias. Sua vida recorda que fé e coragem podem caminhar juntas. Hoje, entreguemos ao Senhor aquilo que nos inquieta: uma situação familiar, uma enfermidade, uma decisão, uma espera ou algo que ainda não sabemos resolver. Entregar não é abandonar o dever; é deixar de carregar sozinho aquilo que pertence também à Providência. A oração torna-se então um ato de liberdade: fazemos o bem que nos cabe e confiamos a Deus aquilo que ultrapassa nossas forças.",
      keep: "Confiar é fazer com fidelidade a nossa parte e deixar nas mãos de Deus aquilo que não podemos dominar.",
      sources: [["Catecismo da Igreja Católica · Providência divina, nn. 302–314", CATECHISM_PROVIDENCE], ["Bento XVI · Carta Apostólica sobre Santa Hildegarda", HILDEGARDA_LETTER]]
    },
    {
      text: "A fé cristã olha para a pessoa inteira. O corpo não é um simples invólucro da alma, e a enfermidade não pode ser reduzida a falta de fé. O Catecismo recorda que Jesus acolheu os doentes com compaixão e que suas curas apontavam para uma salvação ainda mais profunda, sem desprezar o cuidado concreto da pessoa. Santa Hildegarda observou a natureza, a alimentação, o corpo e a saúde com os conhecimentos disponíveis em seu tempo, mas sua visão religiosa permanecia orientada para Deus, Criador e fonte da vida. Por isso, sua espiritualidade pode inspirar cuidado, equilíbrio e gratidão, mas não deve ser usada para substituir medicina, diagnóstico ou tratamento. Hoje rezamos por cura com liberdade filial: pedimos a saúde do corpo, a serenidade da mente, a reconciliação interior e a força para atravessar aquilo que não pode ser imediatamente mudado. Que toda busca de cura nos aproxime também da caridade, da prudência e da esperança em Cristo.",
      keep: "Pedir cura é confiar a pessoa inteira a Deus e, ao mesmo tempo, acolher com responsabilidade os meios legítimos de cuidado.",
      sources: [["Catecismo da Igreja Católica · Cristo médico, nn. 1500–1505", CATECHISM_HEALING], ["Bento XVI · Carta Apostólica sobre Santa Hildegarda", HILDEGARDA_LETTER]]
    },
    {
      text: "O sofrimento não é bom em si mesmo e não precisa ser romantizado para adquirir sentido cristão. São João Paulo II, na Salvifici Doloris, parte justamente da seriedade da dor humana e mostra que, em Cristo, Deus não permanece distante de quem sofre. Jesus entra no sofrimento, assume a fragilidade humana e abre nela uma possibilidade de comunhão, amor e esperança. Santa Hildegarda conheceu limitações físicas e provações, mas continuou a buscar a vontade de Deus e a servir. Isso não significa que toda dor seja enviada por Deus como lição, mas que nenhuma dor precisa tornar-se um lugar sem Deus. Neste dia, apresentemos ao Senhor nossas cruzes e também as cruzes daqueles que amamos. Peçamos fortaleza para procurar ajuda quando necessário, paciência para os processos que levam tempo e sensibilidade para não abandonar quem sofre. A força cristã não consiste em fingir que não dói; consiste em não permitir que a dor tenha a última palavra.",
      keep: "Em Cristo, a dor não deixa de ser dor, mas pode deixar de ser solidão.",
      sources: [["São João Paulo II · Salvifici Doloris", SALVIFICI_DOLORIS], ["Bento XVI · Carta Apostólica sobre Santa Hildegarda", HILDEGARDA_LETTER]]
    },
    {
      text: "A criação é dom antes de ser recurso. A Escritura contempla o mundo como obra da sabedoria de Deus, e Santa Hildegarda desenvolveu uma espiritualidade profundamente atenta à vitalidade da criação. Bento XVI recordou que sua reflexão une o ser humano, a natureza e a história da salvação sem confundir criatura e Criador. Séculos depois, a Laudato si’ voltou a insistir que o cuidado da casa comum nasce de uma visão espiritual: receber o mundo como dom desperta gratidão, responsabilidade e sobriedade. Contemplar uma árvore, a água, os animais, o alimento e o próprio corpo pode tornar-se oração quando reconhecemos que nada disso tem em nós sua origem última. Mas contemplação verdadeira também gera compromisso. O desperdício, a indiferença e o uso egoísta da criação contradizem a gratidão que professamos. Hoje, peçamos um olhar capaz de admirar sem possuir, usar sem destruir e agradecer sem esquecer que os bens da criação são destinados ao bem de todos.",
      keep: "Quem recebe a criação como dom aprende a contemplá-la, agradecê-la e protegê-la.",
      sources: [["Bento XVI · Carta Apostólica sobre Santa Hildegarda", HILDEGARDA_LETTER], ["Papa Francisco · Laudato si’", LAUDATO_SI]]
    },
    {
      text: "Amar a Igreja não significa ignorar suas feridas. Santa Hildegarda viveu profundamente a comunhão eclesial e, justamente por amar a Igreja, dirigiu palavras firmes a pessoas e comunidades quando percebia necessidade de conversão. Bento XVI apresenta essa dimensão de sua missão sem separá-la de sua fidelidade. Esse equilíbrio é precioso: a verdadeira reforma cristã não nasce do desprezo, mas da santidade, da verdade e da conversão do coração. Jesus é a videira; nós somos os ramos. Permanecer nele significa receber a fé como comunhão, participar dos sacramentos, escutar a Palavra e transformar a pertença eclesial em serviço. Hoje podemos pedir perdão pelas vezes em que reduzimos a Igreja apenas a seus problemas ou, no extremo oposto, usamos a fidelidade como desculpa para não reconhecer aquilo que precisa ser purificado. Que Santa Hildegarda interceda por uma Igreja mais santa começando por nós: mais verdadeira em nossas palavras, mais humilde em nossas atitudes e mais generosa na caridade.",
      keep: "A reforma da Igreja começa quando permitimos que Cristo reforme o nosso próprio coração.",
      sources: [["Bento XVI · Carta Apostólica sobre Santa Hildegarda", HILDEGARDA_LETTER], ["Bento XVI · Audiência Geral sobre Santa Hildegarda", HILDEGARDA_AUDIENCE]]
    },
    {
      text: "A humildade cristã não é diminuir os dons que Deus nos concedeu; é reconhecer de onde eles vêm e para que foram dados. Bento XVI destacou em Santa Hildegarda a prática da obediência, da simplicidade, da caridade e da hospitalidade, virtudes amadurecidas na tradição de São Bento. Ela possuía inteligência, autoridade e criatividade extraordinárias, mas compreendia sua missão como serviço. O Evangelho inverte nossas medidas habituais de grandeza: quem deseja ser o primeiro é chamado a tornar-se servo. Isso vale para a família, a comunidade, o trabalho e a Igreja. Podemos possuir talentos e ainda assim usá-los para buscar apenas reconhecimento; ou podemos oferecê-los para que alguém seja amparado, ensinado, consolado ou conduzido para mais perto de Deus. Neste oitavo dia, perguntemos não apenas quais são nossos dons, mas a quem eles estão servindo. Que a intercessão de Santa Hildegarda nos ensine uma humildade fecunda, capaz de unir competência e mansidão, firmeza e caridade.",
      keep: "O dom torna-se plenamente cristão quando deixa de ser vitrine e se transforma em serviço.",
      sources: [["Bento XVI · Carta Apostólica sobre Santa Hildegarda (raízes beneditinas e virtudes)", HILDEGARDA_LETTER]]
    },
    {
      text: "A novena termina, mas a vida espiritual continua. Depois de nove dias de oração, a entrega a Deus não deve ser entendida como fuga das responsabilidades, e sim como disposição renovada para viver segundo sua vontade. Santa Hildegarda procurou unir contemplação e ação, conhecimento e serviço, oração e responsabilidade pela Igreja. Bento XVI reconheceu nela uma extraordinária harmonia entre ensinamento e vida. É uma bela síntese para este último dia: aquilo que professamos diante de Deus precisa alcançar nossas escolhas concretas. Coloquemos agora nas mãos do Senhor nossa família, nossa saúde, nossos projetos, nossas preocupações e também aquilo que recebemos durante esta novena. Agradeçamos antes mesmo de conhecer todas as respostas. Peçamos a graça de conservar o que foi bom, corrigir o que precisa mudar e retornar à oração quando vierem novas inquietações. Pela intercessão de Santa Hildegarda, que nossa entrega não seja apenas uma emoção de encerramento, mas uma decisão serena de buscar Cristo com fidelidade.",
      keep: "A melhor conclusão para uma novena é uma vida que continua dizendo a Deus: seja feita a vossa vontade.",
      sources: [["Bento XVI · Carta Apostólica sobre Santa Hildegarda", HILDEGARDA_LETTER]]
    }
  ];

  if (typeof daysPT !== "undefined" && Array.isArray(daysPT)) {
    expandedPT.forEach((item, index) => {
      if (daysPT[index]) daysPT[index].ref = item.text;
    });
  }

  function lang(){ return (document.documentElement.lang || "pt").slice(0,2).toLowerCase(); }

  function ensureSourceBlock(){
    const reflection = document.querySelector(".reflection-box");
    if (!reflection) return null;
    let block = document.getElementById("reflectionChurchSource");
    if (!block) {
      block = document.createElement("section");
      block.id = "reflectionChurchSource";
      block.className = "reflection-church-source";
      reflection.insertAdjacentElement("afterend", block);
    }
    return block;
  }

  function updateSource(day){
    const block = ensureSourceBlock();
    if (!block) return;
    const i = Math.max(1, Math.min(9, Number(day)||1)) - 1;
    const item = expandedPT[i];
    const pt = lang() === "pt";
    if (!pt) { block.hidden = true; return; }
    block.hidden = false;
    const links = item.sources.map(([label, href]) => `<a href="${href}" target="_blank" rel="noopener">${label} ↗</a>`).join("");
    block.innerHTML = `<div class="church-source-kicker">À LUZ DA PALAVRA E DA IGREJA</div><div class="keep-heart"><strong>Para guardar no coração</strong><span>${item.keep}</span></div><div class="church-sources"><strong>Fontes para aprofundar</strong>${links}</div>`;
  }

  function wrapProperPrayer(id, type){
    const text = document.getElementById(id);
    if (!text || text.closest(".proper-prayer-card")) return;
    const card = document.createElement("section");
    card.className = `proper-prayer-card ${type}`;
    const label = document.createElement("div");
    label.className = "proper-prayer-label";
    label.dataset.properPrayer = type;
    const subtitle = document.createElement("div");
    subtitle.className = "proper-prayer-subtitle";
    text.parentNode.insertBefore(card, text);
    card.append(label, subtitle, text);
  }

  function updateProperPrayerLabels(){
    const labels = {
      pt:{initial:"ORAÇÃO PRÓPRIA DA NOVENA A SANTA HILDEGARDA",final:"ORAÇÃO FINAL PRÓPRIA DA NOVENA",initialSub:"Pela intercessão de Santa Hildegarda de Bingen",finalSub:"Encerramento do dia pela intercessão de Santa Hildegarda"},
      en:{initial:"PRAYER PROPER TO THE NOVENA OF SAINT HILDEGARD",final:"PROPER CLOSING PRAYER OF THE NOVENA",initialSub:"Through the intercession of Saint Hildegard of Bingen",finalSub:"Closing the day through Saint Hildegard’s intercession"},
      de:{initial:"EIGENGEBET DER NOVENE ZUR HEILIGEN HILDEGARD",final:"EIGENES SCHLUSSGEBET DER NOVENE",initialSub:"Auf die Fürsprache der heiligen Hildegard von Bingen",finalSub:"Tagesabschluss auf die Fürsprache der heiligen Hildegard"},
      es:{initial:"ORACIÓN PROPIA DE LA NOVENA A SANTA HILDEGARDA",final:"ORACIÓN FINAL PROPIA DE LA NOVENA",initialSub:"Por intercesión de Santa Hildegarda de Bingen",finalSub:"Conclusión del día por intercesión de Santa Hildegarda"}
    };
    const t = labels[lang()] || labels.pt;
    document.querySelectorAll("[data-proper-prayer]").forEach(el => {
      const type = el.dataset.properPrayer;
      el.textContent = t[type];
      const sub = el.nextElementSibling;
      if (sub?.classList.contains("proper-prayer-subtitle")) sub.textContent = t[type+"Sub"];
    });
  }

  function enhance(){
    wrapProperPrayer("initialText", "initial");
    wrapProperPrayer("finalText", "final");
    updateProperPrayerLabels();
    const n = typeof selected !== "undefined" ? selected : 1;
    updateSource(n);
  }

  if (typeof renderDay === "function") {
    const baseRenderDay = renderDay;
    renderDay = function(n){
      baseRenderDay(n);
      updateSource(n);
    };
  }

  enhance();
  new MutationObserver(() => {
    updateProperPrayerLabels();
    const n = typeof selected !== "undefined" ? selected : 1;
    updateSource(n);
  }).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
})();
