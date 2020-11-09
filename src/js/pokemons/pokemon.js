var thunder = {
  name:'Electrique',
  start_power:startThunderPower,
  stop_power:stopThunderPower,
  desc:"Reduit la vitesse maximale de l'adversaire",
  icon:"src/medias/gui/thunder.png"
};
var fire = {
  name:'Feu',
  start_power:startFirePower,
  stop_power:stopFirePower,
  desc:"Augmente la vitesse de la balle, jusqu'a ce qu'elle rebondisse",
  icon:"src/medias/gui/fire.png"
}
var water = {
  name:'Eau',
  start_power:startWaterPower,
  stop_power:stopWaterPower,
  desc:"Augmente l'inertie de l'adversaire",
  icon:"src/medias/gui/water.png"
}
var grass = {
  name:'Plante',
  start_power:startGrassPower,
  stop_power:stopGrassPower,
  desc:"Reduit la taille de l'adversaire",
  icon:"src/medias/gui/grass.png"
}
var ice = {
  name:'Glace',
  start_power:startIcePower,
  stop_power:stopIcePower,
  desc:"Ralentit la vitesse de la balle, jusqu'a ce qu'elle rebondisse",
  icon:"src/medias/gui/ice.png"
}
var fly = {
  name:'Vol',
  start_power:startFlyPower,
  stop_power:stopFlyPower,
  desc:"Augmente la vitesse maximale du joueur",
  icon:"src/medias/gui/fly.png"
}
var psy = {
  name:'Psy',
  start_power:startPsyPower,
  stop_power:stopPsyPower,
  desc:"Inverse les controles du joueur adverse",
  icon:"src/medias/gui/psy.png"
}
var types = {thunder,fire,water,grass,ice,fly,psy}

var salameche = {name:'Salameche',
                 color:0xffad00,
                 html_color: "#ffad00",
                 front:'src/medias/textures/Texture_salameche_front.png',
                 back:'src/medias/textures/Texture_salameche_back.png',
                 type:types.fire,
                 niveau:1,
                 evolution:null,
                 desc:"La flamme qui brûle au bout de sa queue indique l'humeur de ce Pokémon. Elle vacille lorsque Salamèche est content. En revanche, lorsqu'il s'énerve, la flamme prend de l'importance et brûle plus ardemment."
               };
var reptincel = {name:'Reptincel',
                 color:0xff8300,
                 html_color: "#ff8300",
                 front:'src/medias/textures/Texture_reptincel_front.png',
                 back:'src/medias/textures/Texture_reptincel_back.png',
                 type:types.fire,
                 niveau:2,
                 evolution:null,
                 desc:"Reptincel lacère ses ennemis sans pitié grâce à ses griffes acérées. S'il rencontre un ennemi puissant, il devient agressif et la flamme au bout de sa queue s'embrase et prend une couleur bleu clair."
                };
var dracaufeu = {name:'Dracaufeu',
                 color:0xed5a40,
                 html_color: "#ed5a40",
                 front:'src/medias/textures/Texture_dracaufeu_front.png',
                 back:'src/medias/textures/Texture_dracaufeu_back.png',
                 type:types.fire,
                 niveau:3,
                 evolution:null,
                 desc:"Dracaufeu parcourt les cieux pour trouver des adversaires à sa mesure. Il crache de puissantes flammes capables de faire fondre n'importe quoi. Mais il ne dirige jamais son souffle destructeur vers un ennemi plus faible."
                };
var carapuce = {name:'Carapuce',
                color:0x00cbff,
                html_color: "#00cbff",
                front:'src/medias/textures/Texture_carapuce_front.png',
                back:'src/medias/textures/Texture_carapuce_back.png',
                type:types.water,
                niveau:1,
                evolution:null,
                desc:"La carapace de Carapuce ne sert pas qu'à le protéger. La forme ronde de sa carapace et ses rainures lui permettent d'améliorer son hydrodynamisme. Ce Pokémon nage extrêmement vite."
              };
