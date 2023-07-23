import { Word } from "./models";
const mockWords: MockWord[] = [{
  name: "Felsefe",
  description: [
    "Varlığın ve bilginin bilimsel olarak araştırılması",
    "Bir bilimin veya bilgi alanının temelini oluşturan ilkeler bütünü",
    "Bir filozofun, bir felsefe okulunun, bir çağın öğretisi",
    "Dünya görüşü",
    "Bir konuda soyut düşünüş"
  ]
},
  {
    name: "Diyalektik",
    description: [
      "Gerçekliği ve onun çelişmelerini incelemeye yarayan ve bu çelişmeleri aşmayı sağlayan yolları aramayı öngören akıl yürütme yöntemi; eytişim, cedel"
    ]
  },
  {
    name: "Kitap",
    description: [
      "Ciltli veya ciltsiz olarak bir araya getirilmiş, basılı veya yazılı kâğıt yaprakların bütünü; betik",
      "Herhangi bir konuda yazılmış eser"
    ]
  },
  {
    name: "Postmodernism",
    description: [
      "Modernist arayışın canlılığını kaybetmesinden sonra XX. yüzyılın ikinci yarısında ortaya çıkan çeşitli üslup ve yönelişlerin adı",
      "Günümüz mimarisinde işlevsel olmayı bir tarafa bırakıp değişik yapı biçimlerini serbestçe kullanma eğiliminde olan üslup"
    ]
  },
  {
    name: "Tanrı",
    description: [
      "Çok tanrıcılıkta var olduğuna inanılan insanüstü varlıklardan her biri; ilah"
    ]
  }
];

interface MockWord {
  name: string;
  description: string[];
}

export const insertMock = async () => Word.insertMany(mockWords);