var carabaffe = {name:'Carabaffe',
                color:0x00a2ff,
                html_color: "#00a2ff",
                front:'src/medias/textures/Texture_carabaffe_front.png',
                back:'src/medias/textures/Texture_carabaffe_back.png',
                type:types.water,
                niveau:2,
                evolution:null,
                desc:"Carabaffe a une large queue recouverte d'une épaisse fourrure. Elle devient de plus en plus foncée avec l'âge. Les éraflures sur la carapace de ce Pokémon témoignent de son expérience aux combats."
              };
var tortank = {name:'Tortank',
                color:0x006fe5,
                html_color: "#006fe5",
                front:'src/medias/textures/Texture_tortank_front.png',
                back:'src/medias/textures/Texture_tortank_back.png',
                type:types.water,
                niveau:3,
                evolution:null,
                desc:"Tortank dispose de canons à eau émergeant de sa carapace. Ils sont très précis et peuvent envoyer des balles d'eau capables de faire mouche sur une cible située à plus de 50 m."
              };
var bulbizarre = {name:'Bulbizarre',
                  color:0x24ff00,
                  html_color: "#24ff00",
                  front:'src/medias/textures/Texture_bulbizarre_front.png',
                  back:'src/medias/textures/Texture_bulbizarre_back.png',
                  type:types.grass,
                  niveau:1,
                  evolution:null,
                  desc:"Bulbizarre passe son temps à faire la sieste sous le soleil. Il y a une graine sur son dos. Il absorbe les rayons du soleil pour faire doucement pousser la graine."
                };
var herbizarre = {name:'Herbizarre',
                  color:0x17a200,
                  html_color: "#17a200",
                  front:'src/medias/textures/Texture_herbizarre_front.png',
                  back:'src/medias/textures/Texture_herbizarre_back.png',
                  type:types.grass,
                  niveau:2,
                  evolution:null,
                  desc:"Un bourgeon a poussé sur le dos de ce Pokémon. Pour en supporter le poids, Herbizarre a dû se muscler les pattes. Lorsqu'il commence à se prélasser au soleil, ça signifie que son bourgeon va éclore, donnant naissance à une fleur."
                };
var florizarre = {name:'Florizarre',
                  color:0x117a00,
                  html_color: "#117a00",
                  front:'src/medias/textures/Texture_florizarre_front.png',
                  back:'src/medias/textures/Texture_florizarre_back.png',
                  type:types.grass,
                  niveau:3,
                  evolution:null,
                  desc:"Une belle fleur se trouve sur le dos de Florizarre. Elle prend une couleur vive lorsqu'elle est bien nourrie et bien ensoleillée. Le parfum de cette fleur peut apaiser les gens."
                };
var pichu = {name:'Pichu',
             color:0xffef67,
             html_color: "#ffef67",
             front:'src/medias/textures/Texture_pichu_front.png',
             back:'src/medias/textures/Texture_pichu_back.png',
             type:types.thunder,
             niveau:1,
             evolution:null,
             desc:"Il ne contrôle pas encore bien l'électricité, et laisse échapper des décharges lorsqu'il est surpris ou en proie à de fortes émotions."
           };
var pikachu = {name:'Pikachu',
               color:0xffe000,
               html_color: "#ffe000",
               front:'src/medias/textures/Texture_pikachu_front.png',
               back:'src/medias/textures/Texture_pikachu_back.png',
               type:types.thunder,
               niveau:2,
               evolution:null,
               desc:"Un Pokémon capable de condenser l'électricité. Il doit décharger l'énergie accumulée de temps en temps au risque d'accroître son stress."
             };
var raichu = {name:'Raichu',
              color:0xd7b000,
              html_color: "#d7b000",
              front:'src/medias/textures/Texture_raichu_front.png',
              back:'src/medias/textures/Texture_raichu_back.png',
              type:types.thunder,
              niveau:3,
              evolution:null,
              desc:"Ce Pokémon peut accumuler jusqu'à 100 000 volts. Il peut ainsi assommer un éléphant juste en le touchant."
             };
var roucool = {name:'Roucool',
               color:0x96cfe1,
               html_color:"#96cfe1",
               front:'src/medias/textures/Texture_roucool_front.png',
               back:'src/medias/textures/Texture_roucool_back.png',
               type:types.fly,
               niveau:1,
               evolution:null,
               desc:"Roucool a un excellent sens de l'orientation. Il est capable de retrouver son nid sans jamais se tromper, même s'il est très loin de chez lui et dans un environnement qu'il ne connaît pas."
              };
var roucoups = {name:'Roucoups',
                color:0x65a5b9,
                html_color:"#65a5b9",
                front:'src/medias/textures/Texture_roucoups_front.png',
                back:'src/medias/textures/Texture_roucoups_back.png',
                type:types.fly,
                niveau:2,
                evolution:null,
                desc:"Roucoups utilise une vaste surface pour son territoire. Ce Pokémon surveille régulièrement son espace aérien. Si quelqu'un pénètre sur son territoire, il corrige l'ennemi sans pitié d'un coup de ses terribles serres."
              };
var roucarnage = {name:'Roucarnage',
                color:0x447281,
                html_color:"#447281",
                front:'src/medias/textures/Texture_roucarnage_front.png',
                back:'src/medias/textures/Texture_roucarnage_back.png',
                type:types.fly,
                niveau:3,
                evolution:null,
                desc:"Ce Pokémon est doté d'un plumage magnifique et luisant. Bien des Dresseurs sont captivés par la beauté fatale de sa huppe et décident de choisir Roucarnage comme leur Pokémon favori."
              };
var stalgamin = {name:'Stalgamin',
                 color:0xd4f3f1,
                 html_color:"#d4f3f1",
                 front:'src/medias/textures/Texture_stalgamin_front.png',
                 back:'src/medias/textures/Texture_stalgamin_back.png',
                 type:types.ice,
                 niveau:1,
                 evolution:null,
                 desc:"Les Stalgamin vivent dans les régions enneigées. Pendant les saisons sans neige, comme le printemps et l'été, ces Pokémon se retirent pour vivre dans les cavernes, au milieu des stalactites et des stalagmites."
              };
var oniglali = {name:'Oniglali',
                color:0x81f0e5,
                html_color:"#81f0e5",
                front:'src/medias/textures/Texture_oniglali_front.png',
                back:'src/medias/textures/Texture_oniglali_back.png',
                type:types.ice,
                niveau:2,
                evolution:null,
                desc:"Le corps de Oniglali est fait de rochers qu'il endurcit grâce à une couche de glace. Ce Pokémon a le pouvoir de geler l'humidité ambiante et de lui donner n'importe quelle forme."
              };
var momartik = {name:'Momartik',
                 color:0x22c4b5,
                 html_color:"#22c4b5",
                 front:'src/medias/textures/Texture_momartik_front.png',
                 back:'src/medias/textures/Texture_momartik_back.png',
                 type:types.ice,
                 niveau:3,
                 evolution:null,
                 desc:"Il congèle les humains et les Pokémon qui lui plaisent. Il les emporte ensuite dans sa tanière pour les admirer à loisir."
                };
var abra = {name:'Abra',
            color:0xe985ff,
            html_color:"#e985ff",
            front:'src/medias/textures/Texture_abra_front.png',
            back:'src/medias/textures/Texture_abra_back.png',
            type:types.psy,
            niveau:1,
            evolution:null,
            desc:"Abra dort dix-huit heures par jour. Pourtant, il peut sentir la présence de ses ennemis, même endormi."
           };
var kadabra = {name:'Kadabra',
               color:0xba33d8,
               html_color:"#ba33d8",
               front:'src/medias/textures/Texture_kadabra_front.png',
               back:'src/medias/textures/Texture_kadabra_back.png',
               type:types.psy,
               niveau:2,
               evolution:null,
               desc:"Kadabra émet une onde alpha si particulière qu'elle vous donne mal à la tête."
              };
var alakazam = {name:'Alakazam',
                color:0x770090,
                html_color:"#770090",
                front:'src/medias/textures/Texture_alakazam_front.png',
                back:'src/medias/textures/Texture_alakazam_back.png',
                type:types.psy,
                niveau:3,
                evolution:null,
                desc:"Le cerveau d'Alakazam grossit sans arrêt, si bien que sa tête devient trop lourde pour son cou. Ce Pokémon maintient sa tête relevée grâce à son pouvoir télékinétique."
               };

function startThunderPower(){
  return 0.15;
}

function stopThunderPower(){
  return 0.3;
}

function startFlyPower(){
  return 0.15;
}

function stopFlyPower(){
  return 0.3;
}

function startGrassPower(playerObject, boundingBox, playerSize){
  playerObject.scale.set(0.75, 1, 0.75);
  boundingBox = new THREE.Box3().setFromObject(playerObject);
  playerSize = boundingBox.getSize();
}

function stopGrassPower(playerObject, boundingBox, playerSize){
  playerObject.scale.set(1, 1, 1);
  boundingBox = new THREE.Box3().setFromObject(playerObject);
  playerSize = boundingBox.getSize();
}

function startIcePower(ballObject, ballSpeed, ballLateralSpeed, ballHeightSpeed){
  ballSpeed = 0.05;
  ballLateralSpeed /= 2;
  ballHeightSpeed /= 1.5;
  ballObject.material.color.setHex( 0x00ffff );
  return [ballSpeed, ballLateralSpeed, ballHeightSpeed];
}

function stopIcePower(ballObject, ballSpeed, ballLateralSpeed, ballHeightSpeed, ball_actual_speed){
  ballSpeed = ball_actual_speed;
  ballLateralSpeed *= 2;
  ballHeightSpeed *= 1.5;
  ballObject.material.color.setHex( 0xffffff );
  return [ballSpeed, ballLateralSpeed, ballHeightSpeed];
}

function startFirePower(ballObject, ballSpeed, ballLateralSpeed, ballHeightSpeed){
  ballSpeed = 1.0;
  ballLateralSpeed *= 2;
  ballHeightSpeed *= 1.5;
  ballObject.material.color.setHex( 0xff8e00 );
  return [ballSpeed, ballLateralSpeed, ballHeightSpeed];
}

function stopFirePower(ballObject, ballSpeed, ballLateralSpeed, ballHeightSpeed, ball_actual_speed){
  ballSpeed = ball_actual_speed;
  ballLateralSpeed /= 2;
  ballHeightSpeed /= 1.5;
  ballObject.material.color.setHex( 0xffffff );
  return [ballSpeed, ballLateralSpeed, ballHeightSpeed];
}

function startWaterPower(){
  return 1.05;
}

function stopWaterPower(){
  return 1.1;
}

function startPsyPower(){
  console.log('startPsyPower');
}
function stopPsyPower(){
  console.log('stopPsyPower');
}

var poke = {pichu,salameche,carapuce,bulbizarre,roucool,stalgamin,abra,
            pikachu,reptincel,carabaffe,herbizarre,roucoups,oniglali,kadabra,
            raichu,dracaufeu,tortank,florizarre,roucarnage,momartik,alakazam
          };

pichu.evolution = poke.pikachu;
pikachu.evolution = poke.raichu;
salameche.evolution = poke.reptincel;
reptincel.evolution = poke.dracaufeu;
carapuce.evolution = poke.carabaffe;
carabaffe.evolution = poke.tortank;
bulbizarre.evolution = poke.herbizarre;
herbizarre.evolution = poke.florizarre;
roucool.evolution = poke.roucoups;
roucoups.evolution = poke.roucarnage;
stalgamin.evolution = poke.oniglali;
oniglali.evolution = poke.momartik;
abra.evolution = poke.kadabra;
kadabra.evolution = poke.alakazam;

export {poke};
